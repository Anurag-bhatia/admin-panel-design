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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Subscribers module — the system of record for all customers actively or historically subscribed to the platform's services.

## Overview

The Subscribers module manages the complete subscriber lifecycle from onboarding through service delivery, connecting sales, operations, and finance into a single traceable view. All operational activity — including challan submission — is gated by subscriber status.

**Key Functionality:**
- Subscriber list table (Subs-ID, Source, Company, Contact, Owner, Services, Subscription, Status)
- Add subscriber via structured form modal
- Bulk upload subscribers via Excel with template download and validation
- Full-screen detail page with 7 tabs: Details, Challans, Incidents, Documents, Subscription, Wallet, Team
- Edit subscriber information
- Manage subscriptions (plan, dates, vehicles, pricing, payment status)
- View linked challans and incidents
- Document upload and management
- Financial tracking (wallet, payments, invoices)
- Team member assignment

## Recommended Approach: Test-Driven Development

See `product-plan/sections/subscribers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `SubscribersDashboard` — Main dashboard view
- `SubscriberList` — Subscriber table with search, filters, actions
- `SubscriberDetail` — Full-screen detail page with 7-tab navigation

### Empty States

- **No subscribers yet:** CTA to add first subscriber
- **No challans:** Empty Challans tab
- **No incidents:** Empty Incidents tab
- **No documents:** Empty Documents tab
- **Empty wallet:** No transactions yet

## Files to Reference

- `product-plan/sections/subscribers/README.md` — Feature overview
- `product-plan/sections/subscribers/tests.md` — Test-writing instructions
- `product-plan/sections/subscribers/components/` — React components
- `product-plan/sections/subscribers/types.ts` — TypeScript interfaces
- `product-plan/sections/subscribers/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add Subscriber
1. User clicks "Add Subscriber"
2. Form captures Source, Type, Company details, Contact, Location, Owner, Partner (optional)
3. User fills required fields and submits
4. **Outcome:** Subscriber appears in list with Active status

### Flow 2: View Subscriber Detail
1. User clicks a subscriber row
2. Full-screen detail page opens with header (name, ID, status badge)
3. User navigates between 7 tabs to view different aspects
4. **Outcome:** All subscriber data accessible through tabbed navigation

### Flow 3: Bulk Upload Subscribers
1. User clicks "Bulk Upload Subscriber"
2. Downloads template, fills it, uploads Excel
3. System validates and creates subscribers
4. **Outcome:** Multiple subscribers created, validation errors shown if any

## Done When

- [ ] Tests written and passing
- [ ] Subscriber list displays with search and filters
- [ ] Add subscriber form works with validation
- [ ] Bulk upload works
- [ ] Detail page renders with all 7 tabs
- [ ] Status pills show Active (green) / Inactive (gray)
- [ ] Edit subscriber works
- [ ] Linked challans and incidents display
- [ ] Empty states display properly
- [ ] Responsive on mobile
