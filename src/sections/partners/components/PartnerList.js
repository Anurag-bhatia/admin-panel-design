import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreVertical, Search, Filter, ChevronLeft, ChevronRight, X, UserPlus, ArrowUpDown, QrCode, Link } from 'lucide-react';
export function PartnerList({ partners, onView, onToggleStatus, partnerType, onBulkAssign, }) {
    const isChallanPay = partnerType === 'challanPay';
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [assignedToFilter, setAssignedToFilter] = useState('');
    const [utmSourceFilter, setUtmSourceFilter] = useState('');
    const [activeStatusFilter, setActiveStatusFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const itemsPerPage = 10;
    // Derive unique values for filter dropdowns
    const uniqueStates = [...new Set(partners.map(p => p.state))].sort();
    const uniqueAssignees = [...new Set(partners.map(p => p.assignedTo).filter(Boolean))].sort();
    const uniqueUtmSources = [...new Set(partners.map(p => p.utmSource).filter(Boolean))].sort();
    const activeFilterCount = [statusFilter, stateFilter, assignedToFilter, utmSourceFilter, activeStatusFilter].filter(Boolean).length;
    // Filter partners based on search and all filters
    let filtered = partners.filter(partner => {
        const matchesSearch = partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.lastName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStage = !statusFilter || (isChallanPay ? partner.stage === statusFilter : partner.status === statusFilter);
        const matchesState = !stateFilter || partner.state === stateFilter;
        const matchesAssignedTo = !assignedToFilter || (assignedToFilter === 'unassigned' ? !partner.assignedTo : partner.assignedTo === assignedToFilter);
        const matchesUtmSource = !utmSourceFilter || partner.utmSource === utmSourceFilter;
        const matchesActiveStatus = !activeStatusFilter || partner.status === activeStatusFilter;
        return matchesSearch && matchesStage && matchesState && matchesAssignedTo && matchesUtmSource && matchesActiveStatus;
    });
    // Sort
    if (sortField) {
        filtered.sort((a, b) => {
            let aVal = '';
            let bVal = '';
            switch (sortField) {
                case 'name':
                    aVal = a.companyName.toLowerCase();
                    bVal = b.companyName.toLowerCase();
                    break;
                case 'date':
                    aVal = new Date(a.dateOnboarded).getTime();
                    bVal = new Date(b.dateOnboarded).getTime();
                    break;
                case 'customers':
                    aVal = a.linkedSubscribers?.length || 0;
                    bVal = b.linkedSubscribers?.length || 0;
                    break;
                case 'outlets':
                    aVal = a.outlets || 0;
                    bVal = b.outlets || 0;
                    break;
                case 'visitors':
                    aVal = a.registeredVisitorsCount || 0;
                    bVal = b.registeredVisitorsCount || 0;
                    break;
            }
            if (aVal < bVal)
                return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal)
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
    // Pagination
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const paginatedPartners = filtered.slice(startIndex, startIndex + itemsPerPage);
    const startItem = totalItems === 0 ? 0 : startIndex + 1;
    const endItem = Math.min(startIndex + itemsPerPage, totalItems);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    // Selection helpers (challanPay only)
    const toggleSelect = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            return next;
        });
    };
    const toggleSelectAll = () => {
        const pageIds = paginatedPartners.map(p => p.id);
        const allSelected = pageIds.every(id => selectedIds.has(id));
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (allSelected) {
                pageIds.forEach(id => next.delete(id));
            }
            else {
                pageIds.forEach(id => next.add(id));
            }
            return next;
        });
    };
    const clearSelection = () => setSelectedIds(new Set());
    const pageAllSelected = paginatedPartners.length > 0 && paginatedPartners.every(p => selectedIds.has(p.id));
    const pageSomeSelected = paginatedPartners.some(p => selectedIds.has(p.id)) && !pageAllSelected;
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        }
        else {
            pages.push(1);
            if (safeCurrentPage > 3)
                pages.push('ellipsis');
            const start = Math.max(2, safeCurrentPage - 1);
            const end = Math.min(totalPages - 1, safeCurrentPage + 1);
            for (let i = start; i <= end; i++)
                pages.push(i);
            if (safeCurrentPage < totalPages - 2)
                pages.push('ellipsis');
            if (totalPages > 1)
                pages.push(totalPages);
        }
        return pages;
    };
    const StatusBadge = ({ status }) => {
        const isActive = status === 'active';
        return (_jsx("div", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isActive
                ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: isActive ? 'Active' : 'Inactive' }));
    };
    const StageBadge = ({ stage }) => {
        const styles = {
            registration: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
            verification: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
            activation: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            mobilisation: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
        };
        const labels = {
            registration: 'Registration',
            verification: 'Verification',
            activation: 'Activation',
            mobilisation: 'Mobilisation',
        };
        return (_jsx("div", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[stage]}`, children: labels[stage] }));
    };
    if (filtered.length === 0) {
        return (_jsx("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx("div", { className: "w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Search, { className: "w-6 h-6 sm:w-8 sm:h-8 text-slate-400" }) }), _jsx("h3", { className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "No partners found" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400", children: "Try adjusting your search or filters." })] }) }));
    }
    return (_jsxs("div", { children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by name, company, or contact...", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); setCurrentPage(1); }, className: "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600" })] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowSortMenu(!showSortMenu), className: `flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${sortField
                                            ? 'bg-cyan-600 text-white'
                                            : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(ArrowUpDown, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { className: "hidden sm:inline", children: "Sort" })] }), showSortMenu && (_jsxs("div", { className: "absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-30 py-1", children: [[
                                                { key: 'name', label: 'Partner Name (A to Z)', defaultDir: 'asc' },
                                                { key: 'date', label: 'Date Onboarded', defaultDir: 'asc' },
                                                { key: 'customers', label: 'Customers (High to Low)', defaultDir: 'desc' },
                                                { key: 'outlets', label: 'Outlets (High to Low)', defaultDir: 'desc' },
                                                { key: 'visitors', label: 'Registered Visitors (High to Low)', defaultDir: 'desc' },
                                            ].map((option) => (_jsxs("button", { onClick: () => {
                                                    if (sortField === option.key) {
                                                        if (sortDirection === option.defaultDir)
                                                            setSortDirection(option.defaultDir === 'asc' ? 'desc' : 'asc');
                                                        else {
                                                            setSortField('');
                                                            setSortDirection('asc');
                                                        }
                                                    }
                                                    else {
                                                        setSortField(option.key);
                                                        setSortDirection(option.defaultDir);
                                                    }
                                                    setShowSortMenu(false);
                                                    setCurrentPage(1);
                                                }, className: `w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${sortField === option.key
                                                    ? 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [option.label, sortField === option.key && (_jsx("span", { className: "text-xs text-cyan-500", children: sortDirection === 'asc' ? '↑' : '↓' }))] }, option.key))), sortField && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-t border-slate-100 dark:border-slate-800 my-1" }), _jsx("button", { onClick: () => { setSortField(''); setSortDirection('asc'); setShowSortMenu(false); }, className: "w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors", children: "Clear Sort" })] }))] }))] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${showFilters
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { className: "hidden sm:inline", children: "Filters" }), activeFilterCount > 0 && (_jsx("span", { className: "w-5 h-5 flex items-center justify-center bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-200 rounded-full text-xs font-bold", children: activeFilterCount }))] })] }), showFilters && (_jsxs("div", { className: "mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: isChallanPay ? 'Stage' : 'Status' }), _jsx("select", { value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); setCurrentPage(1); }, className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: isChallanPay ? (_jsxs(_Fragment, { children: [_jsx("option", { value: "", children: "All Stages" }), _jsx("option", { value: "registration", children: "Registration" }), _jsx("option", { value: "verification", children: "Verification" }), _jsx("option", { value: "activation", children: "Activation" }), _jsx("option", { value: "mobilisation", children: "Mobilisation" })] })) : (_jsxs(_Fragment, { children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "State" }), _jsxs("select", { value: stateFilter, onChange: (e) => { setStateFilter(e.target.value); setCurrentPage(1); }, className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All States" }), uniqueStates.map(state => (_jsx("option", { value: state, children: state }, state)))] })] }), isChallanPay && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Assigned To" }), _jsxs("select", { value: assignedToFilter, onChange: (e) => { setAssignedToFilter(e.target.value); setCurrentPage(1); }, className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Agents" }), _jsx("option", { value: "unassigned", children: "Unassigned" }), uniqueAssignees.map(name => (_jsx("option", { value: name, children: name }, name)))] })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "UTM Source" }), _jsxs("select", { value: utmSourceFilter, onChange: (e) => { setUtmSourceFilter(e.target.value); setCurrentPage(1); }, className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Sources" }), uniqueUtmSources.map(source => (_jsx("option", { value: source, children: source }, source)))] })] }), isChallanPay && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Status" }), _jsxs("select", { value: activeStatusFilter, onChange: (e) => { setActiveStatusFilter(e.target.value); setCurrentPage(1); }, className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] }))] }), _jsx("div", { className: "mt-4 flex justify-end", children: _jsx("button", { onClick: () => {
                                        setStatusFilter('');
                                        setStateFilter('');
                                        setAssignedToFilter('');
                                        setUtmSourceFilter('');
                                        setActiveStatusFilter('');
                                        setCurrentPage(1);
                                    }, className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200", children: "Clear all filters" }) })] }))] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden", children: [_jsx("div", { className: "hidden lg:block overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", children: [isChallanPay && (_jsx("th", { className: "w-12 px-4 py-3", children: _jsx("input", { type: "checkbox", checked: pageAllSelected, ref: el => { if (el)
                                                        el.indeterminate = pageSomeSelected; }, onChange: toggleSelectAll, className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer" }) })), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Onboarding Date" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Partner" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Partner ID" }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Assigned To" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: isChallanPay ? 'Stage' : 'Status' }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Status" }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Profile Verification" }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Activity" }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Registered Visitors" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: isChallanPay ? 'Customers' : 'Subscribers' }), isChallanPay && _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Outlets" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: paginatedPartners.map((partner) => (_jsxs("tr", { className: `hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${isChallanPay && selectedIds.has(partner.id) ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`, children: [isChallanPay && (_jsx("td", { className: "w-12 px-4 py-4", onClick: e => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: selectedIds.has(partner.id), onChange: () => toggleSelect(partner.id), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer" }) })), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: new Date(partner.dateOnboarded).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }) }), _jsx("td", { className: "px-6 py-4 cursor-pointer", onClick: () => onView?.(partner.id), children: _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-900 dark:text-white", children: partner.companyName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: partner.utmSource || '—' })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm font-mono text-cyan-600 dark:text-cyan-400", children: partner.partnerId }) }), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: partner.assignedTo ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 flex items-center justify-center text-xs font-medium", children: partner.assignedTo.charAt(0) }), _jsx("span", { className: "text-sm text-slate-900 dark:text-white", children: partner.assignedTo })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "Unassigned" })) })), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: isChallanPay && partner.stage ? _jsx(StageBadge, { stage: partner.stage }) : _jsx(StatusBadge, { status: partner.status }) }), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx(StatusBadge, { status: partner.status }) })), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: (() => {
                                                    const completion = partner.profileCompletion ?? 0;
                                                    const isVerified = completion >= 100;
                                                    return (_jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isVerified
                                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                                            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`, children: isVerified ? 'Verified' : `Unverified ${completion}%` }));
                                                })() })), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: partner.stage === 'verification' && partner.verificationActivity
                                                        ? { emailVerification: 'Email Verification', profileVerification: 'Profile Verification' }[partner.verificationActivity]
                                                        : partner.stage === 'activation' && partner.activationActivity
                                                            ? { qrActivated: 'QR Activated', qrUnlocked: 'QR Unlocked', kitSend: 'Kit Send' }[partner.activationActivity]
                                                            : '—' }) })), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: partner.registeredVisitorsCount ?? '—' }) })), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: partner.linkedSubscribers.length }) }), isChallanPay && (_jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onView?.(partner.id), children: _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: partner.outlets ?? '—' }) })), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", onClick: e => e.stopPropagation(), children: _jsxs("div", { className: "relative inline-block", children: [_jsx("button", { onClick: () => setOpenActionMenu(openActionMenu === partner.id ? null : partner.id), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors", children: _jsx(MoreVertical, { className: "w-5 h-5 text-slate-400" }) }), openActionMenu === partner.id && (_jsx("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10", children: _jsxs("div", { className: "py-1", children: [_jsx("button", { onClick: () => {
                                                                            onView?.(partner.id);
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: "View/Edit Details" }), _jsxs("button", { onClick: () => {
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(QrCode, { className: "w-4 h-4" }), "View QR"] }), _jsxs("button", { onClick: () => {
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(Link, { className: "w-4 h-4" }), "Copy QR Link"] }), _jsx("button", { onClick: () => {
                                                                            onToggleStatus?.(partner.id, partner.status === 'active' ? 'inactive' : 'active');
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: partner.status === 'active' ? 'Deactivate' : 'Activate' })] }) }))] }) })] }, partner.id))) })] }) }), _jsx("div", { className: "lg:hidden divide-y divide-slate-200 dark:divide-slate-800", children: paginatedPartners.map(partner => (_jsx("div", { className: `p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${isChallanPay && selectedIds.has(partner.id) ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [isChallanPay && (_jsx("input", { type: "checkbox", checked: selectedIds.has(partner.id), onChange: () => toggleSelect(partner.id), className: "mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer shrink-0" })), _jsxs("div", { className: "flex-1 min-w-0", onClick: () => onView?.(partner.id), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: new Date(partner.dateOnboarded).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }), _jsx("div", { className: "text-sm sm:text-base font-semibold text-slate-900 dark:text-white", children: partner.companyName }), _jsx("div", { className: "text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400", children: partner.partnerId })] }), isChallanPay && partner.stage ? _jsx(StageBadge, { stage: partner.stage }) : _jsx(StatusBadge, { status: partner.status })] }), _jsxs("div", { className: "space-y-2 text-xs sm:text-sm", children: [isChallanPay && (_jsx("div", { className: "text-slate-600 dark:text-slate-400", children: partner.assignedTo || 'Unassigned' })), isChallanPay && (_jsx("div", { className: "text-slate-600 dark:text-slate-400", children: partner.stage === 'verification' && partner.verificationActivity
                                                            ? { emailVerification: 'Email Verification', profileVerification: 'Profile Verification' }[partner.verificationActivity]
                                                            : partner.stage === 'activation' && partner.activationActivity
                                                                ? { qrActivated: 'QR Activated', qrUnlocked: 'QR Unlocked', kitSend: 'Kit Send' }[partner.activationActivity]
                                                                : '—' })), _jsxs("div", { className: "flex flex-wrap gap-4 text-slate-600 dark:text-slate-400", children: [isChallanPay && _jsxs("span", { children: [partner.registeredVisitorsCount ?? 0, " visitors"] }), _jsxs("span", { children: [partner.linkedSubscribers.length, " ", isChallanPay ? 'customers' : 'subscribers'] }), isChallanPay && _jsxs("span", { children: [partner.outlets ?? 0, " outlets"] })] })] })] })] }) }, partner.id))) }), totalItems > 0 && (_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400", children: ["Showing", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: startItem }), ' ', "to", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: endItem }), ' ', "of", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: totalItems }), ' ', "results"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => handlePageChange(safeCurrentPage - 1), disabled: safeCurrentPage === 1, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${safeCurrentPage === 1
                                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), getPageNumbers().map((page, index) => page === 'ellipsis' ? (_jsx("span", { className: "w-8 h-8 flex items-center justify-center text-slate-400", children: "..." }, `ellipsis-${index}`)) : (_jsx("button", { onClick: () => handlePageChange(page), className: `inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${page === safeCurrentPage
                                            ? 'bg-cyan-500 text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: page }, page))), _jsx("button", { onClick: () => handlePageChange(safeCurrentPage + 1), disabled: safeCurrentPage === totalPages, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${safeCurrentPage === totalPages
                                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] }))] }), isChallanPay && selectedIds.size > 0 && (_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedIds.size }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: clearSelection, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsx("div", { className: "flex items-center gap-1", children: _jsxs("button", { onClick: () => onBulkAssign?.(Array.from(selectedIds)), className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: "Assign" })] }) })] }) }))] }));
}
