import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, UserPlus, Users, Scale, Handshake, CreditCard, MessageSquare, HeadphonesIcon, BarChart3, UsersRound, } from 'lucide-react';
import { AppShell } from './components/AppShell';
export default function ShellPreview() {
    const navigationItems = [
        {
            label: 'Incidents',
            href: '/incidents',
            icon: AlertCircle,
            isActive: true,
        },
        {
            label: 'Leads',
            href: '/leads',
            icon: UserPlus,
            children: [
                {
                    label: 'All Leads',
                    href: '/leads/all',
                    isActive: false,
                },
            ],
        },
        {
            label: 'Subscribers',
            href: '/subscribers',
            icon: Users,
        },
        {
            label: 'Lawyers',
            href: '/lawyers',
            icon: Scale,
        },
        {
            label: 'Partners',
            href: '/partners',
            icon: Handshake,
        },
        {
            label: 'Payments',
            href: '/payments',
            icon: CreditCard,
        },
        {
            label: 'Disputes',
            href: '/disputes',
            icon: MessageSquare,
        },
        {
            label: 'Support',
            href: '/support',
            icon: HeadphonesIcon,
        },
        {
            label: 'Reports',
            href: '/reports',
            icon: BarChart3,
        },
        {
            label: 'Team',
            href: '/team',
            icon: UsersRound,
        },
    ];
    const user = {
        name: 'Alex Morgan',
        email: 'alex@company.com',
        designation: 'Operations Manager',
    };
    const breadcrumbs = [
        {
            label: 'Incidents',
        },
    ];
    return (_jsx(AppShell, { navigationItems: navigationItems, user: user, breadcrumbs: breadcrumbs, onNavigate: (href) => console.log('Navigate to:', href), onLogout: () => console.log('Logout'), children: _jsx("div", { className: "p-6 lg:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: "Incidents" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 mb-8", children: "Core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement with automated lawyer coordination." }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "Total Incidents" }), _jsx(AlertCircle, { className: "w-5 h-5 text-cyan-600" })] }), _jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: "1,247" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mt-2", children: "+12% from last month" })] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "Pending Assignment" }), _jsx(AlertCircle, { className: "w-5 h-5 text-orange-600" })] }), _jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: "43" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mt-2", children: "Requires attention" })] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "Resolved" }), _jsx(AlertCircle, { className: "w-5 h-5 text-green-600" })] }), _jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: "892" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mt-2", children: "71% resolution rate" })] })] }), _jsxs("div", { className: "mt-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-4", children: "Recent Activity" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "New incident assigned to Lawyer #142" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "2 minutes ago" })] }), _jsx("span", { className: "px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300", children: "Assigned" })] }), _jsxs("div", { className: "flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Incident #CH-2024-1523 resolved" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "15 minutes ago" })] }), _jsx("span", { className: "px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", children: "Resolved" })] }), _jsxs("div", { className: "flex items-center justify-between py-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "SLA breach warning for incident #CH-2024-1489" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "1 hour ago" })] }), _jsx("span", { className: "px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300", children: "Warning" })] })] })] })] }) }) }));
}
