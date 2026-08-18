import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { RewardsConfigTable } from './RewardsConfigTable';
import { ConfigurationForm } from './ConfigurationForm';
import { ConfirmationModal } from './ConfirmationModal';
import { ChangeHistoryModal } from './ChangeHistoryModal';
const PRODUCT_TABS = [
    { key: 'challanPay', label: 'ChallanPay' },
    { key: 'lots247', label: 'LOTS247' },
];
export function RewardsConfigDashboard({ configs, changeLog, states, onAdd, onUpdate, }) {
    const [view, setView] = useState({ kind: 'list' });
    const [activeProduct, setActiveProduct] = useState('challanPay');
    const [pendingSubmit, setPendingSubmit] = useState(null);
    const [historyStateId, setHistoryStateId] = useState(null);
    const productCounts = useMemo(() => ({
        challanPay: configs.filter((c) => c.product === 'challanPay').length,
        lots247: configs.filter((c) => c.product === 'lots247').length,
    }), [configs]);
    const productConfigs = useMemo(() => configs.filter((c) => c.product === activeProduct), [configs, activeProduct]);
    const existingStates = useMemo(() => productConfigs.map((c) => c.state), [productConfigs]);
    const editingConfig = view.kind === 'edit' ? configs.find((c) => c.id === view.configId) : undefined;
    const historyConfig = historyStateId
        ? configs.find((c) => c.id === historyStateId)
        : null;
    const historyEntries = historyConfig
        ? changeLog.filter((entry) => entry.configId === historyConfig.id)
        : [];
    const handleAddClick = () => setView({ kind: 'add' });
    const handleEditClick = (id) => setView({ kind: 'edit', configId: id });
    const handleHistoryClick = (id) => setHistoryStateId(id);
    const handleConfirm = () => {
        if (!pendingSubmit)
            return;
        if (pendingSubmit.kind === 'add') {
            onAdd?.({ ...pendingSubmit.draft, product: activeProduct });
        }
        else {
            onUpdate?.(pendingSubmit.configId, pendingSubmit.draft);
        }
        setPendingSubmit(null);
        setView({ kind: 'list' });
    };
    return (_jsxs("div", { className: "min-h-full bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-[1440px] mx-auto px-6 py-5", children: _jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [_jsxs("div", { className: "flex items-center gap-3", children: [view.kind !== 'list' && (_jsx("button", { type: "button", onClick: () => setView({ kind: 'list' }), "aria-label": "Back to configurations", className: "p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) })), _jsxs("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: [view.kind === 'list' && 'State-Level Reward Configurations', view.kind === 'add' && 'Add New Configuration', view.kind === 'edit' && 'Edit Configuration'] })] }), _jsx("div", { className: "flex items-center gap-3", children: view.kind === 'list' && (_jsxs("button", { type: "button", onClick: handleAddClick, className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add Configuration"] })) })] }) }) }), view.kind === 'list' && (_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-[1440px] mx-auto px-6", children: _jsx("div", { className: "flex items-center gap-1", children: PRODUCT_TABS.map((tab) => {
                            const isActive = activeProduct === tab.key;
                            const count = productCounts[tab.key];
                            return (_jsxs("button", { type: "button", onClick: () => setActiveProduct(tab.key), className: `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${isActive
                                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [_jsx("span", { children: tab.label }), _jsx("span", { className: `inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold tabular-nums ${isActive
                                            ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: count })] }, tab.key));
                        }) }) }) })), _jsxs("div", { className: "px-6 py-6", children: [view.kind === 'list' && (_jsx(RewardsConfigTable, { configs: productConfigs, onEdit: handleEditClick, onHistory: handleHistoryClick, onAdd: handleAddClick })), view.kind === 'add' && (_jsx(ConfigurationForm, { mode: "add", states: states, existingStates: existingStates, onCancel: () => setView({ kind: 'list' }), onSubmit: (draft) => setPendingSubmit({ kind: 'add', draft }) })), view.kind === 'edit' && editingConfig && (_jsx(ConfigurationForm, { mode: "edit", states: states, existingStates: existingStates, initialConfig: editingConfig, onCancel: () => setView({ kind: 'list' }), onSubmit: (draft) => setPendingSubmit({
                            kind: 'edit',
                            configId: editingConfig.id,
                            draft,
                        }) }))] }), pendingSubmit && (_jsx(ConfirmationModal, { mode: pendingSubmit.kind, draft: pendingSubmit.draft, onCancel: () => setPendingSubmit(null), onConfirm: handleConfirm })), historyConfig && (_jsx(ChangeHistoryModal, { state: historyConfig.state, entries: historyEntries, onClose: () => setHistoryStateId(null) }))] }));
}
