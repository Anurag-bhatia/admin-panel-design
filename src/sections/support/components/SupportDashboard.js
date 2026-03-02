import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SubmissionDetailsModal } from './SubmissionDetailsModal';
// Typography: Geist for headings/body, Geist Mono for mono
// Colors: cyan (primary), zinc (secondary), slate (neutral)
export function SupportDashboard({ submissions, onView, onConvertToLead, onConvertToDispute, onConvertToPartnership }) {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sourceFilter, setSourceFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('type');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    // Extract unique sources and types from submissions
    const uniqueSources = Array.from(new Set(submissions.map(s => s.source)));
    const uniqueTypes = Array.from(new Set(submissions.map(s => s.type)));
    // Filter submissions
    const filteredSubmissions = submissions.filter(submission => {
        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = submission.subject.toLowerCase().includes(query) ||
                submission.message.toLowerCase().includes(query) ||
                (submission.contactName && submission.contactName.toLowerCase().includes(query)) ||
                (submission.contactEmail && submission.contactEmail.toLowerCase().includes(query));
            if (!matchesSearch)
                return false;
        }
        // Apply filters
        const matchesSource = sourceFilter === 'all' || submission.source === sourceFilter;
        const matchesType = typeFilter === 'all' || submission.type === typeFilter;
        return matchesSource && matchesType;
    });
    // Sort submissions
    const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
        if (sortBy === 'type') {
            return a.type.localeCompare(b.type);
        }
        else {
            return a.source.localeCompare(b.source);
        }
    });
    const handleRowClick = (submission, e) => {
        // Don't open modal if clicking on dropdown or buttons
        if (e.target.closest('[data-dropdown]')) {
            return;
        }
        setSelectedSubmission(submission);
        onView?.(submission.id);
    };
    const handleConvert = (submissionId, type) => {
        setOpenDropdownId(null);
        if (type === 'lead') {
            onConvertToLead?.(submissionId);
        }
        else if (type === 'dispute') {
            onConvertToDispute?.(submissionId);
        }
        else if (type === 'partnership') {
            onConvertToPartnership?.(submissionId);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };
    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'query':
                return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200';
            case 'complaint':
                return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
            case 'support request':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200';
            case 'business inquiry':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200';
            default:
                return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsxs("div", { className: "max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8", children: [_jsx("div", { className: "mb-6 lg:mb-8", children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Support Intake" }) }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by subject, contact name, or message...", value: searchQuery, onChange: e => setSearchQuery(e.target.value), className: "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600" })] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${showFilters
                                            ? 'bg-cyan-600 text-white'
                                            : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { className: "hidden sm:inline", children: "Filters" })] })] }), showFilters && (_jsx("div", { className: "mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Source" }), _jsxs("select", { value: sourceFilter, onChange: e => setSourceFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "all", children: "All Sources" }), uniqueSources.map(source => (_jsx("option", { value: source, children: source }, source)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Type" }), _jsxs("select", { value: typeFilter, onChange: e => setTypeFilter(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "all", children: "All Types" }), uniqueTypes.map(type => (_jsx("option", { value: type, children: type }, type)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Sort by" }), _jsxs("select", { value: sortBy, onChange: e => setSortBy(e.target.value), className: "w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "type", children: "Type" }), _jsx("option", { value: "source", children: "Source" })] })] })] }) }))] }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden", children: sortedSubmissions.length === 0 ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4", children: _jsx("svg", { className: "w-8 h-8 text-slate-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-1", children: "No submissions found" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Try adjusting your filters to see more results." })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700", children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider", children: "Subject" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden sm:table-cell", children: "Source" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden md:table-cell", children: "Submitted" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider", children: "Type" }), _jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: sortedSubmissions.map((submission) => (_jsxs("tr", { onClick: (e) => handleRowClick(submission, e), className: "group hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "max-w-md", children: [_jsx("p", { className: "font-medium text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1", children: submission.subject }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1", children: submission.contactName || 'Anonymous' })] }) }), _jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: submission.source }) }), _jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: formatDate(submission.submittedAt) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${getTypeBadgeColor(submission.type)}`, children: submission.type }) }), _jsx("td", { className: "px-4 py-3 text-right", "data-dropdown": true, children: _jsxs("div", { className: "relative inline-block", children: [_jsxs("button", { onClick: (e) => {
                                                                    e.stopPropagation();
                                                                    setOpenDropdownId(openDropdownId === submission.id ? null : submission.id);
                                                                }, className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm", children: ["Convert", _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), openDropdownId === submission.id && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: (e) => {
                                                                            e.stopPropagation();
                                                                            setOpenDropdownId(null);
                                                                        } }), _jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-20", children: [_jsxs("button", { onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    handleConvert(submission.id, 'lead');
                                                                                }, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-3", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }), "Convert to Lead"] }), _jsxs("button", { onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    handleConvert(submission.id, 'dispute');
                                                                                }, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-3", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }), "Convert to Dispute"] }), _jsxs("button", { onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    handleConvert(submission.id, 'partnership');
                                                                                }, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors flex items-center gap-3", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }), "Convert to Partnership"] })] })] }))] }) })] }, submission.id))) })] }) })) }), _jsx("div", { className: "mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400", children: _jsxs("p", { children: ["Showing ", _jsx("span", { className: "font-medium text-slate-900 dark:text-slate-100", children: sortedSubmissions.length }), ' ', "submission", sortedSubmissions.length !== 1 ? 's' : ''] }) })] }), selectedSubmission && (_jsx(SubmissionDetailsModal, { submission: selectedSubmission, onClose: () => setSelectedSubmission(null), onConvertToLead: onConvertToLead, onConvertToDispute: onConvertToDispute, onConvertToPartnership: onConvertToPartnership }))] }));
}
