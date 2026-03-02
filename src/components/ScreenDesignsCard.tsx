import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListItem, DividedList } from '@/components/ui/list-item'
import { Layout } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import type { ScreenDesignInfo } from '@/types/section'

interface ScreenDesignsCardProps {
  screenDesigns: ScreenDesignInfo[]
  sectionId: string
}

export function ScreenDesignsCard({ screenDesigns, sectionId }: ScreenDesignsCardProps) {
  if (screenDesigns.length === 0) {
    return <EmptyState type="screen-designs" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Screen Designs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <DividedList>
          {screenDesigns.map((screenDesign) => (
            <ListItem
              key={screenDesign.name}
              title={screenDesign.name}
              icon={Layout}
              to={`/sections/${sectionId}/screen-designs/${screenDesign.name}`}
            />
          ))}
        </DividedList>
      </CardContent>
    </Card>
  )
}
