import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListItem, DividedList } from '@/components/ui/list-item'
import { IconBox } from '@/components/ui/icon-box'
import type { ProductRoadmap } from '@/types/product'

interface SectionsCardProps {
  roadmap: ProductRoadmap
  onSectionClick: (sectionId: string) => void
}

export function SectionsCard({ roadmap, onSectionClick }: SectionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sections</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <DividedList>
          {roadmap.sections.map((section) => (
            <ListItem
              key={section.id}
              title={section.title}
              subtitle={section.description}
              onClick={() => onSectionClick(section.id)}
              leftContent={
                <IconBox size="sm">
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                    {section.order}
                  </span>
                </IconBox>
              }
            />
          ))}
        </DividedList>
      </CardContent>
    </Card>
  )
}
