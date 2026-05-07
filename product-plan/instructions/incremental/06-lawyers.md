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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Lawyers section — legal professional network management with performance tracking and commission calculation.

## Overview

The Lawyers module manages the platform's external legal network, replacing manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases.

**Key Functionality:**
- View lawyers in active/inactive tabs with counts
- Multi-step onboarding wizard (7 steps: Basic Info, Address, Qualifications, KYC, Bank, Expertise, Company)
- Full lawyer profile page with tabs: Details, Incidents, Invoicing, Transactions
- Edit lawyer profiles
- KYC document verification
- Activate/deactivate lawyers

## Recommended Approach: Test-Driven Development

See `product-plan/sections/lawyers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/lawyers/components/`:

- `Lawyers` — Main lawyers view
- `LawyerList` — Lawyer table with active/inactive tabs
- `LawyerTable` — Data table
- `LawyerRow` — Individual lawyer row
- `LawyerForm` — Multi-step onboarding wizard
- `LawyerProfile` — Full profile page

### Callbacks

- `onAddLawyer` — Open onboarding wizard
- `onViewProfile` — Open profile page
- `onEditLawyer` — Edit profile
- `onDeactivate` / `onReactivate` — Toggle status
- `onVerifyKYC` — KYC verification

## Expected User Flows

### Flow 1: Onboard New Lawyer
1. User clicks "Add Lawyer"
2. User fills 7-step wizard: Basic Info → Address → Qualifications → KYC → Bank → Expertise → Company
3. User clicks "Submit"
4. **Outcome:** Lawyer appears in active list with pending KYC status

### Flow 2: View Lawyer Profile
1. User clicks a lawyer row
2. User sees full profile with all details
3. User navigates between Details, Incidents, Invoicing, Transactions tabs
4. **Outcome:** Complete lawyer information visible

### Flow 3: Deactivate Lawyer
1. User clicks "Deactivate" on lawyer profile
2. User confirms deactivation
3. **Outcome:** Lawyer moves to inactive tab, preserved in historical records

## Files to Reference

- `product-plan/sections/lawyers/README.md`
- `product-plan/sections/lawyers/tests.md`
- `product-plan/sections/lawyers/components/`
- `product-plan/sections/lawyers/types.ts`
- `product-plan/sections/lawyers/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Active/inactive tabs with counts work
- [ ] Multi-step onboarding wizard completes
- [ ] Profile page renders all tabs
- [ ] KYC verification flow works
- [ ] Activate/deactivate toggle works
- [ ] Empty states display properly
- [ ] Responsive on mobile
