# Test Instructions: Support

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Support module is a triage gateway for inbound messages, converting them to Leads, Disputes, or Partnerships.

---

## User Flow Tests

### Flow 1: View Submissions

**Steps:**
1. User navigates to Support
2. Table displays unconverted submissions

**Expected Results:**
- [ ] Columns: Subject, Source, Type, Actions
- [ ] Only unconverted entries shown
- [ ] Table displays real data from submissions

### Flow 2: View Submission Details

**Steps:**
1. User clicks a submission row (outside Actions dropdown)
2. Read-only modal opens

**Expected Results:**
- [ ] Modal shows: full Subject, complete Message, submission time, source
- [ ] No action buttons in modal
- [ ] Modal closes on click outside or close button

### Flow 3: Convert to Lead

**Steps:**
1. User clicks Actions dropdown on a row
2. User clicks "Convert to Lead"

**Expected Results:**
- [ ] Lead created with prefilled data (subject, message, contact, source)
- [ ] Original submission hidden from main view
- [ ] Conversion logged in audit trail

### Flow 4: Convert to Dispute

**Steps:**
1. User clicks "Convert to Dispute" from Actions

**Expected Results:**
- [ ] Dispute/incident record created
- [ ] Support message linked as originating context
- [ ] Submission hidden from view

### Flow 5: Convert to Partnership

**Steps:**
1. User clicks "Convert to Partnership" from Actions

**Expected Results:**
- [ ] Partner onboarding entry created
- [ ] Submission hidden from view

### Flow 6: Filter Submissions

**Steps:**
1. User applies Source filter
2. User applies Type filter

**Expected Results:**
- [ ] Table filters by selected Source
- [ ] Table filters by selected Type
- [ ] Filters can be combined

### Flow 7: Sort Submissions

**Steps:**
1. User sorts by Type
2. User sorts by Source

**Expected Results:**
- [ ] Table reorders correctly

---

## Empty State Tests

### No Unconverted Submissions
- [ ] Empty state message shown
- [ ] Helpful text indicating all submissions have been triaged

### All Submissions Converted
- [ ] Main view empty
- [ ] No "Add" button (submissions come from external sources)

---

## Edge Cases

- [ ] No archive or delete actions available
- [ ] Every submission must go through one of three conversions
- [ ] Permission-controlled access (ops leads, support staff, admins only)
- [ ] Converted entries can't be re-converted
