import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListItem, DividedList } from '@/components/ui/list-item';
import { IconBox } from '@/components/ui/icon-box';
export function SectionsCard({ roadmap, onSectionClick }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Sections" }) }), _jsx(CardContent, { className: "p-0", children: _jsx(DividedList, { children: roadmap.sections.map((section) => (_jsx(ListItem, { title: section.title, subtitle: section.description, onClick: () => onSectionClick(section.id), leftContent: _jsx(IconBox, { size: "sm", children: _jsx("span", { className: "text-xs font-medium text-stone-600 dark:text-stone-300", children: section.order }) }) }, section.id))) }) })] }));
}
