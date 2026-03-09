// =============================================================================
// Shared Types
// =============================================================================

export type ConfigStatus = 'active' | 'inactive'

export type AuditAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'value_added'
  | 'value_deactivated'
  | 'reordered'

export type ConfigArea =
  | 'Services'
  | 'Price Categories'
  | 'Departments'
  | 'Designations'
  | 'Masters'
  | 'Geographic'

export type SetupTab =
  | 'services'
  | 'priceCategories'
  | 'departments'
  | 'designations'
  | 'masters'
  | 'geographic'
  | 'auditLog'

export type UsageModule =
  | 'Incidents'
  | 'Leads'
  | 'Subscribers'
  | 'Customers'
  | 'Lawyers'
  | 'Partners'
  | 'Payments'
  | 'Disputes'
  | 'Support'
  | 'Reports'
  | 'Team'

export type GeographicLevel = 'country' | 'state' | 'city'

export type ServiceType = 'Against Vehicle' | 'Topup Service'

export type VehicleCategory = 'Private Vehicles' | 'Commercial Vehicle'

// =============================================================================
// Data Types
// =============================================================================

export interface Service {
  id: string
  name: string
  type: ServiceType
  category: VehicleCategory
  slug: string
  credits: number
  status: ConfigStatus
  description: string
  modifiedBy: string
  modifiedAt: string
}

export interface PriceCategory {
  id: string
  name: string
  increaseBy: number
  description: string
  status: ConfigStatus
  isProtected: boolean
  modifiedBy: string
  modifiedAt: string
}

export interface Department {
  id: string
  name: string
  icon: string
  status: ConfigStatus
  headCount: number
  modifiedBy: string
  modifiedAt: string
}

export interface Designation {
  id: string
  title: string
  departmentId: string
  departmentName: string
  icon: string
  status: ConfigStatus
  modifiedBy: string
  modifiedAt: string
}

export interface Master {
  id: string
  name: string
  description: string
  usageModules: UsageModule[]
  icon: string
  status: ConfigStatus
  valueCount: number
  modifiedBy: string
  modifiedAt: string
}

export interface MasterValue {
  id: string
  value: string
  status: ConfigStatus
  sortOrder: number
}

export interface GeographicValue {
  id: string
  name: string
  level: GeographicLevel
  parentId: string | null
  code: string
  status: ConfigStatus
  modifiedBy: string
  modifiedAt: string
}

export interface AuditEntry {
  id: string
  area: ConfigArea
  action: AuditAction
  recordName: string
  field: string | null
  oldValue: string | null
  newValue: string | null
  performedBy: string
  performedAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SetupDashboardProps {
  /** Active tab */
  activeTab: SetupTab

  /** Data for each tab */
  services: Service[]
  priceCategories: PriceCategory[]
  departments: Department[]
  designations: Designation[]
  masters: Master[]
  masterValues: Record<string, MasterValue[]>
  geographicValues: GeographicValue[]
  auditEntries: AuditEntry[]

  /** Called when user switches tabs */
  onTabChange?: (tab: SetupTab) => void

  /** Service actions */
  onAddService?: () => void
  onEditService?: (id: string) => void
  onToggleService?: (id: string, status: ConfigStatus) => void
  onDeleteService?: (id: string) => void

  /** Price category actions */
  onAddPriceCategory?: () => void
  onEditPriceCategory?: (id: string) => void
  onTogglePriceCategory?: (id: string, status: ConfigStatus) => void
  onDeletePriceCategory?: (id: string) => void

  /** Department actions */
  onAddDepartment?: () => void
  onEditDepartment?: (id: string) => void
  onToggleDepartment?: (id: string, status: ConfigStatus) => void
  onDeleteDepartment?: (id: string) => void

  /** Designation actions */
  onAddDesignation?: () => void
  onEditDesignation?: (id: string) => void
  onToggleDesignation?: (id: string, status: ConfigStatus) => void
  onDeleteDesignation?: (id: string) => void

  /** Master actions */
  onAddMaster?: () => void
  onEditMaster?: (id: string) => void
  onToggleMaster?: (id: string, status: ConfigStatus) => void
  onDeleteMaster?: (id: string) => void
  onViewMasterValues?: (masterId: string) => void
  onAddMasterValue?: (masterId: string) => void
  onEditMasterValue?: (masterId: string, valueId: string) => void
  onToggleMasterValue?: (masterId: string, valueId: string, status: ConfigStatus) => void
  onReorderMasterValues?: (masterId: string, valueIds: string[]) => void

  /** Geographic actions */
  onAddGeographic?: () => void
  onEditGeographic?: (id: string) => void
  onToggleGeographic?: (id: string, status: ConfigStatus) => void
  onDeleteGeographic?: (id: string) => void

  /** Reorder within any tab */
  onReorder?: (tab: SetupTab, orderedIds: string[]) => void

  /** Audit log filters */
  onFilterAuditLog?: (filters: { area?: ConfigArea; performedBy?: string; dateRange?: [string, string] }) => void
}
