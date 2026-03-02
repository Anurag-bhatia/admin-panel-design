import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { getComponentForSection, isImplemented, getSectionLabel, } from './sectionRegistry';
import PlaceholderSection from './PlaceholderSection';
const SectionRenderer = ({ sectionId, subRoute }) => {
    const Component = getComponentForSection(sectionId);
    const label = getSectionLabel(sectionId);
    // Handle Sales CRM sub-routes
    if (sectionId === 'leads') {
        if (subRoute === 'my') {
            // Load My Leads component
            const MyLeadsComponent = React.lazy(() => import('../sections/sales-crm/MyLeads'));
            return (_jsx(Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-semibold text-stone-900 dark:text-stone-100", children: "Loading My Leads..." }), _jsx("div", { className: "mt-2 text-sm text-stone-500 dark:text-stone-400", children: "Please wait while we prepare your personal command center" })] }) }), children: _jsx(MyLeadsComponent, {}) }));
        }
        // Default to "All Leads" view (subRoute === 'all' or empty)
    }
    // If section is not implemented, show placeholder
    if (!isImplemented(sectionId)) {
        return _jsx(PlaceholderSection, { sectionId: sectionId });
    }
    // If component exists, render it with suspense boundary
    if (Component) {
        return (_jsx(Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-semibold text-stone-900 dark:text-stone-100", children: ["Loading ", label, "..."] }), _jsx("div", { className: "mt-2 text-sm text-stone-500 dark:text-stone-400", children: "Please wait while we prepare the section" })] }) }), children: _jsx(Component, {}) }));
    }
    // Fallback if something went wrong
    return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-semibold text-red-600 dark:text-red-400", children: ["Error loading ", label] }), _jsx("div", { className: "mt-2 text-sm text-stone-500 dark:text-stone-400", children: "The section could not be loaded. Please refresh the page or contact support." })] }) }));
};
export default SectionRenderer;
