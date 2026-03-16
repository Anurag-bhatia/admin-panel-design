# Milestone 15: Settled Challans

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 2 (Incidents) recommended

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

Implement the Settled Challans module — a dedicated read-only table view for browsing all settled challans.

## Overview

A simple archive view providing search, filtering, and export capabilities for quick lookup and reporting on resolved challans. This is a read-only module — no creation, editing, or detail views.

**Key Functionality:**
- Paginated table: Vehicle No, Subscriber, Challan No, Offence Name
- Full-text search across all fields
- Filters: date range, subscriber, state, amount
- Export filtered data as CSV/Excel
- Read-only — no row click, no detail view, no editing

## Recommended Approach: Test-Driven Development

See `product-plan/sections/settled-challans/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `SettledChallansDashboard` — Main table view with search, filters, export, pagination

### Data Layer

Query settled challans from the incidents/challans that have reached "Settled" status. This is a read-only view over existing data.

### Empty States

- **No settled challans:** "No settled challans yet"
- **No search results:** "No challans match your search"
- **No filter results:** "No challans match the selected filters"

## Files to Reference

- `product-plan/sections/settled-challans/README.md` — Feature overview
- `product-plan/sections/settled-challans/tests.md` — Test-writing instructions
- `product-plan/sections/settled-challans/components/` — React components
- `product-plan/sections/settled-challans/types.ts` — TypeScript interfaces
- `product-plan/sections/settled-challans/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Search Settled Challans
1. User enters search term (vehicle number, challan number, subscriber name)
2. Table filters in real-time
3. **Outcome:** Only matching records displayed

### Flow 2: Filter by Criteria
1. User applies date range, subscriber, state, and/or amount filters
2. Table updates to show only matching records
3. **Outcome:** Filtered view of settled challans

### Flow 3: Export Data
1. User applies desired filters
2. Clicks Export button
3. **Outcome:** CSV/Excel file downloads with filtered data

## Done When

- [ ] Tests written and passing
- [ ] Table displays settled challans with pagination
- [ ] Search works across all fields
- [ ] Date range filter works
- [ ] Subscriber, state, amount filters work
- [ ] Export downloads filtered data
- [ ] Table is read-only (no row click actions)
- [ ] Empty states display properly
- [ ] Responsive on mobile
