# Disputes

## Overview

Governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes. Unlike incidents (operational), disputes are review-driven challenges handled with higher scrutiny, documented reasoning, and configurable SLA enforcement (7-15 days).

## Components Provided

- `DisputeList` — Main list view
- `DisputesSidebar` — All Disputes / My Disputes
- `StageTabs` — Stage tabs (Open, Under Review, Escalated, Resolved, Rejected)
- `DisputesTableHeader` — Search, filters, export
- `DisputeRow` — Table row
- `DisputeBulkActionsBar` — Assign Reviewer, Change Priority
- `Pagination` — Page navigation
- `DisputeDetailView` — Full detail page (two-column)
- `SummaryTab` — Dispute reason and evidence
- `LinkedIncidentTab` — Read-only incident snapshot
- `InvestigationTab` — Internal review notes
- `EvidenceTab` — Document uploads
- `DisputeActivityTab` — Action history
- `BulkUpdateModal` — Bulk operations
- `CreateDisputeModal` — New dispute form
- `AssignReviewerModal` — Reviewer assignment

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreateDispute` | Create new dispute (requires linked entity) |
| `onAssignReviewer` | Assign reviewer |
| `onEscalate` | Escalate dispute |
| `onChangePriority` | Change dispute priority |
| `onResolve` | Resolve dispute |
| `onReject` | Reject dispute |
| `onUploadEvidence` | Upload evidence documents |
| `onAddNote` | Add investigation note |
| `onExport` | Export disputes |

## Data Used

**Entities:** Dispute, LinkedEntity, LinkedIncidentSnapshot, InvestigationNote, Evidence, ActivityLogEntry, Reviewer
