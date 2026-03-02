import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CollapsibleSection } from '@/components/ui/collapsible-section'
import { BulletList } from '@/components/ui/bullet-list'
import { ArrowRight } from 'lucide-react'
import type { ProductOverview } from '@/types/product'

interface ProductOverviewCardProps {
  overview: ProductOverview
}

export function ProductOverviewCard({ overview }: ProductOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product overview: {overview.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        {overview.description && (
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {overview.description}
          </p>
        )}

        {/* Problems & Solutions - Expandable */}
        {overview.problems.length > 0 && (
          <CollapsibleSection title="Problems & Solutions" count={overview.problems.length}>
            <ul className="space-y-3">
              {overview.problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-stone-900 dark:text-stone-100 mt-1 shrink-0" strokeWidth={2} />
                  <div>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {problem.title}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 mx-2">—</span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {problem.solution}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {/* Key Features - Expandable */}
        {overview.features.length > 0 && (
          <CollapsibleSection title="Key Features" count={overview.features.length}>
            <BulletList items={overview.features} className="ml-1" />
          </CollapsibleSection>
        )}
      </CardContent>
    </Card>
  )
}
