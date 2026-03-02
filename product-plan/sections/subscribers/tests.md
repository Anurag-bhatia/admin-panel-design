# Test Instructions: Subscribers

## Overview

Test subscriber list, add/edit, bulk upload, and detail view with all 7 tabs.

---

## User Flow Tests

### Flow 1: Add Subscriber

**Steps:**
1. Click "Add Subscriber"
2. Fill required fields
3. Click "Save"

**Expected Results:**
- [ ] Form validates required fields
- [ ] Success toast shown
- [ ] Subscriber appears in list with Active status

### Flow 2: View Subscriber Details

**Steps:**
1. Click subscriber row
2. Navigate through all 7 tabs

**Expected Results:**
- [ ] Details tab shows company info
- [ ] Challans tab shows linked challans
- [ ] Incidents tab shows linked incidents
- [ ] Documents tab shows uploaded files
- [ ] Subscription tab shows plan details
- [ ] Wallet tab shows financial info
- [ ] Team tab shows assigned members

---

## Empty State Tests

- [ ] No subscribers: "No subscribers yet"
- [ ] No challans: "No challans for this subscriber"
- [ ] No documents: "No documents uploaded"

---

## Sample Test Data

```typescript
const mockSubscriber = {
  id: "LWD-1160523",
  subscriberName: "ABC Logistics",
  status: "active",
  subscriptionId: "subscription-001"
};
```
