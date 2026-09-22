import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Search, Layers, X, History, ChevronDown } from 'lucide-react';
import rewardsData from '@/../product/sections/rewards-config/data.json';
import { RewardsConfigDashboard } from './RewardsConfigDashboard';
const CATEGORY_TABS = [
    { key: 'caas', label: 'CAAS' },
    { key: 'zeroChallans', label: 'Zero Challans' },
    { key: 'rto', label: 'RTO' },
    { key: 'laas', label: 'LAAS' },
];
const SEED_HISTORIANS = ['Priya Sharma', 'Arjun Mehta', 'Rohan Kapoor'];
const seedHistory = (currentAmount, currentAt) => {
    const base = new Date(currentAt).getTime();
    const step1 = new Date(base - 45 * 24 * 60 * 60 * 1000).toISOString();
    const step2 = new Date(base - 120 * 24 * 60 * 60 * 1000).toISOString();
    const prev1 = Math.max(0, Math.round(currentAmount * 0.9));
    const prev2 = Math.max(0, Math.round(currentAmount * 0.75));
    return [
        { amount: prev1, changedBy: SEED_HISTORIANS[1], changedAt: step1 },
        { amount: prev2, changedBy: SEED_HISTORIANS[2], changedAt: step2 },
    ];
};
const RAW_ROWS = [
    // CAAS
    { id: 'caas-bulk', category: 'caas', service: 'Bulk Challans', amount: 500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-10' },
    { id: 'caas-ppt', category: 'caas', service: 'Pay per Transaction Challans', amount: 250, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-22' },
    // RTO
    { id: 'rto-rc-renewal', category: 'rto', service: 'RC Renewal', amount: 1200, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-01' },
    { id: 'rto-rc-retrieval', category: 'rto', service: 'RC Retrieval', amount: 900, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-01' },
    { id: 'rto-license-renewal', category: 'rto', service: 'License Renewal', amount: 1000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-06-15' },
    { id: 'rto-license-retrieval', category: 'rto', service: 'License Retrieval', amount: 800, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-06-15' },
    { id: 'rto-fitness-renewal', category: 'rto', service: 'Fitness Renewal', amount: 850, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-05-30' },
    { id: 'rto-fitness-retrieval', category: 'rto', service: 'Fitness Retrieval', amount: 700, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-05-30' },
    { id: 'rto-ownership-transfer', category: 'rto', service: 'Ownership Transfer', amount: 1500, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-05' },
    { id: 'rto-number-updating', category: 'rto', service: 'Number Updating', amount: 600, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-10' },
    // LAAS
    { id: 'laas-oncall', category: 'laas', service: '24×7 On Call Legal Support', amount: 2500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-12' },
    { id: 'laas-onsite', category: 'laas', service: 'On-Site Lawyer Support', amount: 5000, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-05' },
    { id: 'laas-theft', category: 'laas', service: 'Theft', amount: 4000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-08' },
    { id: 'laas-detention', category: 'laas', service: 'Detention', amount: 4500, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-02' },
    { id: 'laas-bail', category: 'laas', service: 'Bail', amount: 3500, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-28' },
    { id: 'laas-accidents', category: 'laas', service: 'Accidents', amount: 6000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-14' },
    { id: 'laas-firs', category: 'laas', service: 'FIRs', amount: 3000, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-20' },
    { id: 'laas-superdari', category: 'laas', service: 'Superdari', amount: 4200, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-18' },
    { id: 'laas-impound', category: 'laas', service: 'Vehicle Impounding', amount: 5500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-03' },
    { id: 'laas-eway', category: 'laas', service: 'E-Way Bill Issues', amount: 3800, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-25' },
];
const INITIAL_ROWS = RAW_ROWS.map((r) => ({
    ...r,
    history: seedHistory(r.amount, r.lastUpdatedAt),
}));
const RAW_ZERO_ROWS = [
    {
        id: 'zc-mh-signal',
        state: 'Maharashtra',
        region: 'All Regions',
        offence: 'Signal Jump',
        amount: 1000,
        lastUpdatedBy: 'Priya Sharma',
        lastUpdatedAt: '2026-07-14',
    },
    {
        id: 'zc-dl-no-helmet',
        state: 'Delhi',
        region: 'All Regions',
        offence: 'No Helmet',
        amount: 500,
        lastUpdatedBy: 'Arjun Mehta',
        lastUpdatedAt: '2026-07-06',
    },
];
const INITIAL_ZERO_ROWS = RAW_ZERO_ROWS.map((r) => ({
    ...r,
    history: seedHistory(r.amount, r.lastUpdatedAt),
}));
const AVAILABLE_STATES = rewardsData.states ?? [];
const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;
export function SalesConfigDashboard() {
    const [activeCategory, setActiveCategory] = useState('caas');
    const [query, setQuery] = useState('');
    const [rowsState, setRowsState] = useState(INITIAL_ROWS);
    const [editingRow, setEditingRow] = useState(null);
    const [historyRow, setHistoryRow] = useState(null);
    const [addingCategory, setAddingCategory] = useState(null);
    const [caasAddTrigger, setCaasAddTrigger] = useState(0);
    const [zeroRowsState, setZeroRowsState] = useState(INITIAL_ZERO_ROWS);
    const [editingZeroRow, setEditingZeroRow] = useState(null);
    const [historyZeroRow, setHistoryZeroRow] = useState(null);
    const [addingZeroChallan, setAddingZeroChallan] = useState(false);
    const categoryCounts = useMemo(() => {
        const counts = CATEGORY_TABS.reduce((acc, tab) => {
            acc[tab.key] = rowsState.filter((r) => r.category === tab.key).length;
            return acc;
        }, {});
        counts.zeroChallans = zeroRowsState.length;
        return counts;
    }, [rowsState, zeroRowsState]);
    const rows = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rowsState
            .filter((r) => r.category === activeCategory)
            .filter((r) => (q === '' ? true : r.service.toLowerCase().includes(q)));
    }, [rowsState, activeCategory, query]);
    const zeroRows = useMemo(() => {
        const q = query.trim().toLowerCase();
        return zeroRowsState.filter((r) => q === ''
            ? true
            : r.state.toLowerCase().includes(q) ||
                r.region.toLowerCase().includes(q) ||
                r.offence.toLowerCase().includes(q));
    }, [zeroRowsState, query]);
    const totalForCategory = categoryCounts[activeCategory];
    const handleSaveAmount = (id, amount) => {
        setRowsState((prev) => prev.map((r) => {
            if (r.id !== id)
                return r;
            const priorEntry = {
                amount: r.amount,
                changedBy: r.lastUpdatedBy,
                changedAt: r.lastUpdatedAt,
            };
            return {
                ...r,
                amount,
                lastUpdatedBy: 'You',
                lastUpdatedAt: new Date().toISOString(),
                history: [priorEntry, ...r.history],
            };
        }));
        setEditingRow(null);
    };
    const isCaas = activeCategory === 'caas';
    const isZeroChallans = activeCategory === 'zeroChallans';
    const handleAddClick = () => {
        if (isCaas) {
            setCaasAddTrigger((n) => n + 1);
        }
        else if (isZeroChallans) {
            setAddingZeroChallan(true);
        }
        else {
            setAddingCategory(activeCategory);
        }
    };
    const handleSaveZeroAmount = (id, amount) => {
        setZeroRowsState((prev) => prev.map((r) => {
            if (r.id !== id)
                return r;
            const priorEntry = {
                amount: r.amount,
                changedBy: r.lastUpdatedBy,
                changedAt: r.lastUpdatedAt,
            };
            return {
                ...r,
                amount,
                lastUpdatedBy: 'You',
                lastUpdatedAt: new Date().toISOString(),
                history: [priorEntry, ...r.history],
            };
        }));
        setEditingZeroRow(null);
    };
    const handleAddZeroChallanSubmit = (state, region, offence, amount) => {
        const newRow = {
            id: `zc-${Date.now()}`,
            state,
            region,
            offence,
            amount,
            lastUpdatedBy: 'You',
            lastUpdatedAt: new Date().toISOString(),
            history: [],
        };
        setZeroRowsState((prev) => [...prev, newRow]);
        setAddingZeroChallan(false);
    };
    const handleAddSubmit = (category, name, amount) => {
        const newRow = {
            id: `${category}-${Date.now()}`,
            category,
            service: name,
            amount,
            lastUpdatedBy: 'You',
            lastUpdatedAt: new Date().toISOString(),
            history: [],
        };
        setRowsState((prev) => [...prev, newRow]);
        setAddingCategory(null);
    };
    return (_jsxs("div", { className: "min-h-full bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { children: _jsx("div", { className: "max-w-[1440px] mx-auto px-6 py-5", children: _jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: "Configuration" }) }) }), _jsx("div", { className: "max-w-[1440px] mx-auto px-6 pt-6", children: _jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [_jsx("div", { className: "inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800", children: CATEGORY_TABS.map((tab) => {
                                const isActive = activeCategory === tab.key;
                                return (_jsxs("button", { type: "button", onClick: () => setActiveCategory(tab.key), className: `px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${isActive
                                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`, children: [tab.label, " (", categoryCounts[tab.key], ")"] }, tab.key));
                            }) }), _jsxs("button", { type: "button", onClick: handleAddClick, className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add Configuration"] })] }) }), isCaas ? (_jsx(RewardsConfigDashboard, { configs: rewardsData.configs, changeLog: rewardsData.changeLog, states: rewardsData.states, currentUser: rewardsData.currentUser, embedded: true, lockedProduct: "challanPay", addTrigger: caasAddTrigger, onAdd: (draft) => console.log('Add CAAS state config:', draft), onUpdate: (id, draft) => console.log('Update CAAS state config:', id, draft) })) : isZeroChallans ? (_jsx("div", { className: "px-6 py-6", children: _jsx("div", { className: "max-w-[1440px] mx-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4 flex-wrap", children: _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search state, region, offence\u2026", value: query, onChange: (e) => setQuery(e.target.value), className: "w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }) }), zeroRows.length === 0 ? (_jsxs("div", { className: "px-6 py-16 text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4", children: _jsx(Layers, { className: "w-5 h-5 text-slate-500" }) }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: query ? 'No records match your search' : 'No configurations yet' }), _jsx("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto", children: query
                                            ? 'Try clearing the search to see all Zero Challan configurations.'
                                            : 'Add a Zero Challan configuration to get started.' })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40", children: [_jsx(Th, { className: "pl-5", children: "State" }), _jsx(Th, { children: "Region" }), _jsx(Th, { children: "Offence" }), _jsx(Th, { align: "right", children: "Amount" }), _jsx(Th, { className: "pr-5", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: zeroRows.map((row) => (_jsxs("tr", { className: "group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors", children: [_jsx("td", { className: "py-3 pl-5 pr-3", children: _jsx("button", { type: "button", onClick: () => setEditingZeroRow(row), className: "font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left", children: row.state }) }), _jsx("td", { className: "py-3 px-3 text-slate-600 dark:text-slate-300 text-[13px]", children: row.region }), _jsx("td", { className: "py-3 px-3 text-slate-600 dark:text-slate-300 text-[13px]", children: row.offence }), _jsx("td", { className: "py-3 px-3 text-right", children: _jsx("span", { className: "inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300", children: formatCurrency(row.amount) }) }), _jsx("td", { className: "py-3 pr-5 pl-3 w-px whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("button", { type: "button", onClick: () => setEditingZeroRow(row), className: "inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25 transition-colors", children: [_jsx(Pencil, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Edit" })] }), _jsxs("button", { type: "button", onClick: () => setHistoryZeroRow(row), className: "inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: [_jsx(History, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "History" })] })] }) })] }, row.id))) })] }) })), zeroRows.length > 0 && (_jsx("div", { className: "px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40", children: _jsxs("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: ["Showing ", zeroRows.length, " of ", totalForCategory, " configurations."] }) }))] }) }) })) : (_jsx("div", { className: "px-6 py-6", children: _jsx("div", { className: "max-w-[1440px] mx-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4 flex-wrap", children: _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search service\u2026", value: query, onChange: (e) => setQuery(e.target.value), className: "w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }) }), rows.length === 0 ? (_jsxs("div", { className: "px-6 py-16 text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4", children: _jsx(Layers, { className: "w-5 h-5 text-slate-500" }) }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: query ? 'No services match your search' : 'No configurations yet' }), _jsx("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto", children: query
                                            ? 'Try clearing the search to see all services in this category.'
                                            : 'Add a reward configuration for this service category to get started.' })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40", children: [_jsx(Th, { className: "pl-5", children: "#" }), _jsx(Th, { children: "Service" }), _jsx(Th, { align: "right", children: "Amount" }), _jsx(Th, { children: "Last Updated By" }), _jsx(Th, { className: "pr-5", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: rows.map((row, idx) => (_jsxs("tr", { className: "group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors", children: [_jsx("td", { className: "py-3 pl-5 pr-3 text-[13px] tabular-nums text-slate-500 dark:text-slate-400", children: idx + 1 }), _jsx("td", { className: "py-3 px-3", children: _jsx("button", { type: "button", onClick: () => setEditingRow(row), className: "font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left", children: row.service }) }), _jsx("td", { className: "py-3 px-3 text-right", children: _jsx("span", { className: "inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300", children: formatCurrency(row.amount) }) }), _jsx("td", { className: "py-3 px-3", children: _jsxs("div", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[13px] text-slate-800 dark:text-slate-200 font-medium", children: row.lastUpdatedBy }), _jsx("span", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: formatRelative(row.lastUpdatedAt) })] }) }), _jsx("td", { className: "py-3 pr-5 pl-3 w-px whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("button", { type: "button", onClick: () => setEditingRow(row), className: "inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25 transition-colors", children: [_jsx(Pencil, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Edit" })] }), _jsxs("button", { type: "button", onClick: () => setHistoryRow(row), className: "inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: [_jsx(History, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "History" })] })] }) })] }, row.id))) })] }) })), rows.length > 0 && (_jsx("div", { className: "px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40", children: _jsxs("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: ["Showing ", rows.length, " of ", totalForCategory, " configurations."] }) }))] }) }) })), editingRow && (_jsx(EditAmountModal, { row: editingRow, onClose: () => setEditingRow(null), onSave: handleSaveAmount })), addingCategory && (_jsx(AddConfigModal, { category: addingCategory, onClose: () => setAddingCategory(null), onSave: handleAddSubmit })), historyRow && (_jsx(ServiceHistoryModal, { row: historyRow, onClose: () => setHistoryRow(null) })), editingZeroRow && (_jsx(EditZeroAmountModal, { row: editingZeroRow, onClose: () => setEditingZeroRow(null), onSave: handleSaveZeroAmount })), addingZeroChallan && (_jsx(AddZeroChallanModal, { existingStates: zeroRowsState.map((r) => r.state), onClose: () => setAddingZeroChallan(false), onSave: handleAddZeroChallanSubmit })), historyZeroRow && (_jsx(ZeroChallanHistoryModal, { row: historyZeroRow, onClose: () => setHistoryZeroRow(null) }))] }));
}
function EditAmountModal({ row, onClose, onSave, }) {
    const [amount, setAmount] = useState(String(row.amount));
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const handleSubmit = () => {
        const parsed = Number(amount);
        if (amount === '' || isNaN(parsed) || parsed < 0) {
            setError('Please enter a valid amount');
            return;
        }
        onSave(row.id, Math.round(parsed));
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4", onClick: onClose, children: _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "edit-amount-title", className: "w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { id: "edit-amount-title", className: "text-base font-semibold text-slate-900 dark:text-white", children: "Edit Amount" }), _jsx("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: row.service })] }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close", className: "p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "px-5 py-5", children: [_jsx("label", { htmlFor: "amount-input", className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Amount" }), _jsxs("div", { className: "flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent", children: [_jsx("span", { className: "px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { id: "amount-input", type: "number", min: 0, step: "1", value: amount, onChange: (e) => {
                                        setAmount(e.target.value);
                                        if (error)
                                            setError(null);
                                    }, onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }, autoFocus: true, className: "w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", placeholder: "0" })] }), error && (_jsx("p", { className: "mt-2 text-xs text-red-600 dark:text-red-400", children: error }))] }), _jsxs("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: "Save" })] })] }) }));
}
function AddConfigModal({ category, onClose, onSave, }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const categoryLabel = CATEGORY_TABS.find((t) => t.key === category)?.label ?? category.toUpperCase();
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const handleSubmit = () => {
        const next = {};
        const trimmed = name.trim();
        if (!trimmed)
            next.name = 'Please enter a service name';
        const parsed = Number(amount);
        if (amount === '' || isNaN(parsed) || parsed < 0) {
            next.amount = 'Please enter a valid amount';
        }
        if (Object.keys(next).length > 0) {
            setErrors(next);
            return;
        }
        onSave(category, trimmed, Math.round(parsed));
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4", onClick: onClose, children: _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "add-config-title", className: "w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { id: "add-config-title", className: "text-base font-semibold text-slate-900 dark:text-white", children: "Add Configuration" }), _jsx("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: categoryLabel })] }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close", className: "p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "px-5 py-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "add-name-input", className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Name" }), _jsx("input", { id: "add-name-input", type: "text", value: name, onChange: (e) => {
                                        setName(e.target.value);
                                        if (errors.name)
                                            setErrors((prev) => ({ ...prev, name: undefined }));
                                    }, onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }, autoFocus: true, placeholder: "e.g. New Service", className: "w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" }), errors.name && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.name }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "add-amount-input", className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Amount" }), _jsxs("div", { className: "flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent", children: [_jsx("span", { className: "px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { id: "add-amount-input", type: "number", min: 0, step: "1", value: amount, onChange: (e) => {
                                                setAmount(e.target.value);
                                                if (errors.amount)
                                                    setErrors((prev) => ({ ...prev, amount: undefined }));
                                            }, onKeyDown: (e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSubmit();
                                                }
                                            }, placeholder: "0", className: "w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] }), errors.amount && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.amount }))] })] }), _jsxs("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: "Add" })] })] }) }));
}
function Th({ children, align, className, }) {
    return (_jsx("th", { className: `py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${align === 'right' ? 'text-right' : 'text-left'} ${className ?? ''}`, children: children }));
}
function formatRelative(iso) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = now - then;
    const day = 24 * 60 * 60 * 1000;
    const days = Math.round(diff / day);
    if (days < 1)
        return 'today';
    if (days === 1)
        return 'yesterday';
    if (days < 30)
        return `${days}d ago`;
    const months = Math.round(days / 30);
    if (months < 12)
        return `${months}mo ago`;
    const years = Math.round(months / 12);
    return `${years}y ago`;
}
function formatHistoryDate(iso) {
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = String(d.getFullYear()).slice(-2);
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const period = hh >= 12 ? 'PM' : 'AM';
    const hour12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${day} ${month} '${year}, ${hour12}:${mm} ${period}`;
}
function ServiceHistoryModal({ row, onClose, }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const timeline = [
        { amount: row.amount, changedBy: row.lastUpdatedBy, changedAt: row.lastUpdatedAt, isCurrent: true },
        ...row.history.map((h) => ({ ...h, isCurrent: false })),
    ];
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [_jsx("div", { className: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm", onClick: onClose }), _jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0", children: _jsx(History, { className: "w-[18px] h-[18px] text-slate-600 dark:text-slate-300" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-base font-semibold text-slate-900 dark:text-white", children: ["History \u2013 ", row.service] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Amount change log" })] })] }), _jsx("button", { type: "button", onClick: onClose, className: "p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: timeline.length === 1 && row.history.length === 0 ? (_jsx("div", { className: "px-6 py-12 text-center", children: _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No changes recorded yet." }) })) : (_jsx("ul", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: timeline.map((entry, idx) => (_jsx("li", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-semibold bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300", children: formatCurrency(entry.amount) }), entry.isCurrent && (_jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400", children: "Current" }))] }), _jsxs("p", { className: "mt-1.5 text-xs text-slate-500 dark:text-slate-400", children: ["by ", _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: entry.changedBy })] })] }), _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: formatHistoryDate(entry.changedAt) })] }) }, `${entry.changedAt}-${idx}`))) })) }), _jsx("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: _jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Close" }) })] })] }));
}
function EditZeroAmountModal({ row, onClose, onSave, }) {
    const [amount, setAmount] = useState(String(row.amount));
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const handleSubmit = () => {
        const parsed = Number(amount);
        if (amount === '' || isNaN(parsed) || parsed < 0) {
            setError('Please enter a valid amount');
            return;
        }
        onSave(row.id, Math.round(parsed));
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4", onClick: onClose, children: _jsxs("div", { role: "dialog", "aria-modal": "true", className: "w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Edit Amount" }), _jsxs("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: [row.state, " \u00B7 ", row.region, " \u00B7 ", row.offence] })] }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close", className: "p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "px-5 py-5", children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Amount" }), _jsxs("div", { className: "flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent", children: [_jsx("span", { className: "px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { type: "number", min: 0, step: "1", value: amount, onChange: (e) => {
                                        setAmount(e.target.value);
                                        if (error)
                                            setError(null);
                                    }, onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }, autoFocus: true, className: "w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", placeholder: "0" })] }), error && (_jsx("p", { className: "mt-2 text-xs text-red-600 dark:text-red-400", children: error }))] }), _jsxs("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: "Save" })] })] }) }));
}
function AddZeroChallanModal({ existingStates: _existingStates, onClose, onSave, }) {
    const [state, setState] = useState('');
    const [region, setRegion] = useState('All Regions');
    const [offence, setOffence] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const handleSubmit = () => {
        const next = {};
        if (!state)
            next.state = 'Please select a state';
        const trimmedRegion = region.trim();
        if (!trimmedRegion)
            next.region = 'Please enter a region';
        const trimmedOffence = offence.trim();
        if (!trimmedOffence)
            next.offence = 'Please enter an offence';
        const parsed = Number(amount);
        if (amount === '' || isNaN(parsed) || parsed < 0) {
            next.amount = 'Please enter a valid amount';
        }
        if (Object.keys(next).length > 0) {
            setErrors(next);
            return;
        }
        onSave(state, trimmedRegion, trimmedOffence, Math.round(parsed));
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4", onClick: onClose, children: _jsxs("div", { role: "dialog", "aria-modal": "true", className: "w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Add Configuration" }), _jsx("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: "Zero Challans" })] }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close", className: "p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "px-5 py-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "State" }), _jsxs("div", { className: "relative", children: [_jsxs("select", { value: state, onChange: (e) => {
                                                setState(e.target.value);
                                                if (errors.state)
                                                    setErrors((prev) => ({ ...prev, state: undefined }));
                                            }, className: `w-full appearance-none pl-3 pr-9 h-10 text-sm rounded-lg border bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${!state
                                                ? 'text-slate-400 dark:text-slate-500'
                                                : 'text-slate-900 dark:text-white'} border-slate-300 dark:border-slate-600`, children: [_jsx("option", { value: "", disabled: true, children: "Select a state\u2026" }), AVAILABLE_STATES.map((s) => (_jsx("option", { value: s, className: "text-slate-900 dark:text-white", children: s }, s)))] }), _jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" })] }), errors.state && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.state }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Region" }), _jsx("input", { type: "text", value: region, onChange: (e) => {
                                        setRegion(e.target.value);
                                        if (errors.region)
                                            setErrors((prev) => ({ ...prev, region: undefined }));
                                    }, placeholder: "e.g. All Regions", className: "w-full px-3 h-10 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" }), errors.region && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.region }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Offence" }), _jsx("input", { type: "text", value: offence, onChange: (e) => {
                                        setOffence(e.target.value);
                                        if (errors.offence)
                                            setErrors((prev) => ({ ...prev, offence: undefined }));
                                    }, placeholder: "e.g. Signal Jump", className: "w-full px-3 h-10 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" }), errors.offence && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.offence }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Amount" }), _jsxs("div", { className: "flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent", children: [_jsx("span", { className: "px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: "\u20B9" }), _jsx("input", { type: "number", min: 0, step: "1", value: amount, onChange: (e) => {
                                                setAmount(e.target.value);
                                                if (errors.amount)
                                                    setErrors((prev) => ({ ...prev, amount: undefined }));
                                            }, onKeyDown: (e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSubmit();
                                                }
                                            }, placeholder: "0", className: "w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" })] }), errors.amount && (_jsx("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400", children: errors.amount }))] })] }), _jsxs("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSubmit, className: "px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: "Add" })] })] }) }));
}
function ZeroChallanHistoryModal({ row, onClose, }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const timeline = [
        {
            amount: row.amount,
            changedBy: row.lastUpdatedBy,
            changedAt: row.lastUpdatedAt,
            isCurrent: true,
        },
        ...row.history.map((h) => ({ ...h, isCurrent: false })),
    ];
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [_jsx("div", { className: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm", onClick: onClose }), _jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0", children: _jsx(History, { className: "w-[18px] h-[18px] text-slate-600 dark:text-slate-300" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-base font-semibold text-slate-900 dark:text-white", children: ["History \u2013 ", row.state] }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: [row.region, " \u00B7 ", row.offence] })] })] }), _jsx("button", { type: "button", onClick: onClose, className: "p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: timeline.length === 1 && row.history.length === 0 ? (_jsx("div", { className: "px-6 py-12 text-center", children: _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No changes recorded yet." }) })) : (_jsx("ul", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: timeline.map((entry, idx) => (_jsx("li", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-semibold bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300", children: formatCurrency(entry.amount) }), entry.isCurrent && (_jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400", children: "Current" }))] }), _jsxs("p", { className: "mt-1.5 text-xs text-slate-500 dark:text-slate-400", children: ["by", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: entry.changedBy })] })] }), _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: formatHistoryDate(entry.changedAt) })] }) }, `${entry.changedAt}-${idx}`))) })) }), _jsx("div", { className: "flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl", children: _jsx("button", { type: "button", onClick: onClose, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Close" }) })] })] }));
}
