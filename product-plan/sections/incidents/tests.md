# Test Instructions: Incidents

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Incidents module is a queue-driven ticket management system with two work types (challans and cases), queue-based progression, bulk operations, and detail views with multiple tabs. Test both challan and case workflows separately.

---

## User Flow Tests

### Flow 1: Add New Challan

**Scenario:** User creates a new challan incident

#### Success Path

**Setup:** User has permission to add challans, at least one subscriber exists

**Steps:**
1. User clicks "Add Challan" button
2. Modal opens with challan form
3. User fills in challan details (subscriber, vehicle, type: Pay & Close or Contest)
4. User selects source from dropdown (Court, Online)
5. User clicks "Save"

**Expected Results:**
- [ ] Modal closes after save
- [ ] New challan appears in "New Incidents" queue tab
- [ ] Challan has system-generated ID with IRN- prefix
- [ ] Success notification shown
- [ ] Queue tab count increases by 1

#### Failure Path: Missing Required Fields

**Steps:**
1. User opens Add Challan modal
2. User leaves required fields empty
3. User clicks "Save"

**Expected Results:**
- [ ] Validation errors shown on required fields
- [ ] Modal stays open
- [ ] No challan created

### Flow 2: Navigate Queue Tabs

**Scenario:** User browses challans across different queue stages

**Setup:** Challans exist in multiple queues

**Steps:**
1. User sees default "New Incidents" tab selected
2. User clicks "Screening" tab
3. User clicks "Lawyer Assigned" tab

**Expected Results:**
- [ ] Each tab shows count of challans in that queue
- [ ] Table content updates to show only challans in selected queue
- [ ] Selected tab is visually highlighted (cyan-600)
- [ ] Column data matches queue context

### Flow 3: Validate Challans

**Scenario:** User validates selected challans against external source

**Setup:** Challans exist in "New Incidents" queue

**Steps:**
1. User selects one or more challans via checkboxes
2. Bulk Actions bar appears
3. User clicks "Validate"
4. System processes validation

**Expected Results:**
- [ ] Validate Results View shows per-challan status
- [ ] Each challan shows: exists, already disposed, or other status
- [ ] User can navigate back to challan list

### Flow 4: Screen Challans

**Scenario:** User screens challans from backend

**Steps:**
1. User selects challans
2. User clicks "Screen" in bulk actions bar
3. System processes screening

**Expected Results:**
- [ ] Screen Results View displays with summary cards (Total Screened, Already Disposed, Pending to Dispose)
- [ ] Results table shows: Challan Number, State, Disposed status, Offence
- [ ] Filter controls available (State, Virtual Status, Disposed, etc.)

### Flow 5: Assign Agent and Lawyer

**Scenario:** User assigns agent then lawyer to challans

**Steps:**
1. User selects challans in "New Incidents"
2. User clicks "Assign Agent" → selects agent → confirms
3. Challans move to "Agent Assigned" queue
4. User selects challans in "Agent Assigned"
5. User clicks "Assign Lawyer" → selects lawyer → confirms

**Expected Results:**
- [ ] Assign Agent modal shows available agents
- [ ] After assignment, challans appear in "Agent Assigned" tab
- [ ] Assign Lawyer modal shows available lawyers
- [ ] After lawyer assignment, challans move to "Lawyer Assigned" tab
- [ ] Assigned agent/lawyer names appear in table columns

### Flow 6: Move Queue

**Scenario:** User moves challans between queues

**Steps:**
1. User selects challans
2. User clicks "Move Queue"
3. User selects target queue from modal
4. User confirms

**Expected Results:**
- [ ] Move Queue modal shows available target queues
- [ ] After move, challans disappear from current tab
- [ ] Challans appear in target queue tab
- [ ] Queue counts update

### Flow 7: View Challan Detail

**Scenario:** User opens full detail view for a challan

**Steps:**
1. User clicks a challan row
2. Detail page opens with two-column layout

**Expected Results:**
- [ ] Header shows Incident ID (IRN-xxxxx) and action buttons
- [ ] Left sidebar shows: TAT countdown, subscriber info, vehicle info, assignments
- [ ] Right area shows tabs: Activity, Notes, Details, Call Summary
- [ ] Activity tab has sub-tabs: Follow-Up and Activity Log
- [ ] TAT indicator shows days remaining (red if overdue)

### Flow 8: Add Follow-Up

**Scenario:** User records a follow-up activity on a challan

**Steps:**
1. User opens challan detail view
2. User clicks Activity tab
3. User clicks "+ Add Follow-Up"
4. User fills status, next date, notes
5. User saves

**Expected Results:**
- [ ] Follow-up form captures status, next date, notes
- [ ] New follow-up card appears in list
- [ ] Activity log shows the follow-up event

### Flow 9: Cases vs Challans Behavior

**Scenario:** Verify cases have different behavior than challans

**Setup:** Switch to Cases sub-section in sidebar

**Expected Results:**
- [ ] Cases show 6 queue tabs (no Screening, no Agent Assigned)
- [ ] No "Validate" or "Screen" actions available
- [ ] No "Assign Agent" action available
- [ ] Column header says "Case ID" instead of "Incident ID"
- [ ] Column header says "Case Type" instead of "Challan"
- [ ] Type options are "On Spot" and "On Call" (not PPT/Bulk)
- [ ] Add Expense shows only 3 fields: Lawyer Charge, Government Charge, Miscellaneous Charge

---

## Empty State Tests

### No Challans in Queue

**Setup:** Queue tab has zero challans

**Expected Results:**
- [ ] Table shows empty state message
- [ ] Queue tab count shows "0"
- [ ] "Add Challan" button still accessible

### No Follow-Ups on Challan

**Setup:** Challan has no follow-up activities

**Expected Results:**
- [ ] Follow-Up tab shows empty state
- [ ] "+ Add Follow-Up" button visible and functional

---

## Component Interaction Tests

### Sidebar Toggle
- [ ] Sidebar collapses and expands
- [ ] "All Incidents" and "My Incidents" toggle works
- [ ] Cases and Challans sub-sections are selectable

### Bulk Actions Bar
- [ ] Appears when checkboxes selected
- [ ] Shows count of selected items
- [ ] Disappears when selection cleared
- [ ] All actions trigger appropriate modals

### Pagination
- [ ] Page numbers display correctly
- [ ] Items per page selector works
- [ ] Total count displays
- [ ] Navigation between pages works

---

## Edge Cases

- [ ] Handles overdue TAT (>45 days) with red indicator
- [ ] Handles very long subscriber names with truncation
- [ ] Works with 1 challan and 100+ challans
- [ ] Preserves selected queue tab on navigation back
- [ ] Bulk select all works across pagination
- [ ] Export works with filters applied
