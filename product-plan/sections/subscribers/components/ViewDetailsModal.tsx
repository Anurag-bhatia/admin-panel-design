import { useState } from 'react'
import { X, Mail, Phone, MapPin, Building2, Hash, Calendar, User, TruckIcon, Upload, Trash2, FileText, CreditCard, AlertCircle } from 'lucide-react'
import type { Subscriber, Subscription, User as UserType } from '../types'

type TabType = 'details' | 'incidents' | 'subscription' | 'documents' | 'team'

interface ViewDetailsModalProps {
  subscriber: Subscriber
  subscription: Subscription | null
  assignedUser: UserType | null
  incidents?: any[]
  documents?: any[]
  onClose: () => void
  onEdit: (id: string) => void
  onUploadDocument?: (subscriberId: string, file: File) => void
  onDeleteDocument?: (subscriberId: string, docId: string) => void
  onViewIncident?: (incidentId: string) => void
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function ViewDetailsModal({
  subscriber,
  subscription,
  assignedUser,
  incidents = [],
  documents = [],
  onClose,
  onEdit,
  onUploadDocument,
  onDeleteDocument,
  onViewIncident
}: ViewDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Building2 className="w-4 h-4" />,
      incidents: <AlertCircle className="w-4 h-4" />,
      subscription: <CreditCard className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />
    }
    return icons[tab]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">
              {subscriber.subscriberName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subscriber.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
            {(['details', 'incidents', 'subscription', 'documents'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
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

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-280px)] overflow-y-auto">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  subscriber.status === 'active'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {subscriber.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {subscriber.source}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <InfoField label="Company Alias" value={subscriber.companyAlias} />
                    <InfoField label="GST Number" value={subscriber.gstNumber} />
                    <InfoField label="Type" value={`${subscriber.type} - ${subscriber.subType}`} />
                    <InfoField label="Fleet Size" value={`${subscriber.numberOfTrucks} Trucks`} />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <InfoField label="Contact Person" value={subscriber.contactPerson} />
                    <InfoField label="Email" value={subscriber.emailId} />
                    <InfoField label="Phone" value={subscriber.phoneNumber} />
                    <InfoField label="Assigned Owner" value={assignedUser ? assignedUser.fullName : 'Unassigned'} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Address</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{subscriber.addressLane}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{subscriber.area}, {subscriber.city}, {subscriber.state} {subscriber.pinCode}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{subscriber.country}</p>
                </div>

                <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoField label="Created" value={formatDate(subscriber.createdDate)} />
                    <InfoField label="Last Updated" value={formatDate(subscriber.lastUpdated)} />
                    <InfoField label="Last Login" value={formatDate(subscriber.lastLogin)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Incidents ({incidents.length})</h3>
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No incidents linked to this subscriber yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-slate-50">{incident.id}</td>
                          <td className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300">{incident.vehicleNumber}</td>
                          <td className="px-3 py-2">
                            <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                              {incident.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300">{formatDate(incident.date)}</td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() => onViewIncident?.(incident.id)}
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

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-6">Subscription Details</h3>
              {subscription ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-50 mb-3">Plan Information</h4>
                      <div className="space-y-3">
                        <InfoField label="Subscription Name" value={subscription.subscriptionName} />
                        <InfoField label="Plan Type" value={subscription.planType} />
                        <InfoField label="Vehicles Covered" value={subscription.vehiclesCount.toString()} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-50 mb-3">Billing Period</h4>
                      <div className="space-y-3">
                        <InfoField label="Start Date" value={formatDate(subscription.startDate)} />
                        <InfoField label="End Date" value={formatDate(subscription.endDate)} />
                        <InfoField label="Status" value={subscription.subscriptionEnabled ? 'Active' : 'Inactive'} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No active subscription</p>
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Documents</h3>

              {showDocumentUpload && (
                <div className="mb-4 p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onUploadDocument?.(subscriber.id, file)
                        setShowDocumentUpload(false)
                      }
                    }}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Click to upload a document</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
              )}

              {!showDocumentUpload && (
                <button
                  onClick={() => setShowDocumentUpload(true)}
                  className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              )}

              <div className="space-y-2">
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{doc.fileName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category} • Uploaded {formatDate(doc.uploadedDate)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteDocument?.(subscriber.id, doc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onEdit(subscriber.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Edit Subscriber
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-sm text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  )
}
