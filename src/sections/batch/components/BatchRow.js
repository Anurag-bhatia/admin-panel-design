import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function formatDate(dateString) {
    if (!dateString)
        return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
export function BatchRow({ batch, showExpert = true, isSelected = false, onSelect, onClick, }) {
    return (_jsxs("tr", { className: `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''}`, onClick: onClick, children: [_jsx("td", { className: "px-4 py-3 w-10", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: (e) => onSelect?.(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800" }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: batch.batchId }) }), showExpert && (_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: batch.assignedExpertName }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [_jsx("span", { className: "font-mono", children: batch.assignedExpertId }), _jsx("span", { className: "mx-1.5 text-slate-300 dark:text-slate-600", children: "\u00B7" }), batch.assignedExpertMobile] })] }) })), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: batch.itemCount }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(batch.totalAmount) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(batch.createdDate) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(batch.lastUpdated) }) })] }));
}
