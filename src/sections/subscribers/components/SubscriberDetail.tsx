import { useState, useMemo } from 'react'
import { ArrowLeft, Upload, Trash2, FileText, Building2, CreditCard, AlertCircle, Wallet, Users, AlertTriangle, Truck, ChevronDown, Calendar, Search, Filter, X, Eye, Download, MoreVertical, Pencil, Power } from 'lucide-react'
import type { Subscriber, Subscription, User as UserType, Vehicle } from '@/../product/sections/subscribers/types'
import { AddSubscriberModal } from './AddSubscriberModal'

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
  onEditVehicle?: (vehicleId: string) => void
  onDeactivateVehicle?: (vehicleId: string) => void
  onAssignTeamMember?: () => void
  onRemoveTeamMember?: (userId: string) => void
  users?: UserType[]
  partners?: any[]
  subscriberSources?: string[]
  subscriberTypes?: string[]
  subscriberSubTypes?: Record<string, string[]>
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
  onEditVehicle,
  onDeactivateVehicle,
  onAssignTeamMember,
  onRemoveTeamMember,
  users = [],
  partners = [],
  subscriberSources = [],
  subscriberTypes = [],
  subscriberSubTypes = {}
}: SubscriberDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null)
  const [challanSubTab, setChallanSubTab] = useState<Record<string, 'pending' | 'paid'>>({})
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [newVehicleNumber, setNewVehicleNumber] = useState('')
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<string>('')
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('')
  const [showVehicleFilters, setShowVehicleFilters] = useState(false)
  const [vehiclePage, setVehiclePage] = useState(1)
  const vehiclePageSize = 5
  const [vehicleActionMenu, setVehicleActionMenu] = useState<string | null>(null)
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamEmail, setNewTeamEmail] = useState('')
  const [newTeamDesignation, setNewTeamDesignation] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showUploadDocModal, setShowUploadDocModal] = useState(false)
  const [uploadDocCategory, setUploadDocCategory] = useState('')
  const [uploadDocFile, setUploadDocFile] = useState<File | null>(null)

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

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (vehicleSearch) {
        const q = vehicleSearch.toLowerCase()
        const matches = v.vehicleNumber.toLowerCase().includes(q) ||
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (vehicleStatusFilter && v.status !== vehicleStatusFilter) return false
      if (vehicleTypeFilter && v.vehicleType !== vehicleTypeFilter) return false
      return true
    })
  }, [vehicles, vehicleSearch, vehicleStatusFilter, vehicleTypeFilter])

  const vehicleTotalPages = Math.ceil(filteredVehicles.length / vehiclePageSize)
  const paginatedVehicles = useMemo(() => {
    const start = (vehiclePage - 1) * vehiclePageSize
    return filteredVehicles.slice(start, start + vehiclePageSize)
  }, [filteredVehicles, vehiclePage, vehiclePageSize])

  const vehicleTypes = useMemo(() => {
    const types = new Set(vehicles.map(v => v.vehicleType).filter(Boolean))
    return Array.from(types)
  }, [vehicles])

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
            onClick={() => setShowEditModal(true)}
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
                  <InfoField label="Subscriber Type" value={subscriber.type} />
                  <InfoField label="Sub Type" value={subscriber.subType} />
                  {subscriber.serviceType && <InfoField label="Service Type" value={subscriber.serviceType} />}
                  <InfoField label="Number of Vehicles" value={`${subscriber.numberOfTrucks}`} />
                  <InfoField label="Subscriber Email" value={(subscriber as any).subscriberEmail || subscriber.emailId || '—'} />
                  <InfoField label="Subscriber Phone Number" value={(subscriber as any).subscriberPhone || subscriber.phoneNumber || '—'} />
                  <InfoField label="Subscription" value={(subscriber as any).subscription || subscription?.subscriptionName || '—'} />
                </div>
              </div>

              {(subscriber.companyAlias || subscriber.gstNumber) && (
                <div className="mb-8">
                  <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />
                  <SectionHeader>Company Details</SectionHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    <InfoField label="Company Name" value={subscriber.companyAlias} />
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
        <div className={`bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 overflow-visible ${activeTab === 'details' ? 'hidden' : ''}`}>
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
                                  <div key={challan.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2.5">
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{challan.violation}</p>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                          challan.status === 'pending'
                                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                        }`}>
                                          {challan.status}
                                        </span>
                                        {challan.challanType && (
                                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                            challan.challanType === 'online'
                                              ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400'
                                              : 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
                                          }`}>
                                            {challan.challanType === 'online' ? 'Online' : 'Court'}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{challan.id}</span>
                                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                          <Calendar className="w-3 h-3" />
                                          {formatDate(challan.date)}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                          {challan.location}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-base font-semibold text-slate-900 dark:text-slate-50 ml-4">₹{challan.amount?.toLocaleString('en-IN')}</p>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Documents</h2>
                <button
                  onClick={() => setShowUploadDocModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              </div>

              <div className="space-y-2">
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 dark:text-slate-50">{doc.fileName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Uploaded {formatDate(doc.uploadedDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => console.log('View document:', doc.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => console.log('Download document:', doc.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Linked Vehicles ({vehicles.length})</h2>
                <button
                  onClick={() => setShowAddVehicleModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Vehicle
                </button>
              </div>

              {/* Search & Filter */}
              {vehicles.length > 0 && (
                <div className="mb-4">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by vehicle number, make, or model..."
                        value={vehicleSearch}
                        onChange={e => { setVehicleSearch(e.target.value); setVehiclePage(1) }}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <button
                      onClick={() => setShowVehicleFilters(!showVehicleFilters)}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showVehicleFilters
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                  </div>

                  {showVehicleFilters && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      <select
                        value={vehicleStatusFilter}
                        onChange={e => { setVehicleStatusFilter(e.target.value); setVehiclePage(1) }}
                        className="pl-3 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <select
                        value={vehicleTypeFilter}
                        onChange={e => { setVehicleTypeFilter(e.target.value); setVehiclePage(1) }}
                        className="pl-3 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="">All Types</option>
                        {vehicleTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {(vehicleStatusFilter || vehicleTypeFilter || vehicleSearch) && (
                        <button
                          onClick={() => { setVehicleStatusFilter(''); setVehicleTypeFilter(''); setVehicleSearch('') }}
                          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {vehicles.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No vehicles linked to this subscriber yet</p>
                </div>
              ) : filteredVehicles.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No vehicles match your search or filters</p>
                  <button
                    onClick={() => { setVehicleStatusFilter(''); setVehicleTypeFilter(''); setVehicleSearch('') }}
                    className="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="overflow-visible">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle Number</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Make</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Model</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Registration Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {paginatedVehicles.map((vehicle) => (
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
                          <td className="px-4 py-3 text-right">
                            <div className="relative inline-block">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setVehicleActionMenu(vehicleActionMenu === vehicle.id ? null : vehicle.id)
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {vehicleActionMenu === vehicle.id && (
                                <>
                                  <div className="fixed inset-0 z-40" onClick={() => setVehicleActionMenu(null)} />
                                  <div className="absolute right-0 top-full mt-1 z-50 w-44 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg py-1">
                                    <button
                                      onClick={() => {
                                        onEditVehicle?.(vehicle.id)
                                        setVehicleActionMenu(null)
                                      }}
                                      className="w-full text-left px-3.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    >
                                      Edit Vehicle
                                    </button>
                                    <button
                                      onClick={() => {
                                        onDeactivateVehicle?.(vehicle.id)
                                        setVehicleActionMenu(null)
                                      }}
                                      className="w-full text-left px-3.5 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                      Deactivate Vehicle
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {filteredVehicles.length > 0 && (
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{(vehiclePage - 1) * vehiclePageSize + 1}</span> to <span className="font-semibold text-slate-700 dark:text-slate-300">{Math.min(vehiclePage * vehiclePageSize, filteredVehicles.length)}</span> of <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredVehicles.length}</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setVehiclePage(p => Math.max(1, p - 1))}
                      disabled={vehiclePage === 1}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {Array.from({ length: Math.max(1, vehicleTotalPages) }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setVehiclePage(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          vehiclePage === page
                            ? 'bg-cyan-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setVehiclePage(p => Math.min(Math.max(1, vehicleTotalPages), p + 1))}
                      disabled={vehiclePage >= vehicleTotalPages}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Team Members ({teamMembers.length})</h2>
                <button
                  onClick={() => setShowAddTeamModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Team Member
                </button>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No team members assigned yet</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="inline-flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {member.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{member.fullName}</p>
                        {member.email && <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{member.email}</p>}
                        {member.role && <p className="text-xs text-slate-400 dark:text-slate-500">{member.role}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Subscriber Modal */}
      {showEditModal && (
        <AddSubscriberModal
          mode="edit"
          initialData={subscriber}
          users={users}
          partners={partners}
          subscriberSources={subscriberSources}
          subscriberTypes={subscriberTypes}
          subscriberSubTypes={subscriberSubTypes}
          onSubmit={(data) => {
            console.log('Save subscriber:', subscriber.id, data)
            onEdit?.(subscriber.id)
            setShowEditModal(false)
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Add Team Member Modal */}
      {showAddTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Team Member</h3>
              <button
                onClick={() => { setShowAddTeamModal(false); setNewTeamName(''); setNewTeamEmail(''); setNewTeamDesignation('') }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={e => setNewTeamName(e.target.value)}
                  placeholder="e.g., Rajesh Kumar"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newTeamEmail}
                  onChange={e => setNewTeamEmail(e.target.value)}
                  placeholder="e.g., rajesh@company.com"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={newTeamDesignation}
                  onChange={e => setNewTeamDesignation(e.target.value)}
                  placeholder="e.g., Account Manager"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setShowAddTeamModal(false); setNewTeamName(''); setNewTeamEmail(''); setNewTeamDesignation('') }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTeamName.trim() && newTeamEmail.trim()) {
                    console.log('Add team member:', newTeamName.trim(), newTeamEmail.trim(), newTeamDesignation.trim(), 'for subscriber:', subscriber.id)
                    setShowAddTeamModal(false)
                    setNewTeamName('')
                    setNewTeamEmail('')
                    setNewTeamDesignation('')
                  }
                }}
                disabled={!newTeamName.trim() || !newTeamEmail.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadDocModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Document</h3>
              <button
                onClick={() => { setShowUploadDocModal(false); setUploadDocCategory(''); setUploadDocFile(null) }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadDocCategory}
                  onChange={e => setUploadDocCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select document type</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Company">Company</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  File <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setUploadDocFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="upload-doc-modal-input"
                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                  />
                  <label
                    htmlFor="upload-doc-modal-input"
                    className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors"
                  >
                    {uploadDocFile ? (
                      <>
                        <FileText className="w-8 h-8 text-cyan-500" />
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{uploadDocFile.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{(uploadDocFile.size / 1024).toFixed(1)} KB — Click to change</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400" />
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Click to select a file</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG, Excel, Word up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setShowUploadDocModal(false); setUploadDocCategory(''); setUploadDocFile(null) }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (uploadDocCategory && uploadDocFile) {
                    console.log('Upload document:', uploadDocCategory, uploadDocFile.name, 'for subscriber:', subscriber.id)
                    onUploadDocument?.(subscriber.id, uploadDocFile)
                    setShowUploadDocModal(false)
                    setUploadDocCategory('')
                    setUploadDocFile(null)
                  }
                }}
                disabled={!uploadDocCategory || !uploadDocFile}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Vehicle</h3>
              <button
                onClick={() => { setShowAddVehicleModal(false); setNewVehicleNumber('') }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newVehicleNumber}
                onChange={e => setNewVehicleNumber(e.target.value.toUpperCase())}
                placeholder="e.g., MH02AB1234"
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setShowAddVehicleModal(false); setNewVehicleNumber('') }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newVehicleNumber.trim()) {
                    console.log('Add vehicle:', newVehicleNumber.trim(), 'for subscriber:', subscriber.id)
                    setShowAddVehicleModal(false)
                    setNewVehicleNumber('')
                  }
                }}
                disabled={!newVehicleNumber.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
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
