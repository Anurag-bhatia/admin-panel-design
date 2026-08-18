import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { ListItem } from '@/components/ui/list-item';
import { AppLayout } from '@/components/AppLayout';
import { EmptyState } from '@/components/EmptyState';
import { StepIndicator } from '@/components/StepIndicator';
import { NextPhaseButton } from '@/components/NextPhaseButton';
import { loadProductData } from '@/lib/product-loader';
import { Layout } from 'lucide-react';
// Map Tailwind color names to actual color values for preview
const colorMap = {
    red: { light: '#fca5a5', base: '#ef4444', dark: '#dc2626' },
    orange: { light: '#fdba74', base: '#f97316', dark: '#ea580c' },
    amber: { light: '#fcd34d', base: '#f59e0b', dark: '#d97706' },
    yellow: { light: '#fde047', base: '#eab308', dark: '#ca8a04' },
    lime: { light: '#bef264', base: '#84cc16', dark: '#65a30d' },
    green: { light: '#86efac', base: '#22c55e', dark: '#16a34a' },
    emerald: { light: '#6ee7b7', base: '#10b981', dark: '#059669' },
    teal: { light: '#5eead4', base: '#14b8a6', dark: '#0d9488' },
    cyan: { light: '#67e8f9', base: '#06b6d4', dark: '#0891b2' },
    sky: { light: '#7dd3fc', base: '#0ea5e9', dark: '#0284c7' },
    blue: { light: '#93c5fd', base: '#3b82f6', dark: '#2563eb' },
    indigo: { light: '#a5b4fc', base: '#6366f1', dark: '#4f46e5' },
    violet: { light: '#c4b5fd', base: '#8b5cf6', dark: '#7c3aed' },
    purple: { light: '#d8b4fe', base: '#a855f7', dark: '#9333ea' },
    fuchsia: { light: '#f0abfc', base: '#d946ef', dark: '#c026d3' },
    pink: { light: '#f9a8d4', base: '#ec4899', dark: '#db2777' },
    rose: { light: '#fda4af', base: '#f43f5e', dark: '#e11d48' },
    slate: { light: '#cbd5e1', base: '#64748b', dark: '#475569' },
    gray: { light: '#d1d5db', base: '#6b7280', dark: '#4b5563' },
    zinc: { light: '#d4d4d8', base: '#71717a', dark: '#52525b' },
    neutral: { light: '#d4d4d4', base: '#737373', dark: '#525252' },
    stone: { light: '#d6d3d1', base: '#78716c', dark: '#57534e' },
};
/**
 * Determine the status of each step on the Design page
 * Steps: 1. Design Tokens, 2. Shell Design
 */
function getDesignPageStepStatuses(hasDesignSystem, hasShell) {
    const statuses = [];
    // Step 1: Design Tokens
    if (hasDesignSystem) {
        statuses.push('completed');
    }
    else {
        statuses.push('current');
    }
    // Step 2: Shell
    if (hasShell) {
        statuses.push('completed');
    }
    else if (hasDesignSystem) {
        statuses.push('current');
    }
    else {
        statuses.push('upcoming');
    }
    return statuses;
}
export function DesignPage() {
    const productData = useMemo(() => loadProductData(), []);
    const designSystem = productData.designSystem;
    const shell = productData.shell;
    const hasDesignSystem = !!(designSystem?.colors || designSystem?.typography);
    const hasShell = !!shell?.spec;
    const allStepsComplete = hasDesignSystem && hasShell;
    const stepStatuses = getDesignPageStepStatuses(hasDesignSystem, hasShell);
    return (_jsx(AppLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2", children: "Design System" }), _jsx("p", { className: "text-stone-600 dark:text-stone-400", children: "Define the visual foundation and application shell for your product." })] }), _jsx(StepIndicator, { step: 1, status: stepStatuses[0], children: !designSystem?.colors && !designSystem?.typography ? (_jsx(EmptyState, { type: "design-system" })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Design Tokens" }) }), _jsxs(CardContent, { className: "space-y-6", children: [designSystem?.colors && (_jsxs("div", { children: [_jsx(SectionLabel, { className: "mb-4", children: "Colors" }), _jsxs("div", { className: "grid grid-cols-3 gap-6", children: [_jsx(ColorSwatch, { label: "Primary", colorName: designSystem.colors.primary }), _jsx(ColorSwatch, { label: "Secondary", colorName: designSystem.colors.secondary }), _jsx(ColorSwatch, { label: "Neutral", colorName: designSystem.colors.neutral })] })] })), designSystem?.typography && (_jsxs("div", { children: [_jsx(SectionLabel, { className: "mb-4", children: "Typography" }), _jsxs("div", { className: "grid grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400 mb-1", children: "Heading" }), _jsx("p", { className: "font-semibold text-stone-900 dark:text-stone-100", children: designSystem.typography.heading })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400 mb-1", children: "Body" }), _jsx("p", { className: "text-stone-900 dark:text-stone-100", children: designSystem.typography.body })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400 mb-1", children: "Mono" }), _jsx("p", { className: "font-mono text-stone-900 dark:text-stone-100", children: designSystem.typography.mono })] })] })] })), _jsx("div", { className: "bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5", children: _jsxs("p", { className: "text-xs text-stone-500 dark:text-stone-400", children: ["Run ", _jsx("code", { className: "font-mono text-stone-700 dark:text-stone-300", children: "/design-tokens" }), " to update"] }) })] })] })) }), _jsx(StepIndicator, { step: 2, status: stepStatuses[1], isLast: !allStepsComplete, children: !shell?.spec ? (_jsx(EmptyState, { type: "shell" })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Application Shell" }) }), _jsxs(CardContent, { className: "space-y-4", children: [shell.spec.overview && (_jsx("p", { className: "text-stone-600 dark:text-stone-400 leading-relaxed", children: shell.spec.overview })), shell.spec.navigationItems.length > 0 && (_jsxs("div", { children: [_jsx(SectionLabel, { className: "mb-2", children: "Navigation" }), _jsx("ul", { className: "space-y-1", children: shell.spec.navigationItems.map((item, index) => {
                                                    // Parse markdown-style bold: **text** → <strong>text</strong>
                                                    const parts = item.split(/\*\*([^*]+)\*\*/);
                                                    return (_jsxs("li", { className: "flex items-center gap-2 text-stone-700 dark:text-stone-300", children: [_jsx("span", { className: "w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" }), parts.map((part, i) => i % 2 === 1 ? (_jsx("strong", { className: "font-semibold", children: part }, i)) : (_jsx("span", { children: part }, i)))] }, index));
                                                }) })] })), shell.hasComponents && (_jsx("div", { className: "pt-2 border-t border-stone-100 dark:border-stone-800", children: _jsx(ListItem, { title: "View Shell Design", icon: Layout, to: "/shell/design", className: "px-0 py-2" }) })), _jsx("div", { className: "bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5", children: _jsxs("p", { className: "text-xs text-stone-500 dark:text-stone-400", children: ["Run ", _jsx("code", { className: "font-mono text-stone-700 dark:text-stone-300", children: "/design-shell" }), " to update"] }) })] })] })) }), allStepsComplete && (_jsx(StepIndicator, { step: 3, status: "current", isLast: true, children: _jsx(NextPhaseButton, { nextPhase: "sections" }) }))] }) }));
}
function ColorSwatch({ label, colorName }) {
    const colors = colorMap[colorName] || colorMap.stone;
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex gap-0.5 mb-2", children: [_jsx("div", { className: "flex-1 h-14 rounded-l-md", style: { backgroundColor: colors.light }, title: `${colorName}-300` }), _jsx("div", { className: "flex-[2] h-14", style: { backgroundColor: colors.base }, title: `${colorName}-500` }), _jsx("div", { className: "flex-1 h-14 rounded-r-md", style: { backgroundColor: colors.dark }, title: `${colorName}-600` })] }), _jsx("p", { className: "text-sm font-medium text-stone-900 dark:text-stone-100", children: label }), _jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400", children: colorName })] }));
}
