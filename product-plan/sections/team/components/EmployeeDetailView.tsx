import { ArrowLeft, Edit, UserX, Shield } from 'lucide-react'
import type { Employee } from '../types'

interface EmployeeDetailViewProps {
  employee: Employee
  employees: Employee[]
  onBack?: () => void
  onEdit?: () => void
  onManagePermissions?: () => void
  onDeactivate?: () => void
}

export function EmployeeDetailView({
  employee,
  employees,
  onBack,
  onEdit,
  onManagePermissions,
  onDeactivate,
}: EmployeeDetailViewProps) {
  // Get reporting manager info
  const primaryManager = employee.primaryReportingManager
    ? employees.find(emp => emp.id === employee.primaryReportingManager)
    : null
  const secondaryManager = employee.secondaryReportingManager
    ? employees.find(emp => emp.id === employee.secondaryReportingManager)
    : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Employee Details
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                {employee.profilePicture ? (
                  <img
                    src={employee.profilePicture}
                    alt={employee.fullName}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xl">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {employee.fullName}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {employee.designation} • {employee.department}
                </p>
              </div>
            </div>

            {employee.status === 'active' && (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={onEdit}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={onManagePermissions}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 rounded-lg font-medium transition-colors text-sm"
                >
                  <Shield className="w-4 h-4" />
                  <span>Manage Permissions</span>
                </button>
                <button
                  onClick={onDeactivate}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium transition-colors text-sm"
                >
                  <UserX className="w-4 h-4" />
                  <span>Deactivate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Status Badge */}
        <div className="mb-8">
          {employee.status === 'active' ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
              Inactive
            </span>
          )}
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Email
                </div>
                <div className="text-sm text-slate-900 dark:text-white break-all">
                  {employee.email}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Mobile
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {employee.mobile}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Date of Birth
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {new Date(employee.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Gender
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {employee.gender}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Professional Information
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Department
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {employee.department}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Designation
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {employee.designation}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Date of Joining
                </div>
                <div className="text-sm text-slate-900 dark:text-white">
                  {new Date(employee.dateOfJoining).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reporting Structure */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Reporting Structure
          </h3>
          <div className="space-y-4">
            {/* Primary Manager */}
            <div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
                Primary Reporting Manager
              </div>
              {primaryManager ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                    {primaryManager.profilePicture ? (
                      <img
                        src={primaryManager.profilePicture}
                        alt={primaryManager.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                        {primaryManager.firstName[0]}
                        {primaryManager.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-white truncate">
                      {primaryManager.fullName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {primaryManager.designation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  No primary reporting manager assigned
                </div>
              )}
            </div>

            {/* Secondary Manager */}
            <div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
                Secondary Reporting Manager (Dotted Line)
              </div>
              {secondaryManager ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                    {secondaryManager.profilePicture ? (
                      <img
                        src={secondaryManager.profilePicture}
                        alt={secondaryManager.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                        {secondaryManager.firstName[0]}
                        {secondaryManager.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-white truncate">
                      {secondaryManager.fullName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {secondaryManager.designation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  No secondary reporting manager assigned
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Permissions Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Access Control
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
                Module Access ({employee.permissions.moduleAccess.length})
              </div>
              {employee.permissions.moduleAccess.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {employee.permissions.moduleAccess.map((module) => (
                    <span
                      key={module}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  No module access assigned
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
