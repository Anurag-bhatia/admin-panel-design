import type { ConfigStatus } from '@/../product/sections/rewards-config/types'

interface StatusToggleProps {
  value: ConfigStatus
  onChange: (next: ConfigStatus) => void
}

export function StatusToggle({ value, onChange }: StatusToggleProps) {
  const options: ConfigStatus[] = ['active', 'inactive']
  return (
    <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      {options.map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              selected
                ? opt === 'active'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {opt === 'active' ? 'Active' : 'Inactive'}
          </button>
        )
      })}
    </div>
  )
}
