# Incidents

## Overview

Queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. Replaces manual tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails. Every challan lives in exactly one execution queue at a time.

The module includes a collapsible sidebar for switching between All Incidents and My Incidents, with sub-sections for Cases and Challans.

## Components Provided

- `IncidentList` — Main list view with table and queue management
- `IncidentsSidebar` — Collapsible sidebar (All/My Incidents, Cases/Challans)
- `QueueTabs` — Horizontal queue stage tabs with counts
- `IncidentsTableHeader` — Search, filters, Add Challan, Export buttons
- `IncidentRow` — Table row with checkbox, data columns, action menu
- `BulkActionsBar` — Bulk operations bar (Validate, Screen, Assign, Move Queue)
- `Pagination` — Page navigation
- `IncidentDetailHeader` — Detail page header with ID and actions
- `FollowUpTab` — Follow-up logging and history
- `TimelineTab` — Chronological action history
- `ActivityTab` — Activity sub-tabs
- `NotesTab` — Internal notes
- `DetailsTab` — Challan info and documents
- `CallSummaryTab` — Call recordings with summaries
- `AddChallanModal` — New challan form
- `AddCaseModal` — New case form
- `AddExpenseModal` — Expense recording
- `AssignAgentModal` — Agent assignment
- `AssignLawyerModal` — Lawyer assignment
- `MoveQueueModal` — Queue transfer
- `BulkUpdateModal` — Excel/CSV bulk update
- `ValidateResultsView` — Validation results
- `ScreenResultsView` — Screening results with filters

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddChallan` | Create new challan |
| `onValidate` | Validate selected challans |
| `onScreen` | Screen selected challans |
| `onAssignAgent` | Assign agent to challans |
| `onAssignLawyer` | Assign lawyer to challans |
| `onMoveQueue` | Move challans between queues |
| `onBulkUpdate` | Upload Excel for bulk update |
| `onViewDetail` | Open challan detail view |
| `onAddFollowUp` | Log follow-up activity |
| `onAddExpense` | Record expense |
| `onExport` | Export to CSV/Excel |
| `onSearch` | Search challans |
| `onFilter` | Apply filters |

## Data Used

**Entities:** Incident, Subscriber, Lawyer, User, FollowUp, TimelineActivity, Document, ValidationResult, ScreeningResult
