// =============================================================================
// Data Types
// =============================================================================

export type SubscriberStatus = 'active' | 'inactive'

export type SubscriberType = 'Fleet Operator' | 'Corporate' | 'Individual'

export type PaymentStatus = 'paid' | 'on_credit' | 'overdue' | 'expired'

export type CreditStatus = 'approved' | 'pending' | 'rejected' | null

export type PlanType = 'Monthly' | 'Quarterly' | 'Annual'

export type PriceCategory = 'Basic' | 'Standard' | 'Premium' | 'Enterprise'

export type VehicleType = 'truck' | 'car'

export type VehicleStatus = 'active' | 'inactive'

export type DriverStatus = 'active' | 'inactive'

export type FollowUpType = 'call' | 'email' | 'meeting' | 'whatsapp' | 'site_visit'

export type DocumentCategory = 'Contract' | 'KYC' | 'Invoice' | 'Fleet Data' | 'Technical' | 'Other'

export type UserStatus = 'active' | 'inactive'

export interface Subscriber {
  id: string
  source: string
  type: SubscriberType
  subType: string
  lotsFor: string
  numberOfTrucks: number
  phoneNumber: string
  country: string
  state: string
  city: string
  companyAlias: string
  subscriberName: string
  emailId: string
  contactPerson: string
  gstNumber: string
  area: string
  addressLane: string
  pinCode: string
  assignedOwner: string
  partnerId: string | null
  drivingLicenseNumber: string | null
  status: SubscriberStatus
  subscriptionId: string
  createdDate: string
  lastUpdated: string
  lastLogin: string
}

export interface Subscription {
  id: string
  subscriberId: string
  subscriptionName: string
  planType: PlanType
  startDate: string
  endDate: string
  vehiclesCount: number
  priceCategory: PriceCategory
  subtotal: number
  discountAmount: number
  taxAmount: number
  totalAmount: number
  paymentStatus: PaymentStatus
  invoiceNumber: string
  creditStatus: CreditStatus
  collectionDate: string | null
  subscriptionEnabled: boolean
}

export interface Vehicle {
  id: string
  subscriberId: string
  vehicleNumber: string
  vehicleType: VehicleType
  make: string
  model: string
  registrationDate: string
  status: VehicleStatus
}

export interface Driver {
  id: string
  subscriberId: string
  name: string
  phoneNumber: string
  licenseNumber: string
  licenseExpiry: string
  status: DriverStatus
}

export interface FollowUp {
  id: string
  subscriberId: string
  type: FollowUpType
  performedBy: string
  performedByName: string
  timestamp: string
  notes: string
  nextFollowUpDate: string | null
  outcome: string
}

export interface Document {
  id: string
  subscriberId: string
  fileName: string
  fileType: string
  fileSize: number
  category: DocumentCategory
  uploadedBy: string
  uploadedByName: string
  uploadedDate: string
}

export interface User {
  id: string
  fullName: string
  email: string
  role: string
  team: string
  status: UserStatus
}

export interface Partner {
  id: string
  name: string
  type: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SubscribersProps {
  /** The list of subscribers to display */
  subscribers: Subscriber[]
  /** Subscription details keyed by subscription ID */
  subscriptions: Subscription[]
  /** Available users for assignment */
  users: User[]
  /** Available partners for association */
  partners: Partner[]
  /** Available subscriber sources for filtering */
  subscriberSources: string[]
  /** Available subscriber types */
  subscriberTypes: string[]
  /** Subscriber sub-types grouped by type */
  subscriberSubTypes: Record<string, string[]>
  /** Available plan types for filtering */
  planTypes: string[]
  /** Available price categories */
  priceCategories: string[]

  // Subscriber list actions
  /** Called when user wants to view subscriber details */
  onViewDetails?: (id: string) => void
  /** Called when user wants to edit a subscriber */
  onEdit?: (id: string) => void
  /** Called when user wants to add a new subscriber */
  onAddSubscriber?: () => void
  /** Called when user wants to bulk upload subscribers */
  onBulkUpload?: () => void
  /** Called when user searches subscribers */
  onSearch?: (query: string) => void
  /** Called when user applies filters */
  onFilter?: (filters: SubscriberFilters) => void
}

export interface SubscriberFilters {
  status?: SubscriberStatus
  source?: string
  owner?: string
  state?: string
  city?: string
  planType?: PlanType
  paymentStatus?: PaymentStatus
}

export interface SubscriberDetailProps {
  /** The subscriber being viewed */
  subscriber: Subscriber
  /** The subscriber's subscription details */
  subscription: Subscription
  /** Vehicles registered under this subscriber */
  vehicles: Vehicle[]
  /** Drivers associated with this subscriber */
  drivers: Driver[]
  /** Follow-up activities for this subscriber */
  followUps: FollowUp[]
  /** Documents attached to this subscriber */
  documents: Document[]
  /** Team members assigned to this subscriber */
  assignedUsers: User[]
  /** Available users for assignment */
  availableUsers: User[]

  // Detail page actions
  /** Called when user wants to edit subscriber info */
  onEditSubscriber?: (id: string) => void
  /** Called when user wants to add a follow-up */
  onAddFollowUp?: () => void
  /** Called when user wants to edit a follow-up */
  onEditFollowUp?: (id: string) => void
  /** Called when user wants to add a vehicle */
  onAddVehicle?: () => void
  /** Called when user wants to edit a vehicle */
  onEditVehicle?: (id: string) => void
  /** Called when user wants to delete a vehicle */
  onDeleteVehicle?: (id: string) => void
  /** Called when user wants to add a driver */
  onAddDriver?: () => void
  /** Called when user wants to edit a driver */
  onEditDriver?: (id: string) => void
  /** Called when user wants to delete a driver */
  onDeleteDriver?: (id: string) => void
  /** Called when user wants to upload a document */
  onUploadDocument?: () => void
  /** Called when user wants to view a document */
  onViewDocument?: (id: string) => void
  /** Called when user wants to delete a document */
  onDeleteDocument?: (id: string) => void
  /** Called when user wants to manage subscription */
  onManageSubscription?: () => void
  /** Called when user wants to view linked incidents */
  onViewIncidents?: () => void
  /** Called when user wants to assign team members */
  onAssignTeam?: () => void
  /** Called when user navigates back to list */
  onBack?: () => void
}

export interface AddSubscriberFormProps {
  /** Available users for owner assignment */
  users: User[]
  /** Available partners for association */
  partners: Partner[]
  /** Available subscriber sources */
  subscriberSources: string[]
  /** Available subscriber types */
  subscriberTypes: string[]
  /** Subscriber sub-types grouped by type */
  subscriberSubTypes: Record<string, string[]>
  /** Called when form is submitted */
  onSubmit?: (data: Omit<Subscriber, 'id' | 'createdDate' | 'lastUpdated' | 'lastLogin' | 'subscriptionId'>) => void
  /** Called when form is cancelled */
  onCancel?: () => void
}

export interface BulkUploadModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Called when user downloads the template */
  onDownloadTemplate?: () => void
  /** Called when user uploads a file */
  onUpload?: (file: File) => void
  /** Called when modal is closed */
  onClose?: () => void
  /** Upload validation errors to display */
  validationErrors?: BulkUploadError[]
  /** Whether upload is in progress */
  isUploading?: boolean
}

export interface BulkUploadError {
  row: number
  field: string
  message: string
}
