import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRightLeft,
  ChevronDown,
} from 'lucide-react'
import type { Refund } from '../types'
import { RefundActivityTab } from './RefundActivityTab'
import { RefundNotesTab } from './RefundNotesTab'

type TabType = 'activity' | 'notes'

export interface RefundDetailViewProps {
  refund: Refund
  onBack?: () => void
  onAddNote?: (refundId: string, content: string) => void
  onAddFollowUp?: (refundId: string, followUp: { outcome: string; activity: string }) => void
  onMoveTicket?: (refundId: string, stage: string) => void
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  'Refund Raised': {
    label: 'Refund Raised',
    className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  Completed: {
    label: 'Completed',
    className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  },
  Hold: {
    label: 'Hold',
    className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  },
  Rejected: {
    label: 'Rejected',
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  },
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function RefundDetailView({
  refund,
  onBack,
  onAddNote,
  onAddFollowUp,
  onMoveTicket,
}: RefundDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('activity')
  const [showMoveDropdown, setShowMoveDropdown] = useState(false)

  const statusConfig = STATUS_LABELS[refund.refundStatus] || {
    label: refund.refundStatus,
    className: '',
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: 'activity', label: `Activity (${refund.activityLog.length})` },
    { key: 'notes', label: `Notes (${refund.notes.length})` },
  ]

  const moveStages = [
    { key: 'Refund Raised', label: 'Refund Raised' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Hold', label: 'Hold' },
    { key: 'Rejected', label: 'Rejected' },
  ].filter((s) => s.key !== refund.refundStatus)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white font-mono">
                {refund.id}
              </h1>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusConfig.className}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Move Ticket Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoveDropdown(!showMoveDropdown)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Move Ticket
              <ChevronDown className="h-4 w-4" />
            </button>

            {showMoveDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMoveDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                  {moveStages.map((stage) => (
                    <button
                      key={stage.key}
                      onClick={() => {
                        onMoveTicket?.(refund.id, stage.key)
                        setShowMoveDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Refund Amount Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                Refund Amount
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(refund.refundAmount)}
              </div>
            </div>

            {/* Linked Incident Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Linked Incident
              </div>
              <div className="text-base font-semibold font-mono text-cyan-600 dark:text-cyan-400">
                {refund.linkedIncident}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Payment: {refund.originalPaymentId}
                </span>
              </div>
            </div>

            {/* Customer / Subscriber Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Customer / Subscriber
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-medium text-white">
                  {refund.customerSubscriber.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {refund.customerSubscriber}
                </span>
              </div>
            </div>

            {/* Initiated By Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Initiated By
              </div>
              {refund.initiatedBy ? (
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
                    {refund.initiatedBy.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {refund.initiatedBy}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
              )}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Created</span>
                  <span className="text-slate-700 dark:text-slate-300">{formatDate(refund.createdOn)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Last Updated</span>
                  <span className="text-slate-700 dark:text-slate-300">{formatDate(refund.lastUpdated)}</span>
                </div>
                {refund.refundDate && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Refund Date</span>
                    <span className="text-slate-700 dark:text-slate-300">{formatDate(refund.refundDate)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Main Content - Tabs */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              {/* Tabs Header */}
              <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === tab.key
                          ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'activity' && (
                  <RefundActivityTab
                    followUps={refund.followUps}
                    activities={refund.activityLog}
                    onAddFollowUp={(followUp) => onAddFollowUp?.(refund.id, followUp)}
                  />
                )}
                {activeTab === 'notes' && (
                  <RefundNotesTab
                    notes={refund.notes}
                    onAddNote={(content) => onAddNote?.(refund.id, content)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
