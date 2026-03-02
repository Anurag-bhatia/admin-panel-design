import React from 'react'
import { SECTION_IDS, getSectionLabel, getSectionIcon, SectionId } from './sectionRegistry'
import { usePreviewState } from './usePreviewState'

interface PreviewSidebarProps {
  activeSection: SectionId
  onSectionChange: (section: SectionId) => void
}

export const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <aside className="w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-y-auto">
      <div className="p-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
          Preview Sections
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {SECTION_IDS.map((sectionId) => {
          const label = getSectionLabel(sectionId)
          const Icon = getSectionIcon(sectionId)
          const isActive = activeSection === sectionId

          return (
            <button
              key={sectionId}
              onClick={() => onSectionChange(sectionId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 font-medium'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              <span className="flex-1 truncate">{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
