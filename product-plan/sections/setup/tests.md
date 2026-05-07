# Setup (Admin Control) Section -- Test Instructions

## Overview

The Setup section is the centralized configuration hub for managing system-wide categories, data points, statuses, sources, service types, geographic values, and audit logs. It features a tabbed layout with data tables, a slide-over panel for add/edit forms, drag-to-reorder, per-section history, a global audit log, and protected core values.

---

## 1. User Flow Tests

### 1.1 Browse Configuration Areas

**Success path:**
- Landing on the Setup section displays a tabbed dashboard with horizontal tabs: Services, Price Categories, Departments, Designations, Masters, Geographic Values, Audit Log.
- The first tab (Services) is active by default.
- Switching tabs updates the table content to show entries relevant to that configuration area.
- Each tab's data table displays columns appropriate to its type:
  - **Services**: Name, Type (Against Vehicle / Topup Service), Category (Private Vehicles / Commercial Vehicle), Slug, Credits, Status, Description, Modified By, Modified At.
  - **Price Categories**: Name, Increase By (%), Description, Status, Protected (locked icon), Modified By, Modified At.
  - **Departments**: Name, Icon, Status, Head Count, Modified By, Modified At.
  - **Designations**: Title, Department Name, Icon, Status, Modified By, Modified At.
  - **Masters**: Name, Description, Usage Modules, Icon, Status, Value Count, Modified By, Modified At.
  - **Geographic Values**: Name, Level (Country / State / City), Parent, Code, Status, Modified By, Modified At.

**Failure path:**
- If data fails to load for a tab, display an error state within the table area.

### 1.2 Add a New Entry

**Success path:**
- Clicking the "Add" button above the table opens a slide-over panel from the right side.
- The main table remains visible behind the slide-over panel.
- The slide-over displays a creation form with fields relevant to the active tab:
  - **Services**: Name, Type (dropdown: Against Vehicle, Topup Service), Category (dropdown: Private Vehicles, Commercial Vehicle), Slug, Credits (number), Description, Status (toggle).
  - **Price Categories**: Name, Increase By (number/%), Description, Status (toggle).
  - **Departments**: Name, Icon, Status (toggle).
  - **Designations**: Title, Department (dropdown of existing departments), Icon, Status (toggle).
  - **Masters**: Name, Description, Usage Modules (multi-select from: Incidents, Leads, Subscribers, Customers, Lawyers, Partners, Payments, Disputes, Support, Reports, Team), Icon, Status (toggle).
  - **Geographic Values**: Name, Level (dropdown: Country, State, City), Parent (dropdown filtered by hierarchy -- countries have no parent, states select a country, cities select a state), Code, Status (toggle).
- User fills in all required fields and clicks "Save" or "Create".
- The slide-over closes, and the new entry appears in the table.

**Failure path:**
- Submitting with required fields empty shows inline validation errors within the slide-over.
- Submitting a duplicate name shows an appropriate error message.
- Clicking "Cancel" or closing the slide-over discards unsaved data and does not create an entry.

### 1.3 Edit an Existing Entry

**Success path:**
- Clicking a row in the table opens the slide-over panel pre-filled with that entry's data.
- User modifies one or more fields and clicks "Save" or "Update".
- The slide-over closes, and the table row reflects the updated values.
- The modification is logged in the audit trail (the "Modified By" and "Modified At" columns update).

**Failure path:**
- If a protected core value row is clicked, the slide-over opens but all fields are read-only / disabled, with a tooltip or banner explaining "This is a protected core value and cannot be edited."

### 1.4 Deactivate / Reactivate an Entry

**Success path:**
- Toggling the status between "Active" and "Inactive" (via slide-over toggle or inline toggle in the table) updates the status badge.
- Inactive entries show a grey or muted "Inactive" badge.
- Inactive entries are hidden from future dropdown selections across the platform but remain visible in the Setup table.
- The status change is logged in the audit trail.

**Failure path:**
- Attempting to deactivate a protected core value is blocked. The toggle is disabled or a tooltip shows "Protected values cannot be deactivated."

### 1.5 Drag-to-Reorder Rows

**Success path:**
- User clicks and drags a table row to a new position within the table.
- The row order updates visually during and after the drag.
- The new order persists (reflected in dropdown display order across the platform).
- The reorder action is logged in the audit trail.

**Failure path:**
- Protected/locked rows cannot be dragged or reordered.
- Dropping a row outside valid positions snaps it back to its original position.

### 1.6 View Per-Section Audit History

**Success path:**
- Each configuration tab (Services, Price Categories, etc.) has a "History" sub-tab.
- Clicking the "History" sub-tab shows a timeline of changes made within that specific configuration area.
- Each history entry shows: who made the change, what was changed (field, old value, new value), and when.

### 1.7 View Global Audit Log

**Success path:**
- Clicking the "Audit Log" tab (the last top-level tab) shows a filterable timeline of all configuration changes across all areas.
- The audit log table displays: Area (e.g., "Services", "Departments"), Action (e.g., "created", "updated", "deleted", "value_added", "value_deactivated", "reordered"), Record Name, Field, Old Value, New Value, Performed By, Performed At.
- Filters are available for: Area (dropdown), Performed By (dropdown of users), Date Range (date picker).
- Applying filters narrows the displayed audit entries.
- Clearing filters restores the full audit log.

**Failure path:**
- If no audit entries match the applied filters, display a message like "No audit entries match your filters."

### 1.8 Search and Filter

**Success path:**
- A search bar allows searching entries by name within the active tab.
- Typing in the search bar filters the table rows in real time (or on submit).
- Filter controls allow filtering by status (Active / Inactive) and usage module.
- Combining search text with filters narrows results to entries matching all criteria.

**Failure path:**
- If no results match the search/filter, display "No results found" within the table.

### 1.9 Admin-Only Access

**Success path:**
- Admin users can access the Setup module and see all tabs and actions.

**Failure path:**
- Non-admin users should see the Setup module hidden from the navigation, or if they navigate directly, they see an "Access Denied" or "Insufficient Permissions" message.

### 1.10 Masters -- Value Management

**Success path:**
- Clicking a master entry (or a "View Values" action) opens its list of master values.
- Master values show: Value, Status (Active/Inactive), Sort Order.
- User can add a new value via "Add Value" button.
- User can edit an existing value.
- User can toggle a value's status (active/inactive).
- User can drag-to-reorder values within a master.

---

## 2. Empty State Tests

- **No entries in a tab**: When a configuration tab has no entries, display "No [tab name] configured yet" with an "Add" button.
- **No audit log entries**: The Audit Log tab shows "No configuration changes recorded" when empty.
- **No history for a section**: The per-section History sub-tab shows "No changes recorded for this section" when empty.
- **No search results**: Searching with a term that matches nothing shows "No results found for '[search term]'."
- **No master values**: A master with zero values shows "No values added yet" with an "Add Value" button.

---

## 3. Component Interaction Tests

- **Tab switching**: Clicking any of the 7 tabs (Services, Price Categories, Departments, Designations, Masters, Geographic Values, Audit Log) updates the active tab styling and the displayed content. Only one tab is active at a time.
- **Slide-over panel open/close**: Clicking "Add" or a row opens the slide-over from the right. The table is still visible behind the panel. Clicking "Cancel", the close button, or the backdrop (if applicable) closes the slide-over.
- **Slide-over pre-fill on edit**: When editing, the slide-over form fields are populated with the selected entry's current values.
- **Status toggle interaction**: The active/inactive toggle in the slide-over and/or inline in the table correctly calls `onToggleService`, `onTogglePriceCategory`, etc., with the correct ID and new status.
- **Protected value lockout**: Rows with `isProtected: true` show a lock icon. Clicking them opens a read-only slide-over. The status toggle is disabled. Edit and delete actions are disabled or hidden.
- **Geographic hierarchy**: When adding/editing a geographic value, selecting level "Country" hides the parent selector. Selecting "State" shows a parent dropdown filtered to countries only. Selecting "City" shows a parent dropdown filtered to states only.
- **Drag handle visibility**: Each draggable row shows a drag handle icon on hover or always visible.
- **Audit log filter combination**: Applying multiple audit log filters (area + user + date range) correctly intersects them.

---

## 4. Edge Cases

- **Long entry names**: Names exceeding 80+ characters should truncate with ellipsis in the table but show full text in the slide-over.
- **Many master values**: A master with 100+ values should paginate or scroll within the values panel without layout breakage.
- **Rapid tab switching**: Quickly switching between tabs should not show stale data from a previous tab.
- **Concurrent editing**: If two admins edit the same entry simultaneously, the last save wins, and the audit log records both changes.
- **Deactivating a department with active employees**: The system should warn or block deactivation if employees are assigned to that department.
- **Deactivating a designation linked to employees**: Similar warning/block behavior.
- **Circular geographic hierarchy**: The parent dropdown for a geographic value should not allow selecting itself or its descendants as a parent.
- **Reorder with only one row**: If a tab has only one entry, drag-to-reorder should be a no-op (no visual drag handles or drag disabled).
- **Empty description field**: Entries with no description should display gracefully (empty cell, not "undefined" or "null").
- **Special characters in names**: Names with characters like &, <, >, ", ' should render correctly and not break HTML or form inputs.

---

## 5. Accessibility Checks

- All tabs are keyboard-navigable using arrow keys and activated with Enter/Space.
- The slide-over panel traps focus when open and returns focus to the triggering element when closed.
- The slide-over panel can be closed with the Escape key.
- All form fields within the slide-over have visible labels or `aria-label` attributes.
- Status badges ("Active" / "Inactive") convey status via text and/or `aria-label`, not color alone.
- Protected/locked entries have a tooltip or `aria-description` explaining why they cannot be edited.
- Drag-to-reorder has keyboard alternatives (e.g., "Move Up" / "Move Down" buttons or arrow key support).
- Data tables have proper `<table>`, `<thead>`, `<tbody>`, `<th>` semantics (or equivalent ARIA roles).
- Color contrast meets WCAG AA for all text, badges, and icons in both light and dark modes.
- Screen readers announce the active tab name when tabs are switched.

---

## 6. Sample Test Data

### Services

| id | name | type | category | slug | credits | status | description |
|----|------|------|----------|------|---------|--------|-------------|
| SVC-001 | Challan Settlement | Against Vehicle | Private Vehicles | challan-settlement | 1 | active | Full challan settlement service |
| SVC-002 | DL Verification | Topup Service | Private Vehicles | dl-verification | 2 | active | Driving licence verification |
| SVC-003 | Fleet Challan Check | Against Vehicle | Commercial Vehicle | fleet-challan | 3 | inactive | Bulk fleet challan checking |

### Price Categories

| id | name | increaseBy | description | status | isProtected |
|----|------|-----------|-------------|--------|-------------|
| PC-001 | Standard | 0 | Default pricing tier | active | true |
| PC-002 | Premium | 25 | Premium tier with 25% markup | active | false |
| PC-003 | Enterprise | 50 | Enterprise tier with 50% markup | inactive | false |

### Departments

| id | name | status | headCount |
|----|------|--------|-----------|
| DEPT-001 | Engineering | active | 12 |
| DEPT-002 | Operations | active | 8 |
| DEPT-003 | Sales | active | 5 |
| DEPT-004 | Customer Support | inactive | 0 |

### Designations

| id | title | departmentName | status |
|----|-------|---------------|--------|
| DES-001 | Senior Developer | Engineering | active |
| DES-002 | Operations Manager | Operations | active |
| DES-003 | Sales Executive | Sales | active |

### Masters

| id | name | usageModules | status | valueCount |
|----|------|-------------|--------|------------|
| MST-001 | Offence Types | Incidents, Disputes | active | 15 |
| MST-002 | Lead Sources | Leads | active | 8 |
| MST-003 | Document Types | Subscribers, Customers | active | 6 |

### Geographic Values

| id | name | level | parentId | code | status |
|----|------|-------|----------|------|--------|
| GEO-001 | India | country | null | IN | active |
| GEO-002 | Maharashtra | state | GEO-001 | MH | active |
| GEO-003 | Mumbai | city | GEO-002 | MUM | active |
| GEO-004 | Karnataka | state | GEO-001 | KA | active |
| GEO-005 | Bengaluru | city | GEO-004 | BLR | active |

### Audit Entries

| id | area | action | recordName | field | oldValue | newValue | performedBy | performedAt |
|----|------|--------|-----------|-------|----------|----------|-------------|-------------|
| AUD-001 | Services | created | Challan Settlement | -- | -- | -- | Admin User | 2026-03-01T10:00:00Z |
| AUD-002 | Departments | updated | Customer Support | status | active | inactive | Admin User | 2026-03-15T14:30:00Z |
| AUD-003 | Masters | value_added | Offence Types | -- | -- | Over Speeding | Priya Patel | 2026-04-01T09:15:00Z |
| AUD-004 | Geographic | reordered | -- | -- | -- | -- | Admin User | 2026-04-10T11:00:00Z |
