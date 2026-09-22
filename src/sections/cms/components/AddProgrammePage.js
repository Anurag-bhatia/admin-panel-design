import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronUp, Info, Upload, X, AlertCircle, AlertTriangle, RefreshCw, CheckCircle2, } from 'lucide-react';
const typeLabels = {
    firstTimeCheck: 'First-time check',
    postPaymentReward: 'Post-payment reward',
    influencer: 'Influencer campaign',
    corporate: 'Corporate benefit',
    specificCustomers: 'Specific customers',
};
const triggerText = {
    firstTimeCheck: 'A check completes for a new vehicle number + mobile number combination.',
    postPaymentReward: 'A payment succeeds and the order is confirmed.',
    influencer: 'A claim carrying the campaign code.',
    corporate: 'A mobile number list is processed.',
    specificCustomers: 'A mobile number list is processed.',
};
const chargeComponentLabels = {
    convenience: 'Convenience fee',
    lawyerFee: 'Lawyer fee',
    subscription: 'Subscription',
    other: 'Other',
};
const CODE_REGEX = /^[A-Z0-9]{3,32}$/;
function defaultCustomerText() {
    return {
        displayName: '',
        description: '',
        issuedMessage: 'You got {coins} coins. Expires on {expiry}.',
        usedMessage: 'You used {coins} coins. Balance: {balance}.',
        expiringMessage: '{coins} coins expire on {expiry}.',
    };
}
function toDatetimeLocal(iso) {
    if (!iso)
        return '';
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromDatetimeLocal(v) {
    if (!v)
        return '';
    return new Date(v).toISOString();
}
export function AddProgrammePage({ initialProgramme, existingCodes = [], existingNames = [], onSubmit, onCancel, }) {
    const isEditing = !!initialProgramme;
    const isDraft = !initialProgramme || initialProgramme.status === 'draft';
    const [name, setName] = useState(initialProgramme?.name ?? '');
    const [code, setCode] = useState(initialProgramme?.code ?? '');
    const [internalDescription, setInternalDescription] = useState(initialProgramme?.internalDescription ?? '');
    const [type, setType] = useState(initialProgramme?.type ?? 'firstTimeCheck');
    const [audience, setAudience] = useState(initialProgramme?.audience ?? (type === 'firstTimeCheck' ? 'newOnly' : 'all'));
    const [minimumCashPaid, setMinimumCashPaid] = useState(initialProgramme?.minimumCashPaid?.toString() ?? '');
    const [campaignCode, setCampaignCode] = useState(initialProgramme?.campaignCode ?? '');
    const [mobileNumbers, setMobileNumbers] = useState(initialProgramme?.mobileNumbers ?? []);
    const [mobileDraft, setMobileDraft] = useState('');
    const [limitPerCustomer, setLimitPerCustomer] = useState(initialProgramme?.limitPerCustomer?.toString() ?? '1');
    const [coinsPerCustomer, setCoinsPerCustomer] = useState(initialProgramme?.coinsPerCustomer?.toString() ?? '');
    const [rewardBasis, setRewardBasis] = useState(initialProgramme?.rewardBasis ?? 'fixedCoins');
    const [percentOfCash, setPercentOfCash] = useState(initialProgramme?.percentOfCash?.toString() ?? '');
    const [startAt, setStartAt] = useState(toDatetimeLocal(initialProgramme?.startAt ?? ''));
    const [endAt, setEndAt] = useState(toDatetimeLocal(initialProgramme?.endAt ?? ''));
    const [validityMode, setValidityMode] = useState(initialProgramme?.creditValidityDate ? 'date' : 'days');
    const [validityDays, setValidityDays] = useState(initialProgramme?.creditValidityDays?.toString() ?? '30');
    const [validityDate, setValidityDate] = useState(initialProgramme?.creditValidityDate?.slice(0, 10) ?? '');
    const [perCartCapType, setPerCartCapType] = useState(initialProgramme?.perCartCapType ?? 'percent');
    const [perCartCapValue, setPerCartCapValue] = useState(initialProgramme?.perCartCapValue?.toString() ?? '20');
    const [partialUse, setPartialUse] = useState(initialProgramme?.partialUse ?? true);
    const [chargeComponents, setChargeComponents] = useState(initialProgramme?.chargeComponents ?? ['convenience']);
    const [lotUseOrder, setLotUseOrder] = useState(initialProgramme?.lotUseOrder ?? 'earliestExpiryFirst');
    const [budgetCoins, setBudgetCoins] = useState(initialProgramme?.budgetCoins?.toString() ?? '');
    const [alertLevelPercent, setAlertLevelPercent] = useState(initialProgramme?.alertLevelPercent?.toString() ?? '80');
    const [hardStopCoins, setHardStopCoins] = useState(initialProgramme?.hardStopCoins?.toString() ?? '');
    const [customerText, setCustomerText] = useState(initialProgramme?.customerText ?? defaultCustomerText());
    const [openSections, setOpenSections] = useState({
        A: true,
        B: true,
        C: true,
        D: true,
        E: true,
        F: true,
    });
    const [sampleCart, setSampleCart] = useState(5000);
    const [sampleBalance, setSampleBalance] = useState(600);
    const [uploadResult, setUploadResult] = useState(null);
    const [saveFailure, setSaveFailure] = useState(null);
    const codeError = useMemo(() => {
        if (!code)
            return null;
        if (!CODE_REGEX.test(code))
            return 'Alphanumeric, 3–32 characters.';
        if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase() && c !== initialProgramme?.code))
            return 'Code already exists.';
        return null;
    }, [code, existingCodes, initialProgramme?.code]);
    const nameError = useMemo(() => {
        if (!name)
            return null;
        if (existingNames.some((n) => n.toLowerCase() === name.toLowerCase() && n !== initialProgramme?.name))
            return 'Name already exists.';
        return null;
    }, [name, existingNames, initialProgramme?.name]);
    const showMinCash = type === 'postPaymentReward';
    const showRewardBasis = type === 'postPaymentReward';
    const showCampaignCode = type === 'influencer';
    const showMobileList = type === 'corporate' || type === 'specificCustomers';
    const requiresInternalDesc = type === 'specificCustomers';
    const listTotalCoins = mobileNumbers.length * (Number(coinsPerCustomer) || 0);
    const listOverBudget = useMemo(() => {
        if (!showMobileList)
            return false;
        return listTotalCoins > (Number(budgetCoins) || 0);
    }, [showMobileList, listTotalCoins, budgetCoins]);
    const previewCoins = useMemo(() => {
        const c = Number(coinsPerCustomer) || 0;
        if (rewardBasis === 'percentOfCash' && showRewardBasis) {
            const pct = Number(percentOfCash) || 0;
            const cash = sampleCart;
            return Math.min(c, Math.floor((cash * pct) / 100));
        }
        return c;
    }, [coinsPerCustomer, rewardBasis, percentOfCash, sampleCart, showRewardBasis]);
    const capApplied = useMemo(() => {
        const v = Number(perCartCapValue) || 0;
        if (perCartCapType === 'percent') {
            return Math.floor((sampleCart * v) / 100);
        }
        return v;
    }, [perCartCapType, perCartCapValue, sampleCart]);
    const coinsUsable = Math.min(sampleBalance, capApplied);
    const cashPayable = Math.max(0, sampleCart - coinsUsable);
    const previewSentence = useMemo(() => {
        const parts = [];
        parts.push(`Issue ${previewCoins || 0} coins`);
        if (audience === 'newOnly')
            parts.push('to new customers');
        if (showMinCash && Number(minimumCashPaid) > 0)
            parts.push(`when they pay ₹${minimumCashPaid} cash or more`);
        if (perCartCapType === 'percent')
            parts.push(`; usable up to ${perCartCapValue}% of the cart (₹${capApplied} on a ₹${sampleCart} cart)`);
        else
            parts.push(`; usable up to ₹${perCartCapValue} per cart`);
        return parts.join(' ') + '.';
    }, [previewCoins, audience, showMinCash, minimumCashPaid, perCartCapType, perCartCapValue, capApplied, sampleCart]);
    const formErrors = useMemo(() => {
        const errs = [];
        if (!name)
            errs.push('Name is required');
        if (nameError)
            errs.push(nameError);
        if (!code)
            errs.push('Code is required');
        if (codeError)
            errs.push(codeError);
        if (requiresInternalDesc && !internalDescription)
            errs.push('Internal description is required for specific-customer programmes');
        if (showCampaignCode && !campaignCode)
            errs.push('Campaign code is required');
        if (showMobileList && mobileNumbers.length === 0)
            errs.push('At least one mobile number is required');
        if (!(Number(coinsPerCustomer) > 0))
            errs.push('Coins per customer must be > 0');
        if (!startAt)
            errs.push('Start date is required');
        if (!endAt)
            errs.push('End date is required');
        if (startAt && endAt && new Date(endAt).getTime() <= new Date(startAt).getTime())
            errs.push('End must be after start');
        if (!(Number(perCartCapValue) > 0))
            errs.push('Per-cart cap must be > 0');
        if (perCartCapType === 'percent' && Number(perCartCapValue) > 100)
            errs.push('Per-cart cap % cannot exceed 100');
        if (chargeComponents.length === 0)
            errs.push('Select at least one charge component');
        if (!(Number(budgetCoins) > 0))
            errs.push('Programme budget must be > 0');
        if (Number(hardStopCoins) > Number(budgetCoins))
            errs.push('Hard stop cannot exceed the budget');
        if (showMobileList && mobileNumbers.length * Number(coinsPerCustomer) > Number(budgetCoins))
            errs.push('Total coins for the mobile list exceed the budget');
        if (!customerText.displayName)
            errs.push('Customer display name is required');
        if (!customerText.description)
            errs.push('Customer description is required');
        return errs;
    }, [
        name, nameError, code, codeError, requiresInternalDesc, internalDescription,
        showCampaignCode, campaignCode, showMobileList, mobileNumbers, coinsPerCustomer,
        startAt, endAt, perCartCapValue, perCartCapType, chargeComponents, budgetCoins,
        hardStopCoins, customerText,
    ]);
    const canSubmit = formErrors.length === 0;
    const toPayload = () => ({
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
        percentOfCash: showRewardBasis && rewardBasis === 'percentOfCash' ? Number(percentOfCash) : undefined,
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
    });
    const handleSubmit = (action) => {
        if (!canSubmit && action !== 'draft')
            return;
        // Preview-only: typing FAIL as the code demonstrates the save-failure banner (8.11).
        if (code === 'FAIL' && !saveFailure) {
            setSaveFailure({ action });
            return;
        }
        let status = 'draft';
        if (action === 'schedule')
            status = 'scheduled';
        if (action === 'activate') {
            const startTime = new Date(startAt).getTime();
            status = startTime > Date.now() ? 'scheduled' : 'active';
        }
        onSubmit?.({ ...toPayload(), status }, action);
    };
    const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    return (_jsxs("div", { className: "min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900", children: [_jsx("div", { className: "sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: onCancel, className: "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-4 h-4 text-slate-600 dark:text-slate-300" }) }), _jsx("h1", { className: "text-lg font-bold text-slate-900 dark:text-white", children: isEditing ? 'Edit Programme' : 'Create Programme' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: () => handleSubmit('draft'), className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Save as Draft" }), _jsx("button", { onClick: () => handleSubmit('schedule'), disabled: !canSubmit, className: "px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Schedule" }), _jsx("button", { onClick: () => handleSubmit('activate'), disabled: !canSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm", children: "Activate" })] })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [saveFailure && (_jsxs("div", { className: "p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-red-800 dark:text-red-200 mb-0.5", children: "Save didn't go through" }), _jsx("p", { className: "text-xs text-red-700 dark:text-red-300", children: "Network or server error. Your form data is safe \u2014 nothing was lost." })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => {
                                                    const action = saveFailure.action;
                                                    setSaveFailure(null);
                                                    handleSubmit(action);
                                                }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md", children: [_jsx(RefreshCw, { className: "w-3 h-3" }), "Retry"] }), _jsx("button", { onClick: () => setSaveFailure(null), className: "p-1.5 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40", children: _jsx(X, { className: "w-3.5 h-3.5" }) })] })] })), listOverBudget && (_jsxs("div", { className: "p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 flex items-start gap-3", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-amber-800 dark:text-amber-200 mb-0.5", children: "Mobile list exceeds the programme budget" }), _jsxs("p", { className: "text-xs text-amber-700 dark:text-amber-300", children: [mobileNumbers.length, " numbers \u00D7 ", Number(coinsPerCustomer) || 0, " coins = ", ' ', listTotalCoins.toLocaleString('en-IN'), " coins, but the budget is only ", ' ', (Number(budgetCoins) || 0).toLocaleString('en-IN'), " coins. The whole upload will be refused. Raise the budget or trim the list."] })] })] })), uploadResult && (_jsxs("div", { className: "p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle2, { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-cyan-800 dark:text-cyan-200 mb-1", children: "Upload processed" }), _jsxs("p", { className: "text-xs text-cyan-700 dark:text-cyan-300 mb-2", children: [uploadResult.added, " added \u00B7", ' ', uploadResult.skippedDuplicates, " duplicates skipped \u00B7", ' ', uploadResult.rejected.length, " rejected"] }), uploadResult.rejected.length > 0 && (_jsxs("details", { className: "text-xs text-cyan-700 dark:text-cyan-300", children: [_jsx("summary", { className: "cursor-pointer font-medium", children: "See rejected rows" }), _jsxs("ul", { className: "mt-2 space-y-0.5 max-h-32 overflow-y-auto", children: [uploadResult.rejected.slice(0, 20).map((r) => (_jsxs("li", { children: ["Row ", r.row, ": ", _jsx("span", { className: "font-mono", children: r.value || '(empty)' }), ' ', "\u2014 ", r.reason] }, `${r.row}-${r.value}`))), uploadResult.rejected.length > 20 && (_jsxs("li", { children: ["+ ", uploadResult.rejected.length - 20, " more\u2026"] }))] })] }))] })] }), _jsx("button", { onClick: () => setUploadResult(null), className: "p-1.5 rounded-md text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/40", children: _jsx(X, { className: "w-3.5 h-3.5" }) })] })), _jsx(SectionCard, { title: "A \u00B7 Basics", isOpen: openSections.A, onToggle: () => toggle('A'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Programme name", required: true, error: nameError, children: _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Welcome Coins for New Users", className: inputCls(!!nameError) }) }), _jsx(Field, { label: "Programme code", required: true, error: codeError, children: _jsx("input", { type: "text", value: code, onChange: (e) => setCode(e.target.value.toUpperCase()), placeholder: "WELCOME500", className: inputCls(!!codeError) + ' font-mono uppercase tracking-wide' }) }), _jsx(Field, { label: "Type", required: true, children: _jsx("select", { value: type, onChange: (e) => {
                                                    const t = e.target.value;
                                                    setType(t);
                                                    if (t === 'firstTimeCheck')
                                                        setAudience('newOnly');
                                                    else
                                                        setAudience('all');
                                                }, className: inputCls(false), children: Object.keys(typeLabels).map((t) => (_jsx("option", { value: t, children: typeLabels[t] }, t))) }) }), _jsx(Field, { label: "Internal description", required: requiresInternalDesc, children: _jsx("textarea", { value: internalDescription, onChange: (e) => setInternalDescription(e.target.value), rows: 2, placeholder: "Why is this programme being created?", className: inputCls(false) }) })] }) }), _jsxs(SectionCard, { title: "B \u00B7 Trigger & Audience", isOpen: openSections.B, onToggle: () => toggle('B'), children: [_jsxs("div", { className: "p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2 mb-4", children: [_jsx(Info, { className: "w-4 h-4 text-slate-500 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1", children: "Trigger" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200", children: triggerText[type] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Customer status", required: true, children: _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "button", onClick: () => setAudience('all'), className: selectableCls(audience === 'all'), children: "All customers" }), _jsx("button", { type: "button", onClick: () => setAudience('newOnly'), className: selectableCls(audience === 'newOnly'), children: "New to ChallanPay only" })] }) }), _jsx(Field, { label: "Limit per customer", required: true, children: _jsx("input", { type: "number", min: 1, value: limitPerCustomer, onChange: (e) => setLimitPerCustomer(e.target.value), className: inputCls(false) }) }), showMinCash && (_jsx(Field, { label: "Minimum cash paid (\u20B9)", help: "Optional. Only cash paid counts.", children: _jsx("input", { type: "number", min: 0, value: minimumCashPaid, onChange: (e) => setMinimumCashPaid(e.target.value), placeholder: "e.g. 200", className: inputCls(false) }) })), showCampaignCode && (_jsx(Field, { label: "Campaign code", required: true, children: _jsx("input", { type: "text", value: campaignCode, onChange: (e) => setCampaignCode(e.target.value.toUpperCase()), placeholder: "ROHIT100", className: inputCls(false) + ' font-mono uppercase' }) })), showMobileList && (_jsx(Field, { label: "Mobile number list", required: true, className: "sm:col-span-2", help: "Duplicates removed. Numbers already credited are skipped.", children: _jsx(MobileListInput, { value: mobileNumbers, draft: mobileDraft, onDraftChange: setMobileDraft, onChange: setMobileNumbers, onUploadReport: setUploadResult }) }))] })] }), _jsx(SectionCard, { title: "C \u00B7 Amount & Validity", isOpen: openSections.C, onToggle: () => toggle('C'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Coins per customer", required: true, help: "1 coin = \u20B91.", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "number", min: 1, value: coinsPerCustomer, onChange: (e) => setCoinsPerCustomer(e.target.value), placeholder: "500", className: inputCls(false) + ' pr-16' }), _jsxs("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400", children: ["\u2248 \u20B9", Number(coinsPerCustomer) || 0] })] }) }), showRewardBasis && (_jsx(Field, { label: "Reward basis", required: true, children: _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "button", onClick: () => setRewardBasis('fixedCoins'), className: selectableCls(rewardBasis === 'fixedCoins'), children: "Fixed coins" }), _jsx("button", { type: "button", onClick: () => setRewardBasis('percentOfCash'), className: selectableCls(rewardBasis === 'percentOfCash'), children: "% of cash paid" })] }) })), showRewardBasis && rewardBasis === 'percentOfCash' && (_jsx(Field, { label: "Percent of cash paid (1\u2013100)", required: true, help: "Coins per customer becomes the maximum reward per order.", children: _jsx("input", { type: "number", min: 1, max: 100, value: percentOfCash, onChange: (e) => setPercentOfCash(e.target.value), placeholder: "5", className: inputCls(false) }) })), _jsx(Field, { label: "Programme start", required: true, children: _jsx("input", { type: "datetime-local", value: startAt, onChange: (e) => setStartAt(e.target.value), className: inputCls(false) }) }), _jsx(Field, { label: "Programme end", required: true, children: _jsx("input", { type: "datetime-local", value: endAt, onChange: (e) => setEndAt(e.target.value), className: inputCls(false) }) }), _jsx(Field, { label: "Credit validity", required: true, className: "sm:col-span-2", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "button", onClick: () => setValidityMode('days'), className: selectableCls(validityMode === 'days'), children: "Days from issue" }), _jsx("button", { type: "button", onClick: () => setValidityMode('date'), className: selectableCls(validityMode === 'date'), children: "Fixed date" })] }), validityMode === 'days' ? (_jsx("input", { type: "number", min: 1, value: validityDays, onChange: (e) => setValidityDays(e.target.value), placeholder: "30", className: inputCls(false) })) : (_jsx("input", { type: "date", value: validityDate, onChange: (e) => setValidityDate(e.target.value), className: inputCls(false) }))] }) })] }) }), _jsx(SectionCard, { title: "D \u00B7 Use Rules", isOpen: openSections.D, onToggle: () => toggle('D'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Per-cart cap", required: true, children: _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "button", onClick: () => setPerCartCapType('percent'), className: selectableCls(perCartCapType === 'percent'), children: "% of cart" }), _jsx("button", { type: "button", onClick: () => setPerCartCapType('fixed'), className: selectableCls(perCartCapType === 'fixed'), children: "Fixed amount" })] }) }), _jsx(Field, { label: perCartCapType === 'percent' ? 'Cap % (1–100)' : 'Cap amount (₹)', required: true, children: _jsx("input", { type: "number", min: 1, max: perCartCapType === 'percent' ? 100 : undefined, value: perCartCapValue, onChange: (e) => setPerCartCapValue(e.target.value), className: inputCls(false) }) }), _jsx(Field, { label: "Partial use", children: _jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800", children: [_jsx("span", { className: "text-sm text-slate-700 dark:text-slate-200", children: "Unused coins stay in the balance" }), _jsx(Toggle, { checked: partialUse, onChange: setPartialUse })] }) }), _jsx(Field, { label: "Order lots are used in", children: _jsxs("select", { value: lotUseOrder, onChange: (e) => setLotUseOrder(e.target.value), className: inputCls(false), children: [_jsx("option", { value: "earliestExpiryFirst", children: "Earliest expiry first" }), _jsx("option", { value: "other", children: "Other order" })] }) }), _jsx(Field, { label: "Charge components", required: true, className: "sm:col-span-2", help: "Government and court dues are always excluded.", children: _jsx("div", { className: "flex flex-wrap gap-2", children: Object.keys(chargeComponentLabels).map((cc) => {
                                                    const checked = chargeComponents.includes(cc);
                                                    return (_jsx(CheckboxPill, { label: chargeComponentLabels[cc], checked: checked, onChange: () => {
                                                            setChargeComponents((prev) => checked ? prev.filter((x) => x !== cc) : [...prev, cc]);
                                                        } }, cc));
                                                }) }) })] }) }), _jsx(SectionCard, { title: "E \u00B7 Budget", isOpen: openSections.E, onToggle: () => toggle('E'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsx(Field, { label: "Programme budget (coins)", required: true, children: _jsx("input", { type: "number", min: 1, value: budgetCoins, onChange: (e) => {
                                                    setBudgetCoins(e.target.value);
                                                    if (!hardStopCoins)
                                                        setHardStopCoins(e.target.value);
                                                }, placeholder: "500000", className: inputCls(false) }) }), _jsx(Field, { label: "Alert level (% of budget)", children: _jsx("input", { type: "number", min: 1, max: 100, value: alertLevelPercent, onChange: (e) => setAlertLevelPercent(e.target.value), placeholder: "80", className: inputCls(false) }) }), _jsx(Field, { label: "Hard stop (coins)", children: _jsx("input", { type: "number", min: 0, value: hardStopCoins, onChange: (e) => setHardStopCoins(e.target.value), className: inputCls(false) }) })] }) }), _jsx(SectionCard, { title: "F \u00B7 Customer Text", isOpen: openSections.F, onToggle: () => toggle('F'), children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Display name", required: true, children: _jsx("input", { type: "text", value: customerText.displayName, onChange: (e) => setCustomerText((prev) => ({ ...prev, displayName: e.target.value })), placeholder: "Welcome credit", className: inputCls(false) }) }), _jsx(Field, { label: "Description", required: true, className: "sm:col-span-2", help: "Must state that credit is not cash, when it expires, and where it can be used.", children: _jsx("textarea", { value: customerText.description, onChange: (e) => setCustomerText((prev) => ({ ...prev, description: e.target.value })), rows: 3, className: inputCls(false), placeholder: "Free coins for ChallanPay charges. Not withdrawable, expires in 60 days." }) }), _jsx(Field, { label: "Issued message", required: true, className: "sm:col-span-2", help: "Placeholders: {coins}, {expiry}, {balance}", children: _jsx("input", { type: "text", value: customerText.issuedMessage, onChange: (e) => setCustomerText((prev) => ({ ...prev, issuedMessage: e.target.value })), className: inputCls(false) }) }), _jsx(Field, { label: "Used message", required: true, children: _jsx("input", { type: "text", value: customerText.usedMessage, onChange: (e) => setCustomerText((prev) => ({ ...prev, usedMessage: e.target.value })), className: inputCls(false) }) }), _jsx(Field, { label: "Expiring message", required: true, children: _jsx("input", { type: "text", value: customerText.expiringMessage, onChange: (e) => setCustomerText((prev) => ({ ...prev, expiringMessage: e.target.value })), className: inputCls(false) }) })] }) })] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "sticky top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-3", children: "Live Preview" }), _jsx("div", { className: "p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900 mb-4", children: _jsx("p", { className: "text-sm text-cyan-900 dark:text-cyan-100 leading-relaxed", children: previewSentence }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Cart (\u20B9)" }), _jsx("input", { type: "number", value: sampleCart, onChange: (e) => setSampleCart(Number(e.target.value) || 0), className: inputCls(false) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Balance (coins)" }), _jsx("input", { type: "number", value: sampleBalance, onChange: (e) => setSampleBalance(Number(e.target.value) || 0), className: inputCls(false) })] })] }), _jsxs("div", { className: "border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5 text-sm", children: [_jsx(PreviewRow, { label: "Cart", value: `₹${sampleCart}` }), _jsx(PreviewRow, { label: "Per-cart cap", value: `₹${capApplied}` }), _jsx(PreviewRow, { label: "Coins usable", value: `${coinsUsable} coins`, highlight: true }), _jsx(PreviewRow, { label: "Cash payable", value: `₹${cashPayable}` })] }), coinsUsable > 0 && (_jsxs("div", { className: "p-2.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium", children: ["Customer saves \u20B9", coinsUsable, " on this order."] }))] })] }) })] })] }));
}
function SectionCard({ title, isOpen, onToggle, children, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden", children: [_jsxs("button", { type: "button", onClick: onToggle, className: "w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", children: [_jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }), isOpen ? (_jsx(ChevronUp, { className: "w-4 h-4 text-slate-400" })) : (_jsx(ChevronDown, { className: "w-4 h-4 text-slate-400" }))] }), isOpen && (_jsx("div", { className: "px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4", children: children }))] }));
}
function Field({ label, required, help, error, className, children, }) {
    return (_jsxs("label", { className: `flex flex-col gap-1.5 ${className ?? ''}`, children: [_jsxs("span", { className: "text-xs font-medium text-slate-700 dark:text-slate-300", children: [label, required && _jsx("span", { className: "text-red-500 ml-0.5", children: "*" })] }), children, error ? (_jsx("span", { className: "text-xs text-red-500", children: error })) : help ? (_jsx("span", { className: "text-xs text-slate-400", children: help })) : null] }));
}
function PreviewRow({ label, value, highlight, }) {
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: label }), _jsx("span", { className: highlight
                    ? 'font-semibold text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-700 dark:text-slate-200', children: value })] }));
}
function Toggle({ checked, onChange, }) {
    return (_jsx("button", { type: "button", onClick: () => onChange(!checked), className: `relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'}`, children: _jsx("span", { className: `inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}` }) }));
}
function CheckboxPill({ label, checked, onChange, }) {
    return (_jsxs("button", { type: "button", onClick: onChange, className: `inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${checked
            ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'}`, children: [checked && _jsx(Check, { className: "w-4 h-4", strokeWidth: 3 }), label] }));
}
function MobileListInput({ value, draft, onDraftChange, onChange, onUploadReport, }) {
    const commit = () => {
        const items = draft
            .split(/[\s,;\n]+/)
            .map((s) => s.trim())
            .filter((s) => /^\d{10}$/.test(s));
        if (items.length === 0)
            return;
        const next = Array.from(new Set([...value, ...items]));
        onChange(next);
        onDraftChange('');
    };
    const handleCsv = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = String(reader.result || '');
            const rows = text.split(/[\n\r]+/).flatMap((line) => line.split(/[,;\s]+/).filter(Boolean));
            const existing = new Set(value);
            const seenInFile = new Set();
            const validNew = [];
            const rejected = [];
            let skippedDuplicates = 0;
            rows.forEach((raw, idx) => {
                const s = raw.trim();
                if (!s)
                    return;
                if (!/^\d{10}$/.test(s)) {
                    rejected.push({ row: idx + 1, value: s, reason: 'Not a valid 10-digit mobile number' });
                    return;
                }
                if (seenInFile.has(s) || existing.has(s)) {
                    skippedDuplicates++;
                    return;
                }
                seenInFile.add(s);
                validNew.push(s);
            });
            onChange([...value, ...validNew]);
            onUploadReport?.({
                added: validNew.length,
                skippedDuplicates,
                rejected,
            });
        };
        reader.readAsText(file);
        e.target.value = '';
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: draft, onChange: (e) => onDraftChange(e.target.value), onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                commit();
                            }
                        }, placeholder: "Type numbers separated by comma / space / newline", className: inputCls(false) }), _jsx("button", { type: "button", onClick: commit, className: "px-3 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-sm", children: "Add" }), _jsxs("label", { className: "px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer inline-flex items-center gap-1.5", children: [_jsx(Upload, { className: "w-3.5 h-3.5" }), "CSV", _jsx("input", { type: "file", accept: ".csv,.txt", onChange: handleCsv, className: "hidden" })] })] }), value.length > 0 && (_jsxs("div", { className: "mt-3", children: [_jsxs("p", { className: "text-xs text-slate-500 mb-2", children: [value.length, " number", value.length > 1 ? 's' : '', " added"] }), _jsxs("div", { className: "flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700", children: [value.slice(0, 40).map((num) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200", children: [num, _jsx("button", { type: "button", onClick: () => onChange(value.filter((n) => n !== num)), className: "text-slate-400 hover:text-slate-700 dark:hover:text-white", children: _jsx(X, { className: "w-3 h-3" }) })] }, num))), value.length > 40 && (_jsxs("span", { className: "inline-flex items-center px-2 py-1 text-xs text-slate-400", children: ["+ ", value.length - 40, " more"] }))] })] }))] }));
}
function inputCls(hasError) {
    return `w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border ${hasError
        ? 'border-red-300 dark:border-red-800 focus:ring-red-400'
        : 'border-slate-200 dark:border-slate-700 focus:ring-cyan-500'} text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500`;
}
function selectableCls(selected) {
    return `px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${selected
        ? 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-200'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'}`;
}
