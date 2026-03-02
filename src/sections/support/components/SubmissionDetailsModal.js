import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
export function SubmissionDetailsModal({ submission, onClose, onConvertToLead, onConvertToDispute, onConvertToPartnership }) {
    const [convertOpen, setConvertOpen] = useState(false);
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
    const handleConvertLead = () => {
        if (onConvertToLead) onConvertToLead(submission.id);
        onClose();
    };
    const handleConvertDispute = () => {
        if (onConvertToDispute) onConvertToDispute(submission.id);
        onClose();
    };
    const handleConvertPartnership = () => {
        if (onConvertToPartnership) onConvertToPartnership(submission.id);
        onClose();
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
        _jsx("div", { className: "absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-sm", onClick: onClose }),
        _jsxs("div", { className: "relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col", children: [
            _jsxs("div", { className: "relative px-6 py-6 border-b border-slate-200 dark:border-slate-800", children: [
                _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent dark:from-cyan-500/10" }),
                _jsxs("div", { className: "relative flex items-start justify-between", children: [
                    _jsxs("div", { className: "flex-1 pr-4", children: [
                        _jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                            _jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium capitalize " + getTypeBadgeColor(submission.type), children: submission.type }),
                            _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: formatDate(submission.submittedAt) })
                        ] }),
                        _jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: submission.subject })
                    ] }),
                    _jsx("button", { onClick: onClose, className: "flex-shrink-0 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors", "aria-label": "Close modal", children:
                        _jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                            _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
                        })
                    })
                ] })
            ] }),
            _jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-6", children: [
                _jsxs("div", { className: "mb-8", children: [
                    _jsx("h3", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4", children: "Contact Information" }),
                    _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                        submission.contactName && (_jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50", children: [
                            _jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center", children:
                                _jsx("svg", { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" })
                                })
                            }),
                            _jsxs("div", { className: "flex-1 min-w-0", children: [
                                _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: "Name" }),
                                _jsx("p", { className: "font-medium text-slate-900 dark:text-white truncate", children: submission.contactName })
                            ] })
                        ] })),
                        submission.contactEmail && (_jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50", children: [
                            _jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center", children:
                                _jsx("svg", { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
                                })
                            }),
                            _jsxs("div", { className: "flex-1 min-w-0", children: [
                                _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: "Email" }),
                                _jsx("p", { className: "font-medium text-slate-900 dark:text-white truncate", children: submission.contactEmail })
                            ] })
                        ] })),
                        submission.contactPhone && (_jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50", children: [
                            _jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center", children:
                                _jsx("svg", { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" })
                                })
                            }),
                            _jsxs("div", { className: "flex-1 min-w-0", children: [
                                _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: "Phone" }),
                                _jsx("p", { className: "font-medium text-slate-900 dark:text-white truncate", children: submission.contactPhone })
                            ] })
                        ] })),
                        _jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50", children: [
                            _jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center", children:
                                _jsx("svg", { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
                                })
                            }),
                            _jsxs("div", { className: "flex-1 min-w-0", children: [
                                _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: "Source" }),
                                _jsx("p", { className: "font-medium text-slate-900 dark:text-white", children: submission.source })
                            ] })
                        ] })
                    ] })
                ] }),
                _jsxs("div", { children: [
                    _jsx("h3", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4", children: "Message" }),
                    _jsx("div", { className: "p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700", children:
                        _jsx("p", { className: "text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap", children: submission.message })
                    })
                ] })
            ] }),
            _jsx("div", { className: "px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end", children:
                _jsxs("div", { className: "relative", children: [
                    _jsxs("button", { onClick: function() { setConvertOpen(!convertOpen); }, className: "inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm", children: [
                        "Convert",
                        _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                            _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                        })
                    ] }),
                    convertOpen && (_jsxs(_Fragment, { children: [
                        _jsx("div", { className: "fixed inset-0 z-10", onClick: function() { setConvertOpen(false); } }),
                        _jsxs("div", { className: "absolute right-0 bottom-full mb-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-20", children: [
                            _jsxs("button", { onClick: handleConvertLead, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-3", children: [
                                _jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" })
                                }),
                                "Convert to Lead"
                            ] }),
                            _jsxs("button", { onClick: handleConvertDispute, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-3", children: [
                                _jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" })
                                }),
                                "Convert to Dispute"
                            ] }),
                            _jsxs("button", { onClick: handleConvertPartnership, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors flex items-center gap-3", children: [
                                _jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children:
                                    _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
                                }),
                                "Convert to Partnership"
                            ] })
                        ] })
                    ] }))
                ] })
            })
        ] })
    ] }));
}
