# Incidents

## Overview

The Incidents module is a queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. It replaces manual tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails.

## User Flows

- Navigate between All Incidents and My Incidents views
- View challans organized by queue tabs (New, Screening, Lawyer Assigned, Settled, Not Settled, Refund)
- Add new challans with subscriber/customer link
- Validate and screen challans against external sources
- Bulk operations: assign agent, assign lawyer, move queue, bulk update
- View detailed incident information with follow-ups, timeline, documents
- Track 45-day TAT with visual countdown

## Components Provided

| Component | Description |
|-----------|-------------|
| `IncidentList` | Main list view with queue tabs and table |
| `IncidentRow` | Individual row in incidents table |
| `IncidentsTableHeader` | Table header with search, filters, actions |
| `IncidentsSidebar` | Collapsible sidebar for All/My toggle |
| `QueueTabs` | Queue tab navigation with counts |
| `BulkActionsBar` | Actions bar when incidents selected |
| `Pagination` | Pagination controls |
| `AddChallanModal` | Modal for adding new challans |
| `AssignAgentModal` | Modal for assigning agents |
| `AssignLawyerModal` | Modal for assigning lawyers |
| `MoveQueueModal` | Modal for moving between queues |
| `BulkUpdateModal` | Modal for bulk Excel updates |
| `ValidateResultsView` | Results after bulk validation |
| `ScreenResultsView` | Results after bulk screening |
| `IncidentDetailHeader` | Detail page header |
| `DetailsTab` | Incident details tab |
| `FollowUpTab` | Follow-up management |
| `TimelineTab` | Activity timeline |
| `NotesTab` | Internal notes |
| `ActivityTab` | Combined activity view |
| `CallSummaryTab` | Call recordings and summaries |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onQueueChange` | User switches queue tabs |
| `onPageChange` | User navigates pages |
| `onViewIncident` | User clicks to view details |
| `onAddChallan` | User adds new challan |
| `onValidate` | User validates incidents |
| `onScreen` | User screens incidents |
| `onAssignAgent` | User assigns agent |
| `onAssignLawyer` | User assigns lawyer |
| `onMoveQueue` | User moves to different queue |
| `onBulkUpdate` | User uploads bulk update file |
| `onExport` | User exports incidents |
| `onSearch` | User searches |
| `onFilter` | User applies filters |
| `onAddFollowUp` | User adds follow-up |
| `onUploadDocument` | User uploads document |

## Data Entities

- **Incident** — Main challan/case record
- **FollowUp** — Follow-up activity note
- **TimelineActivity** — Audit log entry
- **Document** — Attached file
- **ValidationResult** — External validation response
- **ScreeningResult** — External screening response

## Visual Reference

See `screenshot.png` for the target UI design (if available).
