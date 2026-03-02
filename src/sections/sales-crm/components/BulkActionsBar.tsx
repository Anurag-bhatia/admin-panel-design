import { useState } from 'react'
import {
  X,
  ArrowRight,
  UserPlus,
  Upload,
  ChevronDown,
} from 'lucide-react'
import type { Lead, User } from '@/../product/sections/sales-crm/types'

interface BulkActionsBarProps {
  selectedCount: number
  users: User[]
  onClearSelection: () => void
  onMoveStatus?: (status: Lead['status']) => void
  onAssignOwner?: (userId: string) => void
  onBulkUpdate?: () => void
}

const STATUS_OPTIONS: { key: Lead['status']; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'follow-up', label: 'Follow-up' },
  { key: 'quotations', label: 'Quotations' },
  { key: 'projected', label: 'Projected' },
  { key: 'invoiced', label: 'Ready to Invoice' },
  { key: 'sales', label: 'Converted' },
  { key: 'lost', label: 'Lost' },
]

export function BulkActionsBar({
  selectedCount,
  users,
  onClearSelection,
  onMoveStatus,
  onAssignOwner,
  onBulkUpdate,
}: BulkActionsBarProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false)

  const closeAll = () => {
    setShowStatusDropdown(false)
    setShowOwnerDropdown(false)
  }

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
          {/* Move Status */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown)
                setShowOwnerDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Move Status</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showStatusDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowStatusDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.key}
                      onClick={() => {
                        onMoveStatus?.(status.key)
                        setShowStatusDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Assign Owner */}
          <div className="relative">
            <button
              onClick={() => {
                setShowOwnerDropdown(!showOwnerDropdown)
                setShowStatusDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Assign Owner</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showOwnerDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowOwnerDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onAssignOwner?.(user.id)
                        setShowOwnerDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium">
                        {user.fullName.charAt(0)}
                      </div>
                      {user.fullName}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-700 mx-1" />

          {/* Bulk Update */}
          <button
            onClick={() => {
              closeAll()
              onBulkUpdate?.()
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-cyan-400 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Bulk Update</span>
          </button>
        </div>
      </div>
    </div>
  )
}
