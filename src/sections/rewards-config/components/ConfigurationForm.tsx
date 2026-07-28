import { useMemo, useState } from 'react'
import { AlertCircle, ChevronDown, Lock } from 'lucide-react'
import type {
  ConfigDraft,
  Product,
  RewardsConfig,
  ValidationErrors,
} from '@/../product/sections/rewards-config/types'

const PLATFORM_OPTIONS: { value: Product; label: string }[] = [
  { value: 'challanPay', label: 'ChallanPay' },
  { value: 'lots247', label: 'LOTS247' },
]
import { InfoTooltip } from './InfoTooltip'
import { MaxRewardPreview } from './MaxRewardPreview'

interface ConfigurationFormProps {
  mode: 'add' | 'edit'
  states: string[]
  existingStates: string[]
  initialConfig?: RewardsConfig
  defaultProduct?: Product
  onCancel: () => void
  onSubmit: (draft: ConfigDraft) => void
}

function validate(draft: ConfigDraft): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!draft.state) {
    errors.state = 'Please select a state.'
  }

  const cost = draft.operationsCostPct
  if (cost === null || Number.isNaN(cost)) {
    errors.operationsCostPct = 'Operations Cost % is required.'
  } else if (cost < 0 || cost > 100) {
    errors.operationsCostPct = 'Enter a value between 0 and 100.'
  }

  const margin =
    cost !== null && !Number.isNaN(cost) ? 100 - cost : null

  const cv = draft.lawyeredCvPct
  if (cv === null || Number.isNaN(cv)) {
    errors.lawyeredCvPct = 'Lawyered CV Margin % is required.'
  } else if (cv < 0) {
    errors.lawyeredCvPct = 'Value cannot be negative.'
  } else if (margin !== null && cv > margin) {
    errors.lawyeredCvPct = `Must be ≤ Margin % (${margin}%).`
  }

  const ncv = draft.lawyeredNcvPct
  if (ncv === null || Number.isNaN(ncv)) {
    errors.lawyeredNcvPct = 'Lawyered NCV Margin % is required.'
  } else if (ncv < 0) {
    errors.lawyeredNcvPct = 'Value cannot be negative.'
  } else if (margin !== null && ncv > margin) {
    errors.lawyeredNcvPct = `Must be ≤ Margin % (${margin}%).`
  }

  return errors
}

export function ConfigurationForm({
  mode,
  states,
  existingStates,
  initialConfig,
  defaultProduct,
  onCancel,
  onSubmit,
}: ConfigurationFormProps) {
  const [draft, setDraft] = useState<ConfigDraft>(() =>
    initialConfig
      ? {
          product: initialConfig.product,
          state: initialConfig.state,
          region: initialConfig.region,
          operationsCostPct: initialConfig.operationsCostPct,
          lawyeredCvPct: initialConfig.lawyeredCvPct,
          lawyeredNcvPct: initialConfig.lawyeredNcvPct,
          status: initialConfig.status,
        }
      : {
          product: defaultProduct ?? 'challanPay',
          state: null,
          region: 'All Regions',
          operationsCostPct: null,
          lawyeredCvPct: null,
          lawyeredNcvPct: null,
          status: 'active',
        },
  )
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [rewardTierMode, setRewardTierMode] = useState<'flat' | 'range'>('flat')
  const [rangeLowPct, setRangeLowPct] = useState<number | null>(20)
  const [rangeHighPct, setRangeHighPct] = useState<number | null>(30)

  const marginPct = useMemo(() => {
    if (draft.operationsCostPct === null || Number.isNaN(draft.operationsCostPct))
      return null
    return 100 - draft.operationsCostPct
  }, [draft.operationsCostPct])

  const stateLocked = mode === 'edit'
  const availableStates =
    mode === 'edit'
      ? states
      : states.filter((s) => !existingStates.includes(s))

  const handleSubmit = () => {
    setTouched({
      state: true,
      operationsCostPct: true,
      lawyeredCvPct: true,
      lawyeredNcvPct: true,
    })
    const nextErrors = validate(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(draft)
    }
  }

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(draft))
  }

  const showError = (field: keyof ValidationErrors) =>
    touched[field] && errors[field]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Body */}
        <div className="px-8 py-8 space-y-10">
          {/* Scope Section */}
          <SectionGroup
            eyebrow="1 · Scope"
            title="Platform and State"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Platform" required>
                <Select
                  value={draft.product ?? 'challanPay'}
                  placeholder="Select a platform…"
                  onChange={(v) =>
                    setDraft({ ...draft, product: v as Product })
                  }
                  options={PLATFORM_OPTIONS.map((p) => ({
                    value: p.value,
                    label: p.label,
                  }))}
                />
              </Field>

              <div className="hidden md:block" />

              <Field
                label="Select State"
                required
                locked={stateLocked}
                error={showError('state') ? errors.state : undefined}
              >
                {stateLocked ? (
                  <LockedInput value={draft.state ?? ''} />
                ) : (
                  <Select
                    value={draft.state ?? ''}
                    placeholder="Select a state…"
                    onChange={(v) => {
                      const next = { ...draft, state: v || null }
                      setDraft(next)
                      setTouched((prev) => ({ ...prev, state: true }))
                      setErrors(validate(next))
                    }}
                    options={availableStates.map((s) => ({ value: s, label: s }))}
                    invalid={!!showError('state')}
                  />
                )}
              </Field>

              <Field label="Select Region" locked>
                <LockedInput value={draft.region} />
              </Field>
            </div>
          </SectionGroup>

          {/* Cost & Margin */}
          <SectionGroup
            eyebrow="2 · Cost & Margin"
            title="Operations Cost & Margin"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="Operations Cost %"
                required
                error={showError('operationsCostPct') ? errors.operationsCostPct : undefined}
              >
                <PercentInput
                  value={draft.operationsCostPct}
                  placeholder="e.g., 30"
                  onChange={(v) => {
                    setDraft({ ...draft, operationsCostPct: v })
                    if (touched.operationsCostPct)
                      setErrors(validate({ ...draft, operationsCostPct: v }))
                  }}
                  onBlur={() => markTouched('operationsCostPct')}
                  invalid={!!showError('operationsCostPct')}
                />
              </Field>

              <Field label="Margin %" locked>
                <div className="flex items-center h-11 px-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-base">
                  <span className="text-slate-900 dark:text-white font-semibold tabular-nums">
                    {marginPct !== null ? `${marginPct}%` : '—'}
                  </span>
                </div>
              </Field>
            </div>
          </SectionGroup>

          {/* Lawyered Margins */}
          <SectionGroup
            eyebrow="3 · Lawyered Margins"
            title="Lawyered CV & NCV Margins"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label={
                  <span className="inline-flex items-center gap-1.5">
                    Lawyered CV Margin %
                    <InfoTooltip label="CV — Commercial Vehicle" />
                  </span>
                }
                required
                error={showError('lawyeredCvPct') ? errors.lawyeredCvPct : undefined}
              >
                <PercentInput
                  value={draft.lawyeredCvPct}
                  placeholder="e.g., 10"
                  onChange={(v) => {
                    setDraft({ ...draft, lawyeredCvPct: v })
                    if (touched.lawyeredCvPct)
                      setErrors(validate({ ...draft, lawyeredCvPct: v }))
                  }}
                  onBlur={() => markTouched('lawyeredCvPct')}
                  invalid={!!showError('lawyeredCvPct')}
                />
                <FieldHint>
                  Must be ≤ Margin %
                  {marginPct !== null ? ` (${marginPct}%).` : '.'}
                </FieldHint>
              </Field>

              <Field
                label={
                  <span className="inline-flex items-center gap-1.5">
                    Lawyered NCV Margin %
                    <InfoTooltip label="NCV — Non-Commercial Vehicle" />
                  </span>
                }
                required
                error={showError('lawyeredNcvPct') ? errors.lawyeredNcvPct : undefined}
              >
                <PercentInput
                  value={draft.lawyeredNcvPct}
                  placeholder="e.g., 15"
                  onChange={(v) => {
                    setDraft({ ...draft, lawyeredNcvPct: v })
                    if (touched.lawyeredNcvPct)
                      setErrors(validate({ ...draft, lawyeredNcvPct: v }))
                  }}
                  onBlur={() => markTouched('lawyeredNcvPct')}
                  invalid={!!showError('lawyeredNcvPct')}
                />
                <FieldHint>
                  Must be ≤ Margin %
                  {marginPct !== null ? ` (${marginPct}%).` : '.'}
                </FieldHint>
              </Field>
            </div>
          </SectionGroup>

          {/* Reward Tier */}
          <SectionGroup eyebrow="4 · Reward Tier" title="Reward Tier">
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <RadioOption
                  name="rewardTier"
                  value="flat"
                  label="Flat Reward"
                  checked={rewardTierMode === 'flat'}
                  onChange={() => setRewardTierMode('flat')}
                />
                <RadioOption
                  name="rewardTier"
                  value="range"
                  label="Range"
                  checked={rewardTierMode === 'range'}
                  onChange={() => setRewardTierMode('range')}
                />
              </div>

              {rewardTierMode === 'range' && (
                <div className="space-y-3 pt-1">
                  <RangeRow
                    label="2000 – 5000"
                    value={rangeLowPct}
                    onChange={setRangeLowPct}
                  />
                  <RangeRow
                    label="5000 and more"
                    value={rangeHighPct}
                    onChange={setRangeHighPct}
                  />
                </div>
              )}
            </div>
          </SectionGroup>

          {/* Preview */}
          <MaxRewardPreview
            marginPct={marginPct}
            lawyeredCvPct={draft.lawyeredCvPct}
            lawyeredNcvPct={draft.lawyeredNcvPct}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
            >
              {mode === 'add' ? 'Add Configuration' : 'Update Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Sub-components ----------

function SectionGroup({
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  locked,
  hint,
  error,
  children,
}: {
  label: React.ReactNode
  required?: boolean
  locked?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5">
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
        {locked && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Lock className="w-3 h-3" /> Locked
          </span>
        )}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <FieldHint>{hint}</FieldHint>
      ) : null}
    </div>
  )
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{children}</p>
  )
}

function LockedInput({ value }: { value: string }) {
  return (
    <div className="flex items-center h-11 px-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/50 text-base text-slate-500 dark:text-slate-400">
      {value}
    </div>
  )
}

function Select({
  value,
  onChange,
  placeholder,
  options,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
  invalid?: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none pl-3.5 pr-9 h-11 text-base bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors ${
          invalid
            ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500'
            : 'border-slate-200 dark:border-slate-700 focus:border-cyan-500'
        } ${!value ? 'text-slate-400 dark:text-slate-500' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-slate-900 dark:text-white">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
    </div>
  )
}

function PercentInput({
  value,
  placeholder,
  onChange,
  onBlur,
  invalid,
}: {
  value: number | null
  placeholder?: string
  onChange: (v: number | null) => void
  onBlur?: () => void
  invalid?: boolean
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={100}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') onChange(null)
          else onChange(Number(raw))
        }}
        onBlur={onBlur}
        className={`w-full h-11 pl-3.5 pr-9 text-base bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors tabular-nums ${
          invalid
            ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500'
            : 'border-slate-200 dark:border-slate-700 focus:border-cyan-500'
        }`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
        %
      </span>
    </div>
  )
}

function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-6 h-6 accent-cyan-600"
      />
      <span className="text-base font-medium text-slate-800 dark:text-slate-200">
        {label}
      </span>
    </label>
  )
}

function RangeRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: number | null
  onChange: (v: number | null) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div className="flex items-center h-11 px-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 tabular-nums">
          {label}
        </span>
      </div>
      <PercentInput value={value} placeholder="e.g., 50" onChange={onChange} />
    </div>
  )
}
