# Test Instructions: Incidents

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the queue-driven challan management system including queue navigation, CRUD operations, bulk actions, detail view with tabs, 45-day TAT enforcement, and export functionality.

---

## User Flow Tests

### Flow 1: Add New Challan

**Success Path**

**Setup:** User on Incidents page, "New Incidents" tab active

**Steps:**
1. User clicks "Add Challan" button
2. Modal opens with form fields
3. User fills subscriber, vehicle, type (Pay & Close / Contest), source
4. User clicks submit

**Expected Results:**
- [ ] Modal closes after submission
- [ ] New challan appears in "New Incidents" queue tab
- [ ] Queue count increments by 1
- [ ] Success toast/notification appears

**Failure Path: Missing Required Fields**
- [ ] Submit button disabled or shows validation errors when required fields empty
- [ ] Form data preserved (not cleared) on validation error

### Flow 2: Validate Challans

**Setup:** Multiple challans exist in New Incidents queue

**Steps:**
1. User selects 3 challans via checkboxes
2. Bulk actions bar appears showing "3 selected"
3. User clicks "Validate"
4. System processes validation

**Expected Results:**
- [ ] ValidateResultsView displays
- [ ] Per-challan status shown (exists / already disposed / other)
- [ ] User can dismiss results and return to list

**Failure Path: API Error**
- [ ] Error message displayed: "Validation failed. Please try again."
- [ ] Selected challans remain selected

### Flow 3: Assign Lawyer

**Setup:** Challans in New Incidents or Screening queue

**Steps:**
1. User selects challans
2. Clicks "Assign Lawyer" from bulk actions
3. Modal shows available lawyers
4. User selects a lawyer and confirms

**Expected Results:**
- [ ] Challans move to "Lawyer Assigned" queue
- [ ] Previous queue count decreases
- [ ] "Lawyer Assigned" count increases
- [ ] Assignment logged in timeline

### Flow 4: View Challan Detail

**Setup:** Challan with follow-ups and documents exists

**Steps:**
1. User clicks a challan row
2. Detail page opens
3. User navigates between tabs (Activity, Notes, Details, Call Summary)
4. User clicks "+ Add Follow-Up"
5. Fills follow-up form (notes, outcome, next date)

**Expected Results:**
- [ ] Header shows Incident ID (e.g., "IRN-12345")
- [ ] Left sidebar shows TAT countdown, subscriber info, assignments
- [ ] All tabs render with correct data
- [ ] Follow-up appears in Activity tab after saving
- [ ] TAT overdue shown in red when past 45 days

---

## Empty State Tests

### No Incidents in Queue
**Setup:** Queue tab has 0 incidents

**Expected Results:**
- [ ] Helpful message displayed (not blank screen)
- [ ] Queue tab shows count "0"

### No Follow-Ups
**Setup:** Incident has no follow-ups

**Expected Results:**
- [ ] Activity tab shows empty state message
- [ ] "+ Add Follow-Up" button visible and functional

### No Documents
**Setup:** Incident has no uploaded documents

**Expected Results:**
- [ ] Details tab documents section shows empty state
- [ ] Upload button/area visible

---

## Component Interaction Tests

### IncidentRow
- [ ] Checkbox toggles selection state
- [ ] Row click opens detail view
- [ ] Action menu shows correct options for current queue
- [ ] Status badge displays correct color

### QueueTabs
- [ ] Tabs show correct counts
- [ ] Clicking tab switches displayed data
- [ ] Active tab visually distinguished

### BulkActionsBar
- [ ] Appears when 1+ challans selected
- [ ] Shows selected count
- [ ] Disappears when all deselected

---

## Edge Cases

- [ ] Selecting challans across queue tabs (should only select within current queue)
- [ ] TAT at exactly 45 days boundary
- [ ] Very long subscriber names truncate properly
- [ ] Pagination works with 1 item and 100+ items
- [ ] Moving last challan from queue shows empty state

---

## Accessibility Checks

- [ ] Checkbox selection keyboard accessible
- [ ] Tab navigation works with keyboard
- [ ] Action menu accessible via keyboard
- [ ] Modal focus trapped correctly

---

## Sample Test Data

```typescript
const mockIncident = {
  id: "IRN-12345",
  subscriberName: "Fleet Corp Pvt Ltd",
  subscriberId: "SUB-001",
  vehicleNumber: "DL-01-AB-1234",
  challanType: "contest",
  status: "new",
  queue: "newIncidents",
  assignedAgent: null,
  assignedLawyer: null,
  source: "API",
  createdAt: "2025-12-01T10:00:00Z",
  updatedAt: "2025-12-01T10:00:00Z",
};

const mockIncidents = [mockIncident];
const mockEmptyList = [];
```
