import { useState } from 'react'
import { X, Search, Scale, MapPin, TrendingUp } from 'lucide-react'
import type { Lawyer } from '../types'

interface AssignLawyerModalProps {
  selectedCount: number
  lawyers: Lawyer[]
  currentLawyerId?: string | null
  onAssign?: (lawyerId: string) => void
  onClose?: () => void
}

export function AssignLawyerModal({
  selectedCount,
  lawyers,
  currentLawyerId,
  onAssign,
  onClose,
}: AssignLawyerModalProps) {
  const [search, setSearch] = useState('')
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(
    currentLawyerId || null
  )

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.state.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.phone.includes(search)
  )

  const handleAssign = () => {
    if (selectedLawyerId) {
      onAssign?.(selectedLawyerId)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Assign Lawyer
            </h2>
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

        {/* Search */}
        <div className="px-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, state, email, or phone"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Lawyer List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredLawyers.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                <Scale className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-900 dark:text-white font-medium mb-1">No lawyers found</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLawyers.map((lawyer) => (
                <button
                  key={lawyer.id}
                  onClick={() => setSelectedLawyerId(lawyer.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedLawyerId === lawyer.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedLawyerId === lawyer.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Scale className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium ${
                          selectedLawyerId === lawyer.id
                            ? 'text-cyan-900 dark:text-cyan-300'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {lawyer.name}
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          selectedLawyerId === lawyer.id
                            ? 'text-cyan-700 dark:text-cyan-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {lawyer.email} • {lawyer.phone}
                      </div>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                            selectedLawyerId === lawyer.id
                              ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <MapPin className="h-3 w-3" />
                          {lawyer.state}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                            lawyer.successRate >= 75
                              ? selectedLawyerId === lawyer.id
                                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                              : lawyer.successRate >= 50
                              ? selectedLawyerId === lawyer.id
                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                              : selectedLawyerId === lawyer.id
                              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          }`}
                        >
                          <TrendingUp className="h-3 w-3" />
                          {lawyer.successRate}% success rate
                        </span>
                      </div>
                    </div>
                    {selectedLawyerId === lawyer.id && (
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
              ))}
            </div>
          )}
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
