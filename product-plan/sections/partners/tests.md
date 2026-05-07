# Test Instructions: Partners

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Partners module manages external business introducers with 4-step onboarding, status management, and detail views with 5 tabs.

---

## User Flow Tests

### Flow 1: View Partner List

**Steps:**
1. User navigates to Partners section

**Expected Results:**
- [ ] Table shows: Name, Partner ID, Contact, Company, Subscriber Count, Status, Actions
- [ ] Search by partner name works
- [ ] Filter by status (active/inactive) works
- [ ] Sort by column headers works

### Flow 2: Add Partner (4-Step Onboarding)

**Steps:**
1. User clicks "Add Partner"
2. Step 1: Personal identity (first name, last name, email, mobile, password)
3. Step 2: Company details (company name, email, phone, address)
4. Step 3: Service scope (products/services, subscriber types)
5. Step 4: Permissions & Bank (bank details, system permissions)

**Expected Results:**
- [ ] Stepper shows current step
- [ ] Navigation between steps works
- [ ] Required fields validated per step
- [ ] On submit, partner appears in list as active

### Flow 3: View Partner Details

**Steps:**
1. User clicks partner row
2. Detail page opens

**Expected Results:**
- [ ] Header: Partner name, ID, status, action buttons
- [ ] 5 tabs: Profile, Subscribers, Financial, Documents, Activity
- [ ] Profile: Personal and company info
- [ ] Subscribers: Linked subscribers with name, mobile, company, status, incidents link
- [ ] Financial: Summary cards (total earnings, paid, pending) + payout table
- [ ] Documents: Document cards with upload status
- [ ] Activity: Chronological activity log

### Flow 4: Toggle Partner Status

**Steps:**
1. User clicks "Deactivate" on active partner
2. User confirms

**Expected Results:**
- [ ] Partner marked inactive
- [ ] Cannot onboard new subscribers
- [ ] Historical data preserved
- [ ] Reactivation available

### Flow 5: View Partner Incidents

**Steps:**
1. User opens partner detail
2. User clicks incident link on subscriber row

**Expected Results:**
- [ ] Read-only view of subscriber's incidents
- [ ] No edit actions available

---

## Empty State Tests

### No Partners
- [ ] Empty state with "Add Partner" CTA

### Partner with No Subscribers
- [ ] Subscribers tab shows empty state

### Partner with No Documents
- [ ] Documents tab shows upload prompts for each document type

---

## Edge Cases

- [ ] Financial data is system-generated (no manual overrides)
- [ ] All activity logged with timestamp and user
- [ ] Deactivated partners still visible in list (distinguished visually)
