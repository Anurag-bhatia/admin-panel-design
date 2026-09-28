import { useState } from 'react'
import data from '@/../product/sections/lawyers/data.json'
import type { Lawyer } from '@/../product/sections/lawyers/types'
import { Lawyers } from './components/Lawyers'

type ExpertsGroup = 'business' | 'individuals'

const GROUPS: { key: ExpertsGroup; label: string }[] = [
  { key: 'business', label: 'Business' },
  { key: 'individuals', label: 'Individuals' },
]

export default function LawyersPreview() {
  const [activeGroup, setActiveGroup] = useState<ExpertsGroup>('business')
  const current = GROUPS.find((g) => g.key === activeGroup)!

  const allLawyers = data.lawyers as Lawyer[]
  const scopedLawyers =
    activeGroup === 'business'
      ? allLawyers.filter((l) => l.company !== null)
      : allLawyers.filter((l) => l.company === null)

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56">
        <div className="flex-1 p-3">
          {GROUPS.map((group, index) => {
            const isActive = activeGroup === group.key
            return (
              <div key={group.key}>
                <button
                  onClick={() => setActiveGroup(group.key)}
                  className={`w-full text-left rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                      : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {group.label}
                </button>
                {index < GROUPS.length - 1 && (
                  <div className="mx-4 my-1 border-t border-slate-200 dark:border-slate-700" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex-1 min-w-0 overflow-auto">
        <Lawyers key={activeGroup} lawyers={scopedLawyers} heading={current.label} />
      </div>
    </div>
  )
}
