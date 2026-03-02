import { ArrowLeft, Building2, User, Phone, Mail, MapPin, Truck, FileText, Calendar, Edit2, UserPlus, MessageSquare, Upload, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Lead, TimelineActivity, Document, User as UserType } from '../types'

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
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const leadTimeline = timelineActivities.filter(activity => activity.leadId === lead.id)
  const leadDocuments = documents.filter(doc => doc.leadId === lead.id)

  const assignedUser = users.find(u => u.id === lead.assignedTo)

  const statusOptions: { value: Lead['status']; label: string; color: string }[] = [
    { value: 'new', label: 'New', color: 'blue' },
    { value: 'assigned', label: 'Assigned', color: 'purple' },
    { value: 'follow-up', label: 'Follow-up', color: 'orange' },
    { value: 'quotations', label: 'Quotations', color: 'cyan' },
    { value: 'projected', label: 'Projected', color: 'indigo' },
    { value: 'invoiced', label: 'Invoiced', color: 'teal' },
    { value: 'sales', label: 'Sales', color: 'green' },
    { value: 'lost', label: 'Lost', color: 'slate' },
  ]

  const handleStatusChange = (newStatus: Lead['status']) => {
    onChangeStatus?.(lead.id, newStatus)
    setShowStatusMenu(false)
  }

  const getStatusBadgeClasses = (status: Lead['status']) => {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Leads</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{lead.companyAlias}</h1>
                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                    className={`${getStatusBadgeClasses(lead.status)} flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity`}
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
              <p className="text-sm text-slate-600 dark:text-slate-400">Lead ID: {lead.id}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onAddFollowUp}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Follow-up</span>
              </button>
              <button
                onClick={onUploadDocument}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </button>
              <button
                onClick={onAssign}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Assign</span>
              </button>
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Information */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Lead Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Company Name</label>
                  <p className="text-sm text-slate-900 dark:text-white">{lead.companyName}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Source</label>
                  <p className="text-sm text-slate-900 dark:text-white">{lead.source}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Type</label>
                  <p className="text-sm text-slate-900 dark:text-white">{lead.type} - {lead.subType}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">LOTS For</label>
                  <p className="text-sm text-slate-900 dark:text-white">{lead.lotsFor}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Number of Trucks</label>
                  <p className="text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    <Truck className="w-4 h-4 text-slate-400" />
                    {lead.numberOfTrucks}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">GST Number</label>
                  <p className="text-sm text-slate-900 dark:text-white font-mono">{lead.gstNumber}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Contact Person</label>
                  <p className="text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    {lead.contactPerson}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                  <p className="text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {lead.phoneNumber}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                  <p className="text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {lead.emailId}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Location</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-900 dark:text-white">{lead.addressLane}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{lead.area}, {lead.city}, {lead.state} - {lead.pinCode}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{lead.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Activity Timeline</h2>

              <div className="space-y-4">
                {leadTimeline.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No activities yet</p>
                ) : (
                  leadTimeline.map(activity => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 shrink-0" />
                      <div className="flex-1 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.description}</p>
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDate(activity.timestamp)}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">By {activity.performedByName}</p>
                        {activity.details?.notes && (
                          <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{activity.details.notes}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Assignment</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Assigned To</label>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {assignedUser ? assignedUser.fullName : 'Unassigned'}
                  </p>
                  {assignedUser && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{assignedUser.role}</p>
                  )}
                </div>

                {lead.assignedTeam && (
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Team</label>
                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {lead.assignedTeam}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Important Dates</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Created</p>
                    <p className="text-slate-900 dark:text-white">{formatDate(lead.createdDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last Activity</p>
                    <p className="text-slate-900 dark:text-white">{formatDate(lead.lastActivityDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Documents ({leadDocuments.length})</h3>

              {leadDocuments.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No documents</p>
              ) : (
                <div className="space-y-2">
                  {leadDocuments.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <FileText className="w-5 h-5 text-cyan-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{doc.fileName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
