import { useState } from 'react'
import { ArrowLeft, Edit, Shield, User, Lock, Activity } from 'lucide-react'
import type { Employee } from '@/../product/sections/team/types'

type TabType = 'details' | 'permissions'

interface EmployeeDetailViewProps {
  employee: Employee
  employees: Employee[]
  onBack?: () => void
  onEdit?: () => void
  onManagePermissions?: () => void
}

export function EmployeeDetailView({
  employee,
  employees,
  onBack,
  onEdit,
  onManagePermissions,
}: EmployeeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')

  const primaryManager = employee.primaryReportingManager
    ? employees.find(emp => emp.id === employee.primaryReportingManager)
    : null
  const secondaryManager = employee.secondaryReportingManager
    ? employees.find(emp => emp.id === employee.secondaryReportingManager)
    : null

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <User className="w-4 h-4" />,
      permissions: <Lock className="w-4 h-4" />,
    }
    return icons[tab]
  }

  const tabLabels: Record<TabType, string> = {
    details: 'Details',
    permissions: 'Permissions',
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <button
            onClick={onBack}
            className="mt-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                    {employee.fullName}
                  </h1>
                  <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                    employee.status === 'active'
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700'
                  }`}>
                    {employee.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-base text-slate-500 dark:text-slate-400">
                  {employee.designation} &bull; {employee.department}
                </p>
              </div>

              {employee.status === 'active' && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={onManagePermissions}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    Edit Permissions
                  </button>
                  <button
                    onClick={onEdit}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors text-sm shadow-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
            {(['details', 'permissions'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {getTabIcon(tab)}
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Employee Information */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-8">
                Employee Information
              </h2>

              <div className="space-y-10">
                {/* Personal Information */}
                <section>
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    <InfoField label="Email" value={employee.email} />
                    <InfoField label="Mobile" value={employee.mobile} />
                    <InfoField label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
                    <InfoField label="Gender" value={employee.gender} />
                  </div>
                </section>

                {/* Professional Information */}
                <section className="border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                    <InfoField label="Department" value={employee.department} />
                    <InfoField label="Designation" value={employee.designation} />
                    <InfoField label="Date of Joining" value={formatDate(employee.dateOfJoining)} />
                  </div>
                </section>

                {/* Reporting Structure */}
                <section className="border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                    Reporting Structure
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Primary Manager */}
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2.5">Primary Reporting Manager</p>
                      {primaryManager ? (
                        <ManagerCard manager={primaryManager} />
                      ) : (
                        <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                          Not assigned
                        </p>
                      )}
                    </div>

                    {/* Secondary Manager */}
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2.5">Secondary Manager (Dotted Line)</p>
                      {secondaryManager ? (
                        <ManagerCard manager={secondaryManager} />
                      ) : (
                        <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                          Not assigned
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right - Recent Activity */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 h-fit lg:sticky lg:top-6">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Recent Activity</h3>
              </div>
              {employee.recentActivity && employee.recentActivity.length > 0 ? (
                <div className="space-y-0">
                  {employee.recentActivity.map((activity, index) => (
                    <div key={activity.id} className="relative flex gap-3.5 pb-6 last:pb-0">
                      {/* Timeline line */}
                      {index < employee.recentActivity.length - 1 && (
                        <div className="absolute left-[7px] top-[18px] bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                      )}
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-1.5 w-[15px] flex-shrink-0 flex justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 ring-2 ring-white dark:ring-slate-900" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
                          {activity.action}
                        </p>
                        <p className="text-sm text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
                          {activity.target}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          at{' '}
                          {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Activity className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 dark:text-slate-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-8">Access Control</h2>
            <div className="space-y-10">
              <section>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  Module Access ({employee.permissions.moduleAccess.length})
                </h3>
                {employee.permissions.moduleAccess.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {employee.permissions.moduleAccess.map((module) => (
                      <span
                        key={module}
                        className="inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 ring-1 ring-cyan-200 dark:ring-cyan-800"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                    No module access assigned
                  </p>
                )}
              </section>

              {Object.keys(employee.permissions.flowAccess).length > 0 && (
                <section className="border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                    Flow Access
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(employee.permissions.flowAccess).map(([module, flows]) => (
                      <div key={module}>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2.5">{module}</p>
                        <div className="flex flex-wrap gap-2">
                          {flows.map((flow) => (
                            <span
                              key={flow}
                              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700 capitalize"
                            >
                              {flow.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-1">{label}</p>
      <p className="text-base font-medium text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  )
}

function ManagerCard({ manager }: { manager: Employee }) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
      <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center flex-shrink-0">
        {manager.profilePicture ? (
          <img
            src={manager.profilePicture}
            alt={manager.fullName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs">
            {manager.firstName[0]}
            {manager.lastName[0]}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {manager.fullName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {manager.designation}
        </p>
      </div>
    </div>
  )
}
