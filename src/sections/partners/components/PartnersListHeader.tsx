import { useState, useRef, useEffect } from 'react'
import { Plus, ChevronDown } from 'lucide-react'

interface PartnersListHeaderProps {
  onCreateChallanPay?: () => void
  onCreateLots247?: () => void
}

export function PartnersListHeader({ onCreateChallanPay, onCreateLots247 }: PartnersListHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Partners
        </h1>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add Partner</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20 py-1">
            <button
              onClick={() => { onCreateChallanPay?.(); setShowDropdown(false) }}
              className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              ChallanPay
            </button>
            <button
              onClick={() => { onCreateLots247?.(); setShowDropdown(false) }}
              className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              LOTS247
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
