import React, { Suspense } from 'react'
import {
  getComponentForSection,
  isImplemented,
  getSectionLabel,
  SectionId,
} from './sectionRegistry'
import PlaceholderSection from './PlaceholderSection'

interface SectionRendererProps {
  sectionId: SectionId
  subRoute?: string
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ sectionId, subRoute }) => {
  const Component = getComponentForSection(sectionId)
  const label = getSectionLabel(sectionId)

  // Handle Sales CRM sub-routes
  if (sectionId === 'leads') {
    if (subRoute === 'my') {
      // Load My Leads component
      const MyLeadsComponent = React.lazy(() => import('../sections/sales-crm/MyLeads'))
      return (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Loading My Leads...
                </div>
                <div className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  Please wait while we prepare your personal command center
                </div>
              </div>
            </div>
          }
        >
          <MyLeadsComponent />
        </Suspense>
      )
    }
    // Default to "All Leads" view (subRoute === 'all' or empty)
  }

  // If section is not implemented, show placeholder
  if (!isImplemented(sectionId)) {
    return <PlaceholderSection sectionId={sectionId} />
  }

  // If component exists, render it with suspense boundary
  if (Component) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Loading {label}...
              </div>
              <div className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                Please wait while we prepare the section
              </div>
            </div>
          </div>
        }
      >
        <Component />
      </Suspense>
    )
  }

  // Fallback if something went wrong
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-lg font-semibold text-red-600 dark:text-red-400">
          Error loading {label}
        </div>
        <div className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          The section could not be loaded. Please refresh the page or contact support.
        </div>
      </div>
    </div>
  )
}

export default SectionRenderer
