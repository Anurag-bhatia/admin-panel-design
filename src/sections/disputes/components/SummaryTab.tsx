import type { Dispute } from '@/../product/sections/disputes/types'

interface SummaryTabProps {
  dispute: Dispute
}

const TYPE_LABELS: Record<string, string> = {
  refund: 'Refund Dispute',
  service: 'Service Dispute',
  payment: 'Payment Dispute',
  legal_escalation: 'Legal Escalation',
}

const RAISED_BY_LABELS: Record<string, string> = {
  customer: 'Customer',
  subscriber: 'Subscriber',
  internal: 'Internal',
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
  },
  under_review: {
    label: 'Under Review',
    className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  escalated: {
    label: 'Escalated',
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  },
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function SummaryTab({ dispute }: SummaryTabProps) {
  const statusConfig = STATUS_LABELS[dispute.status] || { label: dispute.status, className: '' }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Dispute Overview */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Dispute Overview
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Dispute ID
                </label>
                <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                  {dispute.disputeId}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Status
                </label>
                <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${statusConfig.className}`}>
                  {statusConfig.label}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Dispute Type
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {TYPE_LABELS[dispute.disputeType] || dispute.disputeType}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Raised By
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {RAISED_BY_LABELS[dispute.raisedBy] || dispute.raisedBy}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Source
                </label>
                <p className="text-sm text-slate-900 dark:text-white">{dispute.source}</p>
              </div>

              {dispute.disputedAmount !== null && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Disputed Amount
                  </label>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(dispute.disputedAmount)}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Created On
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {formatDateTime(dispute.createdOn)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Last Updated
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {formatDateTime(dispute.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Reason
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {dispute.reason || dispute.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
