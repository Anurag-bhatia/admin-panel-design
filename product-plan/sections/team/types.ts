// =============================================================================
// Data Types
// =============================================================================

export interface PermissionFlowAccess {
  [module: string]: string[]
}

export interface Permissions {
  moduleAccess: string[]
  flowAccess: PermissionFlowAccess
}

export interface Employee {
  id: string
  profilePicture: string | null
  firstName: string
  lastName: string
  fullName: string
  mobile: string
  email: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  department: string
  designation: string
  dateOfJoining: string
  primaryReportingManager: string | null
  secondaryReportingManager: string | null
  status: 'active' | 'inactive'
  permissions: Permissions
}

export interface Team {
  id: string
  name: string
  department: string
  teamLead: string
  members: string[]
  memberCount: number
  status: 'active' | 'inactive'
}

export interface EmployeeFormData {
  profilePicture?: string | null
  firstName: string
  lastName: string
  mobile: string
  email: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  department: string
  designation: string
  dateOfJoining: string
  primaryReportingManager: string | null
  secondaryReportingManager: string | null
  officialEmail: string
  password: string
}

export interface TeamFormData {
  name: string
  department: string
  teamLead: string
  members: string[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface TeamSectionProps {
  /** List of all employees (active and inactive) */
  employees: Employee[]
  /** List of all teams */
  teams: Team[]
  /** Available departments for dropdown selection */
  departments: string[]
  /** Available designations for dropdown selection */
  designations: string[]
  /** Available modules for permission configuration */
  modules: string[]
  /** Available flows per module for permission configuration */
  flows: { [module: string]: string[] }
  /** Called when user wants to add a new employee */
  onAddEmployee?: (data: EmployeeFormData) => void
  /** Called when user wants to edit an employee's profile */
  onEditEmployee?: (id: string, data: Partial<Employee>) => void
  /** Called when user wants to deactivate an employee */
  onDeactivateEmployee?: (id: string) => void
  /** Called when user wants to manage employee permissions */
  onManagePermissions?: (id: string) => void
  /** Called when user wants to save employee permissions */
  onSavePermissions?: (id: string, permissions: Permissions) => void
  /** Called when user wants to create a new team */
  onCreateTeam?: (data: TeamFormData) => void
  /** Called when user wants to edit a team */
  onEditTeam?: (id: string, data: Partial<Team>) => void
  /** Called when user wants to activate/deactivate a team */
  onToggleTeamStatus?: (id: string) => void
  /** Called when user clicks on an employee row to view details */
  onViewEmployee?: (id: string) => void
  /** Called when user clicks on a team row to view details */
  onViewTeam?: (id: string) => void
}
