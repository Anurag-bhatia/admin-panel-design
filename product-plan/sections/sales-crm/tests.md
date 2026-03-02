# Test Instructions: Sales CRM

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Sales CRM manages the lead pipeline from capture to conversion. Test pipeline navigation, lead creation, bulk operations, and follow-up tracking.

---

## User Flow Tests

### Flow 1: Add New Lead

**Scenario:** User creates a new lead

#### Success Path

**Steps:**
1. User clicks "Add Lead" button
2. User fills Source, Type, Company Name, Contact Person, Phone, Email
3. User clicks "Save"

**Expected Results:**
- [ ] Modal opens with title "Add Lead"
- [ ] All required fields have validation
- [ ] Success toast: "Lead created successfully"
- [ ] New lead appears in "New" tab

#### Failure Path: Invalid Email

**Steps:**
1. User enters invalid email "notanemail"
2. User clicks "Save"

**Expected Results:**
- [ ] Error: "Please enter a valid email address"
- [ ] Form not submitted

---

### Flow 2: Bulk Upload Leads

**Scenario:** User uploads multiple leads via Excel

#### Success Path

**Steps:**
1. User clicks "Bulk Upload Leads"
2. User downloads template
3. User fills template with 10 leads
4. User uploads file
5. System validates and imports

**Expected Results:**
- [ ] Template downloads as Excel file
- [ ] Upload accepts .xlsx, .xls, .csv
- [ ] Progress indicator during upload
- [ ] Success: "10 leads imported successfully"
- [ ] Leads appear in list

#### Failure Path: Validation Errors

**Setup:**
- Excel has rows with missing required fields

**Expected Results:**
- [ ] Error summary shows: "3 rows have errors"
- [ ] Each error shows row number and field
- [ ] Valid rows can still be imported
- [ ] User can fix and re-upload

---

### Flow 3: Bulk Update Status

**Scenario:** User moves multiple leads to new status

**Steps:**
1. User selects 5 leads via checkboxes
2. User clicks "Bulk Update"
3. User selects "Status" toggle
4. User selects "Follow-up" from dropdown
5. User clicks "Update"

**Expected Results:**
- [ ] Selection shows "5 leads selected"
- [ ] Toggle between Status/Owner update
- [ ] Success: "5 leads updated to Follow-up"
- [ ] Leads move to Follow-up tab

---

### Flow 4: Add Follow-Up Activity

**Scenario:** User logs a follow-up interaction

**Steps:**
1. User opens lead detail view
2. User clicks "Add Follow-Up"
3. User selects Activity Type: "Call"
4. User enters notes
5. User sets next follow-up date
6. User selects Outcome: "Interested"
7. User clicks "Save"

**Expected Results:**
- [ ] Modal has all required fields
- [ ] Date picker for next follow-up
- [ ] Success: "Follow-up added"
- [ ] Activity appears in timeline

---

## Empty State Tests

### No Leads Yet

**Setup:** Lead list is empty

**Expected Results:**
- [ ] Shows "No leads in your pipeline"
- [ ] "Add Lead" CTA visible
- [ ] Clicking CTA opens add modal

### No Leads in Stage

**Setup:** "Quotations" tab has no leads

**Expected Results:**
- [ ] Tab shows "Quotations (0)"
- [ ] Empty state: "No leads in Quotations"

---

## Sample Test Data

```typescript
const mockLead = {
  id: "lead-001",
  source: "Website",
  type: "Fleet Services",
  subType: "Full Management",
  companyName: "Metro Transport Co",
  contactPerson: "Rahul Verma",
  phoneNumber: "+91 98765 43210",
  emailId: "rahul@metrotransport.com",
  status: "new",
  assignedTo: null,
  createdDate: "2024-01-15T10:30:00Z"
};
```
