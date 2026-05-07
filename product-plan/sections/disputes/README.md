# Disputes

## Overview

Governance and escalation engine for handling conflicts, objections, and contested outcomes with configurable SLA enforcement and mandatory audit trails.

## User Flows

- Navigate with collapsible sidebar (All Disputes, My Disputes)
- View disputes in stage tabs (Open, In Progress, Hold, Refund Raised, Not Settled, Settled)
- Create disputes linked to incidents, subscribers, customers, payments, vehicles, or other entities
- Assign reviewers and escalate
- View detail with Summary, Linked Incident, Investigation, Evidence, Activity tabs
- Add investigation notes and upload evidence files
- Bulk assign reviewer and change priority

## Design Decisions

- Review-driven (unlike operational incidents)
- No bulk resolution or refund approvals (disputes are sensitive)
- Configurable SLA per dispute (slaDays field)
- Every action requires mandatory audit trail
- Must link to existing entity (no standalone disputes)
- Priority levels: low, medium, high, critical
- Dispute types: refund, service, payment, legal_escalation

## Data Used

**Entities:** Dispute (with LinkedEntity, LinkedIncidentSnapshot, FinancialOutcome, InvestigationNote, Evidence, ActivityLogEntry), StageCounts, Reviewer
**From global model:** Incident, Subscriber, Payment

## Components Provided

| Component | Description |
|-----------|-------------|
| `DisputeList` | Main list view with table, stage tabs, search, filters, and bulk actions |
| `DisputesSidebar` | Collapsible sidebar for workspace navigation (All/My Disputes) |
| `StageTabs` | Tab bar showing dispute lifecycle stages with badge counts |
| `DisputesTableHeader` | Column header row for the disputes table |
| `DisputeRow` | Single dispute row with ID, type, priority, status, SLA, and action menu |
| `DisputeBulkActionsBar` | Floating action bar for bulk assign reviewer and change priority |
| `Pagination` | Page navigation control with page size and total count |
| `DisputeDetailView` | Full detail view with 5-tab layout and action buttons |
| `SummaryTab` | Overview tab showing dispute summary, linked entity, and financial details |
| `LinkedIncidentTab` | Tab displaying the linked incident snapshot with timeline summary |
| `InvestigationTab` | Tab for viewing and adding investigation notes |
| `EvidenceTab` | Tab for viewing and uploading evidence files |
| `DisputeActivityTab` | Activity/audit log tab with follow-up tracking |
| `BulkUpdateModal` | Modal for bulk operations on selected disputes |
| `CreateDisputeModal` | Modal form for creating a new dispute with entity linking |
| `AssignReviewerModal` | Modal for selecting and assigning a reviewer to disputes |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewDispute` | Open dispute detail view |
| `onAssignReviewer` | Assign reviewer to a dispute |
| `onEscalate` | Escalate dispute |
| `onChangePriority` | Change dispute priority |
| `onApproveRefund` | Approve refund resolution |
| `onRejectDispute` | Reject dispute |
| `onCloseDispute` | Close/resolve dispute |
| `onBulkAssignReviewer` | Bulk assign reviewer to multiple disputes |
| `onBulkChangePriority` | Bulk change priority of multiple disputes |
| `onExport` | Export dispute data |
| `onAddInvestigationNote` | Add investigation note to a dispute |
| `onUploadEvidence` | Upload evidence file to a dispute |
