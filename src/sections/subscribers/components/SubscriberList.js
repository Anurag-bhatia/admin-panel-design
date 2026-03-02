import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { AddSubscriberModal } from './AddSubscriberModal';
import { BulkUploadModal } from './BulkUploadModal';
// Icons
const SearchIcon = () => (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }));
const PlusIcon = () => (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }));
const UploadIcon = () => (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }));
const DotsVerticalIcon = () => (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" }) }));
const TruckIcon = () => (_jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" })] }));
// Status badge component
function StatusBadge({ status }) {
    const styles = {
        active: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
        inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    };
    return (_jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`, children: status === 'active' ? 'Active' : 'Inactive' }));
}
// Actions menu component
function ActionsMenu({ subscriberId, onViewDetails, onEdit, }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);
    const handleViewDetails = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onViewDetails) {
            onViewDetails(subscriberId);
        }
        setIsOpen(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) {
            onEdit(subscriberId);
        }
        setIsOpen(false);
    };
    return (_jsxs("div", { className: "relative", ref: menuRef, children: [_jsx("button", { onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }, className: "p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors", children: _jsx(DotsVerticalIcon, {}) }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 py-1", children: [_jsxs("button", { onClick: handleViewDetails, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }), "View Details"] }), _jsxs("button", { onClick: handleEdit, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Edit"] })] }))] }));
}
// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
export function SubscriberList({ subscribers, subscriptions, users, partners, subscriberSources, subscriberTypes, subscriberSubTypes, planTypes, onViewDetails, onEdit, onAddSubscriber, onBulkUpload, onSearch, onFilter, }) {
    // Console log to verify updated version is loaded
    console.log('🔄 Updated SubscriberList v3.0 loaded - Full-screen detail page navigation (no modal)');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [ownerFilter, setOwnerFilter] = useState('');
    const [planTypeFilter, setPlanTypeFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
    const [notification, setNotification] = useState(null);
    // Create subscription lookup map
    const subscriptionMap = useMemo(() => {
        const map = new Map();
        subscriptions.forEach((sub) => map.set(sub.subscriberId, sub));
        return map;
    }, [subscriptions]);
    // Create user lookup map
    const userMap = useMemo(() => {
        const map = new Map();
        users.forEach((user) => map.set(user.id, user));
        return map;
    }, [users]);
    // Filter subscribers
    const filteredSubscribers = useMemo(() => {
        return subscribers.filter((sub) => {
            const subscription = subscriptionMap.get(sub.id);
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch = sub.subscriberName.toLowerCase().includes(query) ||
                    sub.id.toLowerCase().includes(query) ||
                    sub.gstNumber.toLowerCase().includes(query) ||
                    sub.contactPerson.toLowerCase().includes(query) ||
                    sub.emailId.toLowerCase().includes(query);
                if (!matchesSearch)
                    return false;
            }
            // Status filter
            if (statusFilter && sub.status !== statusFilter)
                return false;
            // Source filter
            if (sourceFilter && sub.source !== sourceFilter)
                return false;
            // Owner filter
            if (ownerFilter && sub.assignedOwner !== ownerFilter)
                return false;
            // Plan type filter
            if (planTypeFilter && subscription?.planType !== planTypeFilter)
                return false;
            // Location filter
            if (locationFilter && !sub.state.toLowerCase().includes(locationFilter.toLowerCase()))
                return false;
            return true;
        });
    }, [subscribers, subscriptionMap, searchQuery, statusFilter, sourceFilter, ownerFilter, planTypeFilter, locationFilter]);
    // Active filter count
    const activeFilterCount = [statusFilter, sourceFilter, ownerFilter, planTypeFilter, locationFilter].filter(Boolean).length;
    // Clear all filters
    const clearFilters = () => {
        setStatusFilter('');
        setSourceFilter('');
        setOwnerFilter('');
        setPlanTypeFilter('');
        setLocationFilter('');
        setSearchQuery('');
    };
    // Modal handlers
    const handleAddSubscriber = (data) => {
        console.log('Adding subscriber:', data);
        setShowAddModal(false);
        showNotification('Subscriber added successfully!');
        if (onAddSubscriber)
            onAddSubscriber();
    };
    const handleBulkUpload = (file) => {
        console.log('Uploading file:', file.name);
        setShowBulkUploadModal(false);
        showNotification(`Processing ${file.name}...`);
        if (onBulkUpload)
            onBulkUpload();
    };
    const handleDownloadTemplate = () => {
        console.log('Downloading template');
        showNotification('Template downloaded');
    };
    const handleViewDetails = (id) => {
        if (onViewDetails)
            onViewDetails(id);
    };
    const handleEdit = (id) => {
        console.log('Editing subscriber:', id);
        showNotification('Edit functionality coming soon');
        if (onEdit)
            onEdit(id);
    };
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsxs("div", { className: "max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8", children: [_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Subscribers" }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { onClick: () => setShowBulkUploadModal(true), className: "inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm", children: [_jsx(UploadIcon, {}), _jsx("span", { className: "hidden sm:inline", children: "Bulk Upload" })] }), _jsxs("button", { onClick: () => setShowAddModal(true), className: "inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors shadow-sm", children: [_jsx(PlusIcon, {}), _jsx("span", { children: "Add Subscriber" })] })] })] }) }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by name, ID, GST, or contact...", value: searchQuery, onChange: (e) => {
                                                    setSearchQuery(e.target.value);
                                                    onSearch?.(e.target.value);
                                                }, className: "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600" })] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${showFilters
                                            ? 'bg-cyan-600 text-white'
                                            : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { className: "hidden sm:inline", children: "Filters" })] })] }), showFilters && (_jsxs("div", { className: "mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Status" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Source" }), _jsxs("select", { value: sourceFilter, onChange: (e) => setSourceFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Sources" }), subscriberSources.map((source) => (_jsx("option", { value: source, children: source }, source)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "SPOC" }), _jsxs("select", { value: ownerFilter, onChange: (e) => setOwnerFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All SPOCs" }), users.map((user) => (_jsx("option", { value: user.id, children: user.fullName }, user.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Location" }), _jsx("input", { type: "text", placeholder: "Filter by state...", value: locationFilter, onChange: (e) => setLocationFilter(e.target.value), className: "w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Plan Type" }), _jsxs("select", { value: planTypeFilter, onChange: (e) => setPlanTypeFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "All Plans" }), planTypes.map((plan) => (_jsx("option", { value: plan, children: plan }, plan)))] })] })] }), _jsx("div", { className: "mt-4 flex justify-end", children: _jsx("button", { onClick: clearFilters, className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200", children: "Clear all filters" }) })] }))] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "Subscriber" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "POC" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "SPOC" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "Subscription" }), _jsx("th", { className: "text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "Vehicles" }), _jsx("th", { className: "text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3", children: "Status" }), _jsx("th", { className: "text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3 w-16" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: filteredSubscribers.map((subscriber) => {
                                                const subscription = subscriptionMap.get(subscriber.id);
                                                const owner = userMap.get(subscriber.assignedOwner);
                                                return (_jsxs("tr", { onClick: () => handleViewDetails(subscriber.id), className: "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group", children: [_jsx("td", { className: "px-4 py-4", children: _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]", children: subscriber.subscriberName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: subscriber.id })] }) }), _jsxs("td", { className: "px-4 py-4", children: [_jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscriber.contactPerson }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: subscriber.phoneNumber })] }), _jsx("td", { className: "px-4 py-4", children: owner ? (_jsx("span", { className: "text-sm text-slate-900 dark:text-white", children: owner.fullName })) : (_jsx("span", { className: "text-sm text-slate-400", children: "Unassigned" })) }), _jsx("td", { className: "px-4 py-4", children: subscription ? (_jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscription.subscriptionName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: [subscription.planType, " \u00B7 ", formatDate(subscription.startDate), " - ", formatDate(subscription.endDate)] })] })) : (_jsx("span", { className: "text-sm text-slate-400", children: "No subscription" })) }), _jsx("td", { className: "px-4 py-4 text-right", children: _jsxs("div", { className: "inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300", children: [_jsx(TruckIcon, {}), _jsx("span", { className: "font-medium", children: subscriber.numberOfTrucks })] }) }), _jsx("td", { className: "px-4 py-4 text-center", children: _jsx(StatusBadge, { status: subscriber.status }) }), _jsx("td", { className: "px-4 py-4 text-right", onClick: (e) => e.stopPropagation(), children: _jsx(ActionsMenu, { subscriberId: subscriber.id, onViewDetails: handleViewDetails, onEdit: handleEdit }) })] }, subscriber.id));
                                            }) })] }) }), filteredSubscribers.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }) }), _jsx("h3", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: "No subscribers found" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: searchQuery || activeFilterCount > 0
                                            ? 'Try adjusting your search or filters'
                                            : 'Get started by adding your first subscriber' }), searchQuery || activeFilterCount > 0 ? (_jsx("button", { onClick: clearFilters, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors", children: "Clear all filters" })) : (_jsxs("button", { onClick: () => setShowAddModal(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors", children: [_jsx(PlusIcon, {}), "Add Subscriber"] }))] }))] }), filteredSubscribers.length > 0 && (_jsx("div", { className: "mt-4 text-center", children: _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["Showing ", filteredSubscribers.length, " subscriber", filteredSubscribers.length !== 1 ? 's' : '', activeFilterCount > 0 && ` (filtered from ${subscribers.length})`] }) }))] }), showAddModal && (_jsx(AddSubscriberModal, { users: users, partners: partners, subscriberSources: subscriberSources, subscriberTypes: subscriberTypes, subscriberSubTypes: subscriberSubTypes, onSubmit: handleAddSubscriber, onClose: () => setShowAddModal(false) })), showBulkUploadModal && (_jsx(BulkUploadModal, { onUpload: handleBulkUpload, onDownloadTemplate: handleDownloadTemplate, onClose: () => setShowBulkUploadModal(false) })), notification && (_jsx("div", { className: "fixed top-4 right-4 z-50 animate-fade-in", children: _jsxs("div", { className: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3", children: [_jsx("svg", { className: "w-5 h-5 text-emerald-400 dark:text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-sm font-medium", children: notification })] }) }))] }));
}
