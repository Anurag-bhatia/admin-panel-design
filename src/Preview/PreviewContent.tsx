import React from 'react'
import SectionRenderer from './SectionRenderer'
import { SectionId } from './sectionRegistry'

interface PreviewContentProps {
  sectionId: SectionId
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ sectionId }) => {
  return (
    <main className="flex-1 overflow-auto">
      <SectionRenderer sectionId={sectionId} />
    </main>
  )
}
