import { useState } from 'react'
import {
  MoreHorizontal,
  CheckCircle2,
  Search,
  UserPlus,
  Scale,
  ArrowRight,
  Edit,
  X,
  Receipt,
} from 'lucide-react'
import type {
  Incident,
  User,
  Lawyer,
  IncidentQueue,
} from '../types'

export interface SettlementFees {
  lawyerFees: number
  govtFees: number
  miscFees: number
}

interface IncidentRowProps {
  incident: Incident
  isSelected: boolean
  users: User[]
  lawyers: Lawyer[]
  onSelect: (selected: boolean) => void
  onView?: () => void
  onValidate?: () => void
  onScreen?: () => void
  onAssignAgent?: (agentId: string) => void
  onAssignLawyer?: (lawyerId: string) => void
  onMoveQueue?: (queue: IncidentQueue, fees?: SettlementFees) => void
  onAddExpense?: (fees: SettlementFees) => void
  onUpdate?: () => void
}

const TYPE_LABELS: Record<string, string> = {
  payAndClose: 'PPT',
  contest: 'Bulk',
}

const CATEGORY_LABELS: Record<string, string> = {
  challan: 'Challan',
  court: 'Court',
  online: 'Online',
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

export function IncidentRow({
  incident,
  isSelected,
  users,
  lawyers,
  onSelect,
  onView,
  onValidate,
  onScreen,
  onAssignAgent,
  onAssignLawyer,
  onMoveQueue,
  onAddExpense,
  onUpdate,
}: IncidentRowProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [showLawyerDropdown, setShowLawyerDropdown] = useState(false)
  const [showQueueDropdown, setShowQueueDropdown] = useState(false)
  const [showSettlementModal, setShowSettlementModal] = useState(false)
  const [settlementFees, setSettlementFees] = useState<SettlementFees>({
    lawyerFees: 0,
    govtFees: 0,
    miscFees: 0,
  })

  const [pendingQueue, setPendingQueue] = useState<IncidentQueue | null>(null)
  const [isAddingExpense, setIsAddingExpense] = useState(false)

  const handleMoveToQueue = (queue: IncidentQueue) => {
    if (queue === 'settled' || queue === 'notSettled') {
      setPendingQueue(queue)
      setIsAddingExpense(false)
      setShowSettlementModal(true)
      setShowMenu(false)
      setShowQueueDropdown(false)
    } else {
      onMoveQueue?.(queue)
      setShowMenu(false)
    }
  }

  const handleAddExpense = () => {
    setIsAddingExpense(true)
    setPendingQueue(null)
    setShowSettlementModal(true)
    setShowMenu(false)
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

  const assignedAgent = users.find((u) => u.id === incident.assignedAgentId)
  const assignedLawyer = lawyers.find(
    (l) => l.id === incident.assignedLawyerId
  )

  return (
    <>
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

      {/* Incident ID */}
      <td className="px-4 py-3">
        <div>
          <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
            {incident.incidentId}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {incident.source}
          </p>
        </div>
      </td>

      {/* Subscriber */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {incident.subscriberName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {incident.subscriberId}
          </p>
        </div>
      </td>

      {/* Vehicle */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
          {incident.vehicle}
        </span>
      </td>

      {/* Type */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            incident.type === 'contest'
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
              : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {TYPE_LABELS[incident.type]}
        </span>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        {incident.category === 'court' || incident.category === 'online' ? (
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              incident.category === 'court'
                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
            }`}
          >
            {CATEGORY_LABELS[incident.category]}
          </span>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
      </td>

      {/* Created */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {formatDate(incident.createdAt)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatTime(incident.createdAt)}
          </p>
        </div>
      </td>

      {/* Last Updated */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {formatDate(incident.lastUpdatedAt)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatTime(incident.lastUpdatedAt)}
          </p>
        </div>
      </td>

      {/* Assigned Agent */}
      <td className="px-4 py-3">
        {incident.queue === 'newIncidents' || incident.queue === 'screening' ? (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        ) : assignedAgent ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
              {assignedAgent.name.charAt(0)}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {assignedAgent.name.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
      </td>

      {/* Assigned Lawyer */}
      <td className="px-4 py-3">
        {assignedLawyer ? (
          <span className="text-sm text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
            {assignedLawyer.name.replace('Adv. ', '')}
          </span>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
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
                  setShowAgentDropdown(false)
                  setShowLawyerDropdown(false)
                  setShowQueueDropdown(false)
                }}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                {/* Special menu for Not Settled - only Send to Refund */}
                {incident.queue === 'notSettled' ? (
                  <button
                    onClick={() => {
                      handleMoveToQueue('refund')
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Send to Refund
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (incident.queue === 'newIncidents') {
                          onValidate?.()
                          setShowMenu(false)
                        }
                      }}
                      disabled={incident.queue !== 'newIncidents'}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${
                        incident.queue !== 'newIncidents'
                          ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Validate
                    </button>
                    <button
                      onClick={() => {
                        if (incident.queue === 'newIncidents') {
                          onScreen?.()
                          setShowMenu(false)
                        }
                      }}
                      disabled={incident.queue !== 'newIncidents'}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${
                        incident.queue !== 'newIncidents'
                          ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Search className="h-4 w-4" />
                      Screen
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-700 my-1" />

                    {/* Assign Agent */}
                    <div className="relative">
                      <button
                        onClick={() => incident.queue !== 'newIncidents' && setShowAgentDropdown(!showAgentDropdown)}
                        disabled={incident.queue === 'newIncidents'}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${
                          incident.queue === 'newIncidents'
                            ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          Assign Agent
                        </span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      {showAgentDropdown && incident.queue !== 'newIncidents' && (
                        <div className="absolute left-full top-0 ml-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto">
                          {users.map((user) => (
                            <button
                              key={user.id}
                              onClick={() => {
                                onAssignAgent?.(user.id)
                                setShowMenu(false)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                              <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Assign Lawyer */}
                    <div className="relative">
                      <button
                        onClick={() => incident.queue !== 'newIncidents' && setShowLawyerDropdown(!showLawyerDropdown)}
                        disabled={incident.queue === 'newIncidents'}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${
                          incident.queue === 'newIncidents'
                            ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Scale className="h-4 w-4" />
                          Assign Lawyer
                        </span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      {showLawyerDropdown && incident.queue !== 'newIncidents' && (
                        <div className="absolute left-full top-0 ml-1 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto">
                          {lawyers.map((lawyer) => (
                            <button
                              key={lawyer.id}
                              onClick={() => {
                                onAssignLawyer?.(lawyer.id)
                                setShowMenu(false)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                              <Scale className="h-4 w-4 text-slate-400" />
                              <span className="truncate">{lawyer.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Move Queue */}
                    <div className="relative">
                      <button
                        onClick={() => incident.queue !== 'newIncidents' && setShowQueueDropdown(!showQueueDropdown)}
                        disabled={incident.queue === 'newIncidents'}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${
                          incident.queue === 'newIncidents'
                            ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4" />
                          Move Queue
                        </span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      {showQueueDropdown && incident.queue !== 'newIncidents' && (
                        <div className="absolute left-full top-0 ml-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                          {QUEUE_OPTIONS.filter((q) => q.key !== incident.queue).map(
                            (queue) => (
                              <button
                                key={queue.key}
                                onClick={() => handleMoveToQueue(queue.key)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                              >
                                {queue.label}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 my-1" />

                    <button
                      onClick={handleAddExpense}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Receipt className="h-4 w-4" />
                      Add Expense
                    </button>

                    <button
                      onClick={() => {
                        onUpdate?.()
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Edit className="h-4 w-4" />
                      Update
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>

    {/* Settlement Modal */}
    {showSettlementModal && (
      <tr>
        <td colSpan={10} className="p-0">
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
                  ? 'Enter the expense details for this challan.'
                  : `Enter the fee details before marking as ${pendingQueue === 'settled' ? 'settled' : 'not settled'}.`}
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
        </td>
      </tr>
    )}
    </>
  )
}
