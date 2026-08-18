import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
const ITEMS_PER_PAGE = 8;
export function SettledChallansDashboard({ settledChallans, onSearch, onFilter, onExport, onPageChange, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});
    // Derive unique values for filter dropdowns
    const subscribers = useMemo(() => [...new Set(settledChallans.map((c) => c.subscriber))].sort(), [settledChallans]);
    const states = useMemo(() => [...new Set(settledChallans.map((c) => c.state))].sort(), [settledChallans]);
    // Client-side filtering for demo
    const filteredChallans = useMemo(() => {
        let result = settledChallans;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter((c) => c.vehicleNo.toLowerCase().includes(q) ||
                c.subscriber.toLowerCase().includes(q) ||
                c.challanNo.toLowerCase().includes(q) ||
                c.offenceName.toLowerCase().includes(q));
        }
        if (filters.subscriber) {
            result = result.filter((c) => c.subscriber === filters.subscriber);
        }
        if (filters.state) {
            result = result.filter((c) => c.state === filters.state);
        }
        if (filters.dateFrom) {
            result = result.filter((c) => c.settledDate >= filters.dateFrom);
        }
        if (filters.dateTo) {
            result = result.filter((c) => c.settledDate <= filters.dateTo);
        }
        if (filters.amountMin !== undefined) {
            result = result.filter((c) => c.amount >= filters.amountMin);
        }
        if (filters.amountMax !== undefined) {
            result = result.filter((c) => c.amount <= filters.amountMax);
        }
        return result;
    }, [settledChallans, searchQuery, filters]);
    const totalPages = Math.max(1, Math.ceil(filteredChallans.length / ITEMS_PER_PAGE));
    const paginatedChallans = filteredChallans.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const activeFilterCount = Object.values(filters).filter((v) => v !== undefined && v !== '').length;
    function handleSearch(query) {
        setSearchQuery(query);
        setCurrentPage(1);
        onSearch?.(query);
    }
    function handleFilterChange(newFilters) {
        setFilters(newFilters);
        setCurrentPage(1);
        onFilter?.(newFilters);
    }
    function clearFilters() {
        setFilters({});
        setCurrentPage(1);
        onFilter?.({});
    }
    function handlePageChange(page) {
        setCurrentPage(page);
        onPageChange?.(page);
    }
    function formatAmount(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }
    return (_jsxs("div", { className: "flex flex-col h-full bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "px-4 sm:px-6 pt-6 pb-4", children: _jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white tracking-tight", children: "Settled Challans" }), _jsxs("button", { onClick: () => onExport?.(), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Export" })] })] }) }), _jsxs("div", { className: "px-4 sm:px-6 pb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" }), _jsx("input", { type: "text", placeholder: "Search by vehicle, subscriber, challan no, offence...", value: searchQuery, onChange: (e) => handleSearch(e.target.value), className: "w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:ring-cyan-400/20 dark:focus:border-cyan-400 transition-colors" }), searchQuery && (_jsx("button", { onClick: () => handleSearch(''), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300", children: _jsx(X, { className: "w-4 h-4" }) }))] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded-lg border transition-colors ${showFilters || activeFilterCount > 0
                                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Filters" }), activeFilterCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white", children: activeFilterCount }))] })] }), showFilters && (_jsxs("div", { className: "mt-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "From Date" }), _jsx("input", { type: "date", value: filters.dateFrom || '', onChange: (e) => handleFilterChange({ ...filters, dateFrom: e.target.value || undefined }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "To Date" }), _jsx("input", { type: "date", value: filters.dateTo || '', onChange: (e) => handleFilterChange({ ...filters, dateTo: e.target.value || undefined }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Subscriber" }), _jsxs("select", { value: filters.subscriber || '', onChange: (e) => handleFilterChange({ ...filters, subscriber: e.target.value || undefined }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500", children: [_jsx("option", { value: "", children: "All Subscribers" }), subscribers.map((s) => (_jsx("option", { value: s, children: s }, s)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "State" }), _jsxs("select", { value: filters.state || '', onChange: (e) => handleFilterChange({ ...filters, state: e.target.value || undefined }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500", children: [_jsx("option", { value: "", children: "All States" }), states.map((s) => (_jsx("option", { value: s, children: s }, s)))] })] })] }), _jsxs("div", { className: "flex items-end gap-4 mt-4", children: [_jsxs("div", { className: "flex-1 grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Min Amount" }), _jsx("input", { type: "number", placeholder: "0", value: filters.amountMin ?? '', onChange: (e) => handleFilterChange({
                                                            ...filters,
                                                            amountMin: e.target.value ? Number(e.target.value) : undefined,
                                                        }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5", children: "Max Amount" }), _jsx("input", { type: "number", placeholder: "Any", value: filters.amountMax ?? '', onChange: (e) => handleFilterChange({
                                                            ...filters,
                                                            amountMax: e.target.value ? Number(e.target.value) : undefined,
                                                        }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] })] }), activeFilterCount > 0 && (_jsx("button", { onClick: clearFilters, className: "px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors whitespace-nowrap", children: "Clear All" }))] })] }))] }), _jsx("div", { className: "flex-1 px-4 sm:px-6 overflow-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: [_jsxs("div", { className: "hidden sm:grid sm:grid-cols-[1.2fr_1.5fr_1.2fr_2fr_1fr] gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700", children: [_jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Vehicle No" }), _jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Subscriber" }), _jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Challan No" }), _jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Offence Name" }), _jsx("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Amount" })] }), paginatedChallans.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx(Search, { className: "w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" }), _jsx("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "No settled challans found" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1", children: "Try adjusting your search or filters" })] })) : (paginatedChallans.map((challan, index) => (_jsx(ChallanRow, { challan: challan, formatAmount: formatAmount, isLast: index === paginatedChallans.length - 1 }, challan.id))))] }) }), filteredChallans.length > ITEMS_PER_PAGE && (_jsx("div", { className: "px-4 sm:px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Showing", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: (currentPage - 1) * ITEMS_PER_PAGE + 1 }), ' - ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: Math.min(currentPage * ITEMS_PER_PAGE, filteredChallans.length) }), ' of ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: filteredChallans.length })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1, className: "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => handlePageChange(page), className: `inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                        ? 'bg-cyan-600 text-white'
                                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: page }, page))), _jsx("button", { onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === totalPages, className: "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", children: _jsx(ChevronRight, { className: "w-4 h-4" }) })] })] }) }))] }));
}
// --- Row Sub-component ---
function ChallanRow({ challan, formatAmount, isLast, }) {
    return (_jsxs("div", { className: `grid grid-cols-1 sm:grid-cols-[1.2fr_1.5fr_1.2fr_2fr_1fr] gap-1 sm:gap-4 px-4 py-3.5 ${!isLast ? 'border-b border-slate-100 dark:border-slate-700/60' : ''} hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors`, children: [_jsxs("div", { className: "flex items-center gap-2 sm:gap-0", children: [_jsx("span", { className: "text-xs text-slate-400 sm:hidden w-20 shrink-0", children: "Vehicle" }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white font-mono tracking-wide", children: challan.vehicleNo })] }), _jsxs("div", { className: "flex items-start gap-2 sm:gap-0", children: [_jsx("span", { className: "text-xs text-slate-400 sm:hidden w-20 shrink-0 mt-0.5", children: "Subscriber" }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: challan.subscriber }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: challan.subscriberEmail }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: challan.subscriberPhone })] })] }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-0", children: [_jsx("span", { className: "text-xs text-slate-400 sm:hidden w-20 shrink-0", children: "Challan" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400 font-mono", children: challan.challanNo })] }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-0", children: [_jsx("span", { className: "text-xs text-slate-400 sm:hidden w-20 shrink-0", children: "Offence" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300 truncate", children: challan.offenceName })] }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-0", children: [_jsx("span", { className: "text-xs text-slate-400 sm:hidden w-20 shrink-0", children: "Amount" }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: formatAmount(challan.amount) })] })] }));
}
