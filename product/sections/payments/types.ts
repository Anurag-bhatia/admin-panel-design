// =============================================================================
// Data Types
// =============================================================================

export interface RefundActivityLogEntry {
  id: string
  action: string
  performedBy: string
  timestamp: string
  details: string
}

export interface RefundNote {
  id: string
  author: string
  timestamp: string
  content: string
}

export interface RefundFollowUp {
  id: string
  outcome: string
  notes: string
  createdAt: string
  createdByName: string
}

export interface Refund {
  id: string
  linkedIncident: string
  customerSubscriber: string
  originalPaymentId: string
  refundAmount: number
  refundStatus: 'Refund Raised' | 'Completed' | 'Hold' | 'Rejected'
  initiatedBy: string | null
  refundDate: string | null
  createdOn: string
  lastUpdated: string
  reason: string
  activityLog: RefundActivityLogEntry[]
  notes: RefundNote[]
  followUps: RefundFollowUp[]
}

export interface LawyerFee {
  lawyerId: string
  lawyerName: string
  incidentId: string
  challanNo: string
  totalAmount: number
  commissionAmount: number
  status: 'To Pay' | 'Completed' | 'Hold' | 'Rejected'
  dueDate: string
  paidDate: string | null
}

export interface PartnerPayout {
  partnerId: string
  partnerName: string
  companyName: string
  subscriberCount: number
  totalEarnings: number
  payoutAmount: number
  status: 'To Pay' | 'Completed' | 'Hold' | 'Rejected'
  dueDate: string
  paidDate: string | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface PaymentsProps {
  /** List of refund records */
  refunds: Refund[]
  /** List of lawyer fee records */
  lawyerFees: LawyerFee[]
  /** List of leads for the Leads sub-section */
  leads?: import('@/../product/sections/sales-crm/types').Lead[]
  /** Available users for lead assignment */
  users?: import('@/../product/sections/sales-crm/types').User[]
  /** List of lawyers for profile navigation from Lawyer Payments */
  lawyers?: import('@/../product/sections/lawyers/types').Lawyer[]
  /** Called when user approves a refund */
  onApproveRefund?: (id: string) => void
  /** Called when user processes a refund */
  onProcessRefund?: (id: string) => void
  /** Called when user bulk approves selected refunds */
  onBulkApproveRefunds?: (ids: string[]) => void
  /** Called when user bulk processes selected refunds */
  onBulkProcessRefunds?: (ids: string[]) => void
  /** Called when user exports refunds */
  onExportRefunds?: () => void
  /** Called when user clicks a lawyer fee row to navigate to lawyer profile */
  onViewLawyerProfile?: (lawyerId: string) => void
  /** Called when user bulk marks selected lawyer fees as paid */
  onBulkMarkLawyerFeesPaid?: (keys: string[]) => void
  /** Called when user exports lawyer fees */
  onExportLawyerFees?: () => void
  /** Called when user wants to view a lead's details */
  onViewLead?: (id: string) => void
  /** Called when user wants to assign a lead */
  onAssignLead?: (id: string) => void
  /** Called when user bulk marks selected leads as converted */
  onBulkMarkLeadsConverted?: (ids: string[]) => void
  /** List of partner payout records */
  partnerPayouts?: PartnerPayout[]
  /** List of full partner objects for detail navigation from ChallanPay Partners */
  partners?: import('@/../product/sections/partners/types').Partner[]
  /** Called when user bulk marks selected partner payouts as paid */
  onBulkMarkPartnerPayoutsPaid?: (keys: string[]) => void
  /** Called when user clicks a partner payout row to navigate to partner profile */
  onViewPartnerProfile?: (partnerId: string) => void
  /** Called when user exports partner payouts */
  onExportPartnerPayouts?: () => void
}
