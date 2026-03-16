# Test Instructions: Disputes

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the dispute governance engine including sidebar navigation, stage management, dispute creation (must link entity), bulk operations, detail view with 5 tabs, and SLA enforcement.

---

## User Flow Tests

### Flow 1: Create Dispute

**Steps:**
1. Click "Create Dispute"
2. Select linked entity type (Incident/Subscriber/Payment)
3. Enter entity ID
4. Fill dispute type, reason, description, priority
5. Submit

**Expected Results:**
- [ ] Dispute created in "Open" stage
- [ ] Stage count increments
- [ ] Linked entity reference saved

**Failure Path: No Linked Entity**
- [ ] Form requires linked entity — cannot create standalone dispute
- [ ] Error shown: "A linked entity is required"

### Flow 2: Review and Resolve

**Steps:**
1. Open dispute detail
2. Review Summary, Linked Incident, Evidence tabs
3. Add investigation notes
4. Click "Resolve" with mandatory notes

**Expected Results:**
- [ ] Dispute moves to "Resolved" stage
- [ ] Resolution notes saved
- [ ] Action logged in Activity tab

### Flow 3: Escalate

**Steps:**
1. Open dispute detail
2. Click "Escalate"
3. Add escalation notes

**Expected Results:**
- [ ] Dispute moves to "Escalated" stage
- [ ] SLA adjusts

### Flow 4: Bulk Assign Reviewer

**Steps:**
1. Select multiple disputes
2. Click "Assign Reviewer"
3. Select reviewer, confirm

**Expected Results:**
- [ ] All selected disputes assigned
- [ ] No bulk resolve/reject option available (sensitive)

---

## Empty State Tests

- [ ] No disputes: helpful message
- [ ] No evidence: empty Evidence tab with upload CTA
- [ ] No investigation notes: empty Investigation tab

---

## Sample Test Data

```typescript
const mockDispute = {
  id: "DSP-12345",
  linkedEntity: { type: "incident", id: "IRN-67890" },
  type: "refund",
  raisedBy: "customer",
  priority: "high",
  status: "open",
  assignedTo: null,
  createdAt: "2025-12-01T10:00:00Z",
  slaDeadline: "2025-12-15T10:00:00Z",
};
```
