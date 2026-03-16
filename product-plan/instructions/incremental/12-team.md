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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Team module — the organizational backbone for managing employees, teams, permissions, and access control.

## Overview

The Team section provides administrators with a structured interface for defining who is part of the system, how they're organized, and what they can access, eliminating manual people management.

**Key Functionality:**
- Two-tab layout: Employees and Teams
- Employee table (profile photo, name, department, designation, reporting manager, status)
- 3-step onboarding wizard: Profile Info → Create Credentials → Permissions
- Full-screen employee detail page with 2 tabs: Details, Permissions
- Permission management: module-level and flow-level switches
- Edit profile, deactivate/reactivate employees
- Teams table (name, department, lead, member count, status)
- Create/edit teams

## Recommended Approach: Test-Driven Development

See `product-plan/sections/team/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

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

### Empty States

- **No employees yet:** CTA to add first employee
- **No teams yet:** CTA to create first team
- **No team members:** Empty team detail

## Files to Reference

- `product-plan/sections/team/README.md` — Feature overview
- `product-plan/sections/team/tests.md` — Test-writing instructions
- `product-plan/sections/team/components/` — React components
- `product-plan/sections/team/types.ts` — TypeScript interfaces
- `product-plan/sections/team/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Employee
1. User clicks "Add Employee"
2. 3-step wizard: Step 1 (Profile Info: photo, name, email, department, designation, reporting managers) → Step 2 (Credentials: email, password) → Step 3 (Permissions: module/flow toggles)
3. **Outcome:** Employee created, appears in list, credentials ready for login

### Flow 2: Manage Permissions
1. User clicks an employee row → Detail page opens
2. User navigates to Permissions tab
3. Toggles module switches (enabling/disabling access)
4. Toggling a module off greys out its flows
5. Clicks "Save"
6. **Outcome:** Permissions updated, change logged in audit trail

### Flow 3: Create Team
1. User switches to Teams tab
2. Clicks "Create Team"
3. Fills in name, department, team lead, active members
4. **Outcome:** Team created, appears in teams list

## Done When

- [ ] Tests written and passing
- [ ] Employees tab shows employee table with status badges
- [ ] 3-step onboarding wizard works with validation
- [ ] Employee detail page with Details and Permissions tabs
- [ ] Permission toggles work (module disabling greys out flows)
- [ ] Edit profile works
- [ ] Deactivate/reactivate works
- [ ] Teams tab shows teams table
- [ ] Create/edit team works
- [ ] Empty states display properly
- [ ] Responsive on mobile
