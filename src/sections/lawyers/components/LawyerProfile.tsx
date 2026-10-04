import { useState } from 'react'
import {
  ArrowLeft,
  Pencil,
  UserX,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  Building2,
  CreditCard,
  Globe,
  Download,
  AlertTriangle,
  Receipt,
  Wallet,
  Plus,
  Activity,
  Eye,
  Upload,
  Users,
  Sparkles,
} from 'lucide-react'
import type { Lawyer } from '@/../product/sections/lawyers/types'

type TabType = 'details' | 'workingArea' | 'documents' | 'incidents' | 'invoicing' | 'transactions' | 'team'

interface LawyerIncident {
  id: string
  incidentId: string
  challanNo: string
  vehicleNo: string
  violationType: string
  amount: number
  status: 'Assigned' | 'In Progress' | 'Resolved' | 'Closed'
  assignedDate: string
  resolutionDate: string | null
  assignedTo?: string
  subscriberName?: string
  subscriberId?: string
  challanType?: 'court' | 'online'
  createdAt?: string
  updatedAt?: string
  isExpress?: boolean
}

interface PendingInvoice {
  id: string
  incidentId: string
  resolutionDate: string
  commissionAmount: number
  status: 'Settled' | 'Not Settled' | 'Refund'
}

interface LawyerTransaction {
  id: string
  transactionId: string
  invoiceNo: string
  amount: number
  paymentDate: string
  paymentMethod: 'Bank Transfer' | 'UPI' | 'Cheque' | 'Cash'
  status: 'Paid' | 'Processing' | 'Failed'
}

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  mobile: string
  assignedIncidents: number
  activeIncidents: number
  resolvedIncidents: number
  joinedDate: string
  status: 'Active' | 'Inactive'
  incidentIds?: string[]
  isOwner?: boolean
}

interface LawyerProfileProps {
  lawyer: Lawyer
  incidents?: LawyerIncident[]
  pendingInvoices?: PendingInvoice[]
  transactionsLedger?: PendingInvoice[]
  transactions?: LawyerTransaction[]
  team?: TeamMember[]
  initialTab?: TabType
  onBack: () => void
  onEdit: () => void
  onDeactivate: () => void
  onReactivate: () => void
  onViewIncident?: (incidentId: string) => void
  onViewTransaction?: (transactionId: string) => void
  onViewTeamMember?: (memberId: string) => void
  onViewTeamMemberProfile?: (member: TeamMember) => void
  onRaiseInvoice?: () => void
}

export function LawyerProfile({
  lawyer,
  incidents = [],
  pendingInvoices = [],
  transactionsLedger = [],
  transactions = [],
  team = [],
  initialTab = 'details',
  onBack,
  onEdit,
  onDeactivate,
  onReactivate,
  onViewIncident,
  onViewTransaction,
  onViewTeamMember,
  onViewTeamMemberProfile,
  onRaiseInvoice,
}: LawyerProfileProps) {
  const isBusiness = lawyer.company !== null
  const availableTabs: TabType[] = isBusiness
    ? ['details', 'workingArea', 'incidents', 'invoicing', 'transactions', 'team']
    : ['details', 'workingArea', 'documents', 'incidents', 'invoicing', 'transactions']

  const displayedIncidents: LawyerIncident[] =
    isBusiness && team.length > 0
      ? incidents.map((incident, index) => ({
          ...incident,
          assignedTo: incident.assignedTo ?? team[index % team.length].name,
        }))
      : incidents
  const [activeTab, setActiveTab] = useState<TabType>(
    availableTabs.includes(initialTab) ? initialTab : 'details'
  )
  const [incidentsSubTab, setIncidentsSubTab] = useState<'assigned' | 'settled'>('settled')
  const assignedIncidents = displayedIncidents.filter(
    (i) => i.status === 'Assigned' || i.status === 'In Progress'
  )
  const settledIncidents = displayedIncidents.filter(
    (i) => i.status === 'Resolved' || i.status === 'Closed'
  )
  const visibleIncidents = incidentsSubTab === 'assigned' ? assignedIncidents : settledIncidents
  const isActive = lawyer.activityState === 'Active'
  const fullName = `${lawyer.firstName} ${lawyer.lastName}`

  const businessInitials = (name: string): string => {
    const words = name.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) return ''
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  const headerTitle = isBusiness ? 'Business Profile' : 'Lawyer Profile'
  const displayName = isBusiness && lawyer.company ? lawyer.company.name : fullName
  const displayInitials =
    isBusiness && lawyer.company
      ? businessInitials(lawyer.company.name)
      : `${lawyer.firstName[0]}${lawyer.lastName[0]}`
  const displayEmail = isBusiness && lawyer.company ? lawyer.company.email : lawyer.email
  const displayPhone = isBusiness && lawyer.company ? lawyer.company.phone : lawyer.mobile
  const displayId = isBusiness ? lawyer.lawyerId.replace(/^LAW-/, 'BIZ-') : lawyer.lawyerId

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Briefcase className="w-4 h-4" />,
      workingArea: <MapPin className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />,
      incidents: <AlertTriangle className="w-4 h-4" />,
      invoicing: <Receipt className="w-4 h-4" />,
      transactions: <Wallet className="w-4 h-4" />,
      team: <Users className="w-4 h-4" />,
    }
    return icons[tab]
  }

  const getTabLabel = (tab: TabType): string => {
    if (tab === 'details' && isBusiness) return 'Business Details'
    if (tab === 'workingArea') return 'Working Area'
    return tab.charAt(0).toUpperCase() + tab.slice(1)
  }

  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{headerTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            {isActive ? (
              <button
                onClick={onDeactivate}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <UserX className="w-4 h-4" />
                Deactivate
              </button>
            ) : (
              <button
                onClick={onReactivate}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                Reactivate
              </button>
            )}
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-14 h-14 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-cyan-700 dark:text-cyan-400">
                {displayInitials}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{displayName}</h2>
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lawyer.activityState}
                </span>
              </div>
              <p className={`text-sm text-slate-500 dark:text-slate-400 font-mono ${isBusiness ? '' : 'mb-4'}`}>
                {displayId}
              </p>
              {!isBusiness && (
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    {displayEmail}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4" />
                    {displayPhone}
                  </div>
                </div>
              )}
            </div>
            {!isBusiness && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">KYC:</span>
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      lawyer.kycStatus === 'Verified'
                        ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {lawyer.kycStatus}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content + Timeline sidebar */}
        <div className="flex gap-6 items-start">
          {/* Left: Tabs + Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full">
                {availableTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {getTabIcon(tab)}
                    {getTabLabel(tab)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {!isBusiness && (
                <>
                  {/* Basic Information */}
                  <Section title="Basic Information" icon={<Briefcase className="w-4 h-4" />}>
                    <InfoRow label="Category" value={lawyer.category} />
                    <InfoRow label="Gender" value={lawyer.gender} />
                    <InfoRow label="Date of Birth" value={formatDate(lawyer.dateOfBirth)} />
                    <InfoRow label="Source" value={lawyer.source} />
                  </Section>

                  {/* Bank Details */}
                  <Section title="Bank Details" icon={<CreditCard className="w-4 h-4" />}>
                    <InfoRow label="Account Holder" value={lawyer.bankDetails.accountHolderName} />
                    <InfoRow label="Account Number" value={lawyer.bankDetails.accountNumber} />
                    <InfoRow label="Bank Name" value={lawyer.bankDetails.bankName} />
                    <InfoRow label="IFSC Code" value={lawyer.bankDetails.ifscCode} />
                  </Section>

                  {/* Qualifications */}
                  <Section title="Qualifications" icon={<GraduationCap className="w-4 h-4" />}>
                    {lawyer.qualifications.map((qual, index) => (
                      <div
                        key={index}
                        className="py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
                      >
                        <p className="font-medium text-slate-900 dark:text-white">{qual.degree}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{qual.university}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          {qual.yearOfCompletion}
                          {qual.percentage && ` • ${qual.percentage}%`}
                        </p>
                      </div>
                    ))}
                  </Section>

                  {/* Experience */}
                  <Section title="Experience" icon={<Calendar className="w-4 h-4" />}>
                    {lawyer.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
                      >
                        <p className="font-medium text-slate-900 dark:text-white">{exp.role}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{exp.company}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{exp.functionalArea}</p>
                      </div>
                    ))}
                  </Section>

                  {/* Expertise */}
                  <Section title="Expertise" icon={<Sparkles className="w-4 h-4" />} fullWidth>
                    {lawyer.expertise.caseTypes.length === 0 ? (
                      <p className="py-3 text-sm text-slate-500 dark:text-slate-400">
                        No expertise added yet.
                      </p>
                    ) : (
                      <div className="py-3 flex flex-wrap gap-2">
                        {lawyer.expertise.caseTypes.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-900/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Section>
                </>
              )}

              {/* Company Details */}
              {lawyer.company && (
                <Section title="Company Details" icon={<Building2 className="w-4 h-4" />} fullWidth>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <InfoRow label="Company Name" value={lawyer.company.name} />
                    <InfoRow label="Email" value={lawyer.company.email} />
                    <InfoRow label="Phone" value={lawyer.company.phone} />
                    <InfoRow label="GST Number" value={lawyer.company.gstNumber} />
                    <InfoRow label="PAN Number" value={lawyer.company.panNumber} />
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Address</p>
                    <p className="text-sm text-slate-900 dark:text-white">{lawyer.company.address}</p>
                  </div>
                </Section>
              )}

              {/* Expertise (Business) */}
              {isBusiness && (
                <Section title="Expertise" icon={<Sparkles className="w-4 h-4" />} fullWidth>
                  {lawyer.expertise.caseTypes.length === 0 ? (
                    <p className="py-3 text-sm text-slate-500 dark:text-slate-400">
                      No expertise added yet.
                    </p>
                  ) : (
                    <div className="py-3 flex flex-wrap gap-2">
                      {lawyer.expertise.caseTypes.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-900/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Section>
              )}

              {!isBusiness && (
                /* Current Address */
                <Section title="Current Address" icon={<MapPin className="w-4 h-4" />}>
                  <div className="py-3">
                    <p className="text-sm text-slate-900 dark:text-white">
                      {lawyer.currentAddress.addressLine}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {lawyer.currentAddress.area}, {lawyer.currentAddress.city}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {lawyer.currentAddress.state}, {lawyer.currentAddress.country} -{' '}
                      {lawyer.currentAddress.pinCode}
                    </p>
                  </div>
                </Section>
              )}
            </div>
          )}

          {/* Working Area Tab */}
          {activeTab === 'workingArea' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Working Area</h2>
              {lawyer.expertise.preferredLocations.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No working areas added yet.
                </p>
              ) : (
                <ul className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  {lawyer.expertise.preferredLocations.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      <span className="text-sm text-slate-900 dark:text-slate-50">{area}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Documents</h2>
                {!showDocumentUpload && (
                  <button
                    onClick={() => setShowDocumentUpload(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                )}
              </div>

              {showDocumentUpload && (
                <div className="mb-6 p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <input type="file" onChange={() => setShowDocumentUpload(false)} className="hidden" id="lawyer-doc-upload" />
                  <label htmlFor="lawyer-doc-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Click to upload a document</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
              )}

              <div className="space-y-2">
                {[
                  { label: 'Aadhaar Card', number: lawyer.kycDocuments.aadhaar.number, url: lawyer.kycDocuments.aadhaar.documentUrl, uploaded: lawyer.kycDocuments.aadhaar.uploadedAt },
                  { label: 'PAN Card', number: lawyer.kycDocuments.pan.number, url: lawyer.kycDocuments.pan.documentUrl, uploaded: lawyer.kycDocuments.pan.uploadedAt },
                  { label: 'Driving Licence', url: lawyer.kycDocuments.drivingLicence.documentUrl, uploaded: lawyer.kycDocuments.drivingLicence.uploadedAt },
                  { label: 'Cancelled Cheque', url: lawyer.kycDocuments.cancelledCheque.documentUrl, uploaded: lawyer.kycDocuments.cancelledCheque.uploadedAt },
                  { label: 'Bar ID', number: lawyer.kycDocuments.barId.number, url: lawyer.kycDocuments.barId.documentUrl, uploaded: lawyer.kycDocuments.barId.uploadedAt },
                  { label: 'BALLB Certificate', url: lawyer.kycDocuments.ballbCertificate.documentUrl, uploaded: lawyer.kycDocuments.ballbCertificate.uploadedAt },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${doc.url ? 'text-cyan-500' : 'text-slate-300 dark:text-slate-600'}`} />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50">{doc.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {doc.number && <span className="font-mono mr-2">{doc.number}</span>}
                          {doc.uploaded ? `Uploaded ${formatDate(doc.uploaded)}` : 'Not uploaded'}
                        </p>
                      </div>
                    </div>
                    {doc.url ? (
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-red-500 dark:text-red-400">Missing</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Incidents
              </h2>
              <div className="flex items-center gap-1 mb-4 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIncidentsSubTab('settled')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    incidentsSubTab === 'settled'
                      ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Settled ({settledIncidents.length})
                </button>
                <button
                  onClick={() => setIncidentsSubTab('assigned')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    incidentsSubTab === 'assigned'
                      ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Assigned ({assignedIncidents.length})
                </button>
              </div>
              {visibleIncidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    {incidentsSubTab === 'assigned'
                      ? isBusiness
                        ? 'No incidents assigned to this business yet'
                        : 'No incidents assigned to this lawyer yet'
                      : 'No settled incidents yet'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/40">
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Incident ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subscriber / Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {incidentsSubTab === 'settled' ? 'Total Amount' : 'Challan No / Amount'}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Challan</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Updated</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleIncidents.map((incident) => {
                        const createdAt = incident.createdAt ?? incident.assignedDate
                        const updatedAt = incident.updatedAt ?? incident.resolutionDate ?? incident.assignedDate
                        const slaDays = incident.isExpress ? 10 : 42
                        const created = new Date(createdAt).getTime()
                        const deadline = created + slaDays * 24 * 60 * 60 * 1000
                        const daysLeft = Math.ceil((deadline - Date.now()) / (24 * 60 * 60 * 1000))
                        const challanType = incident.challanType ?? 'court'
                        return (
                          <tr
                            key={incident.id}
                            className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                {incident.isExpress && (
                                  <span className="inline-flex items-center px-1 py-px rounded text-[9px] font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 mb-1">
                                    Express
                                  </span>
                                )}
                                <span className="block font-mono text-sm font-medium text-slate-900 dark:text-white">
                                  {incident.incidentId}
                                </span>
                                {daysLeft <= 0 ? (
                                  <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                                    Overdue by {Math.abs(daysLeft)} {Math.abs(daysLeft) === 1 ? 'day' : 'days'}
                                  </p>
                                ) : (
                                  <p className="text-xs text-cyan-600 dark:text-cyan-400">
                                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  {incident.subscriberName ?? '—'}
                                </p>
                                {incident.subscriberId && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {incident.subscriberId}
                                  </p>
                                )}
                                <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {incident.vehicleNo}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {incidentsSubTab === 'settled' ? (
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                  {formatCurrency(incident.amount)}
                                </p>
                              ) : (
                                <>
                                  <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                                    {incident.challanNo}
                                  </p>
                                  <p className="mt-2 text-xs font-medium text-slate-900 dark:text-white">
                                    {formatCurrency(incident.amount)}
                                  </p>
                                </>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  challanType === 'court'
                                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                    : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                }`}
                              >
                                {challanType === 'court' ? 'Court' : 'Online'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                {formatDate(createdAt)}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {formatTime(createdAt)}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                {formatDate(updatedAt)}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {formatTime(updatedAt)}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  incident.status === 'Resolved' || incident.status === 'Closed'
                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                    : incident.status === 'In Progress'
                                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                }`}
                              >
                                {incident.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Invoicing Tab */}
          {activeTab === 'invoicing' && (
            <div>
              {/* Transactions Ledger */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  Transactions Ledger ({transactionsLedger.length})
                </h2>
                {transactionsLedger.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">No ledger entries yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Transaction ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {transactionsLedger.map((entry) => (
                          <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{entry.incidentId}</td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(entry.resolutionDate)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{formatCurrency(entry.commissionAmount)}</td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                Paid
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">
                Payment History ({transactions.length})
              </h2>

              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No payment transactions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Transaction ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Invoice No</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Payment Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Payment Method</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{transaction.transactionId}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{transaction.invoiceNo}</td>
                          <td className="px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(transaction.amount)}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(transaction.paymentDate)}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{transaction.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              transaction.status === 'Paid'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : transaction.status === 'Processing'
                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewTransaction?.(transaction.transactionId)}
                              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">
                Team Members ({team.length})
              </h2>

              {team.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No team members added yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Assigned Incidents</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Joined</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {team.map((member) => {
                        const openProfile = () => {
                          onViewTeamMember?.(member.id)
                          onViewTeamMemberProfile?.(member)
                        }
                        return (
                          <tr
                            key={member.id}
                            onClick={openProfile}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900 dark:text-slate-50">{member.name}</span>
                                {member.isOwner && (
                                  <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                                    Owner
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{member.assignedIncidents}</td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(member.joinedDate)}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                                member.status === 'Active'
                                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                              }`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openProfile()
                                }}
                                className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                              >
                                View Profile
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
          </div>

          {/* Right: Activity Timeline */}
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center gap-2.5 mb-6">
                <Activity className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Timeline</h3>
              </div>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-5">
                  {lawyer.activity.map((item, index) => (
                    <div key={index} className="relative pl-6">
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-cyan-400 border-2 border-white dark:border-slate-900" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">{item.label}</p>
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-0.5">
                        {new Date(item.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function Section({
  title,
  icon,
  children,
  fullWidth,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  fullWidth?: boolean
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg ${
        fullWidth ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <span className="text-slate-400 dark:text-slate-500">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-start gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{label}</p>
      <p className="text-sm text-slate-900 dark:text-white text-right">{value}</p>
    </div>
  )
}

