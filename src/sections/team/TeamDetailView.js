import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/team/data.json';
import { TeamDetailView as TeamDetailViewComponent } from './components/TeamDetailView';
// Preview a specific team's detail view (first active team)
const defaultTeam = data.teams.find((t) => t.status === 'active') || data.teams[0];
export default function TeamDetailViewPreview() {
    return (_jsx(TeamDetailViewComponent, { team: defaultTeam, employees: data.employees, onBack: () => console.log('Back clicked'), onEdit: () => console.log('Edit clicked'), onToggleStatus: () => console.log('Toggle status clicked') }));
}
