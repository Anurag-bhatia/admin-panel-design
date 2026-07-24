// =============================================================================
// Shared Types
// =============================================================================

export type ConfigStatus = 'active' | 'inactive'

export type ApprovalStatus = 'approved' | 'pending'

export type AllowlistRole = 'Ops Head' | 'Product Head' | 'CEO' | 'CTO'

export type Region = 'All Regions'

export type ChangeLogAction = 'created' | 'updated'

// =============================================================================
// Data Types
// =============================================================================

export interface RewardsConfig {
  id: string
  state: string
  region: Region
  operationsCostPct: number
  marginPct: number
  lawyeredCvPct: number
  lawyeredNcvPct: number
  status: ConfigStatus
  approvalStatus: ApprovalStatus
  lastUpdatedBy: string
  lastUpdatedByRole: AllowlistRole
  lastUpdatedAt: string
  createdBy: string
  createdByRole: AllowlistRole
  createdAt: string
}

export interface ChangeLogEntry {
  id: string
  configId: string
  state: string
  action: ChangeLogAction
  fieldsChanged: string[]
  before: Partial<Record<'operationsCostPct' | 'marginPct' | 'lawyeredCvPct' | 'lawyeredNcvPct' | 'status', number | string | null>>
  after: Partial<Record<'operationsCostPct' | 'marginPct' | 'lawyeredCvPct' | 'lawyeredNcvPct' | 'status', number | string | null>>
  changedBy: string
  changedByRole: AllowlistRole
  changedAt: string
}

export interface AllowlistedUser {
  email: string
  name: string
  role: AllowlistRole
}

// =============================================================================
// Draft (form state) Types
// =============================================================================

export interface ConfigDraft {
  state: string | null
  region: Region
  operationsCostPct: number | null
  lawyeredCvPct: number | null
  lawyeredNcvPct: number | null
  status: ConfigStatus
}

export interface ValidationErrors {
  state?: string
  operationsCostPct?: string
  lawyeredCvPct?: string
  lawyeredNcvPct?: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface RewardsConfigDashboardProps {
  configs: RewardsConfig[]
  changeLog: ChangeLogEntry[]
  states: string[]
  currentUser: AllowlistedUser
  onAdd?: (draft: ConfigDraft) => void
  onUpdate?: (id: string, draft: ConfigDraft) => void
}
