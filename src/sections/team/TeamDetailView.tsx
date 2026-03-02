import data from '@/../product/sections/team/data.json'
import { TeamDetailView as TeamDetailViewComponent } from './components/TeamDetailView'

// Preview a specific team's detail view (first active team)
const defaultTeam = (data.teams as any).find((t: any) => t.status === 'active') || data.teams[0]

export default function TeamDetailViewPreview() {
  return (
    <TeamDetailViewComponent
      team={defaultTeam as any}
      employees={data.employees as any}
      onBack={() => console.log('Back clicked')}
      onEdit={() => console.log('Edit clicked')}
      onToggleStatus={() => console.log('Toggle status clicked')}
    />
  )
}
