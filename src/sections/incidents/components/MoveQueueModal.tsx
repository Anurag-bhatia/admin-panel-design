import { useState } from 'react'
import { X, ArrowRight, AlertTriangle } from 'lucide-react'
import type { IncidentQueue } from '@/../product/sections/incidents/types'

interface MoveQueueModalProps {
  selectedCount: number
  currentQueue?: IncidentQueue
  onMove?: (targetQueue: IncidentQueue) => void
  onClose?: () => void
}

const QUEUE_OPTIONS: { value: IncidentQueue; label: string; description: string }[] = [
  {
    value: 'newIncidents',
    label: 'New Incidents',
    description: 'Newly created challans awaiting screening',
  },
  {
    value: 'screening',
    label: 'Screening',
    description: 'Challans being screened for validity and details',
  },
  {
    value: 'lawyerAssigned',
    label: 'Lawyer Assigned',
    description: 'Challans assigned to lawyers for resolution',
  },
  {
    value: 'settled',
    label: 'Settled',
    description: 'Successfully resolved challans',
  },
  {
    value: 'notSettled',
    label: 'Not Settled',
    description: 'Challans that could not be resolved',
  },
  {
    value: 'refund',
    label: 'Refund',
    description: 'Challans pending refund processing',
  },
]

export function MoveQueueModal({
  selectedCount,
  currentQueue,
  onMove,
  onClose,
}: MoveQueueModalProps) {
  const [selectedQueue, setSelectedQueue] = useState<IncidentQueue | null>(null)

  const handleMove = () => {
    if (selectedQueue) {
      onMove?.(selectedQueue)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Move Queue</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {selectedCount === 1
                ? '1 challan selected'
                : `${selectedCount} challans selected`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Current Queue Info */}
        {currentQueue && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Current Queue
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                  {QUEUE_OPTIONS.find((q) => q.value === currentQueue)?.label}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Target Queue
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                  {selectedQueue
                    ? QUEUE_OPTIONS.find((q) => q.value === selectedQueue)?.label
                    : 'Select below'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Queue Options */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            {QUEUE_OPTIONS.map((queue) => {
              const isCurrent = currentQueue === queue.value
              const isSelected = selectedQueue === queue.value

              return (
                <button
                  key={queue.value}
                  onClick={() => setSelectedQueue(queue.value)}
                  disabled={isCurrent}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isCurrent
                      ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-medium ${
                            isCurrent
                              ? 'text-slate-500 dark:text-slate-400'
                              : isSelected
                              ? 'text-cyan-900 dark:text-cyan-300'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {queue.label}
                        </div>
                        {isCurrent && (
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          isCurrent
                            ? 'text-slate-400 dark:text-slate-500'
                            : isSelected
                            ? 'text-cyan-700 dark:text-cyan-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {queue.description}
                      </p>
                    </div>
                    {isSelected && !isCurrent && (
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Warning */}
        {selectedQueue && currentQueue !== selectedQueue && (
          <div className="px-6 pb-4">
            <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-amber-900 dark:text-amber-300 font-medium">
                  Confirm queue movement
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                  {selectedCount === 1
                    ? 'This challan will be moved to the selected queue.'
                    : `All ${selectedCount} selected challans will be moved to the selected queue.`}{' '}
                  Make sure this is the correct stage for these challans.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleMove}
            disabled={!selectedQueue || currentQueue === selectedQueue}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Move to Queue
          </button>
        </div>
      </div>
    </div>
  )
}
