import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CountBadge } from '@/components/ui/count-badge';
import { SectionLabel } from '@/components/ui/section-label';
import { MutedBulletList } from '@/components/ui/bullet-list';
import { ChevronDown } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { cn } from '@/lib/utils';
function extractMeta(data) {
    const meta = data._meta;
    if (meta && typeof meta === 'object' && meta.models && meta.relationships) {
        return meta;
    }
    return null;
}
function getDataWithoutMeta(data) {
    const { _meta, ...rest } = data;
    return rest;
}
function countRecords(data) {
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
        if (key !== '_meta' && Array.isArray(value)) {
            count += value.length;
        }
    }
    return count;
}
export function DataCard({ data }) {
    const [isJsonOpen, setIsJsonOpen] = useState(false);
    if (!data) {
        return _jsx(EmptyState, { type: "data" });
    }
    const meta = extractMeta(data);
    const dataWithoutMeta = getDataWithoutMeta(data);
    const recordCount = countRecords(data);
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CardTitle, { children: "Sample Data" }), recordCount > 0 && (_jsx(CountBadge, { count: recordCount, label: "records", singularLabel: "record" }))] }) }), _jsxs(CardContent, { className: "pt-0 space-y-4", children: [meta && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(SectionLabel, { className: "mb-3", children: "Data Models" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: Object.entries(meta.models).map(([modelName, description]) => (_jsxs("div", { className: "bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-stone-900 dark:text-stone-100 mb-1", children: modelName }), _jsx("p", { className: "text-stone-600 dark:text-stone-400 text-sm leading-relaxed", children: description })] }, modelName))) })] }), meta.relationships.length > 0 && (_jsxs("div", { children: [_jsx(SectionLabel, { className: "mb-3", children: "How They Connect" }), _jsx(MutedBulletList, { items: meta.relationships })] }))] })), _jsxs(Collapsible, { open: isJsonOpen, onOpenChange: setIsJsonOpen, children: [_jsxs(CollapsibleTrigger, { className: "flex items-center gap-2 text-left group", children: [_jsx(ChevronDown, { className: cn("w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform", isJsonOpen && "rotate-180"), strokeWidth: 1.5 }), _jsxs("span", { className: "text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors", children: [isJsonOpen ? 'Hide' : 'View', " JSON"] })] }), _jsx(CollapsibleContent, { children: _jsx("div", { className: "bg-stone-50 dark:bg-stone-900 rounded-md p-4 overflow-x-auto mt-3", children: _jsx("pre", { className: "text-xs font-mono text-stone-700 dark:text-stone-300 whitespace-pre-wrap", children: JSON.stringify(dataWithoutMeta, null, 2) }) }) })] })] })] }));
}
