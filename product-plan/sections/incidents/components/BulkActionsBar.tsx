import { useState, useRef } from 'react'
import {
  X,
  CheckCircle2,
  Search,
  UserPlus,
  Scale,
  ArrowRight,
  Upload,
  ChevronDown,
  Receipt,
} from 'lucide-react'
import type { User, Lawyer, IncidentQueue } from '../types'
import type { SettlementFees } from './IncidentRow'

interface BulkActionsBarProps {
  selectedCount: number
  users: User[]
  lawyers: Lawyer[]
  activeQueue: IncidentQueue
  onClearSelection: () => void
  onValidate?: () => void
  onScreen?: () => void
  onAssignAgent?: (agentId: string) => void
  onAssignLawyer?: (lawyerId: string) => void
  onMoveQueue?: (queue: IncidentQueue, fees?: SettlementFees) => void
  onAddExpense?: (fees: SettlementFees) => void
  onBulkUpdate?: (file: File) => void
}

const QUEUE_OPTIONS: { key: IncidentQueue; label: string }[] = [
  { key: 'newIncidents', label: 'New Incidents' },
  { key: 'screening', label: 'Screening' },
  { key: 'agentAssigned', label: 'Agent Assigned' },
  { key: 'lawyerAssigned', label: 'Lawyer Assigned' },
  { key: 'settled', label: 'Settled' },
  { key: 'notSettled', label: 'Not Settled' },
  { key: 'hold', label: 'Hold' },
  { key: 'refund', label: 'Refund' },
]

export function BulkActionsBar({
  selectedCount,
  users,
  lawyers,
  activeQueue,
  onClearSelection,
  onValidate,
  onScreen,
  onAssignAgent,
  onAssignLawyer,
  onMoveQueue,
  onAddExpense,
  onBulkUpdate,
}: BulkActionsBarProps) {
  const isNewIncidents = activeQueue === 'newIncidents'
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [showLawyerDropdown, setShowLawyerDropdown] = useState(false)
  const [showQueueDropdown, setShowQueueDropdown] = useState(false)
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false)
  const [showSettlementModal, setShowSettlementModal] = useState(false)
  const [pendingQueue, setPendingQueue] = useState<IncidentQueue | null>(null)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [settlementFees, setSettlementFees] = useState<SettlementFees>({
    lawyerFees: 0,
    govtFees: 0,
    miscFees: 0,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMoveToQueue = (queue: IncidentQueue) => {
    if (queue === 'settled' || queue === 'notSettled') {
      setPendingQueue(queue)
      setIsAddingExpense(false)
      setShowSettlementModal(true)
      setShowQueueDropdown(false)
    } else {
      onMoveQueue?.(queue)
      setShowQueueDropdown(false)
    }
  }

  const handleAddExpense = () => {
    setIsAddingExpense(true)
    setPendingQueue(null)
    setShowSettlementModal(true)
  }

  const handleSettlementConfirm = () => {
    if (isAddingExpense) {
      onAddExpense?.(settlementFees)
    } else if (pendingQueue) {
      onMoveQueue?.(pendingQueue, settlementFees)
    }
    setShowSettlementModal(false)
    setPendingQueue(null)
    setIsAddingExpense(false)
    setSettlementFees({ lawyerFees: 0, govtFees: 0, miscFees: 0 })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onBulkUpdate?.(file)
      setShowBulkUpdateModal(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
          {/* Selected Count */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
            <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold">
              {selectedCount}
            </span>
            <span className="text-sm text-slate-300">selected</span>
            <button
              onClick={onClearSelection}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Special actions for Not Settled - only Send to Refund */}
            {activeQueue === 'notSettled' ? (
              <button
                onClick={() => onMoveQueue?.('refund')}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                <span>Send to Refund</span>
              </button>
            ) : (
              <>
                {/* Validate - only enabled in Screening queue */}
                <button
                  onClick={() => {
                    if (activeQueue === 'screening') {
                      onValidate?.()
                    }
                  }}
                  disabled={activeQueue !== 'screening'}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    activeQueue !== 'screening'
                      ? 'text-slate-500 cursor-not-allowed'
                      : 'text-white hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Validate</span>
                </button>

                {/* Screen - only enabled in New Incidents queue */}
                <button
                  onClick={() => {
                    if (activeQueue === 'newIncidents') {
                      onScreen?.()
                    }
                  }}
                  disabled={activeQueue !== 'newIncidents'}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    activeQueue !== 'newIncidents'
                      ? 'text-slate-500 cursor-not-allowed'
                      : 'text-white hover:bg-slate-700'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Screen</span>
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-slate-700 mx-1" />

                {/* Assign Agent */}
                <div className="relative">
                  <button
                    onClick={() => {
                      if (!isNewIncidents) {
                        setShowAgentDropdown(!showAgentDropdown)
                        setShowLawyerDropdown(false)
                        setShowQueueDropdown(false)
                      }
                    }}
                    disabled={isNewIncidents}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      isNewIncidents
                        ? 'text-slate-500 cursor-not-allowed'
                        : 'text-white hover:bg-slate-700'
                    }`}
                    title={isNewIncidents ? 'Available after screening' : undefined}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Assign Agent</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showAgentDropdown && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setShowAgentDropdown(false)}
                      />
                      <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                        {users.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => {
                              onAssignAgent?.(user.id)
                              setShowAgentDropdown(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium">
                              {user.name.charAt(0)}
                            </div>
                            {user.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Assign Lawyer */}
                <div className="relative">
                  <button
                    onClick={() => {
                      if (!isNewIncidents) {
                        setShowLawyerDropdown(!showLawyerDropdown)
                        setShowAgentDropdown(false)
                        setShowQueueDropdown(false)
                      }
                    }}
                    disabled={isNewIncidents}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      isNewIncidents
                        ? 'text-slate-500 cursor-not-allowed'
                        : 'text-white hover:bg-slate-700'
                    }`}
                    title={isNewIncidents ? 'Available after screening' : undefined}
                  >
                    <Scale className="h-4 w-4" />
                    <span>Assign Lawyer</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showLawyerDropdown && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setShowLawyerDropdown(false)}
                      />
                      <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                        {lawyers.map((lawyer) => (
                          <button
                            key={lawyer.id}
                            onClick={() => {
                              onAssignLawyer?.(lawyer.id)
                              setShowLawyerDropdown(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            <Scale className="h-4 w-4 text-slate-400" />
                            <span className="truncate">{lawyer.name}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Move Queue */}
                <div className="relative">
                  <button
                    onClick={() => {
                      if (!isNewIncidents) {
                        setShowQueueDropdown(!showQueueDropdown)
                        setShowAgentDropdown(false)
                        setShowLawyerDropdown(false)
                      }
                    }}
                    disabled={isNewIncidents}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      isNewIncidents
                        ? 'text-slate-500 cursor-not-allowed'
                        : 'text-white hover:bg-slate-700'
                    }`}
                    title={isNewIncidents ? 'Available after screening' : undefined}
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>Move Queue</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showQueueDropdown && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setShowQueueDropdown(false)}
                      />
                      <div className="absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                        {QUEUE_OPTIONS.map((queue) => (
                          <button
                            key={queue.key}
                            onClick={() => handleMoveToQueue(queue.key)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            {queue.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-slate-700 mx-1" />

                {/* Add Expense */}
                <button
                  onClick={handleAddExpense}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Receipt className="h-4 w-4" />
                  <span>Add Expense</span>
                </button>

                {/* Bulk Update */}
                <button
                  onClick={() => setShowBulkUpdateModal(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-cyan-400 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Bulk Update</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowBulkUpdateModal(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <button
              onClick={() => setShowBulkUpdateModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Bulk Update Challans
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Upload an Excel or CSV file to update {selectedCount} selected
              challans.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-colors"
            >
              <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Excel (.xlsx, .xls) or CSV files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowBulkUpdateModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settlement Modal */}
      {showSettlementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSettlementModal(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <button
              onClick={() => setShowSettlementModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Settlement Details' : 'Not Settled Details'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {isAddingExpense
                ? `Enter the expense details for ${selectedCount} selected challan${selectedCount > 1 ? 's' : ''}.`
                : `Enter the fee details for ${selectedCount} selected challan${selectedCount > 1 ? 's' : ''} before marking as ${pendingQueue === 'settled' ? 'settled' : 'not settled'}.`}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Lawyer Fees
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    type="number"
                    value={settlementFees.lawyerFees || ''}
                    onChange={(e) =>
                      setSettlementFees({
                        ...settlementFees,
                        lawyerFees: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Govt Fees
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    type="number"
                    value={settlementFees.govtFees || ''}
                    onChange={(e) =>
                      setSettlementFees({
                        ...settlementFees,
                        govtFees: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Miscellaneous Fees
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    type="number"
                    value={settlementFees.miscFees || ''}
                    onChange={(e) =>
                      setSettlementFees({
                        ...settlementFees,
                        miscFees: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Total</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{(settlementFees.lawyerFees + settlementFees.govtFees + settlementFees.miscFees).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSettlementModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSettlementConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                {isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Confirm Settlement' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
