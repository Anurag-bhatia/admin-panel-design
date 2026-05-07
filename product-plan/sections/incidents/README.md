# Incidents

## Overview

Queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. Every challan lives in exactly one execution queue at a time with rule-based movement between stages.

## User Flows

- Navigate to Incidents workspace with collapsible sidebar
- Toggle between All Incidents and My Incidents
- View challans in queue-based tabs (New Incidents → Screening → Agent/Lawyer Assigned → Settled → Not Settled → Hold → Refund)
- Add new challans/cases with subscriber linking
- Validate and screen challans against external sources
- Assign agents and lawyers
- Move challans between queues
- View full challan detail with Follow Up, Timeline, Details, Call Summary, Notes tabs
- Bulk operations: validate, screen, assign, move queue, update
- Export data to CSV/Excel

## Design Decisions

- Queue tabs represent execution stages, not filters — a challan exists in exactly one queue
- Separate workType logic for challans vs cases (different tabs, actions, expense fields)
- 45-day TAT enforcement with countdown indicator (overdue in red)
- Collapsible sidebar for workspace navigation
- Permission-controlled actions throughout

## Data Used

**Entities:** Incident (with workType: 'case' | 'challan'), FollowUp, TimelineActivity, Document, ValidationResult, ScreeningResult, QueueCounts, Pagination
**From global model:** Subscriber, Lawyer, User, Assignment

## Components Provided

| Component | Description |
|-----------|-------------|
| `IncidentList` | Main list view with table, queue tabs, search, filters, and bulk actions |
| `IncidentsSidebar` | Collapsible sidebar for workspace navigation (All/My Incidents, Cases/Challans toggle) |
| `QueueTabs` | Tab bar showing queue stages with badge counts per queue |
| `IncidentsTableHeader` | Column header row for the incidents table |
| `IncidentRow` | Single incident row in the table with status, TAT, and action menu |
| `BulkActionsBar` | Floating action bar for bulk operations on selected incidents |
| `Pagination` | Page navigation control with page size and total count |
| `IncidentDetailHeader` | Header bar for detail view with incident info, status badge, and action buttons |
| `FollowUpTab` | Follow-up activity log tab in detail view |
| `TimelineTab` | Chronological timeline of all actions taken on an incident |
| `ActivityTab` | Activity/audit log tab in detail view |
| `NotesTab` | Internal notes tab for incident detail view |
| `DetailsTab` | Core incident details tab showing all fields and metadata |
| `AddChallanModal` | Modal form for creating a new challan with subscriber selection |
| `AssignAgentModal` | Modal for selecting and assigning an agent to incidents |
| `AssignLawyerModal` | Modal for selecting and assigning a lawyer to incidents |
| `MoveQueueModal` | Modal for moving incidents to a different execution queue |
| `BulkUpdateModal` | Modal for uploading CSV/Excel file for bulk incident updates |
| `ValidateResultsView` | Results view showing validation status per challan (exists/disposed/not found) |
| `ScreenResultsView` | Results view showing screening data from external sources |

**Additional components (not re-exported from index.ts):**

| Component | Description |
|-----------|-------------|
| `AddCaseModal` | Modal form for creating a new case |
| `CallSummaryTab` | Call summary log tab in detail view |
| `AddExpenseModal` | Modal for recording expenses against an incident |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddChallan` | Create new challan |
| `onAddCase` | Create new case |
| `onValidate` | Validate challan against external source |
| `onScreen` | Screen challan |
| `onAssignAgent` | Assign agent to challan |
| `onAssignLawyer` | Assign lawyer to challan |
| `onMoveQueue` | Move challan between queues |
| `onBulkUpdate` | Bulk CSV/Excel update |
| `onAddExpense` | Record expense |
| `onExport` | Export to CSV/Excel |
| `onViewIncident` | Open challan detail view |
| `onAddFollowUp` | Log follow-up activity |
| `onUploadDocument` | Upload document to incident |
| `onViewDocument` | View or download attached document |
| `onDeleteDocument` | Remove document from incident |
| `onUpdate` | Update incident details |
| `onQueueChange` | Change active queue tab |
| `onPageChange` | Navigate to different page |
| `onSearch` | Search incidents |
| `onFilter` | Apply filters to incident list |
| `onBack` | Navigate back to list from detail view |
