import { jsx as _jsx } from "react/jsx-runtime";
import SectionRenderer from './SectionRenderer';
export const PreviewContent = ({ sectionId }) => {
    return (_jsx("main", { className: "flex-1 overflow-auto", children: _jsx(SectionRenderer, { sectionId: sectionId }) }));
};
