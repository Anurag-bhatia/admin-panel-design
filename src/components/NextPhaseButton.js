import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Boxes, Layout, LayoutList, Package, ArrowRight } from 'lucide-react';
const phaseConfig = {
    'data-model': { label: 'Data Model', icon: Boxes, path: '/data-model' },
    'design': { label: 'Design', icon: Layout, path: '/design' },
    'sections': { label: 'Sections', icon: LayoutList, path: '/sections' },
    'export': { label: 'Export', icon: Package, path: '/export' },
};
export function NextPhaseButton({ nextPhase }) {
    const navigate = useNavigate();
    const config = phaseConfig[nextPhase];
    const Icon = config.icon;
    return (_jsxs("button", { onClick: () => navigate(config.path), className: "w-full flex items-center justify-between gap-4 px-6 py-4 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors group", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: "w-5 h-5", strokeWidth: 1.5 }), _jsxs("span", { className: "font-medium", children: ["Continue to ", config.label] })] }), _jsx(ArrowRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-1", strokeWidth: 1.5 })] }));
}
