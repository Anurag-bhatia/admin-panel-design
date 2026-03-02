import { useState } from 'react'
import { ArrowLeft, Upload, Trash2, FileText, Building2, CreditCard, AlertCircle, Wallet, Users, AlertTriangle } from 'lucide-react'
import type { Subscriber, Subscription, User as UserType } from '../types'

type TabType = 'details' | 'challans' | 'incidents' | 'documents' | 'subscription' | 'wallet' | 'team'

interface SubscriberDetailProps {
  subscriber: Subscriber
  subscription: Subscription | null
  assignedUser: UserType | null
  incidents?: any[]
  challans?: any[]
  documents?: any[]
  walletTransactions?: any[]
  teamMembers?: UserType[]
  onBack?: () => void
  onEdit?: (id: string) => void
  onUploadDocument?: (subscriberId: string, file: File) => void
  onDeleteDocument?: (subscriberId: string, docId: string) => void
  onViewIncident?: (incidentId: string) => void
  onViewChallan?: (challanId: string) => void
  onViewTransaction?: (transactionId: string) => void
  onAssignTeamMember?: () => void
  onRemoveTeamMember?: (userId: string) => void
}

export function SubscriberDetail({
  subscriber,
  subscription,
  assignedUser,
  incidents = [],
  challans = [],
  documents = [],
  walletTransactions = [],
  teamMembers = [],
  onBack,
  onEdit,
  onUploadDocument,
  onDeleteDocument,
  onViewIncident,
  onViewChallan,
  onViewTransaction,
  onAssignTeamMember,
  onRemoveTeamMember
}: SubscriberDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Building2 className="w-4 h-4" />,
      challans: <AlertCircle className="w-4 h-4" />,
      incidents: <AlertTriangle className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />,
      subscription: <CreditCard className="w-4 h-4" />,
      wallet: <Wallet className="w-4 h-4" />,
      team: <Users className="w-4 h-4" />
    }
    return icons[tab]
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
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{subscriber.subscriberName}</h1>
              <span className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${
                subscriber.status === 'active'
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {subscriber.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Subscriber ID: {subscriber.id}</p>
          </div>
          <button
            onClick={() => onEdit?.(subscriber.id)}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            Edit Details
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 -mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full">
            {(['details', 'challans', 'incidents', 'documents', 'subscription', 'wallet', 'team'] as TabType[]).map((tab) => (
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
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Subscriber Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Company Details</h3>
                  <div className="space-y-4">
                    <InfoField label="Company Alias" value={subscriber.companyAlias} />
                    <InfoField label="GST Number" value={subscriber.gstNumber} />
                    <InfoField label="Type" value={`${subscriber.type} - ${subscriber.subType}`} />
                    <InfoField label="Fleet Size" value={`${subscriber.numberOfTrucks} Trucks`} />
                    <InfoField label="Source" value={subscriber.source} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <InfoField label="Contact Person" value={subscriber.contactPerson} />
                    <InfoField label="Email" value={subscriber.emailId} />
                    <InfoField label="Phone" value={subscriber.phoneNumber} />
                    <InfoField label="Assigned Owner" value={assignedUser ? assignedUser.fullName : 'Unassigned'} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Address</h3>
                  <p className="text-slate-600 dark:text-slate-300">{subscriber.addressLane}</p>
                  <p className="text-slate-600 dark:text-slate-300">{subscriber.area}, {subscriber.city}, {subscriber.state} {subscriber.pinCode}</p>
                  <p className="text-slate-600 dark:text-slate-300">{subscriber.country}</p>
                </div>
                <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-800 pt-6">
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

          {/* Challans Tab */}
          {activeTab === 'challans' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Challans ({challans.length})</h2>
              {challans.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No challans linked to this subscriber yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Challan ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Violation</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {challans.map((challan) => (
                        <tr key={challan.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{challan.id}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{challan.vehicleNumber}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{challan.violation}</td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">₹{challan.amount?.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              challan.status === 'resolved'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : challan.status === 'pending'
                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {challan.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(challan.date)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewChallan?.(challan.id)}
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

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Incidents ({incidents.length})</h2>
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No incidents linked to this subscriber yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{incident.id}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{incident.vehicleNumber}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                              {incident.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(incident.date)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewIncident?.(incident.id)}
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
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              )}

              <div className="space-y-2">
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-50">{doc.fileName}</p>
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

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Subscription Details</h2>
              {subscription ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Plan Information</h3>
                      <div className="space-y-4">
                        <InfoField label="Subscription Name" value={subscription.subscriptionName} />
                        <InfoField label="Plan Type" value={subscription.planType} />
                        <InfoField label="Vehicles Covered" value={subscription.vehiclesCount.toString()} />
                        <InfoField label="Status" value={subscription.subscriptionEnabled ? 'Active' : 'Inactive'} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Billing Period</h3>
                      <div className="space-y-4">
                        <InfoField label="Start Date" value={formatDate(subscription.startDate)} />
                        <InfoField label="End Date" value={formatDate(subscription.endDate)} />
                        {subscription.collectionDate && (
                          <InfoField label="Collection Date" value={formatDate(subscription.collectionDate)} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Subscription ID</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-mono">{subscription.id}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No active subscription</p>
                </div>
              )}
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Wallet & Transactions</h2>

              {/* Wallet Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mb-1">Total Paid</p>
                  <p className="text-2xl font-semibold text-emerald-900 dark:text-emerald-50">₹0</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">Credits</p>
                  <p className="text-2xl font-semibold text-amber-900 dark:text-amber-50">₹0</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-700 dark:text-red-400 font-medium mb-1">Outstanding</p>
                  <p className="text-2xl font-semibold text-red-900 dark:text-red-50">₹0</p>
                </div>
              </div>

              {/* Transaction History */}
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Transaction History</h3>
              {walletTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No transactions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Description</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {walletTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(transaction.date)}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">{transaction.description}</td>
                          <td className={`px-4 py-3 text-sm font-medium text-right ${
                            transaction.type === 'credit'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount?.toLocaleString('en-IN')}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewTransaction?.(transaction.id)}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Team Members ({teamMembers.length})</h2>
                <button
                  onClick={onAssignTeamMember}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Assign Member
                </button>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No team members assigned yet</p>
                  <button
                    onClick={onAssignTeamMember}
                    className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    Assign Team Member
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-semibold">
                          {member.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-50">{member.fullName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{member.role} • {member.team}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveTeamMember?.(member.id)}
                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
