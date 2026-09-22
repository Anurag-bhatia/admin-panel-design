import { Plus, Trash2, GitBranch, Ban } from 'lucide-react'
import type {
  AdvancedRules,
  Rule,
  RuleCategory,
  RuleGroup,
} from '@/../product/sections/cms/types'

interface AdvancedRulesBuilderProps {
  value: AdvancedRules
  onChange: (next: AdvancedRules) => void
  readOnly?: boolean
}

interface AttributeConfig {
  value: string
  label: string
  operators: { value: string; label: string }[]
  valueType: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi'
  options?: string[]
  placeholder?: string
  unit?: string
}

interface CategoryConfig {
  label: string
  attributes: AttributeConfig[]
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
]

const CAMPAIGN_TAGS = [
  'Corporate Employees',
  'Partner Campaign X',
  'Refer & Earn',
  'Repeat Customer',
]

const OFFENCE_GROUPS = [
  'Speeding',
  'Signal Jump',
  'No Helmet',
  'No Seatbelt',
  'Wrong Parking',
  'Drunk Driving',
]

const ISSUING_AUTHORITIES = [
  'Delhi Traffic Police',
  'Mumbai Traffic Police',
  'Bengaluru Traffic Police',
  'Kolkata Traffic Police',
  'Hyderabad Traffic Police',
]

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CATEGORIES: Record<RuleCategory, CategoryConfig> = {
  customerHistory: {
    label: 'Customer history',
    attributes: [
      {
        value: 'firstTransaction',
        label: 'First transaction',
        operators: [{ value: 'is', label: 'is' }],
        valueType: 'boolean',
      },
      {
        value: 'successfulTransactionCount',
        label: 'Successful transaction count',
        operators: [
          { value: 'equals', label: 'equals' },
          { value: 'atLeast', label: 'at least' },
          { value: 'atMost', label: 'at most' },
        ],
        valueType: 'number',
        placeholder: '0',
      },
      {
        value: 'lastSuccessfulTransactionDate',
        label: 'Last successful transaction date',
        operators: [
          { value: 'before', label: 'before' },
          { value: 'after', label: 'after' },
        ],
        valueType: 'date',
      },
      {
        value: 'daysSinceLastTransaction',
        label: 'Days since last transaction',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'atMost', label: 'at most' },
        ],
        valueType: 'number',
        unit: 'days',
      },
    ],
  },
  customerIdentity: {
    label: 'Customer identity',
    attributes: [
      {
        value: 'customerId',
        label: 'Customer ID',
        operators: [
          { value: 'is', label: 'is' },
          { value: 'isNot', label: 'is not' },
          { value: 'inList', label: 'in list' },
        ],
        valueType: 'text',
        placeholder: 'CUS-000123',
      },
      {
        value: 'verifiedMobileNumber',
        label: 'Verified mobile number',
        operators: [
          { value: 'is', label: 'is' },
          { value: 'inList', label: 'in list' },
        ],
        valueType: 'text',
        placeholder: '+91 98765 43210',
      },
      {
        value: 'campaignTag',
        label: 'Campaign / acquisition tag',
        operators: [
          { value: 'is', label: 'is' },
          { value: 'inList', label: 'in list' },
        ],
        valueType: 'select',
        options: CAMPAIGN_TAGS,
      },
    ],
  },
  vehicle: {
    label: 'Vehicle',
    attributes: [
      {
        value: 'vehicleNumber',
        label: 'Vehicle number',
        operators: [
          { value: 'equals', label: 'equals' },
          { value: 'inList', label: 'in list' },
        ],
        valueType: 'text',
        placeholder: 'DL 05 AB 1234',
      },
      {
        value: 'vehicleType',
        label: 'Vehicle type',
        operators: [
          { value: 'equals', label: 'is' },
          { value: 'notEquals', label: 'is not' },
        ],
        valueType: 'select',
        options: ['Commercial', 'Non-commercial'],
      },
      {
        value: 'registrationState',
        label: 'Registration state',
        operators: [
          { value: 'equals', label: 'is' },
          { value: 'inList', label: 'in list' },
          { value: 'notInList', label: 'not in list' },
        ],
        valueType: 'select',
        options: INDIAN_STATES,
      },
      {
        value: 'linkedVehicleCount',
        label: 'Number of linked vehicles',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'atMost', label: 'at most' },
          { value: 'equals', label: 'equals' },
        ],
        valueType: 'number',
        placeholder: '3',
      },
    ],
  },
  challan: {
    label: 'Challan',
    attributes: [
      {
        value: 'challanCount',
        label: 'Challan count',
        operators: [
          { value: 'equals', label: 'equals' },
          { value: 'atLeast', label: 'at least' },
          { value: 'atMost', label: 'at most' },
        ],
        valueType: 'number',
      },
      {
        value: 'offenceGroup',
        label: 'Offence group',
        operators: [
          { value: 'includes', label: 'includes' },
          { value: 'equals', label: 'is' },
        ],
        valueType: 'select',
        options: OFFENCE_GROUPS,
      },
      {
        value: 'issuingAuthority',
        label: 'Issuing state / authority',
        operators: [
          { value: 'equals', label: 'is' },
          { value: 'inList', label: 'in list' },
        ],
        valueType: 'select',
        options: ISSUING_AUTHORITIES,
      },
    ],
  },
  cartAndAmount: {
    label: 'Cart and amount',
    attributes: [
      {
        value: 'eligibleCartValue',
        label: 'Eligible cart value',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'greaterThan', label: 'greater than' },
          { value: 'lessThan', label: 'less than' },
        ],
        valueType: 'number',
        unit: '₹',
        placeholder: '1000',
      },
      {
        value: 'totalCartValue',
        label: 'Total cart value',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'greaterThan', label: 'greater than' },
          { value: 'lessThan', label: 'less than' },
        ],
        valueType: 'number',
        unit: '₹',
      },
      {
        value: 'selectedChallanCount',
        label: 'Number of selected challans',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'equals', label: 'equals' },
        ],
        valueType: 'number',
        placeholder: '2',
      },
      {
        value: 'serviceFeeValue',
        label: 'Eligible service-fee value',
        operators: [
          { value: 'atLeast', label: 'at least' },
          { value: 'greaterThan', label: 'greater than' },
        ],
        valueType: 'number',
        unit: '₹',
      },
    ],
  },
  timeWindow: {
    label: 'Time window',
    attributes: [
      {
        value: 'dayOfWeek',
        label: 'Day of week',
        operators: [
          { value: 'in', label: 'in' },
          { value: 'notIn', label: 'not in' },
        ],
        valueType: 'multi',
        options: DAYS_OF_WEEK,
      },
      {
        value: 'timeOfDay',
        label: 'Time of day',
        operators: [{ value: 'between', label: 'between' }],
        valueType: 'text',
        placeholder: '18:00-22:00',
      },
      {
        value: 'campaignDate',
        label: 'Campaign date',
        operators: [
          { value: 'before', label: 'before' },
          { value: 'after', label: 'after' },
        ],
        valueType: 'date',
      },
    ],
  },
  couponWalletCombo: {
    label: 'Coupon + wallet combination',
    attributes: [
      {
        value: 'allowWallet',
        label: 'Allow wallet with coupon',
        operators: [{ value: 'is', label: 'is' }],
        valueType: 'boolean',
      },
      {
        value: 'maxWalletAmount',
        label: 'Maximum wallet amount',
        operators: [{ value: 'atMost', label: 'at most' }],
        valueType: 'number',
        unit: '₹',
        placeholder: '100',
      },
      {
        value: 'maxCombinedBenefit',
        label: 'Maximum combined benefit',
        operators: [{ value: 'atMost', label: 'at most' }],
        valueType: 'text',
        placeholder: '20% or ₹250',
      },
      {
        value: 'benefitOrder',
        label: 'Benefit-application order',
        operators: [{ value: 'equals', label: 'is' }],
        valueType: 'select',
        options: ['Coupon-first', 'Wallet-first'],
      },
    ],
  },
  couponToWalletConversion: {
    label: 'Coupon-to-wallet conversion',
    attributes: [
      {
        value: 'convertible',
        label: 'Convertible',
        operators: [{ value: 'equals', label: 'is' }],
        valueType: 'boolean',
      },
    ],
  },
}

function makeRuleId() {
  return `rule-${Math.random().toString(36).slice(2, 9)}`
}

function makeGroupId() {
  return `grp-${Math.random().toString(36).slice(2, 9)}`
}

function emptyRule(): Rule {
  const cat = CATEGORIES.customerHistory
  const attr = cat.attributes[0]
  return {
    id: makeRuleId(),
    category: 'customerHistory',
    attribute: attr.value,
    operator: attr.operators[0].value,
    value: 'true',
  }
}

function emptyGroup(): RuleGroup {
  return {
    id: makeGroupId(),
    isExclusion: false,
    rules: [emptyRule()],
  }
}

function getAttrConfig(cat: RuleCategory, attribute: string): AttributeConfig | undefined {
  return CATEGORIES[cat].attributes.find((a) => a.value === attribute)
}

function ruleToSentence(rule: Rule): string {
  const attr = getAttrConfig(rule.category, rule.attribute)
  if (!attr) return ''
  const opLabel = attr.operators.find((o) => o.value === rule.operator)?.label ?? rule.operator
  let valueText = ''
  if (attr.valueType === 'boolean') {
    valueText = rule.value === 'true' ? 'Yes' : 'No'
  } else if (Array.isArray(rule.value)) {
    valueText = rule.value.join(', ')
  } else {
    valueText = String(rule.value ?? '')
    if (attr.unit === '₹' && valueText) valueText = `₹${valueText}`
    else if (attr.unit && valueText) valueText = `${valueText} ${attr.unit}`
  }
  return `${attr.label} ${opLabel} ${valueText || '…'}`
}

function groupToSentence(group: RuleGroup): string {
  if (group.rules.length === 0) return 'No rules yet.'
  const parts = group.rules.map(ruleToSentence).filter(Boolean)
  const joined = parts.join(' AND ')
  return group.isExclusion ? `Exclude when ${joined}.` : `Eligible when ${joined}.`
}

function detectContradictions(group: RuleGroup): string[] {
  const warnings: string[] = []
  const seen = new Map<string, Rule[]>()
  group.rules.forEach((r) => {
    const key = `${r.category}:${r.attribute}`
    seen.set(key, [...(seen.get(key) ?? []), r])
  })
  seen.forEach((rules, key) => {
    if (rules.length < 2) return
    for (let i = 0; i < rules.length; i++) {
      for (let j = i + 1; j < rules.length; j++) {
        const a = rules[i]
        const b = rules[j]
        if (
          (a.operator === 'equals' && b.operator === 'notEquals' && a.value === b.value) ||
          (a.operator === 'notEquals' && b.operator === 'equals' && a.value === b.value) ||
          (a.operator === 'is' && b.operator === 'isNot' && a.value === b.value)
        ) {
          const attr = getAttrConfig(a.category, a.attribute)
          warnings.push(
            `${attr?.label ?? key} has contradictory rules (is and is not "${a.value}").`
          )
        }
      }
    }
  })
  return warnings
}

export function AdvancedRulesBuilder({
  value,
  onChange,
  readOnly = false,
}: AdvancedRulesBuilderProps) {
  const updateGroup = (groupId: string, mut: (g: RuleGroup) => RuleGroup) => {
    onChange({
      groups: value.groups.map((g) => (g.id === groupId ? mut(g) : g)),
    })
  }

  const addGroup = () => onChange({ groups: [...value.groups, emptyGroup()] })
  const removeGroup = (groupId: string) =>
    onChange({ groups: value.groups.filter((g) => g.id !== groupId) })

  const addRule = (groupId: string) =>
    updateGroup(groupId, (g) => ({ ...g, rules: [...g.rules, emptyRule()] }))

  const removeRule = (groupId: string, ruleId: string) =>
    updateGroup(groupId, (g) => ({
      ...g,
      rules: g.rules.filter((r) => r.id !== ruleId),
    }))

  const updateRule = (groupId: string, ruleId: string, patch: Partial<Rule>) => {
    updateGroup(groupId, (g) => ({
      ...g,
      rules: g.rules.map((r) => (r.id === ruleId ? { ...r, ...patch } : r)),
    }))
  }

  if (value.groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
        <GitBranch className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          No advanced rules configured
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          The coupon is governed only by Basics, Value, Validity, Scope and Usage Limits. Add a
          group only if you need targeted eligibility.
        </p>
        {!readOnly && (
          <button
            type="button"
            onClick={addGroup}
            className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add rule group
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {value.groups.map((group, gIdx) => {
        const warnings = detectContradictions(group)
        return (
          <div key={group.id}>
            {gIdx > 0 && (
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                  OR
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>
            )}

            <div
              className={`rounded-xl border p-4 ${
                group.isExclusion
                  ? 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-900/10'
                  : 'border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Group {gIdx + 1}
                  </span>
                  {group.isExclusion && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                      <Ban className="w-3 h-3" /> Exclusion
                    </span>
                  )}
                </div>
                {!readOnly && (
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={group.isExclusion}
                        onChange={(e) =>
                          updateGroup(group.id, (g) => ({ ...g, isExclusion: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      Mark as exclusion
                    </label>
                    <button
                      type="button"
                      onClick={() => removeGroup(group.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {group.rules.map((rule, rIdx) => (
                  <div key={rule.id}>
                    {rIdx > 0 && (
                      <div className="flex items-center gap-2 my-1.5 pl-1">
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
                          AND
                        </span>
                      </div>
                    )}
                    <RuleRow
                      rule={rule}
                      readOnly={readOnly}
                      onChange={(patch) => updateRule(group.id, rule.id, patch)}
                      onRemove={
                        group.rules.length > 1
                          ? () => removeRule(group.id, rule.id)
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>

              {!readOnly && (
                <button
                  type="button"
                  onClick={() => addRule(group.id)}
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add rule (AND)
                </button>
              )}

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  {groupToSentence(group)}
                </p>
                {warnings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {warnings.map((w, i) => (
                      <p key={i} className="text-xs text-red-600 dark:text-red-400 font-medium">
                        ⚠ {w}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {!readOnly && (
        <button
          type="button"
          onClick={addGroup}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add group (OR)
        </button>
      )}
    </div>
  )
}

function RuleRow({
  rule,
  readOnly,
  onChange,
  onRemove,
}: {
  rule: Rule
  readOnly: boolean
  onChange: (patch: Partial<Rule>) => void
  onRemove?: () => void
}) {
  const category = CATEGORIES[rule.category]
  const attr = getAttrConfig(rule.category, rule.attribute) ?? category.attributes[0]

  const handleCategoryChange = (nextCategory: RuleCategory) => {
    const first = CATEGORIES[nextCategory].attributes[0]
    onChange({
      category: nextCategory,
      attribute: first.value,
      operator: first.operators[0].value,
      value: first.valueType === 'boolean' ? 'true' : first.valueType === 'multi' ? [] : '',
    })
  }

  const handleAttributeChange = (nextAttribute: string) => {
    const nextAttr = getAttrConfig(rule.category, nextAttribute) ?? attr
    onChange({
      attribute: nextAttribute,
      operator: nextAttr.operators[0].value,
      value: nextAttr.valueType === 'boolean' ? 'true' : nextAttr.valueType === 'multi' ? [] : '',
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-100 dark:border-slate-700/60">
      <div className="md:col-span-3">
        <select
          disabled={readOnly}
          value={rule.category}
          onChange={(e) => handleCategoryChange(e.target.value as RuleCategory)}
          className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60"
        >
          {(Object.keys(CATEGORIES) as RuleCategory[]).map((k) => (
            <option key={k} value={k}>
              {CATEGORIES[k].label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-3">
        <select
          disabled={readOnly}
          value={rule.attribute}
          onChange={(e) => handleAttributeChange(e.target.value)}
          className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60"
        >
          {category.attributes.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <select
          disabled={readOnly}
          value={rule.operator}
          onChange={(e) => onChange({ operator: e.target.value })}
          className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60"
        >
          {attr.operators.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-3">
        <ValueInput
          attr={attr}
          value={rule.value}
          readOnly={readOnly}
          onChange={(v) => onChange({ value: v })}
        />
      </div>
      <div className="md:col-span-1 flex justify-end">
        {onRemove && !readOnly && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

function ValueInput({
  attr,
  value,
  readOnly,
  onChange,
}: {
  attr: AttributeConfig
  value: Rule['value']
  readOnly: boolean
  onChange: (v: Rule['value']) => void
}) {
  const inputClass =
    'w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60'

  if (attr.valueType === 'boolean') {
    return (
      <select
        disabled={readOnly}
        value={String(value ?? 'true')}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    )
  }

  if (attr.valueType === 'select') {
    return (
      <select
        disabled={readOnly}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="">Select…</option>
        {(attr.options ?? []).map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )
  }

  if (attr.valueType === 'multi') {
    const arr = Array.isArray(value) ? value : []
    return (
      <div className="flex flex-wrap gap-1">
        {(attr.options ?? []).map((opt) => {
          const selected = arr.includes(opt)
          return (
            <button
              type="button"
              key={opt}
              disabled={readOnly}
              onClick={() =>
                onChange(selected ? arr.filter((v) => v !== opt) : [...arr, opt])
              }
              className={`px-2 py-0.5 text-[11px] rounded border transition-colors disabled:opacity-60 ${
                selected
                  ? 'bg-cyan-600 border-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cyan-400'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    )
  }

  if (attr.valueType === 'date') {
    return (
      <input
        type="date"
        disabled={readOnly}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    )
  }

  if (attr.valueType === 'number') {
    return (
      <div className="relative">
        {attr.unit && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {attr.unit}
          </span>
        )}
        <input
          type="number"
          disabled={readOnly}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={attr.placeholder}
          className={`${inputClass} ${attr.unit ? 'pl-6' : ''}`}
        />
      </div>
    )
  }

  return (
    <input
      type="text"
      disabled={readOnly}
      value={String(value ?? '')}
      onChange={(e) => onChange(e.target.value)}
      placeholder={attr.placeholder}
      className={inputClass}
    />
  )
}
