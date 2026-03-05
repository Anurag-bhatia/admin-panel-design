import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { X, CheckCircle, XCircle, MapPin, Filter, ChevronDown, Search } from 'lucide-react';
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
export function ScreenResultsView({ results, onClose, onConfirm }) {
    const [selectedChallans, setSelectedChallans] = useState(results.map((r) => r.challanNumber));
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        state: '',
        virtualStatus: '',
        disposed: '',
        documentImpound: '',
        vehicleImpound: '',
    });
    // Get unique values for filter options
    const filterOptions = useMemo(() => ({
        states: [...new Set(results.map(r => r.state))],
        virtualStatuses: [...new Set(results.map(r => r.virtualStatus))],
        documentImpounds: [...new Set(results.map(r => r.documentImpound))],
    }), [results]);
    // Apply search and filters
    const filteredResults = useMemo(() => {
        return results.filter(result => {
            // Apply search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch = result.violaterName.toLowerCase().includes(query) ||
                    result.challanNumber.toLowerCase().includes(query) ||
                    result.state.toLowerCase().includes(query) ||
                    result.offence.toLowerCase().includes(query) ||
                    result.place.toLowerCase().includes(query) ||
                    result.rtoName.toLowerCase().includes(query);
                if (!matchesSearch)
                    return false;
            }
            // Apply filters
            if (filters.state && result.state !== filters.state)
                return false;
            if (filters.virtualStatus && result.virtualStatus !== filters.virtualStatus)
                return false;
            if (filters.disposed === 'yes' && !result.disposed)
                return false;
            if (filters.disposed === 'no' && result.disposed)
                return false;
            if (filters.documentImpound && result.documentImpound !== filters.documentImpound)
                return false;
            if (filters.vehicleImpound === 'yes' && !result.vehicleImpound)
                return false;
            if (filters.vehicleImpound === 'no' && result.vehicleImpound)
                return false;
            return true;
        });
    }, [results, filters, searchQuery]);
    const disposedCount = results.filter((r) => r.disposed).length;
    const pendingCount = results.filter((r) => !r.disposed).length;
    const handleToggle = (challanNumber) => {
        setSelectedChallans((prev) => prev.includes(challanNumber)
            ? prev.filter((c) => c !== challanNumber)
            : [...prev, challanNumber]);
    };
    const handleToggleAll = () => {
        if (selectedChallans.length === filteredResults.length) {
            setSelectedChallans([]);
        }
        else {
            setSelectedChallans(filteredResults.map((r) => r.challanNumber));
        }
    };
    const handleConfirm = () => {
        onConfirm?.(selectedChallans);
    };
    const clearFilters = () => {
        setFilters({
            state: '',
            virtualStatus: '',
            disposed: '',
            documentImpound: '',
            vehicleImpound: '',
        });
    };
    const activeFilterCount = Object.values(filters).filter(Boolean).length;
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onClose, className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: "Screening Results" }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: [results.length, " ", results.length === 1 ? 'challan' : 'challans', " screened \u2022", ' ', selectedChallans.length, " selected"] })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-5 w-5 text-cyan-600 dark:text-cyan-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: results.length }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Total Screened" })] })] }) }), _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center", children: _jsx(XCircle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: disposedCount }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Already Disposed" })] })] }) }), _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: pendingCount }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Pending to Dispose" })] })] }) })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by name, challan number, state, offence...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white" }), searchQuery && (_jsx("button", { onClick: () => setSearchQuery(''), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300", children: _jsx(X, { className: "h-4 w-4" }) }))] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeFilterCount > 0
                                            ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "h-4 w-4" }), "Filters", activeFilterCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-cyan-600 text-white rounded-full", children: activeFilterCount })), _jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}` })] }), activeFilterCount > 0 && (_jsx("button", { onClick: clearFilters, className: "text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300", children: "Clear all" }))] }), showFilters && (_jsx("div", { className: "mt-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "State" }), _jsxs("select", { value: filters.state, onChange: (e) => setFilters({ ...filters, state: e.target.value }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All States" }), filterOptions.states.map(state => (_jsx("option", { value: state, children: state }, state)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Virtual Status" }), _jsxs("select", { value: filters.virtualStatus, onChange: (e) => setFilters({ ...filters, virtualStatus: e.target.value }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), filterOptions.virtualStatuses.map(vs => (_jsx("option", { value: vs, children: vs }, vs)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Disposed" }), _jsxs("select", { value: filters.disposed, onChange: (e) => setFilters({ ...filters, disposed: e.target.value }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "yes", children: "Yes" }), _jsx("option", { value: "no", children: "No" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Document Impound" }), _jsxs("select", { value: filters.documentImpound, onChange: (e) => setFilters({ ...filters, documentImpound: e.target.value }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), filterOptions.documentImpounds.map(di => (_jsx("option", { value: di, children: di }, di)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Vehicle Impound" }), _jsxs("select", { value: filters.vehicleImpound, onChange: (e) => setFilters({ ...filters, vehicleImpound: e.target.value }), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "yes", children: "Yes" }), _jsx("option", { value: "no", children: "No" })] })] })] }) }))] }), _jsx("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-3 py-3 text-left", children: _jsx("input", { type: "checkbox", checked: selectedChallans.length === filteredResults.length && filteredResults.length > 0, onChange: handleToggleAll, className: "w-4 h-4 text-cyan-600 bg-slate-100 border-slate-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:bg-slate-700 dark:border-slate-600" }) }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Violater Name" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Challan No." }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "State" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Date" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Offence" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Place" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "RTO" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Amount" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "V.Status" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "V.Amount" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Court" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Vehicle" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Doc Impound" }), _jsx("th", { className: "px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Disposed" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: filteredResults.map((result) => {
                                            const isSelected = selectedChallans.includes(result.challanNumber);
                                            return (_jsxs("tr", { className: `transition-colors ${isSelected
                                                    ? 'bg-cyan-50 dark:bg-cyan-900/10'
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`, children: [_jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: () => handleToggle(result.challanNumber), className: "w-4 h-4 text-cyan-600 bg-slate-100 border-slate-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:bg-slate-700 dark:border-slate-600" }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: result.violaterName }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm font-mono text-slate-900 dark:text-white", children: result.challanNumber }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: result.state })] }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: formatDate(result.challanDate) }) }), _jsx("td", { className: "px-3 py-3", children: _jsx("span", { className: "text-sm text-slate-900 dark:text-white max-w-[150px] truncate block", children: result.offence }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400 max-w-[120px] truncate block", children: result.place }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: result.rtoName }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: formatCurrency(result.amount) }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: result.virtualStatus }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: formatCurrency(result.virtualAmount) }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${result.status === 'Disposed'
                                                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                                                : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'}`, children: result.status }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: `text-xs ${result.physicalCourtStatus === 'None'
                                                                ? 'text-slate-400'
                                                                : 'text-purple-600 dark:text-purple-400 font-medium'}`, children: result.physicalCourtStatus }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: `text-xs font-medium ${result.vehicleImpound ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`, children: result.vehicleImpound ? 'Yes' : 'No' }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${result.documentImpound === 'None'
                                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`, children: result.documentImpound }) }), _jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: result.disposed ? (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", children: [_jsx(CheckCircle, { className: "h-3 w-3" }), "Yes"] })) : (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400", children: [_jsx(XCircle, { className: "h-3 w-3" }), "No"] })) })] }, result.challanNumber));
                                        }) })] }) }) }), _jsxs("div", { className: "flex justify-between items-center mt-6", children: [_jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: [filteredResults.length !== results.length && (_jsxs("span", { className: "mr-2", children: ["Showing ", filteredResults.length, " of ", results.length, " \u2022"] })), selectedChallans.length === 0 ? ('No challans selected') : (_jsxs(_Fragment, { children: [selectedChallans.length, " ", selectedChallans.length === 1 ? 'challan' : 'challans', ' ', "selected"] }))] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleConfirm, disabled: selectedChallans.length === 0, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Confirm and move to screen" })] })] })] })] }));
}
