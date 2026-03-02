import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/utils";
function ListItem({ title, subtitle, icon: Icon, to, onClick, leftContent, showChevron = true, className, }) {
    const content = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-start gap-4 min-w-0", children: [leftContent || (Icon && (_jsx(IconBox, { children: _jsx(Icon, { className: "w-4 h-4 text-stone-600 dark:text-stone-300", strokeWidth: 1.5 }) }))), _jsxs("div", { className: "min-w-0", children: [_jsx("span", { className: "font-medium text-stone-900 dark:text-stone-100 truncate block", children: title }), subtitle && (_jsx("p", { className: "text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1", children: subtitle }))] })] }), showChevron && (_jsx(ChevronRight, { className: "w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0", strokeWidth: 1.5 }))] }));
    const baseStyles = cn("w-full px-6 py-4 flex items-center justify-between gap-4 text-left", "hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors", className);
    if (to) {
        return (_jsx(Link, { to: to, className: baseStyles, children: content }));
    }
    return (_jsx("button", { onClick: onClick, className: baseStyles, children: content }));
}
function DividedList({ children, className }) {
    return (_jsx("ul", { className: cn("divide-y divide-stone-200 dark:divide-stone-700", className), children: React.Children.map(children, (child) => (_jsx("li", { children: child }))) }));
}
export { ListItem, DividedList };
