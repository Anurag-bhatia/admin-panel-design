import { useState, useMemo } from 'react'
import { ArrowLeft, Upload, Trash2, FileText, Building2, CreditCard, AlertCircle, Wallet, Users, AlertTriangle, Truck, ChevronDown, Calendar } from 'lucide-react'
import type { Subscriber, Subscription, User as UserType, Vehicle } from '@/../product/sections/subscribers/types'

type TabType = 'details' | 'challans' | 'incidents' | 'documents' | 'vehicles' | 'wallet' | 'team'

interface SubscriberDetailProps {
  subscriber: Subscriber
  subscription: Subscription | null
  assignedUser: UserType | null
  incidents?: any[]
  challans?: any[]
  documents?: any[]
  vehicles?: Vehicle[]
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
  vehicles = [],
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
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null)
  const [challanSubTab, setChallanSubTab] = useState<Record<string, 'pending' | 'paid'>>({})

  // Group challans by vehicle number
  const challansByVehicle = useMemo(() => {
    const grouped: Record<string, any[]> = {}
    challans.forEach((challan) => {
      const key = challan.vehicleNumber || 'Unknown'
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(challan)
    })
    return grouped
  }, [challans])

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
      vehicles: <Truck className="w-4 h-4" />,
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
            {(['details', 'vehicles', 'incidents', 'challans', 'wallet', 'documents', 'team'] as TabType[]).map((tab) => (
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

        {/* Details Tab - flex layout outside the card */}
        {activeTab === 'details' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Subscriber Information Card */}
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-8">Subscriber Information</h2>

              {/* Classification */}
              <div className="mb-8">
                <SectionHeader>Classification</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <InfoField label="Subscriber Name" value={subscriber.subscriberName} />
                  <InfoField label="Source" value={subscriber.source} />
                  <InfoField label="Type" value={subscriber.type} />
                  <InfoField label="Sub Type" value={subscriber.subType} />
                  {subscriber.serviceType && <InfoField label="Service Type" value={subscriber.serviceType} />}
                  <InfoField label="Number of Vehicles" value={`${subscriber.numberOfTrucks}`} />
                </div>
              </div>

              {(subscriber.companyAlias || subscriber.gstNumber) && (
                <div className="mb-8">
                  <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />
                  <SectionHeader>Company Details</SectionHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    <InfoField label="Company Alias" value={subscriber.companyAlias} />
                    <InfoField label="GST Number" value={subscriber.gstNumber} />
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              {/* POC Information */}
              <div className="mb-8">
                <SectionHeader>POC Information</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <InfoField label="Contact Person" value={subscriber.contactPerson} />
                  <InfoField label="Phone" value={subscriber.phoneNumber} />
                  <InfoField label="Email" value={subscriber.emailId} />
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              {/* Address */}
              <div className="mb-8">
                <SectionHeader>Address</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <InfoField label="Country" value={subscriber.country} />
                  <InfoField label="State" value={subscriber.state} />
                  <InfoField label="City" value={subscriber.city} />
                  <InfoField label="Area" value={subscriber.area} />
                  <InfoField label="Address Lane" value={subscriber.addressLane} />
                  <InfoField label="Pin Code" value={subscriber.pinCode} />
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              {/* Metadata */}
              <div className="mb-8">
                <SectionHeader>Metadata</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <InfoField label="Created" value={formatDate(subscriber.createdDate)} />
                  <InfoField label="Last Updated" value={formatDate(subscriber.lastUpdated)} />
                  <InfoField label="Last Login" value={formatDate(subscriber.lastLogin)} />
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              {/* Subscription Details */}
              <div>
                <SectionHeader>Subscription Details</SectionHeader>
                {subscription ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoField label="Subscription Name" value={subscription.subscriptionName} />
                    <InfoField label="Plan Type" value={subscription.planType} />
                    <InfoField label="Start Date" value={formatDate(subscription.startDate)} />
                    <InfoField label="End Date" value={formatDate(subscription.endDate)} />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">No active subscription</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Timeline</h3>
                </div>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-6">
                    <TimelineItem title="New challan received" date="Jan 10, 2026" />
                    <TimelineItem title="Payment received" date="Nov 15, 2025" />
                    <TimelineItem title="Document uploaded" date="Jun 1, 2025" />
                    <TimelineItem title="Vehicle added" date="Jan 10, 2025" />
                    <TimelineItem title="Incident reported" date="Jan 15, 2024" />
                    <TimelineItem title="Subscriber created" date="Jan 10, 2024" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className={`bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 ${activeTab === 'details' ? 'hidden' : ''}`}>
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
                <div className="space-y-3">
                  {Object.entries(challansByVehicle).map(([vehicleNumber, vehicleChallans]) => {
                    const isExpanded = expandedVehicle === vehicleNumber
                    const currentSubTab = challanSubTab[vehicleNumber] || 'pending'
                    const pendingChallans = vehicleChallans.filter((c) => c.status === 'pending')
                    const paidChallans = vehicleChallans.filter((c) => c.status !== 'pending')

                    return (
                      <div key={vehicleNumber} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        {/* Vehicle Card Header */}
                        <button
                          onClick={() => setExpandedVehicle(isExpanded ? null : vehicleNumber)}
                          className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Truck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{vehicleNumber}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">({vehicleChallans.length} challan{vehicleChallans.length !== 1 ? 's' : ''})</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="border-t border-slate-200 dark:border-slate-700">
                            {/* Pending / Paid Tabs */}
                            <div className="flex gap-0 border-b border-slate-200 dark:border-slate-700">
                              <button
                                onClick={() => setChallanSubTab({ ...challanSubTab, [vehicleNumber]: 'pending' })}
                                className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                                  currentSubTab === 'pending'
                                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                              >
                                Pending ({pendingChallans.length})
                              </button>
                              <button
                                onClick={() => setChallanSubTab({ ...challanSubTab, [vehicleNumber]: 'paid' })}
                                className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                                  currentSubTab === 'paid'
                                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                              >
                                Paid ({paidChallans.length})
                              </button>
                            </div>

                            {/* Challan List */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                              {(currentSubTab === 'pending' ? pendingChallans : paidChallans).length === 0 ? (
                                <div className="py-8 text-center text-sm text-slate-400">
                                  No {currentSubTab} challans for this vehicle
                                </div>
                              ) : (
                                (currentSubTab === 'pending' ? pendingChallans : paidChallans).map((challan) => (
                                  <div key={challan.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{challan.violation}</p>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                          challan.status === 'pending'
                                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                        }`}>
                                          {challan.status}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{challan.id}</span>
                                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                          <Calendar className="w-3 h-3" />
                                          {formatDate(challan.date)}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">₹{challan.amount?.toLocaleString('en-IN')}</p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
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

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Vehicles ({vehicles.length})</h2>
              {vehicles.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No vehicles linked to this subscriber yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle Number</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Make</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Model</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Registration Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{vehicle.vehicleNumber}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 capitalize">{vehicle.vehicleType}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.make}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.model}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(vehicle.registrationDate)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              vehicle.status === 'active'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {vehicle.status === 'active' ? 'Active' : 'Inactive'}
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
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Team Members ({teamMembers.length})</h2>

              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No team members assigned yet</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
                        {member.fullName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{member.fullName}</span>
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

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-5">{children}</h3>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">{label}</p>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  )
}

function TimelineItem({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex gap-3.5 relative">
      <div className="relative z-10 w-[11px] h-[11px] rounded-full bg-cyan-400 dark:bg-cyan-500 mt-1 flex-shrink-0 ring-2 ring-white dark:ring-slate-900" />
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{title}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{date}</p>
      </div>
    </div>
  )
}
