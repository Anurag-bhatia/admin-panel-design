import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Search } from 'lucide-react';
const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
];
const CASE_TYPE_OPTIONS = [
    { value: 'iaStart', label: 'IA Start' },
    { value: 'wills24', label: 'Wills 24' },
    { value: 'legalNotice', label: 'Legal Notice' },
    { value: 'others', label: 'Others' },
    { value: 'litigation', label: 'Litigation' },
    { value: 'laas', label: 'LAAS' },
    { value: 'accident', label: 'Accident' },
    { value: 'liveChallan', label: 'Live Challan' },
    { value: 'oldChallan', label: 'Old Challan' },
    { value: 'ndps', label: 'NDPS' },
    { value: 'employmentLabour', label: 'Employment and Labour Case' },
];
export function AddCaseModal({ subscribers, sources, onSubmit, onCancel }) {
    const [subscriberId, setSubscriberId] = useState('');
    const [subscriberSearch, setSubscriberSearch] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [type, setType] = useState('onSpot');
    const [caseCategory, setCaseCategory] = useState('');
    const [authorityInvolved, setAuthorityInvolved] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [reporterName, setReporterName] = useState('');
    const [incidentStory, setIncidentStory] = useState('');
    const [source, setSource] = useState('Manual');
    const filteredSubscribers = subscribers.filter((sub) => sub.name.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
        sub.id.toLowerCase().includes(subscriberSearch.toLowerCase()));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subscriberId || !vehicle || !caseCategory || !state) {
            return;
        }
        onSubmit?.({
            workType: 'case',
            subscriberId,
            subscriberName: subscribers.find((s) => s.id === subscriberId)?.name || '',
            vehicle,
            mobileNumber: mobileNumber || undefined,
            type,
            caseCategory: caseCategory,
            authorityInvolved: authorityInvolved || undefined,
            state,
            pincode: pincode || undefined,
            address: address || undefined,
            reporterName: reporterName || undefined,
            incidentStory: incidentStory || undefined,
            source,
            challanNumber: '',
            challanType: 'court',
            amount: 0,
            offence: null,
            assignedAgentId: null,
            assignedLawyerId: null,
        });
    };
    const selectedSubscriber = subscribers.find((s) => s.id === subscriberId);
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Add New Case" }), _jsx("button", { onClick: onCancel, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-5", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Subscriber ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", value: subscriberSearch, onChange: (e) => setSubscriberSearch(e.target.value), placeholder: "Search by subscriber name or ID", className: "w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), subscriberSearch && (_jsx("div", { className: "absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20", children: filteredSubscribers.length === 0 ? (_jsx("div", { className: "px-4 py-3 text-sm text-slate-500 dark:text-slate-400", children: "No subscribers found" })) : (filteredSubscribers.map((sub) => (_jsxs("button", { type: "button", onClick: () => {
                                                    setSubscriberId(sub.id);
                                                    setSubscriberSearch(sub.name);
                                                }, className: "w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: sub.name }), _jsxs("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: [sub.id, " \u2022 ", sub.contactPerson] })] }, sub.id)))) }))] }), selectedSubscriber && (_jsxs("div", { className: "mt-2 p-3 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg", children: [_jsx("div", { className: "text-sm font-medium text-cyan-900 dark:text-cyan-300", children: selectedSubscriber.name }), _jsxs("div", { className: "text-xs text-cyan-700 dark:text-cyan-400 mt-1", children: [selectedSubscriber.companyAlias, " \u2022 ", selectedSubscriber.contactPerson] })] }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Vehicle Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: vehicle, onChange: (e) => setVehicle(e.target.value.toUpperCase()), placeholder: "DL01AB1234", className: "w-full px-4 py-2.5 text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white uppercase", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Mobile Number" }), _jsx("input", { type: "tel", value: mobileNumber, onChange: (e) => setMobileNumber(e.target.value), placeholder: "+91 98765 43210", className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", required: true, children: [_jsx("option", { value: "onSpot", children: "On Spot" }), _jsx("option", { value: "onCall", children: "On Call" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Case Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: caseCategory, onChange: (e) => setCaseCategory(e.target.value), className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", required: true, children: [_jsx("option", { value: "", children: "Select Case Type" }), CASE_TYPE_OPTIONS.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Authority Involved" }), _jsx("input", { type: "text", value: authorityInvolved, onChange: (e) => setAuthorityInvolved(e.target.value), placeholder: "e.g. Traffic Police, RTO", className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["State ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: state, onChange: (e) => setState(e.target.value), className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", required: true, children: [_jsx("option", { value: "", children: "Select State" }), INDIAN_STATES.map((st) => (_jsx("option", { value: st, children: st }, st)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Pincode" }), _jsx("input", { type: "text", value: pincode, onChange: (e) => setPincode(e.target.value), placeholder: "400001", maxLength: 6, className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Address" }), _jsx("input", { type: "text", value: address, onChange: (e) => setAddress(e.target.value), placeholder: "Location of the incident", className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Reporter Name" }), _jsx("input", { type: "text", value: reporterName, onChange: (e) => setReporterName(e.target.value), placeholder: "Name of the person reporting", className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Incident Story" }), _jsx("textarea", { value: incidentStory, onChange: (e) => setIncidentStory(e.target.value), placeholder: "Describe what happened...", rows: 4, className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none" })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", disabled: !subscriberId || !vehicle || !caseCategory || !state, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Add Case" })] })] })] }) }));
}
