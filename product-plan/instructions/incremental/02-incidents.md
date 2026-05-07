# Milestone 2: Incidents

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

Implement the Incidents section — the core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement.

## Overview

The Incidents module is a queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages.

**Key Functionality:**
- View challans in queue-based tabs (New Incidents, Screening, Agent Assigned, Lawyer Assigned, Settled, Not Settled, Hold, Refund)
- Add new challans with subscriber/customer linking
- Validate and screen challans against external sources
- Assign agents and lawyers with permission controls
- Move challans between queues
- Full detail view with Follow Up, Timeline, Details, Call Summary, Notes tabs
- Bulk operations (validate, screen, assign, move queue, bulk update)
- 45-day TAT enforcement with visual indicators
- Separate Cases workType with different queue tabs and actions

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incidents/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/incidents/components/`:

- `IncidentList` — Main list view with queue tabs and table
- `IncidentRow` — Individual challan row
- `IncidentsTableHeader` — Table header with search, filters, actions
- `IncidentsSidebar` — Collapsible sidebar (All/My Incidents, Cases/Challans)
- `QueueTabs` — Queue stage tabs with counts
- `BulkActionsBar` — Bulk operations bar
- `IncidentDetailHeader` — Detail page header with actions
- `AddChallanModal` — New challan form
- `AddCaseModal` — New case form
- `AddExpenseModal` — Expense recording
- `AssignAgentModal` — Agent assignment
- `AssignLawyerModal` — Lawyer assignment
- `MoveQueueModal` — Queue movement
- `BulkUpdateModal` — Bulk CSV/Excel update
- `ValidateResultsView` — Validation results
- `ScreenResultsView` — Screening results
- `ActivityTab`, `FollowUpTab`, `TimelineTab`, `DetailsTab`, `NotesTab`, `CallSummaryTab` — Detail tabs
- `Pagination` — Table pagination

### Data Layer

Key types: `Incident`, `IncidentListProps`

The Incident type includes `workType` field (`'case'` | `'challan'`) which determines different behavior for queue tabs, available actions, and expense fields.

### Callbacks

- `onAddChallan` / `onAddCase` — Create new incident
- `onValidate` / `onScreen` — External validation/screening
- `onAssignAgent` / `onAssignLawyer` — Assignment
- `onMoveQueue` — Queue movement
- `onBulkUpdate` — CSV/Excel bulk update
- `onAddExpense` — Record expense
- `onExport` — Export to CSV/Excel
- `onViewDetail` — Open detail view
- `onAddFollowUp` — Log follow-up activity
- `onNavigate` — Navigate between views

## Expected User Flows

### Flow 1: Add New Challan
1. User clicks "Add Challan" button
2. User fills in challan details, subscriber, vehicle, type
3. User clicks "Save"
4. **Outcome:** New challan appears in "New Incidents" queue

### Flow 2: Screen and Assign
1. User selects challans in "New Incidents" queue
2. User clicks "Screen" → views screening results
3. User selects challans and clicks "Assign Lawyer"
4. User picks a lawyer from modal
5. **Outcome:** Challans move to "Lawyer Assigned" queue

### Flow 3: View and Follow Up
1. User clicks a challan row to open detail view
2. User sees TAT countdown, subscriber info, assignments
3. User clicks "Add Follow-Up" in Activity tab
4. User records follow-up notes and next date
5. **Outcome:** Follow-up logged in activity timeline

## Files to Reference

- `product-plan/sections/incidents/README.md`
- `product-plan/sections/incidents/tests.md`
- `product-plan/sections/incidents/components/`
- `product-plan/sections/incidents/types.ts`
- `product-plan/sections/incidents/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Queue tabs show correct counts
- [ ] Challans display in correct queues
- [ ] Add challan/case creates new incidents
- [ ] Validate and screen work with external APIs
- [ ] Agent and lawyer assignment works
- [ ] Queue movement works
- [ ] Bulk operations work
- [ ] Detail view shows all tabs with data
- [ ] 45-day TAT indicator works
- [ ] Cases and challans behave differently per workType
- [ ] Empty states display when no records exist
- [ ] Responsive on mobile
