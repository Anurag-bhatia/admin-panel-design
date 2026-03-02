import { useState } from 'react'
import { ArrowLeft, Save, User, Shield, Check } from 'lucide-react'
import type { Employee, Permissions } from '../types'

interface PermissionsPageProps {
  employee: Employee
  modules: string[]
  flows: { [module: string]: string[] }
  onSave: (permissions: Permissions) => void
  onCancel: () => void
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
    flowAccess: { ...employee.permissions.flowAccess },
  })

  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const toggleModuleAccess = (module: string) => {
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

  const toggleFlowAccess = (module: string, flow: string) => {
    const currentFlows = permissions.flowAccess[module] || []
    const hasFlow = currentFlows.includes(flow)

    if (hasFlow) {
      setPermissions({
        ...permissions,
        flowAccess: {
          ...permissions.flowAccess,
          [module]: currentFlows.filter(f => f !== flow),
        },
      })
    } else {
      setPermissions({
        ...permissions,
        flowAccess: {
          ...permissions.flowAccess,
          [module]: [...currentFlows, flow],
        },
      })
    }
  }

  const selectAllFlows = (module: string) => {
    const moduleFlows = flows[module] || []
    setPermissions({
      ...permissions,
      flowAccess: {
        ...permissions.flowAccess,
        [module]: [...moduleFlows],
      },
    })
  }

  const deselectAllFlows = (module: string) => {
    setPermissions({
      ...permissions,
      flowAccess: {
        ...permissions.flowAccess,
        [module]: [],
      },
    })
  }

  const formatFlowName = (flow: string) => {
    return flow
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                    {employee.fullName}
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {employee.designation} · {employee.department}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onSave(permissions)}
              className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Permissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Access */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-600" />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Module Access
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Select which sections of the platform this employee can view
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {modules.map(module => {
                const hasAccess = permissions.moduleAccess.includes(module)
                return (
                  <button
                    key={module}
                    onClick={() => toggleModuleAccess(module)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                      hasAccess
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-sm font-medium">{module}</span>
                    {hasAccess && <Check className="w-4 h-4" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Flow Access */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-600" />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Flow Access
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Select specific actions this employee can perform within each enabled module
                </p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {permissions.moduleAccess.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  Enable at least one module above to configure flow access
                </p>
              </div>
            ) : (
              permissions.moduleAccess.map(module => {
                const moduleFlows = flows[module] || []
                const enabledFlows = permissions.flowAccess[module] || []
                const isExpanded = expandedModule === module

                return (
                  <div key={module} className="p-4">
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : module)}
                      className="w-full flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-900 dark:text-white">{module}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {enabledFlows.length} of {moduleFlows.length} flows enabled
                        </span>
                      </div>
                      <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {isExpanded && moduleFlows.length > 0 && (
                      <div className="mt-4 ml-2">
                        <div className="flex items-center gap-4 mb-4">
                          <button
                            onClick={() => selectAllFlows(module)}
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            Select All
                          </button>
                          <button
                            onClick={() => deselectAllFlows(module)}
                            className="text-sm text-slate-600 hover:text-slate-700 dark:text-slate-400 font-medium"
                          >
                            Deselect All
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {moduleFlows.map(flow => {
                            const hasFlow = enabledFlows.includes(flow)
                            return (
                              <button
                                key={flow}
                                onClick={() => toggleFlowAccess(module, flow)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                                  hasFlow
                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                                  hasFlow ? 'bg-cyan-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                                }`}>
                                  {hasFlow && <Check className="w-3 h-3" />}
                                </div>
                                <span>{formatFlowName(flow)}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Footer Actions (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 sm:hidden">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(permissions)}
              className="flex-1 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
