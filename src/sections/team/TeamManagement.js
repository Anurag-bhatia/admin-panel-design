import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/team/data.json';
import { TeamManagement } from './components/TeamManagement';
export default function TeamManagementPreview() {
    return (_jsx(TeamManagement, { employees: data.employees, teams: data.teams, departments: data.departments, designations: data.designations, modules: data.modules, flows: data.flows, onAddEmployee: (employeeData) => console.log('Add employee:', employeeData), onEditEmployee: (id, employeeData) => console.log('Edit employee:', id, employeeData), onDeactivateEmployee: (id) => console.log('Deactivate employee:', id), onManagePermissions: (id) => console.log('Manage permissions for employee:', id), onSavePermissions: (id, permissions) => console.log('Save permissions for employee:', id, permissions), onCreateTeam: (teamData) => console.log('Create team:', teamData), onEditTeam: (id, teamData) => console.log('Edit team:', id, teamData), onToggleTeamStatus: (id) => console.log('Toggle team status:', id), onViewEmployee: (id) => console.log('View employee:', id), onViewTeam: (id) => console.log('View team:', id) }));
}
