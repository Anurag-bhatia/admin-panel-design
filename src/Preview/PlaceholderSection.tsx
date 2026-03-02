import React from 'react'
import { getSectionLabel, getSectionDescription, getSectionIcon, SectionId } from './sectionRegistry'

interface PlaceholderSectionProps {
  sectionId: SectionId
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ sectionId }) => {
  const label = getSectionLabel(sectionId)
  const description = getSectionDescription(sectionId)
  const IconComponent = getSectionIcon(sectionId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-stone-800 rounded-lg shadow-lg p-8 text-center">
        {IconComponent && (
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-lime-100 dark:bg-lime-900 rounded-full">
              <IconComponent className="w-8 h-8 text-lime-600 dark:text-lime-300" />
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3">
          {label}
        </h2>

        <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Coming soon... This section is being prepared for preview.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderSection
