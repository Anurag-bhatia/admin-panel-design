import { AlertCircle, ChevronRight } from 'lucide-react'
import type { Dispute, LinkedIncidentSnapshot } from '@/../product/sections/disputes/types'

interface LinkedIncidentTabProps {
  snapshot: LinkedIncidentSnapshot | null
  linkedDisputes?: Dispute[]
  onViewDispute?: (disputeId: string) => void
}

const DISPUTE_TYPE_LABELS: Record<string, string> = {
  refund: 'Refund',
  '48hr_refund': '48 hr Refund',
  tat_breach: 'TAT Breach',
  payment_issue: 'Payment Issue',
  legal_escalation: 'Legal Escalation',
  information_missing: 'Information Missing',
  incorrect_data: 'Incorrect Data',
}

const DISPUTE_STATUS_LABELS: Record<string, { label: string; className: string }> = {
  new_incident: { label: 'New Incident', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  in_progress: { label: 'In Progress', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  transfer_to_department: { label: 'Transfer to Department', className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' },
  reroute: { label: 'Reroute', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  settled: { label: 'Settled', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  hold: { label: 'Hold', className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
}

const DISPUTE_PRIORITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
  high: { label: 'High', className: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
  medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  low: { label: 'Low', className: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
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

export function LinkedIncidentTab({
  snapshot,
  linkedDisputes = [],
  onViewDispute,
}: LinkedIncidentTabProps) {
  if (!snapshot) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-900 dark:text-white font-medium mb-1">
            No linked incident
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This dispute is linked to a subscriber or payment, not a specific incident.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Incident Details */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Incident Details
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Incident ID
                </label>
                <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                  {snapshot.incidentId}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Subscriber
                </label>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {snapshot.subscriberName}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Vehicle Number
                </label>
                <p className="text-sm font-mono text-slate-900 dark:text-white">
                  {snapshot.vehicleNumber.replace(/-/g, '')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Challan Number
                </label>
                <p className="text-sm font-mono text-slate-900 dark:text-white">
                  {snapshot.challanNumber.replace(/-/g, '')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Assigned Lawyer
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {snapshot.assignedLawyer || '—'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Created On
                </label>
                <p className="text-sm text-slate-900 dark:text-white">
                  {formatDateTime(snapshot.createdOn)}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Linked Disputes */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Linked Disputes
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
            {linkedDisputes.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No other disputes are linked to this incident.
              </div>
            ) : (
              linkedDisputes.map((d) => {
                const priority = DISPUTE_PRIORITY_LABELS[d.priority] || { label: d.priority, className: '' }
                return (
                  <button
                    key={d.id}
                    onClick={() => onViewDispute?.(d.id)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                          {d.disputeId.replace(/-/g, '')}
                        </span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${priority.className}`}>
                          {priority.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{DISPUTE_TYPE_LABELS[d.disputeType] || d.disputeType}</span>
                        <span>·</span>
                        <span>Created {formatShortDate(d.createdOn)}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  </button>
                )
              })
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
