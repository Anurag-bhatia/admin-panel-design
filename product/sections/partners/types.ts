// =============================================================================
// Data Types
// =============================================================================

export interface LinkedSubscriber {
  id: string
  name: string
  company: string
  mobile: string
  status: 'active' | 'inactive' | 'paused'
  dateSubscribed: string
  incidentCount: number
}

export interface Payout {
  id: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
  paymentMethod: string
}

export interface Document {
  id: string
  type: string
  name: string
  uploadedDate: string
}

export interface ActivityLogEntry {
  id: string
  action: string
  timestamp: string
  details: string
}

export interface Partner {
  id: string
  partnerId: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  companyName: string
  officialEmail: string
  phone: string
  address: string
  country: string
  state: string
  city: string
  pinCode: string
  website?: string
  productsAllowed: string[]
  subscriberTypesAllowed: string[]
  bankAccountNumber: string
  bankName: string
  status: 'active' | 'inactive'
  dateOnboarded: string
  linkedSubscribers: LinkedSubscriber[]
  earnings: number
  totalPayouts: number
  payoutHistory: Payout[]
  documents: Document[]
  activityLog: ActivityLogEntry[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface PartnerListProps {
  /** The list of all partners to display */
  partners: Partner[]

  /** Called when user clicks "Add Partner" button */
  onCreate?: () => void

  /** Called when user wants to view partner details */
  onView?: (id: string) => void

  /** Called when user wants to toggle partner status (active/inactive) */
  onToggleStatus?: (id: string, newStatus: 'active' | 'inactive') => void

  /** Called when user searches for a partner by name */
  onSearch?: (query: string) => void

  /** Called when user filters by status */
  onFilterStatus?: (status: 'active' | 'inactive' | 'all') => void

  /** Called when user sorts by a column */
  onSort?: (column: string, direction: 'asc' | 'desc') => void
}

export interface PartnerDetailProps {
  /** The partner to display */
  partner: Partner

  /** Called when user wants to go back to partner list */
  onBack?: () => void

  /** Called when user edits partner information */
  onEditPartner?: (id: string) => void

  /** Called when user wants to view incidents for a linked subscriber */
  onViewIncidents?: (subscriberId: string) => void

  /** Called when user uploads a document */
  onUploadDocument?: (id: string, file: File) => void

  /** Called when user deletes a document */
  onDeleteDocument?: (id: string, documentId: string) => void
}

export interface AddPartnerProps {
  /** Called when user submits the 4-step onboarding form */
  onSubmit?: (partnerData: Partial<Partner>) => void

  /** Called when user cancels the onboarding flow */
  onCancel?: () => void

  /** Current step in the stepper (1-4) */
  currentStep?: number
}
