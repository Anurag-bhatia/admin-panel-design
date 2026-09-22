import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { X, Upload, Download, AlertCircle, CheckCircle, Loader2, FilePlus2, Eye, EyeOff } from 'lucide-react';
const OVERALL_STATUS = [
    { label: 'Pending', vehicles: 6, challans: 317, amount: 512100 },
    { label: 'Disposed', vehicles: 5, challans: 10, amount: 7500 },
];
const STATE_PENDING_ONLINE = [
    { state: 'Delhi', vehicles: 6, challans: 55, amount: 105000 },
    { state: 'Rajasthan', vehicles: 3, challans: 12, amount: 20200 },
    { state: 'Uttarakhand', vehicles: 2, challans: 4, amount: 10000 },
    { state: 'Uttar Pradesh', vehicles: 1, challans: 1, amount: 2000 },
];
const STATE_PENDING_COURT = [
    { state: 'Delhi', vehicles: 5, challans: 15, amount: 85000 },
    { state: 'Haryana', vehicles: 4, challans: 9, amount: 33000 },
    { state: 'Maharashtra', vehicles: 3, challans: 7, amount: 42000 },
    { state: 'Karnataka', vehicles: 2, challans: 4, amount: 18000 },
];
const AMOUNT_PENDING_ONLINE = [
    { range: '0 – 999', vehicles: 2, challans: 6, amount: 1700 },
    { range: '1000 – 1999', vehicles: 3, challans: 7, amount: 7500 },
    { range: '2000 – 2999', vehicles: 6, challans: 53, amount: 106000 },
    { range: '3000 – 3999', vehicles: 1, challans: 5, amount: 15000 },
    { range: '7000 – 7999', vehicles: 1, challans: 1, amount: 7000 },
];
const AMOUNT_PENDING_COURT = [
    { range: '0 – 999', vehicles: 4, challans: 14, amount: 6600 },
    { range: '1000 – 1999', vehicles: 5, challans: 10, amount: 12000 },
    { range: '2000 – 2999', vehicles: 5, challans: 12, amount: 24000 },
    { range: '5000 – 5999', vehicles: 3, challans: 3, amount: 15000 },
    { range: '6000 – 6999', vehicles: 1, challans: 1, amount: 6000 },
    { range: '10000 – 10999', vehicles: 1, challans: 1, amount: 10000 },
    { range: '20000 – 29999', vehicles: 3, challans: 3, amount: 60000 },
];
const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;
const SUMMARY = {
    totalVehicles: 6,
    pendingAmount: 512100,
    pendingChallans: 317,
    oldestPendingSince: '12 Mar 2023',
};
const sumRow = (rows) => rows.reduce((acc, r) => ({ vehicles: Math.max(acc.vehicles, r.vehicles), challans: acc.challans + r.challans, amount: acc.amount + r.amount }), { vehicles: 0, challans: 0, amount: 0 });
export function VehicleAnalysisModal({ onClose, onCreateQuotation }) {
    const [stage, setStage] = useState('upload');
    const [vehicleCount, setVehicleCount] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [pendingDownloadFormat, setPendingDownloadFormat] = useState(null);
    const [downloadReason, setDownloadReason] = useState('');
    const [downloadReasonError, setDownloadReasonError] = useState('');
    const fileInputRef = useRef(null);
    const parsedVehicleCount = Number.parseInt(vehicleCount, 10);
    const canAnalyze = !!file && parsedVehicleCount > 0;
    const validateFile = (selected) => {
        const errs = [];
        const lower = selected.name.toLowerCase();
        if (!lower.endsWith('.csv') && !lower.endsWith('.xlsx') && !lower.endsWith('.xls')) {
            errs.push('Only CSV, XLS, and XLSX files are supported');
        }
        if (selected.size > 5 * 1024 * 1024) {
            errs.push('File size must be less than 5MB');
        }
        return errs;
    };
    const handleFileChange = (selected) => {
        if (!selected)
            return;
        const errs = validateFile(selected);
        if (errs.length > 0) {
            setFile(null);
            setErrors(errs);
        }
        else {
            setFile(selected);
            setErrors([]);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped)
            handleFileChange(dropped);
    };
    const handleAnalyze = () => {
        if (!canAnalyze)
            return;
        setStage('analyzing');
        setTimeout(() => setStage('results'), 1800);
    };
    const handleDownload = (format) => {
        const ext = format === 'xls' ? 'xls' : 'pdf';
        const mime = format === 'xls' ? 'application/vnd.ms-excel' : 'application/pdf';
        const lines = [];
        const push = (parts) => lines.push(parts.map(p => (typeof p === 'string' && p.includes(',') ? `"${p}"` : String(p))).join(','));
        push(['Overall Challan Status']);
        push(['Challan Status', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']);
        OVERALL_STATUS.forEach(r => push([r.label, r.vehicles, r.challans, r.amount]));
        const overallTotal = sumRow(OVERALL_STATUS);
        push(['Grand Total', overallTotal.vehicles, overallTotal.challans, overallTotal.amount]);
        push([]);
        push(['State Wise Challan - Pending Online']);
        push(['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']);
        STATE_PENDING_ONLINE.forEach(r => push([r.state, r.vehicles, r.challans, r.amount]));
        const stateOnlineTotal = sumRow(STATE_PENDING_ONLINE);
        push(['Grand Total', stateOnlineTotal.vehicles, stateOnlineTotal.challans, stateOnlineTotal.amount]);
        push([]);
        push(['State Wise Challan - Pending in Court']);
        push(['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']);
        STATE_PENDING_COURT.forEach(r => push([r.state, r.vehicles, r.challans, r.amount]));
        const stateCourtTotal = sumRow(STATE_PENDING_COURT);
        push(['Grand Total', stateCourtTotal.vehicles, stateCourtTotal.challans, stateCourtTotal.amount]);
        push([]);
        push(['Amount Range - Pending Online']);
        push(['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']);
        AMOUNT_PENDING_ONLINE.forEach(r => push([r.range, r.vehicles, r.challans, r.amount]));
        const amountOnlineTotal = sumRow(AMOUNT_PENDING_ONLINE);
        push(['Grand Total', amountOnlineTotal.vehicles, amountOnlineTotal.challans, amountOnlineTotal.amount]);
        push([]);
        push(['Amount Range - Pending in Court']);
        push(['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount']);
        AMOUNT_PENDING_COURT.forEach(r => push([r.range, r.vehicles, r.challans, r.amount]));
        const amountCourtTotal = sumRow(AMOUNT_PENDING_COURT);
        push(['Grand Total', amountCourtTotal.vehicles, amountCourtTotal.challans, amountCourtTotal.amount]);
        const blob = new Blob([lines.join('\n')], { type: mime });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vehicle-analysis-report.${ext}`;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    const requestDownload = (format) => {
        setPendingDownloadFormat(format);
        setDownloadReason('');
        setDownloadReasonError('');
    };
    const cancelDownload = () => {
        setPendingDownloadFormat(null);
        setDownloadReason('');
        setDownloadReasonError('');
    };
    const confirmDownload = () => {
        if (!downloadReason.trim()) {
            setDownloadReasonError('Reason is required');
            return;
        }
        if (pendingDownloadFormat) {
            handleDownload(pendingDownloadFormat);
        }
        cancelDownload();
    };
    const handleCreateQuotation = () => {
        onCreateQuotation?.();
        onClose();
    };
    return (_jsxs("div", { className: "fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[100] p-4", children: [_jsxs("div", { className: `bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full ${stage === 'results' && showReport ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-hidden flex flex-col`, children: [_jsxs("div", { className: "border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-100", children: "Vehicle Analysis" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [stage === 'upload' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "vehicle-count", className: "block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5", children: "Number of Vehicles" }), _jsx("input", { id: "vehicle-count", type: "number", min: 1, inputMode: "numeric", value: vehicleCount, onChange: e => setVehicleCount(e.target.value.replace(/[^0-9]/g, '')), placeholder: "e.g. 42", className: "w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5", children: "Upload Sheet" }), _jsxs("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragging
                                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                                    : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'}`, children: [_jsx("input", { ref: fileInputRef, type: "file", accept: ".csv,.xlsx,.xls", onChange: e => handleFileChange(e.target.files?.[0] || null), className: "hidden" }), !file ? (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: "Drag and drop, or click to select" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "CSV or Excel (.xlsx, .xls) \u2022 Max 5MB" })] })) : (_jsxs("div", { className: "flex items-center justify-center gap-2 text-cyan-700 dark:text-cyan-300", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: file.name }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["(", (file.size / 1024).toFixed(1), " KB)"] })] }))] })] }), errors.length > 0 && (_jsx("div", { className: "space-y-2", children: errors.map((err, idx) => (_jsxs("div", { className: "flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" }), _jsx("p", { className: "text-sm text-red-700 dark:text-red-300", children: err })] }, idx))) })), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Expected columns: Vehicle Number, Vehicle Type, Registration State, Owner Name. Additional columns are ignored." })] })), stage === 'analyzing' && (_jsxs("div", { className: "flex flex-col items-center justify-center py-16", children: [_jsx(Loader2, { className: "w-10 h-10 text-cyan-600 dark:text-cyan-400 animate-spin mb-4" }), _jsx("p", { className: "text-base font-medium text-slate-900 dark:text-slate-100", children: "Analyzing fleet\u2026" })] })), stage === 'results' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("section", { className: "grid grid-cols-2 gap-3", children: [_jsx(SummaryTile, { label: "Total Vehicles", value: SUMMARY.totalVehicles.toLocaleString('en-IN') }), _jsx(SummaryTile, { label: "Pending Challan Amount", value: formatINR(SUMMARY.pendingAmount) }), _jsx(SummaryTile, { label: "Pending Challans", value: SUMMARY.pendingChallans.toLocaleString('en-IN') }), _jsx(SummaryTile, { label: "Oldest Pending Since", value: SUMMARY.oldestPendingSince })] }), _jsxs("section", { className: "border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/10 rounded-lg p-5", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: "Output report is ready" }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 mt-0.5", children: "Download the full analysis in your preferred format." })] })] }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [_jsxs("button", { onClick: () => requestDownload('xls'), className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download as XLS"] }), _jsxs("button", { onClick: () => requestDownload('pdf'), className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download as PDF"] }), _jsxs("button", { onClick: () => setShowReport(s => !s), className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [showReport ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }), showReport ? 'Hide Report' : 'View Report'] })] })] }), showReport && (_jsxs(_Fragment, { children: [_jsxs("section", { children: [_jsx(SectionHeading, { title: "Overall Challan Status" }), _jsx(ReportTable, { columns: ['Challan Status', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'], rows: OVERALL_STATUS.map(r => [r.label, r.vehicles, r.challans, formatINR(r.amount)]), grandTotal: (() => {
                                                            const t = sumRow(OVERALL_STATUS);
                                                            return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)];
                                                        })() })] }), _jsxs("section", { children: [_jsx(SectionHeading, { title: "State Wise Challan" }), _jsxs("div", { className: "space-y-4", children: [_jsx(SubReport, { label: "PENDING ONLINE", columns: ['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'], rows: STATE_PENDING_ONLINE.map(r => [r.state, r.vehicles, r.challans, formatINR(r.amount)]), grandTotal: (() => {
                                                                    const t = sumRow(STATE_PENDING_ONLINE);
                                                                    return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)];
                                                                })() }), _jsx(SubReport, { label: "PENDING IN COURT", columns: ['State', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'], rows: STATE_PENDING_COURT.map(r => [r.state, r.vehicles, r.challans, formatINR(r.amount)]), grandTotal: (() => {
                                                                    const t = sumRow(STATE_PENDING_COURT);
                                                                    return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)];
                                                                })() })] })] }), _jsxs("section", { children: [_jsx(SectionHeading, { title: "Amount Range" }), _jsxs("div", { className: "space-y-4", children: [_jsx(SubReport, { label: "PENDING ONLINE", columns: ['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'], rows: AMOUNT_PENDING_ONLINE.map(r => [r.range, r.vehicles, r.challans, formatINR(r.amount)]), grandTotal: (() => {
                                                                    const t = sumRow(AMOUNT_PENDING_ONLINE);
                                                                    return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)];
                                                                })() }), _jsx(SubReport, { label: "PENDING IN COURT", columns: ['Grouped Amount', 'Unique Vehicle Count', 'No of Challan', 'Challan Amount'], rows: AMOUNT_PENDING_COURT.map(r => [r.range, r.vehicles, r.challans, formatINR(r.amount)]), grandTotal: (() => {
                                                                    const t = sumRow(AMOUNT_PENDING_COURT);
                                                                    return ['Grand Total', t.vehicles, t.challans, formatINR(t.amount)];
                                                                })() })] })] })] }))] }))] }), _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/50", children: [stage === 'results' ? (_jsxs("button", { onClick: handleCreateQuotation, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(FilePlus2, { className: "w-4 h-4" }), "Create Quotation"] })) : (_jsx("div", {})), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 rounded-lg font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors", children: stage === 'results' ? 'Close' : 'Cancel' }), stage === 'upload' && (_jsx("button", { onClick: handleAnalyze, disabled: !canAnalyze, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: "Run Analysis" }))] })] })] }), pendingDownloadFormat && (_jsx("div", { className: "fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[110] p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col", children: [_jsxs("div", { className: "border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-slate-100", children: "Reason for Download" }), _jsx("button", { onClick: cancelDownload, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) })] }), _jsx("div", { className: "p-6 space-y-3", children: _jsxs("div", { children: [_jsxs("label", { htmlFor: "download-reason", className: "block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5", children: ["Reason ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { id: "download-reason", value: downloadReason, onChange: e => {
                                            setDownloadReason(e.target.value);
                                            if (downloadReasonError && e.target.value.trim())
                                                setDownloadReasonError('');
                                        }, rows: 3, placeholder: "e.g. Sharing with customer for review", className: `w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${downloadReasonError ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}` }), downloadReasonError && (_jsx("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: downloadReasonError }))] }) }), _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-700/50", children: [_jsx("button", { onClick: cancelDownload, className: "px-4 py-2 rounded-lg font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsxs("button", { onClick: confirmDownload, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download"] })] })] }) }))] }));
}
function SummaryTile({ label, value }) {
    return (_jsxs("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800", children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 mb-2", children: label }), _jsx("p", { className: "text-xl font-semibold text-slate-900 dark:text-slate-50", children: value })] }));
}
function SectionHeading({ title }) {
    return (_jsx("h3", { className: "text-base font-semibold text-emerald-700 dark:text-emerald-400 mb-3", children: title }));
}
function ReportTable({ columns, rows, grandTotal }) {
    return (_jsx("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsx("tr", { className: "bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400", children: columns.map((c, i) => (_jsx("th", { className: `px-4 py-3 font-medium ${i === 0 ? 'text-left' : i === columns.length - 1 ? 'text-right' : 'text-center'}`, children: c }, c))) }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [rows.map((row, ri) => (_jsx("tr", { className: "text-slate-900 dark:text-slate-50", children: row.map((cell, ci) => (_jsx("td", { className: `px-4 py-3 ${ci === 0 ? 'text-left' : ci === row.length - 1 ? 'text-right' : 'text-center'}`, children: cell }, ci))) }, ri))), _jsx("tr", { className: "bg-slate-50 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-50", children: grandTotal.map((cell, ci) => (_jsx("td", { className: `px-4 py-3 ${ci === 0 ? 'text-left' : ci === grandTotal.length - 1 ? 'text-right' : 'text-center'}`, children: cell }, ci))) })] })] }) }) }));
}
function SubReport({ label, columns, rows, grandTotal }) {
    return (_jsxs("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden", children: [_jsx("div", { className: "bg-emerald-50/70 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900/50 py-2 text-center", children: _jsx("span", { className: "text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider", children: label }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsx("tr", { className: "text-xs text-slate-500 dark:text-slate-400", children: columns.map((c, i) => (_jsx("th", { className: `px-4 py-3 font-medium ${i === 0 ? 'text-left' : i === columns.length - 1 ? 'text-right' : 'text-center'}`, children: c }, c))) }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [rows.map((row, ri) => (_jsx("tr", { className: "text-slate-900 dark:text-slate-50", children: row.map((cell, ci) => (_jsx("td", { className: `px-4 py-3 ${ci === 0 ? 'text-left' : ci === row.length - 1 ? 'text-right' : 'text-center'}`, children: cell }, ci))) }, ri))), _jsx("tr", { className: "bg-slate-50 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-50", children: grandTotal.map((cell, ci) => (_jsx("td", { className: `px-4 py-3 ${ci === 0 ? 'text-left' : ci === grandTotal.length - 1 ? 'text-right' : 'text-center'}`, children: cell }, ci))) })] })] }) })] }));
}
