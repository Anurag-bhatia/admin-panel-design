import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { FileText, Boxes, Layout, LayoutList, Package } from 'lucide-react';
import { loadProductData, hasExportZip } from '@/lib/product-loader';
import { getAllSectionIds, getSectionScreenDesigns } from '@/lib/section-loader';
const phases = [
    { id: 'product', label: 'Product', icon: FileText, path: '/' },
    { id: 'data-model', label: 'Data Model', icon: Boxes, path: '/data-model' },
    { id: 'design', label: 'Design', icon: Layout, path: '/design' },
    { id: 'sections', label: 'Sections', icon: LayoutList, path: '/sections' },
    { id: 'export', label: 'Export', icon: Package, path: '/export' },
];
function usePhaseStatuses() {
    const location = useLocation();
    const productData = useMemo(() => loadProductData(), []);
    // Calculate completion status for each phase
    const hasOverview = !!productData.overview;
    const hasRoadmap = !!productData.roadmap;
    const hasDataModel = !!productData.dataModel;
    const hasDesignSystem = !!productData.designSystem;
    const hasShell = !!productData.shell;
    const sectionIds = useMemo(() => getAllSectionIds(), []);
    const sectionsWithScreenDesigns = useMemo(() => {
        return sectionIds.filter(id => getSectionScreenDesigns(id).length > 0).length;
    }, [sectionIds]);
    const hasSections = sectionsWithScreenDesigns > 0;
    // Determine current phase from URL
    const currentPath = location.pathname;
    let currentPhaseId = 'product';
    if (currentPath === '/' || currentPath === '/product') {
        currentPhaseId = 'product';
    }
    else if (currentPath === '/data-model') {
        currentPhaseId = 'data-model';
    }
    else if (currentPath === '/design' || currentPath === '/design-system' || currentPath.startsWith('/shell')) {
        currentPhaseId = 'design';
    }
    else if (currentPath === '/sections' || currentPath.startsWith('/sections/')) {
        currentPhaseId = 'sections';
    }
    else if (currentPath === '/export') {
        currentPhaseId = 'export';
    }
    // Check if export zip exists
    const exportZipExists = hasExportZip();
    // Determine completion status
    const phaseComplete = {
        'product': hasOverview && hasRoadmap,
        'data-model': hasDataModel,
        'design': hasDesignSystem || hasShell,
        'sections': hasSections,
        'export': exportZipExists,
    };
    return phases.map(phase => {
        const isComplete = phaseComplete[phase.id];
        let status;
        if (phase.id === currentPhaseId) {
            status = 'current';
        }
        else if (isComplete) {
            status = 'completed';
        }
        else {
            status = 'upcoming';
        }
        return { phase, status, isComplete };
    });
}
export function PhaseNav() {
    const navigate = useNavigate();
    const phaseInfos = usePhaseStatuses();
    return (_jsx("nav", { className: "flex items-center justify-center", children: phaseInfos.map(({ phase, status, isComplete }, index) => {
            const Icon = phase.icon;
            const isFirst = index === 0;
            return (_jsxs("div", { className: "flex items-center", children: [!isFirst && (_jsx("div", { className: `w-4 sm:w-8 lg:w-12 h-px transition-colors duration-200 ${status === 'upcoming'
                            ? 'bg-stone-200 dark:bg-stone-700'
                            : 'bg-stone-400 dark:bg-stone-500'}` })), _jsxs("button", { onClick: () => navigate(phase.path), className: `
                group relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 whitespace-nowrap
                ${status === 'current'
                            ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-sm'
                            : status === 'completed'
                                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'}
              `, children: [_jsx(Icon, { className: `w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${status === 'current' ? '' : status === 'completed' ? '' : 'opacity-60'}`, strokeWidth: 1.5 }), _jsx("span", { className: `text-sm font-medium hidden sm:inline ${status === 'upcoming' ? 'opacity-60' : ''}`, children: phase.label }), isComplete && (_jsx("span", { className: "absolute -top-1 -left-1 w-4 h-4 rounded-full bg-lime-500 flex items-center justify-center shadow-sm", children: _jsx("svg", { className: "w-2.5 h-2.5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) }))] })] }, phase.id));
        }) }));
}
export { phases };
