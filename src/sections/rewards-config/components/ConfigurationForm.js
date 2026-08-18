import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { AlertCircle, ChevronDown, Lock } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import { StatusToggle } from './StatusToggle';
import { MaxRewardPreview } from './MaxRewardPreview';
function validate(draft) {
    const errors = {};
    if (!draft.state) {
        errors.state = 'Please select a state.';
    }
    const cost = draft.operationsCostPct;
    if (cost === null || Number.isNaN(cost)) {
        errors.operationsCostPct = 'Operations Cost % is required.';
    }
    else if (cost < 0 || cost > 100) {
        errors.operationsCostPct = 'Enter a value between 0 and 100.';
    }
    const margin = cost !== null && !Number.isNaN(cost) ? 100 - cost : null;
    const cv = draft.lawyeredCvPct;
    if (cv === null || Number.isNaN(cv)) {
        errors.lawyeredCvPct = 'Lawyered CV Margin % is required.';
    }
    else if (cv < 0) {
        errors.lawyeredCvPct = 'Value cannot be negative.';
    }
    else if (margin !== null && cv > margin) {
        errors.lawyeredCvPct = `Must be ≤ Margin % (${margin}%).`;
    }
    const ncv = draft.lawyeredNcvPct;
    if (ncv === null || Number.isNaN(ncv)) {
        errors.lawyeredNcvPct = 'Lawyered NCV Margin % is required.';
    }
    else if (ncv < 0) {
        errors.lawyeredNcvPct = 'Value cannot be negative.';
    }
    else if (margin !== null && ncv > margin) {
        errors.lawyeredNcvPct = `Must be ≤ Margin % (${margin}%).`;
    }
    return errors;
}
export function ConfigurationForm({ mode, states, existingStates, initialConfig, onCancel, onSubmit, }) {
    const [draft, setDraft] = useState(() => initialConfig
        ? {
            state: initialConfig.state,
            region: initialConfig.region,
            operationsCostPct: initialConfig.operationsCostPct,
            lawyeredCvPct: initialConfig.lawyeredCvPct,
            lawyeredNcvPct: initialConfig.lawyeredNcvPct,
            status: initialConfig.status,
        }
        : {
            state: null,
            region: 'All Regions',
            operationsCostPct: null,
            lawyeredCvPct: null,
            lawyeredNcvPct: null,
            status: 'active',
        });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const marginPct = useMemo(() => {
        if (draft.operationsCostPct === null || Number.isNaN(draft.operationsCostPct))
            return null;
        return 100 - draft.operationsCostPct;
    }, [draft.operationsCostPct]);
    const stateLocked = mode === 'edit';
    const availableStates = mode === 'edit'
        ? states
        : states.filter((s) => !existingStates.includes(s));
    const handleSubmit = () => {
        setTouched({
            state: true,
            operationsCostPct: true,
            lawyeredCvPct: true,
            lawyeredNcvPct: true,
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
    return (_jsx("div", { className: "max-w-5xl mx-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "px-6 py-5 border-b border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: mode === 'add'
                                    ? 'Add Reward Configuration'
                                    : `Update Configuration — ${initialConfig?.state}` }) }) }) }), _jsxs("div", { className: "px-8 py-8 space-y-10", children: [_jsx(SectionGroup, { eyebrow: "1 \u00B7 Scope", title: "State & Region", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Field, { label: "Select State", required: true, locked: stateLocked, error: showError('state') ? errors.state : undefined, children: stateLocked ? (_jsx(LockedInput, { value: draft.state ?? '' })) : (_jsx(Select, { value: draft.state ?? '', placeholder: "Select a state\u2026", onChange: (v) => {
                                                const next = { ...draft, state: v || null };
                                                setDraft(next);
                                                setTouched((prev) => ({ ...prev, state: true }));
                                                setErrors(validate(next));
                                            }, options: availableStates.map((s) => ({ value: s, label: s })), invalid: !!showError('state') })) }), _jsx(Field, { label: "Select Region", locked: true, children: _jsx(LockedInput, { value: draft.region }) })] }) }), _jsx(SectionGroup, { eyebrow: "2 \u00B7 Cost & Margin", title: "Operations Cost & Margin", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Field, { label: "Operations Cost %", required: true, error: showError('operationsCostPct') ? errors.operationsCostPct : undefined, children: _jsx(PercentInput, { value: draft.operationsCostPct, placeholder: "e.g., 30", onChange: (v) => {
                                                setDraft({ ...draft, operationsCostPct: v });
                                                if (touched.operationsCostPct)
                                                    setErrors(validate({ ...draft, operationsCostPct: v }));
                                            }, onBlur: () => markTouched('operationsCostPct'), invalid: !!showError('operationsCostPct') }) }), _jsx(Field, { label: "Margin %", locked: true, children: _jsx("div", { className: "flex items-center h-11 px-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-base", children: _jsx("span", { className: "text-slate-900 dark:text-white font-semibold tabular-nums", children: marginPct !== null ? `${marginPct}%` : '—' }) }) })] }) }), _jsx(SectionGroup, { eyebrow: "3 \u00B7 Lawyered Margins", title: "Lawyered CV & NCV Margins", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Field, { label: _jsxs("span", { className: "inline-flex items-center gap-1.5", children: ["Lawyered CV Margin %", _jsx(InfoTooltip, { label: "CV \u2014 Commercial Vehicle" })] }), required: true, error: showError('lawyeredCvPct') ? errors.lawyeredCvPct : undefined, children: [_jsx(PercentInput, { value: draft.lawyeredCvPct, placeholder: "e.g., 10", onChange: (v) => {
                                                    setDraft({ ...draft, lawyeredCvPct: v });
                                                    if (touched.lawyeredCvPct)
                                                        setErrors(validate({ ...draft, lawyeredCvPct: v }));
                                                }, onBlur: () => markTouched('lawyeredCvPct'), invalid: !!showError('lawyeredCvPct') }), _jsxs(FieldHint, { children: ["Must be \u2264 Margin %", marginPct !== null ? ` (${marginPct}%).` : '.'] })] }), _jsxs(Field, { label: _jsxs("span", { className: "inline-flex items-center gap-1.5", children: ["Lawyered NCV Margin %", _jsx(InfoTooltip, { label: "NCV \u2014 Non-Commercial Vehicle" })] }), required: true, error: showError('lawyeredNcvPct') ? errors.lawyeredNcvPct : undefined, children: [_jsx(PercentInput, { value: draft.lawyeredNcvPct, placeholder: "e.g., 15", onChange: (v) => {
                                                    setDraft({ ...draft, lawyeredNcvPct: v });
                                                    if (touched.lawyeredNcvPct)
                                                        setErrors(validate({ ...draft, lawyeredNcvPct: v }));
                                                }, onBlur: () => markTouched('lawyeredNcvPct'), invalid: !!showError('lawyeredNcvPct') }), _jsxs(FieldHint, { children: ["Must be \u2264 Margin %", marginPct !== null ? ` (${marginPct}%).` : '.'] })] })] }) }), _jsx(SectionGroup, { eyebrow: "4 \u00B7 Status", title: "Configuration Status", children: _jsx(StatusToggle, { value: draft.status, onChange: (next) => setDraft({ ...draft, status: next }) }) }), _jsx(MaxRewardPreview, { marginPct: marginPct, lawyeredCvPct: draft.lawyeredCvPct, lawyeredNcvPct: draft.lawyeredNcvPct })] }), _jsx("div", { className: "px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-end", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: mode === 'add' ? 'Add Configuration' : 'Update Configuration' })] }) })] }) }));
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
function PercentInput({ value, placeholder, onChange, onBlur, invalid, }) {
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "number", inputMode: "decimal", min: 0, max: 100, value: value ?? '', placeholder: placeholder, onChange: (e) => {
                    const raw = e.target.value;
                    if (raw === '')
                        onChange(null);
                    else
                        onChange(Number(raw));
                }, onBlur: onBlur, className: `w-full h-11 pl-3.5 pr-9 text-base bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors tabular-nums ${invalid
                    ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-cyan-500'}` }), _jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none", children: "%" })] }));
}
