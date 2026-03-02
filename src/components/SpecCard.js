import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { BulletList } from '@/components/ui/bullet-list';
import { PanelTop, Square } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
export function SpecCard({ spec, sectionTitle }) {
    if (!spec) {
        return _jsx(EmptyState, { type: "spec" });
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: sectionTitle || 'Specification' }) }), _jsxs(CardContent, { className: "space-y-4", children: [spec.overview && (_jsx("p", { className: "text-stone-600 dark:text-stone-400 leading-relaxed", children: spec.overview })), spec.userFlows.length > 0 && (_jsx(CollapsibleSection, { title: "User Flows", count: spec.userFlows.length, children: _jsx(BulletList, { items: spec.userFlows }) })), spec.uiRequirements.length > 0 && (_jsx(CollapsibleSection, { title: "UI Requirements", count: spec.uiRequirements.length, children: _jsx(BulletList, { items: spec.uiRequirements }) })), _jsx("div", { className: "flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800", children: spec.useShell ? (_jsxs(_Fragment, { children: [_jsx(PanelTop, { className: "w-4 h-4 text-stone-400 dark:text-stone-500", strokeWidth: 1.5 }), _jsx("span", { className: "text-sm text-stone-500 dark:text-stone-400", children: "Displays inside app shell" })] })) : (_jsxs(_Fragment, { children: [_jsx(Square, { className: "w-4 h-4 text-stone-400 dark:text-stone-500", strokeWidth: 1.5 }), _jsx("span", { className: "text-sm text-stone-500 dark:text-stone-400", children: "Standalone page (no shell)" })] })) })] })] }));
}
