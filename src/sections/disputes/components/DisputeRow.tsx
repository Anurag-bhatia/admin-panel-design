import { useState } from 'react'
import {
  MoreHorizontal,
  UserPlus,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react'
import type {
  Dispute,
  DisputePriority,
  Reviewer,
} from '@/../product/sections/disputes/types'

interface DisputeRowProps {
  dispute: Dispute
  isSelected: boolean
  reviewers: Reviewer[]
  onSelect: (selected: boolean) => void
  onView?: () => void
  onAssignReviewer?: (reviewerId: string) => void
  onEscalate?: () => void
  onChangePriority?: (priority: DisputePriority) => void
}

const TYPE_LABELS: Record<string, { label: string; className: string }> = {
  refund: {
    label: 'Refund',
    className: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
  },
  service: {
    label: 'Service',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  payment: {
    label: 'Payment',
    className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  legal_escalation: {
    label: 'Legal',
    className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
}

const PRIORITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: {
    label: 'Critical',
    className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
  high: {
    label: 'High',
    className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  low: {
    label: 'Low',
    className: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  },
}

const RAISED_BY_LABELS: Record<string, string> = {
  customer: 'Customer',
  subscriber: 'Subscriber',
  internal: 'Internal',
}

const PRIORITY_OPTIONS: { key: DisputePriority; label: string }[] = [
  { key: 'critical', label: 'Critical' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Low' },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function DisputeRow({
  dispute,
  isSelected,
  reviewers,
  onSelect,
  onView,
  onAssignReviewer,
  onEscalate,
  onChangePriority,
}: DisputeRowProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReviewerDropdown, setShowReviewerDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

  const typeConfig = TYPE_LABELS[dispute.disputeType] || { label: dispute.disputeType, className: '' }
  const priorityConfig = PRIORITY_LABELS[dispute.priority] || { label: dispute.priority, className: '' }

  // Check if SLA is overdue
  const isOverdue = new Date(dispute.slaDeadline) < new Date()

  return (
    <tr
      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
        isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''
      }`}
      onClick={onView}
    >
      {/* Checkbox */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800"
        />
      </td>

      {/* Dispute ID */}
      <td className="px-4 py-3">
        <div>
          <span className={`font-mono text-sm font-medium ${
            isOverdue
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-900 dark:text-white'
          }`}>
            {dispute.disputeId}
          </span>
          {isOverdue && (
            <div className="flex items-center gap-1 mt-0.5">
              <AlertTriangle className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-500 font-medium">SLA Overdue</span>
            </div>
          )}
        </div>
      </td>

      {/* Linked Entity */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {dispute.subscriberName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {dispute.linkedEntity.id}
          </p>
        </div>
      </td>

      {/* Dispute Type */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${typeConfig.className}`}
        >
          {typeConfig.label}
        </span>
      </td>

      {/* Raised By */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {RAISED_BY_LABELS[dispute.raisedBy] || dispute.raisedBy}
        </span>
      </td>

      {/* Priority */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${priorityConfig.className}`}
        >
          {priorityConfig.label}
        </span>
      </td>

      {/* Created On */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {formatDate(dispute.createdOn)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatTime(dispute.createdOn)}
          </p>
        </div>
      </td>

      {/* Last Updated */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {formatDate(dispute.lastUpdated)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatTime(dispute.lastUpdated)}
          </p>
        </div>
      </td>

      {/* Assigned To */}
      <td className="px-4 py-3">
        {dispute.assignedTo ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
              {dispute.assignedTo.charAt(0)}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {dispute.assignedTo.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
      </td>

      {/* Source */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[120px] block">
          {dispute.source}
        </span>
      </td>

      {/* Actions Menu */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4 text-slate-500" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setShowMenu(false)
                  setShowReviewerDropdown(false)
                  setShowPriorityDropdown(false)
                }}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                {/* Assign Reviewer */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowReviewerDropdown(!showReviewerDropdown)
                      setShowPriorityDropdown(false)
                    }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Assign Reviewer
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showReviewerDropdown && (
                    <div className="absolute right-full top-0 mr-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto">
                      {reviewers.map((reviewer) => (
                        <button
                          key={reviewer.id}
                          onClick={() => {
                            onAssignReviewer?.(reviewer.id)
                            setShowMenu(false)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                            {reviewer.name.charAt(0)}
                          </div>
                          {reviewer.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 my-1" />

                {/* Change Priority */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowPriorityDropdown(!showPriorityDropdown)
                      setShowReviewerDropdown(false)
                    }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Change Priority
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showPriorityDropdown && (
                    <div className="absolute right-full top-0 mr-1 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                      {PRIORITY_OPTIONS.filter((p) => p.key !== dispute.priority).map(
                        (priority) => (
                          <button
                            key={priority.key}
                            onClick={() => {
                              onChangePriority?.(priority.key)
                              setShowMenu(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            {priority.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
