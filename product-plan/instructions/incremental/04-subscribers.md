# Milestone 4: Subscribers

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

Implement the Subscribers section — active client account management and relationship tracking.

## Overview

The Subscribers module is the system of record for all customers subscribed to the platform's services. It manages the complete subscriber lifecycle from onboarding through service delivery, connecting sales, operations, and finance into a single traceable view.

**Key Functionality:**
- View subscriber list with search and filters
- Add subscribers individually or via bulk upload
- Full subscriber detail page with 7 tabs: Details, Challans, Incidents, Documents, Subscription, Wallet, Team
- Edit subscriber information
- Manage subscriptions, documents, and team assignments

## Recommended Approach: Test-Driven Development

See `product-plan/sections/subscribers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/subscribers/components/`:

- `SubscribersDashboard` — Main dashboard view
- `SubscriberList` — Subscriber table
- `AddSubscriberModal` — Subscriber creation form
- `BulkUploadModal` — Excel bulk import
- `SubscriberDetail` — Full detail page with tabs
- `ViewDetailsModal` — Quick view modal

### Callbacks

- `onAddSubscriber` — Create subscriber
- `onBulkUpload` — Excel bulk import
- `onViewDetail` — Open detail page
- `onEditSubscriber` — Update subscriber info
- `onManageSubscription` — Subscription management
- `onUploadDocument` — Document attachment

## Expected User Flows

### Flow 1: Add Subscriber
1. User clicks "Add Subscriber"
2. User fills in company details, contact info, service requirements
3. User clicks "Save"
4. **Outcome:** Subscriber appears in list

### Flow 2: View Subscriber Details
1. User clicks a subscriber row
2. User sees full-screen detail page with tabs
3. User navigates between Details, Challans, Incidents, etc.
4. **Outcome:** Complete subscriber information visible

### Flow 3: Manage Subscription
1. User opens subscriber detail page
2. User clicks "Subscription" tab
3. User views/updates subscription plan details
4. **Outcome:** Subscription changes saved

## Files to Reference

- `product-plan/sections/subscribers/README.md`
- `product-plan/sections/subscribers/tests.md`
- `product-plan/sections/subscribers/components/`
- `product-plan/sections/subscribers/types.ts`
- `product-plan/sections/subscribers/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Subscriber list with search and filters works
- [ ] Add subscriber (single and bulk) works
- [ ] Detail page renders all 7 tabs
- [ ] Edit subscriber works
- [ ] Empty states display properly
- [ ] Responsive on mobile
