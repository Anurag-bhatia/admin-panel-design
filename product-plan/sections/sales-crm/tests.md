# Test Instructions: Sales CRM

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the lead pipeline management including stage navigation, lead CRUD, bulk operations, detail view with timeline, follow-up tracking, and My Leads view.

---

## User Flow Tests

### Flow 1: Add New Lead

**Success Path**

**Steps:**
1. User clicks "Add Lead" button
2. Modal opens with form
3. User fills Source, Type, Company Name, Contact Person, Phone, Email, State, City
4. User submits

**Expected Results:**
- [ ] Lead appears in "New" tab
- [ ] Tab count increments
- [ ] Success notification shown

**Failure Path: Validation**
- [ ] Phone number format validated
- [ ] Required fields (Source, Type, Phone) show error messages
- [ ] Form data preserved on error

### Flow 2: Bulk Upload Leads

**Steps:**
1. User clicks "Bulk Upload Leads"
2. Downloads template via "Download Template" link
3. Uploads filled Excel file

**Expected Results:**
- [ ] Template downloads successfully
- [ ] Upload shows progress
- [ ] Created leads appear in list
- [ ] Validation errors shown per row if any

### Flow 3: View Lead Detail and Add Follow-Up

**Steps:**
1. User clicks a lead row
2. Detail view opens with timeline
3. User clicks "Add Follow-Up"
4. Fills activity type, notes, next follow-up date, outcome
5. Submits

**Expected Results:**
- [ ] Detail shows lead info, timeline, documents
- [ ] Follow-up appears in timeline
- [ ] Next follow-up date tracked

### Flow 4: Bulk Update

**Steps:**
1. User selects multiple leads
2. Clicks "Bulk Update"
3. Chooses Status change, selects new status
4. Confirms

**Expected Results:**
- [ ] All selected leads move to new status
- [ ] Tab counts update
- [ ] Confirmation shown

---

## Empty State Tests

### No Leads
- [ ] Shows "No leads yet" with CTA to add lead
- [ ] "Add Lead" button functional

### No Leads in Stage
- [ ] Empty tab shows helpful message
- [ ] Other tabs still show counts

### No Follow-Ups
- [ ] Timeline shows "No activity yet"

---

## Edge Cases

- [ ] Lead with very long company name truncates
- [ ] Duplicate phone number handling
- [ ] Switching between All Leads and My Leads preserves filters
- [ ] Tab counts update in real-time after operations

---

## Sample Test Data

```typescript
const mockLead = {
  id: "LD-001",
  source: "Website",
  type: "B2B",
  subType: "Fleet",
  companyName: "Transport Solutions Ltd",
  contactPerson: "Rajesh Kumar",
  phone: "+91-9876543210",
  email: "rajesh@transport.com",
  status: "new",
  owner: "John Doe",
  state: "Delhi",
  city: "New Delhi",
  createdAt: "2025-12-01T10:00:00Z",
};

const mockEmptyList = [];
```
