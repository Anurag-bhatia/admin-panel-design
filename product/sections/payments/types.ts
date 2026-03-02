// =============================================================================
// Data Types
// =============================================================================

export interface Refund {
  id: string
  linkedIncident: string
  customerSubscriber: string
  originalPaymentId: string
  refundAmount: number
  refundStatus: 'Initiated' | 'Approved' | 'Completed'
  approvedBy: string | null
  refundDate: string | null
}

export interface LawyerFee {
  lawyerId: string
  lawyerName: string
  incidentId: string
  challanNo: string
  totalAmount: number
  commissionAmount: number
  status: 'To Pay' | 'Completed'
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
  /** Called when user exports lawyer fees */
  onExportLawyerFees?: () => void
}
