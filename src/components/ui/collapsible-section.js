import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
function CollapsibleSection({ title, count, children, defaultOpen = false, className, }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (_jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, className: className, children: [_jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full py-2 text-left group", children: [_jsxs("span", { className: "text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide", children: [title, count !== undefined && (_jsxs("span", { className: "ml-2 text-stone-400 dark:text-stone-500 normal-case tracking-normal", children: ["(", count, ")"] }))] }), _jsx(ChevronDown, { className: cn("w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform", isOpen && "rotate-180"), strokeWidth: 1.5 })] }), _jsx(CollapsibleContent, { children: _jsx("div", { className: "pt-2", children: children }) })] }));
}
export { CollapsibleSection };
