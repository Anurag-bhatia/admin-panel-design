import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function IncidentsSidebar({ view, workType, onViewChange, onWorkTypeChange, }) {
    return (_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52", children: _jsxs("div", { className: "flex-1 py-4", children: [_jsxs("div", { className: "mb-2", children: [_jsx("div", { className: "px-4 py-2", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "All Incidents" }) }), _jsxs("div", { className: "space-y-0.5 px-2", children: [_jsxs("button", { onClick: () => {
                                        onViewChange?.('all');
                                        onWorkTypeChange?.('cases');
                                    }, disabled: true, className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${view === 'all' && workType === 'cases'
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'}`, children: [_jsx("span", { children: "Cases" }), _jsx("span", { className: "ml-auto text-xs text-slate-400 dark:text-slate-500", children: "Coming soon" })] }), _jsx("button", { onClick: () => {
                                        onViewChange?.('all');
                                        onWorkTypeChange?.('challans');
                                    }, className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${view === 'all' && workType === 'challans'
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { children: "Challans" }) })] })] }), _jsx("div", { className: "mx-4 my-3 border-t border-slate-200 dark:border-slate-700" }), _jsxs("div", { children: [_jsx("div", { className: "px-4 py-2", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "My Incidents" }) }), _jsxs("div", { className: "space-y-0.5 px-2", children: [_jsxs("button", { onClick: () => {
                                        onViewChange?.('my');
                                        onWorkTypeChange?.('cases');
                                    }, disabled: true, className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${view === 'my' && workType === 'cases'
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'}`, children: [_jsx("span", { children: "Cases" }), _jsx("span", { className: "ml-auto text-xs text-slate-400 dark:text-slate-500", children: "Coming soon" })] }), _jsx("button", { onClick: () => {
                                        onViewChange?.('my');
                                        onWorkTypeChange?.('challans');
                                    }, className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${view === 'my' && workType === 'challans'
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { children: "Challans" }) })] })] })] }) }));
}
