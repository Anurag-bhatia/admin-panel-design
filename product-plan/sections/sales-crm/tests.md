# Test Instructions: Sales CRM

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Sales CRM manages a tab-based lead pipeline with single/bulk lead creation, assignment, follow-up tracking, and detail views.

---

## User Flow Tests

### Flow 1: Add Single Lead

**Scenario:** User creates a new lead

**Steps:**
1. User clicks "Add Lead"
2. Modal opens with form
3. User fills: Source, Type, Company, Contact Person, Phone, Email, State, City
4. User clicks "Save"

**Expected Results:**
- [ ] Modal closes
- [ ] Lead appears in "New" tab
- [ ] Lead has system-generated Lead ID
- [ ] "All Leads" count increases

#### Failure Path: Missing Required Fields

**Steps:**
1. User leaves Phone Number empty
2. User clicks "Save"

**Expected Results:**
- [ ] Validation error on Phone Number field
- [ ] Form not submitted

### Flow 2: Bulk Upload Leads

**Scenario:** User uploads leads via Excel

**Steps:**
1. User clicks "Bulk Upload Leads"
2. User downloads template
3. User uploads filled Excel file
4. System validates and imports

**Expected Results:**
- [ ] Template download works
- [ ] Upload accepts Excel/CSV
- [ ] Validation errors shown clearly
- [ ] Successfully imported leads appear in list

### Flow 3: Pipeline Tab Navigation

**Steps:**
1. User clicks through tabs: All, New, Assigned, Follow-up, etc.

**Expected Results:**
- [ ] Each tab shows correct count
- [ ] Table updates to show leads in that stage
- [ ] Active tab visually highlighted

### Flow 4: Assign Lead

**Steps:**
1. User clicks "Assign" from Actions menu on a lead
2. User selects team member from modal
3. User confirms

**Expected Results:**
- [ ] Assignment modal shows available users
- [ ] Lead moves to "Assigned" tab
- [ ] Assigned Owner column updated
- [ ] Assignment logged in lead timeline

### Flow 5: Add Follow-Up

**Steps:**
1. User opens lead detail view
2. User clicks "Add Follow Up"
3. User fills activity type, notes, next date, outcome
4. User saves

**Expected Results:**
- [ ] Follow-up recorded in activity timeline
- [ ] Next follow-up date visible
- [ ] Lead can move to "Follow-up" tab

### Flow 6: Bulk Update

**Steps:**
1. User selects multiple leads via checkboxes
2. User clicks "Bulk Update"
3. User toggles between Status and Owner update
4. User selects new value and confirms

**Expected Results:**
- [ ] Bulk update modal opens
- [ ] Toggle between Status and Owner works
- [ ] All selected leads updated
- [ ] Changes reflected in table

### Flow 7: View Lead Detail

**Steps:**
1. User clicks a lead row
2. Detail view opens

**Expected Results:**
- [ ] Complete lead profile displayed
- [ ] Activity timeline shows all events
- [ ] Edit mode accessible
- [ ] Documents section visible

---

## Empty State Tests

### No Leads

**Setup:** No leads in system

**Expected Results:**
- [ ] Empty state shown in table area
- [ ] "Add Lead" button accessible
- [ ] Dashboard cards show zero counts

### No Follow-Ups on Lead

**Setup:** Lead has no follow-up activities

**Expected Results:**
- [ ] Activity timeline shows no entries
- [ ] "Add Follow Up" button visible

---

## Edge Cases

- [ ] Dashboard summary cards show correct aggregated metrics
- [ ] My Leads view shows only current user's assigned leads
- [ ] Search works across name, company, and Lead ID
- [ ] Filters persist across tab navigation
- [ ] Export includes applied filters
