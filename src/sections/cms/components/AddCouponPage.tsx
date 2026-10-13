import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Info,
  AlertCircle,
  Lock,
  Check,
  Sparkles,
} from 'lucide-react'
import type {
  AdvancedRules,
  Coupon,
  CouponApplicableOn,
  CouponChallanType,
  CouponConversionAppliesTo,
  CouponConversionAudience,
  CouponConversionCombination,
  CouponConversionMethod,
  CouponConversionSettings,
  CouponPlatform,
  CouponProduct,
  CouponType,
} from '@/../product/sections/cms/types'
import { defaultCouponConversionSettings } from '@/../product/sections/cms/types'
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
  applicableOn: CouponApplicableOn
  value: string
  maxDiscountCap: string
  startAt: string
  endAt: string
  minOrderValue: string
  platforms: CouponPlatform[]
  product: CouponProduct
  challanTypes: CouponChallanType[]
  totalUsageLimit: string
  perUserUsageLimit: string
  stackable: boolean
  autoApplyOldest: boolean
  exitIntentEligible: boolean
  advancedRules: AdvancedRules
  conversion: CouponConversionSettings
}

const CHALLAN_TYPE_LABELS: Record<CouponChallanType, string> = {
  online: 'Online',
  regularCourt: 'Regular',
  xpressCourt: 'XPress',
}

const PLATFORM_LABELS: Record<CouponPlatform, string> = {
  challanpay: 'ChallanPay',
  lots247: 'LOTS247',
}

const APPLICABLE_ON_LABELS: Record<CouponApplicableOn, string> = {
  challanAmount: 'Challan Amount',
  convenienceFee: 'Convenience Fee',
  both: 'Both',
}

function productsForPlatforms(platforms: CouponPlatform[]): CouponProduct[] {
  if (platforms.length === 0) return []
  const hasChallanPay = platforms.includes('challanpay')
  const hasLots = platforms.includes('lots247')
  if (hasChallanPay && hasLots) return ['all', 'challan', 'subscription']
  if (hasChallanPay) return ['challan']
  if (hasLots) return ['subscription']
  return []
}

const SUGGEST_STOPWORDS = new Set([
  'THE', 'AND', 'FOR', 'WITH', 'FROM', 'THIS', 'THAT', 'ONLY', 'ARE', 'YOU',
  'YOUR', 'OUR', 'NEW', 'GET', 'OFF', 'OFFER', 'CODE', 'COUPON', 'USE', 'USER',
  'USERS', 'ALL', 'ANY', 'HAVE', 'WILL', 'CAN', 'BUY', 'ON', 'IN', 'TO', 'OF',
  'A', 'AN', 'OR', 'AT', 'BE', 'IS', 'IT',
])

function suggestCouponCodes(description: string, existing: string[]): string[] {
  const MIN = 8
  const MAX = 12
  const cleaned = description
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && w.length <= 10 && !SUGGEST_STOPWORDS.has(w))

  const seeds = cleaned.length > 0
    ? Array.from(new Set(cleaned)).slice(0, 3)
    : ['SAVE', 'DEAL', 'HELLO']

  const suffixes = ['100', '250', '500']
  const prefixes = ['GET', 'TRY', 'YAY']

  const raw: string[] = []
  seeds.forEach((seed, i) => {
    raw.push(seed + suffixes[i % suffixes.length])
  })
  while (raw.length < 3) {
    const seed = seeds[raw.length % seeds.length]
    raw.push(prefixes[raw.length % prefixes.length] + seed)
  }

  const padTo = (code: string): string => {
    let out = code
    let n = 10
    while (out.length < MIN) {
      out = out + String(n)
      n += 3
    }
    return out.slice(0, MAX)
  }

  const existingSet = new Set(existing.map((c) => c.toUpperCase()))
  const out: string[] = []
  raw.forEach((candidate) => {
    const code = padTo(candidate.replace(/[^A-Z0-9]/g, ''))
    let final = code
    let n = 1
    while (existingSet.has(final) || out.includes(final)) {
      const suffix = String(n)
      final = (code.slice(0, MAX - suffix.length) + suffix)
      n++
    }
    out.push(final)
  })
  return out.slice(0, 3)
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
    applicableOn: coupon?.applicableOn ?? 'challanAmount',
    value: coupon?.value != null ? String(coupon.value) : '',
    maxDiscountCap:
      coupon?.maxDiscountCap != null ? String(coupon.maxDiscountCap) : '',
    startAt: toDatetimeLocal(coupon?.startAt),
    endAt: toDatetimeLocal(coupon?.endAt),
    minOrderValue: coupon?.minOrderValue != null ? String(coupon.minOrderValue) : '',
    platforms: coupon?.platforms ?? [],
    product: coupon?.product ?? 'all',
    challanTypes: coupon?.challanTypes ?? [],
    totalUsageLimit:
      coupon?.totalUsageLimit != null ? String(coupon.totalUsageLimit) : '',
    perUserUsageLimit:
      coupon?.perUserUsageLimit != null ? String(coupon.perUserUsageLimit) : '1',
    stackable: coupon?.stackable ?? false,
    autoApplyOldest: coupon?.autoApplyOldest ?? false,
    exitIntentEligible: coupon?.exitIntentEligible ?? false,
    advancedRules: coupon?.advancedRules ?? { groups: [] },
    conversion: coupon?.conversion ?? defaultCouponConversionSettings,
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
    G: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'form', string>>>({})
  const [codeSuggestions, setCodeSuggestions] = useState<string[]>([])

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }))

  const availableProducts = productsForPlatforms(form.platforms)

  useEffect(() => {
    if (availableProducts.length === 0) return
    if (!availableProducts.includes(form.product)) {
      setForm((f) => ({ ...f, product: availableProducts[0] }))
    }
  }, [availableProducts, form.product])

  const validate = (): boolean => {
    const next: typeof errors = {}

    const code = form.code.trim().toUpperCase()
    if (!code) next.code = 'Code is required.'
    else if (!/^[A-Z0-9]+$/.test(code))
      next.code = 'Only letters and numbers allowed.'
    else if (code.length < 8 || code.length > 12)
      next.code = 'Must be between 8 and 12 characters.'
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
      applicableOn: form.applicableOn,
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
      totalUsageLimit: form.totalUsageLimit ? Number(form.totalUsageLimit) : undefined,
      perUserUsageLimit: form.perUserUsageLimit
        ? Number(form.perUserUsageLimit)
        : undefined,
      stackable: form.stackable,
      autoApplyOldest: form.autoApplyOldest,
      exitIntentEligible: form.exitIntentEligible,
      advancedRules: form.advancedRules.groups.length > 0 ? form.advancedRules : undefined,
      conversion: form.conversion.allowConversion ? form.conversion : undefined,
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

      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="space-y-3">
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
            <Field
              label="Code"
              required
              error={errors.code}
              action={
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() =>
                    setCodeSuggestions(
                      suggestCouponCodes(form.description, existingCodes),
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-3 h-3" />
                  Suggest
                </button>
              }
            >
              <input
                type="text"
                disabled={isLocked}
                value={form.code}
                onChange={(e) => update('code', e.target.value.toUpperCase())}
                placeholder="WELCOME100"
                className={inputCls(isLocked)}
                maxLength={12}
              />
              {codeSuggestions.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {codeSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        update('code', s)
                        setCodeSuggestions([])
                      }}
                      className="px-2 py-1 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/40 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                8–12 characters, letters and numbers only. Auto-uppercased.
              </p>
            </Field>
          </Section>

          <Section
            id="B"
            title="Discount Value"
            open={openSections.B}
            onToggle={() => toggleSection('B')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Type" required>
                <SingleSelectDropdown
                  disabled={isLocked}
                  value={form.type}
                  onChange={(v) => update('type', v as CouponType)}
                  options={[
                    { value: 'flat', label: 'Flat amount (₹)' },
                    { value: 'percentage', label: 'Percentage (%)' },
                  ]}
                />
              </Field>
              <Field label="Applicable on" required>
                <SingleSelectDropdown
                  disabled={isLocked}
                  value={form.applicableOn}
                  onChange={(v) => update('applicableOn', v as CouponApplicableOn)}
                  options={(['challanAmount', 'convenienceFee', 'both'] as CouponApplicableOn[]).map(
                    (a) => ({ value: a, label: APPLICABLE_ON_LABELS[a] })
                  )}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <MultiSelectDropdown
                  placeholder="Select platforms"
                  disabled={isLocked}
                  options={(Object.keys(PLATFORM_LABELS) as CouponPlatform[]).map((p) => ({
                    value: p,
                    label: PLATFORM_LABELS[p],
                  }))}
                  value={form.platforms}
                  onChange={(next) => update('platforms', next as CouponPlatform[])}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product" required>
                <SingleSelectDropdown
                  disabled={isLocked || form.platforms.length === 0}
                  placeholder={
                    form.platforms.length === 0 ? 'Select a platform first' : 'Select…'
                  }
                  options={availableProducts.map((p) => ({
                    value: p,
                    label: p.charAt(0).toUpperCase() + p.slice(1),
                  }))}
                  value={form.product}
                  onChange={(next) => update('product', next as CouponProduct)}
                />
              </Field>

              <Field label="Applicable Challan Type" required error={errors.challanTypes}>
                <MultiSelectDropdown
                  placeholder="Select challan types"
                  disabled={isLocked}
                  options={(Object.keys(CHALLAN_TYPE_LABELS) as CouponChallanType[]).map((t) => ({
                    value: t,
                    label: CHALLAN_TYPE_LABELS[t],
                  }))}
                  value={form.challanTypes}
                  onChange={(next) => update('challanTypes', next as CouponChallanType[])}
                />
              </Field>
            </div>
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
            <CheckboxRow
              label="Stackable with other coupons / rewards"
              description={
                form.stackable ? 'On — can combine with other benefits' : 'Off — used alone'
              }
              checked={form.stackable}
              disabled={isLocked}
              onChange={(v) => update('stackable', v)}
            />
            <CheckboxRow
              label="Auto Apply"
              info="In case of multiple auto apply coupons, the oldest eligible coupon will get applied at checkout"
              checked={form.autoApplyOldest}
              disabled={isLocked}
              onChange={(v) => update('autoApplyOldest', v)}
            />
            <CheckboxRow
              label="Eligible for an exit-intent prompt"
              info="In case of multiple exit intent coupons, the oldest eligible coupon will get applied at checkout"
              checked={form.exitIntentEligible}
              disabled={isLocked}
              onChange={(v) => update('exitIntentEligible', v)}
            />
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
              platforms={form.platforms}
            />
          </Section>

          <Section
            id="G"
            title="Convert to Credit"
            subtitle="Let eligible customers exchange this coupon for CP Pockets"
            open={openSections.G}
            onToggle={() => toggleSection('G')}
          >
            <ConversionSettings
              value={form.conversion}
              onChange={(next) => update('conversion', next)}
              disabled={isLocked}
            />
          </Section>

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
          open ? 'rounded-t-xl' : 'rounded-xl'
        }`}
      >
        <div className="flex items-center gap-3 text-left">
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/40 rounded">
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
        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-4 space-y-3 rounded-b-xl">
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
  action,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {action}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

function CheckboxRow({
  label,
  description,
  info,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description?: string
  info?: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  const id = `chk-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <div
      className={`flex items-start gap-2.5 pt-1 ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <label
            htmlFor={id}
            className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {label}
          </label>
          {info && <InfoTooltip text={info} />}
        </div>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span
      className="group relative inline-flex text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
      onClick={(e) => e.preventDefault()}
    >
      <Info className="w-3.5 h-3.5 cursor-help" />
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-64 rounded-md bg-slate-900 dark:bg-slate-700 px-2.5 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
        {text}
      </span>
    </span>
  )
}

type DropdownOption = { value: string; label: string }

function MultiSelectDropdown({
  options,
  value,
  onChange,
  disabled,
  placeholder = 'Select…',
}: {
  options: DropdownOption[]
  value: string[]
  onChange: (v: string[]) => void
  disabled?: boolean
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)
  const summary =
    value.length === 0
      ? placeholder
      : value.length === options.length
        ? 'All'
        : selectedLabels.join(', ')

  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls(!!disabled)} flex items-center justify-between text-left`}
      >
        <span
          className={`truncate ${value.length === 0 ? 'text-slate-400' : ''}`}
        >
          {summary}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 max-h-56 overflow-y-auto">
          {options.map((o) => {
            const selected = value.includes(o.value)
            return (
              <button
                type="button"
                key={o.value}
                onClick={() => toggle(o.value)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 rounded border ${
                    selected
                      ? 'bg-cyan-600 border-cyan-600'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                {o.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SingleSelectDropdown({
  options,
  value,
  onChange,
  disabled,
  placeholder = 'Select…',
}: {
  options: DropdownOption[]
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls(!!disabled)} flex items-center justify-between text-left`}
      >
        <span className={`truncate ${!current ? 'text-slate-400' : ''}`}>
          {current ? current.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 max-h-56 overflow-y-auto">
          {options.map((o) => {
            const selected = o.value === value
            return (
              <button
                type="button"
                key={o.value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  selected
                    ? 'text-cyan-700 dark:text-cyan-300 font-medium'
                    : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {o.label}
                {selected && <Check className="w-4 h-4 text-cyan-600" strokeWidth={3} />}
              </button>
            )
          })}
        </div>
      )}
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

const AUDIENCE_LABELS: Record<CouponConversionAudience, string> = {
  assigned: 'Assigned customers only',
  anyVerified: 'Any verified customer',
  publicWithOtp: 'Public code with mobile OTP',
}

const METHOD_LABELS: Record<CouponConversionMethod, string> = {
  sameAsValue: 'Same as coupon value',
  fixedAmount: 'Fixed amount',
  percentOfBenefit: '% of coupon benefit',
}

const APPLIES_TO_LABELS: Record<CouponConversionAppliesTo, string> = {
  sameAsCoupon: 'Same as coupon',
  challan: 'Challan fee',
  convenience: 'Convenience fee',
  both: 'Both',
}

const COMBINATION_LABELS: Record<CouponConversionCombination, string> = {
  couponFirst: 'Coupon first, then credit',
  creditFirst: 'Credit first, then coupon',
}

function ConversionSettings({
  value,
  onChange,
  disabled,
}: {
  value: CouponConversionSettings
  onChange: (next: CouponConversionSettings) => void
  disabled: boolean
}) {
  const set = <K extends keyof CouponConversionSettings>(
    key: K,
    v: CouponConversionSettings[K],
  ) => onChange({ ...value, [key]: v })

  const expiryMode: 'days' | 'date' = value.creditExpiryDate ? 'date' : 'days'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Allow conversion to CP Pockets
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            When on, eligible customers can exchange this coupon for credit instead of applying
            it at the current checkout. Once converted, the coupon can no longer be used.
          </p>
        </div>
        <ConversionToggle
          checked={value.allowConversion}
          disabled={disabled}
          onChange={(v) => set('allowConversion', v)}
        />
      </div>

      {value.allowConversion && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConvField label="Who can convert">
            <select
              disabled={disabled}
              value={value.whoCanConvert}
              onChange={(e) => set('whoCanConvert', e.target.value as CouponConversionAudience)}
              className={inputCls(disabled)}
            >
              {(Object.keys(AUDIENCE_LABELS) as CouponConversionAudience[]).map((k) => (
                <option key={k} value={k}>
                  {AUDIENCE_LABELS[k]}
                </option>
              ))}
            </select>
          </ConvField>

          <ConvField label="Conversion method">
            <select
              disabled={disabled}
              value={value.method}
              onChange={(e) => set('method', e.target.value as CouponConversionMethod)}
              className={inputCls(disabled)}
            >
              {(Object.keys(METHOD_LABELS) as CouponConversionMethod[]).map((k) => (
                <option key={k} value={k}>
                  {METHOD_LABELS[k]}
                </option>
              ))}
            </select>
          </ConvField>

          {value.method !== 'sameAsValue' && (
            <ConvField
              label={value.method === 'fixedAmount' ? 'Credit value (₹)' : 'Credit value (%)'}
              help={
                value.method === 'fixedAmount'
                  ? 'Flat credit value, regardless of coupon amount'
                  : 'Percentage of the coupon benefit'
              }
            >
              <input
                type="number"
                min={1}
                max={value.method === 'percentOfBenefit' ? 100 : undefined}
                disabled={disabled}
                value={value.creditValue ?? ''}
                onChange={(e) =>
                  set('creditValue', e.target.value ? Number(e.target.value) : undefined)
                }
                className={inputCls(disabled)}
              />
            </ConvField>
          )}

          <ConvField label="Per-customer limit">
            <input
              type="number"
              min={1}
              disabled={disabled}
              value={value.perCustomerLimit}
              onChange={(e) => set('perCustomerLimit', Number(e.target.value) || 1)}
              className={inputCls(disabled)}
            />
          </ConvField>

          <ConvField label="Conversion window starts" help="Defaults to coupon validity">
            <input
              type="datetime-local"
              disabled={disabled}
              value={value.windowStart ?? ''}
              onChange={(e) => set('windowStart', e.target.value || undefined)}
              className={inputCls(disabled)}
            />
          </ConvField>

          <ConvField label="Conversion window ends">
            <input
              type="datetime-local"
              disabled={disabled}
              value={value.windowEnd ?? ''}
              onChange={(e) => set('windowEnd', e.target.value || undefined)}
              className={inputCls(disabled)}
            />
          </ConvField>

          <ConvField label="Credit expiry" className="sm:col-span-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    onChange({
                      ...value,
                      creditExpiryDate: undefined,
                      creditExpiryDays: value.creditExpiryDays ?? 30,
                    })
                  }
                  className={selectableCls(expiryMode === 'days')}
                >
                  Days from conversion
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    onChange({
                      ...value,
                      creditExpiryDays: undefined,
                      creditExpiryDate: value.creditExpiryDate ?? '',
                    })
                  }
                  className={selectableCls(expiryMode === 'date')}
                >
                  Fixed date
                </button>
              </div>
              {expiryMode === 'days' ? (
                <input
                  type="number"
                  min={1}
                  disabled={disabled}
                  value={value.creditExpiryDays ?? ''}
                  onChange={(e) =>
                    set('creditExpiryDays', e.target.value ? Number(e.target.value) : undefined)
                  }
                  placeholder="30"
                  className={inputCls(disabled)}
                />
              ) : (
                <input
                  type="date"
                  disabled={disabled}
                  value={value.creditExpiryDate ?? ''}
                  onChange={(e) => set('creditExpiryDate', e.target.value || undefined)}
                  className={inputCls(disabled)}
                />
              )}
            </div>
          </ConvField>

          <ConvField label="Where the credit can be used">
            <select
              disabled={disabled}
              value={value.appliesTo}
              onChange={(e) => set('appliesTo', e.target.value as CouponConversionAppliesTo)}
              className={inputCls(disabled)}
            >
              {(Object.keys(APPLIES_TO_LABELS) as CouponConversionAppliesTo[]).map((k) => (
                <option key={k} value={k}>
                  {APPLIES_TO_LABELS[k]}
                </option>
              ))}
            </select>
          </ConvField>

          <ConvField label="Combination policy">
            <select
              disabled={disabled}
              value={value.combination}
              onChange={(e) => set('combination', e.target.value as CouponConversionCombination)}
              className={inputCls(disabled)}
            >
              {(Object.keys(COMBINATION_LABELS) as CouponConversionCombination[]).map((k) => (
                <option key={k} value={k}>
                  {COMBINATION_LABELS[k]}
                </option>
              ))}
            </select>
          </ConvField>

          <ConvField
            label="Customer disclosure"
            className="sm:col-span-2"
            help="Must state the value, expiry, eligible use, and that credit is non-transferable and non-withdrawable."
          >
            <textarea
              disabled={disabled}
              value={value.customerDisclosure ?? ''}
              onChange={(e) => set('customerDisclosure', e.target.value)}
              rows={3}
              placeholder="e.g. Convert this coupon for 100 CP Coins, valid for 30 days on convenience fees. CP Pockets is not cash and cannot be withdrawn or transferred."
              className={inputCls(disabled)}
            />
          </ConvField>
        </div>
      )}
    </div>
  )
}

function ConvField({
  label,
  help,
  className,
  children,
}: {
  label: string
  help?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
      {help && <span className="text-xs text-slate-400">{help}</span>}
    </label>
  )
}

function ConversionToggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean
  disabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
