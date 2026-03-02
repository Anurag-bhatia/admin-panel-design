# Test Instructions: Incidents

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Incidents module manages challan processing through queue-based workflows. Test the queue navigation, bulk operations, incident creation, and detail view functionality.

---

## User Flow Tests

### Flow 1: Navigate Queue Tabs

**Scenario:** User switches between different queue tabs to view incidents by stage.

#### Success Path

**Setup:**
- Incidents exist across multiple queues
- User has permission to view all incidents

**Steps:**
1. User navigates to `/incidents`
2. User sees queue tabs: "New Incidents", "Screening", "Lawyer Assigned", "Settled", "Not Settled", "Refund"
3. User clicks "Screening" tab
4. Table updates to show only incidents in Screening queue

**Expected Results:**
- [ ] Queue tabs display with accurate counts (e.g., "New Incidents (12)")
- [ ] Clicking tab updates table content
- [ ] Active tab is visually highlighted
- [ ] URL may update to reflect selected queue

---

### Flow 2: Add New Challan

**Scenario:** User creates a new challan incident.

#### Success Path

**Setup:**
- User has "add challan" permission
- Subscribers exist for selection

**Steps:**
1. User clicks "Add Challan" button
2. Modal opens with form fields
3. User selects subscriber from dropdown
4. User enters challan number, vehicle number
5. User selects type (Pay & Close / Contest)
6. User selects source
7. User clicks "Save"

**Expected Results:**
- [ ] Modal opens with title "Add Challan"
- [ ] Subscriber dropdown shows available subscribers
- [ ] Form validates required fields (shows error if empty)
- [ ] Success toast: "Challan created successfully"
- [ ] New challan appears in "New Incidents" queue
- [ ] Modal closes after success

#### Failure Path: Missing Required Field

**Setup:**
- User leaves challan number empty

**Steps:**
1. User fills form but leaves "Challan Number" empty
2. User clicks "Save"

**Expected Results:**
- [ ] Error message: "Challan number is required"
- [ ] Form not submitted
- [ ] Focus moves to invalid field

---

### Flow 3: Bulk Assign Lawyer

**Scenario:** User assigns a lawyer to multiple incidents at once.

#### Success Path

**Setup:**
- Multiple incidents exist in "Screening" queue
- Lawyers exist for assignment

**Steps:**
1. User selects 3 incidents via checkboxes
2. Bulk actions bar appears showing "3 selected"
3. User clicks "Assign Lawyer" button
4. Modal opens with lawyer dropdown
5. User selects lawyer "Adv. Priya Sharma"
6. User clicks "Assign"

**Expected Results:**
- [ ] Bulk actions bar shows "3 selected"
- [ ] "Assign Lawyer" button is enabled
- [ ] Modal shows lawyer list with name and state
- [ ] Success toast: "3 incidents assigned to Adv. Priya Sharma"
- [ ] Incidents move to "Lawyer Assigned" queue
- [ ] Selection is cleared

#### Failure Path: No Incidents Selected

**Setup:**
- No incidents selected

**Expected Results:**
- [ ] Bulk actions bar not visible
- [ ] "Assign Lawyer" action not accessible

---

### Flow 4: View Incident Details

**Scenario:** User opens incident detail page to view full information.

#### Success Path

**Setup:**
- Incident exists with follow-ups, timeline, documents

**Steps:**
1. User clicks on incident row "IRN-12345"
2. Detail page opens
3. User sees header with Incident ID and action buttons
4. User sees tabs: "Activity", "Notes", "Details"
5. User clicks "Activity" tab
6. User sees follow-ups and timeline

**Expected Results:**
- [ ] Header shows "IRN-12345"
- [ ] TAT countdown displays (e.g., "32 days remaining")
- [ ] Subscriber info shown in sidebar
- [ ] Tabs are clickable and load content
- [ ] Activity tab shows chronological history
- [ ] Back button returns to list

---

### Flow 5: Add Follow-Up

**Scenario:** User adds a follow-up note to an incident.

#### Success Path

**Setup:**
- User is on incident detail page

**Steps:**
1. User clicks "+ Add Follow-Up" button
2. Modal opens with form
3. User enters notes: "Called subscriber, confirmed payment pending"
4. User selects outcome: "Awaiting Payment"
5. User sets next follow-up date
6. User clicks "Save"

**Expected Results:**
- [ ] Modal opens with title "Add Follow-Up"
- [ ] Notes field accepts multi-line text
- [ ] Outcome dropdown shows options
- [ ] Date picker works for next follow-up
- [ ] Success toast: "Follow-up added"
- [ ] New follow-up appears in Activity tab
- [ ] Timeline shows "Follow-up added by [User Name]"

---

## Empty State Tests

### No Incidents in Queue

**Scenario:** Queue has no incidents

**Setup:**
- "Refund" queue has 0 incidents

**Expected Results:**
- [ ] Tab shows "Refund (0)"
- [ ] Table area shows empty state message
- [ ] Message: "No incidents in this queue"
- [ ] No broken layout or errors

### No Follow-Ups Yet

**Scenario:** Incident has no follow-up activities

**Setup:**
- Incident exists but `followUps` is empty array

**Expected Results:**
- [ ] Activity tab shows "No follow-ups recorded"
- [ ] "+ Add Follow-Up" button is visible
- [ ] Clicking CTA opens add follow-up modal

### No Documents Attached

**Scenario:** Incident has no documents

**Setup:**
- Incident exists but `documents` is empty array

**Expected Results:**
- [ ] Details tab shows "No documents uploaded"
- [ ] "Upload Document" button is visible
- [ ] Clicking CTA opens file upload

### Search Returns No Results

**Scenario:** User searches for non-existent incident

**Setup:**
- Search query matches nothing

**Steps:**
1. User enters "INVALID-ID-999" in search
2. User presses Enter

**Expected Results:**
- [ ] Table shows "No incidents found"
- [ ] "Clear search" link is visible
- [ ] Clicking clears search and shows all incidents

---

## Component Interaction Tests

### IncidentRow

**Renders correctly:**
- [ ] Displays incident ID (e.g., "IRN-12345")
- [ ] Shows subscriber name with ID beneath
- [ ] Shows vehicle number
- [ ] Shows type badge (Pay & Close / Contest)
- [ ] Shows status badge with appropriate color
- [ ] Shows formatted dates
- [ ] Shows assigned agent/lawyer names or "Unassigned"

**User interactions:**
- [ ] Checkbox toggles selection
- [ ] Clicking row (not checkbox) opens detail view
- [ ] Actions menu shows context-appropriate options

### QueueTabs

**Renders correctly:**
- [ ] All 6 queue tabs visible
- [ ] Each tab shows count in parentheses
- [ ] Active tab has different styling

**User interactions:**
- [ ] Clicking tab triggers `onQueueChange` callback
- [ ] Keyboard navigation works (Tab, Enter)

### BulkActionsBar

**Renders correctly:**
- [ ] Shows selected count: "X selected"
- [ ] Shows action buttons: Validate, Screen, Assign Agent, Assign Lawyer, Move Queue

**User interactions:**
- [ ] Each button triggers appropriate modal or action
- [ ] "Clear selection" clears all checkboxes

---

## Edge Cases

- [ ] Handles very long incident IDs with truncation
- [ ] Works with 1 incident and 1000+ incidents
- [ ] TAT shows "Overdue" in red when past deadline
- [ ] Preserves filters when navigating back from detail
- [ ] Bulk actions disabled when no items selected
- [ ] Transition: first incident created → list renders correctly
- [ ] Transition: last incident moved → empty state appears

---

## Accessibility Checks

- [ ] Queue tabs are keyboard navigable
- [ ] Checkboxes have accessible labels
- [ ] Modals trap focus appropriately
- [ ] Screen reader announces selected count
- [ ] Error messages are announced

---

## Sample Test Data

```typescript
// Populated state
const mockIncident = {
  id: "inc-001",
  incidentId: "IRN-12345",
  challanNumber: "MH012024001234",
  subscriberId: "LWD-1160523",
  subscriberName: "ABC Logistics Pvt Ltd",
  vehicle: "MH01AB1234",
  type: "contest",
  category: "challan",
  status: "pending_screening",
  queue: "newIncidents",
  createdAt: "2024-01-15T10:30:00Z",
  lastUpdatedAt: "2024-01-15T14:45:00Z",
  tatDeadline: "2024-03-01T10:30:00Z",
  assignedAgentId: null,
  assignedLawyerId: null,
  source: "API",
  state: "Maharashtra",
  offence: "Signal Violation",
  amount: 2500
};

const mockIncidents = [mockIncident, /* ... more incidents */];

// Empty states
const mockEmptyQueue = [];

const mockIncidentNoFollowUps = {
  ...mockIncident,
  followUps: []
};

// Error scenarios
const mockApiError = {
  status: 500,
  message: "Failed to create incident"
};
```

---

## Notes for Test Implementation

- Mock API calls for validation/screening operations
- Test queue counts update after bulk operations
- Verify TAT calculations are accurate
- Test filter persistence across navigation
- Ensure bulk selection works across paginated data
- Test permission-based action visibility
