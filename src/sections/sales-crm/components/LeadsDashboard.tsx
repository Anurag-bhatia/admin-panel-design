import { useState, useMemo } from 'react'
import { Search, Filter, TrendingUp, Users, Target } from 'lucide-react'
import type { LeadsProps, Lead } from '@/../product/sections/sales-crm/types'
import { LeadsTable } from './LeadsTable'
import { AddLeadModal } from './AddLeadModal'
import { BulkUploadModal } from './BulkUploadModal'
import { LeadDetailView } from './LeadDetailView'
import { AssignLeadModal } from './AssignLeadModal'
import { BulkActionsBar } from './BulkActionsBar'
import { LeadsListHeader } from './LeadsListHeader'
import { EditLeadModal } from './EditLeadModal'
import { AddFollowUpModal } from './AddFollowUpModal'
import { UploadDocumentModal } from './UploadDocumentModal'

// Design tokens: cyan (primary), slate (neutral)
// Aesthetic: Clean data-driven dashboard with strong data hierarchy and operational efficiency

type LifecycleTab = 'all' | 'new' | 'assigned' | 'follow-up' | 'quotations' | 'projected' | 'invoiced' | 'sales' | 'lost'

export function LeadsDashboard({
  leads,
  timelineActivities,
  documents,
  users,
  leadSources,
  serviceTypes,
  serviceSubTypes,
  activityTypes,
  documentCategories,
  onViewLead,
  onAddLead,
  onBulkUpload,
  onDownloadTemplate,
  onEditLead,
  onAssignLead,
  onChangeStatus,
  onAddFollowUp,
  onUploadDocument,
  onViewDocument,
  onDeleteDocument,
}: LeadsProps) {
  const [activeTab, setActiveTab] = useState<LifecycleTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [assignLeadId, setAssignLeadId] = useState<string | null>(null)
  const [editLeadId, setEditLeadId] = useState<string | null>(null)
  const [followUpLeadId, setFollowUpLeadId] = useState<string | null>(null)
  const [uploadDocLeadId, setUploadDocLeadId] = useState<string | null>(null)
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    source: '',
    owner: '',
    serviceType: '',
    location: '',
  })

  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) : null
  const assignLead = assignLeadId ? leads.find(l => l.id === assignLeadId) : null
  const editLead = editLeadId ? leads.find(l => l.id === editLeadId) : null
  const followUpLead = followUpLeadId ? leads.find(l => l.id === followUpLeadId) : null
  const uploadDocLead = uploadDocLeadId ? leads.find(l => l.id === uploadDocLeadId) : null

  const handleSelectLead = (leadId: string, selected: boolean) => {
    const newSelected = new Set(selectedLeads)
    if (selected) {
      newSelected.add(leadId)
    } else {
      newSelected.delete(leadId)
    }
    setSelectedLeads(newSelected)
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedLeads(new Set(leadsByTab.map(lead => lead.id)))
    } else {
      setSelectedLeads(new Set())
    }
  }

  const handleBulkMoveStatus = (status: Lead['status']) => {
    const leadIds = Array.from(selectedLeads)
    leadIds.forEach(id => onChangeStatus?.(id, status))
    setSelectedLeads(new Set())
  }

  const handleBulkAssignOwner = (userId: string) => {
    const leadIds = Array.from(selectedLeads)
    leadIds.forEach(id => onAssignLead?.(id, userId))
    setSelectedLeads(new Set())
  }

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = leads.length
    const newLeads = leads.filter(l => l.status === 'new').length
    const converted = leads.filter(l => l.status === 'sales').length
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0.0'

    return {
      total,
      newLeads,
      converted,
      conversionRate,
    }
  }, [leads])

  // Filter leads by lifecycle stage
  const leadsByTab = useMemo(() => {
    const statusMap: Record<LifecycleTab, Lead['status'] | null> = {
      all: null,
      new: 'new',
      assigned: 'assigned',
      'follow-up': 'follow-up',
      quotations: 'quotations',
      projected: 'projected',
      invoiced: 'invoiced',
      sales: 'sales',
      lost: 'lost',
    }

    const status = statusMap[activeTab]
    let filtered = status ? leads.filter(l => l.status === status) : leads

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        l =>
          l.id.toLowerCase().includes(query) ||
          l.companyName.toLowerCase().includes(query) ||
          l.companyAlias.toLowerCase().includes(query) ||
          l.contactPerson.toLowerCase().includes(query)
      )
    }

    // Apply filters
    if (filters.source) {
      filtered = filtered.filter(l => l.source === filters.source)
    }
    if (filters.owner && filters.owner !== 'all') {
      filtered = filtered.filter(l => l.assignedTo === filters.owner)
    }
    if (filters.serviceType) {
      filtered = filtered.filter(l => l.type === filters.serviceType)
    }
    if (filters.location) {
      filtered = filtered.filter(l => l.state.toLowerCase().includes(filters.location.toLowerCase()))
    }

    return filtered
  }, [leads, activeTab, searchQuery, filters])

  // Count leads per tab
  const tabCounts: Record<LifecycleTab, number> = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      assigned: leads.filter(l => l.status === 'assigned').length,
      'follow-up': leads.filter(l => l.status === 'follow-up').length,
      quotations: leads.filter(l => l.status === 'quotations').length,
      projected: leads.filter(l => l.status === 'projected').length,
      invoiced: leads.filter(l => l.status === 'invoiced').length,
      sales: leads.filter(l => l.status === 'sales').length,
      lost: leads.filter(l => l.status === 'lost').length,
    }
  }, [leads])

  const tabs: { key: LifecycleTab; label: string }[] = [
    { key: 'all', label: 'All Leads' },
    { key: 'new', label: 'New' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'follow-up', label: 'Follow-up' },
    { key: 'quotations', label: 'Quotations' },
    { key: 'projected', label: 'Projected' },
    { key: 'invoiced', label: 'Ready to Invoice' },
    { key: 'sales', label: 'Converted' },
    { key: 'lost', label: 'Lost' },
  ]

  // If a lead is selected, show detail view
  if (selectedLead) {
    return (
      <>
        <LeadDetailView
          lead={selectedLead}
          timelineActivities={timelineActivities}
          documents={documents}
          users={users}
          onClose={() => setSelectedLeadId(null)}
          onEdit={() => {
            setEditLeadId(selectedLead.id)
          }}
          onAssign={() => {
            setAssignLeadId(selectedLead.id)
          }}
          onChangeStatus={onChangeStatus}
          onAddFollowUp={() => {
            setFollowUpLeadId(selectedLead.id)
          }}
          onUploadDocument={() => {
            setUploadDocLeadId(selectedLead.id)
          }}
        />

        {/* Modals for detail view */}
        {assignLead && (
          <AssignLeadModal
            leadId={assignLead.id}
            leadName={assignLead.companyAlias}
            currentAssignee={assignLead.assignedTo}
            users={users}
            onAssign={userId => {
              onAssignLead?.(assignLead.id, userId)
              setAssignLeadId(null)
            }}
            onClose={() => setAssignLeadId(null)}
          />
        )}

        {editLead && (
          <EditLeadModal
            lead={editLead}
            leadSources={leadSources}
            serviceTypes={serviceTypes}
            serviceSubTypes={serviceSubTypes}
            onSubmit={(id, leadData) => {
              onEditLead?.(id, leadData)
              setEditLeadId(null)
            }}
            onClose={() => setEditLeadId(null)}
          />
        )}

        {followUpLead && (
          <AddFollowUpModal
            leadId={followUpLead.id}
            leadName={followUpLead.companyAlias}
            activityTypes={activityTypes}
            onSubmit={(leadId, followUpData) => {
              onAddFollowUp?.(leadId, followUpData)
              setFollowUpLeadId(null)
            }}
            onClose={() => setFollowUpLeadId(null)}
          />
        )}

        {uploadDocLead && (
          <UploadDocumentModal
            leadId={uploadDocLead.id}
            leadName={uploadDocLead.companyAlias}
            documentCategories={documentCategories}
            onUpload={(leadId, file, category) => {
              onUploadDocument?.(leadId, file, category)
              setUploadDocLeadId(null)
            }}
            onClose={() => setUploadDocLeadId(null)}
          />
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="mb-6">
            <LeadsListHeader
              onCreateLead={() => setShowAddModal(true)}
              onBulkUpload={() => setShowBulkUploadModal(true)}
            />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Total Leads</h3>
                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyan-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">{metrics.total}</div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Across all stages</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">New Leads</h3>
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">{metrics.newLeads}</div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Pending assignment</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Converted Leads</h3>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">{metrics.converted}</div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Successfully closed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            <nav className="flex gap-4 sm:gap-6 min-w-max px-1" aria-label="Lead lifecycle tabs">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2.5 sm:pb-3 px-1 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-cyan-600 text-cyan-600'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                      activeTab === tab.key
                        ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tabCounts[tab.key]}
                  </span>
                </button>
              ))}
            </nav>
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
                placeholder="Search by ID, company name, or contact person..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Source</label>
                  <select
                    value={filters.source}
                    onChange={e => setFilters({ ...filters, source: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Sources</option>
                    {leadSources.map(source => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Owner</label>
                  <select
                    value={filters.owner}
                    onChange={e => setFilters({ ...filters, owner: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Owners</option>
                    <option value="all">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Service Type</label>
                  <select
                    value={filters.serviceType}
                    onChange={e => setFilters({ ...filters, serviceType: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Types</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Filter by state..."
                    value={filters.location}
                    onChange={e => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ source: '', owner: '', serviceType: '', location: '' })}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leads Table */}
        <LeadsTable
          leads={leadsByTab}
          users={users}
          selectedLeads={selectedLeads}
          onSelectLead={handleSelectLead}
          onSelectAll={handleSelectAll}
          onViewLead={id => setSelectedLeadId(id)}
          onAssignLead={id => setAssignLeadId(id)}
          onChangeStatus={onChangeStatus}
        />

        {/* Modals */}
        {showAddModal && (
          <AddLeadModal
            leadSources={leadSources}
            serviceTypes={serviceTypes}
            serviceSubTypes={serviceSubTypes}
            onSubmit={leadData => {
              onAddLead?.(leadData)
              setShowAddModal(false)
            }}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {showBulkUploadModal && (
          <BulkUploadModal
            onUpload={file => {
              onBulkUpload?.(file)
              setShowBulkUploadModal(false)
            }}
            onDownloadTemplate={() => {
              onDownloadTemplate?.()
            }}
            onClose={() => setShowBulkUploadModal(false)}
          />
        )}

        {/* Floating Bulk Actions Bar */}
        {selectedLeads.size > 0 && (
          <BulkActionsBar
            selectedCount={selectedLeads.size}
            users={users}
            onClearSelection={() => setSelectedLeads(new Set())}
            onMoveStatus={handleBulkMoveStatus}
            onAssignOwner={handleBulkAssignOwner}
            onBulkUpdate={() => setShowBulkUploadModal(true)}
          />
        )}

        {/* Assign Lead Modal (from table actions) */}
        {assignLead && !selectedLeadId && (
          <AssignLeadModal
            leadId={assignLead.id}
            leadName={assignLead.companyAlias}
            currentAssignee={assignLead.assignedTo}
            users={users}
            onAssign={userId => {
              onAssignLead?.(assignLead.id, userId)
              setAssignLeadId(null)
            }}
            onClose={() => setAssignLeadId(null)}
          />
        )}
      </div>
    </div>
  )
}
