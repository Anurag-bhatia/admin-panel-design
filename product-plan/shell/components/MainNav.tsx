import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { NavigationItem } from './AppShell'

export interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
  isCollapsed?: boolean
  darkMode?: boolean
}

export function MainNav({ items, onNavigate, isCollapsed = false, darkMode = false }: MainNavProps) {
  // Auto-expand items that have active children
  const getInitialExpanded = () => {
    const expanded = new Set<string>()
    items.forEach(item => {
      if (item.children?.some(child => child.isActive)) {
        expanded.add(item.href)
      }
    })
    return expanded
  }

  const [expandedItems, setExpandedItems] = useState<Set<string>>(getInitialExpanded())

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(href)) {
      newExpanded.delete(href)
    } else {
      newExpanded.add(href)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <ul className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedItems.has(item.href) && !isCollapsed
          const hasActiveChild = item.children?.some(child => child.isActive)

          return (
            <li key={item.href}>
              <button
                onClick={() => {
                  if (hasChildren && !isCollapsed) {
                    toggleExpanded(item.href)
                  } else {
                    onNavigate?.(item.href)
                  }
                }}
                className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors ${
                  isCollapsed ? 'justify-center px-3 py-2.5' : 'space-x-3 px-3 py-2.5'
                } ${
                  item.isActive
                    ? 'bg-cyan-600 text-white'
                    : hasActiveChild
                    ? darkMode
                      ? 'bg-cyan-900/30 text-cyan-300'
                      : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                    : darkMode
                    ? 'text-zinc-300 hover:bg-zinc-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon && (
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      item.isActive
                        ? 'text-white'
                        : hasActiveChild
                        ? darkMode
                          ? 'text-cyan-400'
                          : 'text-cyan-600 dark:text-cyan-400'
                        : darkMode
                        ? 'text-zinc-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                )}
                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {hasChildren && (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      )
                    )}
                  </>
                )}
              </button>

              {/* Sub-navigation */}
              {hasChildren && isExpanded && !isCollapsed && (
                <ul className="mt-1 space-y-1 pl-8">
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <button
                        onClick={() => onNavigate?.(child.href)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          child.isActive
                            ? 'bg-cyan-600 text-white'
                            : darkMode
                            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
