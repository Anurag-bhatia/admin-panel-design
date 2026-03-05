import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Download, Filter, X, ChevronDown, Upload, FileSpreadsheet, } from 'lucide-react';
const INDIAN_STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];
export function IncidentsTableHeader({ users, lawyers, sources, searchQuery, onSearchChange, onAddChallan, onBulkUpdate, onExport, onFilter, }) {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});
    const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const addIncidentRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (addIncidentRef.current && !addIncidentRef.current.contains(e.target)) {
                setShowAddMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileSelect = (file) => {
        const validTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
        ];
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
        if (validTypes.includes(file.type) || hasValidExtension) {
            setSelectedFile(file);
        }
        else {
            alert('Please upload an Excel (.xlsx, .xls) or CSV (.csv) file');
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file)
            handleFileSelect(file);
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file)
            handleFileSelect(file);
    };
    const handleUpload = () => {
        if (selectedFile) {
            onBulkUpdate?.();
            setShowBulkUpdateModal(false);
            setSelectedFile(null);
        }
    };
    const closeBulkUpdateModal = () => {
        setShowBulkUpdateModal(false);
        setSelectedFile(null);
    };
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value || undefined };
        setFilters(newFilters);
        onFilter?.(newFilters);
    };
    const clearFilters = () => {
        setFilters({});
        onFilter?.({});
    };
    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 px-4 py-3", children: [_jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by Incident ID, subscriber, vehicle...", value: searchQuery, onChange: (e) => onSearchChange(e.target.value), className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => setShowBulkUpdateModal(true), className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), _jsx("span", { children: "Bulk Update" })] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${showFilters || hasActiveFilters
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsx(Filter, { className: "h-4 w-4" }), _jsx("span", { children: "Filters" }), hasActiveFilters && (_jsx("span", { className: "flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-xs", children: Object.values(filters).filter((v) => v !== undefined).length }))] }), _jsxs("button", { onClick: onExport, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { children: "Export" })] }), _jsxs("div", { className: "relative", ref: addIncidentRef, children: [_jsxs("button", { onClick: () => setShowAddMenu(!showAddMenu), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { children: "Add Incident" }), _jsx(ChevronDown, { className: `h-3.5 w-3.5 transition-transform ${showAddMenu ? 'rotate-180' : ''}` })] }), showAddMenu && (_jsx("div", { className: "absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-30 py-1", children: _jsx("button", { onClick: () => { onAddChallan?.(); setShowAddMenu(false); }, className: "w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Challan" }) }))] })] })] }), showFilters && (_jsx("div", { className: "px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Type" }), _jsxs("select", { value: filters.type || '', onChange: (e) => handleFilterChange('type', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "All Types" }), _jsx("option", { value: "payAndClose", children: "PPT" }), _jsx("option", { value: "contest", children: "Bulk" })] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Challan" }), _jsxs("select", { value: filters.challanType || '', onChange: (e) => handleFilterChange('challanType', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "All Types" }), _jsx("option", { value: "court", children: "Court" }), _jsx("option", { value: "online", children: "Online" })] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Source" }), _jsxs("select", { value: filters.source || '', onChange: (e) => handleFilterChange('source', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "All Sources" }), sources.map((source) => (_jsx("option", { value: source, children: source }, source)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "State" }), _jsxs("select", { value: filters.state || '', onChange: (e) => handleFilterChange('state', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white min-w-[160px]", children: [_jsx("option", { value: "", children: "All States" }), INDIAN_STATES.map((state) => (_jsx("option", { value: state, children: state }, state)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Assigned Agent" }), _jsxs("select", { value: filters.assignedAgentId || '', onChange: (e) => handleFilterChange('assignedAgentId', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white min-w-[160px]", children: [_jsx("option", { value: "", children: "All Agents" }), users.map((user) => (_jsx("option", { value: user.id, children: user.name }, user.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Assigned Lawyer" }), _jsxs("select", { value: filters.assignedLawyerId || '', onChange: (e) => handleFilterChange('assignedLawyerId', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white min-w-[180px]", children: [_jsx("option", { value: "", children: "All Lawyers" }), lawyers.map((lawyer) => (_jsx("option", { value: lawyer.id, children: lawyer.name }, lawyer.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "From Date" }), _jsx("input", { type: "date", value: filters.dateFrom || '', onChange: (e) => handleFilterChange('dateFrom', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "To Date" }), _jsx("input", { type: "date", value: filters.dateTo || '', onChange: (e) => handleFilterChange('dateTo', e.target.value), className: "px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] }), hasActiveFilters && (_jsxs("button", { onClick: clearFilters, className: "self-end inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors", children: [_jsx(X, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Clear" })] }))] }) })), showBulkUpdateModal && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Bulk Update" }), _jsx("button", { onClick: closeBulkUpdateModal, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: "Upload an Excel or CSV file to bulk update challans." }), _jsxs("button", { onClick: () => {
                                                // Create and download template
                                                const templateData = 'Challan Number,Type,Challan Type,State,Amount,Offence\nDL012024123456,payAndClose,court,Delhi,2500,Over Speeding';
                                                const blob = new Blob([templateData], { type: 'text/csv' });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = 'bulk_update_template.csv';
                                                a.click();
                                                URL.revokeObjectURL(url);
                                            }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Download, { className: "h-3.5 w-3.5" }), "Template"] })] }), _jsxs("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragging
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                        : selectedFile
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                            : 'border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx("input", { ref: fileInputRef, type: "file", accept: ".xlsx,.xls,.csv", onChange: handleFileInputChange, className: "hidden" }), selectedFile ? (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(FileSpreadsheet, { className: "h-10 w-10 text-emerald-500" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: selectedFile.name }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [(selectedFile.size / 1024).toFixed(1), " KB"] }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                    }, className: "text-xs text-red-600 dark:text-red-400 hover:underline", children: "Remove file" })] })) : (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Upload, { className: "h-10 w-10 text-slate-400" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Drop your file here or click to browse" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Supports Excel (.xlsx, .xls) and CSV (.csv) files" })] }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: closeBulkUpdateModal, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Upload & Update" })] })] }) }))] }));
}
