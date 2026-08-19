import { useState } from 'react'
import {
  ArrowLeft,
  Clock,
  UserPlus,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  ChevronDown,
} from 'lucide-react'
import type {
  Dispute,
  Reviewer,
} from '@/../product/sections/disputes/types'
import { SummaryTab } from './SummaryTab'
import { LinkedIncidentTab } from './LinkedIncidentTab'
import { InvestigationTab } from './InvestigationTab'
import { EvidenceTab } from './EvidenceTab'
import { DisputeActivityTab, type DisputeFollowUp } from './DisputeActivityTab'
import { AssignReviewerModal } from './AssignReviewerModal'
import { AssignDepartmentModal } from './AssignDepartmentModal'
import { SettleDisputeModal } from './SettleDisputeModal'

type TabType = 'summary' | 'linkedIncident' | 'investigation' | 'evidence' | 'activity'

export interface DisputeDetailViewProps {
  dispute: Dispute
  reviewers: Reviewer[]
  followUps: DisputeFollowUp[]
  allDisputes?: Dispute[]
  onBack?: () => void
  onAssignReviewer?: (disputeId: string, reviewerId: string) => void
  onEscalate?: (disputeId: string) => void
  onApproveRefund?: (disputeId: string) => void
  onRejectDispute?: (disputeId: string) => void
  onCloseDispute?: (disputeId: string) => void
  onAddInvestigationNote?: (disputeId: string, content: string) => void
  onUploadEvidence?: (disputeId: string, file: File, type: string) => void
  onViewDocument?: (documentId: string) => void
  onDeleteDocument?: (documentId: string) => void
  onAddFollowUp?: (disputeId: string, followUp: { outcome: string; activity: string }) => void
  onViewDispute?: (disputeId: string) => void
}

const PRIORITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: {
    label: 'Critical',
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  low: {
    label: 'Low',
    className: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  },
}

export function DisputeDetailView({
  dispute,
  reviewers,
  followUps,
  allDisputes = [],
  onBack,
  onAssignReviewer,
  onEscalate,
  onApproveRefund,
  onRejectDispute,
  onCloseDispute,
  onAddInvestigationNote,
  onUploadEvidence,
  onViewDocument,
  onDeleteDocument,
  onAddFollowUp,
  onViewDispute,
}: DisputeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('activity')
  const [showReviewerModal, setShowReviewerModal] = useState(false)
  const [showMoveDropdown, setShowMoveDropdown] = useState(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showSettleModal, setShowSettleModal] = useState(false)

  const getSlaInfo = () => {
    const now = new Date()
    const deadline = new Date(dispute.slaDeadline)
    const diffTime = deadline.getTime() - now.getTime()
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const totalDays = dispute.slaDays
    const daysUsed = totalDays - daysLeft
    const percentage = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100))

    if (daysLeft <= 0) return { daysLeft, percentage: 100, status: 'critical' as const }
    if (daysLeft <= 3) return { daysLeft, percentage, status: 'warning' as const }
    return { daysLeft, percentage, status: 'ok' as const }
  }

  const slaInfo = getSlaInfo()
  const priorityConfig = PRIORITY_LABELS[dispute.priority] || { label: dispute.priority, className: '' }

  // Determine which actions are available based on stage
  const canEscalate = dispute.status === 'new_incident' || dispute.status === 'in_progress' || dispute.status === 'assigned'
  const canApproveRefund = dispute.status === 'in_progress' || dispute.status === 'assigned' || dispute.status === 'reroute'
  const canReject = dispute.status === 'new_incident' || dispute.status === 'in_progress' || dispute.status === 'assigned' || dispute.status === 'reroute'
  const canClose = dispute.status === 'in_progress' || dispute.status === 'assigned' || dispute.status === 'reroute'
  const isTerminal = dispute.status === 'settled' || dispute.status === 'not_settled'

  const tabs: { key: TabType; label: string }[] = [
    { key: 'activity', label: `Activity (${dispute.activityLog.length})` },
    { key: 'summary', label: 'Summary' },
    { key: 'linkedIncident', label: 'Linked Entity' },
    { key: 'investigation', label: 'Notes' },
    { key: 'evidence', label: `Documents (${dispute.evidence.length})` },
  ]

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
                {dispute.disputeId.replace(/-/g, '')}
              </h1>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.className}`}>
                {priorityConfig.label}
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
                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                  {[
                    { key: 'new_incident', label: 'New Incident' },
                    { key: 'in_progress', label: 'In Progress' },
                    { key: 'transfer_to_department', label: 'Transfer to Department' },
                    { key: 'reroute', label: 'Reroute' },
                    { key: 'settled', label: 'Settled' },
                    { key: 'hold', label: 'Hold' },
                  ]
                    .filter((s) => s.key !== dispute.status)
                    .map((stage) => (
                      <button
                        key={stage.key}
                        onClick={() => {
                          setShowMoveDropdown(false)
                          if (stage.key === 'transfer_to_department') {
                            setShowDepartmentModal(true)
                          } else if (stage.key === 'settled') {
                            setShowSettleModal(true)
                          } else {
                            onCloseDispute?.(dispute.id)
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap"
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
            {/* SLA Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  TAT Deadline
                </span>
                <Clock className={`h-4 w-4 ${
                  slaInfo.status === 'critical'
                    ? 'text-red-500'
                    : slaInfo.status === 'warning'
                    ? 'text-amber-500'
                    : 'text-emerald-500'
                }`} />
              </div>
              <div
                className={`text-2xl font-bold ${
                  slaInfo.status === 'critical'
                    ? 'text-red-600 dark:text-red-400'
                    : slaInfo.status === 'warning'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {slaInfo.daysLeft <= 0 ? 'Overdue' : `${Math.abs(slaInfo.daysLeft)} days`}
              </div>
              <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    slaInfo.status === 'critical'
                      ? 'bg-red-500'
                      : slaInfo.status === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${slaInfo.percentage}%` }}
                />
              </div>
            </div>

            {/* Linked Entity Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Linked Entity
              </div>
              <div className="text-base font-semibold text-slate-900 dark:text-white">
                {dispute.subscriberName}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {dispute.subscriberId}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {dispute.linkedEntity.type.charAt(0).toUpperCase() + dispute.linkedEntity.type.slice(1)}: {dispute.linkedEntity.id}
                </span>
              </div>
            </div>

            {/* Assigned Reviewer Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                Assigned Reviewer
              </div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-medium text-white">
                      {dispute.assignedTo ? dispute.assignedTo.charAt(0) : '?'}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {dispute.assignedTo || 'No reviewer assigned'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowReviewerModal(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 rounded-md transition-colors"
                  >
                    {dispute.assignedTo ? 'Change' : 'Assign'}
                  </button>
                </div>
              </div>

              {/* Past Assignments */}
              {(() => {
                const assignmentLogs = dispute.activityLog.filter(
                  (log) => log.action === 'Reviewer Assigned'
                )
                if (assignmentLogs.length === 0) return null
                return (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                      Past Assignments
                    </div>
                    <div className="space-y-2">
                      {assignmentLogs.map((log) => {
                        const nameMatch = log.details.match(/(?:Assigned to |Auto-assigned to )(.+?)(?:\s+based on|$)/)
                        const assignedName = nameMatch ? nameMatch[1] : log.details
                        return (
                          <div key={log.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                {assignedName.charAt(0)}
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {assignedName}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {new Date(log.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
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
                {activeTab === 'summary' && (
                  <SummaryTab dispute={dispute} />
                )}
                {activeTab === 'linkedIncident' && (
                  <LinkedIncidentTab
                    snapshot={dispute.linkedIncidentSnapshot}
                    linkedDisputes={allDisputes.filter(
                      (d) =>
                        d.id !== dispute.id &&
                        d.linkedEntity.type === dispute.linkedEntity.type &&
                        d.linkedEntity.id === dispute.linkedEntity.id
                    )}
                    onViewDispute={onViewDispute}
                  />
                )}
                {activeTab === 'investigation' && (
                  <InvestigationTab
                    notes={dispute.investigationNotes}
                    onAddNote={(content) => onAddInvestigationNote?.(dispute.id, content)}
                  />
                )}
                {activeTab === 'evidence' && (
                  <EvidenceTab
                    evidence={dispute.evidence}
                    onUploadEvidence={(file, type) => onUploadEvidence?.(dispute.id, file, type)}
                    onViewDocument={onViewDocument}
                    onDeleteDocument={onDeleteDocument}
                  />
                )}
                {activeTab === 'activity' && (
                  <DisputeActivityTab activities={dispute.activityLog} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReviewerModal && (
        <AssignReviewerModal
          selectedCount={1}
          reviewers={reviewers}
          currentReviewerId={reviewers.find((r) => r.name === dispute.assignedTo)?.id || null}
          onAssign={(reviewerId) => {
            onAssignReviewer?.(dispute.id, reviewerId)
            setShowReviewerModal(false)
          }}
          onClose={() => setShowReviewerModal(false)}
        />
      )}

      {showDepartmentModal && (
        <AssignDepartmentModal
          currentDepartment={dispute.transferredToDepartment}
          onAssign={() => {
            setShowDepartmentModal(false)
          }}
          onClose={() => setShowDepartmentModal(false)}
        />
      )}

      {showSettleModal && (
        <SettleDisputeModal
          onSettle={(resolution) => {
            console.log('Settle dispute:', dispute.id, 'resolution:', resolution)
            onCloseDispute?.(dispute.id)
            setShowSettleModal(false)
          }}
          onClose={() => setShowSettleModal(false)}
        />
      )}
    </div>
  )
}
