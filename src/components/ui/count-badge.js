import { jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function CountBadge({ count, label, singularLabel, className, }) {
    const displayLabel = label
        ? count === 1 && singularLabel
            ? singularLabel
            : label
        : undefined;
    return (_jsxs("span", { className: cn("text-xs font-medium text-stone-500 dark:text-stone-400", "bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded", className), children: [count, displayLabel && ` ${displayLabel}`] }));
}
export { CountBadge };
