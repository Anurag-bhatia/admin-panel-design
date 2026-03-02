import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CollapsibleSection } from '@/components/ui/collapsible-section'
import { BulletList } from '@/components/ui/bullet-list'
import { PanelTop, Square } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import type { ParsedSpec } from '@/types/section'

interface SpecCardProps {
  spec: ParsedSpec | null
  sectionTitle?: string
}

export function SpecCard({ spec, sectionTitle }: SpecCardProps) {
  if (!spec) {
    return <EmptyState type="spec" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sectionTitle || 'Specification'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overview */}
        {spec.overview && (
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {spec.overview}
          </p>
        )}

        {/* User Flows - Expandable */}
        {spec.userFlows.length > 0 && (
          <CollapsibleSection title="User Flows" count={spec.userFlows.length}>
            <BulletList items={spec.userFlows} />
          </CollapsibleSection>
        )}

        {/* UI Requirements - Expandable */}
        {spec.uiRequirements.length > 0 && (
          <CollapsibleSection title="UI Requirements" count={spec.uiRequirements.length}>
            <BulletList items={spec.uiRequirements} />
          </CollapsibleSection>
        )}

        {/* Display Configuration */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          {spec.useShell ? (
            <>
              <PanelTop className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
              <span className="text-sm text-stone-500 dark:text-stone-400">
                Displays inside app shell
              </span>
            </>
          ) : (
            <>
              <Square className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
              <span className="text-sm text-stone-500 dark:text-stone-400">
                Standalone page (no shell)
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
