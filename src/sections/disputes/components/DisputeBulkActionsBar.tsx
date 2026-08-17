import { useState } from 'react'
import {
  X,
  AlertTriangle,
  ArrowRightLeft,
  ChevronDown,
} from 'lucide-react'
import type {
  DisputePriority,
  DisputeStatus,
} from '@/../product/sections/disputes/types'
import { AssignDepartmentModal } from './AssignDepartmentModal'

interface DisputeBulkActionsBarProps {
  selectedCount: number
  currentStage?: DisputeStatus
  onClearSelection: () => void
  onChangePriority?: (priority: DisputePriority) => void
  onMoveStage?: (stage: DisputeStatus, department?: string) => void
}

const PRIORITY_OPTIONS: { key: DisputePriority; label: string }[] = [
  { key: 'critical', label: 'Critical' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Low' },
]

const MOVE_STAGE_OPTIONS: { key: DisputeStatus; label: string }[] = [
  { key: 'new_incident', label: 'New Incident' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'transfer_to_department', label: 'Transfer to Department' },
  { key: 'reroute', label: 'Reroute' },
  { key: 'settled', label: 'Settled' },
  { key: 'hold', label: 'Hold' },
]

export function DisputeBulkActionsBar({
  selectedCount,
  currentStage,
  onClearSelection,
  onChangePriority,
  onMoveStage,
}: DisputeBulkActionsBarProps) {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showMoveDropdown, setShowMoveDropdown] = useState(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)

  return (
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
          {/* Change Priority */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPriorityDropdown(!showPriorityDropdown)
                setShowMoveDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Change Priority</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showPriorityDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowPriorityDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <button
                      key={priority.key}
                      onClick={() => {
                        onChangePriority?.(priority.key)
                        setShowPriorityDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Move Ticket */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMoveDropdown(!showMoveDropdown)
                setShowPriorityDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>Move Ticket</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showMoveDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowMoveDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                  {MOVE_STAGE_OPTIONS.filter((s) => s.key !== currentStage).map((stage) => (
                    <button
                      key={stage.key}
                      onClick={() => {
                        setShowMoveDropdown(false)
                        if (stage.key === 'transfer_to_department') {
                          setShowDepartmentModal(true)
                        } else {
                          onMoveStage?.(stage.key)
                        }
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

      {showDepartmentModal && (
        <AssignDepartmentModal
          onAssign={(department) => {
            onMoveStage?.('transfer_to_department', department)
            setShowDepartmentModal(false)
          }}
          onClose={() => setShowDepartmentModal(false)}
        />
      )}
    </div>
  )
}
