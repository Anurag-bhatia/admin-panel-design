import { useState, useMemo } from 'react'
import { ArrowLeft, Upload, Trash2, FileText, Building2, CreditCard, AlertCircle, Users, AlertTriangle, Truck, ChevronDown, Calendar, Search, Filter, X, Eye, Download, MoreVertical, Pencil, Power, BookOpen, BarChart3, RefreshCw, Loader2, Shield } from 'lucide-react'
import type { Subscriber, Subscription, User as UserType, Vehicle, SubscriberReport } from '../types'
import { AddSubscriberModal } from './AddSubscriberModal'

type TabType = 'details' | 'challans' | 'incidents' | 'documents' | 'vehicles' | 'team' | 'api-catalogue' | 'report' | 'permissions'

interface SubscriberDetailProps {
  subscriber: Subscriber
  subscription: Subscription | null
  assignedUser: UserType | null
  incidents?: any[]
  challans?: any[]
  documents?: any[]
  vehicles?: Vehicle[]
  teamMembers?: UserType[]
  onBack?: () => void
  onEdit?: (id: string) => void
  onUploadDocument?: (subscriberId: string, file: File) => void
  onDeleteDocument?: (subscriberId: string, docId: string) => void
  onViewIncident?: (incidentId: string) => void
  onViewChallan?: (challanId: string) => void
  onEditVehicle?: (vehicleId: string) => void
  onDeactivateVehicle?: (vehicleId: string) => void
  onBulkUpdateVehicles?: (subscriberId: string, file: File) => void
  onDownloadVehicleTemplate?: () => void
  apiCatalogue?: { id: string; name: string; enabled: boolean; credits: number; creditPerHit: number; usedCredits: number; transactions: { id: string; description: string; creditsUsed: number; date: string }[] }[]
  onSaveApiCatalogue?: (subscriberId: string, config: { id: string; enabled: boolean; credits: number; creditPerHit: number }[]) => void
  reports?: SubscriberReport[]
  onDownloadReport?: (reportId: string) => void
  onRetryReport?: (reportId: string) => void
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
  teamMembers = [],
  onBack,
  onEdit,
  onUploadDocument,
  onDeleteDocument,
  onViewIncident,
  onViewChallan,
  onEditVehicle,
  onDeactivateVehicle,
  onBulkUpdateVehicles,
  onDownloadVehicleTemplate,
  apiCatalogue: apiCatalogueProp,
  onSaveApiCatalogue,
  reports = [],
  onDownloadReport,
  onRetryReport,
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
  const [showBulkUpdateVehicleModal, setShowBulkUpdateVehicleModal] = useState(false)
  const [bulkUpdateFile, setBulkUpdateFile] = useState<File | null>(null)
  const [isBulkUpdateDragging, setIsBulkUpdateDragging] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showUploadDocModal, setShowUploadDocModal] = useState(false)
  const [uploadDocCategory, setUploadDocCategory] = useState('')
  const [uploadDocFile, setUploadDocFile] = useState<File | null>(null)

  // Check New Challan state
  const [showCheckChallanModal, setShowCheckChallanModal] = useState(false)
  const [checkChallanVehicle, setCheckChallanVehicle] = useState('')
  const [checkChallanState, setCheckChallanState] = useState<'input' | 'loading' | 'results'>('input')
  const [checkChallanResults, setCheckChallanResults] = useState<any[]>([])
  const [checkChallanResultTab, setCheckChallanResultTab] = useState<'pending' | 'paid'>('pending')
  const [incidentReportSearch, setIncidentReportSearch] = useState('')

  // Permissions state
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    'view-challans': true,
    'manage-challans': true,
    'view-incidents': true,
    'manage-incidents': false,
    'view-vehicles': true,
    'manage-vehicles': true,
    'view-documents': true,
    'upload-documents': true,
    'delete-documents': false,
    'view-reports': true,
    'download-reports': true,
    'view-payments': true,
    'make-payments': false,
    'manage-team': false,
    'api-access': false,
  })

  const [activePermissionCategory, setActivePermissionCategory] = useState('challans')

  const togglePermission = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const permissionCategories = [
    { id: 'challans', label: 'Challans', permissions: [
      { key: 'view-challans', label: 'View Challans', description: 'Can view challan details and history' },
      { key: 'manage-challans', label: 'Manage Challans', description: 'Can update challan status and assignments' },
    ]},
    { id: 'incidents', label: 'Incidents', permissions: [
      { key: 'view-incidents', label: 'View Incidents', description: 'Can view incident details and timeline' },
      { key: 'manage-incidents', label: 'Manage Incidents', description: 'Can create, update, and close incidents' },
    ]},
    { id: 'vehicles', label: 'Vehicles', permissions: [
      { key: 'view-vehicles', label: 'View Vehicles', description: 'Can view vehicle list and details' },
      { key: 'manage-vehicles', label: 'Manage Vehicles', description: 'Can add, edit, and deactivate vehicles' },
    ]},
    { id: 'documents', label: 'Documents', permissions: [
      { key: 'view-documents', label: 'View Documents', description: 'Can view and download documents' },
      { key: 'upload-documents', label: 'Upload Documents', description: 'Can upload new documents' },
      { key: 'delete-documents', label: 'Delete Documents', description: 'Can delete uploaded documents' },
    ]},
    { id: 'reports', label: 'Reports', permissions: [
      { key: 'view-reports', label: 'View Reports', description: 'Can view report listings' },
      { key: 'download-reports', label: 'Download Reports', description: 'Can download generated reports' },
    ]},
    { id: 'payments', label: 'Payments', permissions: [
      { key: 'view-payments', label: 'View Payments', description: 'Can view payment history and invoices' },
      { key: 'make-payments', label: 'Make Payments', description: 'Can initiate and process payments' },
    ]},
    { id: 'other', label: 'Other', permissions: [
      { key: 'manage-team', label: 'Manage Team', description: 'Can add and remove team members' },
      { key: 'api-access', label: 'API Access', description: 'Can access and configure API catalogue' },
    ]},
  ]

  // API Catalogue state
  const defaultApis = [
    { id: 'challan-api', name: 'Challan API', enabled: false, credits: 0, creditPerHit: 0, usedCredits: 0, transactions: [] as { id: string; description: string; creditsUsed: number; date: string }[] },
    { id: 'rc-api', name: 'RC API', enabled: false, credits: 0, creditPerHit: 0, usedCredits: 0, transactions: [] as { id: string; description: string; creditsUsed: number; date: string }[] },
    { id: 'dl-api', name: 'DL API', enabled: false, credits: 0, creditPerHit: 0, usedCredits: 0, transactions: [] as { id: string; description: string; creditsUsed: number; date: string }[] },
  ]
  const [apiConfig, setApiConfig] = useState(
    (apiCatalogueProp && apiCatalogueProp.length > 0) ? apiCatalogueProp : defaultApis
  )

  const updateApiField = (id: string, field: 'enabled' | 'credits' | 'creditPerHit', value: boolean | number) => {
    setApiConfig(prev => prev.map(api => api.id === id ? { ...api, [field]: value } : api))
  }

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

  const monthlyReports = useMemo(() => {
    return reports
      .filter(r => r.category === 'monthly')
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
  }, [reports])

  const incidentReports = useMemo(() => {
    return reports
      .filter(r => r.category === 'incident')
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
  }, [reports])

  const filteredIncidentReports = useMemo(() => {
    if (!incidentReportSearch) return incidentReports
    const q = incidentReportSearch.toLowerCase()
    return incidentReports.filter(r =>
      (r.incidentId && r.incidentId.toLowerCase().includes(q)) ||
      (r.incidentVehicle && r.incidentVehicle.toLowerCase().includes(q)) ||
      (r.reportType && r.reportType.toLowerCase().includes(q))
    )
  }, [incidentReports, incidentReportSearch])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const generateSampleChallans = (vehicleNumber: string) => {
    const violations = [
      'Overspeeding', 'Red Light Violation', 'No Parking', 'Without Helmet',
      'Driving Without License', 'No Seatbelt', 'Using Mobile While Driving',
      'Wrong Side Driving', 'Overloading', 'Without Insurance', 'Expired PUC',
      'Lane Violation', 'Disobeying Traffic Signal'
    ]
    const locations = [
      'NH-48, Gurugram', 'MG Road, Pune', 'Ring Road, Delhi', 'JVLR, Mumbai',
      'Hosur Road, Bangalore', 'Anna Salai, Chennai', 'SG Highway, Ahmedabad',
      'Outer Ring Road, Hyderabad', 'Lal Darwaja, Ahmedabad', 'Marine Drive, Mumbai'
    ]
    const count = 3 + Math.floor(Math.random() * 5)
    return Array.from({ length: count }, (_, i) => {
      const isPending = Math.random() > 0.4
      const amount = [500, 1000, 1500, 2000, 2500, 5000, 10000][Math.floor(Math.random() * 7)]
      const daysAgo = Math.floor(Math.random() * 365)
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)
      return {
        id: `CH${String(Math.floor(Math.random() * 9000000000) + 1000000000)}`,
        vehicleNumber,
        violation: violations[Math.floor(Math.random() * violations.length)],
        amount,
        status: isPending ? 'pending' : 'resolved',
        challanType: Math.random() > 0.5 ? 'online' : 'court',
        date: date.toISOString(),
        location: locations[Math.floor(Math.random() * locations.length)]
      }
    })
  }

  const handleCheckChallan = () => {
    setCheckChallanState('loading')
    setTimeout(() => {
      const results = generateSampleChallans(checkChallanVehicle)
      setCheckChallanResults(results)
      setCheckChallanResultTab('pending')
      setCheckChallanState('results')
    }, 1500)
  }

  const resetCheckChallanModal = () => {
    setShowCheckChallanModal(false)
    setCheckChallanVehicle('')
    setCheckChallanState('input')
    setCheckChallanResults([])
    setCheckChallanResultTab('pending')
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Building2 className="w-4 h-4" />,
      challans: <AlertCircle className="w-4 h-4" />,
      incidents: <AlertTriangle className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />,
      vehicles: <Truck className="w-4 h-4" />,
      team: <Users className="w-4 h-4" />,
      'api-catalogue': <BookOpen className="w-4 h-4" />,
      report: <BarChart3 className="w-4 h-4" />,
      permissions: <Shield className="w-4 h-4" />
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
            {(['details', 'vehicles', 'incidents', 'challans', 'documents', 'team', 'api-catalogue', 'report', 'permissions'] as TabType[]).map((tab) => (
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
                {tab === 'api-catalogue' ? 'API Catalogue' : tab === 'permissions' ? 'Permissions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Linked Challans ({challans.length})</h2>
                <button
                  onClick={() => setShowCheckChallanModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Check New Challan
                </button>
              </div>
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBulkUpdateVehicleModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Bulk Update
                  </button>
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

          {/* API Catalogue Tab */}
          {activeTab === 'api-catalogue' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">API Catalogue</h2>
                <button
                  onClick={() => onSaveApiCatalogue?.(subscriber.id, apiConfig.map(({ id, enabled, credits, creditPerHit }) => ({ id, enabled, credits, creditPerHit })))}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>

              {/* Config Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">API</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase w-20">Access</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase w-28">Credits</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase w-28">Per Hit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Usage</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase w-28"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {apiConfig.map((api) => (
                      <tr key={api.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{api.name}</p>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            type="button"
                            onClick={() => updateApiField(api.id, 'enabled', !api.enabled)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              api.enabled ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                              api.enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
                            }`} />
                          </button>
                        </td>
                        <td className="px-4 py-3.5">
                          <input
                            type="number"
                            min="0"
                            value={api.credits}
                            onChange={e => updateApiField(api.id, 'credits', parseInt(e.target.value) || 0)}
                            disabled={!api.enabled}
                            className="w-24 px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed"
                          />
                        </td>
                        <td className="px-4 py-3.5">
                          <input
                            type="number"
                            min="0"
                            value={api.creditPerHit}
                            onChange={e => updateApiField(api.id, 'creditPerHit', parseInt(e.target.value) || 0)}
                            disabled={!api.enabled}
                            className="w-24 px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed"
                          />
                        </td>
                        <td className="px-4 py-3.5">
                          {api.enabled && api.credits > 0 ? (
                            <div className="flex items-center gap-3 min-w-[180px]">
                              <div className="flex-1">
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      (api.usedCredits / api.credits) >= 0.9
                                        ? 'bg-red-500'
                                        : (api.usedCredits / api.credits) >= 0.7
                                        ? 'bg-amber-500'
                                        : 'bg-cyan-500'
                                    }`}
                                    style={{ width: `${Math.min((api.usedCredits / api.credits) * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {api.usedCredits}/{api.credits}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          {api.enabled && api.transactions.length > 0 ? (
                            <button
                              onClick={() => console.log('View request log:', api.id)}
                              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline whitespace-nowrap"
                            >
                              Request Log
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div>
              {/* Monthly Closure Reports */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Monthly Closure Reports</h2>
                {monthlyReports.length === 0 ? (
                  <div className="text-center py-10">
                    <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No monthly reports generated yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Period</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Report Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Format</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Generated</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {monthlyReports.map((report) => (
                          <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{report.period || '—'}</td>
                            <td className="px-4 py-3"><ReportTypeBadge type={report.reportType} /></td>
                            <td className="px-4 py-3"><FormatBadge format={report.format} /></td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(report.generatedAt)}</td>
                            <td className="px-4 py-3 text-right"><ReportAction report={report} onDownload={onDownloadReport} onRetry={onRetryReport} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-800 my-8" />

              {/* Incident Reports */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Incident Reports</h2>
                  {incidentReports.length > 0 && (
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by ID, vehicle, type..."
                        value={incidentReportSearch}
                        onChange={e => setIncidentReportSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  )}
                </div>
                {incidentReports.length === 0 ? (
                  <div className="text-center py-10">
                    <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No incident reports generated yet</p>
                  </div>
                ) : filteredIncidentReports.length === 0 ? (
                  <div className="text-center py-10">
                    <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No reports match your search</p>
                    <button
                      onClick={() => setIncidentReportSearch('')}
                      className="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Report Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Format</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Generated</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident Status</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {filteredIncidentReports.map((report) => (
                          <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{report.incidentId || '—'}</td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{report.incidentVehicle || '—'}</td>
                            <td className="px-4 py-3"><ReportTypeBadge type={report.reportType} /></td>
                            <td className="px-4 py-3"><FormatBadge format={report.format} /></td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(report.generatedAt)}</td>
                            <td className="px-4 py-3">
                              {report.incidentStatus ? (
                                <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                                  {report.incidentStatus}
                                </span>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-3 text-right"><ReportAction report={report} onDownload={onDownloadReport} onRetry={onRetryReport} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="flex min-h-[480px] -m-6 overflow-hidden rounded-lg">
              {/* Left Sidebar */}
              <div className="w-52 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 py-4">
                {permissionCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActivePermissionCategory(cat.id)}
                    className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                      activePermissionCategory === cat.id
                        ? 'text-cyan-600 dark:text-cyan-400 border-l-2 border-cyan-600 dark:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/10'
                        : 'text-slate-600 dark:text-slate-400 border-l-2 border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Right Content */}
              <div className="flex-1 min-w-0 p-6">
                {(() => {
                  const activeCat = permissionCategories.find(c => c.id === activePermissionCategory)
                  if (!activeCat) return null
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{activeCat.label}</h2>
                        <button
                          onClick={() => console.log('Save permissions:', permissions)}
                          className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                      <div className="space-y-1">
                        {activeCat.permissions.map((perm) => (
                          <PermissionRow
                            key={perm.key}
                            label={perm.label}
                            description={perm.description}
                            enabled={permissions[perm.key]}
                            onToggle={() => togglePermission(perm.key)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>
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

      {/* Bulk Update Vehicles Modal */}
      {showBulkUpdateVehicleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Bulk Update Vehicles</h3>
              <button
                onClick={() => { setShowBulkUpdateVehicleModal(false); setBulkUpdateFile(null) }}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              {/* Download Template */}
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Download the CSV template, fill in the vehicle details, and upload it to update vehicles in bulk.
                </p>
                <button
                  onClick={() => onDownloadVehicleTemplate?.()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CSV Template
                </button>
              </div>

              {/* Upload Area */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload CSV File <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsBulkUpdateDragging(true) }}
                  onDragLeave={(e) => { e.preventDefault(); setIsBulkUpdateDragging(false) }}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsBulkUpdateDragging(false)
                    const files = e.dataTransfer.files
                    if (files.length > 0) {
                      const file = files[0]
                      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                        setBulkUpdateFile(file)
                      }
                    }
                  }}
                  className="relative"
                >
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setBulkUpdateFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="bulk-update-vehicle-input"
                  />
                  <label
                    htmlFor="bulk-update-vehicle-input"
                    className={`flex flex-col items-center gap-2 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isBulkUpdateDragging
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-cyan-400 dark:hover:border-cyan-600'
                    }`}
                  >
                    {bulkUpdateFile ? (
                      <>
                        <FileText className="w-10 h-10 text-cyan-500" />
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{bulkUpdateFile.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{(bulkUpdateFile.size / 1024).toFixed(1)} KB — Click to change</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-slate-400" />
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Drop your CSV file here</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">or click to browse (.csv, .xlsx, .xls)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setShowBulkUpdateVehicleModal(false); setBulkUpdateFile(null) }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (bulkUpdateFile) {
                    onBulkUpdateVehicles?.(subscriber.id, bulkUpdateFile)
                    setShowBulkUpdateVehicleModal(false)
                    setBulkUpdateFile(null)
                  }
                }}
                disabled={!bulkUpdateFile}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload & Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check New Challan Modal */}
      {showCheckChallanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {checkChallanState === 'results' ? 'Challan Results' : 'Check New Challan'}
                </h3>
                {checkChallanState === 'results' && (
                  <div className="flex items-center gap-2 mt-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{checkChallanVehicle}</span>
                  </div>
                )}
              </div>
              <button
                onClick={resetCheckChallanModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Input State */}
            {checkChallanState === 'input' && (
              <div className="px-7 py-10">
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Vehicle Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={checkChallanVehicle}
                    onChange={e => setCheckChallanVehicle(e.target.value.toUpperCase())}
                    placeholder="e.g., MH02AB1234"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter' && checkChallanVehicle.trim()) handleCheckChallan()
                    }}
                  />
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleCheckChallan}
                      disabled={!checkChallanVehicle.trim()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="w-4 h-4" />
                      Check Challan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {checkChallanState === 'loading' && (
              <div className="px-7 py-20 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Fetching challans for <span className="font-semibold text-slate-900 dark:text-slate-50">{checkChallanVehicle}</span>...
                </p>
              </div>
            )}

            {/* Results State */}
            {checkChallanState === 'results' && (() => {
              const pendingResults = checkChallanResults.filter(c => c.status === 'pending')
              const paidResults = checkChallanResults.filter(c => c.status !== 'pending')
              const pendingTotal = pendingResults.reduce((sum, c) => sum + c.amount, 0)
              const paidTotal = paidResults.reduce((sum, c) => sum + c.amount, 0)
              const displayedResults = checkChallanResultTab === 'pending' ? pendingResults : paidResults

              return (
                <div className="flex min-h-[420px]">
                  {/* Left Sidebar — Summary */}
                  <div className="w-52 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 p-5 space-y-4 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/60 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-2">Pending</p>
                      <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{pendingResults.length}</p>
                      <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-amber-700/40">
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">₹{pendingTotal.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-amber-500 dark:text-amber-400 mt-0.5">Total Amount</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/60 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 mb-2">Paid</p>
                      <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{paidResults.length}</p>
                      <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-700/40">
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">₹{paidTotal.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mt-0.5">Total Amount</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-slate-200 dark:border-slate-700 px-5">
                      <button
                        onClick={() => setCheckChallanResultTab('pending')}
                        className={`px-5 py-3 text-sm font-medium transition-colors ${
                          checkChallanResultTab === 'pending'
                            ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        Pending ({pendingResults.length})
                      </button>
                      <button
                        onClick={() => setCheckChallanResultTab('paid')}
                        className={`px-5 py-3 text-sm font-medium transition-colors ${
                          checkChallanResultTab === 'paid'
                            ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        Paid ({paidResults.length})
                      </button>
                    </div>

                    {/* Challan Cards */}
                    <div className="flex-1 overflow-y-auto max-h-[360px]">
                      {displayedResults.length === 0 ? (
                        <div className="py-16 text-center">
                          <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                          <p className="text-sm text-slate-400 dark:text-slate-500">
                            No {checkChallanResultTab} challans found
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {displayedResults.map((challan) => (
                            <div key={challan.id} className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2.5 flex-wrap">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate max-w-[200px]" title={challan.violation}>{challan.violation}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                      challan.status === 'pending'
                                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                                        : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                    }`}>
                                      {challan.status === 'pending' ? 'Pending' : 'Paid'}
                                    </span>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                      challan.challanType === 'online'
                                        ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400'
                                        : 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400'
                                    }`}>
                                      {challan.challanType === 'online' ? 'Online' : 'Court'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{challan.id}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(challan.date)}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]" title={challan.location}>{challan.location}</span>
                                  </div>
                                </div>
                                <p className="text-base font-bold text-slate-900 dark:text-slate-50 whitespace-nowrap pt-0.5">₹{challan.amount.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Footer for results */}
            {checkChallanState === 'results' && (
              <div className="flex items-center justify-end px-7 py-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setCheckChallanVehicle('')
                    setCheckChallanResults([])
                    setCheckChallanResultTab('pending')
                    setCheckChallanState('input')
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Check Another Vehicle
                </button>
              </div>
            )}
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

function ReportTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    'MIS': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'MIS-Challan': 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    'ICR': 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    'ISR': 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  }
  return (
    <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${styles[type] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
      {type}
    </span>
  )
}

function FormatBadge({ format }: { format: string }) {
  const isCSV = format === 'CSV'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
      isCSV
        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    }`}>
      <FileText className="w-3 h-3" />
      {format}
    </span>
  )
}

function ReportStatusBadge({ status }: { status: string }) {
  if (status === 'ready') {
    return (
      <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
        Ready
      </span>
    )
  }
  if (status === 'generating') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 animate-pulse">
        <Loader2 className="w-3 h-3 animate-spin" />
        Generating
      </span>
    )
  }
  return (
    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400">
      Failed
    </span>
  )
}

function ReportAction({ report, onDownload }: { report: SubscriberReport; onDownload?: (id: string) => void; onRetry?: (id: string) => void }) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => onDownload?.(report.id)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-md transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
      <button
        onClick={() => console.log('View report:', report.id)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
      >
        <Eye className="w-3.5 h-3.5" />
        View Report
      </button>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function PermissionRow({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
          enabled ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`} />
      </button>
    </div>
  )
}
