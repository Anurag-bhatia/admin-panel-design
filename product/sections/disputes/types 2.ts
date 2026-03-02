// =============================================================================
// Data Types
// =============================================================================

export type DisputeType = 'refund' | 'service' | 'payment' | 'legal_escalation'

export type DisputeStatus = 'open' | 'under_review' | 'escalated' | 'resolved' | 'rejected'

export type DisputePriority = 'low' | 'medium' | 'high' | 'critical'

export type DisputeRaisedBy = 'customer' | 'subscriber' | 'internal'

export type LinkedEntityType = 'incident' | 'subscriber' | 'customer' | 'payment'

export interface LinkedEntity {
  type: LinkedEntityType
  id: string
  label: string
}

export interface FinancialOutcome {
  challanAmount: number
  amountPaid: number
  refundDue: number
  refundStatus: string
}

export interface LinkedIncidentSnapshot {
  incidentId: string
  subscriberName: string
  vehicleNumber: string
  challanNumber: string
  type: 'Pay & Close' | 'Contest'
  outcome: 'Settled' | 'Not Settled' | 'Refund' | 'Pending'
  assignedLawyer: string | null
  createdOn: string
  resolvedOn: string | null
  financialOutcome: FinancialOutcome
  timelineSummary: string[]
}

export interface InvestigationNote {
  id: string
  author: string
  timestamp: string
  content: string
}

export interface Evidence {
  id: string
  fileName: string
  uploadedBy: string
  uploadedOn: string
  fileSize: string
  type: string
}

export interface ActivityLogEntry {
  id: string
  action: string
  performedBy: string
  timestamp: string
  details: string
}

export interface Dispute {
  id: string
  disputeId: string
  linkedEntity: LinkedEntity
  subscriberName: string
  subscriberId: string
  customerName: string | null
  disputeType: DisputeType
  reason: string
  description: string
  raisedBy: DisputeRaisedBy
  priority: DisputePriority
  status: DisputeStatus
  createdOn: string
  lastUpdated: string
  assignedTo: string | null
  source: string
  slaDeadline: string
  slaDays: number
  disputedAmount: number | null
  linkedIncidentSnapshot: LinkedIncidentSnapshot | null
  investigationNotes: InvestigationNote[]
  evidence: Evidence[]
  activityLog: ActivityLogEntry[]
}

export interface StageCounts {
  open: number
  under_review: number
  escalated: number
  resolved: number
  rejected: number
}

export interface Reviewer {
  id: string
  name: string
  role: string
  activeDisputes: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface DisputesDashboardProps {
  /** List of disputes to display in the table */
  disputes: Dispute[]
  /** Counts per lifecycle stage for the tab badges */
  stageCounts: StageCounts
  /** Available reviewers for assignment */
  reviewers: Reviewer[]
  /** Called when user clicks a dispute row to view details */
  onViewDispute?: (id: string) => void
  /** Called when user assigns a reviewer to a dispute */
  onAssignReviewer?: (disputeId: string, reviewerId: string) => void
  /** Called when user escalates a dispute */
  onEscalate?: (id: string) => void
  /** Called when user changes a dispute's priority */
  onChangePriority?: (id: string, priority: DisputePriority) => void
  /** Called when user approves a refund for a dispute */
  onApproveRefund?: (id: string) => void
  /** Called when user rejects a dispute */
  onRejectDispute?: (id: string) => void
  /** Called when user closes/resolves a dispute */
  onCloseDispute?: (id: string) => void
  /** Called when user bulk-assigns a reviewer to multiple disputes */
  onBulkAssignReviewer?: (disputeIds: string[], reviewerId: string) => void
  /** Called when user bulk-changes priority of multiple disputes */
  onBulkChangePriority?: (disputeIds: string[], priority: DisputePriority) => void
  /** Called when user exports disputes */
  onExport?: (disputeIds?: string[]) => void
  /** Called when user adds an investigation note */
  onAddInvestigationNote?: (disputeId: string, content: string) => void
  /** Called when user uploads evidence */
  onUploadEvidence?: (disputeId: string, file: File) => void
}
