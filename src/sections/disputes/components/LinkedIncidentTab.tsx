import { AlertCircle } from 'lucide-react'
import type { LinkedIncidentSnapshot } from '@/../product/sections/disputes/types'

interface LinkedIncidentTabProps {
  snapshot: LinkedIncidentSnapshot | null
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

export function LinkedIncidentTab({ snapshot }: LinkedIncidentTabProps) {
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
                  {snapshot.vehicleNumber}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Challan Number
                </label>
                <p className="text-sm font-mono text-slate-900 dark:text-white">
                  {snapshot.challanNumber}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Type
                </label>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  snapshot.type === 'Contest'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                }`}>
                  {snapshot.type}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Outcome
                </label>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  snapshot.outcome === 'Settled'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : snapshot.outcome === 'Not Settled'
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : snapshot.outcome === 'Refund'
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                }`}>
                  {snapshot.outcome}
                </span>
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

              {snapshot.resolvedOn && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Resolved On
                  </label>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {formatDateTime(snapshot.resolvedOn)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Financial Outcome */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Financial Outcome
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Challan Amount
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(snapshot.financialOutcome.challanAmount)}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Amount Paid
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(snapshot.financialOutcome.amountPaid)}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Refund Due
                </p>
                <p className={`text-lg font-semibold ${
                  snapshot.financialOutcome.refundDue > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {formatCurrency(snapshot.financialOutcome.refundDue)}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Refund Status
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {snapshot.financialOutcome.refundStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Summary */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Timeline Summary
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="space-y-3">
              {snapshot.timelineSummary.map((entry, index) => (
                <div key={index} className="relative pl-8">
                  {index < snapshot.timelineSummary.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                  )}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 pb-3">
                    {entry}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
