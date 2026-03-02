import { Plus } from 'lucide-react'

interface PartnersListHeaderProps {
  onCreatePartner?: () => void
}

export function PartnersListHeader({ onCreatePartner }: PartnersListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Partners
        </h1>
      </div>
      <button
        onClick={onCreatePartner}
        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Add Partner</span>
      </button>
    </div>
  )
}
