# Milestone 12: Team

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

Implement the Team section — employee and team administration with permissions management.

## Overview

The Team section manages employees, teams, permissions, and access control. It provides a structured interface for defining who is part of the system, how they're organized, and what they can access.

**Key Functionality:**
- Employee list with active count
- 3-step employee onboarding wizard (Profile → Credentials → Permissions)
- Full employee detail page with Details and Permissions tabs
- Permissions management with module and flow toggles
- Teams management with creation, editing, and status control
- Deactivate/reactivate employees and teams

## Recommended Approach: Test-Driven Development

See `product-plan/sections/team/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/team/components/`:

- `TeamManagement` — Main team management view
- `EmployeeTable` — Employee list table
- `EmployeeOnboardingWizard` — 3-step onboarding
- `EmployeeDetailView` — Full employee detail page
- `EditEmployeeModal` — Edit employee form
- `PermissionsPage` — Permissions management
- `TeamsTable` — Teams list
- `TeamDetailView` — Team detail page
- `CreateTeamModal` — Create new team
- `EditTeamModal` — Edit team
- `DeactivateConfirmDialog` — Deactivation confirmation

### Expected User Flows

### Flow 1: Onboard Employee
1. User clicks "Add Employee"
2. User fills Profile Information (name, department, designation, etc.)
3. User creates login credentials
4. User configures module/flow permissions
5. **Outcome:** Employee appears in active list

### Flow 2: Manage Permissions
1. User opens employee detail page
2. User clicks "Permissions" tab
3. User toggles module and flow access switches
4. User clicks "Save"
5. **Outcome:** Permissions updated, logged in audit trail

### Flow 3: Create Team
1. User switches to Teams tab
2. User clicks "Create Team"
3. User fills team name, department, lead, members
4. **Outcome:** Team appears in teams list

## Files to Reference

- `product-plan/sections/team/components/`
- `product-plan/sections/team/types.ts`
- `product-plan/sections/team/sample-data.json`
- `product-plan/sections/team/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Employee list displays with active count
- [ ] 3-step onboarding wizard works
- [ ] Employee detail page renders both tabs
- [ ] Permissions management with toggles works
- [ ] Teams CRUD operations work
- [ ] Deactivate/reactivate works
- [ ] Empty states display properly
- [ ] Responsive on mobile
