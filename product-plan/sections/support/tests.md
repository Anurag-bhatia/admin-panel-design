# Test Instructions: Support

## Overview

Test submission table, filtering, detail view, and conversion actions.

---

## User Flow Tests

### Flow 1: Convert to Lead

**Steps:**
1. Click Actions dropdown on submission
2. Select "Convert to Lead"

**Expected Results:**
- [ ] Lead created with submission data prefilled
- [ ] Submission hidden from main view
- [ ] Conversion logged to audit trail

### Flow 2: View Submission Details

**Steps:**
1. Click submission row (not dropdown)
2. Modal opens with full details

**Expected Results:**
- [ ] Shows full subject and message
- [ ] Shows submission time and source
- [ ] Modal is read-only (no action buttons)

---

## Empty State Tests

- [ ] No submissions: "No support submissions pending review"

---

## Sample Test Data

```typescript
const mockSubmission = {
  id: "sup-001",
  subject: "Interested in fleet management",
  type: "business inquiry",
  source: "Landing Page"
};
```
