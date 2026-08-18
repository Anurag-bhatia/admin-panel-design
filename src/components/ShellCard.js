import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { ListItem } from '@/components/ui/list-item';
import { MutedBulletList } from '@/components/ui/bullet-list';
import { PanelLeft, Layout } from 'lucide-react';
export function ShellCard({ shell }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(PanelLeft, { className: "w-5 h-5 text-stone-500 dark:text-stone-400", strokeWidth: 1.5 }), "Application Shell"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [shell.spec && shell.spec.overview && (_jsx("p", { className: "text-stone-600 dark:text-stone-400 leading-relaxed", children: shell.spec.overview })), shell.spec && shell.spec.navigationItems.length > 0 && (_jsx(CollapsibleSection, { title: "Navigation", count: shell.spec.navigationItems.length, children: _jsx(MutedBulletList, { items: shell.spec.navigationItems, className: "ml-1" }) })), shell.hasComponents && (_jsx("div", { className: "pt-2 border-t border-stone-100 dark:border-stone-800", children: _jsx(ListItem, { title: "View Shell Design", icon: Layout, to: "/shell/design", className: "px-0 py-2" }) }))] })] }));
}
