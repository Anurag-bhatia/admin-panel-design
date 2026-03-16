# Test Instructions: Support

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the support intake and triage system including submission list, filtering, read-only detail modal, and conversion actions to Lead/Dispute/Partnership.

---

## User Flow Tests

### Flow 1: Review Submission

**Steps:**
1. Click a submission row (outside Actions dropdown)
2. Read-only modal opens

**Expected Results:**
- [ ] Modal shows full Subject, Message, submission time, source
- [ ] Modal has no action buttons (read-only)
- [ ] Modal closes on dismiss

### Flow 2: Convert to Lead

**Steps:**
1. Click Actions dropdown on a row
2. Select "Convert to Lead"

**Expected Results:**
- [ ] Lead created with prefilled contact details and source
- [ ] Submission hidden from main view
- [ ] Conversion logged in audit trail

### Flow 3: Convert to Dispute

**Steps:**
1. Actions → "Convert to Dispute"

**Expected Results:**
- [ ] Dispute created linked to support message
- [ ] Submission hidden from view

### Flow 4: Filter Submissions

**Steps:**
1. Apply Source filter
2. Apply Type filter

**Expected Results:**
- [ ] Table shows only matching submissions
- [ ] Counts update

---

## Empty State Tests

- [ ] No submissions: "No support submissions yet"
- [ ] All converted: "All submissions have been processed"
- [ ] No filter results: "No submissions match your filters"

---

## Sample Test Data

```typescript
const mockSubmission = {
  id: "SUP-001",
  subject: "Issue with challan payment",
  message: "I paid for my challan but it still shows pending...",
  source: "Landing Page",
  type: "complaint",
  contactEmail: "user@example.com",
  contactPhone: "+91-9876543210",
  createdAt: "2025-12-01T10:00:00Z",
  isConverted: false,
};
```
