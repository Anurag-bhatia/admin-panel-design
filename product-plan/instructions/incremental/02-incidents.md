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

Implement the Incidents feature — the core queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement.

## Overview

The Incidents module replaces manual tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages.

**Key Functionality:**
- Navigate between All Incidents and My Incidents views
- View challans organized by queue tabs (New, Screening, Lawyer Assigned, Settled, Not Settled, Refund)
- Add new challans with subscriber/customer link
- Validate and screen challans against external sources
- Bulk operations: assign agent, assign lawyer, move queue, update
- View detailed incident information with follow-ups, timeline, and documents
- Track 45-day TAT with visual indicators

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/incidents/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/incidents/components/`:

- `IncidentList.tsx` — Main list view with queue tabs and table
- `IncidentRow.tsx` — Individual row in the incidents table
- `IncidentsTableHeader.tsx` — Table header with search, filters, actions
- `IncidentsSidebar.tsx` — Collapsible sidebar for All/My Incidents toggle
- `QueueTabs.tsx` — Queue tab navigation with counts
- `BulkActionsBar.tsx` — Actions bar when incidents are selected
- `Pagination.tsx` — Pagination controls
- `AddChallanModal.tsx` — Modal for adding new challans
- `AssignAgentModal.tsx` — Modal for assigning agents
- `AssignLawyerModal.tsx` — Modal for assigning lawyers
- `MoveQueueModal.tsx` — Modal for moving incidents between queues
- `BulkUpdateModal.tsx` — Modal for bulk updates via Excel
- `ValidateResultsView.tsx` — Results view after bulk validation
- `ScreenResultsView.tsx` — Results view after bulk screening
- `IncidentDetailHeader.tsx` — Detail page header
- `DetailsTab.tsx` — Incident details tab
- `FollowUpTab.tsx` — Follow-up management tab
- `TimelineTab.tsx` — Activity timeline tab
- `NotesTab.tsx` — Internal notes tab
- `ActivityTab.tsx` — Combined activity view
- `CallSummaryTab.tsx` — Call recordings and summaries

### Data Layer

The components expect these data shapes:

```typescript
interface Incident {
  id: string
  incidentId: string
  challanNumber: string
  subscriberId: string
  subscriberName: string
  vehicle: string
  type: 'payAndClose' | 'contest'
  category: 'challan' | 'court' | 'online'
  status: IncidentStatus
  queue: IncidentQueue
  createdAt: string
  lastUpdatedAt: string
  tatDeadline: string
  assignedAgentId: string | null
  assignedLawyerId: string | null
  source: 'API' | 'Manual' | 'Bulk Upload' | 'Partner'
  state: string
  offence: string | null
  amount: number
}

type IncidentQueue = 'newIncidents' | 'screening' | 'agentAssigned' | 'lawyerAssigned' | 'settled' | 'notSettled' | 'hold' | 'refund'
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onQueueChange` | User switches between queue tabs |
| `onPageChange` | User navigates to different page |
| `onViewIncident` | User clicks row to view details |
| `onAddChallan` | User clicks Add Challan button |
| `onValidate` | User triggers bulk validate |
| `onScreen` | User triggers bulk screen |
| `onAssignAgent` | User assigns agent to incidents |
| `onAssignLawyer` | User assigns lawyer to incidents |
| `onMoveQueue` | User moves incidents to different queue |
| `onBulkUpdate` | User uploads file for bulk update |
| `onExport` | User exports incidents |
| `onSearch` | User searches incidents |
| `onFilter` | User applies filters |
| `onAddFollowUp` | User adds follow-up note |
| `onUploadDocument` | User uploads document |

### Empty States

Implement empty state UI for when no records exist yet:

- **No incidents in queue:** Show message like "No incidents in this queue" with guidance
- **No follow-ups yet:** Show "No follow-ups recorded" with Add Follow-Up CTA
- **No documents attached:** Show "No documents uploaded" with Upload CTA
- **Search/filter returns no results:** Show "No matching incidents found" with clear filters option

## Files to Reference

- `product-plan/sections/incidents/README.md` — Feature overview and design intent
- `product-plan/sections/incidents/tests.md` — Test-writing instructions (use TDD approach)
- `product-plan/sections/incidents/components/` — React components
- `product-plan/sections/incidents/types.ts` — TypeScript interfaces
- `product-plan/sections/incidents/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View and Navigate Incident Queues

1. User opens Incidents section
2. User sees sidebar with All Incidents / My Incidents toggle
3. User sees queue tabs with counts (New Incidents, Screening, etc.)
4. User clicks different queue tab
5. **Outcome:** Table updates to show incidents in selected queue

### Flow 2: Add New Challan

1. User clicks "Add Challan" button
2. User fills challan details (subscriber, vehicle, type, source)
3. User clicks "Save" to submit
4. **Outcome:** New challan appears in New Incidents queue, success message shown

### Flow 3: Bulk Assign Lawyer

1. User selects multiple incidents via checkboxes
2. User clicks "Assign Lawyer" in bulk actions bar
3. User selects lawyer from modal dropdown
4. User confirms assignment
5. **Outcome:** Selected incidents assigned to lawyer, moved to Lawyer Assigned queue

### Flow 4: View Incident Details

1. User clicks on incident row
2. User sees full-page detail view with header and tabs
3. User navigates between Follow Up, Timeline, Details tabs
4. User adds a follow-up note
5. **Outcome:** Follow-up saved and appears in timeline

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Queue tabs display with accurate counts
- [ ] Incidents table renders with real data
- [ ] Bulk operations work (validate, screen, assign, move)
- [ ] Add Challan form creates new incidents
- [ ] Detail view displays all incident information
- [ ] Follow-ups can be added and appear in timeline
- [ ] Documents can be uploaded and viewed
- [ ] 45-day TAT countdown displays correctly
- [ ] Empty states display properly when no records exist
- [ ] Search and filter work correctly
- [ ] Pagination works
- [ ] Responsive on mobile
