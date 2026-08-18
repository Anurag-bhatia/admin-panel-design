import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
export function UserMenu({ user, onLogout }) {
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
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return (_jsxs("div", { className: "relative", ref: menuRef, children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: [user.avatarUrl ? (_jsx("img", { src: user.avatarUrl, alt: user.name, className: "w-8 h-8 rounded-full" })) : (_jsx("div", { className: "w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-medium", children: initials })), _jsxs("div", { className: "hidden sm:block text-left", children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: user.name }), user.email && (_jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: user.email }))] }), _jsx(ChevronDown, { className: `w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}` })] }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50", children: [_jsxs("div", { className: "px-4 py-3 border-b border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: user.name }), user.email && (_jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: user.email })), user.designation && (_jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: user.designation }))] }), _jsxs("button", { onClick: () => {
                            onLogout?.();
                            setIsOpen(false);
                        }, className: "w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Logout" })] })] }))] }));
}
