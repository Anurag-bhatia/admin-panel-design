import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function SectionLabel({ children, className }) {
    return (_jsx("h4", { className: cn("text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide", className), children: children }));
}
export { SectionLabel };
