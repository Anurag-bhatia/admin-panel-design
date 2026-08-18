import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { X, Search } from 'lucide-react';
export function AssignLeadModal({ leadId, leadName, currentAssignee, users, onAssign, onClose }) {
    const [selectedUser, setSelectedUser] = useState(currentAssignee || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [notes, setNotes] = useState('');
    const inputRef = useRef(null);
    const filteredUsers = users.filter(user => user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.team.toLowerCase().includes(searchQuery.toLowerCase()));
    const selectedUserObj = selectedUser
        ? users.find(u => u.id === selectedUser)
        : null;
    const handleAssign = () => {
        if (selectedUser) {
            onAssign(selectedUser, notes);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Assign Lead" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5", children: leadName })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-6 py-5 space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Owner" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { ref: inputRef, type: "text", placeholder: "Search by name, email, role, or team...", value: searchQuery, onChange: e => {
                                                setSearchQuery(e.target.value);
                                                setShowDropdown(true);
                                            }, onFocus: () => {
                                                if (searchQuery.trim())
                                                    setShowDropdown(true);
                                            }, className: "w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" }), showDropdown && searchQuery.trim() && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowDropdown(false) }), _jsx("div", { className: "absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto z-20", children: filteredUsers.length === 0 ? (_jsx("div", { className: "px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400", children: "No users found" })) : (filteredUsers.map(user => (_jsxs("button", { onClick: () => {
                                                            setSelectedUser(user.id);
                                                            setSearchQuery('');
                                                            setShowDropdown(false);
                                                        }, className: "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300", children: user.fullName.charAt(0) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: user.fullName }), _jsxs("div", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [user.role, " \u00B7 ", user.team] })] })] }, user.id)))) })] }))] }), selectedUserObj && (_jsx("div", { className: "mt-2", children: _jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg", children: [_jsx("div", { className: "w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-medium", children: selectedUserObj.fullName.charAt(0) }), _jsx("span", { className: "text-sm font-medium text-cyan-900 dark:text-cyan-300", children: selectedUserObj.fullName }), _jsx("button", { onClick: () => {
                                                    setSelectedUser('');
                                                    inputRef.current?.focus();
                                                }, className: "p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded transition-colors", children: _jsx(X, { className: "h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" }) })] }) }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Notes (optional)" }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Add a note about this assignment...", rows: 3, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none" })] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleAssign, disabled: !selectedUser, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Assign Lead" })] })] }) }));
}
