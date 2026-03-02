import { useState, useMemo } from 'react'
import { Calendar, Clock, ChevronDown, MoreVertical, Eye, Phone, MapPin, Truck, Building2 } from 'lucide-react'
import type { MyLeadsProps, Lead } from '@/../product/sections/sales-crm/my-leads-types'
import { LeadDetailView } from './LeadDetailView'
import { EditLeadModal } from './EditLeadModal'
import { AddFollowUpModal } from './AddFollowUpModal'
import { UploadDocumentModal } from './UploadDocumentModal'

// Typography: Geist for headings/body, Geist Mono for mono
// Colors: cyan (primary), slate (neutral)
// Design: Clean, data-focused sales command center

type LeadTab = 'assigned' | 'follow-up' | 'quotations' | 'sales' | 'lost'
type FollowUpSegment = 'warm' | 'cold' | 'all'

export function MyLeads({
  currentUser,
  leads,
  todaysMeetings,
  todaysPriorities,
  timelineActivities,
  users,
  leadSources,
  serviceTypes,
  serviceSubTypes,
  activityTypes,
  documentCategories,
  onViewLead,
  onLogFollowUp,
  onSendQuotation,
  onMarkConverted,
  onMarkLost,
  onEditLead,
  onAddFollowUp,
  onUploadDocument
}: MyLeadsProps) {
  const [activeTab, setActiveTab] = useState<LeadTab>('follow-up')
  const [followUpSegment, setFollowUpSegment] = useState<FollowUpSegment>('warm')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [editLeadId, setEditLeadId] = useState<string | null>(null)
  const [followUpLeadId, setFollowUpLeadId] = useState<string | null>(null)
  const [uploadDocLeadId, setUploadDocLeadId] = useState<string | null>(null)

  // Get today's date
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Filter leads by tab and segment
  const filteredLeads = useMemo(() => {
    let filtered = leads

    // Filter by tab
    if (activeTab === 'assigned') {
      filtered = filtered.filter(l => l.status === 'assigned' || l.status === 'new')
    } else if (activeTab === 'follow-up') {
      filtered = filtered.filter(l => l.status === 'follow-up')

      // Apply follow-up segment filter
      if (followUpSegment === 'warm') {
        filtered = filtered.filter(l => l.temperature === 'warm')
      } else if (followUpSegment === 'cold') {
        filtered = filtered.filter(l => l.temperature === 'cold')
      }
    } else if (activeTab === 'quotations') {
      filtered = filtered.filter(l => l.status === 'quotations')
    } else if (activeTab === 'sales') {
      filtered = filtered.filter(l => l.status === 'sales')
    } else if (activeTab === 'lost') {
      filtered = filtered.filter(l => l.status === 'lost')
    }

    return filtered
  }, [leads, activeTab, followUpSegment])

  // Count leads per tab
  const tabCounts = useMemo(() => ({
    assigned: leads.filter(l => l.status === 'assigned' || l.status === 'new').length,
    'follow-up': leads.filter(l => l.status === 'follow-up').length,
    quotations: leads.filter(l => l.status === 'quotations').length,
    sales: leads.filter(l => l.status === 'sales').length,
    lost: leads.filter(l => l.status === 'lost').length
  }), [leads])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  }

  const getStatusBadgeClasses = (status: Lead['status']) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-medium rounded-full'
    const variants: Record<Lead['status'], string> = {
      new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      assigned: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'follow-up': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      quotations: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      projected: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      invoiced: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
      sales: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      lost: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    }
    return `${baseClasses} ${variants[status]}`
  }

  const STATUS_LABELS: Record<Lead['status'], string> = {
    new: 'New',
    assigned: 'Assigned',
    'follow-up': 'Follow-up',
    quotations: 'Quotations',
    projected: 'Projected',
    invoiced: 'Ready to Invoice',
    sales: 'Converted',
    lost: 'Lost',
  }

  const getUserName = (userId: string | null) => {
    if (!userId) return 'Unassigned'
    const user = users.find(u => u.id === userId)
    return user?.fullName || 'Unknown'
  }

  // Get selected lead and modal leads
  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) : null
  const editLead = editLeadId ? leads.find(l => l.id === editLeadId) : null
  const followUpLead = followUpLeadId ? leads.find(l => l.id === followUpLeadId) : null
  const uploadDocLead = uploadDocLeadId ? leads.find(l => l.id === uploadDocLeadId) : null

  // If a lead is selected, show detail view
  if (selectedLead) {
    return (
      <>
        <LeadDetailView
          lead={selectedLead}
          timelineActivities={timelineActivities}
          documents={[]} // Documents not available in My Leads data
          users={users}
          onClose={() => setSelectedLeadId(null)}
          onEdit={() => setEditLeadId(selectedLead.id)}
          onChangeStatus={(leadId, status) => console.log('Change status:', { leadId, status })}
          onAddFollowUp={() => setFollowUpLeadId(selectedLead.id)}
          onUploadDocument={() => setUploadDocLeadId(selectedLead.id)}
        />

        {/* Modals for detail view */}
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
        {/* Header with Today's Date */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">My Leads</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{today}</p>
        </div>

        {/* Today's Meetings */}
        {todaysMeetings.length > 0 && (
          <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Today's Meetings
              </h2>
            </div>
            <div className="space-y-2">
              {todaysMeetings.map(meeting => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => setSelectedLeadId(meeting.leadId)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                        {meeting.timeSlot.split(':')[0]}
                      </span>
                      <span className="text-xs text-cyan-600 dark:text-cyan-400">
                        {meeting.timeSlot.split(' ')[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{meeting.leadName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{meeting.meetingType} • {meeting.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            <nav className="flex gap-4 sm:gap-6 min-w-max px-1" aria-label="Lead tabs">
              {[
                { key: 'assigned' as LeadTab, label: 'Assigned Leads' },
                { key: 'follow-up' as LeadTab, label: 'Follow-up' },
                { key: 'quotations' as LeadTab, label: 'Quotation' },
                { key: 'sales' as LeadTab, label: 'Converted' },
                { key: 'lost' as LeadTab, label: 'Lost' }
              ].map(tab => (
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
                  <span className={`ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                    activeTab === tab.key
                      ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {tabCounts[tab.key]}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Follow-up Segments */}
        {activeTab === 'follow-up' && (
          <div className="mb-6 flex gap-2">
            {[
              { key: 'warm' as FollowUpSegment, label: 'Warm Leads' },
              { key: 'cold' as FollowUpSegment, label: 'Cold Leads' },
              { key: 'all' as FollowUpSegment, label: 'All' }
            ].map(segment => (
              <button
                key={segment.key}
                onClick={() => setFollowUpSegment(segment.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  followUpSegment === segment.key
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {segment.label}
              </button>
            ))}
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">No leads found</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {activeTab === 'follow-up'
                    ? 'Try selecting a different segment'
                    : 'There are no leads in this category'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Lead ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Service Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredLeads.map(lead => (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap cursor-pointer"
                          onClick={() => setSelectedLeadId(lead.id)}
                        >
                          <div className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{lead.id}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{lead.source}</div>
                        </td>
                        <td className="px-6 py-4 cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{lead.companyAlias}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {lead.city}, {lead.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                          <div className="text-sm text-slate-900 dark:text-white">{lead.contactPerson}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                              <Phone className="w-3 h-3" />
                              {lead.phoneNumber.slice(0, 10)}...
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                          <div className="text-sm text-slate-900 dark:text-white">{lead.type}</div>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <Truck className="w-3 h-3" />
                            {lead.numberOfTrucks} trucks
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                          <span className={getStatusBadgeClasses(lead.status)}>
                            {STATUS_LABELS[lead.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                          <div className="text-sm text-slate-900 dark:text-white">{getUserName(lead.assignedTo)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                          <div className="relative inline-block" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenDropdownId(openDropdownId === lead.id ? null : lead.id)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                            >
                              <MoreVertical className="w-5 h-5 text-slate-400" />
                            </button>

                            {openDropdownId === lead.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setSelectedLeadId(lead.id)
                                      setOpenDropdownId(null)
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
                {filteredLeads.map(lead => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1">{lead.id}</div>
                        <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{lead.companyAlias}</div>
                      </div>
                      <span className={getStatusBadgeClasses(lead.status)}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Building2 className="w-4 h-4" />
                        <span>{lead.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Phone className="w-4 h-4" />
                        <span>{lead.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {lead.city}, {lead.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Truck className="w-4 h-4" />
                        <span>
                          {lead.type} • {lead.numberOfTrucks} trucks
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-xs sm:text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Assigned to: </span>
                        <span className="text-slate-900 dark:text-white font-medium">{getUserName(lead.assignedTo)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary */}
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          <p>
            Showing <span className="font-medium text-slate-900 dark:text-slate-100">{filteredLeads.length}</span>{' '}
            lead{filteredLeads.length !== 1 ? 's' : ''}
            {activeTab === 'follow-up' && ` (${followUpSegment === 'all' ? 'all' : followUpSegment})`}
          </p>
        </div>
      </div>
    </div>
  )
}
