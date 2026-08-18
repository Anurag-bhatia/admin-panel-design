import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListItem, DividedList } from '@/components/ui/list-item';
import { Layout } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
export function ScreenDesignsCard({ screenDesigns, sectionId }) {
    if (screenDesigns.length === 0) {
        return _jsx(EmptyState, { type: "screen-designs" });
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Screen Designs" }) }), _jsx(CardContent, { className: "p-0", children: _jsx(DividedList, { children: screenDesigns.map((screenDesign) => (_jsx(ListItem, { title: screenDesign.name, icon: Layout, to: `/sections/${sectionId}/screen-designs/${screenDesign.name}` }, screenDesign.name))) }) })] }));
}
