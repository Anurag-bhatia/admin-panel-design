import { useState } from 'react'
import { Info } from 'lucide-react'

interface InfoTooltipProps {
  label: string
}

export function InfoTooltip({ label }: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Info
        className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help"
        tabIndex={0}
      />
      {open && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 z-10 px-2 py-1 text-[11px] font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-md whitespace-nowrap shadow-lg">
          {label}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-1.5 bg-slate-900 dark:bg-slate-700 rotate-45 -mt-0.5" />
        </span>
      )}
    </span>
  )
}
