import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PreviewContent } from './PreviewContent';
import { PreviewSidebar } from './PreviewSidebar';
import { usePreviewState } from './usePreviewState';
export function PreviewPage() {
    const { activeSection, setActiveSection } = usePreviewState();
    return (_jsxs("div", { className: "flex h-screen bg-stone-50 dark:bg-stone-950", children: [_jsx(PreviewSidebar, { activeSection: activeSection, onSectionChange: setActiveSection }), _jsx(PreviewContent, { sectionId: activeSection })] }));
}
