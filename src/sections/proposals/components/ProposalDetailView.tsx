import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Send,
  ExternalLink,
  Clock,
  User,
  MessageSquare,
  FileText,
  LinkIcon,
} from 'lucide-react'
import type {
  Proposal,
  ProposalItem,
  ChallanItem,
  DLItem,
  RCItem,
  ProposalActivity,
  Comment,
  TeamMember,
  ProposalStatus,
  ServiceStatus,
  RejectionReason,
} from '@/../product/sections/proposals/types'
import { SendQuoteModal } from './SendQuoteModal'
import { RejectModal } from './RejectModal'
import { ConvertToIncidentModal } from './ConvertToIncidentModal'
import { AssignModal } from './AssignModal'

type TabKey = 'details' | 'items' | 'notes' | 'incidents'

// =============================================================================
// Props
// =============================================================================

interface ProposalDetailViewProps {
  proposal: Proposal
  items: ProposalItem[]
  activities: ProposalActivity[]
  comments: Comment[]
  teamMembers: TeamMember[]
  onBack?: () => void
  onPickUp?: (id: string) => void
  onAssign?: (id: string, teamMemberId: string) => void
  onReassign?: (id: string, teamMemberId: string) => void
  onSendQuote?: (id: string, amount: number, breakdown?: string, note?: string) => void
  onReviseQuote?: (id: string, amount: number, breakdown?: string, note?: string) => void
  onWithdraw?: (id: string) => void
  onReject?: (id: string, reason: RejectionReason, note?: string) => void
  onReopen?: (id: string) => void
  onConvertToIncident?: (id: string, incidentId: string, serviceStatus: ServiceStatus, assignedAgentId: string, notes?: string) => void
  onUpdateServiceStatus?: (id: string, serviceStatus: ServiceStatus) => void
  onViewIncident?: (incidentId: string) => void
  onSendComment?: (proposalId: string, message: string) => void
}

// =============================================================================
// Helpers
// =============================================================================

function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateString: string): string {
  const d = new Date(dateString)
  return (
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  )
}

function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

const STATUS_STYLES: Record<ProposalStatus, { label: string; className: string }> = {
  sent: { label: 'Inbox', className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300' },
  under_review: { label: 'In Review', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  received: { label: 'Quote Sent', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  converted: { label: 'Converted', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
}

const SERVICE_STATUS_STYLES: Record<ServiceStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  not_applicable: { label: 'N/A', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

const ITEM_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

// =============================================================================
// Component
// =============================================================================

export function ProposalDetailView({
  proposal,
  items,
  activities,
  comments,
  teamMembers,
  onBack,
  onPickUp,
  onAssign,
  onReassign,
  onSendQuote,
  onReviseQuote,
  onWithdraw,
  onReject,
  onReopen,
  onConvertToIncident,
  onUpdateServiceStatus,
  onViewIncident,
  onSendComment,
}: ProposalDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('details')
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const proposalComments = comments
    .filter((c) => c.entityId === proposal.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const proposalActivities = activities
    .filter((a) => a.proposalId === proposal.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  useEffect(() => {
    if (activeTab === 'notes') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeTab, proposalComments.length])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendComment?.(proposal.id, newMessage.trim())
      setNewMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const tabs: { key: TabKey; label: string; icon: typeof FileText; show: boolean }[] = [
    { key: 'details', label: 'Details', icon: FileText, show: true },
    { key: 'items', label: 'Items', icon: FileText, show: true },
    { key: 'notes', label: 'Notes', icon: MessageSquare, show: true },
    { key: 'incidents', label: 'Incidents', icon: LinkIcon, show: proposal.status === 'converted' },
  ]

  // ───────────────────────────────────────────────────────────────────────────
  // Render: Details Tab
  // ───────────────────────────────────────────────────────────────────────────
  const renderDetailsTab = () => (
    <div className="p-6 space-y-6">
      {/* Proposal Info */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wider">
          Proposal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoField label="Type" value={
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_BADGE_STYLES[proposal.type]}`}>
              {proposal.type}
            </span>
          } />
          <InfoField label="Quantity" value={`${proposal.quantity} items`} />
          <InfoField label="Amount" value={proposal.amount > 0 ? formatINR(proposal.amount) : '—'} />
          <InfoField label="Status" value={
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLES[proposal.status].className}`}>
              {STATUS_STYLES[proposal.status].label}
            </span>
          } />
          <InfoField label="Created" value={formatDateTime(proposal.createdAt)} />
          <InfoField label="Last Updated" value={formatDateTime(proposal.updatedAt)} />
        </div>
      </div>

      {/* Customer Details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wider">
          Customer
        </h3>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2.5">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{proposal.customer.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{proposal.customer.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{proposal.customer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{proposal.customer.email}</span>
          </div>
        </div>
      </div>

      {/* Assignment */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 uppercase tracking-wider">
          Assigned To
        </h3>
        {proposal.assignedTo ? (
          <p className="text-sm text-slate-700 dark:text-slate-300">{proposal.assignedTo.name}</p>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">Unassigned</p>
        )}
      </div>

      {/* Rejection reason */}
      {proposal.status === 'rejected' && proposal.rejectionReason && (
        <div>
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2 uppercase tracking-wider">
            Rejection Reason
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
            {proposal.rejectionReason}
          </p>
        </div>
      )}
    </div>
  )

  // ───────────────────────────────────────────────────────────────────────────
  // Render: Items Tab
  // ───────────────────────────────────────────────────────────────────────────
  const renderItemsTab = () => {
    if (items.length === 0) {
      return (
        <div className="p-12 text-center">
          <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No items available</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Item details haven't been added to this proposal yet.</p>
        </div>
      )
    }

    const isChallan = 'challanId' in items[0]
    const isDL = 'licenceNumber' in items[0]

    return (
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">#</th>
              {isChallan && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Challan ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                </>
              )}
              {isDL && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Licence No.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Driver Name</th>
                </>
              )}
              {!isChallan && !isDL && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">RC Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vehicle</th>
                </>
              )}
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{idx + 1}</td>
                {isChallan && (
                  <>
                    <td className="px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100">{(item as ChallanItem).challanId}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{(item as ChallanItem).vehicleNumber}</td>
                    <td className="px-4 py-3 text-sm font-medium tabular-nums text-slate-900 dark:text-slate-100">{formatINR((item as ChallanItem).amount)}</td>
                  </>
                )}
                {isDL && (
                  <>
                    <td className="px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100">{(item as DLItem).licenceNumber}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{(item as DLItem).driverName}</td>
                  </>
                )}
                {!isChallan && !isDL && (
                  <>
                    <td className="px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100">{(item as RCItem).rcNumber}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{(item as RCItem).vehicleNumber}</td>
                  </>
                )}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${ITEM_STATUS_STYLES[item.status] ?? ''}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Render: Notes Tab (Chat)
  // ───────────────────────────────────────────────────────────────────────────
  const renderNotesTab = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {proposalComments.length === 0 ? (
          <div className="py-12 text-center">
            <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">No messages yet. Start the conversation.</p>
          </div>
        ) : (
          proposalComments.map((comment) => {
            const isTeam = comment.authorType === 'team'
            return (
              <div key={comment.id} className={`flex ${isTeam ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
                  isTeam
                    ? 'bg-cyan-600 text-white rounded-br-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold ${isTeam ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {comment.authorName}
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isTeam
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {isTeam ? 'Team' : 'Customer'}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isTeam ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {comment.message}
                  </p>
                  <p className={`text-[10px] mt-1.5 ${isTeam ? 'text-cyan-200' : 'text-slate-400 dark:text-slate-500'}`}>
                    {timeAgo(comment.createdAt)}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Compose */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
        <div className="flex items-end gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            rows={2}
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  // ───────────────────────────────────────────────────────────────────────────
  // Render: Incidents Tab
  // ───────────────────────────────────────────────────────────────────────────
  const renderIncidentsTab = () => (
    <div className="p-6">
      {proposal.linkedIncidentId ? (
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Linked Incident</p>
                <button
                  onClick={() => onViewIncident?.(proposal.linkedIncidentId!)}
                  className="font-mono text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  {proposal.linkedIncidentId}
                </button>
              </div>
              <button
                onClick={() => onViewIncident?.(proposal.linkedIncidentId!)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-700 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Incident
              </button>
            </div>

            {proposal.serviceStatus && (
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Service Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${SERVICE_STATUS_STYLES[proposal.serviceStatus].className}`}>
                  {SERVICE_STATUS_STYLES[proposal.serviceStatus].label}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <LinkIcon className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No incident linked yet.</p>
        </div>
      )}
    </div>
  )

  // ───────────────────────────────────────────────────────────────────────────
  // Render: Right Sidebar — Timeline
  // ───────────────────────────────────────────────────────────────────────────
  const renderSidebar = () => (
    <div className="w-80 shrink-0 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </div>
          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Timeline
          </h4>
        </div>

        {proposalActivities.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">No activity yet</p>
        ) : (
          <div className="space-y-5">
            {proposalActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-cyan-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {act.notes}
                  </p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-0.5">
                    {formatDate(act.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // ───────────────────────────────────────────────────────────────────────────
  // Main Render
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={onBack}
              className="mt-1 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">
                  {proposal.displayId}
                </h1>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLES[proposal.status].className}`}>
                  {STATUS_STYLES[proposal.status].label}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_BADGE_STYLES[proposal.type]}`}>
                  {proposal.type}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs + Content + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab navigation */}
          <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide">
              {tabs
                .filter((t) => t.show)
                .map((tab) => {
                  const isActive = activeTab === tab.key
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                        isActive
                          ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                          : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                      {tab.key === 'notes' && proposalComments.length > 0 && (
                        <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {proposalComments.length}
                        </span>
                      )}
                      {tab.key === 'items' && items.length > 0 && (
                        <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {items.length}
                        </span>
                      )}
                    </button>
                  )
                })}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
            {activeTab === 'details' && renderDetailsTab()}
            {activeTab === 'items' && renderItemsTab()}
            {activeTab === 'notes' && renderNotesTab()}
            {activeTab === 'incidents' && renderIncidentsTab()}
          </div>
        </div>

        {/* Right Sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          {renderSidebar()}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'sendQuote' && (
        <SendQuoteModal
          proposal={proposal}
          onSubmit={(amount, breakdown, note) => {
            onSendQuote?.(proposal.id, amount, breakdown, note)
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'reviseQuote' && (
        <SendQuoteModal
          proposal={proposal}
          isRevise
          onSubmit={(amount, breakdown, note) => {
            onReviseQuote?.(proposal.id, amount, breakdown, note)
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'reject' && (
        <RejectModal
          proposal={proposal}
          onSubmit={(reason, note) => {
            onReject?.(proposal.id, reason, note)
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'convert' && (
        <ConvertToIncidentModal
          proposal={proposal}
          teamMembers={teamMembers}
          onSubmit={(incidentId, serviceStatus, agentId, notes) => {
            onConvertToIncident?.(proposal.id, incidentId, serviceStatus, agentId, notes)
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}
      {(activeModal === 'assign' || activeModal === 'reassign') && (
        <AssignModal
          proposal={proposal}
          teamMembers={teamMembers}
          isReassign={activeModal === 'reassign'}
          onSubmit={(tmId) => {
            if (activeModal === 'reassign') {
              onReassign?.(proposal.id, tmId)
            } else {
              onAssign?.(proposal.id, tmId)
            }
            setActiveModal(null)
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  )
}

// =============================================================================
// Sub-components
// =============================================================================

function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
      <div className="text-sm text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  )
}

