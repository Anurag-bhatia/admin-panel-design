# Test Instructions: Lawyers

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Lawyers module manages the legal network with multi-step onboarding, KYC verification, and profile management.

---

## User Flow Tests

### Flow 1: View Lawyer List

**Steps:**
1. User navigates to Lawyers section
2. User sees table of lawyers

**Expected Results:**
- [ ] Active tab selected by default with count
- [ ] Table shows: Photo, Lawyer ID, Name, Email, Mobile, Onboarding Status, KYC Status, Activity State, Source
- [ ] Inactive tab shows count of inactive lawyers

### Flow 2: Add New Lawyer (7-Step Wizard)

**Steps:**
1. User clicks "Add Lawyer"
2. Step 1: Basic Info (category, name, email, mobile, gender, DOB)
3. Step 2: Address (current and permanent)
4. Step 3: Qualifications & Experience
5. Step 4: KYC (Aadhaar, PAN, DL, cheque, Bar ID, BALLB uploads)
6. Step 5: Bank Details
7. Step 6: Expertise & Preferences
8. Step 7: Company Details (conditional)

**Expected Results:**
- [ ] Progress indicator shows current step
- [ ] Navigation between steps works (next/back)
- [ ] Each step validates required fields
- [ ] "Same as current address" checkbox works in Step 2
- [ ] Document uploads show preview/icon
- [ ] Step 7 only shown if applicable
- [ ] On submit, lawyer appears in list

### Flow 3: View Lawyer Profile

**Steps:**
1. User clicks lawyer row
2. Profile page opens

**Expected Results:**
- [ ] Header: Photo, name, status, ID, contact, onboarding/KYC status
- [ ] 4 tabs: Details, Incidents, Invoicing, Transactions
- [ ] Details tab shows all profile sections
- [ ] Incidents tab: Table of assigned incidents
- [ ] Invoicing tab: Pending work not yet invoiced
- [ ] Transactions tab: Past paid transactions

### Flow 4: Deactivate Lawyer

**Steps:**
1. User clicks "Deactivate" on profile
2. User confirms

**Expected Results:**
- [ ] Lawyer moves to Inactive tab
- [ ] Historical data preserved
- [ ] Lawyer not available for new assignments

### Flow 5: Reactivate Lawyer

**Steps:**
1. User views inactive lawyer
2. User clicks "Reactivate"

**Expected Results:**
- [ ] Lawyer moves back to Active tab
- [ ] Available for assignments again

### Flow 6: Edit Lawyer Profile

**Steps:**
1. User clicks "Edit" from actions
2. Same wizard opens pre-filled
3. User modifies fields and saves

**Expected Results:**
- [ ] All fields pre-populated with current data
- [ ] Changes saved and reflected in profile
- [ ] Edit logged in audit trail

---

## Empty State Tests

### No Lawyers

**Expected Results:**
- [ ] Active tab shows "0" count
- [ ] Table shows empty state
- [ ] "Add Lawyer" button accessible

### Lawyer with No Incidents

**Expected Results:**
- [ ] Incidents tab shows empty state

### Lawyer with No Transactions

**Expected Results:**
- [ ] Transactions tab shows empty state

---

## Edge Cases

- [ ] Search works by name, email, ID, category, KYC status
- [ ] Filter by state and category works
- [ ] KYC status badges: Verified (green), Pending (amber), Missing (red)
- [ ] Onboarding status badges: Complete (green), Incomplete (amber)
- [ ] Only active lawyers with completed KYC eligible for assignment
- [ ] Category dropdown has all predefined options
