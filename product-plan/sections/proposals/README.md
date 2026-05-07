# Proposals

## Overview

Admin-side proposal management for receiving, reviewing, quoting, and converting customer service requests into incidents. Handles challans, DL verification, and RC verification requests.

## User Flows

- Triage new requests from Inbox tab
- Review proposals and send quotes
- Handle customer responses (accept/reject)
- Convert accepted proposals to incidents
- Reject proposals with reason selection
- Shared notes/chat between team and customer
- Bulk assign and bulk status update
- View dashboard summary cards

## Design Decisions

- 5-tab queue: Inbox, In Review, Quote Sent, Converted, Rejected
- Context-specific actions per tab (different actions available in each queue)
- Priority indicators on high-amount proposals (> 1,00,000)
- Indian currency formatting (2,40,000)
- Dashboard summary cards at top
- Relative dates for recent items ("2h ago"), absolute for older ("22 Mar 2026")

## Data Used

**Entities:** Proposal
**From global model:** Incident (conversion target), Customer/Subscriber

## Components Provided

- **ProposalList** — Main list view composing sidebar, queue tabs, table header, rows, and pagination
- **DashboardCards** — Summary metric cards displayed at the top showing counts per queue status
- **ProposalSidebar** — Left sidebar with queue navigation and count badges per status
- **ProposalQueueTabs** — Tab bar for switching between queue stages (Inbox, In Review, Quote Sent, Converted, Rejected)
- **ProposalTableHeader** — Column header row for the proposals table with sortable columns
- **ProposalRow** — Individual proposal row displaying key fields and context-specific action menu
- **SendQuoteModal** — Modal form for composing and sending a quote to the customer
- **RejectModal** — Modal for rejecting a proposal with reason selection and optional notes
- **ConvertToIncidentModal** — Modal for converting an accepted proposal into an incident
- **AssignModal** — Modal for assigning a proposal to a team member
- **BulkActionsBar** — Floating action bar for bulk operations on selected proposals (assign, update status)
- **Pagination** — Pagination controls for navigating through proposal pages
- **ProposalDetailView** — Full detail view for a single proposal with timeline, notes, and action buttons

## Callback Props

| Callback | Description |
|----------|-------------|
| `onPickUp` | Pick up proposal from inbox |
| `onAssign` | Assign to team member |
| `onSendQuote` | Send quote to customer |
| `onReject` | Reject with reason |
| `onConvertToIncident` | Convert to incident |
| `onUpdateServiceStatus` | Update service delivery status |
| `onBulkAssign` | Bulk assign proposals |
| `onBulkUpdateStatus` | Bulk status update |
| `onExport` | Export data |
