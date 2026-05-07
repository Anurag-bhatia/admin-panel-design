# Test Instructions: Customers

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Customers module manages D2C visitor profiles with a list view, add/bulk upload, and a 5-tab detail page.

---

## User Flow Tests

### Flow 1: Add New Visitor

**Steps:**
1. User clicks "Add New Visitor"
2. User fills visitor details (name, mobile, email)
3. User clicks "Save"

**Expected Results:**
- [ ] Visitor appears in table
- [ ] Visitor has system-generated ID
- [ ] Modal closes

### Flow 2: Search Visitors

**Steps:**
1. User types in search bar
2. Searches by name, mobile number, visitor ID

**Expected Results:**
- [ ] Results filter in real-time
- [ ] Matching visitors displayed
- [ ] No results shows empty state

### Flow 3: View Visitor Detail

**Steps:**
1. User clicks visitor row
2. Detail page opens

**Expected Results:**
- [ ] Header shows visitor name, ID
- [ ] 5 tabs: Details, Incidents, Challans, Vehicles, Financials
- [ ] Edit action available

### Flow 4: Navigate Detail Tabs

**Expected Results:**
- [ ] Details tab: Name, contact, visitor ID, account creation date, total vehicles, total incidents
- [ ] Incidents tab: Incident list with ID, vehicle, type, status, TAT, outcome
- [ ] Challans tab: Challan records with ID, vehicle, type, amount, payment status
- [ ] Vehicles tab: All linked vehicles
- [ ] Financials tab: Read-only payments, pending, refunds, total spend

### Flow 5: Create Incident from Detail

**Steps:**
1. User opens visitor detail
2. User clicks "Create Incident"
3. User fills incident details
4. User saves

**Expected Results:**
- [ ] Incident created and linked to visitor
- [ ] Incident appears in visitor's Incidents tab

### Flow 6: Bulk Upload Visitors

**Steps:**
1. User clicks "Bulk Upload Visitors"
2. User uploads CSV/Excel file

**Expected Results:**
- [ ] File accepted and validated
- [ ] Valid visitors imported
- [ ] Errors reported clearly

---

## Empty State Tests

### No Visitors

**Expected Results:**
- [ ] Empty state with "Add New Visitor" CTA
- [ ] Table area shows helpful message

### Visitor with No Incidents

**Expected Results:**
- [ ] Incidents tab shows "No incidents yet"

### Visitor with No Vehicles

**Expected Results:**
- [ ] Vehicles tab shows empty state

---

## Edge Cases

- [ ] Financials tab is read-only (no edit actions)
- [ ] Activity log shows all changes
- [ ] Bulk operations (export, status updates, tagging) work
- [ ] Mobile responsive table and detail views
