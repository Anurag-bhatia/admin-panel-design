import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CollapsibleSection } from '@/components/ui/collapsible-section'
import { ListItem } from '@/components/ui/list-item'
import { MutedBulletList } from '@/components/ui/bullet-list'
import { PanelLeft, Layout } from 'lucide-react'
import type { ShellInfo } from '@/types/product'

interface ShellCardProps {
  shell: ShellInfo
}

export function ShellCard({ shell }: ShellCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PanelLeft className="w-5 h-5 text-stone-500 dark:text-stone-400" strokeWidth={1.5} />
          Application Shell
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overview */}
        {shell.spec && shell.spec.overview && (
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {shell.spec.overview}
          </p>
        )}

        {/* Navigation - Collapsible */}
        {shell.spec && shell.spec.navigationItems.length > 0 && (
          <CollapsibleSection
            title="Navigation"
            count={shell.spec.navigationItems.length}
          >
            <MutedBulletList items={shell.spec.navigationItems} className="ml-1" />
          </CollapsibleSection>
        )}

        {/* View Shell Design Link */}
        {shell.hasComponents && (
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            <ListItem
              title="View Shell Design"
              icon={Layout}
              to="/shell/design"
              className="px-0 py-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
