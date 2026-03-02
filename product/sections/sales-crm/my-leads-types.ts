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
  status: 'assigned' | 'new' | 'follow-up' | 'quotations' | 'projected' | 'invoiced' | 'sales' | 'lost'
  assignedTo: string
  assignedTeam: string
  createdDate: string
  lastActivityDate: string
  nextFollowUpDate: string | null
  temperature?: 'warm' | 'cold' | null
  conversionDate?: string
  lossReason?: string
  lossDate?: string
}

export interface TodaysMeeting {
  id: string
  leadId: string
  leadName: string
  timeSlot: string
  meetingType: string
  duration: string
}

export interface TodaysPriority {
  id: string
  leadId: string
  leadName: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  daysWaiting: number
}

export interface TimelineActivity {
  id: string
  leadId: string
  activityType: string
  description: string
  performedBy: string
  performedAt: string
}

export interface User {
  id: string
  fullName: string
  email: string
  role: string
  team: string
}

export interface CurrentUser {
  id: string
  fullName: string
  email: string
  role: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface MyLeadsProps {
  /** Current logged-in user information */
  currentUser: CurrentUser
  /** Leads assigned to or followed up by the current user */
  leads: Lead[]
  /** Today's scheduled meetings */
  todaysMeetings: TodaysMeeting[]
  /** Today's priority actions */
  todaysPriorities: TodaysPriority[]
  /** Timeline activities for leads */
  timelineActivities: TimelineActivity[]
  /** List of users in the system */
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
  /** Called when user clicks on a lead row to view full details */
  onViewLead?: (leadId: string) => void
  /** Called when user logs a follow-up and schedules next action */
  onLogFollowUp?: (leadId: string, note: string, nextFollowUpDate: string) => void
  /** Called when user sends or marks a quotation as sent */
  onSendQuotation?: (leadId: string) => void
  /** Called when user marks a lead as converted */
  onMarkConverted?: (leadId: string) => void
  /** Called when user marks a lead as lost with a reason */
  onMarkLost?: (leadId: string, reason: string) => void
  /** Called when user edits a lead */
  onEditLead?: (id: string, leadData: Partial<Lead>) => void
  /** Called when user adds a follow-up activity */
  onAddFollowUp?: (leadId: string, followUpData: any) => void
  /** Called when user uploads a document */
  onUploadDocument?: (leadId: string, file: File, category: string) => void
}
