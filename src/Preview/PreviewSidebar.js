import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SECTION_IDS, getSectionLabel, getSectionIcon } from './sectionRegistry';
export const PreviewSidebar = ({ activeSection, onSectionChange, }) => {
    return (_jsxs("aside", { className: "w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-y-auto", children: [_jsx("div", { className: "p-6 border-b border-stone-200 dark:border-stone-800", children: _jsx("h1", { className: "text-2xl font-bold text-stone-900 dark:text-white", children: "Preview Sections" }) }), _jsx("nav", { className: "p-4 space-y-2", children: SECTION_IDS.map((sectionId) => {
                    const label = getSectionLabel(sectionId);
                    const Icon = getSectionIcon(sectionId);
                    const isActive = activeSection === sectionId;
                    return (_jsxs("button", { onClick: () => onSectionChange(sectionId), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${isActive
                            ? 'bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 font-medium'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`, children: [Icon && _jsx(Icon, { className: "w-5 h-5 flex-shrink-0" }), _jsx("span", { className: "flex-1 truncate", children: label })] }, sectionId));
                }) })] }));
};
