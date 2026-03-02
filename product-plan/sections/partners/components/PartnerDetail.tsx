import { useState } from 'react'
import { ArrowLeft, Upload, Trash2, Eye, IndianRupee, FileText, Building2, Users, BarChart3, FileCheck, Clock } from 'lucide-react'
import type { PartnerDetailProps } from '../types'

type TabType = 'profile' | 'subscribers' | 'financial' | 'documents' | 'activity'

export function PartnerDetail({
  partner,
  onBack,
  onEditPartner,
  onViewIncidents,
  onUploadDocument,
  onDeleteDocument
}: PartnerDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  const handleEditClick = () => {
    onEditPartner?.(partner.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      profile: <Building2 className="w-4 h-4" />,
      subscribers: <Users className="w-4 h-4" />,
      financial: <BarChart3 className="w-4 h-4" />,
      documents: <FileCheck className="w-4 h-4" />,
      activity: <Clock className="w-4 h-4" />
    }
    return icons[tab]
  }

  const SubscriberStatusBadge = ({ status }: { status: 'active' | 'inactive' | 'paused' }) => {
    const styles = {
      active: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
      paused: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
    }
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{partner.companyName}</h1>
              <span className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${
                partner.status === 'active'
                  ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Partner ID: {partner.partnerId}</p>
          </div>
          <button
            onClick={handleEditClick}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            Edit Details
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit mb-6">
          {(['profile', 'subscribers', 'financial', 'documents', 'activity'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Partner Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <InfoField label="Contact Person" value={`${partner.firstName} ${partner.lastName}`} />
                    <InfoField label="Email" value={partner.email} />
                    <InfoField label="Mobile" value={partner.mobile} />
                    <InfoField label="Onboarded Date" value={formatDate(partner.dateOnboarded)} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Company Details</h3>
                  <div className="space-y-4">
                    <InfoField label="Company Name" value={partner.companyName} />
                    <InfoField label="Company Email" value={partner.officialEmail} />
                    <InfoField label="Company Phone" value={partner.phone} />
                    <InfoField label="Website" value={partner.website || 'Not provided'} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Address</h3>
                  <p className="text-slate-600 dark:text-slate-300">{partner.address}</p>
                  <p className="text-slate-600 dark:text-slate-300">{partner.city}, {partner.state} {partner.pinCode}</p>
                  <p className="text-slate-600 dark:text-slate-300">{partner.country}</p>
                </div>
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Subscribers ({partner.linkedSubscribers.length})</h2>
              {partner.linkedSubscribers.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No linked subscribers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscriber</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Mobile</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscribed</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incidents</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {partner.linkedSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-50">{subscriber.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{subscriber.company}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{subscriber.mobile}</td>
                          <td className="px-4 py-3">
                            <SubscriberStatusBadge status={subscriber.status} />
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(subscriber.dateSubscribed)}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                              {subscriber.incidentCount}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewIncidents?.(subscriber.id)}
                              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View Incidents
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

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Earnings & Payouts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-900/40 rounded-lg border border-cyan-200 dark:border-cyan-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-1">Total Earnings</p>
                      <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{formatCurrency(partner.earnings)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Total Paid Out</p>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(partner.totalPayouts)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">Pending</p>
                      <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{formatCurrency(partner.earnings - partner.totalPayouts)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Payout History</h3>
              <div className="space-y-2">
                {partner.payoutHistory.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No payouts yet</p>
                ) : (
                  partner.payoutHistory.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50">{formatCurrency(payout.amount)}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(payout.date)} • {payout.paymentMethod}</p>
                      </div>
                      <span className="inline-block px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium">
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Documents</h2>

              {showDocumentUpload && (
                <div className="mb-6 p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onUploadDocument?.(partner.id, file)
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
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              )}

              <div className="space-y-2">
                {partner.documents.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
                ) : (
                  partner.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-50">{doc.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{doc.type} • Uploaded {formatDate(doc.uploadedDate)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteDocument?.(partner.id, doc.id)}
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

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Activity Log</h2>
              <div className="space-y-3">
                {partner.activityLog.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No activity yet</p>
                ) : (
                  partner.activityLog.map((entry, idx) => (
                    <div key={entry.id} className={`flex gap-4 ${idx !== partner.activityLog.length - 1 ? 'pb-3 border-b border-slate-200 dark:border-slate-800' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5" />
                        {idx !== partner.activityLog.length - 1 && <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-800 my-1" />}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="font-medium text-slate-900 dark:text-slate-50">{entry.action}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{entry.details}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{formatDate(entry.timestamp)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
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
