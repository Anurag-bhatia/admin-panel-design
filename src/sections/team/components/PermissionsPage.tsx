import { useState } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  Save,
  User,
  AlertTriangle,
  BarChart3,
  Briefcase,
  CreditCard,
  Gavel,
  Headphones,
  LayoutGrid,
  MessageSquareWarning,
  Scale,
  Settings,
  Shield,
  UserCog,
  Users,
} from 'lucide-react'
import type { Employee, Permissions } from '@/../product/sections/team/types'

interface PermissionsPageProps {
  employee: Employee
  modules: string[]
  flows: { [module: string]: string[] }
  onSave: (permissions: Permissions) => void
  onCancel: () => void
}

const moduleIcons: Record<string, typeof Shield> = {
  Incidents: AlertTriangle,
  Leads: Briefcase,
  Subscribers: Users,
  Lawyers: Scale,
  Partners: Briefcase,
  Payments: CreditCard,
  Disputes: MessageSquareWarning,
  Support: Headphones,
  Reports: BarChart3,
  Teams: Users,
  Employees: UserCog,
  Finance: CreditCard,
  Settings: Settings,
}

function Toggle({
  enabled,
  onChange,
  disabled,
  size = 'md',
}: {
  enabled: boolean
  onChange: () => void
  disabled?: boolean
  size?: 'sm' | 'md'
}) {
  const dims = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11'
  const knob = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-5'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex ${dims} shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${
        enabled
          ? 'bg-cyan-600 dark:bg-cyan-500'
          : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`pointer-events-none inline-block ${knob} rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
          enabled ? translate : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function formatFlowName(flow: string) {
  return flow
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function PermissionsPage({
  employee,
  modules,
  flows,
  onSave,
  onCancel,
}: PermissionsPageProps) {
  const [permissions, setPermissions] = useState<Permissions>({
    moduleAccess: [...employee.permissions.moduleAccess],
    flowAccess: Object.fromEntries(
      Object.entries(employee.permissions.flowAccess).map(([k, v]) => [k, [...v]])
    ),
  })

  const toggleModule = (module: string) => {
    const hasAccess = permissions.moduleAccess.includes(module)
    if (hasAccess) {
      setPermissions({
        moduleAccess: permissions.moduleAccess.filter(m => m !== module),
        flowAccess: { ...permissions.flowAccess, [module]: [] },
      })
    } else {
      setPermissions({
        moduleAccess: [...permissions.moduleAccess, module],
        flowAccess: { ...permissions.flowAccess, [module]: [] },
      })
    }
  }

  const toggleFlow = (module: string, flow: string) => {
    const currentFlows = permissions.flowAccess[module] || []
    const hasFlow = currentFlows.includes(flow)
    setPermissions({
      ...permissions,
      flowAccess: {
        ...permissions.flowAccess,
        [module]: hasFlow
          ? currentFlows.filter(f => f !== flow)
          : [...currentFlows, flow],
      },
    })
  }

  const toggleAllFlows = (module: string) => {
    const moduleFlows = flows[module] || []
    const enabledFlows = permissions.flowAccess[module] || []
    const allEnabled = enabledFlows.length === moduleFlows.length
    setPermissions({
      ...permissions,
      flowAccess: {
        ...permissions.flowAccess,
        [module]: allEnabled ? [] : [...moduleFlows],
      },
    })
  }

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  const totalModulesEnabled = permissions.moduleAccess.length

  const toggleExpand = (module: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(module)) next.delete(module)
      else next.add(module)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 sm:px-8 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
              <button
                onClick={onCancel}
                className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
              <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center shrink-0 ring-1 ring-cyan-200 dark:ring-cyan-800">
                <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                  {employee.fullName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {employee.designation} · {employee.department}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSave(permissions)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Permissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-8 py-6 pb-28 sm:pb-8">
        {/* Summary Bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Module & Flow Access
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {totalModulesEnabled} of {modules.length} modules enabled
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Enabled
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              Disabled
            </span>
          </div>
        </div>

        {/* Module List — stacked, collapsible */}
        <div className="space-y-3">
          {modules.map(module => {
            const moduleEnabled = permissions.moduleAccess.includes(module)
            const moduleFlows = flows[module] || []
            const enabledFlows = permissions.flowAccess[module] || []
            const allFlowsEnabled = moduleFlows.length > 0 && enabledFlows.length === moduleFlows.length
            const isExpanded = expandedModules.has(module)
            const hasFlows = moduleFlows.length > 0
            const Icon = moduleIcons[module] || LayoutGrid

            return (
              <div
                key={module}
                className={`bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 ${
                  moduleEnabled
                    ? 'border-cyan-200 dark:border-cyan-800/60 shadow-sm shadow-cyan-100/50 dark:shadow-none'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Module Header */}
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    type="button"
                    onClick={() => hasFlows && toggleExpand(module)}
                    className={`flex items-center gap-3 min-w-0 flex-1 text-left ${hasFlows ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        moduleEnabled
                          ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white block truncate">
                        {module}
                      </span>
                      {hasFlows ? (
                        <span className={`text-xs tabular-nums ${moduleEnabled ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`}>
                          {moduleEnabled ? `${enabledFlows.length} of ${moduleFlows.length} flows` : `${moduleFlows.length} flows available`}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          No configurable flows
                        </span>
                      )}
                    </div>
                    {hasFlows && (
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  <div className="ml-4 shrink-0">
                    <Toggle
                      enabled={moduleEnabled}
                      onChange={() => toggleModule(module)}
                    />
                  </div>
                </div>

                {/* Flows — collapsible */}
                {hasFlows && isExpanded && (
                  <div
                    className={`border-t transition-opacity duration-200 ${
                      moduleEnabled
                        ? 'border-slate-100 dark:border-slate-800'
                        : 'border-slate-100 dark:border-slate-800 opacity-30 pointer-events-none'
                    }`}
                  >
                    {/* Toggle All Row */}
                    {moduleEnabled && moduleFlows.length > 1 && (
                      <div className="flex items-center justify-between px-5 pt-3 pb-1">
                        <button
                          onClick={() => toggleAllFlows(module)}
                          className="text-xs font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
                        >
                          {allFlowsEnabled ? 'Deselect all' : 'Select all'}
                        </button>
                      </div>
                    )}
                    <div className="px-5 pb-4 pt-1">
                      {moduleFlows.map((flow, i) => {
                        const flowEnabled = enabledFlows.includes(flow)
                        return (
                          <div
                            key={flow}
                            className={`flex items-center justify-between py-2.5 ${
                              i < moduleFlows.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''
                            }`}
                          >
                            <span className={`text-sm ${flowEnabled ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                              {formatFlowName(flow)}
                            </span>
                            <Toggle
                              enabled={flowEnabled}
                              onChange={() => toggleFlow(module, flow)}
                              disabled={!moduleEnabled}
                              size="sm"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4 sm:hidden">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(permissions)}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors shadow-sm"
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  )
}
