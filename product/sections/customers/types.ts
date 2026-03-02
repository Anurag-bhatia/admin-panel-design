// =============================================================================
// Data Types
// =============================================================================

export interface FinancialSummary {
  totalSpend: number
  pendingPayments: number
  paidAmount: number
  refundsIssued: number
}

export interface Customer {
  id: string
  customerId: string
  name: string
  email: string
  mobile: string
  accountCreatedDate: string
  lastActivity: string
  totalVehicles: number
  totalIncidents: number
  paymentStatus: 'paid' | 'pending'
  vehicleIds: string[]
  incidentIds: string[]
  challanIds: string[]
  financialSummary: FinancialSummary
}

export interface Vehicle {
  id: string
  customerId: string
  vehicleNumber: string
  vehicleType: string
  make: string
  model: string
  registrationDate: string
  status: 'active' | 'inactive'
}

export interface Incident {
  id: string
  incidentId: string
  customerId: string
  vehicleId: string
  vehicleNumber: string
  incidentType: string
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved' | 'refunded'
  tatProgress: number
  outcome: string
  createdDate: string
  resolvedDate: string | null
}

export interface Challan {
  id: string
  challanId: string
  incidentId: string
  vehicleId: string
  vehicleNumber: string
  challanType: string
  amount: number
  paymentStatus: 'paid' | 'pending' | 'refunded'
  resolutionState: 'pending' | 'assigned' | 'in-review' | 'paid' | 'dismissed' | 'refunded'
  issuedDate: string
  dueDate: string
}

export interface ActivityLog {
  id: string
  customerId: string
  timestamp: string
  action: string
  description: string
  performedBy: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface CustomerListProps {
  /** The list of customers to display */
  customers: Customer[]
  /** Called when user searches for customers */
  onSearch?: (query: string) => void
  /** Called when user wants to view a customer's details */
  onViewCustomer?: (customerId: string) => void
  /** Called when user wants to add a new customer */
  onAddCustomer?: () => void
  /** Called when user wants to bulk upload customers */
  onBulkUpload?: () => void
  /** Called when user wants to export selected customers */
  onExport?: (customerIds: string[]) => void
  /** Called when user wants to apply bulk status updates */
  onBulkStatusUpdate?: (customerIds: string[], status: string) => void
  /** Called when user wants to apply bulk tagging */
  onBulkTag?: (customerIds: string[], tags: string[]) => void
}

export interface CustomerDetailProps {
  /** The customer to display */
  customer: Customer
  /** List of vehicles associated with the customer */
  vehicles: Vehicle[]
  /** List of incidents associated with the customer */
  incidents: Incident[]
  /** List of challans associated with the customer */
  challans: Challan[]
  /** List of activity logs for the customer */
  activityLogs: ActivityLog[]
  /** Called when user wants to edit customer details */
  onEditCustomer?: (customerId: string) => void
  /** Called when user wants to create a new incident for the customer */
  onCreateIncident?: (customerId: string) => void
  /** Called when user wants to view full incident details */
  onViewIncident?: (incidentId: string) => void
  /** Called when user wants to update incident status quickly */
  onUpdateIncidentStatus?: (incidentId: string, status: Incident['status']) => void
  /** Called when user wants to view full challan details */
  onViewChallan?: (challanId: string) => void
  /** Called when user wants to view vehicle details */
  onViewVehicle?: (vehicleId: string) => void
  /** Called when user wants to navigate back to customer list */
  onBack?: () => void
}
