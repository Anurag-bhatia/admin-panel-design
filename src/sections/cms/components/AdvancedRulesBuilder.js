import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2, GitBranch, Ban } from 'lucide-react';
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
];
const CAMPAIGN_TAGS = [
    'Corporate Employees',
    'Partner Campaign X',
    'Refer & Earn',
    'Repeat Customer',
];
const OFFENCE_GROUPS = [
    'Speeding',
    'Signal Jump',
    'No Helmet',
    'No Seatbelt',
    'Wrong Parking',
    'Drunk Driving',
];
const ISSUING_AUTHORITIES = [
    'Delhi Traffic Police',
    'Mumbai Traffic Police',
    'Bengaluru Traffic Police',
    'Kolkata Traffic Police',
    'Hyderabad Traffic Police',
];
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CATEGORIES = {
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
};
function makeRuleId() {
    return `rule-${Math.random().toString(36).slice(2, 9)}`;
}
function makeGroupId() {
    return `grp-${Math.random().toString(36).slice(2, 9)}`;
}
function emptyRule() {
    const cat = CATEGORIES.customerHistory;
    const attr = cat.attributes[0];
    return {
        id: makeRuleId(),
        category: 'customerHistory',
        attribute: attr.value,
        operator: attr.operators[0].value,
        value: 'true',
    };
}
function emptyGroup() {
    return {
        id: makeGroupId(),
        isExclusion: false,
        rules: [emptyRule()],
    };
}
function getAttrConfig(cat, attribute) {
    return CATEGORIES[cat].attributes.find((a) => a.value === attribute);
}
function ruleToSentence(rule) {
    const attr = getAttrConfig(rule.category, rule.attribute);
    if (!attr)
        return '';
    const opLabel = attr.operators.find((o) => o.value === rule.operator)?.label ?? rule.operator;
    let valueText = '';
    if (attr.valueType === 'boolean') {
        valueText = rule.value === 'true' ? 'Yes' : 'No';
    }
    else if (Array.isArray(rule.value)) {
        valueText = rule.value.join(', ');
    }
    else {
        valueText = String(rule.value ?? '');
        if (attr.unit === '₹' && valueText)
            valueText = `₹${valueText}`;
        else if (attr.unit && valueText)
            valueText = `${valueText} ${attr.unit}`;
    }
    return `${attr.label} ${opLabel} ${valueText || '…'}`;
}
function groupToSentence(group) {
    if (group.rules.length === 0)
        return 'No rules yet.';
    const parts = group.rules.map(ruleToSentence).filter(Boolean);
    const joined = parts.join(' AND ');
    return group.isExclusion ? `Exclude when ${joined}.` : `Eligible when ${joined}.`;
}
function detectContradictions(group) {
    const warnings = [];
    const seen = new Map();
    group.rules.forEach((r) => {
        const key = `${r.category}:${r.attribute}`;
        seen.set(key, [...(seen.get(key) ?? []), r]);
    });
    seen.forEach((rules, key) => {
        if (rules.length < 2)
            return;
        for (let i = 0; i < rules.length; i++) {
            for (let j = i + 1; j < rules.length; j++) {
                const a = rules[i];
                const b = rules[j];
                if ((a.operator === 'equals' && b.operator === 'notEquals' && a.value === b.value) ||
                    (a.operator === 'notEquals' && b.operator === 'equals' && a.value === b.value) ||
                    (a.operator === 'is' && b.operator === 'isNot' && a.value === b.value)) {
                    const attr = getAttrConfig(a.category, a.attribute);
                    warnings.push(`${attr?.label ?? key} has contradictory rules (is and is not "${a.value}").`);
                }
            }
        }
    });
    return warnings;
}
export function AdvancedRulesBuilder({ value, onChange, readOnly = false, }) {
    const updateGroup = (groupId, mut) => {
        onChange({
            groups: value.groups.map((g) => (g.id === groupId ? mut(g) : g)),
        });
    };
    const addGroup = () => onChange({ groups: [...value.groups, emptyGroup()] });
    const removeGroup = (groupId) => onChange({ groups: value.groups.filter((g) => g.id !== groupId) });
    const addRule = (groupId) => updateGroup(groupId, (g) => ({ ...g, rules: [...g.rules, emptyRule()] }));
    const removeRule = (groupId, ruleId) => updateGroup(groupId, (g) => ({
        ...g,
        rules: g.rules.filter((r) => r.id !== ruleId),
    }));
    const updateRule = (groupId, ruleId, patch) => {
        updateGroup(groupId, (g) => ({
            ...g,
            rules: g.rules.map((r) => (r.id === ruleId ? { ...r, ...patch } : r)),
        }));
    };
    if (value.groups.length === 0) {
        return (_jsxs("div", { className: "rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center", children: [_jsx(GitBranch, { className: "w-8 h-8 text-slate-400 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 font-medium", children: "No advanced rules configured" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto", children: "The coupon is governed only by Basics, Value, Validity, Scope and Usage Limits. Add a group only if you need targeted eligibility." }), !readOnly && (_jsxs("button", { type: "button", onClick: addGroup, className: "inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add rule group"] }))] }));
    }
    return (_jsxs("div", { className: "space-y-3", children: [value.groups.map((group, gIdx) => {
                const warnings = detectContradictions(group);
                return (_jsxs("div", { children: [gIdx > 0 && (_jsxs("div", { className: "flex items-center gap-3 my-3", children: [_jsx("div", { className: "flex-1 h-px bg-slate-200 dark:bg-slate-700" }), _jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider", children: "OR" }), _jsx("div", { className: "flex-1 h-px bg-slate-200 dark:bg-slate-700" })] })), _jsxs("div", { className: `rounded-xl border p-4 ${group.isExclusion
                                ? 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-900/10'
                                : 'border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/30'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: ["Group ", gIdx + 1] }), group.isExclusion && (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300", children: [_jsx(Ban, { className: "w-3 h-3" }), " Exclusion"] }))] }), !readOnly && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("label", { className: "inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300", children: [_jsx("input", { type: "checkbox", checked: group.isExclusion, onChange: (e) => updateGroup(group.id, (g) => ({ ...g, isExclusion: e.target.checked })), className: "rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" }), "Mark as exclusion"] }), _jsx("button", { type: "button", onClick: () => removeGroup(group.id), className: "p-1 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] }))] }), _jsx("div", { className: "space-y-2", children: group.rules.map((rule, rIdx) => (_jsxs("div", { children: [rIdx > 0 && (_jsx("div", { className: "flex items-center gap-2 my-1.5 pl-1", children: _jsx("span", { className: "text-[10px] font-semibold text-slate-400 tracking-wider", children: "AND" }) })), _jsx(RuleRow, { rule: rule, readOnly: readOnly, onChange: (patch) => updateRule(group.id, rule.id, patch), onRemove: group.rules.length > 1
                                                    ? () => removeRule(group.id, rule.id)
                                                    : undefined })] }, rule.id))) }), !readOnly && (_jsxs("button", { type: "button", onClick: () => addRule(group.id), className: "inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), "Add rule (AND)"] })), _jsxs("div", { className: "mt-3 pt-3 border-t border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-xs text-slate-600 dark:text-slate-300 italic", children: groupToSentence(group) }), warnings.length > 0 && (_jsx("div", { className: "mt-2 space-y-1", children: warnings.map((w, i) => (_jsxs("p", { className: "text-xs text-red-600 dark:text-red-400 font-medium", children: ["\u26A0 ", w] }, i))) }))] })] })] }, group.id));
            }), !readOnly && (_jsxs("button", { type: "button", onClick: addGroup, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add group (OR)"] }))] }));
}
function RuleRow({ rule, readOnly, onChange, onRemove, }) {
    const category = CATEGORIES[rule.category];
    const attr = getAttrConfig(rule.category, rule.attribute) ?? category.attributes[0];
    const handleCategoryChange = (nextCategory) => {
        const first = CATEGORIES[nextCategory].attributes[0];
        onChange({
            category: nextCategory,
            attribute: first.value,
            operator: first.operators[0].value,
            value: first.valueType === 'boolean' ? 'true' : first.valueType === 'multi' ? [] : '',
        });
    };
    const handleAttributeChange = (nextAttribute) => {
        const nextAttr = getAttrConfig(rule.category, nextAttribute) ?? attr;
        onChange({
            attribute: nextAttribute,
            operator: nextAttr.operators[0].value,
            value: nextAttr.valueType === 'boolean' ? 'true' : nextAttr.valueType === 'multi' ? [] : '',
        });
    };
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-2 items-start bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-100 dark:border-slate-700/60", children: [_jsx("div", { className: "md:col-span-3", children: _jsx("select", { disabled: readOnly, value: rule.category, onChange: (e) => handleCategoryChange(e.target.value), className: "w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60", children: Object.keys(CATEGORIES).map((k) => (_jsx("option", { value: k, children: CATEGORIES[k].label }, k))) }) }), _jsx("div", { className: "md:col-span-3", children: _jsx("select", { disabled: readOnly, value: rule.attribute, onChange: (e) => handleAttributeChange(e.target.value), className: "w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60", children: category.attributes.map((a) => (_jsx("option", { value: a.value, children: a.label }, a.value))) }) }), _jsx("div", { className: "md:col-span-2", children: _jsx("select", { disabled: readOnly, value: rule.operator, onChange: (e) => onChange({ operator: e.target.value }), className: "w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60", children: attr.operators.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) }) }), _jsx("div", { className: "md:col-span-3", children: _jsx(ValueInput, { attr: attr, value: rule.value, readOnly: readOnly, onChange: (v) => onChange({ value: v }) }) }), _jsx("div", { className: "md:col-span-1 flex justify-end", children: onRemove && !readOnly && (_jsx("button", { type: "button", onClick: onRemove, className: "p-1.5 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })) })] }));
}
function ValueInput({ attr, value, readOnly, onChange, }) {
    const inputClass = 'w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white disabled:opacity-60';
    if (attr.valueType === 'boolean') {
        return (_jsxs("select", { disabled: readOnly, value: String(value ?? 'true'), onChange: (e) => onChange(e.target.value), className: inputClass, children: [_jsx("option", { value: "true", children: "Yes" }), _jsx("option", { value: "false", children: "No" })] }));
    }
    if (attr.valueType === 'select') {
        return (_jsxs("select", { disabled: readOnly, value: String(value ?? ''), onChange: (e) => onChange(e.target.value), className: inputClass, children: [_jsx("option", { value: "", children: "Select\u2026" }), (attr.options ?? []).map((opt) => (_jsx("option", { value: opt, children: opt }, opt)))] }));
    }
    if (attr.valueType === 'multi') {
        const arr = Array.isArray(value) ? value : [];
        return (_jsx("div", { className: "flex flex-wrap gap-1", children: (attr.options ?? []).map((opt) => {
                const selected = arr.includes(opt);
                return (_jsx("button", { type: "button", disabled: readOnly, onClick: () => onChange(selected ? arr.filter((v) => v !== opt) : [...arr, opt]), className: `px-2 py-0.5 text-[11px] rounded border transition-colors disabled:opacity-60 ${selected
                        ? 'bg-cyan-600 border-cyan-600 text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cyan-400'}`, children: opt }, opt));
            }) }));
    }
    if (attr.valueType === 'date') {
        return (_jsx("input", { type: "date", disabled: readOnly, value: String(value ?? ''), onChange: (e) => onChange(e.target.value), className: inputClass }));
    }
    if (attr.valueType === 'number') {
        return (_jsxs("div", { className: "relative", children: [attr.unit && (_jsx("span", { className: "absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400", children: attr.unit })), _jsx("input", { type: "number", disabled: readOnly, value: String(value ?? ''), onChange: (e) => onChange(e.target.value === '' ? '' : Number(e.target.value)), placeholder: attr.placeholder, className: `${inputClass} ${attr.unit ? 'pl-6' : ''}` })] }));
    }
    return (_jsx("input", { type: "text", disabled: readOnly, value: String(value ?? ''), onChange: (e) => onChange(e.target.value), placeholder: attr.placeholder, className: inputClass }));
}
