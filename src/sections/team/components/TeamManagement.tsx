import { useState, useMemo } from 'react'
import { UserPlus, Users, Search, Filter } from 'lucide-react'
import type { TeamSectionProps, Employee, Team, EmployeeFormData, TeamFormData, Permissions } from '@/../product/sections/team/types'
import { EmployeeTable } from './EmployeeTable'
import { TeamsTable } from './TeamsTable'
import { EmployeeOnboardingWizard } from './EmployeeOnboardingWizard'
import { PermissionsPage } from './PermissionsPage'
import { CreateTeamModal } from './CreateTeamModal'
import { EditTeamModal } from './EditTeamModal'
import { DeactivateConfirmDialog } from './DeactivateConfirmDialog'
import { TeamDetailView } from './TeamDetailView'
import { EmployeeDetailView } from './EmployeeDetailView'

type ViewState =
  | { type: 'list' }
  | { type: 'add-employee' }
  | { type: 'view-employee'; employeeId: string }
  | { type: 'edit-employee'; employeeId: string }
  | { type: 'permissions'; employeeId: string }
  | { type: 'create-team' }
  | { type: 'edit-team'; teamId: string }
  | { type: 'view-team'; teamId: string }

export function TeamManagement({
  employees,
  teams,
  departments,
  designations,
  modules,
  flows,
  onAddEmployee,
  onEditEmployee,
  onDeactivateEmployee,
  onManagePermissions,
  onSavePermissions,
  onCreateTeam,
  onEditTeam,
  onToggleTeamStatus,
  onViewEmployee,
  onViewTeam,
}: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState<'employees' | 'teams'>('employees')
  const [viewState, setViewState] = useState<ViewState>({ type: 'list' })
  const [deactivateTarget, setDeactivateTarget] = useState<{ type: 'employee' | 'team'; id: string; name: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    department: '',
    designation: '',
    status: '',
  })

  const activeEmployees = employees.filter((emp) => emp.status === 'active')
  const activeEmployeeCount = activeEmployees.length

  const getEmployeeById = (id: string) => employees.find(emp => emp.id === id)
  const getTeamById = (id: string) => teams.find(team => team.id === id)

  // Get unique departments and designations for filter dropdowns
  const departmentOptions = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department))).sort()
  }, [employees])

  const designationOptions = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.designation))).sort()
  }, [employees])

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    let result = employees

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        emp =>
          emp.fullName.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query) ||
          emp.designation.toLowerCase().includes(query)
      )
    }

    // Apply filters
    if (filters.department) {
      result = result.filter(emp => emp.department === filters.department)
    }
    if (filters.designation) {
      result = result.filter(emp => emp.designation === filters.designation)
    }
    if (filters.status) {
      result = result.filter(emp => emp.status === filters.status)
    }

    return result
  }, [employees, searchQuery, filters])

  // Filter teams based on search and filters
  const filteredTeams = useMemo(() => {
    let result = teams

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        team =>
          team.name.toLowerCase().includes(query) ||
          team.department.toLowerCase().includes(query)
      )
    }

    // Apply filters
    if (filters.department) {
      result = result.filter(team => team.department === filters.department)
    }
    if (filters.status) {
      result = result.filter(team => team.status === filters.status)
    }

    return result
  }, [teams, searchQuery, filters])

  // Handle add employee submit
  const handleAddEmployeeSubmit = (data: EmployeeFormData) => {
    onAddEmployee?.(data)
    setViewState({ type: 'list' })
  }

  // Handle edit employee submit
  const handleEditEmployeeSubmit = (id: string, data: Partial<Employee>) => {
    onEditEmployee?.(id, data)
    setViewState({ type: 'list' })
  }

  // Handle permissions save
  const handleSavePermissions = (id: string, permissions: Permissions) => {
    onSavePermissions?.(id, permissions)
    setViewState({ type: 'list' })
  }

  // Handle create team submit
  const handleCreateTeamSubmit = (data: TeamFormData) => {
    onCreateTeam?.(data)
    setViewState({ type: 'list' })
  }

  // Handle edit team submit
  const handleEditTeamSubmit = (id: string, data: Partial<Team>) => {
    onEditTeam?.(id, data)
    setViewState({ type: 'list' })
  }

  // Handle deactivate confirmation
  const handleDeactivateConfirm = () => {
    if (deactivateTarget) {
      if (deactivateTarget.type === 'employee') {
        onDeactivateEmployee?.(deactivateTarget.id)
      } else {
        onToggleTeamStatus?.(deactivateTarget.id)
      }
      setDeactivateTarget(null)
    }
  }

  // Render Add/Edit Employee Wizard (Full-screen)
  if (viewState.type === 'add-employee' || viewState.type === 'edit-employee') {
    const employeeToEdit = viewState.type === 'edit-employee' ? getEmployeeById(viewState.employeeId) : undefined
    return (
      <EmployeeOnboardingWizard
        departments={departments}
        designations={designations}
        employees={employees}
        modules={modules}
        flows={flows}
        initialData={employeeToEdit}
        onSubmit={viewState.type === 'edit-employee' ?
          (data) => handleEditEmployeeSubmit(viewState.employeeId, data) :
          handleAddEmployeeSubmit
        }
        onCancel={() => setViewState({ type: 'list' })}
      />
    )
  }

  // Render Permissions Page (Full-screen)
  if (viewState.type === 'permissions') {
    const employee = getEmployeeById(viewState.employeeId)
    if (!employee) {
      setViewState({ type: 'list' })
      return null
    }
    return (
      <PermissionsPage
        employee={employee}
        modules={modules}
        flows={flows}
        onSave={(permissions) => handleSavePermissions(viewState.employeeId, permissions)}
        onCancel={() => setViewState({ type: 'list' })}
      />
    )
  }

  // Render Employee Detail View (Full-screen)
  if (viewState.type === 'view-employee') {
    const employee = getEmployeeById(viewState.employeeId)
    if (!employee) {
      setViewState({ type: 'list' })
      return null
    }
    return (
      <EmployeeDetailView
        employee={employee}
        employees={employees}
        onBack={() => setViewState({ type: 'list' })}
        onEdit={() => setViewState({ type: 'edit-employee', employeeId: viewState.employeeId })}
        onManagePermissions={() => setViewState({ type: 'permissions', employeeId: viewState.employeeId })}
        onDeactivate={() => {
          setDeactivateTarget({ type: 'employee', id: employee.id, name: employee.fullName })
        }}
      />
    )
  }

  // Render Team Detail View (Full-screen)
  if (viewState.type === 'view-team') {
    const team = getTeamById(viewState.teamId)
    if (!team) {
      setViewState({ type: 'list' })
      return null
    }
    return (
      <TeamDetailView
        team={team}
        employees={employees}
        onBack={() => setViewState({ type: 'list' })}
        onEdit={() => setViewState({ type: 'edit-team', teamId: viewState.teamId })}
        onToggleStatus={() => {
          if (team.status === 'active') {
            setDeactivateTarget({ type: 'team', id: team.id, name: team.name })
          } else {
            onToggleTeamStatus?.(team.id)
          }
        }}
      />
    )
  }

  // Main List View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Team
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <Users className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-medium text-slate-900 dark:text-white">
                  {activeEmployeeCount} Active Employee{activeEmployeeCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:flex-shrink-0">
              <button
                onClick={() => setViewState({ type: 'add-employee' })}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
              <button
                onClick={() => setViewState({ type: 'create-team' })}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <nav className="flex gap-8" aria-label="Team tabs">
              <button
                onClick={() => setActiveTab('employees')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'employees'
                    ? 'border-cyan-600 text-cyan-600'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'teams'
                    ? 'border-cyan-600 text-cyan-600'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Teams
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder={activeTab === 'employees' ? 'Search by name, email, or department...' : 'Search by team name or department...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                showFilters
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={e => setFilters({ ...filters, department: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Departments</option>
                    {departmentOptions.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {activeTab === 'employees' && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Designation</label>
                    <select
                      value={filters.designation}
                      onChange={e => setFilters({ ...filters, designation: e.target.value })}
                      className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                      <option value="">All Designations</option>
                      {designationOptions.map(desig => (
                        <option key={desig} value={desig}>
                          {desig}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={e => setFilters({ ...filters, status: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ department: '', designation: '', status: '' })}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'employees' ? (
          <EmployeeTable
            employees={filteredEmployees}
            onViewEmployee={(id) => setViewState({ type: 'view-employee', employeeId: id })}
            onEditEmployee={(id) => setViewState({ type: 'edit-employee', employeeId: id })}
            onManagePermissions={(id) => setViewState({ type: 'permissions', employeeId: id })}
            onDeactivateEmployee={(id) => {
              const emp = getEmployeeById(id)
              if (emp) {
                setDeactivateTarget({ type: 'employee', id, name: emp.fullName })
              }
            }}
          />
        ) : (
          <TeamsTable
            teams={filteredTeams}
            employees={employees}
            onViewTeam={(id) => setViewState({ type: 'view-team', teamId: id })}
            onEditTeam={(id) => setViewState({ type: 'edit-team', teamId: id })}
            onToggleTeamStatus={(id) => {
              const team = getTeamById(id)
              if (team && team.status === 'active') {
                setDeactivateTarget({ type: 'team', id, name: team.name })
              } else if (team) {
                onToggleTeamStatus?.(id)
              }
            }}
          />
        )}
      </div>

      {/* Create Team Modal */}
      {viewState.type === 'create-team' && (
        <CreateTeamModal
          departments={departments}
          employees={employees.filter(e => e.status === 'active')}
          onSave={handleCreateTeamSubmit}
          onClose={() => setViewState({ type: 'list' })}
        />
      )}

      {/* Edit Team Modal */}
      {viewState.type === 'edit-team' && (
        <EditTeamModal
          team={getTeamById(viewState.teamId)!}
          departments={departments}
          employees={employees.filter(e => e.status === 'active')}
          onSave={(data) => handleEditTeamSubmit(viewState.teamId, data)}
          onClose={() => setViewState({ type: 'list' })}
        />
      )}

      {/* Deactivate Confirmation Dialog */}
      {deactivateTarget && (
        <DeactivateConfirmDialog
          type={deactivateTarget.type}
          name={deactivateTarget.name}
          onConfirm={handleDeactivateConfirm}
          onCancel={() => setDeactivateTarget(null)}
        />
      )}
    </div>
  )
}
