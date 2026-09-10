import { useState } from 'react'
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

  const conv = draft.onlineConvenienceFee ?? null
  if (conv === null || Number.isNaN(conv)) {
    errors.onlineConvenienceFee = 'Online Convenience Fee is required.'
  } else if (conv < 0) {
    errors.onlineConvenienceFee = 'Value cannot be negative.'
  }

  const court = draft.onlineCourtFee ?? null
  if (court === null || Number.isNaN(court)) {
    errors.onlineCourtFee = 'Online Court Fee is required.'
  } else if (court < 0) {
    errors.onlineCourtFee = 'Value cannot be negative.'
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
          operationsCostPct: null,
          lawyeredCvPct: null,
          lawyeredNcvPct: null,
          onlineConvenienceFee: null,
          onlineCourtFee: null,
          status: initialConfig.status,
        }
      : {
          product: defaultProduct ?? 'challanPay',
          state: null,
          region: 'All Regions',
          operationsCostPct: null,
          lawyeredCvPct: null,
          lawyeredNcvPct: null,
          onlineConvenienceFee: null,
          onlineCourtFee: null,
          status: 'active',
        },
  )
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [challanType, setChallanType] = useState<'regular' | 'express'>('regular')

  const stateLocked = mode === 'edit'
  const availableStates =
    mode === 'edit'
      ? states
      : states.filter((s) => !existingStates.includes(s))

  const handleSubmit = () => {
    setTouched({
      state: true,
      onlineConvenienceFee: true,
      onlineCourtFee: true,
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

              <Field label="Challan Type" required>
                <Select
                  value={challanType}
                  placeholder="Select a type…"
                  onChange={(v) => setChallanType(v as 'regular' | 'express')}
                  options={[
                    { value: 'regular', label: 'Regular' },
                    { value: 'express', label: 'Express' },
                  ]}
                />
              </Field>

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

          {/* Fees */}
          <SectionGroup eyebrow="2 · Fees" title="Fees">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="Online Convenience Fee"
                required
                error={
                  showError('onlineConvenienceFee')
                    ? errors.onlineConvenienceFee
                    : undefined
                }
              >
                <RupeeInput
                  value={draft.onlineConvenienceFee ?? null}
                  placeholder="e.g., 250"
                  onChange={(v) => {
                    setDraft({ ...draft, onlineConvenienceFee: v })
                    if (touched.onlineConvenienceFee)
                      setErrors(
                        validate({ ...draft, onlineConvenienceFee: v }),
                      )
                  }}
                  onBlur={() => markTouched('onlineConvenienceFee')}
                  invalid={!!showError('onlineConvenienceFee')}
                />
              </Field>

              <Field
                label="Online Court Fee"
                required
                error={
                  showError('onlineCourtFee') ? errors.onlineCourtFee : undefined
                }
              >
                <RupeeInput
                  value={draft.onlineCourtFee ?? null}
                  placeholder="e.g., 500"
                  onChange={(v) => {
                    setDraft({ ...draft, onlineCourtFee: v })
                    if (touched.onlineCourtFee)
                      setErrors(validate({ ...draft, onlineCourtFee: v }))
                  }}
                  onBlur={() => markTouched('onlineCourtFee')}
                  invalid={!!showError('onlineCourtFee')}
                />
              </Field>
            </div>
          </SectionGroup>
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

function RupeeInput({
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
    <div
      className={`flex items-center h-11 rounded-lg border bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/20 transition-colors ${
        invalid
          ? 'border-rose-400 dark:border-rose-500 focus-within:border-rose-500'
          : 'border-slate-200 dark:border-slate-700 focus-within:border-cyan-500'
      }`}
    >
      <span className="px-3 h-full flex items-center text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
        ₹
      </span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step="1"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') onChange(null)
          else onChange(Number(raw))
        }}
        onBlur={onBlur}
        className="w-full h-full px-3 text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  )
}
