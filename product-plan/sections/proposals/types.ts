// =============================================================================
// Data Types
// =============================================================================

export type ProposalType = 'Challan' | 'DL' | 'RC'

export type ProposalStatus = 'sent' | 'under_review' | 'received' | 'converted' | 'rejected'

export type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'not_applicable'

export type RejectionReason =
  | 'Service not available for this case'
  | 'Insufficient documentation'
  | 'Out of service area'
  | 'Duplicate request'
  | 'Invalid/incorrect details'
  | 'Customer request'

export interface Customer {
  id: string
  name: string
  company: string
  phone: string
  email: string
}

export interface Assignee {
  id: string
  name: string
}

export interface Proposal {
  id: string
  displayId: string
  type: ProposalType
  description: string
  quantity: number
  amount: number
  status: ProposalStatus
  serviceStatus: ServiceStatus | null
  linkedIncidentId: string | null
  rejectionReason: RejectionReason | null
  createdAt: string
  updatedAt: string
  customer: Customer
  assignedTo: Assignee | null
}

export interface ChallanItem {
  id: string
  challanId: string
  vehicleNumber: string
  amount: number
  status: 'pending' | 'in_progress' | 'completed'
}

export interface DLItem {
  id: string
  licenceNumber: string
  driverName: string
  status: 'pending' | 'in_progress' | 'completed'
}

export interface RCItem {
  id: string
  rcNumber: string
  vehicleNumber: string
  status: 'pending' | 'in_progress' | 'completed'
}

export type ProposalItem = ChallanItem | DLItem | RCItem

export interface ProposalActivity {
  id: string
  proposalId: string
  actionType: 'statusChange' | 'note'
  performedBy: string
  notes: string
  timestamp: string
}

export interface Comment {
  id: string
  entityType: 'proposal'
  entityId: string
  authorType: 'user' | 'team'
  authorName: string
  message: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
}

export interface DashboardStats {
  newRequests: number
  inReview: number
  awaitingResponse: number
  activeWork: number
  completedThisMonth: number
  totalValue: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface ProposalListProps {
  /** All proposals to display (filtered by tab) */
  proposals: Proposal[]
  /** Proposal items keyed by proposal ID */
  proposalItems: Record<string, ProposalItem[]>
  /** All activities across proposals */
  activities: ProposalActivity[]
  /** All comments across proposals */
  comments: Comment[]
  /** Available team members for assignment */
  teamMembers: TeamMember[]
  /** Dashboard summary statistics */
  dashboardStats: DashboardStats
  /** Called when user picks up a proposal (assigns to self) */
  onPickUp?: (id: string) => void
  /** Called when user assigns a proposal to a team member */
  onAssign?: (id: string, teamMemberId: string) => void
  /** Called when user reassigns a proposal to a different team member */
  onReassign?: (id: string, teamMemberId: string) => void
  /** Called when user sends a quote to the customer */
  onSendQuote?: (id: string, amount: number, breakdown?: string, note?: string) => void
  /** Called when user revises a previously sent quote */
  onReviseQuote?: (id: string, amount: number, breakdown?: string, note?: string) => void
  /** Called when user withdraws a sent quote back to under_review */
  onWithdraw?: (id: string) => void
  /** Called when user rejects a proposal with a reason */
  onReject?: (id: string, reason: RejectionReason, note?: string) => void
  /** Called when user reopens a rejected proposal */
  onReopen?: (id: string) => void
  /** Called when user converts a proposal to an incident */
  onConvertToIncident?: (id: string, incidentId: string, serviceStatus: ServiceStatus, assignedAgentId: string, notes?: string) => void
  /** Called when user updates the service status of a converted proposal */
  onUpdateServiceStatus?: (id: string, serviceStatus: ServiceStatus) => void
  /** Called when user wants to view a proposal's details */
  onView?: (id: string) => void
  /** Called when user wants to navigate to a linked incident */
  onViewIncident?: (incidentId: string) => void
  /** Called when user sends a message in the notes thread */
  onSendComment?: (proposalId: string, message: string) => void
  /** Called when user performs a bulk assign action */
  onBulkAssign?: (ids: string[], teamMemberId: string) => void
  /** Called when user performs a bulk status update */
  onBulkUpdateStatus?: (ids: string[], status: ProposalStatus) => void
}
