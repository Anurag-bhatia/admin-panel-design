import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import type {
  Subscriber,
  Subscription,
  User,
  SubscribersProps,
  SubscriberStatus,
  PaymentStatus,
  PlanType,
} from '@/../product/sections/subscribers/types'
import { AddSubscriberModal } from './AddSubscriberModal'
import { BulkUploadModal } from './BulkUploadModal'

// Icons
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
)

const DotsVerticalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
)

const TruckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
)

// Status badge component
function StatusBadge({ status }: { status: SubscriberStatus }) {
  const styles = {
    active: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    inactive: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}

// Actions menu component
function ActionsMenu({
  subscriberId,
  onViewDetails,
  onEdit,
}: {
  subscriberId: string
  onViewDetails?: (id: string) => void
  onEdit?: (id: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onViewDetails) {
      onViewDetails(subscriberId)
    }
    setIsOpen(false)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit(subscriberId)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors"
      >
        <DotsVerticalIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 py-1">
          <button
            onClick={handleViewDetails}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
          <button
            onClick={handleEdit}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

// Format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function SubscriberList({
  subscribers,
  subscriptions,
  users,
  partners,
  subscriberSources,
  subscriberTypes,
  subscriberSubTypes,
  planTypes,
  onViewDetails,
  onEdit,
  onAddSubscriber,
  onBulkUpload,
  onSearch,
  onFilter,
  utmSources = [],
  vehicleTypes = [],
  userTypes = [],
}: SubscribersProps & { utmSources?: string[]; vehicleTypes?: string[]; userTypes?: string[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<string>('')
  const [ownerFilter, setOwnerFilter] = useState<string>('')
  const [planTypeFilter, setPlanTypeFilter] = useState<string>('')
  const [locationFilter, setLocationFilter] = useState<string>('')
  const [partnerFilter, setPartnerFilter] = useState<string>('')
  const [utmSourceFilter, setUtmSourceFilter] = useState<string>('')
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('')
  const [userTypeFilter, setUserTypeFilter] = useState<string>('')
  const [partnerSearch, setPartnerSearch] = useState('')
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false)
  const partnerDropdownRef = useRef<HTMLDivElement>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Close partner dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (partnerDropdownRef.current && !partnerDropdownRef.current.contains(event.target as Node)) {
        setShowPartnerDropdown(false)
      }
    }
    if (showPartnerDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPartnerDropdown])

  // Filtered partners for searchable dropdown
  const filteredPartners = useMemo(() => {
    if (!partnerSearch) return partners
    return partners.filter(p => p.name.toLowerCase().includes(partnerSearch.toLowerCase()))
  }, [partners, partnerSearch])

  // Create subscription lookup map
  const subscriptionMap = useMemo(() => {
    const map = new Map<string, Subscription>()
    subscriptions.forEach((sub) => map.set(sub.subscriberId, sub))
    return map
  }, [subscriptions])

  // Create user lookup map
  const userMap = useMemo(() => {
    const map = new Map<string, User>()
    users.forEach((user) => map.set(user.id, user))
    return map
  }, [users])

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const subscription = subscriptionMap.get(sub.id)

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          sub.subscriberName.toLowerCase().includes(query) ||
          sub.id.toLowerCase().includes(query) ||
          sub.gstNumber.toLowerCase().includes(query) ||
          sub.contactPerson.toLowerCase().includes(query) ||
          sub.emailId.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Status filter
      if (statusFilter && sub.status !== statusFilter) return false

      // Source filter
      if (sourceFilter && sub.source !== sourceFilter) return false

      // Owner filter
      if (ownerFilter && sub.assignedOwner !== ownerFilter) return false

      // Plan type filter
      if (planTypeFilter && subscription?.planType !== planTypeFilter) return false

      // Location filter
      if (locationFilter && !sub.state.toLowerCase().includes(locationFilter.toLowerCase())) return false

      // Partner filter
      if (partnerFilter && sub.partnerId !== partnerFilter) return false

      // UTM Source filter (matches against source field)
      if (utmSourceFilter && sub.source?.toLowerCase() !== utmSourceFilter.toLowerCase()) return false

      // Vehicle type filter (matches against lotsFor field)
      if (vehicleTypeFilter) {
        const isCommercial = vehicleTypeFilter === 'Commercial Vehicle'
        const lotsFor = (sub.lotsFor || '').toLowerCase()
        if (isCommercial && !['commercial', 'heavy', 'delivery', 'distribution', 'express', 'rental', 'refrigerated'].some(k => lotsFor.includes(k))) return false
        if (!isCommercial && !['private', 'personal', 'company fleet'].some(k => lotsFor.includes(k))) return false
      }

      // User type filter
      if (userTypeFilter) {
        if (userTypeFilter === 'Subscribers' && sub.status !== 'active') return false
        if (userTypeFilter === 'Visitors' && sub.status !== 'inactive') return false
      }

      return true
    })
  }, [subscribers, subscriptionMap, searchQuery, statusFilter, sourceFilter, ownerFilter, planTypeFilter, locationFilter, partnerFilter, utmSourceFilter, vehicleTypeFilter, userTypeFilter])

  // Pagination
  const totalPages = Math.ceil(filteredSubscribers.length / pageSize)
  const paginatedSubscribers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredSubscribers.slice(start, start + pageSize)
  }, [filteredSubscribers, currentPage, pageSize])

  const startIndex = (currentPage - 1) * pageSize + 1
  const endIndex = Math.min(currentPage * pageSize, filteredSubscribers.length)

  // Reset to page 1 when filters change
  const resetPage = () => setCurrentPage(1)

  // Active filter count
  const activeFilterCount = [statusFilter, sourceFilter, ownerFilter, planTypeFilter, locationFilter, partnerFilter, utmSourceFilter, vehicleTypeFilter, userTypeFilter].filter(Boolean).length

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('')
    setSourceFilter('')
    setOwnerFilter('')
    setPlanTypeFilter('')
    setLocationFilter('')
    setPartnerFilter('')
    setPartnerSearch('')
    setUtmSourceFilter('')
    setVehicleTypeFilter('')
    setUserTypeFilter('')
    setSearchQuery('')
    resetPage()
  }

  // Modal handlers
  const handleAddSubscriber = (data: any) => {
    console.log('Adding subscriber:', data)
    setShowAddModal(false)
    showNotification('Subscriber added successfully!')
    if (onAddSubscriber) onAddSubscriber()
  }

  const handleBulkUpload = (file: File) => {
    console.log('Uploading file:', file.name)
    setShowBulkUploadModal(false)
    showNotification(`Processing ${file.name}...`)
    if (onBulkUpload) onBulkUpload()
  }

  const handleDownloadTemplate = () => {
    console.log('Downloading template')
    showNotification('Template downloaded')
  }

  const handleViewDetails = (id: string) => {
    if (onViewDetails) onViewDetails(id)
  }

  const handleEdit = (id: string) => {
    console.log('Editing subscriber:', id)
    showNotification('Edit functionality coming soon')
    if (onEdit) onEdit(id)
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Subscribers
              </h1>
            </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBulkUploadModal(true)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <UploadIcon />
              <span className="hidden sm:inline">Bulk Upload</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors shadow-sm"
            >
              <PlusIcon />
              <span>Add Subscriber</span>
            </button>
          </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, GST, or contact..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                  onSearch?.(e.target.value)
                }}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                showFilters
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Source</label>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Sources</option>
                    {subscriberSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Filter by state..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Plan Type</label>
                  <select
                    value={planTypeFilter}
                    onChange={(e) => setPlanTypeFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Plans</option>
                    {planTypes.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Partner filter - searchable dropdown */}
                <div ref={partnerDropdownRef} className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Partner</label>
                  <button
                    type="button"
                    onClick={() => setShowPartnerDropdown(!showPartnerDropdown)}
                    className="w-full flex items-center justify-between pl-3 pr-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-left focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <span className={partnerFilter ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
                      {partnerFilter ? partners.find(p => p.id === partnerFilter)?.name || 'Select' : 'Select'}
                    </span>
                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {showPartnerDropdown && (
                    <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
                      <div className="p-2 border-b border-slate-200 dark:border-slate-700">
                        <input
                          type="text"
                          value={partnerSearch}
                          onChange={(e) => setPartnerSearch(e.target.value)}
                          placeholder="Search partners..."
                          className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        <button
                          onClick={() => { setPartnerFilter(''); setPartnerSearch(''); setShowPartnerDropdown(false) }}
                          className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                            !partnerFilter ? 'text-cyan-600 dark:text-cyan-400 font-medium bg-cyan-50 dark:bg-cyan-900/20' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          All Partners
                        </button>
                        {filteredPartners.map((partner) => (
                          <button
                            key={partner.id}
                            onClick={() => { setPartnerFilter(partner.id); setPartnerSearch(''); setShowPartnerDropdown(false) }}
                            className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                              partnerFilter === partner.id ? 'text-cyan-600 dark:text-cyan-400 font-medium bg-cyan-50 dark:bg-cyan-900/20' : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {partner.name}
                          </button>
                        ))}
                        {filteredPartners.length === 0 && (
                          <p className="px-3 py-2.5 text-xs text-slate-400">No partners found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* UTM Source filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">UTM Source</label>
                  <select
                    value={utmSourceFilter}
                    onChange={(e) => setUtmSourceFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select</option>
                    {utmSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Type filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Vehicle Type</label>
                  <select
                    value={vehicleTypeFilter}
                    onChange={(e) => setVehicleTypeFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User Type filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">User Type</label>
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select</option>
                    {userTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">
                    Subscriber
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">
                    POC
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">
                    Subscription
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">
                    Vehicles
                  </th>
                  <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3 w-16">

                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {paginatedSubscribers.map((subscriber) => {
                  const subscription = subscriptionMap.get(subscriber.id)

                  return (
                    <tr
                      key={subscriber.id}
                      onClick={() => handleViewDetails(subscriber.id)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
                    >
                      {/* Subscriber Info */}
                      <td className="px-4 py-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                            {subscriber.subscriberName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {subscriber.id}
                          </p>
                        </div>
                      </td>

                      {/* POC */}
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-900 dark:text-white">
                          {subscriber.contactPerson}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {subscriber.phoneNumber}
                        </p>
                      </td>


                      {/* Subscription */}
                      <td className="px-4 py-4">
                        {subscription ? (
                          <div>
                            <p className="text-sm text-slate-900 dark:text-white">
                              {subscription.subscriptionName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {subscription.planType} · {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">No subscription</span>
                        )}
                      </td>

                      {/* Vehicles */}
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                          <TruckIcon />
                          <span className="font-medium">{subscriber.numberOfTrucks}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <StatusBadge status={subscriber.status} />
                      </td>

                      {/* Actions */}
                      <td
                        className="px-4 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ActionsMenu
                          subscriberId={subscriber.id}
                          onViewDetails={handleViewDetails}
                          onEdit={handleEdit}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredSubscribers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                No subscribers found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {searchQuery || activeFilterCount > 0
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first subscriber'}
              </p>
              {searchQuery || activeFilterCount > 0 ? (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  Clear all filters
                </button>
              ) : (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  <PlusIcon />
                  Add Subscriber
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredSubscribers.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{startIndex}</span> to <span className="font-semibold text-slate-700 dark:text-slate-300">{endIndex}</span> of <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredSubscribers.length}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddSubscriberModal
          users={users}
          partners={partners}
          subscriberSources={subscriberSources}
          subscriberTypes={subscriberTypes}
          subscriberSubTypes={subscriberSubTypes}
          onSubmit={handleAddSubscriber}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showBulkUploadModal && (
        <BulkUploadModal
          onUpload={handleBulkUpload}
          onDownloadTemplate={handleDownloadTemplate}
          onClose={() => setShowBulkUploadModal(false)}
        />
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-400 dark:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}
    </div>
  )
}
