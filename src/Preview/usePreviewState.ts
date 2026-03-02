import { useState } from 'react'
import { SectionId } from './sectionRegistry'

export function usePreviewState() {
  const [activeSection, setActiveSection] = useState<SectionId>('incidents')

  return {
    activeSection,
    setActiveSection,
  }
}
