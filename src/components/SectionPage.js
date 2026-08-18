import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListItem, DividedList } from '@/components/ui/list-item';
import { IconBox } from '@/components/ui/icon-box';
import { ActionButton } from '@/components/ui/action-button';
import { AppLayout } from '@/components/AppLayout';
import { EmptyState } from '@/components/EmptyState';
import { PhaseWarningBanner } from '@/components/PhaseWarningBanner';
import { SpecCard } from '@/components/SpecCard';
import { DataCard } from '@/components/DataCard';
import { StepIndicator } from '@/components/StepIndicator';
import { loadProductData } from '@/lib/product-loader';
import { loadSectionData } from '@/lib/section-loader';
import { Layout, Image, Download, ArrowRight, LayoutList } from 'lucide-react';
/**
 * Determine the status of each step based on what data exists
 * Steps: 1. Section Overview (Spec), 2. Sample Data, 3. Screen Designs, 4. Screenshots
 */
function getStepStatuses(sectionData) {
    const hasSpec = !!sectionData?.specParsed;
    const hasData = !!sectionData?.data;
    const hasScreenDesigns = !!(sectionData?.screenDesigns && sectionData.screenDesigns.length > 0);
    const hasScreenshots = !!(sectionData?.screenshots && sectionData.screenshots.length > 0);
    const steps = [hasSpec, hasData, hasScreenDesigns, hasScreenshots];
    const firstIncomplete = steps.findIndex((done) => !done);
    return steps.map((done, index) => {
        if (done)
            return 'completed';
        if (index === firstIncomplete)
            return 'current';
        return 'upcoming';
    });
}
/**
 * Check if the required steps for a section are complete (Spec, Data, Screen Designs)
 * Screenshots are optional and don't count toward completion
 */
function areRequiredStepsComplete(sectionData) {
    const hasSpec = !!sectionData?.specParsed;
    const hasData = !!sectionData?.data;
    const hasScreenDesigns = !!(sectionData?.screenDesigns && sectionData.screenDesigns.length > 0);
    return hasSpec && hasData && hasScreenDesigns;
}
export function SectionPage() {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    // Load product data to get section info
    const productData = useMemo(() => loadProductData(), []);
    const sections = productData.roadmap?.sections || [];
    const section = sections.find((s) => s.id === sectionId);
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    // Load section-specific data (spec, data.json, screen designs, screenshots)
    const sectionData = useMemo(() => (sectionId ? loadSectionData(sectionId) : null), [sectionId]);
    // Handle missing section
    if (!section) {
        return (_jsx(AppLayout, { backTo: "/sections", backLabel: "Sections", children: _jsx("div", { className: "text-center py-12", children: _jsxs("p", { className: "text-stone-600 dark:text-stone-400", children: ["Section not found: ", sectionId] }) }) }));
    }
    const stepStatuses = getStepStatuses(sectionData);
    const requiredStepsComplete = areRequiredStepsComplete(sectionData);
    // Next section navigation logic
    const isLastSection = currentIndex === sections.length - 1 || currentIndex === -1;
    const nextSection = !isLastSection ? sections[currentIndex + 1] : null;
    return (_jsx(AppLayout, { backTo: "/sections", backLabel: "Sections", title: section.title, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2", children: section.title }), _jsx("p", { className: "text-stone-600 dark:text-stone-400", children: section.description })] }), _jsx(PhaseWarningBanner, {}), _jsx(StepIndicator, { step: 1, status: stepStatuses[0], children: _jsx(SpecCard, { spec: sectionData?.specParsed || null, sectionTitle: "Section Overview" }) }), _jsx(StepIndicator, { step: 2, status: stepStatuses[1], children: _jsx(DataCard, { data: sectionData?.data || null }) }), _jsx(StepIndicator, { step: 3, status: stepStatuses[2], children: !sectionData?.screenDesigns || sectionData.screenDesigns.length === 0 ? (_jsx(EmptyState, { type: "screen-designs" })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Screen Designs", _jsxs("span", { className: "ml-2 text-sm font-normal text-stone-500 dark:text-stone-400", children: ["(", sectionData.screenDesigns.length, ")"] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(DividedList, { children: sectionData.screenDesigns.map((screenDesign) => (_jsx(ListItem, { title: screenDesign.name, icon: Layout, to: `/sections/${sectionId}/screen-designs/${screenDesign.name}` }, screenDesign.name))) }) })] })) }), _jsx(StepIndicator, { step: 4, status: stepStatuses[3], isLast: !requiredStepsComplete, children: !sectionData?.screenshots || sectionData.screenshots.length === 0 ? (_jsx(Card, { className: "border-dashed", children: _jsx(CardContent, { className: "py-8", children: _jsxs("div", { className: "flex flex-col items-center text-center max-w-sm mx-auto", children: [_jsx(IconBox, { size: "lg", variant: "muted", className: "mb-3", children: _jsx(Image, { className: "w-5 h-5 text-stone-400 dark:text-stone-500", strokeWidth: 1.5 }) }), _jsx("h3", { className: "text-base font-medium text-stone-600 dark:text-stone-400 mb-1", children: "No screenshots captured yet" }), _jsx("p", { className: "text-sm text-stone-500 dark:text-stone-400 mb-4", children: "Capture screenshots of your screen designs for documentation" }), _jsxs("div", { className: "bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 w-full", children: [_jsx("p", { className: "text-xs text-stone-500 dark:text-stone-400 mb-0.5", children: "Run in Claude Code:" }), _jsx("code", { className: "text-sm font-mono text-stone-700 dark:text-stone-300", children: "/screenshot-design" })] })] }) }) })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Screenshots", _jsxs("span", { className: "ml-2 text-sm font-normal text-stone-500 dark:text-stone-400", children: ["(", sectionData.screenshots.length, ")"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 gap-4", children: sectionData.screenshots.map((screenshot) => (_jsxs("div", { className: "group", children: [_jsx("div", { className: "aspect-video rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700", children: _jsx("img", { src: screenshot.url, alt: screenshot.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "mt-2 flex items-center justify-between gap-2", children: [_jsx("p", { className: "text-sm text-stone-600 dark:text-stone-400 truncate", children: screenshot.name }), _jsx("a", { href: screenshot.url, download: `${screenshot.name}.png`, className: "shrink-0 p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors", title: "Download screenshot", children: _jsx(Download, { className: "w-4 h-4", strokeWidth: 1.5 }) })] })] }, screenshot.name))) }) })] })) }), requiredStepsComplete && (_jsx(StepIndicator, { step: 5, status: "current", isLast: true, children: _jsx("div", { className: "space-y-3", children: nextSection ? (_jsxs(_Fragment, { children: [_jsxs(ActionButton, { icon: ArrowRight, onClick: () => navigate(`/sections/${nextSection.id}`), children: ["Continue to ", nextSection.title] }), _jsx(ActionButton, { variant: "secondary", icon: LayoutList, trailingIcon: "chevron", onClick: () => navigate('/sections'), children: "View All Sections" })] })) : (_jsx(ActionButton, { icon: LayoutList, onClick: () => navigate('/sections'), children: "Back to All Sections" })) }) }))] }) }));
}
