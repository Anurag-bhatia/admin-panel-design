import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import {
    ArrowLeft, ChevronDown, Save, User,
    AlertTriangle, BarChart3, Briefcase, CreditCard, Gavel,
    Headphones, LayoutGrid, MessageSquareWarning, Scale,
    Settings, Shield, UserCog, Users,
} from 'lucide-react';

const moduleIcons = {
    Incidents: AlertTriangle,
    Leads: Briefcase,
    Subscribers: Users,
    Lawyers: Scale,
    Partners: Briefcase,
    Payments: CreditCard,
    Disputes: MessageSquareWarning,
    Support: Headphones,
    Reports: BarChart3,
    Teams: Users,
    Employees: UserCog,
    Finance: CreditCard,
    Settings: Settings,
};

function Toggle({ enabled, onChange, disabled, size = 'md' }) {
    const dims = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11';
    const knob = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';
    return _jsx("button", {
        type: "button", role: "switch", "aria-checked": enabled, disabled: disabled, onClick: onChange,
        className: `relative inline-flex ${dims} shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${enabled ? 'bg-cyan-600 dark:bg-cyan-500' : 'bg-slate-300 dark:bg-slate-600'}`,
        children: _jsx("span", {
            className: `pointer-events-none inline-block ${knob} rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${enabled ? translate : 'translate-x-0.5'}`
        })
    });
}

function formatFlowName(flow) {
    return flow.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function PermissionsPage({ employee, modules, flows, onSave, onCancel }) {
    const [permissions, setPermissions] = useState({
        moduleAccess: [...employee.permissions.moduleAccess],
        flowAccess: Object.fromEntries(
            Object.entries(employee.permissions.flowAccess).map(([k, v]) => [k, [...v]])
        ),
    });

    const [expandedModules, setExpandedModules] = useState(new Set());

    const toggleModule = (module) => {
        const hasAccess = permissions.moduleAccess.includes(module);
        if (hasAccess) {
            setPermissions({
                moduleAccess: permissions.moduleAccess.filter(m => m !== module),
                flowAccess: { ...permissions.flowAccess, [module]: [] },
            });
        } else {
            setPermissions({
                moduleAccess: [...permissions.moduleAccess, module],
                flowAccess: { ...permissions.flowAccess, [module]: [] },
            });
        }
    };

    const toggleFlow = (module, flow) => {
        const currentFlows = permissions.flowAccess[module] || [];
        const hasFlow = currentFlows.includes(flow);
        setPermissions({
            ...permissions,
            flowAccess: {
                ...permissions.flowAccess,
                [module]: hasFlow
                    ? currentFlows.filter(f => f !== flow)
                    : [...currentFlows, flow],
            },
        });
    };

    const toggleAllFlows = (module) => {
        const moduleFlows = flows[module] || [];
        const enabledFlows = permissions.flowAccess[module] || [];
        const allEnabled = enabledFlows.length === moduleFlows.length;
        setPermissions({
            ...permissions,
            flowAccess: {
                ...permissions.flowAccess,
                [module]: allEnabled ? [] : [...moduleFlows],
            },
        });
    };

    const toggleExpand = (module) => {
        setExpandedModules(prev => {
            const next = new Set(prev);
            if (next.has(module)) next.delete(module);
            else next.add(module);
            return next;
        });
    };

    const totalModulesEnabled = permissions.moduleAccess.length;

    return _jsxs("div", {
        className: "min-h-screen bg-slate-50 dark:bg-slate-950",
        children: [
            // Header
            _jsx("div", {
                className: "sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm",
                children: _jsx("div", {
                    className: "px-6 sm:px-8 py-5 sm:py-6",
                    children: _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                            _jsxs("div", {
                                className: "flex items-center gap-4 sm:gap-5 min-w-0",
                                children: [
                                    _jsx("button", {
                                        onClick: onCancel,
                                        className: "p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0",
                                        children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-500 dark:text-slate-400" })
                                    }),
                                    _jsx("div", {
                                        className: "w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center shrink-0 ring-1 ring-cyan-200 dark:ring-cyan-800",
                                        children: _jsx(User, { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400" })
                                    }),
                                    _jsxs("div", {
                                        className: "min-w-0",
                                        children: [
                                            _jsx("h1", {
                                                className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate",
                                                children: employee.fullName
                                            }),
                                            _jsxs("p", {
                                                className: "text-sm text-slate-500 dark:text-slate-400 truncate",
                                                children: [employee.designation, " \u00B7 ", employee.department]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            _jsxs("button", {
                                onClick: () => onSave(permissions),
                                className: "hidden sm:flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0 shadow-sm",
                                children: [
                                    _jsx(Save, { className: "w-4 h-4" }),
                                    _jsx("span", { children: "Save Permissions" })
                                ]
                            })
                        ]
                    })
                })
            }),
            // Content
            _jsxs("div", {
                className: "px-6 sm:px-8 py-6 pb-28 sm:pb-8",
                children: [
                    // Summary Bar
                    _jsxs("div", {
                        className: "flex items-center justify-between mb-5",
                        children: [
                            _jsxs("div", {
                                children: [
                                    _jsx("h2", {
                                        className: "text-sm font-semibold text-slate-900 dark:text-white",
                                        children: "Module & Flow Access"
                                    }),
                                    _jsxs("p", {
                                        className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5",
                                        children: [totalModulesEnabled, " of ", modules.length, " modules enabled"]
                                    })
                                ]
                            }),
                            _jsxs("div", {
                                className: "flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500",
                                children: [
                                    _jsxs("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            _jsx("span", { className: "w-2 h-2 rounded-full bg-cyan-500" }),
                                            "Enabled"
                                        ]
                                    }),
                                    _jsxs("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            _jsx("span", { className: "w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" }),
                                            "Disabled"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    // Module List — stacked, collapsible
                    _jsx("div", {
                        className: "space-y-3",
                        children: modules.map(module => {
                            const moduleEnabled = permissions.moduleAccess.includes(module);
                            const moduleFlows = flows[module] || [];
                            const enabledFlows = permissions.flowAccess[module] || [];
                            const allFlowsEnabled = moduleFlows.length > 0 && enabledFlows.length === moduleFlows.length;
                            const isExpanded = expandedModules.has(module);
                            const hasFlows = moduleFlows.length > 0;
                            const Icon = moduleIcons[module] || LayoutGrid;

                            return _jsxs("div", {
                                className: `bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 ${moduleEnabled ? 'border-cyan-200 dark:border-cyan-800/60 shadow-sm shadow-cyan-100/50 dark:shadow-none' : 'border-slate-200 dark:border-slate-800'}`,
                                children: [
                                    // Module Header
                                    _jsxs("div", {
                                        className: "flex items-center justify-between px-5 py-4",
                                        children: [
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => hasFlows && toggleExpand(module),
                                                className: `flex items-center gap-3 min-w-0 flex-1 text-left ${hasFlows ? 'cursor-pointer' : 'cursor-default'}`,
                                                children: [
                                                    _jsx("div", {
                                                        className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${moduleEnabled ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`,
                                                        children: _jsx(Icon, { className: "w-4 h-4" })
                                                    }),
                                                    _jsxs("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            _jsx("span", {
                                                                className: "text-sm font-semibold text-slate-900 dark:text-white block truncate",
                                                                children: module
                                                            }),
                                                            hasFlows ? _jsx("span", {
                                                                className: `text-xs tabular-nums ${moduleEnabled ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`,
                                                                children: moduleEnabled ? `${enabledFlows.length} of ${moduleFlows.length} flows` : `${moduleFlows.length} flows available`
                                                            }) : _jsx("span", {
                                                                className: "text-xs text-slate-400 dark:text-slate-500",
                                                                children: "No configurable flows"
                                                            })
                                                        ]
                                                    }),
                                                    hasFlows && _jsx(ChevronDown, {
                                                        className: `w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`
                                                    })
                                                ]
                                            }),
                                            _jsx("div", {
                                                className: "ml-4 shrink-0",
                                                children: _jsx(Toggle, {
                                                    enabled: moduleEnabled,
                                                    onChange: () => toggleModule(module)
                                                })
                                            })
                                        ]
                                    }),
                                    // Flows — collapsible
                                    hasFlows && isExpanded && _jsxs("div", {
                                        className: `border-t transition-opacity duration-200 ${moduleEnabled ? 'border-slate-100 dark:border-slate-800' : 'border-slate-100 dark:border-slate-800 opacity-30 pointer-events-none'}`,
                                        children: [
                                            // Toggle All
                                            moduleEnabled && moduleFlows.length > 1 && _jsx("div", {
                                                className: "flex items-center justify-between px-5 pt-3 pb-1",
                                                children: _jsx("button", {
                                                    onClick: () => toggleAllFlows(module),
                                                    className: "text-xs font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors",
                                                    children: allFlowsEnabled ? 'Deselect all' : 'Select all'
                                                })
                                            }),
                                            _jsx("div", {
                                                className: "px-5 pb-4 pt-1",
                                                children: moduleFlows.map((flow, i) => {
                                                    const flowEnabled = enabledFlows.includes(flow);
                                                    return _jsxs("div", {
                                                        className: `flex items-center justify-between py-2.5 ${i < moduleFlows.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''}`,
                                                        children: [
                                                            _jsx("span", {
                                                                className: `text-sm ${flowEnabled ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`,
                                                                children: formatFlowName(flow)
                                                            }),
                                                            _jsx(Toggle, {
                                                                enabled: flowEnabled,
                                                                onChange: () => toggleFlow(module, flow),
                                                                disabled: !moduleEnabled,
                                                                size: "sm"
                                                            })
                                                        ]
                                                    }, flow);
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }, module);
                        })
                    })
                ]
            }),
            // Mobile Fixed Footer
            _jsx("div", {
                className: "fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4 sm:hidden",
                children: _jsxs("div", {
                    className: "flex gap-3 max-w-3xl mx-auto",
                    children: [
                        _jsx("button", {
                            onClick: onCancel,
                            className: "flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800",
                            children: "Cancel"
                        }),
                        _jsx("button", {
                            onClick: () => onSave(permissions),
                            className: "flex-1 px-4 py-2.5 text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors shadow-sm",
                            children: "Save Permissions"
                        })
                    ]
                })
            })
        ]
    });
}
