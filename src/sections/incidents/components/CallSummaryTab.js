import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Phone, Play, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
const SAMPLE_CALLS = [
    {
        id: 'call-001',
        direction: 'outbound',
        callerName: 'Ramesh Sharma',
        callerRole: 'Subscriber Contact',
        phoneNumber: '+91 98765 43210',
        duration: '4:32',
        timestamp: '2024-01-20T11:30:00Z',
        summary: 'Called subscriber to inform about lawyer assignment and next steps. Subscriber acknowledged and confirmed availability for any document submission if required.',
        keyPoints: [
            'Lawyer Adv. Suresh Iyer assigned to the case',
            'Court hearing expected within 2-3 weeks',
            'Subscriber to keep RC and insurance documents ready',
            'No additional payment required at this stage'
        ],
        sentiment: 'positive',
    },
    {
        id: 'call-002',
        direction: 'inbound',
        callerName: 'Adv. Suresh Iyer',
        callerRole: 'Assigned Lawyer',
        phoneNumber: '+91 98112 34567',
        duration: '6:15',
        timestamp: '2024-01-19T15:00:00Z',
        summary: 'Lawyer called to discuss case details and confirm acceptance. Reviewed challan specifics and identified potential procedural issues that can be contested.',
        keyPoints: [
            'Challan issued without proper evidence documentation',
            'Speed measurement device calibration certificate missing',
            'Strong grounds for contesting the challan',
            'Lawyer will file representation within 5 working days'
        ],
        sentiment: 'positive',
    },
    {
        id: 'call-003',
        direction: 'outbound',
        callerName: 'Ramesh Sharma',
        callerRole: 'Subscriber Contact',
        phoneNumber: '+91 98765 43210',
        duration: '3:45',
        timestamp: '2024-01-17T10:00:00Z',
        summary: 'Called to verify vehicle ownership and collect RC copy. Subscriber confirmed ownership and agreed to send documents via email.',
        keyPoints: [
            'Vehicle ownership confirmed for MH01AB1234',
            'RC copy to be sent via email',
            'Driver at time of violation was company employee',
            'Subscriber prefers contest over pay-and-close'
        ],
        sentiment: 'neutral',
    },
    {
        id: 'call-004',
        direction: 'outbound',
        callerName: 'Ramesh Sharma',
        callerRole: 'Subscriber Contact',
        phoneNumber: '+91 98765 43210',
        duration: '2:10',
        timestamp: '2024-01-15T14:30:00Z',
        summary: 'Initial call to inform subscriber about new challan received via API. Confirmed basic details and explained the process.',
        keyPoints: [
            'New challan MH012024789456 received',
            'Vehicle: MH01AB1234',
            'Fine amount: Rs. 2,500',
            'Subscriber aware of the incident'
        ],
        sentiment: 'neutral',
    }
];
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function CallSummaryTab() {
    const [expandedCall, setExpandedCall] = useState('call-001');
    const toggleExpand = (callId) => {
        setExpandedCall(expandedCall === callId ? null : callId);
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Call Summary" }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: [SAMPLE_CALLS.length, " calls recorded for this incident"] })] }) }), _jsx("div", { className: "space-y-4", children: SAMPLE_CALLS.map((call) => {
                    const isExpanded = expandedCall === call.id;
                    return (_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsxs("button", { onClick: () => toggleExpand(call.id), className: "w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `p-2 rounded-full ${call.direction === 'inbound'
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30'
                                                    : 'bg-blue-100 dark:bg-blue-900/30'}`, children: _jsx(Phone, { className: `h-4 w-4 ${call.direction === 'inbound'
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : 'text-blue-600 dark:text-blue-400'}` }) }), _jsxs("div", { className: "text-left", children: [_jsx("span", { className: "font-medium text-slate-900 dark:text-white", children: call.callerName }), _jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "h-3 w-3" }), formatDate(call.timestamp)] }), _jsx("span", { children: formatTime(call.timestamp) }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), call.duration] }), ] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `px-1.5 py-0.5 rounded text-xs ${call.direction === 'inbound'
                                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                                                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`, children: call.direction === 'inbound' ? 'Incoming' : 'Outgoing' }), isExpanded ? (_jsx(ChevronUp, { className: "h-5 w-5 text-slate-400" })) : (_jsx(ChevronDown, { className: "h-5 w-5 text-slate-400" }))] })] }), isExpanded && (_jsx("div", { className: "px-4 pb-4 border-t border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "pt-4 space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Summary" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: call.summary })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Key Points" }), _jsx("ul", { className: "space-y-1.5", children: call.keyPoints.map((point, index) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }), point] }, index))) })] }), _jsxs("div", { className: "flex items-center gap-3 pt-2", children: [_jsxs("button", { className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Play, { className: "h-4 w-4" }), "Play Recording"] }), _jsx("span", { className: "text-xs text-slate-400", children: call.phoneNumber })] })] }) }))] }, call.id));
                }) })] }));
}
