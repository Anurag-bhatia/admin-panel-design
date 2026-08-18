import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, GripVertical, Layout, Smartphone, Tablet, Monitor, AlertCircle, UserPlus, Users, Scale, Handshake, CreditCard, MessageSquare, HeadphonesIcon, BarChart3, UsersRound, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { loadScreenDesignComponent, sectionUsesShell } from '@/lib/section-loader';
import { loadAppShell, hasShellComponents, loadShellInfo } from '@/lib/shell-loader';
import { loadProductData } from '@/lib/product-loader';
import React from 'react';
const MIN_WIDTH = 320;
const DEFAULT_WIDTH_PERCENT = 100;
export function ScreenDesignPage() {
    const { sectionId, screenDesignName } = useParams();
    const navigate = useNavigate();
    const [widthPercent, setWidthPercent] = useState(DEFAULT_WIDTH_PERCENT);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    // Load product data to get section title
    const productData = useMemo(() => loadProductData(), []);
    const section = productData.roadmap?.sections.find((s) => s.id === sectionId);
    // Handle resize drag
    const handleMouseDown = useCallback(() => {
        isDragging.current = true;
        const handleMouseMove = (e) => {
            if (!isDragging.current || !containerRef.current)
                return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerCenter = containerRect.left + containerWidth / 2;
            // Calculate distance from center
            const distanceFromCenter = Math.abs(e.clientX - containerCenter);
            const maxDistance = containerWidth / 2;
            // Convert to percentage (distance from center * 2 = total width)
            let newWidthPercent = (distanceFromCenter / maxDistance) * 100;
            // Clamp between min width and 100%
            const minPercent = (MIN_WIDTH / containerWidth) * 100;
            newWidthPercent = Math.max(minPercent, Math.min(100, newWidthPercent));
            setWidthPercent(newWidthPercent);
        };
        const handleMouseUp = () => {
            isDragging.current = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
    }, []);
    const previewWidth = `${widthPercent}%`;
    return (_jsxs("div", { className: "h-screen bg-stone-100 dark:bg-stone-900 animate-fade-in flex flex-col overflow-hidden", children: [_jsx("header", { className: "border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shrink-0 z-50", children: _jsxs("div", { className: "px-4 py-2 flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate(`/sections/${sectionId}`), className: "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 -ml-2", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2", strokeWidth: 1.5 }), "Back"] }), _jsx("div", { className: "h-4 w-px bg-stone-200 dark:bg-stone-700" }), _jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(Layout, { className: "w-4 h-4 text-stone-400 shrink-0", strokeWidth: 1.5 }), section && (_jsx("span", { className: "text-sm text-stone-500 dark:text-stone-400 truncate", children: section.title })), _jsx("span", { className: "text-stone-300 dark:text-stone-600", children: "/" }), _jsx("span", { className: "text-sm font-medium text-stone-700 dark:text-stone-300 truncate", children: screenDesignName })] }), _jsxs("div", { className: "ml-auto flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-1 border-r border-stone-200 dark:border-stone-700 pr-4", children: [_jsx("button", { onClick: () => setWidthPercent(30), className: `p-1.5 rounded transition-colors ${widthPercent <= 40
                                                ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                                                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`, title: "Mobile (30%)", children: _jsx(Smartphone, { className: "w-4 h-4", strokeWidth: 1.5 }) }), _jsx("button", { onClick: () => setWidthPercent(60), className: `p-1.5 rounded transition-colors ${widthPercent > 40 && widthPercent <= 60
                                                ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                                                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`, title: "Tablet (60%)", children: _jsx(Tablet, { className: "w-4 h-4", strokeWidth: 1.5 }) }), _jsx("button", { onClick: () => setWidthPercent(100), className: `p-1.5 rounded transition-colors ${widthPercent > 60
                                                ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                                                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`, title: "Desktop (100%)", children: _jsx(Monitor, { className: "w-4 h-4", strokeWidth: 1.5 }) })] }), _jsxs("span", { className: "text-xs text-stone-500 dark:text-stone-400 font-mono w-10 text-right", children: [Math.round(widthPercent), "%"] }), _jsx(ThemeToggle, {}), _jsxs("a", { href: `/sections/${sectionId}/screen-designs/${screenDesignName}/fullscreen`, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors", children: [_jsx(Maximize2, { className: "w-3.5 h-3.5", strokeWidth: 1.5 }), "Fullscreen"] })] })] }) }), _jsxs("div", { ref: containerRef, className: "flex-1 overflow-hidden flex items-stretch justify-center p-6", children: [_jsx("div", { className: "w-4 flex items-center justify-center cursor-ew-resize group shrink-0", onMouseDown: handleMouseDown, children: _jsx("div", { className: "w-1 h-16 rounded-full bg-stone-300 dark:bg-stone-600 group-hover:bg-stone-400 dark:group-hover:bg-stone-500 transition-colors flex items-center justify-center", children: _jsx(GripVertical, { className: "w-3 h-3 text-stone-500 dark:text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity", strokeWidth: 2 }) }) }), _jsx("div", { className: "bg-white dark:bg-stone-950 rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden", style: { width: previewWidth, minWidth: MIN_WIDTH, maxWidth: '100%' }, children: _jsx("iframe", { src: `/sections/${sectionId}/screen-designs/${screenDesignName}/fullscreen`, className: "w-full h-full border-0", title: "Screen Design Preview" }) }), _jsx("div", { className: "w-4 flex items-center justify-center cursor-ew-resize group shrink-0", onMouseDown: handleMouseDown, children: _jsx("div", { className: "w-1 h-16 rounded-full bg-stone-300 dark:bg-stone-600 group-hover:bg-stone-400 dark:group-hover:bg-stone-500 transition-colors flex items-center justify-center", children: _jsx(GripVertical, { className: "w-3 h-3 text-stone-500 dark:text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity", strokeWidth: 2 }) }) })] })] }));
}
/**
 * Fullscreen version of a screen design (for screenshots)
 * Syncs theme with parent window via localStorage
 * Wraps screen design in AppShell if shell components exist
 */
export function ScreenDesignFullscreen() {
    const { sectionId, screenDesignName } = useParams();
    // Load screen design component
    const ScreenDesignComponent = useMemo(() => {
        if (!sectionId || !screenDesignName)
            return null;
        const loader = loadScreenDesignComponent(sectionId, screenDesignName);
        if (!loader)
            return null;
        // Wrap the loader to handle potential export issues
        return React.lazy(async () => {
            try {
                const module = await loader();
                if (module && typeof module.default === 'function') {
                    return module;
                }
                console.error('Screen design does not have a valid default export:', screenDesignName);
                return { default: () => _jsxs("div", { children: ["Invalid screen design: ", screenDesignName] }) };
            }
            catch (e) {
                console.error('Failed to load screen design:', screenDesignName, e);
                return { default: () => _jsxs("div", { children: ["Failed to load: ", screenDesignName] }) };
            }
        });
    }, [sectionId, screenDesignName]);
    // Load AppShell component if it exists AND this section uses the shell
    const AppShellComponent = useMemo(() => {
        // Check if this section should use the shell (based on spec.md config)
        if (sectionId && !sectionUsesShell(sectionId)) {
            console.log('[ScreenDesignFullscreen] Section configured to not use shell');
            return null;
        }
        // Check if shell components exist
        const shellExists = hasShellComponents();
        console.log('[ScreenDesignFullscreen] Shell exists:', shellExists);
        if (!shellExists)
            return null;
        const loader = loadAppShell();
        console.log('[ScreenDesignFullscreen] AppShell loader:', loader);
        if (!loader) {
            console.warn('[ScreenDesignFullscreen] hasShellComponents() returned true but loadAppShell() returned null');
            return null;
        }
        // Wrap the loader to provide default props to the shell
        return React.lazy(async () => {
            try {
                const module = await loader();
                const ShellComponent = (module?.default || module?.AppShell);
                if (typeof ShellComponent !== 'function') {
                    console.warn('[ScreenDesignFullscreen] AppShell does not have a valid export');
                    return { default: ({ children }) => _jsx(_Fragment, { children: children }) };
                }
                // Create a wrapper that provides default props to the shell
                const ShellWrapper = ({ children }) => {
                    // Icon mapping for navigation items
                    const iconMap = {
                        incidents: AlertCircle,
                        leads: UserPlus,
                        subscribers: Users,
                        lawyers: Scale,
                        partners: Handshake,
                        payments: CreditCard,
                        disputes: MessageSquare,
                        support: HeadphonesIcon,
                        reports: BarChart3,
                        team: UsersRound,
                    };
                    // Try to get navigation items from shell spec
                    const shellInfo = loadShellInfo();
                    const specNavItems = shellInfo?.spec?.navigationItems || [];
                    // Parse navigation items from spec (format: "**Label** → Description")
                    const navigationItems = specNavItems.length > 0
                        ? specNavItems.map((item) => {
                            // Extract label from **Label** format
                            const labelMatch = item.match(/\*\*([^*]+)\*\*/);
                            const label = labelMatch ? labelMatch[1] : item.split('→')[0]?.trim() || `Item`;
                            const href = `/${label.toLowerCase().replace(/\s+/g, '-')}`;
                            const sectionKey = label.toLowerCase().replace(/\s+/g, '-');
                            const icon = iconMap[sectionKey];
                            // Set active based on current sectionId
                            const isActive = sectionId ? href === `/${sectionId.toLowerCase()}` : false;
                            return {
                                label,
                                href,
                                icon,
                                isActive,
                            };
                        })
                        : [
                            { label: 'Dashboard', href: '/', icon: Layout, isActive: sectionId === 'dashboard' },
                            { label: 'Items', href: '/items', icon: Users, isActive: sectionId === 'items' },
                            { label: 'Settings', href: '/settings', icon: AlertCircle, isActive: sectionId === 'settings' },
                        ];
                    const defaultUser = {
                        name: 'Demo User',
                    };
                    // Pass props dynamically - the shell component decides what it needs
                    return (_jsx(ShellComponent, { navigationItems: navigationItems, user: defaultUser, onNavigate: () => { }, onLogout: () => { }, children: children }));
                };
                return { default: ShellWrapper };
            }
            catch (e) {
                console.error('[ScreenDesignFullscreen] Failed to load AppShell:', e);
                return { default: ({ children }) => _jsx(_Fragment, { children: children }) };
            }
        });
    }, [sectionId]); // Depends on sectionId to check section-specific shell config
    // Sync theme with parent window
    useEffect(() => {
        const applyTheme = () => {
            const theme = localStorage.getItem('theme') || 'system';
            const root = document.documentElement;
            if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', systemDark);
            }
            else {
                root.classList.toggle('dark', theme === 'dark');
            }
        };
        // Apply on mount
        applyTheme();
        // Listen for storage changes (from parent window)
        const handleStorageChange = (e) => {
            if (e.key === 'theme') {
                applyTheme();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        // Also poll for changes since storage event doesn't fire in same window
        const interval = setInterval(applyTheme, 100);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);
    if (!ScreenDesignComponent) {
        return (_jsx("div", { className: "h-screen flex items-center justify-center bg-background", children: _jsx("p", { className: "text-stone-600 dark:text-stone-400", children: "Screen design not found." }) }));
    }
    // If shell exists, wrap screen design in AppShell
    if (AppShellComponent) {
        return (_jsx(Suspense, { fallback: _jsx("div", { className: "h-screen flex items-center justify-center bg-background", children: _jsx("div", { className: "text-stone-500 dark:text-stone-400", children: "Loading..." }) }), children: _jsx(AppShellComponent, { children: _jsx(ScreenDesignComponent, {}) }) }));
    }
    // No shell, render screen design directly
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "h-screen flex items-center justify-center bg-background", children: _jsx("div", { className: "text-stone-500 dark:text-stone-400", children: "Loading..." }) }), children: _jsx(ScreenDesignComponent, {}) }));
}
