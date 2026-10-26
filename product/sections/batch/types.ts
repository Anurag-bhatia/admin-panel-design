export type BatchStatus =
  | 'Pending Acceptance'
  | 'Accepted'
  | 'Completed'
  | 'Not Completed'

export interface Batch {
  batchId: string
  assignedExpertId: string
  assignedExpertName: string
  assignedExpertMobile: string
  itemCount: number
  totalAmount: number
  status: BatchStatus
  createdDate: string
  lastUpdated: string
  incidentIds: string[]
  /** Count of tickets still assigned & active in this batch */
  assignedCount: number
  /** Count of tickets rejected by the expert and moved back to In Progress */
  rejectedCount: number
  /** Count of tickets expired (SLA elapsed) without resolution */
  expiredCount: number
}
