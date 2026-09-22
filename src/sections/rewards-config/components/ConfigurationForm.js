import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertCircle, ChevronDown, Lock } from 'lucide-react';
const PLATFORM_OPTIONS = [
    { value: 'challanPay', label: 'ChallanPay' },
    { value: 'lots247', label: 'LOTS247' },
];
function validate(draft) {
    const errors = {};
    if (!draft.state) {
        errors.state = 'Please select a state.';
    }
    const conv = draft.onlineConvenienceFee ?? null;
    if (conv === null || Number.isNaN(conv)) {
        errors.onlineConvenienceFee = 'Online Convenience Fee is required.';
    }
    else if (conv < 0) {
        errors.onlineConvenienceFee = 'Value cannot be negative.';
    }
    const court = draft.onlineCourtFee ?? null;
    if (court === null || Number.isNaN(court)) {
        errors.onlineCourtFee = 'Online Court Fee is required.';
    }
    else if (court < 0) {
        errors.onlineCourtFee = 'Value cannot be negative.';
    }
    return errors;
}
export function ConfigurationForm({ mode, states, existingStates, initialConfig, defaultProduct, onCancel, onSubmit, }) {
    const [draft, setDraft] = useState(() => initialConfig
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
        });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [challanType, setChallanType] = useState('regular');
    const stateLocked = mode === 'edit';
    const availableStates = mode === 'edit'
        ? states
        : states.filter((s) => !existingStates.includes(s));
    const handleSubmit = () => {
        setTouched({
            state: true,
            onlineConvenienceFee: true,
            onlineCourtFee: true,
        });
        const nextErrors = validate(draft);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            onSubmit(draft);
        }
    };
    const markTouched = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors(validate(draft));
    };
    const showError = (field) => touched[field] && errors[field];
    return (_jsx("div", { className: "max-w-5xl mx-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsxs("div", { className: "px-8 py-8 space-y-10", children: [_jsx(SectionGroup, { eyebrow: "1 \u00B7 Scope", title: "Platform and State", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Field, { label: "Platform", required: true, children: _jsx(Select, { value: draft.product ?? 'challanPay', placeholder: "Select a platform\u2026", onChange: (v) => setDraft({ ...draft, product: v }), options: PLATFORM_OPTIONS.map((p) => ({
                                                value: p.value,
                                                label: p.label,
                                            })) }) }), _jsx(Field, { label: "Challan Type", required: true, children: _jsx(Select, { value: challanType, placeholder: "Select a type\u2026", onChange: (v) => setChallanType(v), options: [
                                                { value: 'regular', label: 'Regular' },
                                                { value: 'express', label: 'Express' },
                                            ] }) }), _jsx(Field, { label: "Select State", required: true, locked: stateLocked, error: showError('state') ? errors.state : undefined, children: stateLocked ? (_jsx(LockedInput, { value: draft.state ?? '' })) : (_jsx(Select, { value: draft.state ?? '', placeholder: "Select a state\u2026", onChange: (v) => {
                                                const next = { ...draft, state: v || null };
                                                setDraft(next);
                                                setTouched((prev) => ({ ...prev, state: true }));
                                                setErrors(validate(next));
                                            }, options: availableStates.map((s) => ({ value: s, label: s })), invalid: !!showError('state') })) }), _jsx(Field, { label: "Select Region", locked: true, children: _jsx(LockedInput, { value: draft.region }) })] }) }), _jsx(SectionGroup, { eyebrow: "2 \u00B7 Fees", title: "Fees", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Field, { label: "Online Convenience Fee", required: true, error: showError('onlineConvenienceFee')
                                            ? errors.onlineConvenienceFee
                                            : undefined, children: _jsx(RupeeInput, { value: draft.onlineConvenienceFee ?? null, placeholder: "e.g., 250", onChange: (v) => {
                                                setDraft({ ...draft, onlineConvenienceFee: v });
                                                if (touched.onlineConvenienceFee)
                                                    setErrors(validate({ ...draft, onlineConvenienceFee: v }));
                                            }, onBlur: () => markTouched('onlineConvenienceFee'), invalid: !!showError('onlineConvenienceFee') }) }), _jsx(Field, { label: "Online Court Fee", required: true, error: showError('onlineCourtFee') ? errors.onlineCourtFee : undefined, children: _jsx(RupeeInput, { value: draft.onlineCourtFee ?? null, placeholder: "e.g., 500", onChange: (v) => {
                                                setDraft({ ...draft, onlineCourtFee: v });
                                                if (touched.onlineCourtFee)
                                                    setErrors(validate({ ...draft, onlineCourtFee: v }));
                                            }, onBlur: () => markTouched('onlineCourtFee'), invalid: !!showError('onlineCourtFee') }) })] }) })] }), _jsx("div", { className: "px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-end", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: mode === 'add' ? 'Add Configuration' : 'Update Configuration' })] }) })] }) }));
}
// ---------- Sub-components ----------
function SectionGroup({ title, description, children, }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: title }), description && (_jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: description }))] }), children] }));
}
function Field({ label, required, locked, hint, error, children, }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5", children: [label, required && _jsx("span", { className: "text-rose-500", children: "*" })] }), locked && (_jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: [_jsx(Lock, { className: "w-3 h-3" }), " Locked"] }))] }), children, error ? (_jsxs("p", { className: "mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400", children: [_jsx(AlertCircle, { className: "w-3.5 h-3.5 flex-shrink-0" }), error] })) : hint ? (_jsx(FieldHint, { children: hint })) : null] }));
}
function FieldHint({ children }) {
    return (_jsx("p", { className: "mt-1.5 text-xs text-slate-400 dark:text-slate-500", children: children }));
}
function LockedInput({ value }) {
    return (_jsx("div", { className: "flex items-center h-11 px-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/50 text-base text-slate-500 dark:text-slate-400", children: value }));
}
function Select({ value, onChange, placeholder, options, invalid, }) {
    return (_jsxs("div", { className: "relative", children: [_jsxs("select", { value: value, onChange: (e) => onChange(e.target.value), className: `w-full appearance-none pl-3.5 pr-9 h-11 text-base bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors ${invalid
                    ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-cyan-500'} ${!value ? 'text-slate-400 dark:text-slate-500' : ''}`, children: [_jsx("option", { value: "", disabled: true, children: placeholder }), options.map((o) => (_jsx("option", { value: o.value, className: "text-slate-900 dark:text-white", children: o.label }, o.value)))] }), _jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" })] }));
}
function RupeeInput({ value, placeholder, onChange, onBlur, invalid, }) {
    return (_jsxs("div", { className: `flex items-center h-11 rounded-lg border bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/20 transition-colors ${invalid
            ? 'border-rose-400 dark:border-rose-500 focus-within:border-rose-500'
            : 'border-slate-200 dark:border-slate-700 focus-within:border-cyan-500'}`, children: [_jsx("span", { className: "px-3 h-full flex items-center text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { type: "number", inputMode: "decimal", min: 0, step: "1", value: value ?? '', placeholder: placeholder, onChange: (e) => {
                    const raw = e.target.value;
                    if (raw === '')
                        onChange(null);
                    else
                        onChange(Number(raw));
                }, onBlur: onBlur, className: "w-full h-full px-3 text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] }));
}
