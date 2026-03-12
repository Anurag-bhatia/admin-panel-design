import { useState, useRef } from 'react'
import { X, Search } from 'lucide-react'
import type { Lawyer } from '@/../product/sections/incidents/types'

interface AssignLawyerModalProps {
  selectedCount: number
  lawyers: Lawyer[]
  currentLawyerId?: string | null
  onAssign?: (lawyerId: string, notes: string) => void
  onClose?: () => void
}

export function AssignLawyerModal({
  selectedCount,
  lawyers,
  currentLawyerId,
  onAssign,
  onClose,
}: AssignLawyerModalProps) {
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(currentLawyerId || null)
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [notes, setNotes] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.state.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.phone.includes(search)
  )

  const selectedLawyer = selectedLawyerId
    ? lawyers.find((l) => l.id === selectedLawyerId)
    : null

  const handleAssign = () => {
    if (selectedLawyerId) {
      onAssign?.(selectedLawyerId, notes)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Assign Lawyer
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
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

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Search with dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Lawyer
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
                onFocus={() => {
                  if (search.trim()) setShowDropdown(true)
                }}
                placeholder="Search by name, state, email, or phone..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />

              {/* Search results dropdown */}
              {showDropdown && search.trim() && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto z-20">
                    {filteredLawyers.length === 0 ? (
                      <div className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        No lawyers found
                      </div>
                    ) : (
                      filteredLawyers.map((lawyer) => (
                        <button
                          key={lawyer.id}
                          onClick={() => {
                            setSelectedLawyerId(lawyer.id)
                            setSearch('')
                            setShowDropdown(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300">
                            {lawyer.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {lawyer.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {lawyer.state} · {lawyer.email}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Selected lawyer chip */}
            {selectedLawyer && (
              <div className="mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-medium">
                    {selectedLawyer.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                    {selectedLawyer.name}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedLawyerId(null)
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

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note about this assignment..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedLawyerId}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Assign Lawyer
          </button>
        </div>
      </div>
    </div>
  )
}
