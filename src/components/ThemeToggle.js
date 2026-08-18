import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });
    useEffect(() => {
        const root = document.documentElement;
        const applyTheme = (theme) => {
            if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', systemDark);
            }
            else {
                root.classList.toggle('dark', theme === 'dark');
            }
        };
        applyTheme(theme);
        localStorage.setItem('theme', theme);
        // Listen for system theme changes when in system mode
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'light')
                return 'dark';
            if (prev === 'dark')
                return 'system';
            return 'light';
        });
    };
    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return (_jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, className: "w-8 h-8 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100", title: `Theme: ${theme}`, children: isDark ? (_jsx(Moon, { className: "w-4 h-4", strokeWidth: 1.5 })) : (_jsx(Sun, { className: "w-4 h-4", strokeWidth: 1.5 })) }));
}
