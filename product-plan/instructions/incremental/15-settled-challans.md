# Milestone 15: Settled Challans

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

Implement the Settled Challans section — a read-only table for browsing resolved challans.

## Overview

A dedicated read-only table view for browsing all settled challans. Provides search, filtering, and export capabilities for quick lookup and reporting.

**Key Functionality:**
- Paginated table of settled challans
- Search across records (vehicle no, challan no, subscriber)
- Filter by date range, subscriber, state, amount
- Export filtered data as CSV/Excel
- Read-only — no row click or detail view

## Recommended Approach: Test-Driven Development

See `product-plan/sections/settled-challans/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/settled-challans/components/`:

- `SettledChallansDashboard` — Main table view

### Expected User Flows

### Flow 1: Browse Settled Challans
1. User navigates to Settled Challans
2. User sees paginated table with Vehicle No, Subscriber, Challan No, Offence Name
3. User searches by vehicle number
4. **Outcome:** Filtered results displayed

### Flow 2: Export Data
1. User applies filters (date range, state)
2. User clicks "Export"
3. **Outcome:** Filtered data downloaded as CSV

## Files to Reference

- `product-plan/sections/settled-challans/components/`
- `product-plan/sections/settled-challans/types.ts`
- `product-plan/sections/settled-challans/sample-data.json`
- `product-plan/sections/settled-challans/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Table renders with pagination
- [ ] Search works across records
- [ ] All filters work
- [ ] Export works
- [ ] Empty state shows when no records
- [ ] Responsive on mobile
