import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function BulletList({ items, className, spacing = "default", }) {
    const spacingClass = {
        tight: "space-y-1.5",
        default: "space-y-2",
        loose: "space-y-3",
    }[spacing];
    return (_jsx("ul", { className: cn(spacingClass, className), children: items.map((item, index) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" }), _jsx("span", { className: "text-stone-700 dark:text-stone-300 text-sm", children: item })] }, index))) }));
}
function MutedBulletList({ items, className }) {
    return (_jsx("ul", { className: cn("space-y-2", className), children: items.map((item, index) => (_jsxs("li", { className: "flex items-start gap-3 text-stone-700 dark:text-stone-300", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 mt-2 shrink-0" }), item] }, index))) }));
}
export { BulletList, MutedBulletList };
