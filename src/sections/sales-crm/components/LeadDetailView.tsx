import { useState } from 'react'
import { ArrowLeft, Building2, FileText, UserPlus, MessageSquare, Upload, ChevronDown, Clock } from 'lucide-react'
import type { Lead, TimelineActivity, Document, User as UserType } from '@/../product/sections/sales-crm/types'

type TabType = 'details' | 'documents'

interface LeadDetailViewProps {
  lead: Lead
  timelineActivities: TimelineActivity[]
  documents: Document[]
  users: UserType[]
  onClose: () => void
  onEdit?: () => void
  onAssign?: () => void
  onChangeStatus?: (leadId: string, newStatus: Lead['status']) => void
  onAddFollowUp?: () => void
  onUploadDocument?: () => void
}

export function LeadDetailView({ lead, timelineActivities, documents, users, onClose, onEdit, onAssign, onChangeStatus, onAddFollowUp, onUploadDocument }: LeadDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const leadTimeline = timelineActivities.filter(activity => activity.leadId === lead.id)
  const leadDocuments = documents.filter(doc => doc.leadId === lead.id)
  const assignedUser = users.find(u => u.id === lead.assignedTo)

  const statusOptions: { value: Lead['status']; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'quotations', label: 'Quotations' },
    { value: 'projected', label: 'Projected' },
    { value: 'invoiced', label: 'Ready to Invoice' },
    { value: 'sales', label: 'Sales' },
    { value: 'lost', label: 'Lost' },
  ]

  const handleStatusChange = (newStatus: Lead['status']) => {
    onChangeStatus?.(lead.id, newStatus)
    setShowStatusMenu(false)
  }

  const getStatusBadgeClasses = (status: Lead['status']) => {
    const baseClasses = 'px-3 py-1.5 text-xs font-medium rounded-full'
    const variants: Record<Lead['status'], string> = {
      new: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      assigned: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'follow-up': 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      quotations: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      projected: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      invoiced: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
      sales: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      lost: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    }
    return `${baseClasses} ${variants[status]}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <Building2 className="w-4 h-4" />,
      documents: <FileText className="w-4 h-4" />,
    }
    return icons[tab]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{lead.companyAlias || lead.companyName}</h1>
              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className={`${getStatusBadgeClasses(lead.status)} inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity`}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('-', ' ')}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showStatusMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowStatusMenu(false)} />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20">
                      <div className="py-1">
                        {statusOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between ${
                              lead.status === option.value ? 'bg-slate-50 dark:bg-slate-700' : ''
                            }`}
                          >
                            <span className="text-slate-900 dark:text-white">{option.label}</span>
                            {lead.status === option.value && (
                              <div className="w-2 h-2 rounded-full bg-cyan-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Lead ID: {lead.id}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onAddFollowUp}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Follow-up</span>
            </button>
            <button
              onClick={onAssign}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Assign</span>
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 -mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full">
            {(['details', 'documents'] as TabType[]).map((tab) => (
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
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Lead Details */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Lead Information</h2>
              <div className="space-y-8">
                {/* Classification */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Classification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Company Name" value={lead.companyName} />
                    <InfoField label="Company Alias" value={lead.companyAlias} />
                    <InfoField label="Source" value={lead.source} />
                    <InfoField label="Type" value={lead.type} />
                    <InfoField label="Sub Type" value={lead.subType} />
                    <InfoField label="LOTS For" value={lead.lotsFor} />
                    <InfoField label="Number of Trucks" value={`${lead.numberOfTrucks}`} />
                    <InfoField label="GST Number" value={lead.gstNumber} />
                  </div>
                </div>

                {/* POC Information */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">POC Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Contact Person" value={lead.contactPerson} />
                    <InfoField label="Phone" value={lead.phoneNumber} />
                    <InfoField label="Email" value={lead.emailId} />
                  </div>
                </div>

                {/* Location */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Country" value={lead.country} />
                    <InfoField label="State" value={lead.state} />
                    <InfoField label="City" value={lead.city} />
                    <InfoField label="Area" value={lead.area} />
                    <InfoField label="Address Lane" value={lead.addressLane} />
                    <InfoField label="Pin Code" value={lead.pinCode} />
                  </div>
                </div>

                {/* Assignment */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Assignment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Assigned To" value={assignedUser ? assignedUser.fullName : 'Unassigned'} />
                    {assignedUser && <InfoField label="Role" value={assignedUser.role} />}
                    {lead.assignedTeam && <InfoField label="Team" value={lead.assignedTeam} />}
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Created" value={formatDate(lead.createdDate)} />
                    <InfoField label="Last Activity" value={formatDate(lead.lastActivityDate)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Activity Timeline */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Activity Timeline</h3>
                <button
                  onClick={onAddFollowUp}
                  className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  + Add
                </button>
              </div>

              {leadTimeline.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No activities yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {leadTimeline.map(activity => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 shrink-0" />
                      <div className="flex-1 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-0.5">{activity.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {activity.performedByName} &middot; {formatDateTime(activity.timestamp)}
                        </p>
                        {activity.details?.notes && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5">{activity.details.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Documents ({leadDocuments.length})</h2>
              <button
                onClick={onUploadDocument}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            {leadDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leadDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50">{doc.fileName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category} • Uploaded {formatDate(doc.uploadedDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
