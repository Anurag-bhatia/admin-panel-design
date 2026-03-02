import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/components/AppLayout';
import { EmptyState } from '@/components/EmptyState';
import { PhaseWarningBanner } from '@/components/PhaseWarningBanner';
import { NextPhaseButton } from '@/components/NextPhaseButton';
import { loadProductData } from '@/lib/product-loader';
import { getSectionScreenDesigns, getSectionScreenshots, hasSectionSpec, hasSectionData } from '@/lib/section-loader';
import { ChevronRight, Check, Circle } from 'lucide-react';
function getSectionProgress(sectionId) {
    const screenDesigns = getSectionScreenDesigns(sectionId);
    const screenshots = getSectionScreenshots(sectionId);
    return {
        hasSpec: hasSectionSpec(sectionId),
        hasData: hasSectionData(sectionId),
        hasScreenDesigns: screenDesigns.length > 0,
        screenDesignCount: screenDesigns.length,
        hasScreenshots: screenshots.length > 0,
        screenshotCount: screenshots.length,
    };
}
export function SectionsPage() {
    const navigate = useNavigate();
    const productData = useMemo(() => loadProductData(), []);
    const sections = productData.roadmap?.sections || [];
    // Calculate progress for each section
    const sectionProgressMap = useMemo(() => {
        const map = {};
        for (const section of sections) {
            map[section.id] = getSectionProgress(section.id);
        }
        return map;
    }, [sections]);
    // Count completed sections (those with spec, data, AND screen designs)
    const completedSections = sections.filter(s => {
        const p = sectionProgressMap[s.id];
        return p?.hasSpec && p?.hasData && p?.hasScreenDesigns;
    }).length;
    return (_jsx(AppLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2", children: "Sections" }), _jsx("p", { className: "text-stone-600 dark:text-stone-400", children: "Design each section of your product with specifications, sample data, and screen designs." }), sections.length > 0 && (_jsxs("p", { className: "text-sm text-stone-500 dark:text-stone-400 mt-2", children: [completedSections, " of ", sections.length, " sections completed"] }))] }), _jsx(PhaseWarningBanner, {}), sections.length === 0 ? (_jsx(EmptyState, { type: "roadmap" })) : (_jsxs(Card, { className: "border-stone-200 dark:border-stone-700 shadow-sm", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg font-semibold text-stone-900 dark:text-stone-100", children: "All Sections" }) }), _jsx(CardContent, { className: "p-0", children: _jsx("ul", { className: "divide-y divide-stone-200 dark:divide-stone-700", children: sections.map((section) => {
                                    const progress = sectionProgressMap[section.id];
                                    const isComplete = progress?.hasSpec && progress?.hasData && progress?.hasScreenDesigns;
                                    return (_jsx("li", { children: _jsxs("button", { onClick: () => navigate(`/sections/${section.id}`), className: "w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors", children: [_jsxs("div", { className: "flex items-start gap-4 min-w-0", children: [_jsx("div", { className: "shrink-0 mt-0.5", children: isComplete ? (_jsx("div", { className: "w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center", children: _jsx(Check, { className: "w-3.5 h-3.5 text-lime-600 dark:text-lime-400", strokeWidth: 2.5 }) })) : (_jsx("div", { className: "w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-stone-600 dark:text-stone-400", children: section.order }) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "font-medium text-stone-900 dark:text-stone-100 truncate", children: section.title }), _jsx("p", { className: "text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1", children: section.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsx(ProgressDot, { label: "Spec", done: progress?.hasSpec }), _jsx(ProgressDot, { label: "Data", done: progress?.hasData }), _jsx(ProgressDot, { label: progress?.screenDesignCount ? `${progress.screenDesignCount} screen design${progress.screenDesignCount !== 1 ? 's' : ''}` : 'Screen Designs', done: progress?.hasScreenDesigns }), _jsx(ProgressDot, { label: progress?.screenshotCount ? `${progress.screenshotCount} screenshot${progress.screenshotCount !== 1 ? 's' : ''}` : 'Screenshots', done: progress?.hasScreenshots, optional: true })] })] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0", strokeWidth: 1.5 })] }) }, section.id));
                                }) }) })] })), sections.length > 0 && completedSections === sections.length && (_jsx(NextPhaseButton, { nextPhase: "export" }))] }) }));
}
function ProgressDot({ label, done, optional }) {
    return (_jsxs("span", { className: `flex items-center gap-1 text-xs ${done
            ? 'text-stone-700 dark:text-stone-300'
            : optional
                ? 'text-stone-300 dark:text-stone-600'
                : 'text-stone-400 dark:text-stone-500'}`, children: [done ? (_jsx(Check, { className: "w-3 h-3 text-lime-600 dark:text-lime-400", strokeWidth: 2.5 })) : (_jsx(Circle, { className: `w-3 h-3 ${optional ? 'opacity-50' : ''}`, strokeWidth: 1.5 })), label] }));
}
