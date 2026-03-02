import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, Map, ClipboardList, Database, Layout, Package, Boxes, Palette, PanelLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { IconBox } from '@/components/ui/icon-box';
const config = {
    overview: {
        icon: FileText,
        title: 'No product defined yet',
        command: '/product-vision',
        description: 'Define your product vision, key problems, and features',
    },
    roadmap: {
        icon: Map,
        title: 'No roadmap defined yet',
        command: '/product-roadmap',
        description: 'Break down your product into development sections',
    },
    spec: {
        icon: ClipboardList,
        title: 'No specification defined yet',
        command: '/shape-section',
        description: 'Define the user flows and UI requirements',
    },
    data: {
        icon: Database,
        title: 'No sample data generated yet',
        command: '/sample-data',
        description: 'Create realistic sample data for screen designs',
    },
    'screen-designs': {
        icon: Layout,
        title: 'No screen designs created yet',
        command: '/design-screen',
        description: 'Create screen designs for this section',
    },
    'data-model': {
        icon: Boxes,
        title: 'No data model defined yet',
        command: '/data-model',
        description: 'Define the core entities and relationships',
    },
    'design-system': {
        icon: Palette,
        title: 'No design tokens defined yet',
        command: '/design-tokens',
        description: 'Choose colors and typography for your product',
    },
    shell: {
        icon: PanelLeft,
        title: 'No application shell designed yet',
        command: '/design-shell',
        description: 'Design the navigation and layout',
    },
    export: {
        icon: Package,
        title: 'Ready to export',
        command: '/export-product',
        description: 'Generate the complete handoff package',
    },
};
export function EmptyState({ type }) {
    const { icon: Icon, title, command, description } = config[type];
    return (_jsx(Card, { className: "border-dashed", children: _jsx(CardContent, { className: "py-8", children: _jsxs("div", { className: "flex flex-col items-center text-center max-w-sm mx-auto", children: [_jsx(IconBox, { size: "lg", variant: "muted", className: "mb-3", children: _jsx(Icon, { className: "w-5 h-5 text-stone-400 dark:text-stone-500", strokeWidth: 1.5 }) }), _jsx("h3", { className: "text-base font-medium text-stone-600 dark:text-stone-400 mb-1", children: title }), _jsx("p", { className: "text-sm text-stone-500 dark:text-stone-400 mb-4", children: description }), _jsxs("div", { className: "bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 w-full", children: [_jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400 mb-0.5", children: "Run in Claude Code:" }), _jsx("code", { className: "text-sm font-mono text-stone-700 dark:text-stone-300", children: command })] })] }) }) }));
}
