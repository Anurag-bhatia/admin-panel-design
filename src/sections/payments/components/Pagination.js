import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, }) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push('ellipsis');
            }
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        return pages;
    };
    return (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: [_jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Showing", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: startItem }), ' ', "to", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: endItem }), ' ', "of", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: totalItems }), ' ', "results"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => onPageChange?.(currentPage - 1), disabled: currentPage === 1, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${currentPage === 1
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), getPageNumbers().map((page, index) => page === 'ellipsis' ? (_jsx("span", { className: "w-8 h-8 flex items-center justify-center text-slate-400", children: "..." }, `ellipsis-${index}`)) : (_jsx("button", { onClick: () => onPageChange?.(page), className: `inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${page === currentPage
                            ? 'bg-cyan-500 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: page }, page))), _jsx("button", { onClick: () => onPageChange?.(currentPage + 1), disabled: currentPage === totalPages, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${currentPage === totalPages
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] }));
}
