# Milestone 10: Team

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Team feature — the organizational backbone for managing employees, teams, permissions, and access control.

## Overview

The Team section provides a structured interface for defining who is part of the system, how they're organized, and what they can access. It eliminates manual people management through Excel or external tools.

**Key Functionality:**
- View employee list with profile, department, designation, reporting manager, status
- Add employees via 2-step onboarding wizard
- Edit employee profiles
- Deactivate employees (revokes access, preserves history)
- Manage employee permissions (Module Access + Flow Access)
- View and manage teams
- Create/edit teams with lead and members
- Toggle team status

## Recommended Approach: Test-Driven Development

See `product-plan/sections/team/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/team/components/`:

- `TeamManagement.tsx` — Main team management view
- `EmployeeTable.tsx` — Employee list table
- `EmployeeOnboardingWizard.tsx` — 2-step employee onboarding
- `EditEmployeeModal.tsx` — Edit employee modal
- `DeactivateConfirmDialog.tsx` — Deactivation confirmation
- `PermissionsPage.tsx` — Dedicated permissions configuration
- `TeamsTable.tsx` — Teams list table
- `CreateTeamModal.tsx` — Create team modal
- `EditTeamModal.tsx` — Edit team modal
- `EmployeeDetailView.tsx` — Employee detail page
- `TeamDetailView.tsx` — Team detail page

### Data Layer

```typescript
interface Employee {
  id: string
  profilePicture: string | null
  firstName: string
  lastName: string
  fullName: string
  mobile: string
  email: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  department: string
  designation: string
  dateOfJoining: string
  primaryReportingManager: string | null
  secondaryReportingManager: string | null
  status: 'active' | 'inactive'
  permissions: Permissions
}

interface Permissions {
  moduleAccess: string[]  // Which sections employee can view
  flowAccess: { [module: string]: string[] }  // Which actions within modules
}

interface Team {
  id: string
  name: string
  department: string
  teamLead: string
  members: string[]
  memberCount: number
  status: 'active' | 'inactive'
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddEmployee` | User submits new employee |
| `onEditEmployee` | User updates employee profile |
| `onDeactivateEmployee` | User deactivates employee |
| `onManagePermissions` | User opens permissions page |
| `onSavePermissions` | User saves permission changes |
| `onCreateTeam` | User creates new team |
| `onEditTeam` | User updates team |
| `onToggleTeamStatus` | User activates/deactivates team |
| `onViewEmployee` | User views employee details |
| `onViewTeam` | User views team details |

### Empty States

- **No employees:** "No employees added yet"
- **No teams:** "No teams created yet"
- **No team members:** "No members in this team"

## Expected User Flows

### Flow 1: Add New Employee

1. User clicks "Add Employee" button
2. Step 1: Enter profile info (photo, name, mobile, email, DOB, department, designation, reporting managers)
3. Step 2: Set up system access (official email, password)
4. User clicks "Create Employee"
5. **Outcome:** Employee created with active status, appears in list

### Flow 2: Manage Employee Permissions

1. User clicks "Manage Permissions" from employee actions
2. Dedicated permissions page opens
3. User configures Module Access checkboxes (Challans, Teams, Lawyers, etc.)
4. User configures Flow Access checkboxes per module (screen challans, assign cases, etc.)
5. User saves permissions
6. **Outcome:** Permissions applied instantly, logged to audit trail

### Flow 3: Deactivate Employee

1. User clicks "Deactivate" from employee actions
2. Confirmation dialog appears
3. User confirms
4. **Outcome:** Employee deactivated, access revoked, removed from active assignments, historical data preserved

### Flow 4: Create Team

1. User switches to Teams tab
2. User clicks "Create Team"
3. User enters team name, department, team lead, members
4. User saves team
5. **Outcome:** Team created with active status

## Done When

- [ ] Tests written and passing
- [ ] Two-tab layout (Employees, Teams) works
- [ ] Employee table displays with status badges
- [ ] Employee count shows at top
- [ ] 2-step onboarding wizard works
- [ ] Edit employee modal works
- [ ] Deactivate with confirmation works
- [ ] Permissions page with 2-layer model works (Module + Flow)
- [ ] Teams table displays
- [ ] Create/edit team works
- [ ] Team status toggle works
- [ ] Inactive employees visible but distinguished
- [ ] All changes logged to audit trail
- [ ] Empty states display properly
- [ ] Responsive on mobile
