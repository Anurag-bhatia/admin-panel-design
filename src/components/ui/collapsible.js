import { jsx as _jsx } from "react/jsx-runtime";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";
function Collapsible({ className, ...props }) {
    return (_jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", className: cn(className), ...props }));
}
function CollapsibleTrigger({ className, ...props }) {
    return (_jsx(CollapsiblePrimitive.Trigger, { "data-slot": "collapsible-trigger", className: cn(className), ...props }));
}
function CollapsibleContent({ className, ...props }) {
    return (_jsx(CollapsiblePrimitive.Content, { "data-slot": "collapsible-content", className: cn("data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down overflow-hidden", className), ...props }));
}
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
