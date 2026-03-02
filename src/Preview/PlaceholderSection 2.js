import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getSectionLabel, getSectionDescription, getSectionIcon } from './sectionRegistry';
const PlaceholderSection = ({ sectionId }) => {
    const label = getSectionLabel(sectionId);
    const description = getSectionDescription(sectionId);
    const IconComponent = getSectionIcon(sectionId);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full bg-white dark:bg-stone-800 rounded-lg shadow-lg p-8 text-center", children: [IconComponent && (_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "p-4 bg-lime-100 dark:bg-lime-900 rounded-full", children: _jsx(IconComponent, { className: "w-8 h-8 text-lime-600 dark:text-lime-300" }) }) })), _jsx("h2", { className: "text-2xl font-bold text-stone-900 dark:text-white mb-3", children: label }), _jsx("p", { className: "text-stone-600 dark:text-stone-300 mb-6 leading-relaxed", children: description }), _jsx("div", { className: "pt-6 border-t border-stone-200 dark:border-stone-700", children: _jsx("p", { className: "text-sm text-stone-500 dark:text-stone-400", children: "Coming soon... This section is being prepared for preview." }) })] }) }));
};
export default PlaceholderSection;
