import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Upload,
  X,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'
import type {
  Programme,
  ProgrammeAudience,
  ProgrammeChargeComponent,
  ProgrammeCustomerText,
  ProgrammeStatus,
  ProgrammeType,
  PerCartCapType,
  LotUseOrder,
  RewardBasis,
} from '@/../product/sections/cms/types'

interface AddProgrammePageProps {
  initialProgramme?: Programme
  existingCodes?: string[]
  existingNames?: string[]
  onSubmit?: (data: Partial<Programme>, action: 'draft' | 'schedule' | 'activate') => void
  onCancel?: () => void
}

const typeLabels: Record<ProgrammeType, string> = {
  firstTimeCheck: 'First-time check',
  postPaymentReward: 'Post-payment reward',
  influencer: 'Influencer campaign',
  corporate: 'Corporate benefit',
  specificCustomers: 'Specific customers',
}

const triggerText: Record<ProgrammeType, string> = {
  firstTimeCheck:
    'A check completes for a new vehicle number + mobile number combination.',
  postPaymentReward: 'A payment succeeds and the order is confirmed.',
  influencer: 'A claim carrying the campaign code.',
  corporate: 'A mobile number list is processed.',
  specificCustomers: 'A mobile number list is processed.',
}

const chargeComponentLabels: Record<ProgrammeChargeComponent, string> = {
  convenience: 'Convenience fee',
  lawyerFee: 'Lawyer fee',
  subscription: 'Subscription',
  other: 'Other',
}

const CODE_REGEX = /^[A-Z0-9]{3,32}$/

function defaultCustomerText(): ProgrammeCustomerText {
  return {
    displayName: '',
    description: '',
    issuedMessage: 'You got {coins} coins. Expires on {expiry}.',
    usedMessage: 'You used {coins} coins. Balance: {balance}.',
    expiringMessage: '{coins} coins expire on {expiry}.',
  }
}

function toDatetimeLocal(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromDatetimeLocal(v: string): string {
  if (!v) return ''
  return new Date(v).toISOString()
}

export function AddProgrammePage({
  initialProgramme,
  existingCodes = [],
  existingNames = [],
  onSubmit,
  onCancel,
}: AddProgrammePageProps) {
  const isEditing = !!initialProgramme
  const isDraft = !initialProgramme || initialProgramme.status === 'draft'

  const [name, setName] = useState(initialProgramme?.name ?? '')
  const [code, setCode] = useState(initialProgramme?.code ?? '')
  const [internalDescription, setInternalDescription] = useState(
    initialProgramme?.internalDescription ?? '',
  )
  const [type, setType] = useState<ProgrammeType>(
    initialProgramme?.type ?? 'firstTimeCheck',
  )

  const [audience, setAudience] = useState<ProgrammeAudience>(
    initialProgramme?.audience ?? (type === 'firstTimeCheck' ? 'newOnly' : 'all'),
  )
  const [minimumCashPaid, setMinimumCashPaid] = useState<string>(
    initialProgramme?.minimumCashPaid?.toString() ?? '',
  )
  const [campaignCode, setCampaignCode] = useState(
    initialProgramme?.campaignCode ?? '',
  )
  const [mobileNumbers, setMobileNumbers] = useState<string[]>(
    initialProgramme?.mobileNumbers ?? [],
  )
  const [mobileDraft, setMobileDraft] = useState('')
  const [limitPerCustomer, setLimitPerCustomer] = useState<string>(
    initialProgramme?.limitPerCustomer?.toString() ?? '1',
  )

  const [coinsPerCustomer, setCoinsPerCustomer] = useState<string>(
    initialProgramme?.coinsPerCustomer?.toString() ?? '',
  )
  const [rewardBasis, setRewardBasis] = useState<RewardBasis>(
    initialProgramme?.rewardBasis ?? 'fixedCoins',
  )
  const [percentOfCash, setPercentOfCash] = useState<string>(
    initialProgramme?.percentOfCash?.toString() ?? '',
  )
  const [startAt, setStartAt] = useState<string>(
    toDatetimeLocal(initialProgramme?.startAt ?? ''),
  )
  const [endAt, setEndAt] = useState<string>(
    toDatetimeLocal(initialProgramme?.endAt ?? ''),
  )
  const [validityMode, setValidityMode] = useState<'days' | 'date'>(
    initialProgramme?.creditValidityDate ? 'date' : 'days',
  )
  const [validityDays, setValidityDays] = useState<string>(
    initialProgramme?.creditValidityDays?.toString() ?? '30',
  )
  const [validityDate, setValidityDate] = useState<string>(
    initialProgramme?.creditValidityDate?.slice(0, 10) ?? '',
  )

  const [perCartCapType, setPerCartCapType] = useState<PerCartCapType>(
    initialProgramme?.perCartCapType ?? 'percent',
  )
  const [perCartCapValue, setPerCartCapValue] = useState<string>(
    initialProgramme?.perCartCapValue?.toString() ?? '20',
  )
  const [partialUse, setPartialUse] = useState<boolean>(
    initialProgramme?.partialUse ?? true,
  )
  const [chargeComponents, setChargeComponents] = useState<ProgrammeChargeComponent[]>(
    initialProgramme?.chargeComponents ?? ['convenience'],
  )
  const [lotUseOrder, setLotUseOrder] = useState<LotUseOrder>(
    initialProgramme?.lotUseOrder ?? 'earliestExpiryFirst',
  )

  const [budgetCoins, setBudgetCoins] = useState<string>(
    initialProgramme?.budgetCoins?.toString() ?? '',
  )
  const [alertLevelPercent, setAlertLevelPercent] = useState<string>(
    initialProgramme?.alertLevelPercent?.toString() ?? '80',
  )
  const [hardStopCoins, setHardStopCoins] = useState<string>(
    initialProgramme?.hardStopCoins?.toString() ?? '',
  )

  const [customerText, setCustomerText] = useState<ProgrammeCustomerText>(
    initialProgramme?.customerText ?? defaultCustomerText(),
  )

  const [openSections, setOpenSections] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
  })

  const [sampleCart, setSampleCart] = useState<number>(5000)
  const [sampleBalance, setSampleBalance] = useState<number>(600)

  const [uploadResult, setUploadResult] = useState<{
    added: number
    skippedDuplicates: number
    rejected: { row: number; value: string; reason: string }[]
  } | null>(null)
  const [saveFailure, setSaveFailure] = useState<{
    action: 'draft' | 'schedule' | 'activate'
  } | null>(null)

  const codeError = useMemo(() => {
    if (!code) return null
    if (!CODE_REGEX.test(code)) return 'Alphanumeric, 3–32 characters.'
    if (
      existingCodes.some(
        (c) => c.toLowerCase() === code.toLowerCase() && c !== initialProgramme?.code,
      )
    )
      return 'Code already exists.'
    return null
  }, [code, existingCodes, initialProgramme?.code])

  const nameError = useMemo(() => {
    if (!name) return null
    if (
      existingNames.some(
        (n) => n.toLowerCase() === name.toLowerCase() && n !== initialProgramme?.name,
      )
    )
      return 'Name already exists.'
    return null
  }, [name, existingNames, initialProgramme?.name])

  const showMinCash = type === 'postPaymentReward'
  const showRewardBasis = type === 'postPaymentReward'
  const showCampaignCode = type === 'influencer'
  const showMobileList = type === 'corporate' || type === 'specificCustomers'
  const requiresInternalDesc = type === 'specificCustomers'

  const listTotalCoins = mobileNumbers.length * (Number(coinsPerCustomer) || 0)
  const listOverBudget = useMemo(() => {
    if (!showMobileList) return false
    return listTotalCoins > (Number(budgetCoins) || 0)
  }, [showMobileList, listTotalCoins, budgetCoins])

  const previewCoins = useMemo(() => {
    const c = Number(coinsPerCustomer) || 0
    if (rewardBasis === 'percentOfCash' && showRewardBasis) {
      const pct = Number(percentOfCash) || 0
      const cash = sampleCart
      return Math.min(c, Math.floor((cash * pct) / 100))
    }
    return c
  }, [coinsPerCustomer, rewardBasis, percentOfCash, sampleCart, showRewardBasis])

  const capApplied = useMemo(() => {
    const v = Number(perCartCapValue) || 0
    if (perCartCapType === 'percent') {
      return Math.floor((sampleCart * v) / 100)
    }
    return v
  }, [perCartCapType, perCartCapValue, sampleCart])

  const coinsUsable = Math.min(sampleBalance, capApplied)
  const cashPayable = Math.max(0, sampleCart - coinsUsable)

  const previewSentence = useMemo(() => {
    const parts: string[] = []
    parts.push(`Issue ${previewCoins || 0} coins`)
    if (audience === 'newOnly') parts.push('to new customers')
    if (showMinCash && Number(minimumCashPaid) > 0)
      parts.push(`when they pay ₹${minimumCashPaid} cash or more`)
    if (perCartCapType === 'percent')
      parts.push(
        `; usable up to ${perCartCapValue}% of the cart (₹${capApplied} on a ₹${sampleCart} cart)`,
      )
    else parts.push(`; usable up to ₹${perCartCapValue} per cart`)
    return parts.join(' ') + '.'
  }, [previewCoins, audience, showMinCash, minimumCashPaid, perCartCapType, perCartCapValue, capApplied, sampleCart])

  const formErrors = useMemo(() => {
    const errs: string[] = []
    if (!name) errs.push('Name is required')
    if (nameError) errs.push(nameError)
    if (!code) errs.push('Code is required')
    if (codeError) errs.push(codeError)
    if (requiresInternalDesc && !internalDescription)
      errs.push('Internal description is required for specific-customer programmes')
    if (showCampaignCode && !campaignCode) errs.push('Campaign code is required')
    if (showMobileList && mobileNumbers.length === 0)
      errs.push('At least one mobile number is required')
    if (!(Number(coinsPerCustomer) > 0)) errs.push('Coins per customer must be > 0')
    if (!startAt) errs.push('Start date is required')
    if (!endAt) errs.push('End date is required')
    if (startAt && endAt && new Date(endAt).getTime() <= new Date(startAt).getTime())
      errs.push('End must be after start')
    if (!(Number(perCartCapValue) > 0)) errs.push('Per-cart cap must be > 0')
    if (perCartCapType === 'percent' && Number(perCartCapValue) > 100)
      errs.push('Per-cart cap % cannot exceed 100')
    if (chargeComponents.length === 0)
      errs.push('Select at least one charge component')
    if (!(Number(budgetCoins) > 0)) errs.push('Programme budget must be > 0')
    if (Number(hardStopCoins) > Number(budgetCoins))
      errs.push('Hard stop cannot exceed the budget')
    if (showMobileList && mobileNumbers.length * Number(coinsPerCustomer) > Number(budgetCoins))
      errs.push('Total coins for the mobile list exceed the budget')
    if (!customerText.displayName) errs.push('Customer display name is required')
    if (!customerText.description) errs.push('Customer description is required')
    return errs
  }, [
    name, nameError, code, codeError, requiresInternalDesc, internalDescription,
    showCampaignCode, campaignCode, showMobileList, mobileNumbers, coinsPerCustomer,
    startAt, endAt, perCartCapValue, perCartCapType, chargeComponents, budgetCoins,
    hardStopCoins, customerText,
  ])

  const canSubmit = formErrors.length === 0

  const toPayload = (): Partial<Programme> => ({
    ...(initialProgramme ? { id: initialProgramme.id } : {}),
    name,
    code,
    type,
    internalDescription: internalDescription || undefined,
    audience,
    minimumCashPaid: showMinCash && minimumCashPaid ? Number(minimumCashPaid) : undefined,
    campaignCode: showCampaignCode ? campaignCode : undefined,
    mobileNumbers: showMobileList ? mobileNumbers : undefined,
    limitPerCustomer: Number(limitPerCustomer),
    coinsPerCustomer: Number(coinsPerCustomer),
    rewardBasis: showRewardBasis ? rewardBasis : undefined,
    percentOfCash:
      showRewardBasis && rewardBasis === 'percentOfCash' ? Number(percentOfCash) : undefined,
    startAt: fromDatetimeLocal(startAt),
    endAt: fromDatetimeLocal(endAt),
    creditValidityDays: validityMode === 'days' ? Number(validityDays) : undefined,
    creditValidityDate: validityMode === 'date' ? validityDate : undefined,
    perCartCapType,
    perCartCapValue: Number(perCartCapValue),
    partialUse,
    chargeComponents,
    lotUseOrder,
    budgetCoins: Number(budgetCoins),
    alertLevelPercent: alertLevelPercent ? Number(alertLevelPercent) : undefined,
    hardStopCoins: Number(hardStopCoins || budgetCoins),
    customerText,
  })

  const handleSubmit = (action: 'draft' | 'schedule' | 'activate') => {
    if (!canSubmit && action !== 'draft') return
    // Preview-only: typing FAIL as the code demonstrates the save-failure banner (8.11).
    if (code === 'FAIL' && !saveFailure) {
      setSaveFailure({ action })
      return
    }
    let status: ProgrammeStatus = 'draft'
    if (action === 'schedule') status = 'scheduled'
    if (action === 'activate') {
      const startTime = new Date(startAt).getTime()
      status = startTime > Date.now() ? 'scheduled' : 'active'
    }
    onSubmit?.({ ...toPayload(), status }, action)
  }

  const toggle = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? 'Edit Programme' : 'Create Programme'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('schedule')}
              disabled={!canSubmit}
              className="px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule
            </button>
            <button
              onClick={() => handleSubmit('activate')}
              disabled={!canSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Activate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {saveFailure && (
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-0.5">
                    Save didn't go through
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Network or server error. Your form data is safe — nothing was lost.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const action = saveFailure.action
                    setSaveFailure(null)
                    handleSubmit(action)
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  <RefreshCw className="w-3 h-3" />
                  Retry
                </button>
                <button
                  onClick={() => setSaveFailure(null)}
                  className="p-1.5 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {listOverBudget && (
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-0.5">
                  Mobile list exceeds the programme budget
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {mobileNumbers.length} numbers × {Number(coinsPerCustomer) || 0} coins = {' '}
                  {listTotalCoins.toLocaleString('en-IN')} coins, but the budget is only {' '}
                  {(Number(budgetCoins) || 0).toLocaleString('en-IN')} coins. The whole upload will
                  be refused. Raise the budget or trim the list.
                </p>
              </div>
            </div>
          )}

          {uploadResult && (
            <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-200 mb-1">
                    Upload processed
                  </p>
                  <p className="text-xs text-cyan-700 dark:text-cyan-300 mb-2">
                    {uploadResult.added} added ·{' '}
                    {uploadResult.skippedDuplicates} duplicates skipped ·{' '}
                    {uploadResult.rejected.length} rejected
                  </p>
                  {uploadResult.rejected.length > 0 && (
                    <details className="text-xs text-cyan-700 dark:text-cyan-300">
                      <summary className="cursor-pointer font-medium">
                        See rejected rows
                      </summary>
                      <ul className="mt-2 space-y-0.5 max-h-32 overflow-y-auto">
                        {uploadResult.rejected.slice(0, 20).map((r) => (
                          <li key={`${r.row}-${r.value}`}>
                            Row {r.row}: <span className="font-mono">{r.value || '(empty)'}</span>{' '}
                            — {r.reason}
                          </li>
                        ))}
                        {uploadResult.rejected.length > 20 && (
                          <li>+ {uploadResult.rejected.length - 20} more…</li>
                        )}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
              <button
                onClick={() => setUploadResult(null)}
                className="p-1.5 rounded-md text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}


          <SectionCard
            title="A · Basics"
            isOpen={openSections.A}
            onToggle={() => toggle('A')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Programme name" required error={nameError}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Welcome Coins for New Users"
                  className={inputCls(!!nameError)}
                />
              </Field>
              <Field label="Programme code" required error={codeError}>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="WELCOME500"
                  className={inputCls(!!codeError) + ' font-mono uppercase tracking-wide'}
                />
              </Field>
              <Field label="Type" required>
                <select
                  value={type}
                  onChange={(e) => {
                    const t = e.target.value as ProgrammeType
                    setType(t)
                    if (t === 'firstTimeCheck') setAudience('newOnly')
                    else setAudience('all')
                  }}
                  className={inputCls(false)}
                >
                  {(Object.keys(typeLabels) as ProgrammeType[]).map((t) => (
                    <option key={t} value={t}>
                      {typeLabels[t]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Internal description"
                required={requiresInternalDesc}
              >
                <textarea
                  value={internalDescription}
                  onChange={(e) => setInternalDescription(e.target.value)}
                  rows={2}
                  placeholder="Why is this programme being created?"
                  className={inputCls(false)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            title="B · Trigger & Audience"
            isOpen={openSections.B}
            onToggle={() => toggle('B')}
          >
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2 mb-4">
              <Info className="w-4 h-4 text-slate-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                  Trigger
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  {triggerText[type]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Customer status" required>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAudience('all')}
                    className={selectableCls(audience === 'all')}
                  >
                    All customers
                  </button>
                  <button
                    type="button"
                    onClick={() => setAudience('newOnly')}
                    className={selectableCls(audience === 'newOnly')}
                  >
                    New to ChallanPay only
                  </button>
                </div>
              </Field>

              <Field label="Limit per customer" required>
                <input
                  type="number"
                  min={1}
                  value={limitPerCustomer}
                  onChange={(e) => setLimitPerCustomer(e.target.value)}
                  className={inputCls(false)}
                />
              </Field>

              {showMinCash && (
                <Field
                  label="Minimum cash paid (₹)"
                  help="Optional. Only cash paid counts."
                >
                  <input
                    type="number"
                    min={0}
                    value={minimumCashPaid}
                    onChange={(e) => setMinimumCashPaid(e.target.value)}
                    placeholder="e.g. 200"
                    className={inputCls(false)}
                  />
                </Field>
              )}

              {showCampaignCode && (
                <Field label="Campaign code" required>
                  <input
                    type="text"
                    value={campaignCode}
                    onChange={(e) => setCampaignCode(e.target.value.toUpperCase())}
                    placeholder="ROHIT100"
                    className={inputCls(false) + ' font-mono uppercase'}
                  />
                </Field>
              )}

              {showMobileList && (
                <Field
                  label="Mobile number list"
                  required
                  className="sm:col-span-2"
                  help="Duplicates removed. Numbers already credited are skipped."
                >
                  <MobileListInput
                    value={mobileNumbers}
                    draft={mobileDraft}
                    onDraftChange={setMobileDraft}
                    onChange={setMobileNumbers}
                    onUploadReport={setUploadResult}
                  />
                </Field>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="C · Amount & Validity"
            isOpen={openSections.C}
            onToggle={() => toggle('C')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Coins per customer" required help="1 coin = ₹1.">
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={coinsPerCustomer}
                    onChange={(e) => setCoinsPerCustomer(e.target.value)}
                    placeholder="500"
                    className={inputCls(false) + ' pr-16'}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    ≈ ₹{Number(coinsPerCustomer) || 0}
                  </span>
                </div>
              </Field>

              {showRewardBasis && (
                <Field label="Reward basis" required>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRewardBasis('fixedCoins')}
                      className={selectableCls(rewardBasis === 'fixedCoins')}
                    >
                      Fixed coins
                    </button>
                    <button
                      type="button"
                      onClick={() => setRewardBasis('percentOfCash')}
                      className={selectableCls(rewardBasis === 'percentOfCash')}
                    >
                      % of cash paid
                    </button>
                  </div>
                </Field>
              )}

              {showRewardBasis && rewardBasis === 'percentOfCash' && (
                <Field label="Percent of cash paid (1–100)" required help="Coins per customer becomes the maximum reward per order.">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={percentOfCash}
                    onChange={(e) => setPercentOfCash(e.target.value)}
                    placeholder="5"
                    className={inputCls(false)}
                  />
                </Field>
              )}

              <Field label="Programme start" required>
                <input
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Programme end" required>
                <input
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Credit validity" required className="sm:col-span-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setValidityMode('days')}
                      className={selectableCls(validityMode === 'days')}
                    >
                      Days from issue
                    </button>
                    <button
                      type="button"
                      onClick={() => setValidityMode('date')}
                      className={selectableCls(validityMode === 'date')}
                    >
                      Fixed date
                    </button>
                  </div>
                  {validityMode === 'days' ? (
                    <input
                      type="number"
                      min={1}
                      value={validityDays}
                      onChange={(e) => setValidityDays(e.target.value)}
                      placeholder="30"
                      className={inputCls(false)}
                    />
                  ) : (
                    <input
                      type="date"
                      value={validityDate}
                      onChange={(e) => setValidityDate(e.target.value)}
                      className={inputCls(false)}
                    />
                  )}
                </div>
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            title="D · Use Rules"
            isOpen={openSections.D}
            onToggle={() => toggle('D')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Per-cart cap" required>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPerCartCapType('percent')}
                    className={selectableCls(perCartCapType === 'percent')}
                  >
                    % of cart
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerCartCapType('fixed')}
                    className={selectableCls(perCartCapType === 'fixed')}
                  >
                    Fixed amount
                  </button>
                </div>
              </Field>

              <Field
                label={perCartCapType === 'percent' ? 'Cap % (1–100)' : 'Cap amount (₹)'}
                required
              >
                <input
                  type="number"
                  min={1}
                  max={perCartCapType === 'percent' ? 100 : undefined}
                  value={perCartCapValue}
                  onChange={(e) => setPerCartCapValue(e.target.value)}
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Partial use">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    Unused coins stay in the balance
                  </span>
                  <Toggle checked={partialUse} onChange={setPartialUse} />
                </div>
              </Field>

              <Field label="Order lots are used in">
                <select
                  value={lotUseOrder}
                  onChange={(e) => setLotUseOrder(e.target.value as LotUseOrder)}
                  className={inputCls(false)}
                >
                  <option value="earliestExpiryFirst">Earliest expiry first</option>
                  <option value="other">Other order</option>
                </select>
              </Field>

              <Field
                label="Charge components"
                required
                className="sm:col-span-2"
                help="Government and court dues are always excluded."
              >
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(chargeComponentLabels) as ProgrammeChargeComponent[]).map(
                    (cc) => {
                      const checked = chargeComponents.includes(cc)
                      return (
                        <CheckboxPill
                          key={cc}
                          label={chargeComponentLabels[cc]}
                          checked={checked}
                          onChange={() => {
                            setChargeComponents((prev) =>
                              checked ? prev.filter((x) => x !== cc) : [...prev, cc],
                            )
                          }}
                        />
                      )
                    },
                  )}
                </div>
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            title="E · Budget"
            isOpen={openSections.E}
            onToggle={() => toggle('E')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Programme budget (coins)" required>
                <input
                  type="number"
                  min={1}
                  value={budgetCoins}
                  onChange={(e) => {
                    setBudgetCoins(e.target.value)
                    if (!hardStopCoins) setHardStopCoins(e.target.value)
                  }}
                  placeholder="500000"
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Alert level (% of budget)">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={alertLevelPercent}
                  onChange={(e) => setAlertLevelPercent(e.target.value)}
                  placeholder="80"
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Hard stop (coins)">
                <input
                  type="number"
                  min={0}
                  value={hardStopCoins}
                  onChange={(e) => setHardStopCoins(e.target.value)}
                  className={inputCls(false)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            title="F · Customer Text"
            isOpen={openSections.F}
            onToggle={() => toggle('F')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Display name" required>
                <input
                  type="text"
                  value={customerText.displayName}
                  onChange={(e) =>
                    setCustomerText((prev) => ({ ...prev, displayName: e.target.value }))
                  }
                  placeholder="Welcome credit"
                  className={inputCls(false)}
                />
              </Field>
              <Field
                label="Description"
                required
                className="sm:col-span-2"
                help="Must state that credit is not cash, when it expires, and where it can be used."
              >
                <textarea
                  value={customerText.description}
                  onChange={(e) =>
                    setCustomerText((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                  className={inputCls(false)}
                  placeholder="Free coins for ChallanPay charges. Not withdrawable, expires in 60 days."
                />
              </Field>
              <Field label="Issued message" required className="sm:col-span-2" help="Placeholders: {coins}, {expiry}, {balance}">
                <input
                  type="text"
                  value={customerText.issuedMessage}
                  onChange={(e) =>
                    setCustomerText((prev) => ({ ...prev, issuedMessage: e.target.value }))
                  }
                  className={inputCls(false)}
                />
              </Field>
              <Field label="Used message" required>
                <input
                  type="text"
                  value={customerText.usedMessage}
                  onChange={(e) =>
                    setCustomerText((prev) => ({ ...prev, usedMessage: e.target.value }))
                  }
                  className={inputCls(false)}
                />
              </Field>
              <Field label="Expiring message" required>
                <input
                  type="text"
                  value={customerText.expiringMessage}
                  onChange={(e) =>
                    setCustomerText((prev) => ({ ...prev, expiringMessage: e.target.value }))
                  }
                  className={inputCls(false)}
                />
              </Field>
            </div>
          </SectionCard>
        </div>

        {/* Live preview panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Live Preview
            </h3>

            <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900 mb-4">
              <p className="text-sm text-cyan-900 dark:text-cyan-100 leading-relaxed">
                {previewSentence}
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Cart (₹)</label>
                  <input
                    type="number"
                    value={sampleCart}
                    onChange={(e) => setSampleCart(Number(e.target.value) || 0)}
                    className={inputCls(false)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Balance (coins)</label>
                  <input
                    type="number"
                    value={sampleBalance}
                    onChange={(e) => setSampleBalance(Number(e.target.value) || 0)}
                    className={inputCls(false)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5 text-sm">
                <PreviewRow label="Cart" value={`₹${sampleCart}`} />
                <PreviewRow label="Per-cart cap" value={`₹${capApplied}`} />
                <PreviewRow label="Coins usable" value={`${coinsUsable} coins`} highlight />
                <PreviewRow label="Cash payable" value={`₹${cashPayable}`} />
              </div>

              {coinsUsable > 0 && (
                <div className="p-2.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  Customer saves ₹{coinsUsable} on this order.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionCard({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
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
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  required,
  help,
  error,
  className,
  children,
}: {
  label: string
  required?: boolean
  help?: string
  error?: string | null
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : help ? (
        <span className="text-xs text-slate-400">{help}</span>
      ) : null}
    </label>
  )
}

function PreviewRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={
          highlight
            ? 'font-semibold text-cyan-700 dark:text-cyan-300'
            : 'text-slate-700 dark:text-slate-200'
        }
      >
        {value}
      </span>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function CheckboxPill({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
        checked
          ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'
      }`}
    >
      {checked && <Check className="w-4 h-4" strokeWidth={3} />}
      {label}
    </button>
  )
}

function MobileListInput({
  value,
  draft,
  onDraftChange,
  onChange,
  onUploadReport,
}: {
  value: string[]
  draft: string
  onDraftChange: (v: string) => void
  onChange: (v: string[]) => void
  onUploadReport?: (result: {
    added: number
    skippedDuplicates: number
    rejected: { row: number; value: string; reason: string }[]
  }) => void
}) {
  const commit = () => {
    const items = draft
      .split(/[\s,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => /^\d{10}$/.test(s))
    if (items.length === 0) return
    const next = Array.from(new Set([...value, ...items]))
    onChange(next)
    onDraftChange('')
  }

  const handleCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      const rows = text.split(/[\n\r]+/).flatMap((line) =>
        line.split(/[,;\s]+/).filter(Boolean),
      )
      const existing = new Set(value)
      const seenInFile = new Set<string>()
      const validNew: string[] = []
      const rejected: { row: number; value: string; reason: string }[] = []
      let skippedDuplicates = 0
      rows.forEach((raw, idx) => {
        const s = raw.trim()
        if (!s) return
        if (!/^\d{10}$/.test(s)) {
          rejected.push({ row: idx + 1, value: s, reason: 'Not a valid 10-digit mobile number' })
          return
        }
        if (seenInFile.has(s) || existing.has(s)) {
          skippedDuplicates++
          return
        }
        seenInFile.add(s)
        validNew.push(s)
      })
      onChange([...value, ...validNew])
      onUploadReport?.({
        added: validNew.length,
        skippedDuplicates,
        rejected,
      })
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              commit()
            }
          }}
          placeholder="Type numbers separated by comma / space / newline"
          className={inputCls(false)}
        />
        <button
          type="button"
          onClick={commit}
          className="px-3 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-sm"
        >
          Add
        </button>
        <label className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer inline-flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" />
          CSV
          <input type="file" accept=".csv,.txt" onChange={handleCsv} className="hidden" />
        </label>
      </div>
      {value.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-slate-500 mb-2">{value.length} number{value.length > 1 ? 's' : ''} added</p>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {value.slice(0, 40).map((num) => (
              <span
                key={num}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                {num}
                <button
                  type="button"
                  onClick={() => onChange(value.filter((n) => n !== num))}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {value.length > 40 && (
              <span className="inline-flex items-center px-2 py-1 text-xs text-slate-400">
                + {value.length - 40} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function inputCls(hasError: boolean): string {
  return `w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border ${
    hasError
      ? 'border-red-300 dark:border-red-800 focus:ring-red-400'
      : 'border-slate-200 dark:border-slate-700 focus:ring-cyan-500'
  } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500`
}

function selectableCls(selected: boolean): string {
  return `px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
    selected
      ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
  }`
}
