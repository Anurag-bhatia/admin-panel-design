# Settled Challans Section -- Test Instructions

## Overview

The Settled Challans section provides a read-only table view for browsing all settled challans. It supports search across all fields, filtering by date range, subscriber, state, and amount, export to CSV/Excel, and pagination. There is no row click, detail view, or editing capability.

---

## 1. User Flow Tests

### 1.1 View Settled Challans Table

**Success path:**
- Landing on the Settled Challans section displays a paginated table.
- The table displays columns: Vehicle No, Subscriber, Challan No, Offence Name.
- All rows are read-only -- no edit icons, no clickable links, no row hover action.
- Clicking a row does nothing (no navigation, no modal, no detail view).
- Pagination controls are visible below the table.

**Failure path:**
- If data fails to load, an error message is shown in place of the table.

### 1.2 Search Across All Fields

**Success path:**
- A search bar is displayed above the table.
- Typing a query filters the table rows by matching across all fields: vehicle number, subscriber name, challan number, and offence name.
- Searching for a vehicle number (e.g., "MH04AB1234") shows only rows with matching vehicle numbers.
- Searching for a subscriber name (e.g., "Sharma") shows all rows where the subscriber name contains "Sharma".
- Searching for a challan number (e.g., "CH-2026-001") returns the matching challan.
- Searching for an offence name (e.g., "Over Speeding") returns all rows with that offence.
- Partial matches work (e.g., searching "MH04" returns all Maharashtra-registered vehicles starting with MH04).
- Clearing the search input restores all rows.

**Failure path:**
- Searching for a term that matches nothing displays an appropriate empty state.

### 1.3 Filter by Date Range

**Success path:**
- A date range filter is available with "From" and "To" date pickers.
- Selecting a date range filters the table to show only challans settled within that range (based on `settledDate`).
- Selecting only a "From" date shows challans settled on or after that date.
- Selecting only a "To" date shows challans settled on or before that date.
- Clearing date filters restores all rows.

### 1.4 Filter by Subscriber

**Success path:**
- A subscriber filter (dropdown or text input) is available.
- Selecting or typing a subscriber name filters the table to show only challans for that subscriber.
- The filter can be cleared to restore all rows.

### 1.5 Filter by State

**Success path:**
- A state filter (dropdown) is available.
- Selecting a state (e.g., "Maharashtra", "Karnataka") filters the table to show only challans from that state.
- The filter can be cleared.

### 1.6 Filter by Amount

**Success path:**
- Amount filter controls are available (minimum and/or maximum amount inputs).
- Setting a minimum amount shows only challans with `amount >= minimum`.
- Setting a maximum amount shows only challans with `amount <= maximum`.
- Setting both creates a range filter.
- The filter can be cleared.

### 1.7 Combined Filters and Search

**Success path:**
- Search and all filters (date range, subscriber, state, amount) can be applied simultaneously.
- The table shows only rows matching ALL applied criteria (intersection/AND logic).
- Removing one filter broadens the results while respecting remaining filters.

### 1.8 Export to CSV/Excel

**Success path:**
- An "Export" button is visible above or near the table.
- Clicking "Export" triggers a file download.
- The exported file contains the currently filtered/searched data (not the entire dataset if filters are applied).
- The export contains columns matching the table: Vehicle No, Subscriber, Challan No, Offence Name.
- The `onExport` callback is invoked.

**Failure path:**
- If export fails (e.g., network error), an error message is shown.

### 1.9 Pagination

**Success path:**
- The table displays a fixed number of rows per page (e.g., 10 or 25).
- Pagination controls (Previous, Next, page numbers) are visible below the table.
- Clicking "Next" loads the next page of results.
- Clicking "Previous" loads the previous page.
- Clicking a specific page number jumps to that page.
- The current page number is visually highlighted.
- The `onPageChange` callback is called with the target page number.
- Pagination respects active search/filter criteria (paginating through filtered results).

**Failure path:**
- On the first page, the "Previous" button is disabled.
- On the last page, the "Next" button is disabled.

---

## 2. Empty State Tests

- **No settled challans**: When the entire table is empty (no data at all), display "No settled challans found" or equivalent empty state message.
- **No search results**: Searching with a term that matches nothing shows "No settled challans match your search."
- **No filter results**: Applying filters that exclude all records shows "No settled challans match the selected filters."
- **Combined empty**: If both search and filters are active and yield no results, the empty state message should reference the active criteria.

---

## 3. Component Interaction Tests

- **Search input**: Typing in the search bar calls `onSearch` with the current query string. Clearing the input calls `onSearch` with an empty string.
- **Filter apply**: Changing any filter value calls `onFilter` with the complete filters object (`{ dateFrom, dateTo, subscriber, state, amountMin, amountMax }`).
- **Filter reset**: Clearing all filters calls `onFilter` with an empty or default filters object.
- **Export button**: Clicking the export button calls `onExport`. The button should indicate the export is in progress if it takes time (loading spinner or "Exporting..." text).
- **Pagination controls**: Clicking page navigation calls `onPageChange` with the correct page number. The active page is visually distinguished.
- **Read-only enforcement**: No row click handler exists. No edit/delete/view actions appear. The cursor should not show a pointer on row hover.
- **Search + pagination reset**: Applying a new search query or filter should reset pagination to page 1.

---

## 4. Edge Cases

- **Very long vehicle numbers**: Vehicle numbers with unusual lengths (e.g., temporary registration numbers) should render without breaking the table layout.
- **Very long offence names**: Offence names exceeding 100+ characters should truncate with ellipsis in the table cell.
- **Large dataset**: A table with 10,000+ settled challans should paginate efficiently without loading all data at once.
- **Amount edge values**: Challans with amount = 0 should display correctly. Very large amounts (e.g., 10,00,000) should display in proper Indian number format if applicable.
- **Same challan number**: Multiple rows with the same challan number (if possible in the data) should all display without merging or deduplication.
- **Special characters in subscriber name**: Subscriber names with apostrophes (e.g., "O'Brien"), hyphens, or international characters should render correctly.
- **Date format consistency**: All settled dates should display in a consistent format throughout the table.
- **Empty subscriber email/phone**: The table does not show email or phone columns, but the data model includes them. These fields should not leak into the UI.
- **Export with no data**: Clicking export when the table is empty (due to filters) should either export an empty file with headers only or show a message like "Nothing to export."
- **Rapid filter changes**: Changing filters quickly in succession should not cause race conditions or display stale data.

---

## 5. Accessibility Checks

- The search bar has a visible label or `aria-label` (e.g., "Search settled challans").
- Filter controls have associated labels (e.g., "Date From", "Date To", "Subscriber", "State", "Minimum Amount", "Maximum Amount").
- The "Export" button has descriptive text (not just an icon).
- The data table uses proper semantic markup (`<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>`) or equivalent ARIA roles.
- Pagination controls are keyboard-navigable and announce the current page to screen readers (e.g., "Page 2 of 15").
- Disabled pagination buttons (Previous on first page, Next on last page) have `aria-disabled="true"`.
- No interactive row elements exist (confirming read-only nature for assistive technology users).
- Color contrast meets WCAG AA for all text and UI elements in both light and dark modes.
- Date pickers in filters are keyboard-accessible.

---

## 6. Sample Test Data

### Settled Challans

| id | vehicleNo | subscriber | subscriberEmail | subscriberPhone | challanNo | offenceName | state | amount | settledDate |
|----|-----------|-----------|-----------------|-----------------|-----------|-------------|-------|--------|-------------|
| SC-001 | MH04AB1234 | Rahul Sharma | rahul@example.com | +91 98765 43210 | CH-2026-001 | Over Speeding | Maharashtra | 2000 | 2026-03-15 |
| SC-002 | KA01CD5678 | Priya Patel | priya@example.com | +91 98765 43211 | CH-2026-002 | Red Light Violation | Karnataka | 5000 | 2026-03-20 |
| SC-003 | DL10EF9012 | Amit Verma | amit@example.com | +91 98765 43212 | CH-2026-003 | Driving Without Licence | Delhi | 10000 | 2026-04-01 |
| SC-004 | MH04GH3456 | Neha Singh | neha@example.com | +91 98765 43213 | CH-2026-004 | No Helmet | Maharashtra | 1000 | 2026-04-05 |
| SC-005 | TN01IJ7890 | Deepak Kumar | deepak@example.com | +91 98765 43214 | CH-2026-005 | Wrong Side Driving | Tamil Nadu | 3000 | 2026-04-10 |
| SC-006 | KA05KL2345 | Kavita Reddy | kavita@example.com | +91 98765 43215 | CH-2026-006 | Over Speeding | Karnataka | 4000 | 2026-04-12 |
| SC-007 | MH12MN6789 | Suresh Iyer | suresh@example.com | +91 98765 43216 | CH-2026-007 | Using Mobile While Driving | Maharashtra | 5000 | 2026-04-15 |

### Filter Test Scenarios

| Scenario | Filters Applied | Expected Results |
|----------|----------------|-----------------|
| Date range | dateFrom: 2026-04-01, dateTo: 2026-04-15 | SC-003, SC-004, SC-005, SC-006, SC-007 |
| State filter | state: Maharashtra | SC-001, SC-004, SC-007 |
| Amount range | amountMin: 3000, amountMax: 5000 | SC-002, SC-005, SC-006, SC-007 |
| Subscriber search | subscriber: Sharma | SC-001 |
| Combined | state: Karnataka, amountMin: 4000 | SC-006 |
| No results | state: Gujarat | (empty) |

### Search Test Scenarios

| Search Query | Expected Matches |
|-------------|-----------------|
| "MH04" | SC-001, SC-004 |
| "Over Speeding" | SC-001, SC-006 |
| "Priya" | SC-002 |
| "CH-2026-003" | SC-003 |
| "XYZ999" | (empty -- no matches) |
