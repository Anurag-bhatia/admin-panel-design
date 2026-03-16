# Milestone 6: Lawyers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Lawyers module — the central system for managing the platform's external legal network.

## Overview

The Lawyers module replaces manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases. It provides full visibility into credentials, compliance status, expertise, and lifecycle management.

**Key Functionality:**
- Lawyer list table with Active/Inactive tabs and real-time counts
- Multi-step onboarding wizard (7 steps): Basic Info → Address → Qualifications/Experience → KYC Documents → Bank Details → Expertise/Preferences → Company Details
- Dedicated profile page with 4 tabs: Details, Incidents, Invoicing, Transactions
- Edit lawyer profile through the same multi-step wizard
- KYC document management (Aadhaar, PAN, DL, cancelled cheque, Bar ID, BALLB)
- Deactivate/reactivate lawyers
- Search by name/email/ID, filter by state/category

## Recommended Approach: Test-Driven Development

See `product-plan/sections/lawyers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `Lawyers` — Main view with table and tabs
- `LawyerTable` — Data table with Active/Inactive tabs
- `LawyerProfile` — Full profile page with 4 tabs
- `LawyerForm` — Multi-step onboarding/edit wizard

### Empty States

- **No lawyers yet:** CTA to add first lawyer
- **No incidents assigned:** Empty Incidents tab
- **No invoices:** Empty Invoicing tab
- **No transactions:** Empty Transactions tab

## Files to Reference

- `product-plan/sections/lawyers/README.md` — Feature overview
- `product-plan/sections/lawyers/tests.md` — Test-writing instructions
- `product-plan/sections/lawyers/components/` — React components
- `product-plan/sections/lawyers/types.ts` — TypeScript interfaces
- `product-plan/sections/lawyers/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Onboard New Lawyer
1. User clicks "Add Lawyer"
2. 7-step wizard opens with progress indicator
3. User completes each step: Basic Info → Address → Qualifications → KYC → Bank → Expertise → Company
4. **Outcome:** Lawyer created, appears in Active tab with onboarding/KYC status badges

### Flow 2: View Lawyer Profile
1. User clicks a lawyer row in the table
2. Profile page opens with header (photo, name, status, ID, contact)
3. User navigates 4 tabs: Details, Incidents, Invoicing, Transactions
4. **Outcome:** Complete lawyer information accessible

### Flow 3: Deactivate Lawyer
1. User clicks Actions dropdown → "Deactivate" on a lawyer row
2. Confirmation dialog appears
3. User confirms deactivation
4. **Outcome:** Lawyer moves to Inactive tab, removed from assignment pool, historical data preserved

## Done When

- [ ] Tests written and passing
- [ ] Lawyer list with Active/Inactive tabs and counts
- [ ] 7-step onboarding wizard works with validation per step
- [ ] Profile page renders with all 4 tabs
- [ ] KYC documents can be uploaded and previewed
- [ ] Status badges show (Onboarding Complete/Incomplete, KYC Verified/Pending)
- [ ] Deactivate/reactivate works
- [ ] Search and filters work
- [ ] Only active lawyers with verified KYC eligible for assignment
- [ ] Empty states display properly
- [ ] Responsive on mobile
