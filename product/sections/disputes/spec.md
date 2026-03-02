# Disputes Specification

## Overview
The Disputes module is a governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes related to incidents, payments, or subscriptions. Unlike incidents (which are operational execution), disputes are review-driven challenges to outcomes or decisions, handled with higher scrutiny, documented reasoning, and configurable SLA enforcement.

## User Flows
- **Navigate to Disputes** — Opens workspace with collapsible sidebar; click All Disputes (full workload by permissions) or My Disputes (user's assigned disputes)
- **View dispute stages** — Table view with horizontal stage tabs: Open, Under Review, Escalated, Resolved, Rejected; each tab shows dispute count
- **Scan disputes** — Table displays Dispute ID, Linked Entity (Incident ID / Subscriber / Customer), Dispute Type, Raised By, Priority, Status, Created On, Last Updated, Assigned To, Source
- **Create dispute** — Disputes created from Support module (Convert to Dispute), Incident Detail View (Raise Dispute), Financials tab, or manually by admin; every dispute must link to an Incident ID, Subscriber/Customer, or Payment reference — no standalone disputes
- **Search and filter disputes** — Search by Dispute ID, linked entity; filter by type, priority, status, assigned reviewer, date range
- **Select multiple disputes** — Checkbox selection enables Bulk Actions bar
- **Perform bulk operations** — Bulk assign reviewer, bulk change priority; no bulk resolution or bulk refund approvals (disputes are sensitive)
- **Perform single-ticket operations** — Row-level action menu with assign reviewer, escalate, change priority
- **Open dispute detail** — Full-page two-column view with Dispute ID header and tabbed content
- **Review and resolve** — Stage-based actions: assign reviewer, escalate, approve refund, reject dispute, close dispute; every action logged with audit trail
- **Export disputes** — Export filtered/selected disputes to Excel/CSV

## UI Requirements

### Sidebar Navigation
- Collapsible sidebar (toggle open/closed, remembers state)
- Two clickable items: All Disputes, My Disputes (no sub-items)

### Stage Tabs
- Horizontal tabs above table: Open | Under Review | Escalated | Resolved | Rejected
- Each tab shows count of disputes in that stage
- Tabs represent lifecycle stages, not filters

### Table Header
- Search bar (Dispute ID, linked entity)
- Filter controls: Type, Priority, Assigned To, Date Range
- Export button

### Disputes Table
- Columns: Dispute ID, Linked Entity (Incident ID / Subscriber / Customer), Dispute Type (Refund / Service / Payment / Legal Escalation), Raised By (Customer / Subscriber / Internal), Priority, Status, Created On, Last Updated, Assigned To, Source
- Checkbox selection per row with select-all in header
- Row-level action menu: Assign Reviewer, Escalate, Change Priority
- Pagination at bottom with page numbers, items per page selector, and total count

### Bulk Actions Bar
- Appears when one or more disputes selected
- Actions: Assign Reviewer, Change Priority
- No bulk resolution or bulk refund approvals (disputes are sensitive)
- All actions permission-controlled with confirmation

### Dispute Detail View (Full Page)
- Header: Back arrow, Dispute ID (e.g., DSP-12345), action buttons on right
- Two-column layout:
  - **Left sidebar**: SLA deadline with countdown/progress bar, linked entity info (incident/subscriber/customer snapshot), assigned reviewer
  - **Right content area with five tabs**:
    - **Summary tab**: Dispute reason, description, type, raised by, evidence submitted
    - **Linked Incident tab**: Read-only snapshot of incident outcome, timeline summary, financial outcome
    - **Investigation tab**: Internal review notes, decision reasoning log, reviewer comments
    - **Evidence tab**: Document uploads from both sides, file attachments
    - **Activity tab**: Chronological history of all actions and status changes
- Context-aware action buttons based on current stage (assign reviewer, escalate, approve refund, reject dispute, close dispute)
- Every action logged with mandatory audit trail

### SLA Enforcement
- Configurable SLA per dispute (default 7–15 days, unlike Incidents' fixed 45-day TAT)
- Escalation trigger if unresolved within SLA window
- Visual indicator (overdue shown in red)

### Permissions
- Only authorized roles can approve refunds, reject disputes, or escalate cases
- Mandatory audit trail for all actions

### General
- Permission-controlled actions throughout
- Real-time updates reflected in table after any action

## Configuration
- shell: true
