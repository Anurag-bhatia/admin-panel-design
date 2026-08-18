import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const actionButtonVariants = cva("w-full flex items-center justify-between gap-4 px-6 py-4 rounded-lg transition-colors group", {
    variants: {
        variant: {
            primary: "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200",
            secondary: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});
function ActionButton({ icon: Icon, children, variant, trailingIcon = "arrow", className, ...props }) {
    const TrailingIcon = trailingIcon === "arrow" ? ArrowRight : ChevronRight;
    return (_jsxs("button", { className: cn(actionButtonVariants({ variant, className })), ...props, children: [_jsxs("div", { className: "flex items-center gap-3", children: [Icon && _jsx(Icon, { className: "w-5 h-5", strokeWidth: 1.5 }), _jsx("span", { className: "font-medium", children: children })] }), _jsx(TrailingIcon, { className: "w-5 h-5 transition-transform group-hover:translate-x-1", strokeWidth: 1.5 })] }));
}
export { ActionButton, actionButtonVariants };
