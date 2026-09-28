import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, AlertCircle, Lock, Check, } from 'lucide-react';
import { AdvancedRulesBuilder } from './AdvancedRulesBuilder';
const CHALLAN_TYPE_LABELS = {
    online: 'Online',
    regularCourt: 'Regular',
    xpressCourt: 'XPress',
};
const PLATFORM_LABELS = {
    challanpay: 'ChallanPay',
    lots247: 'LOTS247',
};
function productsForPlatforms(platforms) {
    if (platforms.length === 0)
        return [];
    const hasChallanPay = platforms.includes('challanpay');
    const hasLots = platforms.includes('lots247');
    if (hasChallanPay && hasLots)
        return ['all', 'challan', 'subscription'];
    if (hasChallanPay)
        return ['challan'];
    if (hasLots)
        return ['subscription'];
    return [];
}
function toDatetimeLocal(iso) {
    if (!iso)
        return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function initialFromCoupon(coupon) {
    return {
        code: coupon?.code ?? '',
        description: coupon?.description ?? '',
        note: coupon?.note ?? '',
        type: coupon?.type ?? 'flat',
        value: coupon?.value != null ? String(coupon.value) : '',
        maxDiscountCap: coupon?.maxDiscountCap != null ? String(coupon.maxDiscountCap) : '',
        startAt: toDatetimeLocal(coupon?.startAt),
        endAt: toDatetimeLocal(coupon?.endAt),
        minOrderValue: coupon?.minOrderValue != null ? String(coupon.minOrderValue) : '',
        platforms: coupon?.platforms ?? [],
        product: coupon?.product ?? 'all',
        challanTypes: coupon?.challanTypes ?? [],
        totalUsageLimit: coupon?.totalUsageLimit != null ? String(coupon.totalUsageLimit) : '',
        perUserUsageLimit: coupon?.perUserUsageLimit != null ? String(coupon.perUserUsageLimit) : '1',
        stackable: coupon?.stackable ?? false,
        advancedRules: coupon?.advancedRules ?? { groups: [] },
    };
}
export function AddCouponPage({ initialCoupon, existingCodes = [], onSubmit, onCancel, }) {
    const isEdit = Boolean(initialCoupon);
    const isLocked = isEdit && initialCoupon.status !== 'draft';
    const [form, setForm] = useState(() => initialFromCoupon(initialCoupon));
    const [openSections, setOpenSections] = useState({
        A: true,
        B: true,
        C: true,
        D: true,
        E: true,
        F: false,
    });
    const [errors, setErrors] = useState({});
    const update = (key, val) => {
        setForm((f) => ({ ...f, [key]: val }));
        setErrors((e) => ({ ...e, [key]: undefined }));
    };
    const toggleSection = (key) => setOpenSections((s) => ({ ...s, [key]: !s[key] }));
    const availableProducts = productsForPlatforms(form.platforms);
    useEffect(() => {
        if (availableProducts.length === 0)
            return;
        if (!availableProducts.includes(form.product)) {
            setForm((f) => ({ ...f, product: availableProducts[0] }));
        }
    }, [availableProducts, form.product]);
    const validate = () => {
        const next = {};
        const code = form.code.trim().toUpperCase();
        if (!code)
            next.code = 'Code is required.';
        else if (!/^[A-Z0-9]+$/.test(code))
            next.code = 'Only letters and numbers allowed.';
        else if (code.length < 3 || code.length > 32)
            next.code = 'Must be between 3 and 32 characters.';
        else if (existingCodes.some((c) => c.toUpperCase() === code && (!isEdit || c !== initialCoupon.code)))
            next.code = 'This code is already in use.';
        if (!form.type)
            next.type = 'Type is required.';
        const value = Number(form.value);
        if (!form.value || Number.isNaN(value) || value <= 0)
            next.value = 'Enter a positive value.';
        else if (form.type === 'percentage' && (value < 1 || value > 100))
            next.value = 'Percentage must be between 1 and 100.';
        if (form.type === 'flat' && form.maxDiscountCap.trim() !== '')
            next.maxDiscountCap = 'Max discount cap only applies to percentage type.';
        if (!form.startAt)
            next.startAt = 'Start date is required.';
        if (!form.endAt)
            next.endAt = 'End date is required.';
        if (form.startAt && form.endAt && new Date(form.endAt) <= new Date(form.startAt))
            next.endAt = 'End date must be after start date.';
        if (form.platforms.length === 0)
            next.platforms = 'Select at least one platform.';
        if (form.challanTypes.length === 0)
            next.challanTypes = 'Select at least one challan type.';
        setErrors(next);
        if (Object.keys(next).length > 0)
            return false;
        return true;
    };
    const handleSubmit = (mode) => {
        if (isLocked)
            return;
        if (!validate()) {
            setErrors((e) => ({ ...e, form: 'Please fix the errors above before saving.' }));
            return;
        }
        const startsInFuture = new Date(form.startAt).getTime() > Date.now();
        const payload = {
            ...(isEdit ? { id: initialCoupon.id } : {}),
            code: form.code.trim().toUpperCase(),
            description: form.description.trim() || undefined,
            note: form.note.trim() || undefined,
            type: form.type,
            value: Number(form.value),
            maxDiscountCap: form.type === 'percentage' && form.maxDiscountCap
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
            advancedRules: form.advancedRules.groups.length > 0 ? form.advancedRules : undefined,
            status: mode === 'publish' && !startsInFuture ? 'active' : 'draft',
        };
        onSubmit?.(payload);
    };
    return (_jsxs("div", { className: "min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5 sticky top-0 z-10", children: _jsxs("div", { className: "flex items-center justify-between max-w-5xl mx-auto", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onCancel, className: "p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-white", children: isEdit ? (isLocked ? 'Coupon (read-only)' : 'Edit Coupon') : 'Create Coupon' }), isLocked && (_jsxs("p", { className: "text-xs text-amber-600 dark:text-amber-400 mt-0.5 flex items-center gap-1", children: [_jsx(Lock, { className: "w-3 h-3" }), "Validity period has started \u2014 editing is disabled."] }))] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: () => handleSubmit('draft'), disabled: isLocked, className: "px-5 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: "Save as Draft" }), _jsx("button", { type: "button", onClick: () => handleSubmit('publish'), disabled: isLocked, className: "px-5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: "Publish" })] })] }) }), _jsx("div", { className: "max-w-5xl mx-auto px-8 py-6", children: _jsxs("div", { className: "space-y-3", children: [errors.form && (_jsxs("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 text-sm text-red-700 dark:text-red-300", children: [_jsx(AlertCircle, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: errors.form })] })), _jsxs(Section, { id: "A", title: "Basics", open: openSections.A, onToggle: () => toggleSection('A'), children: [_jsxs(Field, { label: "Code", required: true, error: errors.code, children: [_jsx("input", { type: "text", disabled: isLocked, value: form.code, onChange: (e) => update('code', e.target.value.toUpperCase()), placeholder: "WELCOME100", className: inputCls(isLocked), maxLength: 32 }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "3\u201332 characters, letters and numbers only. Auto-uppercased." })] }), _jsx(Field, { label: "Description", children: _jsx("textarea", { disabled: isLocked, value: form.description, onChange: (e) => update('description', e.target.value), placeholder: "Optional. Internal-only \u2014 not shown to users.", rows: 2, className: inputCls(isLocked) }) }), _jsx(Field, { label: "Coupon Note", children: _jsx("textarea", { disabled: isLocked, value: form.note, onChange: (e) => update('note', e.target.value), placeholder: "Optional. Shown to users on the coupon.", rows: 2, className: inputCls(isLocked) }) })] }), _jsxs(Section, { id: "B", title: "Discount Value", open: openSections.B, onToggle: () => toggleSection('B'), children: [_jsx(Field, { label: "Type", required: true, children: _jsx("div", { className: "grid grid-cols-2 gap-2 max-w-md", children: ['flat', 'percentage'].map((t) => (_jsx("button", { type: "button", disabled: isLocked, onClick: () => update('type', t), className: selectableCls(form.type === t), children: t === 'flat' ? 'Flat amount (₹)' : 'Percentage (%)' }, t))) }) }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: form.type === 'flat' ? 'Discount amount (₹)' : 'Discount percentage', required: true, error: errors.value, children: _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400", children: form.type === 'flat' ? '₹' : '%' }), _jsx("input", { type: "number", disabled: isLocked, value: form.value, onChange: (e) => update('value', e.target.value), placeholder: form.type === 'flat' ? '100' : '10', className: `${inputCls(isLocked)} pl-8`, min: 1, max: form.type === 'percentage' ? 100 : undefined })] }) }), form.type === 'percentage' && (_jsx(Field, { label: "Maximum discount cap (\u20B9)", error: errors.maxDiscountCap, children: _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400", children: "\u20B9" }), _jsx("input", { type: "number", disabled: isLocked, value: form.maxDiscountCap, onChange: (e) => update('maxDiscountCap', e.target.value), placeholder: "Optional. e.g. 500", className: `${inputCls(isLocked)} pl-8` })] }) }))] })] }), _jsx(Section, { id: "C", title: "Validity", open: openSections.C, onToggle: () => toggleSection('C'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Start date & time", required: true, error: errors.startAt, children: _jsx("input", { type: "datetime-local", disabled: isLocked, value: form.startAt, onChange: (e) => update('startAt', e.target.value), className: inputCls(isLocked) }) }), _jsx(Field, { label: "End date & time", required: true, error: errors.endAt, children: _jsx("input", { type: "datetime-local", disabled: isLocked, value: form.endAt, onChange: (e) => update('endAt', e.target.value), className: inputCls(isLocked) }) })] }) }), _jsxs(Section, { id: "D", title: "Eligibility / Scope", open: openSections.D, onToggle: () => toggleSection('D'), children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Minimum order value (\u20B9)", children: _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400", children: "\u20B9" }), _jsx("input", { type: "number", disabled: isLocked, value: form.minOrderValue, onChange: (e) => update('minOrderValue', e.target.value), placeholder: "0", className: `${inputCls(isLocked)} pl-8` })] }) }), _jsx(Field, { label: "Platform", required: true, error: errors.platforms, children: _jsx(MultiSelectDropdown, { placeholder: "Select platforms", disabled: isLocked, options: Object.keys(PLATFORM_LABELS).map((p) => ({
                                                    value: p,
                                                    label: PLATFORM_LABELS[p],
                                                })), value: form.platforms, onChange: (next) => update('platforms', next) }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Product", required: true, children: _jsx(SingleSelectDropdown, { disabled: isLocked || form.platforms.length === 0, placeholder: form.platforms.length === 0 ? 'Select a platform first' : 'Select…', options: availableProducts.map((p) => ({
                                                    value: p,
                                                    label: p.charAt(0).toUpperCase() + p.slice(1),
                                                })), value: form.product, onChange: (next) => update('product', next) }) }), _jsx(Field, { label: "Applicable Challan Type", required: true, error: errors.challanTypes, children: _jsx(MultiSelectDropdown, { placeholder: "Select challan types", disabled: isLocked, options: Object.keys(CHALLAN_TYPE_LABELS).map((t) => ({
                                                    value: t,
                                                    label: CHALLAN_TYPE_LABELS[t],
                                                })), value: form.challanTypes, onChange: (next) => update('challanTypes', next) }) })] })] }), _jsxs(Section, { id: "E", title: "Usage Limits", open: openSections.E, onToggle: () => toggleSection('E'), children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Total usage limit", children: _jsx("input", { type: "number", disabled: isLocked, value: form.totalUsageLimit, onChange: (e) => update('totalUsageLimit', e.target.value), placeholder: "Blank = unlimited", className: inputCls(isLocked) }) }), _jsx(Field, { label: "Per-user usage limit", children: _jsx("input", { type: "number", disabled: isLocked, value: form.perUserUsageLimit, onChange: (e) => update('perUserUsageLimit', e.target.value), placeholder: "Blank = unlimited", className: inputCls(isLocked) }) })] }), _jsxs("div", { className: "flex items-center justify-between gap-4 pt-1", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300", children: "Stackable with other coupons / rewards" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: form.stackable
                                                        ? 'On — can combine with other benefits'
                                                        : 'Off — used alone' })] }), _jsx("button", { type: "button", disabled: isLocked, onClick: () => update('stackable', !form.stackable), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${form.stackable ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'} disabled:opacity-60`, children: _jsx("span", { className: `inline-block h-4 w-4 rounded-full bg-white transition-transform ${form.stackable ? 'translate-x-6' : 'translate-x-1'}` }) })] })] }), _jsx(Section, { id: "F", title: "Advanced Rules", subtitle: "Optional targeted eligibility conditions", open: openSections.F, onToggle: () => toggleSection('F'), children: _jsx(AdvancedRulesBuilder, { value: form.advancedRules, onChange: (next) => update('advancedRules', next), readOnly: isLocked, platforms: form.platforms }) }), isLocked && (_jsx("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 text-xs text-amber-800 dark:text-amber-300", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Lock, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold mb-0.5", children: "Editing is locked" }), _jsx("p", { children: "The validity period has started. Only Pause, Resume and Archive actions are available." })] })] }) }))] }) })] }));
}
function Section({ id, title, subtitle, open, onToggle, children, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl", children: [_jsxs("button", { type: "button", onClick: onToggle, className: `w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${open ? 'rounded-t-xl' : 'rounded-xl'}`, children: [_jsxs("div", { className: "flex items-center gap-3 text-left", children: [_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/40 rounded", children: id }), _jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }), subtitle && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: subtitle }))] })] }), open ? (_jsx(ChevronDown, { className: "w-4 h-4 text-slate-400" })) : (_jsx(ChevronRight, { className: "w-4 h-4 text-slate-400" }))] }), open && (_jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 px-4 py-4 space-y-3 rounded-b-xl", children: children }))] }));
}
function Field({ label, required, error, children, }) {
    return (_jsxs("div", { children: [_jsxs("label", { className: "block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] }), children, error && (_jsxs("p", { className: "text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1", children: [_jsx(AlertCircle, { className: "w-3 h-3" }), " ", error] }))] }));
}
function MultiSelectDropdown({ options, value, onChange, disabled, placeholder = 'Select…', }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);
    const selectedLabels = options
        .filter((o) => value.includes(o.value))
        .map((o) => o.label);
    const summary = value.length === 0
        ? placeholder
        : value.length === options.length
            ? 'All'
            : selectedLabels.join(', ');
    const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsxs("button", { type: "button", disabled: disabled, onClick: () => setOpen((o) => !o), className: `${inputCls(!!disabled)} flex items-center justify-between text-left`, children: [_jsx("span", { className: `truncate ${value.length === 0 ? 'text-slate-400' : ''}`, children: summary }), _jsx(ChevronDown, { className: "w-4 h-4 text-slate-400 flex-shrink-0 ml-2" })] }), open && (_jsx("div", { className: "absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 max-h-56 overflow-y-auto", children: options.map((o) => {
                    const selected = value.includes(o.value);
                    return (_jsxs("button", { type: "button", onClick: () => toggle(o.value), className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800", children: [_jsx("span", { className: `inline-flex items-center justify-center w-4 h-4 rounded border ${selected
                                    ? 'bg-cyan-600 border-cyan-600'
                                    : 'border-slate-300 dark:border-slate-600'}`, children: selected && _jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }), o.label] }, o.value));
                }) }))] }));
}
function SingleSelectDropdown({ options, value, onChange, disabled, placeholder = 'Select…', }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);
    const current = options.find((o) => o.value === value);
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsxs("button", { type: "button", disabled: disabled, onClick: () => setOpen((o) => !o), className: `${inputCls(!!disabled)} flex items-center justify-between text-left`, children: [_jsx("span", { className: `truncate ${!current ? 'text-slate-400' : ''}`, children: current ? current.label : placeholder }), _jsx(ChevronDown, { className: "w-4 h-4 text-slate-400 flex-shrink-0 ml-2" })] }), open && (_jsx("div", { className: "absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 max-h-56 overflow-y-auto", children: options.map((o) => {
                    const selected = o.value === value;
                    return (_jsxs("button", { type: "button", onClick: () => {
                            onChange(o.value);
                            setOpen(false);
                        }, className: `w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 ${selected
                            ? 'text-cyan-700 dark:text-cyan-300 font-medium'
                            : 'text-slate-700 dark:text-slate-200'}`, children: [o.label, selected && _jsx(Check, { className: "w-4 h-4 text-cyan-600", strokeWidth: 3 })] }, o.value));
                }) }))] }));
}
function inputCls(disabled) {
    return `w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40' : ''}`;
}
function selectableCls(selected) {
    return `px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-colors ${selected
        ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'} disabled:opacity-60 disabled:cursor-not-allowed`;
}
