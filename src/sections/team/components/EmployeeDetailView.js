import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Edit, User, Lock, Activity, Shield } from 'lucide-react';

function InfoField({ label, value }) {
    return (_jsxs("div", { children: [
        _jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500 mb-1", children: label }),
        _jsx("p", { className: "text-base font-medium text-slate-900 dark:text-slate-50", children: value })
    ] }));
}

function ManagerCard({ manager }) {
    return (_jsxs("div", { className: "flex items-center gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50", children: [
        _jsx("div", { className: "w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center flex-shrink-0", children: manager.profilePicture ? (_jsx("img", { src: manager.profilePicture, alt: manager.fullName, className: "w-full h-full rounded-full object-cover" })) : (_jsxs("span", { className: "text-cyan-600 dark:text-cyan-400 font-semibold text-xs", children: [manager.firstName[0], manager.lastName[0]] })) }),
        _jsxs("div", { className: "flex-1 min-w-0", children: [
            _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white truncate", children: manager.fullName }),
            _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: manager.designation })
        ] })
    ] }));
}

export function EmployeeDetailView({ employee, employees, onBack, onEdit, onManagePermissions }) {
    const [activeTab, setActiveTab] = useState('details');
    const primaryManager = employee.primaryReportingManager
        ? employees.find(emp => emp.id === employee.primaryReportingManager)
        : null;
    const secondaryManager = employee.secondaryReportingManager
        ? employees.find(emp => emp.id === employee.secondaryReportingManager)
        : null;
    const getTabIcon = (tab) => {
        const icons = {
            details: _jsx(User, { className: "w-4 h-4" }),
            permissions: _jsx(Lock, { className: "w-4 h-4" }),
        };
        return icons[tab];
    };
    const tabLabels = { details: 'Details', permissions: 'Permissions' };
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-10", children:
        _jsxs("div", { className: "max-w-7xl mx-auto", children: [
            // Header
            _jsxs("div", { className: "flex items-start gap-4 mb-8", children: [
                _jsx("button", { onClick: onBack, className: "mt-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex-shrink-0", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }),
                _jsxs("div", { className: "flex-1 min-w-0", children:
                    _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                                _jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight", children: employee.fullName }),
                                _jsx("span", { className: `inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${employee.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700'}`, children: employee.status === 'active' ? 'Active' : 'Inactive' })
                            ] }),
                            _jsxs("p", { className: "text-base text-slate-500 dark:text-slate-400", children: [employee.designation, " \u2022 ", employee.department] })
                        ] }),
                        employee.status === 'active' && (
                            _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                                _jsxs("button", { onClick: onManagePermissions, className: "inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors text-sm", children: [_jsx(Shield, { className: "w-4 h-4" }), "Edit Permissions"] }),
                                _jsxs("button", { onClick: onEdit, className: "inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors text-sm shadow-sm", children: [_jsx(Edit, { className: "w-4 h-4" }), "Edit Details"] })
                            ] })
                        )
                    ] })
                })
            ] }),

            // Tabs
            _jsx("div", { className: "mb-6 overflow-x-auto", children:
                _jsx("div", { className: "flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit", children:
                    ['details', 'permissions'].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab), className: `inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`, children: [getTabIcon(tab), tabLabels[tab]] }, tab)))
                })
            }),

            // Details Tab
            activeTab === 'details' && (
                _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
                    // Left - Employee Information
                    _jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8", children: [
                        _jsx("h2", { className: "text-xl font-bold text-slate-900 dark:text-slate-50 mb-8", children: "Employee Information" }),
                        _jsxs("div", { className: "space-y-10", children: [
                            // Personal Information
                            _jsxs("section", { children: [
                                _jsx("h3", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5", children: "Personal Information" }),
                                _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5", children: [
                                    _jsx(InfoField, { label: "Email", value: employee.email }),
                                    _jsx(InfoField, { label: "Mobile", value: employee.mobile }),
                                    _jsx(InfoField, { label: "Date of Birth", value: formatDate(employee.dateOfBirth) }),
                                    _jsx(InfoField, { label: "Gender", value: employee.gender })
                                ] })
                            ] }),
                            // Professional Information
                            _jsxs("section", { className: "border-t border-slate-100 dark:border-slate-800 pt-8", children: [
                                _jsx("h3", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5", children: "Professional Information" }),
                                _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5", children: [
                                    _jsx(InfoField, { label: "Department", value: employee.department }),
                                    _jsx(InfoField, { label: "Designation", value: employee.designation }),
                                    _jsx(InfoField, { label: "Date of Joining", value: formatDate(employee.dateOfJoining) })
                                ] })
                            ] }),
                            // Reporting Structure
                            _jsxs("section", { className: "border-t border-slate-100 dark:border-slate-800 pt-8", children: [
                                _jsx("h3", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5", children: "Reporting Structure" }),
                                _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-2.5", children: "Primary Reporting Manager" }),
                                        primaryManager ? _jsx(ManagerCard, { manager: primaryManager }) : _jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500 italic", children: "Not assigned" })
                                    ] }),
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-2.5", children: "Secondary Manager (Dotted Line)" }),
                                        secondaryManager ? _jsx(ManagerCard, { manager: secondaryManager }) : _jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500 italic", children: "Not assigned" })
                                    ] })
                                ] })
                            ] })
                        ] })
                    ] }),
                    // Right - Recent Activity
                    _jsxs("div", { className: "lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 h-fit lg:sticky lg:top-6", children: [
                        _jsxs("div", { className: "flex items-center gap-2.5 mb-6", children: [
                            _jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx(Activity, { className: "w-4 h-4 text-slate-500 dark:text-slate-400" }) }),
                            _jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-slate-50", children: "Recent Activity" })
                        ] }),
                        employee.recentActivity && employee.recentActivity.length > 0 ? (
                            _jsx("div", { className: "space-y-0", children: employee.recentActivity.map((activity, index) => (
                                _jsxs("div", { className: "relative flex gap-3.5 pb-6 last:pb-0", children: [
                                    index < employee.recentActivity.length - 1 && (_jsx("div", { className: "absolute left-[7px] top-[18px] bottom-0 w-px bg-slate-200 dark:bg-slate-700" })),
                                    _jsx("div", { className: "relative z-10 mt-1.5 w-[15px] flex-shrink-0 flex justify-center", children: _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 ring-2 ring-white dark:ring-slate-900" }) }),
                                    _jsxs("div", { className: "flex-1 min-w-0", children: [
                                        _jsx("p", { className: "text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug", children: activity.action }),
                                        _jsx("p", { className: "text-sm text-cyan-600 dark:text-cyan-400 font-mono mt-0.5", children: activity.target }),
                                        _jsxs("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1.5", children: [
                                            new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                            " at ",
                                            new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                                        ] })
                                    ] })
                                ] }, activity.id)
                            )) })
                        ) : (
                            _jsxs("div", { className: "text-center py-10", children: [
                                _jsx(Activity, { className: "w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-3" }),
                                _jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500", children: "No recent activity" })
                            ] })
                        )
                    ] })
                ] })
            ),

            // Permissions Tab
            activeTab === 'permissions' && (
                _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8", children: [
                    _jsx("h2", { className: "text-xl font-bold text-slate-900 dark:text-slate-50 mb-8", children: "Access Control" }),
                    _jsxs("div", { className: "space-y-10", children: [
                        _jsxs("section", { children: [
                            _jsxs("h3", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4", children: ["Module Access (", employee.permissions.moduleAccess.length, ")"] }),
                            employee.permissions.moduleAccess.length > 0 ? (
                                _jsx("div", { className: "flex flex-wrap gap-2.5", children: employee.permissions.moduleAccess.map((module) => (
                                    _jsx("span", { className: "inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 ring-1 ring-cyan-200 dark:ring-cyan-800", children: module }, module)
                                )) })
                            ) : (
                                _jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500 italic", children: "No module access assigned" })
                            )
                        ] }),
                        Object.keys(employee.permissions.flowAccess).length > 0 && (
                            _jsxs("section", { className: "border-t border-slate-100 dark:border-slate-800 pt-8", children: [
                                _jsx("h3", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5", children: "Flow Access" }),
                                _jsx("div", { className: "space-y-6", children: Object.entries(employee.permissions.flowAccess).map(([module, flows]) => (
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2.5", children: module }),
                                        _jsx("div", { className: "flex flex-wrap gap-2", children: flows.map((flow) => (
                                            _jsx("span", { className: "inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700 capitalize", children: flow.replace(/_/g, ' ') }, flow)
                                        )) })
                                    ] }, module)
                                )) })
                            ] })
                        )
                    ] })
                ] })
            )
        ] })
    }));
}
