# Milestone 7: Partners

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

Implement the Partners module — the system for managing external business introducers who onboard subscribers on the platform.

## Overview

Partners can create and view subscribers linked to them, access high-level metrics about their business, and view read-only incidents related to their subscribers. All financial tracking, payouts, and system-wide access controls are managed centrally.

**Key Functionality:**
- Partner list table (Name, Partner ID, Contact, Company, Subscriber count, Status)
- 4-step onboarding stepper: Personal Info → Company Details → Service Scope → Permissions & Bank Account
- Partner detail page with tabs: Profile, Subscribers, Financial, Documents, Activity
- Toggle partner status (active/inactive)
- View linked subscribers and their incidents (read-only)
- System-calculated earnings and payout history
- Document management (GST, PAN, Business License)
- Search by name, filter by status

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `PartnerList` — Main list view
- `PartnerDetail` — Detail page with tabs
- `AddPartner` — 4-step onboarding stepper
- `AddPartnerChallanPay` — ChallanPay partner variant
- `EditPartner` — Partner editing form
- `PartnersDashboard` — Dashboard with metrics
- `PartnersListHeader` — Search, filters, Add Partner button

### Empty States

- **No partners yet:** CTA to add first partner
- **No subscribers:** Empty Subscribers tab
- **No payouts:** Empty Financial tab
- **No documents:** Empty Documents tab

## Files to Reference

- `product-plan/sections/partners/README.md` — Feature overview
- `product-plan/sections/partners/tests.md` — Test-writing instructions
- `product-plan/sections/partners/components/` — React components
- `product-plan/sections/partners/types.ts` — TypeScript interfaces
- `product-plan/sections/partners/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Onboard New Partner
1. User clicks "Add Partner"
2. 4-step stepper opens: Personal → Company → Service Scope → Permissions & Bank
3. User completes each step
4. **Outcome:** Partner created, appears in list as active

### Flow 2: View Partner Detail
1. User clicks a partner row
2. Detail page opens with tabs (Profile, Subscribers, Financial, Documents, Activity)
3. User views linked subscribers, earnings, documents
4. **Outcome:** Complete partner information accessible

### Flow 3: Toggle Partner Status
1. User clicks toggle/action to deactivate a partner
2. Confirmation appears
3. **Outcome:** Partner deactivated, cannot onboard new subscribers, historical data preserved

## Done When

- [ ] Tests written and passing
- [ ] Partner list with search and status filter
- [ ] 4-step onboarding works
- [ ] Detail page with all tabs
- [ ] Status toggle works (active/inactive)
- [ ] Linked subscribers display with incident links
- [ ] Financial summary and payout history display
- [ ] Document uploads work
- [ ] Empty states display properly
- [ ] Responsive on mobile
