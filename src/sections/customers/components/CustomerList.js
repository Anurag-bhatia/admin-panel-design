import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { CustomerListHeader } from './CustomerListHeader';
import { CustomerTable } from './CustomerTable';
export function CustomerList({ customers, onSearch, onViewCustomer, onAddCustomer, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(new Set());
    const [filters, setFilters] = useState({
        paymentStatus: '',
        vehicleCount: '',
    });
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedCustomers(new Set(filteredCustomers.map(c => c.id)));
        }
        else {
            setSelectedCustomers(new Set());
        }
    };
    const handleSelectCustomer = (customerId, checked) => {
        const newSelected = new Set(selectedCustomers);
        if (checked) {
            newSelected.add(customerId);
        }
        else {
            newSelected.delete(customerId);
        }
        setSelectedCustomers(newSelected);
    };
    // Filter customers
    const filteredCustomers = useMemo(() => {
        let filtered = customers;
        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c => c.name.toLowerCase().includes(query) ||
                c.customerId.toLowerCase().includes(query) ||
                c.mobile.includes(query) ||
                c.email.toLowerCase().includes(query));
        }
        // Apply filters
        if (filters.paymentStatus) {
            filtered = filtered.filter(c => c.paymentStatus === filters.paymentStatus);
        }
        if (filters.vehicleCount) {
            if (filters.vehicleCount === '0') {
                filtered = filtered.filter(c => c.totalVehicles === 0);
            }
            else if (filters.vehicleCount === '1-2') {
                filtered = filtered.filter(c => c.totalVehicles >= 1 && c.totalVehicles <= 2);
            }
            else if (filters.vehicleCount === '3+') {
                filtered = filtered.filter(c => c.totalVehicles >= 3);
            }
        }
        return filtered;
    }, [customers, searchQuery, filters]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "min-h-full bg-slate-50 dark:bg-slate-950", children: _jsxs("div", { className: "max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8", children: [_jsx("div", { className: "mb-6", children: _jsx(CustomerListHeader, { onAddCustomer: onAddCustomer }) }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by name, ID, or mobile...", value: searchQuery, onChange: handleSearchChange, className: "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600" })] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${showFilters
                                                ? 'bg-cyan-600 text-white'
                                                : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { className: "hidden sm:inline", children: "Filters" })] })] }), showFilters && (_jsx("div", { className: "mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Payment Status" }), _jsxs("select", { value: filters.paymentStatus, onChange: e => setFilters({ ...filters, paymentStatus: e.target.value }), className: "w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "paid", children: "Paid" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "overdue", children: "Overdue" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Vehicle Count" }), _jsxs("select", { value: filters.vehicleCount, onChange: e => setFilters({ ...filters, vehicleCount: e.target.value }), className: "w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "0", children: "No vehicles" }), _jsx("option", { value: "1-2", children: "1-2 vehicles" }), _jsx("option", { value: "3+", children: "3+ vehicles" })] })] }), _jsx("div", { className: "flex items-end", children: _jsx("button", { onClick: () => setFilters({ paymentStatus: '', vehicleCount: '' }), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors", children: "Clear Filters" }) })] }) }))] }), _jsx(CustomerTable, { customers: filteredCustomers, selectedCustomers: selectedCustomers, onSelectAll: handleSelectAll, onSelectCustomer: handleSelectCustomer, onViewCustomer: onViewCustomer }), _jsxs("div", { className: "mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400", children: [_jsxs("p", { children: ["Showing ", _jsx("span", { className: "font-medium text-slate-900 dark:text-slate-100", children: filteredCustomers.length }), ' ', "visitor", filteredCustomers.length !== 1 ? 's' : ''] }), selectedCustomers.size > 0 && (_jsxs("p", { children: [_jsx("span", { className: "font-medium text-slate-900 dark:text-slate-100", children: selectedCustomers.size }), " selected"] }))] })] }) })] }));
}
