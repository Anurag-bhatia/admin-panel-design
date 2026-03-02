# Payments Specification

## Overview
The Payments module handles refund processing and lawyer fee management through a unified workspace mirroring the Disputes layout. It provides a collapsible sidebar to switch between Refunds (customer/subscriber refund processing) and Lawyer Fees (commission and expense tracking linked to incidents and lawyers).

## User Flows
- **Navigate to Payments** — Opens workspace with collapsible sidebar; click Refunds or Lawyer Fees to switch views
- **View refund stages** — Table view with horizontal stage tabs: To Refund, Completed
- **Scan refunds** — Table displays Refund ID, Linked Incident, Customer/Subscriber, Original Payment ID, Refund Amount, Refund Status (Initiated / Approved / Completed), Approved By, Refund Date
- **Search and filter refunds** — Search by Refund ID, linked incident, customer/subscriber; filter by status, date range
- **Select multiple refunds** — Checkbox selection enables Bulk Actions bar
- **Perform bulk refund operations** — Bulk approve, bulk process refunds; all permission-controlled with confirmation
- **Export refunds** — Export filtered/selected refunds to Excel/CSV
- **View lawyer fee stages** — Table view with horizontal stage tabs: To Pay, Completed
- **Scan lawyer fees** — Table displays Lawyer ID, Lawyer Name, Incident ID, Challan No, Total Amount (from incident expense), Commission Amount (from lawyer invoicing), Status, Due Date, Paid Date
- **Search and filter lawyer fees** — Search by Lawyer ID, lawyer name, incident ID; filter by status, date range
- **Open lawyer profile** — Clicking a row navigates to the lawyer's profile page in the Lawyers section
- **Export lawyer fees** — Export filtered/selected lawyer fees to Excel/CSV

## UI Requirements

### Sidebar Navigation
- Collapsible sidebar (toggle open/closed, remembers state)
- Two clickable items: Refunds, Lawyer Fees (no sub-items)

### Refunds View

#### Stage Tabs
- Horizontal tabs above table: To Refund | Completed
- Each tab shows count of refunds in that stage

#### Table Header
- Search bar (Refund ID, linked incident, customer/subscriber)
- Filter controls: Status, Date Range
- Export button

#### Refunds Table
- Columns: Refund ID, Linked Incident, Customer/Subscriber, Original Payment ID, Refund Amount, Refund Status (Initiated / Approved / Completed), Approved By, Refund Date
- Checkbox selection per row with select-all in header
- Row-level action menu for individual refund operations
- Pagination at bottom with page numbers, items per page selector, and total count

#### Bulk Actions Bar
- Appears when one or more refunds selected
- Actions: Approve, Process Refund
- All actions permission-controlled with confirmation

### Lawyer Fees View

#### Stage Tabs
- Horizontal tabs above table: To Pay | Completed
- Each tab shows count of fees in that stage

#### Table Header
- Search bar (Lawyer ID, lawyer name, incident ID)
- Filter controls: Status, Date Range
- Export button

#### Lawyer Fees Table
- Columns: Lawyer ID, Lawyer Name, Incident ID, Challan No, Total Amount (from incident expense), Commission Amount (from lawyer invoicing), Status, Due Date, Paid Date
- Clicking a row navigates to the lawyer's profile page in the Lawyers section
- Row-level action menu for individual fee operations
- Pagination at bottom with page numbers, items per page selector, and total count
- No bulk actions

### General
- Permission-controlled actions throughout
- Real-time updates reflected in table after any action

## Configuration
- shell: true
