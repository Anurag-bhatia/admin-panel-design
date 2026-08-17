import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Building2, Search } from 'lucide-react'

interface AssignDepartmentModalProps {
  currentDepartment?: string | null
  onAssign?: (department: string) => void
  onClose?: () => void
}

const DEPARTMENTS = [
  'Operations',
  'Legal',
  'Accounts',
  'Marketing',
  'Product',
]

export function AssignDepartmentModal({
  currentDepartment,
  onAssign,
  onClose,
}: AssignDepartmentModalProps) {
  const [selected, setSelected] = useState<string | null>(currentDepartment || null)
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredDepartments = DEPARTMENTS.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  )

  const handleAssign = () => {
    if (selected) {
      onAssign?.(selected)
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Transfer to Department
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Select a department to route this dispute to
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Department
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search department..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-56 overflow-y-auto z-20">
                    {filteredDepartments.length === 0 ? (
                      <div className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        No departments found
                      </div>
                    ) : (
                      filteredDepartments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            setSelected(dept)
                            setSearch('')
                            setShowDropdown(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {dept}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {selected && (
              <div className="mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                  <Building2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                    {selected}
                  </span>
                  <button
                    onClick={() => {
                      setSelected(null)
                      inputRef.current?.focus()
                    }}
                    className="p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selected}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
