import { useState } from 'react'
import {
  MoreHorizontal,
  Eye,
  HandMetal,
  UserPlus,
  Send,
  RefreshCw,
  Undo2,
  XCircle,
  RotateCcw,
  ArrowUpCircle,
  ExternalLink,
} from 'lucide-react'
import type { Proposal, ProposalStatus, ServiceStatus } from '@/../product/sections/proposals/types'

interface ProposalRowProps {
  proposal: Proposal
  isSelected: boolean
  activeTab: ProposalStatus
  onSelect?: (selected: boolean) => void
  onView?: () => void
  onPickUp?: () => void
  onAssign?: () => void
  onSendQuote?: () => void
  onReassign?: () => void
  onReject?: () => void
  onReviseQuote?: () => void
  onWithdraw?: () => void
  onUpdateServiceStatus?: () => void
  onViewIncident?: () => void
  onReopen?: () => void
}

function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
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
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

const SERVICE_STATUS_STYLES: Record<ServiceStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  not_applicable: {
    label: 'N/A',
    className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  },
}

export function ProposalRow({
  proposal,
  isSelected,
  activeTab,
  onSelect,
  onView,
  onPickUp,
  onAssign,
  onSendQuote,
  onReassign,
  onReject,
  onReviseQuote,
  onWithdraw,
  onUpdateServiceStatus,
  onViewIncident,
  onReopen,
}: ProposalRowProps) {
  const [showMenu, setShowMenu] = useState(false)

  const getActions = () => {
    switch (activeTab) {
      case 'sent':
        return [
          { label: 'Pick Up', icon: HandMetal, action: onPickUp },
          { label: 'Assign', icon: UserPlus, action: onAssign },
          { label: 'View', icon: Eye, action: onView },
          { label: 'Reject', icon: XCircle, action: onReject, danger: true },
        ]
      case 'under_review':
        return [
          { label: 'Send Quote', icon: Send, action: onSendQuote },
          { label: 'Reassign', icon: RefreshCw, action: onReassign },
          { label: 'View', icon: Eye, action: onView },
          { label: 'Reject', icon: XCircle, action: onReject, danger: true },
        ]
      case 'received':
        return [
          { label: 'View', icon: Eye, action: onView },
          { label: 'Revise Quote', icon: RefreshCw, action: onReviseQuote },
          { label: 'Withdraw', icon: Undo2, action: onWithdraw },
        ]
      case 'converted':
        return [
          { label: 'View', icon: Eye, action: onView },
          { label: 'Update Status', icon: ArrowUpCircle, action: onUpdateServiceStatus },
          { label: 'View Incident', icon: ExternalLink, action: onViewIncident },
        ]
      case 'rejected':
        return [
          { label: 'View', icon: Eye, action: onView },
          { label: 'Reopen', icon: RotateCcw, action: onReopen },
        ]
      default:
        return [{ label: 'View', icon: Eye, action: onView }]
    }
  }

  const showAssignedCol = activeTab === 'under_review' || activeTab === 'received'
  const showServiceStatusCol = activeTab === 'converted'
  const showLinkedIncidentCol = activeTab === 'converted'

  return (
    <tr
      onClick={() => onView?.()}
      className={`border-b border-slate-100 dark:border-slate-800 transition-colors cursor-pointer ${
        isSelected
          ? 'bg-cyan-50/50 dark:bg-cyan-950/20'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
      }`}
    >
      <td className="px-4 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect?.(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
        />
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
          {proposal.displayId}
        </span>
      </td>

      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-[180px]">
            {proposal.customer.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
            {proposal.customer.company}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
            TYPE_BADGE_STYLES[proposal.type]
          }`}
        >
          {proposal.type}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 text-center tabular-nums">
        {proposal.quantity}
      </td>

      <td className="px-4 py-3">
        <span className="text-sm font-medium tabular-nums text-slate-900 dark:text-slate-100">
          {proposal.amount > 0 ? formatINR(proposal.amount) : '—'}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {timeAgo(proposal.createdAt)}
      </td>

      {showAssignedCol && (
        <td className="px-4 py-3 text-sm">
          {proposal.assignedTo ? (
            <span className="text-slate-700 dark:text-slate-300">{proposal.assignedTo.name}</span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 italic">Unassigned</span>
          )}
        </td>
      )}

      {showServiceStatusCol && proposal.serviceStatus && (
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
              SERVICE_STATUS_STYLES[proposal.serviceStatus].className
            }`}
          >
            {SERVICE_STATUS_STYLES[proposal.serviceStatus].label}
          </span>
        </td>
      )}

      {showLinkedIncidentCol && (
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          {proposal.linkedIncidentId ? (
            <button
              onClick={() => onViewIncident?.()}
              className="inline-flex items-center gap-1 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline transition-colors"
            >
              View Incident
              <ExternalLink className="h-3 w-3" />
            </button>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">—</span>
          )}
        </td>
      )}

      <td className="px-4 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 py-1">
                {getActions().map(({ label, icon: Icon, action, danger }) => (
                  <button
                    key={label}
                    onClick={() => {
                      action?.()
                      setShowMenu(false)
                    }}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                      danger
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
