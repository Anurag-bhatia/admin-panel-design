# Test Instructions: Payments

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Payments module handles refunds, lawyer fees, and partner payouts through a sidebar-navigated workspace with stage-based tabs.

---

## User Flow Tests

### Flow 1: Navigate Sidebar Views

**Steps:**
1. User clicks "Refunds" in sidebar
2. User clicks "Lawyer Fees"
3. User clicks "Partners"

**Expected Results:**
- [ ] Sidebar items are clickable
- [ ] Active item visually highlighted
- [ ] Table content changes per view
- [ ] Stage tabs update per view

### Flow 2: Process Refund

**Steps:**
1. User selects "Refunds" view
2. User views "Refund Raised" tab
3. User selects refunds via checkboxes
4. User clicks "Approve" in bulk actions bar
5. User confirms

**Expected Results:**
- [ ] Bulk actions bar appears on selection
- [ ] Refunds move to appropriate stage
- [ ] Stage tab counts update
- [ ] Confirmation dialog shown before action

### Flow 3: View Refund Stages

**Steps:**
1. User clicks through tabs: Refund Raised, Completed, Hold, Rejected

**Expected Results:**
- [ ] Each tab shows count
- [ ] Table shows refunds in that stage
- [ ] Columns: Refund ID, Linked Incident, Customer/Subscriber, Payment ID, Amount, Status, Initiated By, Date

### Flow 4: Review Lawyer Fees

**Steps:**
1. User selects "Lawyer Fees" in sidebar
2. User views "To Pay" tab

**Expected Results:**
- [ ] Tabs: To Pay, Completed (each with count)
- [ ] Columns: Lawyer ID, Name, Incident ID, Challan No, Total Amount, Commission, Status, Due Date, Paid Date
- [ ] Clicking a row navigates to lawyer profile

### Flow 5: Manage Partner Payouts

**Steps:**
1. User selects "Partners" in sidebar
2. User views "To Pay" tab
3. User clicks "Mark as Paid" on a row

**Expected Results:**
- [ ] Tabs: To Pay, Completed
- [ ] Columns: Partner ID, Partner, Subscribers, Earnings, Payout, Status, Due Date, Paid Date
- [ ] Payout moves to "Completed" tab
- [ ] Clicking row navigates to partner profile

### Flow 6: Search and Filter

**Steps:**
1. User types in search bar
2. User applies date range filter

**Expected Results:**
- [ ] Results filter correctly
- [ ] Filters apply to current view only

### Flow 7: Export Data

**Steps:**
1. User applies filters
2. User clicks "Export"

**Expected Results:**
- [ ] Export includes filtered data
- [ ] CSV/Excel download works

---

## Empty State Tests

### No Refunds
- [ ] Empty state in Refunds view

### No Lawyer Fees
- [ ] Empty state in Lawyer Fees view

### No Partner Payouts
- [ ] Empty state in Partners view

---

## Edge Cases

- [ ] Sidebar toggle (collapse/expand) works
- [ ] Cross-section navigation (to lawyer/partner profiles) works
- [ ] No bulk actions on Lawyer Fees or Partner views
- [ ] Pagination works in all views
