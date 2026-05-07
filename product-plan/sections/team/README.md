# Team

## Overview

Organizational backbone for managing employees, teams, permissions, and access control. Structured interface for defining system users, their organization, and access.

## User Flows

- View employee list with active count
- Add employee via 3-step wizard (Profile, Credentials, Permissions)
- View employee detail page with Details and Permissions tabs
- Edit employee profile
- Manage module and flow permissions with toggle switches
- Deactivate/reactivate employees
- Manage teams (create, edit, activate/deactivate)

## Design Decisions

- Full-screen detail page (not modal) for employees
- 3-step onboarding wizard with progress indicator
- Permissions as continuous module list with individual flow toggles
- Disabled modules grey out their flows
- Inactive employees visible but distinguished from active

## Data Used

**Entities:** Employee, Team
**From global model:** Audit Log (for tracking changes)

## Components Provided

- **TeamManagement** — Main page layout with employee/team tab switching and summary header
- **EmployeeTable** — Table listing all employees with status, role, team, and action columns
- **TeamsTable** — Table listing all teams with member count, status, and action columns
- **EmployeeOnboardingWizard** — 3-step wizard for adding new employees (Profile, Credentials, Permissions)
- **EditEmployeeModal** — Modal form for editing an existing employee's profile details
- **PermissionsPage** — Full-page permissions editor with module-level and flow-level toggle switches
- **CreateTeamModal** — Modal form for creating a new team with name, description, and member selection
- **EditTeamModal** — Modal form for editing an existing team's details and membership
- **DeactivateConfirmDialog** — Confirmation dialog for deactivating an employee or team
- **TeamDetailView** — Full detail view for a team showing members, activity, and settings
- **EmployeeDetailView** — Full detail view for an employee showing profile, permissions, and activity

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddEmployee` | Open onboarding wizard |
| `onViewEmployee` | Open employee detail |
| `onEditEmployee` | Edit employee profile |
| `onDeactivate` | Deactivate employee |
| `onSavePermissions` | Save permission changes |
| `onCreateTeam` | Create new team |
| `onEditTeam` | Edit team details |
