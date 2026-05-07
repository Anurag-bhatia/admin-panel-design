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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Partners section — business introducer management for external organizations that onboard subscribers.

## Overview

The Partner module manages external business introducers who onboard subscribers on the platform. Partners can create and view subscribers linked to them, access metrics, and view read-only incidents.

**Key Functionality:**
- View partner list with search, filters, and status toggle
- 4-step partner onboarding (Personal → Company → Service Scope → Permissions & Bank)
- Partner detail page with tabs: Profile, Subscribers, Financial, Documents, Activity
- Manage partner status (active/inactive)
- View linked subscribers and incidents (read-only)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/partners/components/`:

- `PartnersDashboard` — Main dashboard
- `PartnerList` — Partner table
- `PartnersListHeader` — Header with search and actions
- `AddPartner` — 4-step onboarding form
- `AddPartnerChallanPay` — ChallanPay specific partner form
- `EditPartner` — Edit partner details
- `PartnerDetail` — Full detail page

### Callbacks

- `onAddPartner` — Open onboarding form
- `onViewDetail` — Open detail page
- `onEditPartner` — Update partner info
- `onToggleStatus` — Activate/deactivate

## Expected User Flows

### Flow 1: Onboard Partner
1. User clicks "Add Partner"
2. User fills 4-step form: Personal → Company → Service Scope → Permissions & Bank
3. User clicks "Submit"
4. **Outcome:** Partner appears in active list

### Flow 2: View Partner Details
1. User clicks a partner row
2. User sees detail page with Profile, Subscribers, Financial, Documents, Activity tabs
3. **Outcome:** Complete partner information visible

### Flow 3: Deactivate Partner
1. User clicks "Deactivate" on partner detail
2. User confirms
3. **Outcome:** Partner marked inactive, can no longer onboard subscribers

## Files to Reference

- `product-plan/sections/partners/README.md`
- `product-plan/sections/partners/tests.md`
- `product-plan/sections/partners/components/`
- `product-plan/sections/partners/types.ts`
- `product-plan/sections/partners/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Partner list with search and filters works
- [ ] 4-step onboarding completes
- [ ] Detail page renders all tabs
- [ ] Status toggle works
- [ ] Empty states display properly
- [ ] Responsive on mobile
