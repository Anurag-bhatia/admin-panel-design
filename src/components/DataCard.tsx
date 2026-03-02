import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CountBadge } from '@/components/ui/count-badge'
import { SectionLabel } from '@/components/ui/section-label'
import { MutedBulletList } from '@/components/ui/bullet-list'
import { ChevronDown } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { cn } from '@/lib/utils'

interface DataMeta {
  models: Record<string, string>
  relationships: string[]
}

interface DataCardProps {
  data: Record<string, unknown> | null
}

function extractMeta(data: Record<string, unknown>): DataMeta | null {
  const meta = data._meta as DataMeta | undefined
  if (meta && typeof meta === 'object' && meta.models && meta.relationships) {
    return meta
  }
  return null
}

function getDataWithoutMeta(data: Record<string, unknown>): Record<string, unknown> {
  const { _meta, ...rest } = data
  return rest
}

function countRecords(data: Record<string, unknown>): number {
  let count = 0
  for (const [key, value] of Object.entries(data)) {
    if (key !== '_meta' && Array.isArray(value)) {
      count += value.length
    }
  }
  return count
}

export function DataCard({ data }: DataCardProps) {
  const [isJsonOpen, setIsJsonOpen] = useState(false)

  if (!data) {
    return <EmptyState type="data" />
  }

  const meta = extractMeta(data)
  const dataWithoutMeta = getDataWithoutMeta(data)
  const recordCount = countRecords(data)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Sample Data</CardTitle>
          {recordCount > 0 && (
            <CountBadge
              count={recordCount}
              label="records"
              singularLabel="record"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Data Model Descriptions */}
        {meta && (
          <div className="space-y-6">
            {/* Models - Card Grid */}
            <div>
              <SectionLabel className="mb-3">Data Models</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(meta.models).map(([modelName, description]) => (
                  <div
                    key={modelName}
                    className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                      {modelName}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationships */}
            {meta.relationships.length > 0 && (
              <div>
                <SectionLabel className="mb-3">How They Connect</SectionLabel>
                <MutedBulletList items={meta.relationships} />
              </div>
            )}
          </div>
        )}

        {/* Collapsible JSON View */}
        <Collapsible open={isJsonOpen} onOpenChange={setIsJsonOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-left group">
            <ChevronDown
              className={cn(
                "w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform",
                isJsonOpen && "rotate-180"
              )}
              strokeWidth={1.5}
            />
            <span className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
              {isJsonOpen ? 'Hide' : 'View'} JSON
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-stone-50 dark:bg-stone-900 rounded-md p-4 overflow-x-auto mt-3">
              <pre className="text-xs font-mono text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                {JSON.stringify(dataWithoutMeta, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
