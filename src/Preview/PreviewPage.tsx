import { PreviewContent } from './PreviewContent'
import { PreviewSidebar } from './PreviewSidebar'
import { usePreviewState } from './usePreviewState'

export function PreviewPage() {
  const { activeSection, setActiveSection } = usePreviewState()

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-stone-950">
      <PreviewSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <PreviewContent sectionId={activeSection} />
    </div>
  )
}
