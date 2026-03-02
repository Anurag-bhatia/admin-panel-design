import { useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
  children?: NavigationItem[]
}

export interface User {
  name: string
  email?: string
  avatarUrl?: string
  designation?: string
}

export interface Breadcrumb {
  label: string
  href?: string
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: User
  breadcrumbs?: Breadcrumb[]
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  breadcrumbs,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)

  // Sidebar is collapsed by default, expands on hover
  const isSidebarCollapsed = !isSidebarHovered

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar - Collapsed by default, expands on hover */}
      <aside
        className={`hidden lg:flex lg:flex-col border-r border-zinc-800 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:w-16' : 'lg:w-60'
        }`}
        style={{ backgroundColor: '#212121' }}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className={`flex items-center h-16 border-b border-zinc-800 ${
          isSidebarCollapsed ? 'justify-center px-2' : 'px-4'
        }`}>
          {isSidebarCollapsed ? (
            <span className="text-xl font-bold text-cyan-400">L</span>
          ) : (
            <img src="/logo.png" alt="Lawyered" className="h-8" />
          )}
        </div>
        <MainNav items={navigationItems} onNavigate={onNavigate} isCollapsed={isSidebarCollapsed} darkMode />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-zinc-950/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:hidden">
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Admin Panel
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <MainNav
              items={navigationItems}
              onNavigate={(href) => {
                onNavigate?.(href)
                setIsMobileMenuOpen(false)
              }}
            />
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs - Hidden for now */}
            {/* {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && (
                      <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                    )}
                    {crumb.href && index < breadcrumbs.length - 1 ? (
                      <button
                        onClick={() => onNavigate?.(crumb.href!)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-slate-900 dark:text-white font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )} */}
          </div>

          {user && <UserMenu user={user} onLogout={onLogout} />}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 lg:hidden z-30">
        <div className="flex items-center justify-around h-16">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
                item.isActive
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
