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

Implement the Incidents feature — the core queue-driven ticket management system for handling challan and case resolution with strict 45-day TAT enforcement.

## Overview

The Incidents module replaces manual challan tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages. The module includes a collapsible sidebar for switching between All Incidents and My Incidents, with sub-sections for Cases and Challans.

**Key Functionality:**
- View challan queues with tab-based navigation (New Incidents, Screening, Lawyer Assigned, Settled, Not Settled, Refund)
- Collapsible sidebar navigation (All Incidents / My Incidents, Cases / Challans)
- Add new challans via form modal
- Validate and screen challans against external sources
- Bulk operations: assign agent/lawyer, move queue, bulk update via Excel upload
- Single-ticket operations via row action menu
- Full challan detail view with tabs: Follow Up, Timeline, Activity, Notes, Details, Call Summary
- 45-day TAT enforcement with visual countdown
- Add expense modal for financial tracking
- Export filtered/selected challans to Excel/CSV

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/incidents/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/incidents/components/`:

- `IncidentList` — Main list view with table
- `IncidentsSidebar` — Collapsible sidebar (All/My, Cases/Challans)
- `QueueTabs` — Horizontal queue stage tabs with counts
- `IncidentsTableHeader` — Search, filters, Add Challan, Export buttons
- `IncidentRow` — Table row with checkbox, data columns, action menu
- `BulkActionsBar` — Appears on selection (Validate, Screen, Assign Agent/Lawyer, Move Queue, Bulk Update)
- `Pagination` — Page navigation with items per page
- `IncidentDetailHeader` — Detail page header with back arrow, ID, action buttons
- `FollowUpTab` — Follow-up logging and history
- `TimelineTab` — Chronological action history
- `ActivityTab` — Activity sub-tabs (Follow-Up and Activity Log)
- `NotesTab` — Free-form internal notes
- `DetailsTab` — Challan information and documents
- `CallSummaryTab` — Call recordings with summaries
- `AddChallanModal` — New challan form
- `AssignAgentModal` — Agent assignment
- `AssignLawyerModal` — Lawyer assignment
- `MoveQueueModal` — Queue transfer
- `BulkUpdateModal` — Excel/CSV bulk update
- `ValidateResultsView` — Post-validation results display
- `ScreenResultsView` — Post-screening results with filters
- `AddExpenseModal` — Financial expense recording
- `AddCaseModal` — New case form

### Data Layer

The components expect data shapes defined in `product-plan/sections/incidents/types.ts`. You'll need to:
- Create database tables for incidents, follow-ups, assignments, documents
- Build API endpoints for CRUD operations, queue management, validation, screening
- Implement 45-day TAT calculation and tracking

### Empty States

- **No incidents yet:** Show helpful message when queue tabs are empty
- **No follow-ups:** Empty state in Follow Up tab
- **No documents:** Empty state in Details tab document section
- **No call recordings:** Empty state in Call Summary tab

## Files to Reference

- `product-plan/sections/incidents/README.md` — Feature overview
- `product-plan/sections/incidents/tests.md` — Test-writing instructions
- `product-plan/sections/incidents/components/` — React components
- `product-plan/sections/incidents/types.ts` — TypeScript interfaces
- `product-plan/sections/incidents/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Challan
1. User clicks "Add Challan" button in table header
2. Modal opens with form fields (subscriber, vehicle, type, source, challan details)
3. User fills in required fields and submits
4. **Outcome:** New challan appears in "New Incidents" queue tab, success confirmation shown

### Flow 2: Validate Challans
1. User selects one or more challans via checkboxes
2. Bulk actions bar appears, user clicks "Validate"
3. System checks challans against external source
4. **Outcome:** Validate Results View shows per-challan status (exists, already disposed, other)

### Flow 3: Assign Lawyer and Move Queue
1. User selects challans in "New Incidents" or "Screening" queue
2. User clicks "Assign Lawyer" from bulk actions
3. Modal shows available lawyers, user selects one and confirms
4. **Outcome:** Challans move to "Lawyer Assigned" queue, assignment logged in timeline

### Flow 4: View Challan Detail
1. User clicks a challan row in the table
2. Full detail page opens with header (back arrow, Incident ID, action buttons)
3. Left sidebar shows TAT countdown, subscriber info, vehicle info, assignments
4. Right area shows tabbed content (Activity, Notes, Details, Call Summary)
5. User adds a follow-up with notes, outcome, and next follow-up date
6. **Outcome:** Follow-up saved and visible in Activity tab, timeline updated

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Sidebar navigation works (All/My Incidents, Cases/Challans toggle)
- [ ] Queue tabs display with correct counts
- [ ] Add Challan creates and lands in New Incidents
- [ ] Validate and Screen show results
- [ ] Bulk actions work (assign, move queue, bulk update)
- [ ] Detail view renders with all tabs
- [ ] TAT countdown displays correctly (overdue in red)
- [ ] Follow-ups, notes, and documents can be added
- [ ] Export works
- [ ] Empty states display properly
- [ ] Responsive on mobile
