import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Shield, ChevronDown, Check } from 'lucide-react';
import { defaultWalletPermissions, walletPermissionLabels, } from '@/../product/sections/cms/types';
import { ProgrammeList } from './ProgrammeList';
import { WalletDashboard } from './WalletDashboard';
import { CustomerCreditView } from './CustomerCreditView';
import { WalletAuditLog } from './WalletAuditLog';
const tabs = [
    { id: 'dashboard', label: 'Dashboard', requires: 'viewReports' },
    { id: 'programmes', label: 'Programmes' },
    { id: 'customer-credit', label: 'Customer Credit', requires: 'viewCustomerCredit' },
    { id: 'audit-log', label: 'Audit Log', requires: 'viewAuditLog' },
];
export function WalletSection({ programmes, auditLog, customerCredits, onCreateProgramme, onEditProgramme, onViewProgramme, }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [permissions, setPermissions] = useState(defaultWalletPermissions);
    const visibleTabs = tabs.filter((t) => !t.requires || permissions[t.requires]);
    useEffect(() => {
        if (!visibleTabs.some((t) => t.id === activeTab)) {
            setActiveTab(visibleTabs[0]?.id ?? 'programmes');
        }
    }, [visibleTabs, activeTab]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-end justify-between border-b border-slate-200 dark:border-slate-700 mb-6 -mt-1", children: [_jsx("div", { className: "flex items-center gap-1", children: visibleTabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `px-4 py-2.5 text-sm font-medium relative transition-colors ${isActive
                                    ? 'text-cyan-700 dark:text-cyan-300'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`, children: [tab.label, isActive && (_jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 rounded-t" }))] }, tab.id));
                        }) }), _jsx("div", { className: "pb-2", children: _jsx(PermissionPreview, { permissions: permissions, onChange: setPermissions }) })] }), activeTab === 'programmes' && (_jsx(ProgrammeList, { programmes: programmes, permissions: permissions, onCreate: onCreateProgramme, onView: onViewProgramme, onEdit: onEditProgramme, onPauseIssuing: (id) => console.log('Pause issuing:', id), onPauseRedemption: (id) => console.log('Pause redemption:', id), onResume: (id) => console.log('Resume programme:', id), onArchive: (id) => console.log('Archive programme:', id), onClone: (id) => console.log('Clone programme:', id), onSearch: (query) => console.log('Search programmes:', query) })), activeTab === 'dashboard' && permissions.viewReports && (_jsx(WalletDashboard, { programmes: programmes })), activeTab === 'customer-credit' && permissions.viewCustomerCredit && (_jsx(CustomerCreditView, { customerCredits: customerCredits, permissions: permissions })), activeTab === 'audit-log' && permissions.viewAuditLog && (_jsx(WalletAuditLog, { entries: auditLog, permissions: permissions }))] }));
}
function PermissionPreview({ permissions, onChange, }) {
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
    const grantedCount = Object.values(permissions).filter(Boolean).length;
    const totalCount = Object.keys(permissions).length;
    return (_jsxs("div", { className: "relative", ref: ref, children: [_jsxs("button", { onClick: () => setOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-colors ${open
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Shield, { className: "w-3.5 h-3.5" }), "Preview permissions (", grantedCount, "/", totalCount, ")", _jsx(ChevronDown, { className: "w-3 h-3" })] }), open && (_jsxs("div", { className: "absolute right-0 top-full mt-1 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30", children: [_jsx("div", { className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700", children: _jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide", children: "Actions granted to this user" }) }), _jsx("div", { className: "max-h-80 overflow-y-auto", children: Object.keys(walletPermissionLabels).map((p) => {
                            const checked = permissions[p];
                            return (_jsxs("button", { onClick: () => onChange({ ...permissions, [p]: !checked }), className: "w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx("span", { children: walletPermissionLabels[p] }), _jsx("div", { className: `inline-flex items-center justify-center w-4 h-4 rounded border ${checked
                                            ? 'bg-cyan-600 border-cyan-600 text-white'
                                            : 'border-slate-300 dark:border-slate-600'}`, children: checked && _jsx(Check, { className: "w-3 h-3", strokeWidth: 3 }) })] }, p));
                        }) })] }))] }));
}
