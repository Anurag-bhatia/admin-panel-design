import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Search, Layers, Wrench, Check, ChevronDown, Download, Send, Paperclip, Upload, FileText, X, } from 'lucide-react';
const SAMPLE_CHALLAN_META = {
    pendingAmount: 125000,
    totalChallans: 87,
    courtChallans: 12,
    onlineChallans: 75,
};
const ADDON_CATEGORIES = [
    { id: 'caas', label: 'CAAS' },
    { id: 'rto', label: 'RTO' },
    { id: 'laas', label: 'LAAS' },
    { id: 'api', label: 'API' },
];
const SUBSCRIPTION_PLANS = [
    { id: 'plan-sarathi', name: 'Sarathi', price: 999, billingCycle: '/year', description: '' },
    { id: 'plan-udrive', name: 'Udrive', price: 999, billingCycle: '/year', description: '' },
    { id: 'plan-vcare', name: 'Vcare', price: 100000, billingCycle: '/year', description: '' },
    { id: 'plan-bsafe', name: 'Bsafe', price: 50000, billingCycle: '/year', description: '' },
];
const ADDONS = [
    // CaaS — Challan as a Service
    { id: 'caas-bulk', name: 'Bulk Challans', price: 0, unit: '', category: 'caas', challanMeta: SAMPLE_CHALLAN_META },
    { id: 'caas-ppt', name: 'Pay per Transaction Challans', price: 0, unit: '', category: 'caas', challanMeta: SAMPLE_CHALLAN_META },
    // RTO — Document & RTO Assistance
    { id: 'rto-rc-renewal', name: 'RC Renewal', price: 0, unit: '', category: 'rto' },
    { id: 'rto-rc-retrieval', name: 'RC Retrieval', price: 0, unit: '', category: 'rto' },
    { id: 'rto-license-renewal', name: 'License Renewal', price: 0, unit: '', category: 'rto' },
    { id: 'rto-license-retrieval', name: 'License Retrieval', price: 0, unit: '', category: 'rto' },
    { id: 'rto-fitness-renewal', name: 'Fitness Renewal', price: 0, unit: '', category: 'rto' },
    { id: 'rto-fitness-retrieval', name: 'Fitness Retrieval', price: 0, unit: '', category: 'rto' },
    { id: 'rto-ownership-transfer', name: 'Ownership Transfer', price: 0, unit: '', category: 'rto' },
    { id: 'rto-number-updating', name: 'Number Updating', price: 0, unit: '', category: 'rto' },
    // LaaS — Legal as a Service
    { id: 'laas-oncall', name: '24×7 On Call Legal Support', price: 0, unit: '', category: 'laas' },
    { id: 'laas-onsite', name: 'On-Site Lawyer Support', price: 0, unit: '', category: 'laas' },
    { id: 'laas-theft', name: 'Theft', price: 0, unit: '', category: 'laas' },
    { id: 'laas-detention', name: 'Detention', price: 0, unit: '', category: 'laas' },
    { id: 'laas-bail', name: 'Bail', price: 0, unit: '', category: 'laas' },
    { id: 'laas-accidents', name: 'Accidents', price: 0, unit: '', category: 'laas' },
    { id: 'laas-firs', name: 'FIRs', price: 0, unit: '', category: 'laas' },
    { id: 'laas-superdari', name: 'Superdari', price: 0, unit: '', category: 'laas' },
    { id: 'laas-impound', name: 'Vehicle Impounding', price: 0, unit: '', category: 'laas' },
    { id: 'laas-eway', name: 'E-Way Bill Issues', price: 0, unit: '', category: 'laas' },
    // API
    { id: 'api-challan', name: 'Challan API', price: 0, unit: '', category: 'api' },
    { id: 'api-dl', name: 'DL API', price: 0, unit: '', category: 'api' },
    { id: 'api-rc', name: 'RC API', price: 0, unit: '', category: 'api' },
];
const PPT_TYPE_OPTIONS = ['Express', 'Regular'];
const DEFAULT_TERMS = `1. This quotation is valid for the period mentioned above.
2. Payment terms: 50% advance, balance on delivery.
3. GST @ 18% is applicable on the final amount.
4. Prices are subject to change without prior notice.`;
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const defaultValidTill = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
};
export function AddQuotationModal({ leads, initialLeadId, onSave, onClose, hideQuotationType = false, hideSubscriptionPlan = false, hideDiscount = false }) {
    const [customerSearch, setCustomerSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [activeAddonCategories, setActiveAddonCategories] = useState(['caas']);
    const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
    const serviceTypeRef = useRef(null);
    const [pptQuotation, setPptQuotation] = useState({
        onlineCount: '',
        onlineDiscount: '',
        courtCount: '',
        courtDiscount: '',
        state: '',
    });
    const [sendModal, setSendModal] = useState({
        open: false,
        email: '',
        cc: '',
        subject: '',
        message: '',
        attachments: [],
        sent: false,
    });
    const attachmentInputRef = useRef(null);
    const [caasOutputSheet, setCaasOutputSheet] = useState(null);
    const caasOutputInputRef = useRef(null);
    const [formData, setFormData] = useState({
        leadId: initialLeadId ?? '',
        type: 'subscription-addons',
        planId: null,
        addonIds: [],
        addonDiscounts: {},
        addonQuantities: {},
        addonPerHitPrices: {},
        overallDiscount: 0,
        gstMode: 'exclusive',
        validTill: defaultValidTill(),
        terms: DEFAULT_TERMS,
    });
    useEffect(() => {
        if (!serviceTypeOpen)
            return;
        const handleClickOutside = (e) => {
            if (serviceTypeRef.current && !serviceTypeRef.current.contains(e.target)) {
                setServiceTypeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [serviceTypeOpen]);
    const toggleAddonCategory = (cat) => {
        setActiveAddonCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    };
    const selectedLead = useMemo(() => leads.find(l => l.id === formData.leadId) || null, [leads, formData.leadId]);
    const selectedPlan = useMemo(() => SUBSCRIPTION_PLANS.find(p => p.id === formData.planId) || null, [formData.planId]);
    const selectedAddons = useMemo(() => ADDONS.filter(a => formData.addonIds.includes(a.id)), [formData.addonIds]);
    const basePrice = useMemo(() => {
        if (formData.type === 'pay-per-service')
            return 0;
        return selectedPlan ? selectedPlan.price : 0;
    }, [formData.type, selectedPlan]);
    const addonsPrice = useMemo(() => {
        return selectedAddons.reduce((sum, a) => {
            const discountPct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0));
            const isBulkChallan = a.id === 'caas-bulk';
            if (isBulkChallan) {
                const base = a.challanMeta?.pendingAmount ?? 0;
                return sum + Math.round(base * (1 - discountPct / 100));
            }
            const qty = Math.max(1, formData.addonQuantities[a.id] || 1);
            const unitPrice = a.category === 'api'
                ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
                : a.price;
            return sum + Math.round(unitPrice * qty * (1 - discountPct / 100));
        }, 0);
    }, [selectedAddons, formData.addonDiscounts, formData.addonQuantities, formData.addonPerHitPrices]);
    const subtotal = basePrice + addonsPrice;
    const discountPercent = Math.min(100, Math.max(0, formData.overallDiscount));
    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const finalAmount = Math.max(0, subtotal - discountAmount);
    const filteredLeads = useMemo(() => {
        const term = customerSearch.trim().toLowerCase();
        if (!term)
            return leads;
        return leads.filter(l => l.companyName.toLowerCase().includes(term) ||
            l.companyAlias.toLowerCase().includes(term) ||
            l.contactPerson.toLowerCase().includes(term) ||
            l.emailId.toLowerCase().includes(term) ||
            l.phoneNumber.includes(term));
    }, [leads, customerSearch]);
    const validate = () => {
        const next = {};
        if (!formData.leadId)
            next.leadId = 'Please select a customer';
        if (formData.type === 'pay-per-service') {
            if (formData.addonIds.length === 0)
                next.addonIds = 'Please select at least one service';
        }
        else {
            if (!formData.planId)
                next.planId = 'Please select a plan';
        }
        if (!formData.validTill)
            next.validTill = 'Please pick a valid-till date';
        setErrors(next);
        return Object.keys(next).length === 0;
    };
    const handleSave = (isDraft) => {
        if (!validate())
            return;
        onSave(formData, isDraft);
    };
    const handleSendToCustomer = () => {
        if (!validate())
            return;
        const customerName = selectedLead?.companyAlias || selectedLead?.companyName || 'Customer';
        setSendModal({
            open: true,
            email: selectedLead?.emailId || '',
            cc: '',
            subject: `Quotation from LOTS247 for ${customerName}`,
            message: `Hi ${selectedLead?.contactPerson || 'there'},\n\nPlease find attached the quotation for your review. Feel free to reach out if you have any questions.\n\nBest regards,\nLOTS247 Team`,
            attachments: [],
            sent: false,
        });
    };
    const handleAddAttachments = (files) => {
        if (!files || files.length === 0)
            return;
        setSendModal(prev => ({ ...prev, attachments: [...prev.attachments, ...Array.from(files)] }));
    };
    const handleRemoveAttachment = (index) => {
        setSendModal(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
    };
    const handleConfirmSend = () => {
        setSendModal(prev => ({ ...prev, sent: true }));
        onSave(formData, false);
    };
    const handleDownloadPdf = () => {
        if (typeof window === 'undefined')
            return;
        const win = window.open('', '_blank', 'width=900,height=1200');
        if (!win)
            return;
        const lines = [];
        if (formData.type !== 'pay-per-service' && selectedPlan) {
            lines.push({ title: selectedPlan.name, subtitle: selectedPlan.description, amount: formatCurrency(selectedPlan.price) });
        }
        for (const a of selectedAddons) {
            const pct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0));
            if (a.id === 'caas-bulk' && a.challanMeta) {
                const amount = Math.round(a.challanMeta.pendingAmount * (1 - pct / 100));
                lines.push({
                    title: a.name,
                    subtitle: [`Pending ${formatCurrency(a.challanMeta.pendingAmount)}`, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '),
                    amount: formatCurrency(amount),
                });
                continue;
            }
            const qty = Math.max(1, formData.addonQuantities[a.id] || 1);
            const unitPrice = a.category === 'api'
                ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
                : a.price;
            const amount = Math.round(unitPrice * qty * (1 - pct / 100));
            const qtyLabel = a.category === 'api' ? 'credits' : '';
            const qtyPart = qty > 1 ? `× ${qty}${qtyLabel ? ` ${qtyLabel}` : ''}` : (qtyLabel ? `${qty} ${qtyLabel}` : '');
            const perHitPart = a.category === 'api' && unitPrice > 0 ? `${formatCurrency(unitPrice)}/hit` : '';
            lines.push({
                title: a.name,
                subtitle: [a.unit, perHitPart, qtyPart, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '),
                amount: formatCurrency(amount),
            });
        }
        const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Quotation - ${escape(selectedLead?.companyAlias || selectedLead?.companyName || '')}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #fff; }
  h1 { margin: 0 0 4px; font-size: 22px; }
  h2 { margin: 24px 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
  .row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  .muted { color: #64748b; font-size: 12px; }
  .card { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-top: 8px; }
  .line { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .line:last-child { border-bottom: none; }
  .line .title { font-weight: 500; font-size: 14px; }
  .line .subtitle { font-size: 12px; color: #64748b; margin-top: 2px; }
  .line .amount { font-weight: 500; font-size: 14px; white-space: nowrap; }
  .total { background: #ecfeff; color: #155e75; }
  .total .title { font-weight: 600; }
  .total .amount { font-weight: 700; font-size: 16px; }
  .discount { color: #047857; }
  pre { font-family: inherit; white-space: pre-wrap; font-size: 12px; color: #334155; margin: 8px 0 0; }
  .issuer { display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
  .issuer .logo { width: 112px; height: 64px; background: #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 12px; box-sizing: border-box; }
  .issuer .logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .issuer .info { font-size: 11px; line-height: 1.5; color: #334155; }
  .issuer .info .name { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 2px; }
  .issuer .info .gst { font-weight: 600; color: #0f172a; margin-top: 4px; }
  @media print { body { padding: 24px; } }
</style></head>
<body>
  <div class="issuer">
    <div class="logo">
      <img src="${window.location.origin}/lawyered-logo.webp" alt="Lawyered" />
    </div>
    <div class="info">
      <div class="name">Sproutech Solutions Private Limited</div>
      <div>Company ID : U74900DL2015PTC285360</div>
      <div>IA Accel, LG-007-02, Lower Ground Floor, MGF Metropolis Mall, MG Road, Gurugram,</div>
      <div>Gurugram, Haryana - 122002, India</div>
      <div>Phone No: 7838105852, 7003670389 | Email: accounts@lawyered.in</div>
      <div class="gst">GST No : 06AAWCS2817C1Z9</div>
    </div>
  </div>

  <div class="row">
    <div>
      <div class="muted" style="text-transform: uppercase; letter-spacing: 0.05em;">Quotation for</div>
      <h1>${escape(selectedLead?.companyAlias || selectedLead?.companyName || '')}</h1>
      <div class="muted">${escape([selectedLead?.contactPerson, selectedLead?.emailId, selectedLead?.phoneNumber].filter(Boolean).join(' · '))}</div>
    </div>
    <div style="text-align: right;">
      <div class="muted" style="text-transform: uppercase; letter-spacing: 0.05em;">Valid Till</div>
      <div style="font-weight: 600; font-size: 14px;">${escape(formData.validTill)}</div>
    </div>
  </div>

  <div class="card">
    ${lines.map(l => `
      <div class="line">
        <div>
          <div class="title">${escape(l.title)}</div>
          ${l.subtitle ? `<div class="subtitle">${escape(l.subtitle)}</div>` : ''}
        </div>
        <div class="amount">${escape(l.amount)}</div>
      </div>`).join('')}
    <div class="line"><div class="title" style="font-weight:400; color:#475569;">Subtotal</div><div class="amount">${escape(formatCurrency(subtotal))}</div></div>
    ${discountAmount > 0 ? `<div class="line discount"><div class="title" style="font-weight:400;">Discount (${discountPercent}%)</div><div class="amount">− ${escape(formatCurrency(discountAmount))}</div></div>` : ''}
    <div class="line total"><div class="title">Final Amount</div><div class="amount">${escape(formatCurrency(finalAmount))}</div></div>
  </div>

  <h2>Terms & Conditions</h2>
  <pre>${escape(formData.terms)}</pre>
</body></html>`;
        win.document.open();
        win.document.write(html);
        win.document.close();
        setTimeout(() => {
            win.focus();
            win.print();
        }, 200);
    };
    const toggleAddon = (id) => {
        setFormData(prev => ({
            ...prev,
            addonIds: prev.addonIds.includes(id) ? prev.addonIds.filter(x => x !== id) : [...prev.addonIds, id],
        }));
    };
    const inputClass = (hasError) => `w-full px-3 py-2 bg-white dark:bg-slate-950 border text-xs sm:text-sm ${hasError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`;
    const typeCards = [
        { id: 'subscription-addons', title: 'Sub + Add-ons', icon: _jsx(Layers, { className: "w-4 h-4" }) },
        { id: 'pay-per-service', title: 'Pay-per-Service', icon: _jsx(Wrench, { className: "w-4 h-4" }) },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx("button", { onClick: onClose, className: "flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0", "aria-label": "Back", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-300" }) }), _jsx("div", { className: "min-w-0", children: _jsx("h1", { className: "text-base sm:text-lg lg:text-xl font-semibold text-slate-900 dark:text-white truncate", children: "Add Quotation" }) })] }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs("button", { type: "button", onClick: handleDownloadPdf, className: "flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Download PDF" })] }), _jsxs("button", { type: "button", onClick: handleSendToCustomer, className: "flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors", children: [_jsx(Send, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Send to Customer" })] })] })] }), _jsxs("div", { className: "flex-1 flex flex-col lg:flex-row lg:items-start", children: [_jsx("div", { className: "w-full lg:w-1/2 xl:w-[55%]", children: _jsxs("div", { className: "p-4 sm:p-6 lg:p-8 space-y-3", children: [_jsx(FormSection, { title: "Customer / Lead", error: errors.leadId, children: selectedLead ? (_jsxs("div", { className: "flex items-center justify-between gap-3 p-3 rounded-lg border border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20", children: [_jsxs("div", { className: "min-w-0 pr-2", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: selectedLead.companyAlias || selectedLead.companyName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [selectedLead.contactPerson, " \u00B7 ", selectedLead.phoneNumber, " \u00B7 ", selectedLead.city] })] }), _jsx("button", { type: "button", onClick: () => {
                                                    setFormData({ ...formData, leadId: '' });
                                                    setCustomerSearch('');
                                                }, className: "text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:underline shrink-0", children: "Change" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", value: customerSearch, onChange: e => setCustomerSearch(e.target.value), placeholder: "Search by company, contact, email, or phone", className: "w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" })] }), customerSearch.trim() && (_jsx("div", { className: "mt-2 border border-slate-200 dark:border-slate-800 rounded-lg divide-y divide-slate-200 dark:divide-slate-800 max-h-64 overflow-y-auto", children: filteredLeads.length === 0 ? (_jsx("p", { className: "p-3 text-xs text-slate-500 dark:text-slate-400 text-center", children: "No customers match your search." })) : (filteredLeads.map(lead => (_jsx("button", { type: "button", onClick: () => {
                                                        setFormData({ ...formData, leadId: lead.id });
                                                        setCustomerSearch('');
                                                    }, className: "w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors", children: _jsxs("div", { className: "min-w-0 pr-3", children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-slate-900 dark:text-white truncate", children: lead.companyAlias || lead.companyName }), _jsxs("p", { className: "text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate", children: [lead.contactPerson, " \u00B7 ", lead.phoneNumber, " \u00B7 ", lead.city] })] }) }, lead.id)))) }))] })) }), !hideQuotationType && (_jsx(FormSection, { title: "Quotation Type", children: _jsx("div", { className: "grid grid-cols-3 gap-2", children: typeCards.map(card => {
                                            const selected = formData.type === card.id;
                                            return (_jsxs("button", { type: "button", onClick: () => setFormData({
                                                    ...formData,
                                                    type: card.id,
                                                    planId: card.id === 'pay-per-service' ? null : formData.planId,
                                                }), className: `flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border text-xs font-medium transition-colors ${selected
                                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500'
                                                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`, children: [card.icon, _jsx("span", { className: "text-center leading-tight", children: card.title })] }, card.id));
                                        }) }) })), formData.type === 'subscription-addons' && !hideSubscriptionPlan && (_jsx(FormSection, { title: "Subscription Plan", error: errors.planId, children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: SUBSCRIPTION_PLANS.map(plan => {
                                            const selected = formData.planId === plan.id;
                                            return (_jsxs("button", { type: "button", onClick: () => setFormData({ ...formData, planId: plan.id }), className: `text-left p-4 rounded-lg border transition-colors ${selected
                                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 ring-1 ring-cyan-500'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`, children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: plan.name }), _jsxs("p", { className: "text-sm font-semibold text-cyan-700 dark:text-cyan-300", children: [formatCurrency(plan.price), _jsx("span", { className: "text-[10px] font-normal text-slate-500", children: plan.billingCycle })] })] }), plan.description && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-3", children: plan.description }))] }, plan.id));
                                        }) }) })), !hideDiscount && (_jsx(FormSection, { title: "Discount", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", min: 0, max: 100, value: formData.overallDiscount || '', onChange: e => setFormData({ ...formData, overallDiscount: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }), placeholder: "0", className: inputClass(false) }), _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: "Percentage (%)" })] }) })), _jsxs(FormSection, { title: formData.type === 'pay-per-service' ? 'Services' : 'Add-ons', error: errors.addonIds, children: [_jsxs("div", { className: "mb-4 pb-4 border-b border-slate-200 dark:border-slate-800", children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Service Type" }), _jsxs("div", { className: "relative", ref: serviceTypeRef, children: [_jsxs("button", { type: "button", onClick: () => setServiceTypeOpen(o => !o), "aria-haspopup": "listbox", "aria-expanded": serviceTypeOpen, className: "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent", children: [_jsx("span", { className: `truncate text-left ${activeAddonCategories.length === 0 ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-50'}`, children: activeAddonCategories.length === 0
                                                                        ? 'Select service types'
                                                                        : ADDON_CATEGORIES.filter(c => activeAddonCategories.includes(c.id)).map(c => {
                                                                            const count = ADDONS.filter(a => a.category === c.id && formData.addonIds.includes(a.id)).length;
                                                                            return count > 0 ? `${c.label} (${count})` : c.label;
                                                                        }).join(', ') }), _jsx(ChevronDown, { className: `w-4 h-4 text-slate-400 shrink-0 transition-transform ${serviceTypeOpen ? 'rotate-180' : ''}` })] }), serviceTypeOpen && (_jsx("div", { role: "listbox", "aria-multiselectable": "true", className: "absolute z-20 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden", children: ADDON_CATEGORIES.map(cat => {
                                                                const selected = activeAddonCategories.includes(cat.id);
                                                                const count = ADDONS.filter(a => a.category === cat.id && formData.addonIds.includes(a.id)).length;
                                                                return (_jsxs("button", { type: "button", role: "option", "aria-selected": selected, onClick: () => toggleAddonCategory(cat.id), className: "w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", children: [_jsx("div", { className: `w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300 dark:border-slate-600'}`, children: selected && _jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }), _jsx("span", { className: "text-slate-900 dark:text-white flex-1", children: cat.label }), count > 0 && (_jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["(", count, ")"] }))] }, cat.id));
                                                            }) }))] })] }), activeAddonCategories.includes('caas') && (_jsxs("div", { className: "mb-4 pb-4 border-b border-slate-200 dark:border-slate-800", children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Upload Output Sheet" }), _jsx("input", { ref: caasOutputInputRef, type: "file", accept: ".csv,.xlsx,.xls,.pdf", className: "hidden", onChange: e => setCaasOutputSheet(e.target.files?.[0] || null) }), caasOutputSheet ? (_jsxs("div", { className: "flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(FileText, { className: "w-4 h-4 text-slate-400 shrink-0" }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-50 truncate", children: caasOutputSheet.name }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400 shrink-0", children: ["(", (caasOutputSheet.size / 1024).toFixed(1), " KB)"] })] }), _jsx("button", { type: "button", onClick: () => {
                                                                setCaasOutputSheet(null);
                                                                if (caasOutputInputRef.current)
                                                                    caasOutputInputRef.current.value = '';
                                                            }, className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded shrink-0", children: _jsx(X, { className: "w-4 h-4 text-slate-500" }) })] })) : (_jsxs("button", { type: "button", onClick: () => caasOutputInputRef.current?.click(), className: "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors", children: [_jsx(Upload, { className: "w-4 h-4" }), "Upload Output Sheet"] })), _jsx("p", { className: "mt-1.5 text-xs text-slate-500 dark:text-slate-400", children: "CSV, XLS, XLSX or PDF from the vehicle analysis." })] })), _jsx("div", { className: "space-y-2", children: ADDONS.filter(a => activeAddonCategories.includes(a.category)).map(addon => {
                                                const selected = formData.addonIds.includes(addon.id);
                                                const discountValue = formData.addonDiscounts[addon.id] ?? 0;
                                                const quantityValue = formData.addonQuantities[addon.id] ?? 1;
                                                const perHitValue = formData.addonPerHitPrices[addon.id] ?? 0;
                                                const isApi = addon.category === 'api';
                                                const isChallanService = !!addon.challanMeta;
                                                const isPpt = addon.id === 'caas-ppt';
                                                const qtyLabel = isApi ? 'credits' : 'qty';
                                                return (_jsxs("div", { role: "button", tabIndex: 0, onClick: () => toggleAddon(addon.id), onKeyDown: (e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            toggleAddon(addon.id);
                                                        }
                                                    }, className: `w-full px-3 py-3 rounded-lg border text-left transition-colors cursor-pointer ${selected
                                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`, children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-start gap-3 min-w-0 flex-1", children: [_jsx("div", { className: `w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300 dark:border-slate-600'}`, children: selected && _jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: addon.name }), addon.unit && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: addon.unit }))] })] }), _jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [!isApi && !isChallanService && (_jsx("p", { className: "text-sm font-semibold text-cyan-700 dark:text-cyan-300", children: formatCurrency(addon.price) })), addon.id === 'caas-bulk' && addon.challanMeta && (_jsx("p", { className: "text-sm font-semibold text-cyan-700 dark:text-cyan-300 tabular-nums", children: formatCurrency(Math.round(addon.challanMeta.pendingAmount * (1 - (discountValue || 0) / 100))) })), isApi && (_jsxs("label", { className: "flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 w-36", onClick: (e) => e.stopPropagation(), children: [_jsx("span", { className: "px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { type: "number", min: 0, step: "0.01", value: perHitValue || '', placeholder: "0", onChange: (e) => {
                                                                                        const raw = e.target.value === '' ? 0 : Number(e.target.value);
                                                                                        const price = Math.max(0, isNaN(raw) ? 0 : raw);
                                                                                        setFormData(prev => ({
                                                                                            ...prev,
                                                                                            addonPerHitPrices: { ...prev.addonPerHitPrices, [addon.id]: price },
                                                                                        }));
                                                                                    }, onKeyDown: (e) => e.stopPropagation(), "aria-label": `Per hit price for ${addon.name}`, className: "w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" }), _jsx("span", { className: "px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap", children: "per hit" })] })), !isChallanService && (_jsxs("label", { className: `flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 ${isApi ? 'w-32' : 'w-24'}`, onClick: (e) => e.stopPropagation(), children: [_jsx("input", { type: "number", min: 1, value: quantityValue, placeholder: "1", onChange: (e) => {
                                                                                        const raw = e.target.value === '' ? 1 : Number(e.target.value);
                                                                                        const qty = Math.max(1, isNaN(raw) ? 1 : Math.floor(raw));
                                                                                        setFormData(prev => ({
                                                                                            ...prev,
                                                                                            addonQuantities: { ...prev.addonQuantities, [addon.id]: qty },
                                                                                        }));
                                                                                    }, onKeyDown: (e) => e.stopPropagation(), "aria-label": `${qtyLabel} for ${addon.name}`, className: "w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" }), _jsx("span", { className: "px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap", children: qtyLabel })] })), !isPpt && (_jsxs("div", { className: "flex items-center gap-2", children: [isChallanService && (_jsx("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap", children: "Deal Percentage" })), _jsxs("label", { className: "flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:border-cyan-500 w-24", onClick: (e) => e.stopPropagation(), children: [_jsx("input", { type: "number", min: 0, max: 100, value: discountValue || '', placeholder: "0", onChange: (e) => {
                                                                                                const raw = e.target.value === '' ? 0 : Number(e.target.value);
                                                                                                const pct = Math.min(100, Math.max(0, isNaN(raw) ? 0 : raw));
                                                                                                setFormData(prev => ({
                                                                                                    ...prev,
                                                                                                    addonDiscounts: { ...prev.addonDiscounts, [addon.id]: pct },
                                                                                                }));
                                                                                            }, onKeyDown: (e) => e.stopPropagation(), "aria-label": `Discount for ${addon.name}`, className: "w-full min-w-0 px-2 py-1.5 text-sm text-right bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" }), _jsx("span", { className: "px-2 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 whitespace-nowrap", children: "% off" })] })] }))] })] }), addon.challanMeta && (_jsxs("div", { className: "mt-3 pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2", children: [_jsxs("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 px-3 py-2", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Total Pending Challan Amount" }), _jsx("p", { className: "mt-0.5 text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(addon.challanMeta.pendingAmount) })] }), _jsxs("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 px-3 py-2", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Number of Challans" }), _jsxs("p", { className: "mt-0.5 text-sm text-slate-600 dark:text-slate-300", children: ["Online ", _jsx("span", { className: "font-semibold text-slate-900 dark:text-white", children: addon.challanMeta.onlineChallans }), _jsx("span", { className: "mx-1.5 text-slate-400 dark:text-slate-500", children: "\u00B7" }), "Court ", _jsx("span", { className: "font-semibold text-slate-900 dark:text-white", children: addon.challanMeta.courtChallans })] })] })] })), isPpt && (_jsx("div", { className: "mt-4 pl-7", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "pt-3 border-t border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Quotation" }), _jsxs("div", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Number of Online Challans" }), _jsx("input", { type: "number", min: 0, value: pptQuotation.onlineCount, onChange: (e) => setPptQuotation(prev => ({ ...prev, onlineCount: e.target.value.replace(/[^0-9]/g, '') })), onKeyDown: (e) => e.stopPropagation(), placeholder: "0", className: "w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Discount (%)" }), _jsx("input", { type: "number", min: 0, max: 100, value: pptQuotation.onlineDiscount, onChange: (e) => {
                                                                                                    const raw = e.target.value.replace(/[^0-9]/g, '');
                                                                                                    const clamped = raw === '' ? '' : String(Math.min(100, Math.max(0, Number(raw))));
                                                                                                    setPptQuotation(prev => ({ ...prev, onlineDiscount: clamped }));
                                                                                                }, onKeyDown: (e) => e.stopPropagation(), placeholder: "0", className: "w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 py-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Number of Court Challans" }), _jsx("input", { type: "number", min: 0, value: pptQuotation.courtCount, onChange: (e) => setPptQuotation(prev => ({ ...prev, courtCount: e.target.value.replace(/[^0-9]/g, '') })), onKeyDown: (e) => e.stopPropagation(), placeholder: "0", className: "w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Discount (%)" }), _jsx("input", { type: "number", min: 0, max: 100, value: pptQuotation.courtDiscount, onChange: (e) => {
                                                                                                    const raw = e.target.value.replace(/[^0-9]/g, '');
                                                                                                    const clamped = raw === '' ? '' : String(Math.min(100, Math.max(0, Number(raw))));
                                                                                                    setPptQuotation(prev => ({ ...prev, courtDiscount: clamped }));
                                                                                                }, onKeyDown: (e) => e.stopPropagation(), placeholder: "0", className: "w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] })] }), _jsxs("div", { className: "pt-3", children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Select Type" }), _jsxs("select", { value: pptQuotation.state, onChange: (e) => setPptQuotation(prev => ({ ...prev, state: e.target.value })), onKeyDown: (e) => e.stopPropagation(), className: "w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500", children: [_jsx("option", { value: "", children: "Select type" }), PPT_TYPE_OPTIONS.map(opt => _jsx("option", { value: opt, children: opt }, opt))] })] })] })] }) }))] }, addon.id));
                                            }) })] }), _jsx(FormSection, { title: "GST Treatment", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: ['inclusive', 'exclusive'].map(mode => {
                                            const selected = formData.gstMode === mode;
                                            const label = mode === 'inclusive' ? 'Inclusive of GST' : 'Exclusive of GST';
                                            const helper = mode === 'inclusive'
                                                ? 'Prices already include 18% GST.'
                                                : 'GST @ 18% will be added on top.';
                                            return (_jsx("button", { type: "button", onClick: () => setFormData({ ...formData, gstMode: mode }), className: `text-left px-3 py-3 rounded-lg border transition-colors ${selected
                                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-cyan-600' : 'border-slate-300 dark:border-slate-600'}`, children: selected && _jsx("span", { className: "w-2 h-2 rounded-full bg-cyan-600" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: label }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: helper })] })] }) }, mode));
                                        }) }) }), _jsx(FormSection, { title: "Terms & Validity", children: _jsxs("div", { className: "grid grid-cols-1 gap-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: ["Valid Till ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "date", value: formData.validTill, onChange: e => setFormData({ ...formData, validTill: e.target.value }), className: inputClass(!!errors.validTill) }), errors.validTill && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.validTill })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Terms & Conditions" }), _jsx("textarea", { rows: 5, value: formData.terms, onChange: e => setFormData({ ...formData, terms: e.target.value }), className: inputClass(false) + ' resize-y' })] })] }) })] }) }), _jsx("div", { className: "flex-1 lg:w-1/2 xl:w-[45%] bg-slate-100 dark:bg-slate-950/60 lg:self-stretch", children: _jsx("div", { className: "lg:sticky lg:top-0 p-4 sm:p-6 lg:p-8 lg:h-screen lg:flex lg:flex-col", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col lg:min-h-0 lg:flex-1", children: [_jsx(IssuerHeader, {}), _jsxs("div", { className: "px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: selectedLead?.companyAlias || selectedLead?.companyName || 'Customer Name' }) }), _jsx("p", { className: "text-[10px] text-slate-500 dark:text-slate-400 mt-1", children: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-[10px] uppercase tracking-wider text-slate-400", children: "Valid Till" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formData.validTill ? new Date(formData.validTill).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—' })] })] }), _jsxs("div", { className: "px-6 py-5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800", children: [_jsx("p", { className: "text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1", children: "Bill to" }), selectedLead ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-base font-semibold text-slate-900 dark:text-white", children: selectedLead.companyAlias || selectedLead.companyName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: selectedLead.contactPerson }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [selectedLead.emailId, " \u00B7 ", selectedLead.phoneNumber] }), selectedLead.city && (_jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [selectedLead.city, selectedLead.state ? `, ${selectedLead.state}` : ''] }))] })) : (_jsx("p", { className: "text-sm text-slate-400 italic", children: "Select a customer to see billing details" }))] }), _jsxs("div", { className: "flex-1 overflow-y-auto min-h-0", children: [_jsxs("div", { children: [_jsxs("div", { className: "px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40", children: [_jsx("span", { children: "Description" }), _jsx("span", { children: "Amount" })] }), _jsxs("div", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: [formData.type !== 'pay-per-service' && selectedPlan && (_jsx(PreviewLine, { title: selectedPlan.name, subtitle: selectedPlan.description, amount: formatCurrency(selectedPlan.price) })), selectedAddons.map(a => {
                                                                const pct = Math.min(100, Math.max(0, formData.addonDiscounts[a.id] || 0));
                                                                if (a.id === 'caas-bulk' && a.challanMeta) {
                                                                    const amount = Math.round(a.challanMeta.pendingAmount * (1 - pct / 100));
                                                                    return (_jsx(PreviewLine, { title: a.name, subtitle: [`Pending ${formatCurrency(a.challanMeta.pendingAmount)}`, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '), amount: formatCurrency(amount) }, a.id));
                                                                }
                                                                const qty = Math.max(1, formData.addonQuantities[a.id] || 1);
                                                                const unitPrice = a.category === 'api'
                                                                    ? Math.max(0, formData.addonPerHitPrices[a.id] || 0)
                                                                    : a.price;
                                                                const amount = Math.round(unitPrice * qty * (1 - pct / 100));
                                                                const qtyLabel = a.category === 'api' ? 'credits' : '';
                                                                const qtyPart = qty > 1 ? `× ${qty}${qtyLabel ? ` ${qtyLabel}` : ''}` : (qtyLabel ? `${qty} ${qtyLabel}` : '');
                                                                const perHitPart = a.category === 'api' && unitPrice > 0 ? `${formatCurrency(unitPrice)}/hit` : '';
                                                                return (_jsx(PreviewLine, { title: a.name, subtitle: [a.unit, perHitPart, qtyPart, pct > 0 ? `${pct}% off` : ''].filter(Boolean).join(' · '), amount: formatCurrency(amount) }, a.id));
                                                            }), basePrice === 0 && addonsPrice === 0 && (_jsx("div", { className: "px-6 py-8 text-center text-xs text-slate-400 italic", children: "Select a plan or service to see line items." }))] }), _jsxs("div", { className: "px-6 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-slate-600 dark:text-slate-400", children: "Subtotal" }), _jsx("span", { className: "text-slate-900 dark:text-white", children: formatCurrency(subtotal) })] }), discountAmount > 0 && (_jsxs("div", { className: "flex items-center justify-between text-sm text-emerald-700 dark:text-emerald-400", children: [_jsxs("span", { children: ["Discount (", discountPercent, "%)"] }), _jsxs("span", { children: ["\u2212 ", formatCurrency(discountAmount)] })] }))] })] }), _jsxs("div", { className: "px-6 py-5 border-t border-slate-100 dark:border-slate-800", children: [_jsx("p", { className: "text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2", children: "Terms & Conditions" }), _jsx("pre", { className: "whitespace-pre-wrap text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans", children: formData.terms || '—' })] })] }), _jsxs("div", { className: "px-6 py-4 bg-cyan-50 dark:bg-cyan-900/20 border-t border-cyan-100 dark:border-cyan-900/50 flex items-center justify-between shrink-0", children: [_jsx("span", { className: "text-sm font-semibold text-cyan-900 dark:text-cyan-100", children: "Total Due" }), _jsx("span", { className: "text-xl font-bold text-cyan-900 dark:text-cyan-100 tabular-nums", children: formatCurrency(finalAmount) })] })] }) }) })] }), sendModal.open && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/70 px-4", children: _jsx("div", { className: "w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden", children: sendModal.sent ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4", children: _jsx(Check, { className: "w-6 h-6" }) }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-1", children: "Quotation Sent" }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-6", children: ["We've emailed the quotation to ", _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: sendModal.email }), "."] }), _jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors", children: "Done" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-100 dark:border-slate-800", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Send Quotation" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Review the details before sending." })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "To" }), _jsx("input", { type: "email", value: sendModal.email, onChange: e => setSendModal(prev => ({ ...prev, email: e.target.value })), placeholder: "customer@example.com", className: inputClass(false) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "CC" }), _jsx("input", { type: "text", value: sendModal.cc, onChange: e => setSendModal(prev => ({ ...prev, cc: e.target.value })), placeholder: "comma-separated emails", className: inputClass(false) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Subject" }), _jsx("input", { type: "text", value: sendModal.subject, onChange: e => setSendModal(prev => ({ ...prev, subject: e.target.value })), className: inputClass(false) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Message" }), _jsx("textarea", { rows: 10, value: sendModal.message, onChange: e => setSendModal(prev => ({ ...prev, message: e.target.value })), className: inputClass(false) + ' resize-y min-h-[220px]' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Attachments" }), _jsx("input", { ref: attachmentInputRef, type: "file", multiple: true, onChange: e => {
                                                    handleAddAttachments(e.target.files);
                                                    if (attachmentInputRef.current)
                                                        attachmentInputRef.current.value = '';
                                                }, className: "hidden" }), _jsxs("button", { type: "button", onClick: () => attachmentInputRef.current?.click(), className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", children: [_jsx(Paperclip, { className: "w-3.5 h-3.5" }), "Add attachment"] }), sendModal.attachments.length > 0 && (_jsx("ul", { className: "mt-2 space-y-1.5", children: sendModal.attachments.map((f, i) => (_jsxs("li", { className: "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700", children: [_jsxs("span", { className: "flex items-center gap-1.5 min-w-0 text-xs text-slate-700 dark:text-slate-300", children: [_jsx(Paperclip, { className: "w-3 h-3 shrink-0" }), _jsx("span", { className: "truncate", children: f.name }), _jsxs("span", { className: "text-slate-400 dark:text-slate-500 shrink-0", children: ["(", (f.size / 1024).toFixed(1), " KB)"] })] }), _jsx("button", { type: "button", onClick: () => handleRemoveAttachment(i), className: "p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400", "aria-label": `Remove ${f.name}`, children: _jsx(X, { className: "w-3 h-3" }) })] }, `${f.name}-${i}`))) }))] })] }), _jsxs("div", { className: "px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-900/40", children: [_jsx("button", { type: "button", onClick: () => setSendModal(prev => ({ ...prev, open: false })), className: "px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { type: "button", onClick: handleConfirmSend, disabled: !sendModal.email.trim(), className: "flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors", children: [_jsx(Send, { className: "w-4 h-4" }), "Send"] })] })] })) }) }))] }));
}
function FormSection({ title, hint, error, children }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5", children: [_jsxs("div", { className: "flex items-baseline justify-between mb-3", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white tracking-tight", children: title }), hint && _jsx("span", { className: "text-[10px] uppercase tracking-wider text-slate-400", children: hint })] }), children, error && _jsx("p", { className: "mt-2 text-xs text-red-500", children: error })] }));
}
function PreviewLine({ title, subtitle, amount }) {
    return (_jsxs("div", { className: "px-6 py-3 flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: title }), subtitle && _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: subtitle })] }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white shrink-0 tabular-nums", children: amount })] }));
}
export function IssuerHeader() {
    return (_jsxs("div", { className: "px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4", children: [_jsx("div", { className: "w-28 h-16 bg-black rounded flex items-center justify-center shrink-0 px-3", children: _jsx("img", { src: "/lawyered-logo.webp", alt: "Lawyered", className: "max-w-full max-h-full object-contain" }) }), _jsxs("div", { className: "min-w-0 flex-1 text-[11px] leading-snug text-slate-700 dark:text-slate-300", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-0.5", children: "Sproutech Solutions Private Limited" }), _jsx("p", { children: "Company ID : U74900DL2015PTC285360" }), _jsx("p", { children: "IA Accel, LG-007-02, Lower Ground Floor, MGF Metropolis Mall, MG Road, Gurugram," }), _jsx("p", { children: "Gurugram, Haryana - 122002, India" }), _jsx("p", { children: "Phone No: 7838105852, 7003670389 | Email: accounts@lawyered.in" }), _jsx("p", { className: "font-semibold text-slate-900 dark:text-white mt-1", children: "GST No : 06AAWCS2817C1Z9" })] })] }));
}
