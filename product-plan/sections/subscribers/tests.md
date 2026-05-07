# Test Instructions: Subscribers

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Subscribers module manages B2B client accounts with a list view, add/bulk upload, and a 7-tab detail page.

---

## User Flow Tests

### Flow 1: Add Subscriber

**Steps:**
1. User clicks "Add Subscriber"
2. User fills: Source, Type, Company, Name, Email, Phone, GST, State, City
3. User clicks "Save"

**Expected Results:**
- [ ] Subscriber appears in list with Subs-ID
- [ ] Status shows "Active"
- [ ] Modal/form closes

### Flow 2: Bulk Upload

**Steps:**
1. User clicks "Bulk Upload Subscriber"
2. User downloads template
3. User uploads filled file
4. System validates

**Expected Results:**
- [ ] Template download works
- [ ] Validation errors displayed clearly
- [ ] Valid subscribers imported

### Flow 3: View Subscriber Detail

**Steps:**
1. User clicks subscriber row
2. Full-screen detail page opens

**Expected Results:**
- [ ] Header shows subscriber name, ID, status badge
- [ ] 7 tabs visible: Details, Challans, Incidents, Documents, Subscription, Wallet, Team
- [ ] Back button returns to list
- [ ] Edit Details button visible

### Flow 4: Navigate Detail Tabs

**Steps:**
1. User clicks each tab in detail view

**Expected Results:**
- [ ] Details tab: Company info, contact details, address, metadata
- [ ] Challans tab: Traffic challans linked to subscriber
- [ ] Incidents tab: Linked incidents with status
- [ ] Documents tab: Upload and manage documents
- [ ] Subscription tab: Plan details, billing period, status
- [ ] Wallet tab: Payments, credits, invoices, transactions
- [ ] Team tab: Assigned team members

### Flow 5: Edit Subscriber

**Steps:**
1. User clicks "Edit Details" or Actions > Edit
2. User modifies fields
3. User saves

**Expected Results:**
- [ ] Fields become editable
- [ ] Changes saved and reflected
- [ ] Change logged in audit trail

---

## Empty State Tests

### No Subscribers

**Expected Results:**
- [ ] Empty state message shown
- [ ] "Add Subscriber" button accessible

### Subscriber with No Challans

**Expected Results:**
- [ ] Challans tab shows "No challans yet"
- [ ] Other tabs not affected

### Subscriber with No Documents

**Expected Results:**
- [ ] Documents tab shows empty state with upload prompt

---

## Edge Cases

- [ ] Search works by name, company, Subs-ID, and GST
- [ ] Status filter (Active/Inactive) works
- [ ] Pagination works in subscriber list
- [ ] Long company names truncated properly
