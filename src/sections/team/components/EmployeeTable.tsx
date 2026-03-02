import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Edit, Shield, UserX, User } from 'lucide-react'
import type { Employee } from '@/../product/sections/team/types'

interface EmployeeTableProps {
  employees: Employee[]
  onViewEmployee?: (id: string) => void
  onEditEmployee?: (id: string) => void
  onManagePermissions?: (id: string) => void
  onDeactivateEmployee?: (id: string) => void
}

interface ActionsMenuProps {
  employeeId: string
  employeeStatus: 'active' | 'inactive'
  onEdit?: () => void
  onManagePermissions?: () => void
  onDeactivate?: () => void
}

function ActionsMenu({ employeeId, employeeStatus, onEdit, onManagePermissions, onDeactivate }: ActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>

      {isOpen && employeeStatus === 'active' && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-10">
          <button
            onClick={() => {
              onEdit?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => {
              onManagePermissions?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Manage Permissions</span>
          </button>
          <button
            onClick={() => {
              onDeactivate?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <UserX className="w-4 h-4" />
            <span>Deactivate</span>
          </button>
        </div>
      )}
    </div>
  )
}

export function EmployeeTable({
  employees,
  onViewEmployee,
  onEditEmployee,
  onManagePermissions,
  onDeactivateEmployee,
}: EmployeeTableProps) {
  // Helper function to get manager name
  const getManagerName = (managerId: string | null) => {
    if (!managerId) return 'N/A'
    const manager = employees.find((emp) => emp.id === managerId)
    return manager ? manager.fullName : 'N/A'
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Employee
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Department
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Designation
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Reporting Manager
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => onViewEmployee?.(employee.id)}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                  employee.status === 'inactive' ? 'opacity-60' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {employee.fullName}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                  {employee.department}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                  {employee.designation}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                  {getManagerName(employee.primaryReportingManager)}
                </td>
                <td className="px-6 py-4">
                  {employee.status === 'active' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <ActionsMenu
                    employeeId={employee.id}
                    employeeStatus={employee.status}
                    onEdit={() => onEditEmployee?.(employee.id)}
                    onManagePermissions={() => onManagePermissions?.(employee.id)}
                    onDeactivate={() => onDeactivateEmployee?.(employee.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
        {employees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onViewEmployee?.(employee.id)}
            className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
              employee.status === 'inactive' ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {employee.fullName}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {employee.designation}
                  </div>
                </div>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <ActionsMenu
                  employeeId={employee.id}
                  employeeStatus={employee.status}
                  onEdit={() => onEditEmployee?.(employee.id)}
                  onManagePermissions={() => onManagePermissions?.(employee.id)}
                  onDeactivate={() => onDeactivateEmployee?.(employee.id)}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Department</span>
                <span className="text-slate-900 dark:text-white">{employee.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Manager</span>
                <span className="text-slate-900 dark:text-white">
                  {getManagerName(employee.primaryReportingManager)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                {employee.status === 'active' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
