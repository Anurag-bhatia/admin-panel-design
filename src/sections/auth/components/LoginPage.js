import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
export function LoginPage({ onLogin, logoUrl = '/logo.png', appName = 'Lawyered' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }
        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }
        setIsLoading(true);
        // Simulate a brief delay then call onLogin
        setTimeout(() => {
            onLogin?.(email, password);
            setIsLoading(false);
        }, 800);
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "flex-1 flex items-center justify-center p-6 sm:p-8", children: _jsxs("div", { className: "w-full max-w-sm", children: [_jsx("div", { className: "mb-10 flex justify-center", children: _jsx("img", { src: logoUrl, alt: appName, className: "h-8" }) }), _jsxs("div", { className: "mb-8 text-center", children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: "Welcome back" }), _jsx("p", { className: "mt-2 text-sm text-slate-500 dark:text-slate-400", children: "Sign in to your account to continue" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [error && (_jsx("div", { className: "px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50", children: _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error }) })), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-700 dark:text-slate-300", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@company.com", autoComplete: "email", className: "w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 dark:focus:ring-cyan-400/30 dark:focus:border-cyan-400 transition-colors" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-slate-700 dark:text-slate-300", children: "Password" }), _jsx("button", { type: "button", className: "text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "password", type: showPassword ? 'text' : 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", autoComplete: "current-password", className: "w-full h-11 px-3.5 pr-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 dark:focus:ring-cyan-400/30 dark:focus:border-cyan-400 transition-colors" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors", children: showPassword ? _jsx(EyeOff, { className: "w-4.5 h-4.5" }) : _jsx(Eye, { className: "w-4.5 h-4.5" }) })] })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: ["Sign in", _jsx(ArrowRight, { className: "w-4 h-4" })] })) })] }), _jsxs("p", { className: "mt-8 text-center text-xs text-slate-400 dark:text-slate-500", children: ["Don't have an account?", ' ', _jsx("button", { className: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors", children: "Contact admin" })] })] }) }), _jsxs("p", { className: "py-6 text-center text-xs text-slate-400 dark:text-slate-500", children: ["\u00A9 2026 ", appName, ". All rights reserved."] })] }));
}
