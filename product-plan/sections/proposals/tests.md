# Proposals Section -- Test Instructions

## Overview

The Proposals section handles admin-side proposal management for receiving, reviewing, quoting, and converting customer service requests (Challan, DL verification, RC verification) into incidents. It features dashboard summary cards, a 5-tab queue view with count badges, context-specific actions per tab, a detail view with 5 sub-tabs, modals for quoting/rejecting/converting, bulk operations, and Indian currency formatting.

---

## 1. User Flow Tests

### 1.1 Dashboard Summary Cards

**Success path:**
- The top of the proposals view displays 6 summary cards:
  - "New Requests" -- count of proposals in Inbox.
  - "In Review" -- count of proposals under review.
  - "Awaiting Response" -- count of proposals with quotes sent.
  - "Active Work" -- count of converted proposals with service in progress.
  - "Completed This Month" -- count of proposals completed in the current month.
  - "Total Value" -- sum of all proposal amounts, formatted in Indian currency (e.g., "₹24,50,000").
- Each card displays the correct count/value based on the current data.
- Cards update when proposals change status.

### 1.2 Queue Tabs

**Success path:**
- 5 tabs are displayed below the dashboard cards: "Inbox", "In Review", "Quote Sent", "Converted", "Rejected".
- Each tab shows a count badge with the number of proposals in that queue.
- Clicking a tab filters the table to show only proposals with the corresponding status.
- "Inbox" tab is active by default (showing proposals with status `sent`).
- Count badges update when proposals move between queues.

### 1.3 Table Display

**Success path:**
- The table displays columns: Request ID (monospace font), Customer (name + company), Type (color-coded badge), Qty, Amount (Indian rupee format), Created (relative dates like "2h ago"), Assigned To, Service Status, Linked Incident, Actions.
- **Type badges** are color-coded:
  - "Challan" -- amber/yellow badge.
  - "DL" -- purple badge.
  - "RC" -- sky/blue badge.
- **Amount formatting**: Uses Indian number format with rupee symbol (e.g., "₹2,40,000" not "₹240,000").
- **Created dates**: Show relative time for recent entries (e.g., "2h ago", "3d ago") and absolute dates for older entries (e.g., "22 Mar 2026").
- **Request ID**: Displayed in monospace font (e.g., "PRQ-001").
- **Priority indicator**: Proposals with amount > ₹1,00,000 show a priority indicator (icon, badge, or highlight).

### 1.4 Context Actions -- Inbox Tab

**Success path:**
- Each row in the Inbox tab shows action options: "Pick Up", "Assign", "View", "Reject".
- **Pick Up**: Clicking "Pick Up" assigns the proposal to the current user and moves it to "In Review". The row moves from Inbox to In Review tab. Count badges update.
- **Assign**: Clicking "Assign" opens an assignment modal/dropdown with a list of team members. Selecting a team member and confirming assigns the proposal and moves it to "In Review".
- **View**: Clicking "View" opens the detail view for that proposal.
- **Reject**: Clicking "Reject" opens the Reject modal (see section 1.10).

### 1.5 Context Actions -- In Review Tab

**Success path:**
- Each row shows: "Send Quote", "Reassign", "View", "Reject".
- **Send Quote**: Opens the Send Quote modal (see section 1.9).
- **Reassign**: Opens an assignment modal to change the assigned team member. After reassignment, the "Assigned To" column updates.
- **View**: Opens the detail view.
- **Reject**: Opens the Reject modal.

### 1.6 Context Actions -- Quote Sent Tab

**Success path:**
- Each row shows: "View", "Revise Quote", "Withdraw".
- **View**: Opens the detail view.
- **Revise Quote**: Opens the Send Quote modal pre-filled with the current quote amount, allowing the user to update it.
- **Withdraw**: Moves the proposal back to "In Review" status. A confirmation prompt appears before withdrawal.

### 1.7 Context Actions -- Converted Tab

**Success path:**
- Each row shows: "View", "Update Service Status", "View Incident".
- **View**: Opens the detail view.
- **Update Service Status**: Opens a dropdown or modal to change the service status (pending, in_progress, completed, not_applicable). The "Service Status" column updates.
- **View Incident**: Navigates to the linked incident (calls `onViewIncident` with the incident ID).

### 1.8 Context Actions -- Rejected Tab

**Success path:**
- Each row shows: "View", "Reopen".
- **View**: Opens the detail view.
- **Reopen**: Moves the proposal back to "Inbox" status. Count badges update accordingly.

### 1.9 Send Quote Modal

**Success path:**
- The modal displays fields:
  - Amount (number input, required) -- pre-filled if revising.
  - Breakdown (textarea, optional) -- for itemizing the quote.
  - Note to Customer (textarea, optional) -- message sent with the quote.
- Clicking "Send Quote" or "Submit" sends the quote. The proposal moves from "In Review" to "Quote Sent". The `onSendQuote` callback is called with `(id, amount, breakdown, note)`.

**Failure path:**
- Submitting without an amount shows a validation error: "Amount is required."
- Entering a zero or negative amount shows a validation error.
- Clicking "Cancel" closes the modal without sending.

### 1.10 Reject Modal

**Success path:**
- The modal displays fields:
  - Reason (dropdown, required) with options:
    - "Service not available for this case"
    - "Insufficient documentation"
    - "Out of service area"
    - "Duplicate request"
    - "Invalid/incorrect details"
    - "Customer request"
  - Note to Customer (textarea, optional).
- Clicking "Reject" or "Submit" rejects the proposal. The proposal moves to the "Rejected" tab. The `onReject` callback is called with `(id, reason, note)`.

**Failure path:**
- Submitting without selecting a reason shows a validation error: "Rejection reason is required."
- Clicking "Cancel" closes the modal without rejecting.

### 1.11 Convert to Incident Modal

**Success path:**
- The modal displays fields:
  - Incident ID (text input) -- auto-generated or manual entry.
  - Service Status (dropdown): pending, in_progress, completed, not_applicable.
  - Assigned Agent (dropdown of team members).
  - Notes (textarea, optional).
- Clicking "Convert" or "Submit" converts the proposal to an incident. The proposal moves to the "Converted" tab with the linked incident ID. The `onConvertToIncident` callback is called with `(id, incidentId, serviceStatus, assignedAgentId, notes)`.

**Failure path:**
- Submitting without required fields shows validation errors.
- Clicking "Cancel" closes the modal.

### 1.12 Detail View

**Success path:**
- Clicking "View" on any proposal opens a full detail view.
- The detail view header shows: customer info card (name, company, phone, email), assignment widget, amount (Indian rupee format), status badge, type badge (color-coded).
- A right sidebar displays: quick status change widget, assignment widget, amount/quote widget, service status widget, timeline summary.
- 5 tabs below the header: "Details", "Items", "Notes", "Activity Timeline", "Incidents".

**Details tab:**
- Shows proposal description, type, quantity, amount, created date, updated date, status, rejection reason (if rejected).

**Items tab:**
- For Challan proposals: shows challan items with Challan ID, Vehicle Number, Amount, Status.
- For DL proposals: shows DL items with Licence Number, Driver Name, Status.
- For RC proposals: shows RC items with RC Number, Vehicle Number, Status.
- Each item shows its individual status (pending / in_progress / completed).

**Notes tab:**
- Shows a shared comment thread between team and customer.
- Each comment shows author name, author type (team/customer badge), message, and timestamp.
- A text input and "Send" button at the bottom allow adding new comments.
- The `onSendComment` callback is called with `(proposalId, message)`.

**Activity Timeline tab:**
- Shows a chronological list of all actions taken on the proposal.
- Each entry shows: action type (status change or note), performed by, notes/details, timestamp.

**Incidents tab:**
- Shows the linked incident (if converted) with incident ID, status, and a link to view the full incident.
- If not converted, shows "No linked incidents" or equivalent.

### 1.13 Filters and Search

**Success path:**
- A search bar allows searching by Request ID, customer name, company name, or description.
- Filter controls allow filtering by: Type (Challan / DL / RC), Assigned To (team member dropdown), Date Range.
- Sort options: by date (newest/oldest), by amount (highest/lowest), by quantity.
- Filters apply within the currently active tab.

**Failure path:**
- No results matching search/filters shows an appropriate empty state.

### 1.14 Bulk Actions

**Success path:**
- Checkboxes appear on each table row.
- Selecting one or more rows reveals a bulk actions bar.
- **Bulk Assign**: Assigns all selected proposals to a chosen team member. The `onBulkAssign` callback is called with `(ids, teamMemberId)`.
- **Bulk Status Update**: Updates the status of all selected proposals. The `onBulkUpdateStatus` callback is called with `(ids, status)`.
- Deselecting all rows hides the bulk actions bar.

**Failure path:**
- Attempting bulk operations with no rows selected should not be possible (bulk bar hidden).

### 1.15 Pagination

**Success path:**
- The table displays 10 items per page.
- Pagination controls are visible when there are more than 10 proposals in the active tab.
- Navigating pages updates the displayed rows.
- Pagination resets to page 1 when switching tabs.

---

## 2. Empty State Tests

- **No proposals at all**: Dashboard cards show 0 for all counts and "₹0" for Total Value. The table shows "No proposals yet."
- **Empty Inbox tab**: "No new requests in the inbox."
- **Empty In Review tab**: "No proposals under review."
- **Empty Quote Sent tab**: "No quotes awaiting response."
- **Empty Converted tab**: "No converted proposals."
- **Empty Rejected tab**: "No rejected proposals."
- **No items in proposal**: The Items tab in the detail view shows "No items added to this proposal."
- **No notes**: The Notes tab shows "No notes yet. Start the conversation."
- **No activity**: The Activity Timeline tab shows "No activity recorded."
- **No search results**: "No proposals match your search criteria."
- **No linked incidents**: The Incidents tab shows "No linked incidents."

---

## 3. Component Interaction Tests

- **Tab switching with counts**: Clicking each of the 5 queue tabs updates the table and highlights the active tab. Count badges reflect accurate numbers for each queue.
- **Dashboard card accuracy**: Card values match the sum/count of proposals in each respective status.
- **Type badge colors**: "Challan" renders with amber background, "DL" with purple background, "RC" with sky/blue background.
- **Priority indicator threshold**: Only proposals with `amount > 100000` (₹1,00,000) show the priority indicator.
- **Currency formatting**: All amounts display in Indian format: ₹1,000 (one thousand), ₹1,00,000 (one lakh), ₹10,00,000 (ten lakh).
- **Relative date display**: Dates within the last 24 hours show as "Xh ago". Dates within the last 7 days show as "Xd ago". Older dates show as "22 Mar 2026" format.
- **Request ID monospace**: The Request ID column uses a monospace font family distinct from the body text.
- **Sidebar widgets**: The right sidebar in the detail view updates reactively when status, assignment, or amount changes.
- **Comment thread ordering**: Notes in the Notes tab are ordered chronologically (oldest first).
- **Status transitions**: Status changes follow valid transitions:
  - sent -> under_review (via Pick Up / Assign)
  - under_review -> received (via Send Quote -- status becomes "received" / "Quote Sent" tab)
  - received -> converted (via Convert to Incident)
  - sent / under_review -> rejected (via Reject)
  - rejected -> sent (via Reopen)
  - received -> under_review (via Withdraw)

---

## 4. Edge Cases

- **Very large amounts**: Proposals with amounts like ₹99,99,99,999 should format correctly in Indian notation.
- **Zero amount**: A proposal with amount = 0 should display as "₹0" and not show a priority indicator.
- **Long customer names**: Customer names or company names exceeding 60+ characters should truncate with ellipsis in the table but show full text in the detail view.
- **Many proposals in one tab**: A tab with 500+ proposals should paginate correctly at 10 per page (50 pages).
- **Rapid status changes**: Quickly picking up and then rejecting a proposal should result in the correct final state (rejected).
- **Reopen then pick up again**: Reopening a rejected proposal should place it back in Inbox, and picking it up should move it to In Review.
- **Revise quote multiple times**: A proposal can have its quote revised multiple times. Each revision should update the amount and log in the activity timeline.
- **Bulk assign across different statuses**: Bulk assign should only apply to proposals in valid states for assignment (Inbox).
- **Convert without items**: Converting a proposal that has no items should still succeed.
- **Long rejection reason note**: A rejection note with 1000+ characters should be accepted and displayed correctly.
- **Special characters in notes**: Notes containing HTML-like characters (<, >, &) should render as text, not HTML.
- **Withdraw quote**: Withdrawing a quote should move the proposal back to In Review and clear the sent quote metadata.
- **Concurrent assignment**: If two team members try to pick up the same proposal simultaneously, only one should succeed.

---

## 5. Accessibility Checks

- All 5 queue tabs are keyboard-navigable and activated with Enter or Space.
- Count badges on tabs are conveyed to screen readers (e.g., "Inbox, 5 items").
- Dashboard summary cards have accessible labels (e.g., "New Requests: 12").
- Type badges (Challan, DL, RC) convey meaning via text, not color alone.
- Priority indicators have `aria-label` or tooltip text (e.g., "High priority -- amount exceeds ₹1,00,000").
- Modal forms (Send Quote, Reject, Convert to Incident) trap focus and are dismissible with Escape.
- All modal form fields have visible labels.
- The bulk actions bar is announced to screen readers when it appears.
- Checkbox selection in tables is keyboard-accessible (Space to toggle).
- The right sidebar in the detail view is navigable via keyboard.
- Table headers have `<th>` elements with proper scope.
- Color contrast meets WCAG AA for all badges, text, and interactive elements in both light and dark modes.
- The comment input in the Notes tab has a label (e.g., "Add a note").
- Action buttons (Pick Up, Assign, View, Reject, etc.) are keyboard-focusable and activated with Enter.

---

## 6. Sample Test Data

### Dashboard Stats

```
newRequests: 5
inReview: 3
awaitingResponse: 4
activeWork: 2
completedThisMonth: 8
totalValue: 2450000  (displayed as ₹24,50,000)
```

### Proposals

| id | displayId | type | customer.name | customer.company | quantity | amount | status | serviceStatus | assignedTo | linkedIncidentId | createdAt |
|----|-----------|------|--------------|-----------------|----------|--------|--------|---------------|-----------|-----------------|-----------|
| P-001 | PRQ-001 | Challan | Rahul Sharma | ABC Logistics | 5 | 240000 | sent | null | null | null | 2026-04-28T08:00:00Z |
| P-002 | PRQ-002 | DL | Priya Patel | XYZ Transport | 10 | 50000 | under_review | null | Amit Verma | null | 2026-04-27T14:30:00Z |
| P-003 | PRQ-003 | RC | Neha Singh | Fleet Corp | 3 | 180000 | received | null | Priya Patel | null | 2026-04-25T10:00:00Z |
| P-004 | PRQ-004 | Challan | Deepak Kumar | Road Runners | 20 | 500000 | converted | in_progress | Amit Verma | IRN-101 | 2026-04-20T09:00:00Z |
| P-005 | PRQ-005 | DL | Kavita Reddy | SafeDrive Inc | 2 | 15000 | rejected | null | null | null | 2026-04-18T11:00:00Z |
| P-006 | PRQ-006 | Challan | Suresh Iyer | Metro Movers | 8 | 150000 | sent | null | null | null | 2026-04-28T06:00:00Z |

### Team Members (for assignment)

| id | name | role |
|----|------|------|
| TM-001 | Amit Verma | Operations Manager |
| TM-002 | Priya Patel | Senior Executive |
| TM-003 | Neha Singh | Operations Executive |

### Proposal Items (for P-001, Challan type)

| id | challanId | vehicleNumber | amount | status |
|----|-----------|---------------|--------|--------|
| ITEM-001 | CH-5001 | MH04AB1234 | 48000 | pending |
| ITEM-002 | CH-5002 | MH04AB1234 | 48000 | pending |
| ITEM-003 | CH-5003 | MH04CD5678 | 48000 | pending |
| ITEM-004 | CH-5004 | MH04CD5678 | 48000 | pending |
| ITEM-005 | CH-5005 | MH04EF9012 | 48000 | pending |

### Comments (for P-002)

| id | authorType | authorName | message | createdAt |
|----|-----------|------------|---------|-----------|
| CMT-001 | user | Priya Patel | We have received your request for DL verification of 10 licences. | 2026-04-27T15:00:00Z |
| CMT-002 | team | Amit Verma | Reviewing the documents now. Will send a quote shortly. | 2026-04-27T16:30:00Z |
| CMT-003 | user | Priya Patel | Thank you. Please expedite if possible. | 2026-04-27T17:00:00Z |

### Rejection Reasons

```
- "Service not available for this case"
- "Insufficient documentation"
- "Out of service area"
- "Duplicate request"
- "Invalid/incorrect details"
- "Customer request"
```

### Currency Formatting Test Cases

| Raw Amount | Expected Display |
|-----------|-----------------|
| 1000 | ₹1,000 |
| 50000 | ₹50,000 |
| 100000 | ₹1,00,000 |
| 240000 | ₹2,40,000 |
| 500000 | ₹5,00,000 |
| 2450000 | ₹24,50,000 |
| 10000000 | ₹1,00,00,000 |

### Priority Threshold Test Cases

| Amount | Priority Indicator Shown? |
|--------|--------------------------|
| 99999 | No |
| 100000 | No (threshold is strictly greater than) |
| 100001 | Yes |
| 150000 | Yes |
| 500000 | Yes |
