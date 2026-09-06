// =============================================================================
// Shared Types
// =============================================================================

export type ConfigStatus = 'active' | 'inactive'

export type ApprovalStatus = 'approved' | 'pending'

export type Product = 'challanPay' | 'lots247'

export type AllowlistRole = 'Ops Head' | 'Product Head' | 'CEO' | 'CTO'

export type Region = 'All Regions'

export type ChangeLogAction = 'created' | 'updated'

// =============================================================================
// Data Types
// =============================================================================

export interface RewardsConfig {
  id: string
  product: Product
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
  product?: Product
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
  /**
   * When true, the module header (title + Add button) is not rendered so the
   * dashboard can be embedded inside a parent that owns its own header.
   */
  embedded?: boolean
  /**
   * When set, the product tabs are hidden and this product is used as the
   * fixed active product.
   */
  lockedProduct?: Product
  /**
   * Optional heading override for the module header. Ignored when `embedded`.
   */
  titleOverride?: string
}
