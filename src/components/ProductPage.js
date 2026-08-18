import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadProductData } from '@/lib/product-loader';
import { AppLayout } from '@/components/AppLayout';
import { EmptyState } from '@/components/EmptyState';
import { ProductOverviewCard } from '@/components/ProductOverviewCard';
import { SectionsCard } from '@/components/SectionsCard';
import { StepIndicator } from '@/components/StepIndicator';
import { NextPhaseButton } from '@/components/NextPhaseButton';
/**
 * Determine the status of each step on the Product page
 * Steps: 1. Product Vision, 2. Roadmap
 */
function getProductPageStepStatuses(hasOverview, hasRoadmap) {
    const statuses = [];
    // Step 1: Product Vision
    if (hasOverview) {
        statuses.push('completed');
    }
    else {
        statuses.push('current');
    }
    // Step 2: Roadmap
    if (hasRoadmap) {
        statuses.push('completed');
    }
    else if (hasOverview) {
        statuses.push('current');
    }
    else {
        statuses.push('upcoming');
    }
    return statuses;
}
export function ProductPage() {
    const navigate = useNavigate();
    const productData = useMemo(() => loadProductData(), []);
    const hasOverview = !!productData.overview;
    const hasRoadmap = !!productData.roadmap;
    const allStepsComplete = hasOverview && hasRoadmap;
    const stepStatuses = getProductPageStepStatuses(hasOverview, hasRoadmap);
    return (_jsx(AppLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2", children: "Product Definition" }), _jsx("p", { className: "text-stone-600 dark:text-stone-400", children: "Define your product vision and break it into development sections." })] }), _jsx("div", { id: "step-overview", children: _jsx(StepIndicator, { step: 1, status: stepStatuses[0], children: productData.overview ? (_jsx(ProductOverviewCard, { overview: productData.overview })) : (_jsx(EmptyState, { type: "overview" })) }) }), _jsx("div", { id: "step-roadmap", children: _jsx(StepIndicator, { step: 2, status: stepStatuses[1], isLast: !allStepsComplete, children: productData.roadmap ? (_jsx(SectionsCard, { roadmap: productData.roadmap, onSectionClick: (sectionId) => navigate(`/sections/${sectionId}`) })) : (_jsx(EmptyState, { type: "roadmap" })) }) }), allStepsComplete && (_jsx(StepIndicator, { step: 3, status: "current", isLast: true, children: _jsx(NextPhaseButton, { nextPhase: "data-model" }) }))] }) }));
}
