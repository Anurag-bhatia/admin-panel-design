# Incidents Specification

## Overview
The Incidents module is a queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. It replaces manual tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages.

## User Flows
- **Navigate to Incidents** — Opens dedicated workspace with collapsible sidebar; toggle between All Incidents (full workload by permissions) and My Incidents (user's assigned work)
- **Select work type** — Sidebar sub-sections for Cases (empty for now) and Challans (core execution flow)
- **View challan queues** — Table view with queue tabs: New Incidents, Screening, Lawyer Assigned, Settled, Not Settled, Refund; each challan exists in exactly one queue
- **Scan challans** — Table displays Incident ID, Subscriber Name (with ID beneath), Vehicle, Type (Pay & Close / Contest), Status, Created Date/Time, Last Updated, Assigned Agent, Assigned Lawyer, Source
- **Add new challan** — Click Add Challan button; form captures challan details, subscriber/customer link, vehicle, type, and source; challan lands in New Incidents queue
- **Search and filter challans** — Search by Incident ID, subscriber name, vehicle number; filter by type, status, assigned agent, assigned lawyer, date range
- **Select multiple challans** — Checkbox selection enables Bulk Actions bar
- **Validate challans** — Select challans and click Validate; API checks against external source; results screen shows which challans exist, already disposed, or other status
- **Screen challans** — Select challans and click Screen; API screens from backend; results table shows Challan Number, State, Disposed or Not, Offence
- **Bulk update challans** — Select challans and click Bulk Update; popup opens for Excel/CSV upload; system updates challans based on file data
- **Perform bulk operations** — Assign/reassign agent, assign/reassign lawyer, move between queues; all permission-controlled with confirmation
- **Perform single-ticket operations** — Row-level action menu with same operations as bulk
- **Open challan detail** — Full-page view with Incident ID header and tabbed content: Follow Up, Timeline, Details
- **Add follow-up** — In Follow Up tab, log follow-up activity with notes, outcome, and next follow-up date
- **Upload documents** — Attach files (receipts, court documents, etc.) to challan from Details tab
- **Export challans** — Export filtered/selected challans to Excel/CSV for reporting
- **Execute stage-specific actions** — Only actions valid for current queue are shown; changes reflect immediately in table

## UI Requirements

### Sidebar Navigation
- Collapsible sidebar (toggle open/closed, remembers state)
- Primary tabs: All Incidents, My Incidents
- Sub-sections within each tab: Cases (empty for now), Challans

### Queue Tabs
- Horizontal tabs above table: New Incidents → Screening → Lawyer Assigned → Settled → Not Settled → Refund
- Each tab shows count of challans in that queue
- Tabs represent execution stages, not filters

### Table Header
- Add Challan button
- Search bar (Incident ID, subscriber name, vehicle number)
- Filter controls: Type, Status, Assigned Agent, Assigned Lawyer, Date Range
- Export button

### Challans Table
- Columns: Incident ID, Subscriber Name (with Subscriber ID beneath), Vehicle, Type (Pay & Close / Contest), Status, Created Date/Time, Last Updated, Assigned Agent, Assigned Lawyer, Source
- Checkbox selection per row with select-all in header
- Row-level action menu: Validate, Screen, Assign Agent, Assign Lawyer, Move Queue, Update
- Pagination at bottom with page numbers, items per page selector, and total count

### Bulk Actions Bar
- Appears when one or more challans selected
- Actions: Validate, Screen, Assign Agent, Assign Lawyer, Move Queue, Bulk Update
- All actions permission-controlled with confirmation

### Validate Results Screen
- Displays after bulk validate completes
- Shows per-challan status: exists, already disposed, or other status

### Screen Results Table
- Displays after bulk screen completes
- Summary cards: Total Screened, Already Disposed, Pending to Dispose (white background with colored icons)
- Filters dropdown: State, Virtual Status, Disposed, Document Impound, Vehicle Impound
- Columns: Violater Name, Challan Number, State, Challan Date, Offence, Place, RTO Name, Amount, Virtual Status (01, 02, 03), Virtual Amount, Status, Physical Court Status, Vehicle Impound (Yes/No), Document Impound (RC, DL, RC+DL, None), Disposed (Yes/No with checkmark)

### Bulk Update Popup
- Modal dialog with Excel/CSV file upload
- System updates challans based on uploaded file data

### Add Expense Modal
- Modal dialog for recording payment/expense details against a challan
- Fields: Total Amount Received, Challan Amount, Convenience Fee, GST, Gateway Charges, Discount

### Add Challan Form
- Modal or slide-over with fields for challan details
- "Challan" dropdown field (options: Court, Online) — no "Challan" option in dropdown
- Link to subscriber/customer, vehicle, type, source
- Saves to New Incidents queue

### Challan Detail View (Full Page)
- Header: Back arrow, Incident ID (e.g., IRN-12345), action buttons (Validate, Screen) on right
- Two-column layout:
  - **Left sidebar**: TAT Deadline with countdown/progress bar, Subscriber info, Vehicle info with tags, Assignments (agent, lawyer)
  - **Right content area with four tabs**:
    - **Activity tab**: Sub-tabs for Follow-Up and Activity Log; "+ Add Follow-Up" button; follow-up cards show status badge, next date, notes, author; activity log shows chronological history of all actions
    - **Notes tab**: Free-form notes section for internal communication
    - **Details tab**: Challan information, documents section with upload
    - **Call Summary tab**: List of call recordings with expandable details showing summary, key points, sentiment, and next steps; play recording button
- Context-aware action buttons based on current queue
- 45-day TAT enforcement with visual indicator (overdue shown in red)

### General
- Permission-controlled actions throughout
- Real-time updates reflected in table after any action

## Configuration
- shell: true
