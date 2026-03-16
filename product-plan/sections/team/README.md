# Team

## Overview

Organizational backbone for managing employees, teams, permissions, and access control. Features a two-tab layout (Employees/Teams), 3-step onboarding wizard, full-screen employee detail pages with permission management, and team composition tools.

## Components Provided

- `TeamManagement` — Main view with Employees/Teams tabs
- `EmployeeTable` — Employee data table
- `TeamsTable` — Teams data table
- `EmployeeOnboardingWizard` — 3-step creation wizard
- `EditEmployeeModal` — Edit employee profile
- `PermissionsPage` — Module/flow permission toggles
- `CreateTeamModal` — New team form
- `EditTeamModal` — Edit team form
- `DeactivateConfirmDialog` — Deactivation confirmation
- `TeamDetailView` — Team detail page
- `EmployeeDetailView` — Employee detail with Details + Permissions tabs

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddEmployee` | Start onboarding wizard |
| `onViewEmployee` | Open employee detail |
| `onEditEmployee` | Edit employee profile |
| `onDeactivate` | Deactivate employee |
| `onReactivate` | Reactivate employee |
| `onUpdatePermissions` | Save permission changes |
| `onCreateTeam` | Create new team |
| `onEditTeam` | Edit team details |

## Data Used

**Entities:** Employee, Team, Permissions, EmployeeFormData, TeamFormData
