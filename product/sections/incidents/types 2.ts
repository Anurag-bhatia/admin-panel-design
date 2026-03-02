// =============================================================================
// Queue & Status Types
// =============================================================================

export type IncidentQueue =
  | 'newIncidents'
  | 'screening'
  | 'agentAssigned'
  | 'lawyerAssigned'
  | 'settled'
  | 'notSettled'
  | 'hold'
  | 'refund'

export type IncidentStatus =
  | 'pending_screening'
  | 'screening_in_progress'
  | 'lawyer_working'
  | 'court_hearing_scheduled'
  | 'resolved'
  | 'unresolved'
  | 'refund_initiated'

export type IncidentType = 'payAndClose' | 'contest'

export type ChallanType = 'court' | 'online'

export type IncidentSource = 'API' | 'Manual' | 'Bulk Upload' | 'Partner'

export type ValidationStatus = 'exists' | 'disposed' | 'not_found'

export type DocumentType = 'challan' | 'vehicle_document' | 'court_document' | 'receipt' | 'other'

export type TimelineAction =
  | 'created'
  | 'agent_assigned'
  | 'lawyer_assigned'
  | 'screened'
  | 'queue_changed'
  | 'follow_up_added'
  | 'document_uploaded'
  | 'resolved'
  | 'status_changed'
  | 'validated'

// =============================================================================
// Data Types
// =============================================================================

export interface Subscriber {
  id: string
  name: string
  companyAlias: string
  contactPerson: string
  phone: string
  email: string
  totalVehicles: number
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string | null
}

export interface Lawyer {
  id: string
  name: string
  phone: string
  email: string
  state: string
  successRate: number
}

export interface Incident {
  id: string
  incidentId: string
  challanNumber: string
  subscriberId: string
  subscriberName: string
  vehicle: string
  type: IncidentType
  challanType: ChallanType
  status: IncidentStatus
  queue: IncidentQueue
  createdAt: string
  lastUpdatedAt: string
  tatDeadline: string
  assignedAgentId: string | null
  assignedLawyerId: string | null
  source: IncidentSource
  state: string
  offence: string | null
  amount: number
  resolutionNotes?: string
}

export interface FollowUp {
  id: string
  incidentId: string
  notes: string
  outcome: string
  nextFollowUpDate: string | null
  createdAt: string
  createdById: string
  createdByName: string
}

export interface TimelineActivity {
  id: string
  incidentId: string
  action: TimelineAction
  description: string
  createdAt: string
  createdById: string
  createdByName: string
}

export interface Document {
  id: string
  incidentId: string
  name: string
  type: DocumentType
  size: number
  uploadedAt: string
  uploadedById: string
  uploadedByName: string
}

export interface ValidationResult {
  challanNumber: string
  status: ValidationStatus
  message: string
}

export interface ScreeningResult {
  violaterName: string
  challanNumber: string
  state: string
  challanDate: string
  offence: string
  place: string
  rtoName: string
  amount: number
  virtualStatus: string // 01, 02, 03, etc.
  virtualAmount: number
  status: string
  physicalCourtStatus: string
  vehicleImpound: boolean
  documentImpound: string // RC, DL, RC+DL, None
  disposed: boolean
}

export interface QueueCounts {
  newIncidents: number
  screening: number
  agentAssigned: number
  lawyerAssigned: number
  settled: number
  notSettled: number
  hold: number
  refund: number
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface IncidentListProps {
  /** List of incidents to display in the table */
  incidents: Incident[]
  /** Counts for each queue tab */
  queueCounts: QueueCounts
  /** Currently active queue */
  activeQueue: IncidentQueue
  /** Pagination state */
  pagination: Pagination
  /** List of users for agent assignment */
  users: User[]
  /** List of lawyers for lawyer assignment */
  lawyers: Lawyer[]
  /** List of available sources for filtering */
  sources: IncidentSource[]
  /** List of offence types for filtering */
  offenceTypes: string[]
  /** Called when user changes the active queue tab */
  onQueueChange?: (queue: IncidentQueue) => void
  /** Called when user changes page */
  onPageChange?: (page: number) => void
  /** Called when user clicks on an incident row to view details */
  onViewIncident?: (incidentId: string) => void
  /** Called when user wants to add a new challan */
  onAddChallan?: () => void
  /** Called when user triggers bulk validate */
  onValidate?: (incidentIds: string[]) => void
  /** Called when user triggers bulk screen */
  onScreen?: (incidentIds: string[]) => void
  /** Called when user assigns agent to incidents */
  onAssignAgent?: (incidentIds: string[], agentId: string) => void
  /** Called when user assigns lawyer to incidents */
  onAssignLawyer?: (incidentIds: string[], lawyerId: string) => void
  /** Called when user moves incidents to a different queue */
  onMoveQueue?: (incidentIds: string[], targetQueue: IncidentQueue) => void
  /** Called when user triggers bulk update with file */
  onBulkUpdate?: (incidentIds: string[], file: File) => void
  /** Called when user exports incidents */
  onExport?: (incidentIds: string[] | 'all') => void
  /** Called when user searches */
  onSearch?: (query: string) => void
  /** Called when user applies filters */
  onFilter?: (filters: IncidentFilters) => void
}

export interface IncidentFilters {
  type?: IncidentType
  challanType?: ChallanType
  status?: IncidentStatus
  assignedAgentId?: string
  assignedLawyerId?: string
  dateFrom?: string
  dateTo?: string
  source?: IncidentSource
  state?: string
}

export interface IncidentDetailProps {
  /** The incident to display */
  incident: Incident
  /** Subscriber details */
  subscriber: Subscriber
  /** Assigned agent details (if assigned) */
  assignedAgent: User | null
  /** Assigned lawyer details (if assigned) */
  assignedLawyer: Lawyer | null
  /** Follow-ups for this incident */
  followUps: FollowUp[]
  /** Timeline activities for this incident */
  timelineActivities: TimelineActivity[]
  /** Documents attached to this incident */
  documents: Document[]
  /** List of users for agent assignment */
  users: User[]
  /** List of lawyers for lawyer assignment */
  lawyers: Lawyer[]
  /** Called when user navigates back to list */
  onBack?: () => void
  /** Called when user adds a follow-up */
  onAddFollowUp?: (incidentId: string, followUp: Omit<FollowUp, 'id' | 'incidentId' | 'createdAt' | 'createdById' | 'createdByName'>) => void
  /** Called when user uploads a document */
  onUploadDocument?: (incidentId: string, file: File, type: DocumentType) => void
  /** Called when user views/downloads a document */
  onViewDocument?: (documentId: string) => void
  /** Called when user deletes a document */
  onDeleteDocument?: (documentId: string) => void
  /** Called when user assigns agent */
  onAssignAgent?: (incidentId: string, agentId: string) => void
  /** Called when user assigns lawyer */
  onAssignLawyer?: (incidentId: string, lawyerId: string) => void
  /** Called when user moves to a different queue */
  onMoveQueue?: (incidentId: string, targetQueue: IncidentQueue) => void
  /** Called when user validates this incident */
  onValidate?: (incidentId: string) => void
  /** Called when user screens this incident */
  onScreen?: (incidentId: string) => void
  /** Called when user updates incident details */
  onUpdate?: (incidentId: string, updates: Partial<Incident>) => void
}

export interface ValidationResultsProps {
  /** Results from the validation operation */
  results: ValidationResult[]
  /** Called when user closes the results view */
  onClose?: () => void
  /** Called when user wants to take action on specific challans */
  onActionOnChallan?: (challanNumber: string, action: 'proceed' | 'remove') => void
}

export interface ScreeningResultsProps {
  /** Results from the screening operation */
  results: ScreeningResult[]
  /** Called when user closes the results view */
  onClose?: () => void
  /** Called when user confirms screening and proceeds */
  onConfirm?: (selectedChallans: string[]) => void
}

export interface AddChallanFormProps {
  /** List of subscribers for selection */
  subscribers: Subscriber[]
  /** List of sources */
  sources: IncidentSource[]
  /** Called when form is submitted */
  onSubmit?: (challan: Omit<Incident, 'id' | 'incidentId' | 'status' | 'queue' | 'createdAt' | 'lastUpdatedAt' | 'tatDeadline'>) => void
  /** Called when form is cancelled */
  onCancel?: () => void
}

export interface BulkUpdateModalProps {
  /** Number of selected incidents */
  selectedCount: number
  /** Called when file is uploaded and update triggered */
  onUpload?: (file: File) => void
  /** Called when modal is closed */
  onClose?: () => void
}

export interface SidebarProps {
  /** Whether viewing All Incidents or My Incidents */
  view: 'all' | 'my'
  /** Currently selected work type */
  workType: 'cases' | 'challans'
  /** Whether sidebar is collapsed */
  collapsed: boolean
  /** Called when view changes */
  onViewChange?: (view: 'all' | 'my') => void
  /** Called when work type changes */
  onWorkTypeChange?: (type: 'cases' | 'challans') => void
  /** Called when sidebar collapse state changes */
  onToggleCollapse?: () => void
}
