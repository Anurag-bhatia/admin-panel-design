import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Info,
  AlertCircle,
  Lock,
  Sparkles,
  Check,
} from 'lucide-react'
import type {
  AdvancedRules,
  Coupon,
  CouponChallanType,
  CouponPlatform,
  CouponProduct,
  CouponType,
} from '@/../product/sections/cms/types'
import { AdvancedRulesBuilder } from './AdvancedRulesBuilder'

interface AddCouponPageProps {
  initialCoupon?: Coupon
  existingCodes?: string[]
  onSubmit?: (couponData: Partial<Coupon>) => void
  onCancel?: () => void
}

interface FormState {
  code: string
  description: string
  type: CouponType
  value: string
  maxDiscountCap: string
  startAt: string
  endAt: string
  minOrderValue: string
  platforms: CouponPlatform[]
  product: CouponProduct
  challanTypes: CouponChallanType[]
  states: string[]
  applicableOnPartner: 'yes' | 'no'
  partnerIds: string[]
  totalUsageLimit: string
  perUserUsageLimit: string
  stackable: boolean
  advancedRules: AdvancedRules
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

const CHALLAN_TYPE_LABELS: Record<CouponChallanType, string> = {
  online: 'Online',
  regularCourt: 'Regular',
  xpressCourt: 'XPress',
}

const PLATFORM_LABELS: Record<CouponPlatform, string> = {
  challanpay: 'ChallanPay',
  lots247: 'LOTS247',
}

function toDatetimeLocal(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function initialFromCoupon(coupon?: Coupon): FormState {
  return {
    code: coupon?.code ?? '',
    description: coupon?.description ?? '',
    type: coupon?.type ?? 'flat',
    value: coupon?.value != null ? String(coupon.value) : '',
    maxDiscountCap:
      coupon?.maxDiscountCap != null ? String(coupon.maxDiscountCap) : '',
    startAt: toDatetimeLocal(coupon?.startAt),
    endAt: toDatetimeLocal(coupon?.endAt),
    minOrderValue: coupon?.minOrderValue != null ? String(coupon.minOrderValue) : '',
    platforms: coupon?.platforms ?? [],
    product: coupon?.product ?? 'all',
    challanTypes: coupon?.challanTypes ?? [],
    states: coupon?.states ?? [],
    applicableOnPartner: coupon?.applicableOnPartner ? 'yes' : 'no',
    partnerIds: coupon?.partnerIds ?? [],
    totalUsageLimit:
      coupon?.totalUsageLimit != null ? String(coupon.totalUsageLimit) : '',
    perUserUsageLimit:
      coupon?.perUserUsageLimit != null ? String(coupon.perUserUsageLimit) : '1',
    stackable: coupon?.stackable ?? false,
    advancedRules: coupon?.advancedRules ?? { groups: [] },
  }
}

export function AddCouponPage({
  initialCoupon,
  existingCodes = [],
  onSubmit,
  onCancel,
}: AddCouponPageProps) {
  const isEdit = Boolean(initialCoupon)
  const isLocked = isEdit && initialCoupon!.status !== 'draft'

  const [form, setForm] = useState<FormState>(() => initialFromCoupon(initialCoupon))
  const [openSections, setOpenSections] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'form', string>>>({})
  const [sampleCart, setSampleCart] = useState<number>(1000)

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }))

  const previewDiscount = useMemo(() => {
    const v = Number(form.value)
    if (!v || sampleCart <= 0) return { discount: 0, final: sampleCart }
    if (form.type === 'flat') {
      const d = Math.min(v, sampleCart)
      return { discount: d, final: sampleCart - d }
    }
    let d = Math.round((sampleCart * v) / 100)
    const cap = Number(form.maxDiscountCap)
    if (cap && d > cap) d = cap
    return { discount: d, final: sampleCart - d }
  }, [form.type, form.value, form.maxDiscountCap, sampleCart])

  const validate = (): boolean => {
    const next: typeof errors = {}

    const code = form.code.trim().toUpperCase()
    if (!code) next.code = 'Code is required.'
    else if (!/^[A-Z0-9]+$/.test(code))
      next.code = 'Only letters and numbers allowed.'
    else if (code.length < 3 || code.length > 32)
      next.code = 'Must be between 3 and 32 characters.'
    else if (
      existingCodes.some(
        (c) => c.toUpperCase() === code && (!isEdit || c !== initialCoupon!.code)
      )
    )
      next.code = 'This code is already in use.'

    if (!form.type) next.type = 'Type is required.'

    const value = Number(form.value)
    if (!form.value || Number.isNaN(value) || value <= 0)
      next.value = 'Enter a positive value.'
    else if (form.type === 'percentage' && (value < 1 || value > 100))
      next.value = 'Percentage must be between 1 and 100.'

    if (form.type === 'flat' && form.maxDiscountCap.trim() !== '')
      next.maxDiscountCap = 'Max discount cap only applies to percentage type.'

    if (!form.startAt) next.startAt = 'Start date is required.'
    if (!form.endAt) next.endAt = 'End date is required.'
    if (form.startAt && form.endAt && new Date(form.endAt) <= new Date(form.startAt))
      next.endAt = 'End date must be after start date.'

    if (form.platforms.length === 0) next.platforms = 'Select at least one platform.'
    if (form.challanTypes.length === 0)
      next.challanTypes = 'Select at least one challan type.'

    if (form.applicableOnPartner === 'yes' && form.partnerIds.length === 0)
      next.partnerIds = 'Select at least one partner.'

    setErrors(next)
    if (Object.keys(next).length > 0) return false
    return true
  }

  const handleSubmit = (mode: 'draft' | 'publish') => {
    if (isLocked) return
    if (!validate()) {
      setErrors((e) => ({ ...e, form: 'Please fix the errors above before saving.' }))
      return
    }
    const startsInFuture = new Date(form.startAt).getTime() > Date.now()
    const payload: Partial<Coupon> = {
      ...(isEdit ? { id: initialCoupon!.id } : {}),
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || undefined,
      type: form.type,
      value: Number(form.value),
      maxDiscountCap:
        form.type === 'percentage' && form.maxDiscountCap
          ? Number(form.maxDiscountCap)
          : undefined,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString(),
      minOrderValue: form.minOrderValue ? Number(form.minOrderValue) : 0,
      platforms: form.platforms,
      product: form.product,
      challanTypes: form.challanTypes,
      states: form.states,
      applicableOnPartner: form.applicableOnPartner === 'yes',
      partnerIds: form.applicableOnPartner === 'yes' ? form.partnerIds : [],
      totalUsageLimit: form.totalUsageLimit ? Number(form.totalUsageLimit) : undefined,
      perUserUsageLimit: form.perUserUsageLimit
        ? Number(form.perUserUsageLimit)
        : undefined,
      stackable: form.stackable,
      advancedRules: form.advancedRules.groups.length > 0 ? form.advancedRules : undefined,
      status: mode === 'publish' && !startsInFuture ? 'active' : 'draft',
    }
    onSubmit?.(payload)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEdit ? (isLocked ? 'Coupon (read-only)' : 'Edit Coupon') : 'Create Coupon'}
              </h1>
              {isLocked && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Validity period has started — editing is disabled.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              disabled={isLocked}
              className="px-5 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('publish')}
              disabled={isLocked}
              className="px-5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {errors.form && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <Section
            id="A"
            title="Basics"
            open={openSections.A}
            onToggle={() => toggleSection('A')}
          >
            <Field label="Code" required error={errors.code}>
              <input
                type="text"
                disabled={isLocked}
                value={form.code}
                onChange={(e) => update('code', e.target.value.toUpperCase())}
                placeholder="WELCOME100"
                className={inputCls(isLocked)}
                maxLength={32}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                3–32 characters, letters and numbers only. Auto-uppercased.
              </p>
            </Field>
            <Field label="Description">
              <textarea
                disabled={isLocked}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Optional. Internal-only — not shown to users."
                rows={2}
                className={inputCls(isLocked)}
              />
            </Field>
            <Field label="Type" required>
              <div className="grid grid-cols-2 gap-2">
                {(['flat', 'percentage'] as CouponType[]).map((t) => (
                  <button
                    type="button"
                    key={t}
                    disabled={isLocked}
                    onClick={() => update('type', t)}
                    className={selectableCls(form.type === t)}
                  >
                    {t === 'flat' ? 'Flat amount (₹)' : 'Percentage (%)'}
                  </button>
                ))}
              </div>
            </Field>
          </Section>

          <Section
            id="B"
            title="Discount Value"
            open={openSections.B}
            onToggle={() => toggleSection('B')}
          >
            <Field
              label={form.type === 'flat' ? 'Discount amount (₹)' : 'Discount percentage'}
              required
              error={errors.value}
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  {form.type === 'flat' ? '₹' : '%'}
                </span>
                <input
                  type="number"
                  disabled={isLocked}
                  value={form.value}
                  onChange={(e) => update('value', e.target.value)}
                  placeholder={form.type === 'flat' ? '100' : '10'}
                  className={`${inputCls(isLocked)} pl-8`}
                  min={1}
                  max={form.type === 'percentage' ? 100 : undefined}
                />
              </div>
            </Field>
            {form.type === 'percentage' && (
              <Field
                label="Maximum discount cap (₹)"
                error={errors.maxDiscountCap}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    disabled={isLocked}
                    value={form.maxDiscountCap}
                    onChange={(e) => update('maxDiscountCap', e.target.value)}
                    placeholder="Optional. e.g. 500"
                    className={`${inputCls(isLocked)} pl-8`}
                  />
                </div>
              </Field>
            )}
          </Section>

          <Section
            id="C"
            title="Validity"
            open={openSections.C}
            onToggle={() => toggleSection('C')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Start date & time" required error={errors.startAt}>
                <input
                  type="datetime-local"
                  disabled={isLocked}
                  value={form.startAt}
                  onChange={(e) => update('startAt', e.target.value)}
                  className={inputCls(isLocked)}
                />
              </Field>
              <Field label="End date & time" required error={errors.endAt}>
                <input
                  type="datetime-local"
                  disabled={isLocked}
                  value={form.endAt}
                  onChange={(e) => update('endAt', e.target.value)}
                  className={inputCls(isLocked)}
                />
              </Field>
            </div>
          </Section>

          <Section
            id="D"
            title="Eligibility / Scope"
            open={openSections.D}
            onToggle={() => toggleSection('D')}
          >
            <Field label="Minimum order value (₹)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  disabled={isLocked}
                  value={form.minOrderValue}
                  onChange={(e) => update('minOrderValue', e.target.value)}
                  placeholder="0"
                  className={`${inputCls(isLocked)} pl-8`}
                />
              </div>
            </Field>

            <Field label="Platform" required error={errors.platforms}>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PLATFORM_LABELS) as CouponPlatform[]).map((p) => (
                  <CheckboxPill
                    key={p}
                    label={PLATFORM_LABELS[p]}
                    checked={form.platforms.includes(p)}
                    disabled={isLocked}
                    onChange={(checked) =>
                      update(
                        'platforms',
                        checked
                          ? [...form.platforms, p]
                          : form.platforms.filter((x) => x !== p)
                      )
                    }
                  />
                ))}
              </div>
            </Field>

            <Field label="Product" required>
              <div className="grid grid-cols-3 gap-2">
                {(['all', 'challan', 'subscription'] as CouponProduct[]).map((p) => (
                  <button
                    type="button"
                    key={p}
                    disabled={isLocked}
                    onClick={() => update('product', p)}
                    className={`${selectableCls(form.product === p)} capitalize`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Applicable Challan Type" required error={errors.challanTypes}>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CHALLAN_TYPE_LABELS) as CouponChallanType[]).map((t) => (
                  <CheckboxPill
                    key={t}
                    label={CHALLAN_TYPE_LABELS[t]}
                    checked={form.challanTypes.includes(t)}
                    disabled={isLocked}
                    onChange={(checked) =>
                      update(
                        'challanTypes',
                        checked
                          ? [...form.challanTypes, t]
                          : form.challanTypes.filter((x) => x !== t)
                      )
                    }
                  />
                ))}
              </div>
            </Field>

            <Field label="Location State">
              <StateMultiSelect
                value={form.states}
                disabled={isLocked}
                onChange={(states) => update('states', states)}
              />
            </Field>

            <Field label="Applicable on partner">
              <div className="grid grid-cols-2 gap-2 max-w-xs">
                {(['no', 'yes'] as const).map((v) => (
                  <button
                    type="button"
                    key={v}
                    disabled={isLocked}
                    onClick={() => update('applicableOnPartner', v)}
                    className={`${selectableCls(form.applicableOnPartner === v)} capitalize`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </Field>

            {form.applicableOnPartner === 'yes' && (
              <Field label="Partner ID" required error={errors.partnerIds}>
                <PartnerIdInput
                  value={form.partnerIds}
                  disabled={isLocked}
                  onChange={(ids) => update('partnerIds', ids)}
                />
              </Field>
            )}
          </Section>

          <Section
            id="E"
            title="Usage Limits"
            open={openSections.E}
            onToggle={() => toggleSection('E')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Total usage limit">
                <input
                  type="number"
                  disabled={isLocked}
                  value={form.totalUsageLimit}
                  onChange={(e) => update('totalUsageLimit', e.target.value)}
                  placeholder="Blank = unlimited"
                  className={inputCls(isLocked)}
                />
              </Field>
              <Field label="Per-user usage limit">
                <input
                  type="number"
                  disabled={isLocked}
                  value={form.perUserUsageLimit}
                  onChange={(e) => update('perUserUsageLimit', e.target.value)}
                  placeholder="Blank = unlimited"
                  className={inputCls(isLocked)}
                />
              </Field>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Stackable with other coupons / rewards
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {form.stackable
                    ? 'On — can combine with other benefits'
                    : 'Off — used alone'}
                </p>
              </div>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => update('stackable', !form.stackable)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  form.stackable ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
                } disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    form.stackable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </Section>

          <Section
            id="F"
            title="Advanced Rules"
            subtitle="Optional targeted eligibility conditions"
            open={openSections.F}
            onToggle={() => toggleSection('F')}
          >
            <AdvancedRulesBuilder
              value={form.advancedRules}
              onChange={(next) => update('advancedRules', next)}
              readOnly={isLocked}
            />
          </Section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-900/20 dark:to-slate-900 border border-cyan-200 dark:border-cyan-900/40 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Live Preview
                </h3>
              </div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Sample cart value
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={sampleCart}
                  onChange={(e) => setSampleCart(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-100 dark:border-slate-700 space-y-2">
                <PreviewRow label="Cart" value={`₹${sampleCart}`} />
                <PreviewRow
                  label={form.code ? `Coupon ${form.code}` : 'Coupon'}
                  value={`− ₹${previewDiscount.discount}`}
                  emphasize
                />
                <div className="border-t border-slate-100 dark:border-slate-700 pt-2 mt-2">
                  <PreviewRow
                    label="Final"
                    value={`₹${previewDiscount.final}`}
                    bold
                  />
                </div>
                {previewDiscount.discount > 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    You save ₹{previewDiscount.discount}
                  </p>
                )}
              </div>
              {form.type === 'percentage' && form.maxDiscountCap && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  Cap of ₹{form.maxDiscountCap} applies once percentage exceeds it.
                </p>
              )}
            </div>

            {isLocked && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 text-xs text-amber-800 dark:text-amber-300">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Editing is locked</p>
                    <p>
                      The validity period has started. Only Pause, Resume and Archive actions
                      are available.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  subtitle,
  open,
  onToggle,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/40 rounded">
            {id}
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-700 p-5 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

function CheckboxPill({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
        checked
          ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {checked && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-300" strokeWidth={3} />}
      {label}
    </button>
  )
}

function PartnerIdInput({
  value,
  disabled,
  onChange,
}: {
  value: string[]
  disabled?: boolean
  onChange: (v: string[]) => void
}) {
  const [draft, setDraft] = useState('')

  const commit = () => {
    const clean = draft.trim()
    if (!clean) return
    if (value.includes(clean)) {
      setDraft('')
      return
    }
    onChange([...value, clean])
    setDraft('')
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          disabled={disabled}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              commit()
            }
          }}
          placeholder="Enter partner ID and press Enter"
          className={inputCls(!!disabled)}
        />
        <button
          type="button"
          disabled={disabled || !draft.trim()}
          onClick={commit}
          className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {value.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/50"
            >
              {id}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onChange(value.filter((v) => v !== id))}
                  className="hover:text-cyan-900 dark:hover:text-cyan-100"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function StateMultiSelect({
  value,
  disabled,
  onChange,
}: {
  value: string[]
  disabled?: boolean
  onChange: (v: string[]) => void
}) {
  const [query, setQuery] = useState('')
  const filtered = INDIAN_STATES.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {value.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
            >
              {s}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onChange(value.filter((v) => v !== s))}
                  className="hover:text-cyan-900 dark:hover:text-cyan-100"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        disabled={disabled}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search states…"
        className={inputCls(!!disabled)}
      />
      {query && (
        <div className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-xs text-slate-400">No matches</p>
          ) : (
            filtered.map((s) => {
              const selected = value.includes(s)
              return (
                <button
                  type="button"
                  key={s}
                  disabled={disabled}
                  onClick={() => {
                    onChange(selected ? value.filter((v) => v !== s) : [...value, s])
                    setQuery('')
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {s}
                  {selected && <span className="text-xs text-cyan-600">Selected</span>}
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

function PreviewRow({
  label,
  value,
  emphasize,
  bold,
}: {
  label: string
  value: string
  emphasize?: boolean
  bold?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span
        className={`text-slate-600 dark:text-slate-300 ${bold ? 'font-semibold' : ''}`}
      >
        {label}
      </span>
      <span
        className={`${bold ? 'font-bold text-slate-900 dark:text-white' : emphasize ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-700 dark:text-slate-200'}`}
      >
        {value}
      </span>
    </div>
  )
}

function inputCls(disabled: boolean): string {
  return `w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
    disabled ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40' : ''
  }`
}

function selectableCls(selected: boolean): string {
  return `px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-colors ${
    selected
      ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
  } disabled:opacity-60 disabled:cursor-not-allowed`
}
