import { useState, useMemo } from 'react'
import { ArrowLeft, Upload, Eye, IndianRupee, FileText, Building2, Users, BarChart3, FileCheck, Clock, Truck, ChevronLeft, ChevronRight, UserCheck, Store, QrCode, MoreVertical, Ban, X, Download, Search, Loader2, RefreshCw } from 'lucide-react'
import type { PartnerDetailProps, OutletQR, RegisteredVisitorDetail } from '@/../product/sections/partners/types'

type TabType = 'profile' | 'visitors' | 'registeredVisitors' | 'customers' | 'vehicles' | 'outlets' | 'qrs' | 'financial' | 'documents' | 'reports'

export function PartnerDetail({
  partner,
  onBack,
  onEditPartner,
  onViewIncidents,
  onUploadDocument,
  onDeleteDocument,
  allowedTabs,
}: PartnerDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>(allowedTabs?.[0] ?? 'profile')
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)
  const [vehiclePage, setVehiclePage] = useState(1)
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('all')
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<string>('all')
  const [vehicleActionMenu, setVehicleActionMenu] = useState<string | null>(null)
  const [qrActionMenu, setQrActionMenu] = useState<string | null>(null)
  const [viewQr, setViewQr] = useState<OutletQR | null>(null)
  const [customerPage, setCustomerPage] = useState(1)
  const [visitorPage, setVisitorPage] = useState(1)
  const [outletPage, setOutletPage] = useState(1)
  const [qrPage, setQrPage] = useState(1)
  const [regVisitorPage, setRegVisitorPage] = useState(1)
  const vehiclesPerPage = 5
  const filteredVehicles = (partner.linkedVehicles || []).filter((v) => {
    const matchesSearch = vehicleSearch === '' ||
      v.registrationNumber.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
      v.subscriberName.toLowerCase().includes(vehicleSearch.toLowerCase())
    const matchesType = vehicleTypeFilter === 'all' || v.vehicleType === vehicleTypeFilter
    const matchesStatus = vehicleStatusFilter === 'all' || v.status === vehicleStatusFilter
    return matchesSearch && matchesType && matchesStatus
  })
  const totalVehicles = filteredVehicles.length
  const totalVehiclePages = Math.max(1, Math.ceil(totalVehicles / vehiclesPerPage))
  const safeVehiclePage = Math.min(vehiclePage, totalVehiclePages)
  const paginatedVehicles = filteredVehicles.slice((safeVehiclePage - 1) * vehiclesPerPage, safeVehiclePage * vehiclesPerPage)

  const perPage = 5
  const totalVisitors = partner.registeredVisitors?.length || 0
  const totalVisitorPages = Math.max(1, Math.ceil(totalVisitors / perPage))
  const safeVisitorPage = Math.min(visitorPage, totalVisitorPages)
  const paginatedVisitors = partner.registeredVisitors?.slice((safeVisitorPage - 1) * perPage, safeVisitorPage * perPage) || []

  const totalCustomers = partner.linkedSubscribers?.length || 0
  const totalCustomerPages = Math.max(1, Math.ceil(totalCustomers / perPage))
  const safeCustomerPage = Math.min(customerPage, totalCustomerPages)
  const paginatedCustomers = partner.linkedSubscribers?.slice((safeCustomerPage - 1) * perPage, safeCustomerPage * perPage) || []

  const totalOutlets = partner.linkedOutlets?.length || 0
  const totalOutletPages = Math.max(1, Math.ceil(totalOutlets / perPage))
  const safeOutletPage = Math.min(outletPage, totalOutletPages)
  const paginatedOutlets = partner.linkedOutlets?.slice((safeOutletPage - 1) * perPage, safeOutletPage * perPage) || []

  const totalQRs = partner.outletQRs?.length || 0
  const totalQRPages = Math.max(1, Math.ceil(totalQRs / perPage))
  const safeQRPage = Math.min(qrPage, totalQRPages)
  const paginatedQRs = partner.outletQRs?.slice((safeQRPage - 1) * perPage, safeQRPage * perPage) || []

  const totalRegVisitors = partner.registeredVisitorDetails?.length || 0
  const totalRegVisitorPages = Math.max(1, Math.ceil(totalRegVisitors / perPage))
  const safeRegVisitorPage = Math.min(regVisitorPage, totalRegVisitorPages)
  const paginatedRegVisitors = partner.registeredVisitorDetails?.slice((safeRegVisitorPage - 1) * perPage, safeRegVisitorPage * perPage) || []

  const partnerReports = useMemo(() => [
    { id: 'RPT-001', reportType: 'MIS', format: 'CSV', status: 'ready', category: 'monthly', generatedAt: '2026-03-01T06:00:00Z', fileSize: 245760, period: 'February 2026' },
    { id: 'RPT-002', reportType: 'MIS-Challan', format: 'CSV', status: 'ready', category: 'monthly', generatedAt: '2026-03-01T06:05:00Z', fileSize: 184320, period: 'February 2026' },
    { id: 'RPT-003', reportType: 'MIS', format: 'CSV', status: 'generating', category: 'monthly', generatedAt: '2026-03-06T06:00:00Z', fileSize: null, period: 'March 2026' },
    { id: 'RPT-004', reportType: 'MIS-Challan', format: 'CSV', status: 'failed', category: 'monthly', generatedAt: '2026-02-01T06:00:00Z', fileSize: null, period: 'January 2026' },
    { id: 'RPT-005', reportType: 'MIS', format: 'CSV', status: 'ready', category: 'monthly', generatedAt: '2026-02-01T06:00:00Z', fileSize: 312400, period: 'January 2026' },
    { id: 'RPT-006', reportType: 'ICR', format: 'PDF', status: 'ready', category: 'incident', generatedAt: '2026-02-15T10:30:00Z', fileSize: 524288, incidentId: 'IRN-124501', incidentVehicle: 'GJ01QR0123', incidentStatus: 'Resolved' },
    { id: 'RPT-007', reportType: 'ISR', format: 'PDF', status: 'ready', category: 'incident', generatedAt: '2026-02-15T10:35:00Z', fileSize: 412672, incidentId: 'IRN-124501', incidentVehicle: 'GJ01QR0123', incidentStatus: 'Resolved' },
    { id: 'RPT-008', reportType: 'ICR', format: 'PDF', status: 'generating', category: 'incident', generatedAt: '2026-03-05T14:20:00Z', fileSize: null, incidentId: 'IRN-124502', incidentVehicle: 'GJ05ST4567', incidentStatus: 'In Progress' },
  ] as const, [])

  const monthlyReports = useMemo(() => partnerReports.filter(r => r.category === 'monthly'), [partnerReports])
  const incidentReports = useMemo(() => partnerReports.filter(r => r.category === 'incident'), [partnerReports])

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

  const isChallanPay = partner.partnerType === 'challanPay'

  const getTabIcon = (tab: TabType) => {
    const icons: Record<TabType, React.ReactNode> = {
      profile: <Building2 className="w-4 h-4" />,
      visitors: <UserCheck className="w-4 h-4" />,
      registeredVisitors: <Users className="w-4 h-4" />,
      customers: <Users className="w-4 h-4" />,
      vehicles: <Truck className="w-4 h-4" />,
      outlets: <Store className="w-4 h-4" />,
      qrs: <QrCode className="w-4 h-4" />,
      financial: <BarChart3 className="w-4 h-4" />,
      documents: <FileCheck className="w-4 h-4" />,
      reports: <BarChart3 className="w-4 h-4" />
    }
    return icons[tab]
  }

  const getTabLabel = (tab: TabType) => {
    const labels: Record<TabType, string> = {
      profile: 'Profile',
      visitors: 'Visitors',
      registeredVisitors: 'Registered Visitors',
      customers: isChallanPay ? 'Customers' : 'Subscribers',
      vehicles: 'Vehicles',
      outlets: 'Outlets',
      qrs: 'QRs',
      financial: 'Financial',
      documents: 'Documents',
      reports: 'Reports'
    }
    return labels[tab]
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
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                {isChallanPay ? (partner.companyName || `${partner.firstName} ${partner.lastName}`) : partner.companyName}
              </h1>
              <span className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${
                partner.status === 'active'
                  ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
              </span>
              <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {isChallanPay ? 'ChallanPay' : 'LOTS247'}
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
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit mb-6 flex-wrap">
          {(allowedTabs
            ? allowedTabs as TabType[]
            : isChallanPay
              ? ['profile', 'visitors', 'registeredVisitors', 'vehicles', 'customers', 'outlets', 'qrs', 'financial', 'documents'] as TabType[]
              : ['profile', 'customers', 'vehicles', 'reports', 'financial', 'documents'] as TabType[]
          ).map((tab) => (
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
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        {/* Profile Tab — two-column layout with activity sidebar */}
        {activeTab === 'profile' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Profile Content */}
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              {isChallanPay ? (
                /* ===== ChallanPay Profile ===== */
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Basic Information</h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Primary Contact</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Business/Individual Name</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.companyName || `${partner.firstName} ${partner.lastName}`}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Business Type</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.subscriberTypesAllowed?.[0] || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">State</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.state}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pincode</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.pinCode}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.email}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Onboarded Date</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{formatDate(partner.dateOnboarded)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Permissions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.productsAllowed.map((p) => (
                            <span key={p} className="inline-flex px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Dashboard Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.subscriberTypesAllowed.map((t) => (
                            <span key={t} className="inline-flex px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Bank Details</h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Holder</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.companyName || `${partner.firstName} ${partner.lastName}`}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Number</span>
                        <span className="text-sm font-mono text-slate-900 dark:text-slate-50">{partner.bankAccountNumber}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Bank Name</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.bankName}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">IFSC Code</span>
                        <span className="text-sm font-mono text-slate-900 dark:text-slate-50">{(partner as any).ifscCode || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ===== LOTS247 Profile ===== */
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Personal Information</h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Full Name</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.firstName} {partner.lastName}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.email}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Mobile</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Onboarded Date</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{formatDate(partner.dateOnboarded)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Company Information</h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Company Name</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.companyName}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Official Email</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.officialEmail}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.phone}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Address</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.address}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">State / City / Pin</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.state}, {partner.city} — {partner.pinCode}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Website</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.website || '—'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Permissions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.productsAllowed.map((p) => (
                            <span key={p} className="inline-flex px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Dashboard Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.subscriberTypesAllowed.map((t) => (
                            <span key={t} className="inline-flex px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Bank Details</h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Holder</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{`${partner.firstName} ${partner.lastName}`}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Number</span>
                        <span className="text-sm font-mono text-slate-900 dark:text-slate-50">{partner.bankAccountNumber}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Bank Name</span>
                        <span className="text-sm text-slate-900 dark:text-slate-50">{partner.bankName}</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">IFSC Code</span>
                        <span className="text-sm font-mono text-slate-900 dark:text-slate-50">{(partner as any).ifscCode || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Activity Timeline */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Timeline</h3>
                </div>
                <div className="relative">
                  {partner.activityLog.length > 0 && (
                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
                  )}
                  <div className="space-y-6">
                    {partner.activityLog.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No activity yet</p>
                    ) : (
                      partner.activityLog.map((entry) => (
                        <TimelineItem key={entry.id} title={entry.action} date={formatDate(entry.timestamp)} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs — in card wrapper */}
        {activeTab !== 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">{isChallanPay ? 'Customers' : 'Subscribers'} ({partner.linkedSubscribers.length})</h2>
              {partner.linkedSubscribers.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No {isChallanPay ? 'customers' : 'subscribers'} yet</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{isChallanPay ? 'Customer' : 'Subscriber'}</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Mobile</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscribed</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incidents</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedCustomers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-slate-900 dark:text-slate-50">{subscriber.name}</p>
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
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showing {(safeCustomerPage - 1) * perPage + 1}–{Math.min(safeCustomerPage * perPage, totalCustomers)} of {totalCustomers}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCustomerPage(safeCustomerPage - 1)}
                        disabled={safeCustomerPage === 1}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                          safeCustomerPage === 1
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {Array.from({ length: totalCustomerPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCustomerPage(page)}
                          className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                            page === safeCustomerPage
                              ? 'bg-cyan-500 text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCustomerPage(safeCustomerPage + 1)}
                        disabled={safeCustomerPage === totalCustomerPages}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                          safeCustomerPage === totalCustomerPages
                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Vehicles ({partner.linkedVehicles?.length || 0})</h2>
              {!partner.linkedVehicles || partner.linkedVehicles.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No linked vehicles yet</p>
              ) : (
                <>
                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="relative flex-1 min-w-[200px] max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search registration, owner..."
                        value={vehicleSearch}
                        onChange={(e) => { setVehicleSearch(e.target.value); setVehiclePage(1) }}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={vehicleTypeFilter}
                      onChange={(e) => { setVehicleTypeFilter(e.target.value); setVehiclePage(1) }}
                      className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="truck">Truck</option>
                      <option value="van">Van</option>
                      <option value="bus">Bus</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                      <option value="two-wheeler">Two Wheeler</option>
                    </select>
                    <select
                      value={vehicleStatusFilter}
                      onChange={(e) => { setVehicleStatusFilter(e.target.value); setVehiclePage(1) }}
                      className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blacklisted">Blacklisted</option>
                    </select>
                    {(vehicleSearch || vehicleTypeFilter !== 'all' || vehicleStatusFilter !== 'all') && (
                      <button
                        onClick={() => { setVehicleSearch(''); setVehicleTypeFilter('all'); setVehicleStatusFilter('all'); setVehiclePage(1) }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear
                      </button>
                    )}
                  </div>

                  {filteredVehicles.length === 0 ? (
                    <div className="py-12 text-center">
                      <Truck className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">No vehicles match your filters</p>
                    </div>
                  ) : (<>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Registration</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Owner</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incidents</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscriber</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedVehicles.map((vehicle) => (
                          <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3">
                              <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">{vehicle.registrationNumber}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{vehicle.make} {vehicle.model}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{vehicle.year}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.ownerName}</td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium capitalize">
                                {vehicle.vehicleType}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <VehicleStatusBadge status={vehicle.status} />
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                                {vehicle.incidentCount}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.subscriberName}</td>
                            <td className="px-4 py-3">
                              <div className="relative">
                                <button
                                  onClick={() => setVehicleActionMenu(vehicleActionMenu === vehicle.id ? null : vehicle.id)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                  <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </button>
                                {vehicleActionMenu === vehicle.id && (
                                  <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg z-20">
                                    <button
                                      onClick={() => {
                                        console.log('Deactivate vehicle:', vehicle.id)
                                        setVehicleActionMenu(null)
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                      <Ban className="w-3.5 h-3.5" />
                                      Deactivate
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing {(safeVehiclePage - 1) * vehiclesPerPage + 1}–{Math.min(safeVehiclePage * vehiclesPerPage, totalVehicles)} of {totalVehicles}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setVehiclePage(safeVehiclePage - 1)}
                          disabled={safeVehiclePage === 1}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                            safeVehiclePage === 1
                              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: totalVehiclePages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setVehiclePage(page)}
                            className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                              page === safeVehiclePage
                                ? 'bg-cyan-500 text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => setVehiclePage(safeVehiclePage + 1)}
                          disabled={safeVehiclePage === totalVehiclePages}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                            safeVehiclePage === totalVehiclePages
                              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </>)}
                </>
              )}
            </div>
          )}

          {/* Registered Visitors Tab */}
          {activeTab === 'visitors' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Visitors ({partner.registeredVisitors?.length || 0})</h2>
              {!partner.registeredVisitors || partner.registeredVisitors.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No registered visitors yet</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Visitor ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedVisitors.map((visitor) => (
                          <tr key={visitor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3">
                              <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">{visitor.visitorId}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                              {new Date(visitor.visitDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                              {' '}
                              <span className="text-slate-400 dark:text-slate-500">
                                {new Date(visitor.visitDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationBar current={safeVisitorPage} total={totalVisitorPages} count={totalVisitors} perPage={perPage} onChange={setVisitorPage} />
                </>
              )}
            </div>
          )}

          {/* Registered Visitors Tab */}
          {activeTab === 'registeredVisitors' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Registered Visitors ({totalRegVisitors})</h2>
              {totalRegVisitors === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No registered visitors yet</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Visitor ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Visitor Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Pending Challans</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Pending Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Contact Number</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedRegVisitors.map((rv) => (
                          <tr key={rv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3">
                              <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">{rv.visitorId}</span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-50">{rv.visitorName}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                                rv.pendingChallans > 0
                                  ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                {rv.pendingChallans}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                              {rv.pendingChallansAmount > 0 ? formatCurrency(rv.pendingChallansAmount) : '—'}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{rv.contactNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationBar current={safeRegVisitorPage} total={totalRegVisitorPages} count={totalRegVisitors} perPage={perPage} onChange={setRegVisitorPage} />
                </>
              )}
            </div>
          )}

          {/* Outlets Tab */}
          {activeTab === 'outlets' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Outlets ({partner.linkedOutlets?.length || 0})</h2>
              {!partner.linkedOutlets || partner.linkedOutlets.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No outlets yet</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Outlet</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Location</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Pincode</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscribers</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicles</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedOutlets.map((outlet) => (
                          <tr key={outlet.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-slate-900 dark:text-slate-50">{outlet.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{outlet.address}</p>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                              {outlet.state}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                              {outlet.pinCode}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                                {outlet.subscriberCount}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                                {outlet.vehicleCount}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                outlet.status === 'active'
                                  ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                {outlet.status.charAt(0).toUpperCase() + outlet.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationBar current={safeOutletPage} total={totalOutletPages} count={totalOutlets} perPage={perPage} onChange={setOutletPage} />
                </>
              )}
            </div>
          )}

          {/* QRs Tab */}
          {activeTab === 'qrs' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">QR Codes ({partner.outletQRs?.length || 0})</h2>
              {!partner.outletQRs || partner.outletQRs.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No QR codes generated yet</p>
              ) : (
                <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">QR ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Outlet</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Scans</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Created</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {paginatedQRs.map((qr) => (
                        <tr key={qr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3">
                            <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">{qr.qrId}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{qr.outletName}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">
                              {qr.totalScans.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              qr.status === 'active'
                                ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {qr.status.charAt(0).toUpperCase() + qr.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(qr.createdDate)}</td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <button
                                onClick={() => setQrActionMenu(qrActionMenu === qr.id ? null : qr.id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                              </button>
                              {qrActionMenu === qr.id && (
                                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg z-20 py-1">
                                  <button
                                    onClick={() => {
                                      setViewQr(qr)
                                      setQrActionMenu(null)
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    View QR
                                  </button>
                                  <button
                                    onClick={() => {
                                      console.log('Deactivate QR:', qr.id)
                                      setQrActionMenu(null)
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  >
                                    <Ban className="w-3.5 h-3.5" />
                                    Deactivate
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationBar current={safeQRPage} total={totalQRPages} count={totalQRs} perPage={perPage} onChange={setQrPage} />
                </>
              )}
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Earnings & Payouts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-900/40 rounded-lg border border-cyan-200 dark:border-cyan-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-1">Total Earnings</p>
                      <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{formatCurrency(partner.earnings)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">Awaiting Payout (Last 30 Days)</p>
                      <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{formatCurrency(partner.earnings - partner.totalPayouts)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">Commission Per Challan</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-700 dark:text-emerald-300">Online Challans</span>
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(50)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-700 dark:text-emerald-300">Court Challans</span>
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(50)}</span>
                    </div>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Documents</h2>
                <button
                  onClick={() => setShowDocumentUpload(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-600 dark:border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              </div>

              <div className="space-y-3">
                {partner.documents.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
                ) : (
                  partner.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-slate-900 dark:text-slate-50">{doc.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Uploaded {formatDate(doc.uploadedDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Upload Document Modal */}
              {showDocumentUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowDocumentUpload(false)}>
                  <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Upload Document</h3>
                      <button
                        onClick={() => setShowDocumentUpload(false)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="px-6 py-5 space-y-5">
                      {/* Document Type */}
                      <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-1.5">
                          Document Type <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                          <option value="">Select document type</option>
                          <option value="pan">PAN Card</option>
                          <option value="aadhaar">Aadhaar Card</option>
                          <option value="gst">GST Certificate</option>
                          <option value="agreement">Partnership Agreement</option>
                          <option value="bank">Bank Statement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-1.5">
                          File <span className="text-red-500">*</span>
                        </label>
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
                        <label
                          htmlFor="document-upload"
                          className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2" />
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to select a file</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF, JPG, PNG, Excel, Word up to 10MB</p>
                        </label>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setShowDocumentUpload(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
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
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Size</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
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
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{report.fileSize ? formatFileSize(report.fileSize) : '—'}</td>
                            <td className="px-4 py-3"><ReportStatusBadge status={report.status} /></td>
                            <td className="px-4 py-3 text-right"><ReportAction status={report.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 my-8" />

              {/* Incident Reports */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Incident Reports</h2>
                {incidentReports.length === 0 ? (
                  <div className="text-center py-10">
                    <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No incident reports generated yet</p>
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
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {incidentReports.map((report) => (
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
                              ) : <span>—</span>}
                            </td>
                            <td className="px-4 py-3"><ReportStatusBadge status={report.status} /></td>
                            <td className="px-4 py-3 text-right"><ReportAction status={report.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
        )}

        {/* QR Card Modal */}
        {viewQr && (
          <QRCardModal
            qr={viewQr}
            onClose={() => setViewQr(null)}
          />
        )}
      </div>
    </div>
  )
}

function QRCardModal({ qr, onClose }: { qr: OutletQR; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>

        <div className="w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          <img
            src="/qr-card.png"
            alt="QR Code Card"
            className="w-full h-auto"
          />
          {/* Footer with QR ID and download */}
          <div className="px-6 py-3 bg-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">{qr.qrId}</span>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors">
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>
      </div>
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

function PaginationBar({ current, total, count, perPage, onChange }: { current: number; total: number; count: number; perPage: number; onChange: (page: number) => void }) {
  if (total <= 1) return null
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing {(current - 1) * perPage + 1}–{Math.min(current * perPage, count)} of {count}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
            current === 1
              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
              page === current
                ? 'bg-cyan-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === total}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
            current === total
              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function VehicleStatusBadge({ status }: { status: 'active' | 'inactive' | 'blacklisted' }) {
  const styles = {
    active: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    blacklisted: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  }
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
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

function ReportAction({ status }: { status: string }) {
  if (status === 'ready') {
    return (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-md transition-colors">
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
    )
  }
  if (status === 'failed') {
    return (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500">
      <Loader2 className="w-3.5 h-3.5 animate-spin" />
      Processing...
    </span>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
