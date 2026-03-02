// =============================================================================
// Data Types
// =============================================================================

export interface SupportSubmission {
  id: string
  subject: string
  message: string
  source: string
  type: 'query' | 'complaint' | 'support request' | 'business inquiry'
  submittedAt: string
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface SupportDashboardProps {
  /** The list of unconverted support submissions to display */
  submissions: SupportSubmission[]
  /** Called when user clicks on a row to view full submission details */
  onView?: (id: string) => void
  /** Called when user converts a submission to a lead */
  onConvertToLead?: (id: string) => void
  /** Called when user converts a submission to a dispute/incident */
  onConvertToDispute?: (id: string) => void
  /** Called when user converts a submission to a partnership entry */
  onConvertToPartnership?: (id: string) => void
}
