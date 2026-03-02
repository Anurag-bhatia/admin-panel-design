// =============================================================================
// Data Types
// =============================================================================

export interface Address {
  country: string
  state: string
  city: string
  area: string
  addressLine: string
  pinCode: string
}

export interface Qualification {
  degree: string
  university: string
  yearOfCompletion: number
  percentage: number | null
  certificateUrl: string
}

export interface Experience {
  company: string
  role: string
  startDate: string
  endDate: string | null
  functionalArea: string
}

export interface Document {
  documentUrl: string | null
  uploadedAt: string | null
}

export interface DocumentWithNumber extends Document {
  number: string
}

export interface KYCDocuments {
  aadhaar: DocumentWithNumber
  pan: DocumentWithNumber
  drivingLicence: Document
  cancelledCheque: Document
  barId: DocumentWithNumber
  ballbCertificate: Document
}

export interface BankDetails {
  accountHolderName: string
  accountNumber: string
  bankName: string
  ifscCode: string
}

export interface Expertise {
  yearsOfExperience: number
  preferredLanguages: string[]
  preferredLocations: string[]
  caseTypes: string[]
}

export interface CompanyDetails {
  name: string
  email: string
  phone: string
  website: string
  address: string
  gstNumber: string
  panNumber: string
  gstDocumentUrl: string
  panDocumentUrl: string
  mainOffice: string
  branchOffices: string[]
}

export interface Lawyer {
  id: string
  lawyerId: string
  photo: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  category: string
  subCategory: string
  currentAddress: Address
  permanentAddress: Address
  qualifications: Qualification[]
  experience: Experience[]
  kycDocuments: KYCDocuments
  bankDetails: BankDetails
  expertise: Expertise
  company: CompanyDetails | null
  onboardingStatus: 'Complete' | 'Incomplete'
  kycStatus: 'Verified' | 'Pending' | 'Missing'
  activityState: 'Active' | 'Inactive'
  source: string
  createdAt: string
  lastUpdatedAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface LawyersProps {
  /** The list of lawyers to display */
  lawyers: Lawyer[]
  /** Called when user wants to view a lawyer's profile */
  onView?: (id: string) => void
  /** Called when user wants to edit a lawyer's profile */
  onEdit?: (id: string) => void
  /** Called when user wants to deactivate a lawyer */
  onDeactivate?: (id: string) => void
  /** Called when user wants to reactivate an inactive lawyer */
  onReactivate?: (id: string) => void
  /** Called when user wants to add a new lawyer */
  onAdd?: () => void
  /** Called when user wants to view or download a KYC document */
  onViewDocument?: (lawyerId: string, documentType: string) => void
  /** Called when user searches or filters the list */
  onSearch?: (query: string) => void
  /** Called when user filters by activity state */
  onFilterByActivity?: (state: 'Active' | 'Inactive' | 'All') => void
  /** Called when user filters by KYC status */
  onFilterByKYC?: (status: 'Verified' | 'Pending' | 'Missing' | 'All') => void
}
