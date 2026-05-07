# Test Instructions: Disputes

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Disputes module handles escalation and governance with stage-based progression, reviewer assignment, and configurable SLA enforcement.

---

## User Flow Tests

### Flow 1: Create Dispute

**Steps:**
1. User clicks "Create Dispute"
2. User links to an incident, subscriber, or payment
3. User fills: dispute type, reason, description, priority
4. User clicks "Create"

**Expected Results:**
- [ ] Dispute appears in "Open" tab
- [ ] Dispute ID generated (DSP-xxxxx format)
- [ ] Linked entity info displayed
- [ ] Modal closes

#### Failure Path: No Linked Entity

**Expected Results:**
- [ ] Validation error — dispute must link to existing entity
- [ ] Form not submitted

### Flow 2: Navigate Stage Tabs

**Steps:**
1. User clicks through tabs: Open, Under Review, Escalated, Resolved, Rejected

**Expected Results:**
- [ ] Each tab shows dispute count
- [ ] Table content updates per stage
- [ ] Correct columns displayed

### Flow 3: Assign Reviewer

**Steps:**
1. User selects dispute(s)
2. User clicks "Assign Reviewer"
3. User selects reviewer from modal
4. User confirms

**Expected Results:**
- [ ] Reviewer assigned
- [ ] Assignment logged in activity trail
- [ ] Dispute can move to "Under Review"

### Flow 4: Escalate Dispute

**Steps:**
1. User opens dispute detail
2. User clicks "Escalate"

**Expected Results:**
- [ ] Dispute moves to "Escalated" tab
- [ ] Priority may increase
- [ ] Escalation logged in activity

### Flow 5: Resolve Dispute

**Steps:**
1. Reviewer opens dispute in "Under Review"
2. Reviewer adds investigation notes
3. Reviewer clicks "Approve Refund" or "Reject Dispute"

**Expected Results:**
- [ ] Dispute moves to "Resolved" or "Rejected"
- [ ] Resolution reasoning logged
- [ ] Mandatory audit trail entry

### Flow 6: View Dispute Detail

**Steps:**
1. User clicks dispute row
2. Detail page opens

**Expected Results:**
- [ ] Header: Dispute ID, action buttons
- [ ] Left sidebar: SLA deadline, linked entity info, assigned reviewer
- [ ] 5 tabs: Summary, Linked Incident, Investigation, Evidence, Activity
- [ ] SLA indicator visible (red if overdue)

### Flow 7: Bulk Operations

**Steps:**
1. User selects multiple disputes
2. User clicks "Assign Reviewer" or "Change Priority"

**Expected Results:**
- [ ] Bulk actions bar shows selected count
- [ ] Only Assign Reviewer and Change Priority available (no bulk resolution)
- [ ] All selected disputes updated

---

## Empty State Tests

### No Disputes
- [ ] Empty state message shown
- [ ] "Create Dispute" button accessible

### No Evidence on Dispute
- [ ] Evidence tab shows upload prompt

---

## Edge Cases

- [ ] SLA indicator shows correctly (7-15 day range)
- [ ] Overdue disputes highlighted in red
- [ ] Sidebar toggle between All/My Disputes works
- [ ] Cannot create standalone dispute (must link to entity)
- [ ] Only authorized roles can approve refunds/reject
