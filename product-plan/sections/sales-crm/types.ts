// =============================================================================
// Data Types
// =============================================================================

export interface Lead {
  id: string
  source: string
  type: string
  subType: string
  lotsFor: string
  numberOfTrucks: number
  phoneNumber: string
  country: string
  state: string
  city: string
  companyAlias: string
  companyName: string
  emailId: string
  contactPerson: string
  gstNumber: string
  area: string
  addressLane: string
  pinCode: string
  status: 'new' | 'assigned' | 'follow-up' | 'quotations' | 'projected' | 'invoiced' | 'sales' | 'lost'
  assignedTo: string | null
  assignedTeam: 'Service' | 'Accounts' | null
  createdDate: string
  lastActivityDate: string
}

export interface TimelineActivity {
  id: string
  leadId: string
  type: 'created' | 'assignment' | 'status_change' | 'follow_up' | 'document_upload' | 'note'
  performedBy: string
  performedByName: string
  timestamp: string
  description: string
  details?: {
    previousStatus?: string
    newStatus?: string
    reason?: string
    assignedTo?: string
    assignedToName?: string
    team?: string
    activityType?: string
    notes?: string
    nextFollowUpDate?: string
    outcome?: string
    documentId?: string
    fileName?: string
  }
}

export interface Document {
  id: string
  leadId: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedBy: string
  uploadedByName: string
  uploadedDate: string
  category: 'Quotation' | 'Proposal' | 'Contract' | 'Agreement' | 'Presentation' | 'Other'
}

export interface User {
  id: string
  fullName: string
  email: string
  role: string
  team: string
  status: 'active' | 'inactive'
}

export interface LeadFormData {
  source: string
  type: string
  subType: string
  lotsFor: string
  numberOfTrucks: number
  phoneNumber: string
  country: string
  state: string
  city: string
  companyAlias: string
  companyName: string
  emailId: string
  contactPerson: string
  gstNumber: string
  area: string
  addressLane: string
  pinCode: string
}

export interface FollowUpFormData {
  activityType: string
  notes: string
  nextFollowUpDate?: string
  outcome: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface LeadsProps {
  /** The list of leads to display */
  leads: Lead[]
  /** Timeline activities for all leads */
  timelineActivities: TimelineActivity[]
  /** Documents attached to leads */
  documents: Document[]
  /** Available users for assignment */
  users: User[]
  /** Available lead sources */
  leadSources: string[]
  /** Available service types */
  serviceTypes: string[]
  /** Service sub-types organized by type */
  serviceSubTypes: Record<string, string[]>
  /** Available activity types for follow-ups */
  activityTypes: string[]
  /** Available document categories */
  documentCategories: string[]
  /** Called when user wants to view a lead's details */
  onViewLead?: (id: string) => void
  /** Called when user wants to add a new lead */
  onAddLead?: (leadData: LeadFormData) => void
  /** Called when user wants to bulk upload leads via Excel */
  onBulkUpload?: (file: File) => void
  /** Called when user wants to download the Excel template for bulk upload */
  onDownloadTemplate?: () => void
  /** Called when user wants to bulk update selected leads (status or owner) */
  onBulkUpdate?: (leadIds: string[], field: string, value: string) => void
  /** Called when user wants to edit a lead */
  onEditLead?: (id: string, leadData: Partial<Lead>) => void
  /** Called when user wants to assign/reassign a lead to another user */
  onAssignLead?: (leadId: string, userId: string) => void
  /** Called when user wants to change a lead's status */
  onChangeStatus?: (leadId: string, newStatus: Lead['status']) => void
  /** Called when user wants to add a follow-up activity */
  onAddFollowUp?: (leadId: string, followUpData: FollowUpFormData) => void
  /** Called when user wants to upload a document */
  onUploadDocument?: (leadId: string, file: File, category: string) => void
  /** Called when user wants to view/download a document */
  onViewDocument?: (documentId: string) => void
  /** Called when user wants to delete a document */
  onDeleteDocument?: (documentId: string) => void
}
