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
} from 'lucide-react'
import type { Lawyer } from '@/../product/sections/lawyers/types'

type TabType = 'details' | 'documents' | 'incidents' | 'invoicing' | 'transactions'

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

interface LawyerProfileProps {
  lawyer: Lawyer
  incidents?: LawyerIncident[]
  pendingInvoices?: PendingInvoice[]
  transactions?: LawyerTransaction[]
  initialTab?: TabType
  onBack: () => void
  onEdit: () => void
  onDeactivate: () => void
  onReactivate: () => void
  onViewIncident?: (incidentId: string) => void
  onViewTransaction?: (transactionId: string) => void
  onRaiseInvoice?: () => void
}

export function LawyerProfile({
  lawyer,
  incidents = [],
  pendingInvoices = [],
  transactions = [],
  initialTab = 'details',
  onBack,
  onEdit,
  onDeactivate,
  onReactivate,
  onViewIncident,
  onViewTransaction,
  onRaiseInvoice,
}: LawyerProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const isActive = lawyer.activityState === 'Active'
  const fullName = `${lawyer.firstName} ${lawyer.lastName}`

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Briefcase className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />,
      incidents: <AlertTriangle className="w-4 h-4" />,
      invoicing: <Receipt className="w-4 h-4" />,
      transactions: <Wallet className="w-4 h-4" />,
    }
    return icons[tab]
  }

  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.commissionAmount, 0)

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
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Lawyer Profile</h1>
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
                {lawyer.firstName[0]}{lawyer.lastName[0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{fullName}</h2>
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
              <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mb-4">
                {lawyer.lawyerId}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="w-4 h-4" />
                  {lawyer.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="w-4 h-4" />
                  {lawyer.mobile}
                </div>
              </div>
            </div>
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
          </div>
        </div>

        {/* Main content + Timeline sidebar */}
        <div className="flex gap-6 items-start">
          {/* Left: Tabs + Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full">
                {(['details', 'documents', 'incidents', 'invoicing', 'transactions'] as TabType[]).map((tab) => (
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
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Section title="Basic Information" icon={<Briefcase className="w-4 h-4" />}>
                <InfoRow label="Category" value={lawyer.category} />
                <InfoRow label="Sub-Category" value={lawyer.subCategory} />
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

              {/* Company Details */}
              {lawyer.company && (
                <Section title="Company Details" icon={<Building2 className="w-4 h-4" />} fullWidth>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <InfoRow label="Company Name" value={lawyer.company.name} />
                    <InfoRow label="Email" value={lawyer.company.email} />
                    <InfoRow label="Phone" value={lawyer.company.phone} />
                    <InfoRow label="Website" value={lawyer.company.website} />
                    <InfoRow label="GST Number" value={lawyer.company.gstNumber} />
                    <InfoRow label="PAN Number" value={lawyer.company.panNumber} />
                    <InfoRow label="Main Office" value={lawyer.company.mainOffice} />
                    <InfoRow
                      label="Branch Offices"
                      value={lawyer.company.branchOffices.join(', ') || 'None'}
                    />
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Address</p>
                    <p className="text-sm text-slate-900 dark:text-white">{lawyer.company.address}</p>
                  </div>
                </Section>
              )}

              {/* Current Address */}
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
                Assigned Incidents ({incidents.length})
              </h2>
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No incidents assigned to this lawyer yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Challan No</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle No</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Violation Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Assigned Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Resolution Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{incident.incidentId}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{incident.challanNo}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{incident.vehicleNo}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{incident.violationType}</td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{formatCurrency(incident.amount)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              incident.status === 'Resolved' || incident.status === 'Closed'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : incident.status === 'In Progress'
                                ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            }`}>
                              {incident.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(incident.assignedDate)}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                            {incident.resolutionDate ? formatDate(incident.resolutionDate) : '-'}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewIncident?.(incident.incidentId)}
                              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              View Details
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

          {/* Invoicing Tab */}
          {activeTab === 'invoicing' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Pending to Invoice ({pendingInvoices.length})
                </h2>
                <button
                  onClick={onRaiseInvoice}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Raise Invoice
                </button>
              </div>

              {/* Summary Card */}
              <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">Total Pending Amount</p>
                <p className="text-2xl font-semibold text-amber-900 dark:text-amber-50">{formatCurrency(totalPendingAmount)}</p>
              </div>

              {pendingInvoices.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No payments pending to invoice</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Resolution Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Fees</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {pendingInvoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{invoice.incidentId}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(invoice.resolutionDate)}</td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{formatCurrency(invoice.commissionAmount)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              invoice.status === 'Settled'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : invoice.status === 'Refund'
                                ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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

