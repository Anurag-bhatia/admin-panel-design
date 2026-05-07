# Milestone 13: Setup

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

Implement the Setup section — centralized system configuration hub.

## Overview

The Setup module is the centralized configuration hub for managing system-wide categories, data points, statuses, and configurable values used across all modules. All selectable values and operational metadata are managed here.

**Key Functionality:**
- Tabbed dashboard: Categories, Data Points, Statuses, Sources, Service Types, Geographic Values, Audit Log
- Slide-over panel for add/edit forms
- Status toggle (active/inactive) with badges
- Drag-to-reorder rows
- Per-section audit history
- Global audit log with filters
- Protected core values (locked, cannot be edited)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/setup/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/setup/components/`:

- `SetupDashboard` — Main setup view
- `SetupSidebar` — Navigation sidebar
- `SlideOverPanel` — Right slide-over form
- `MastersTable` — Generic config table
- `DepartmentsTable` — Departments configuration
- `DesignationsTable` — Designations configuration
- `GeographicTable` — Geographic values
- `PriceCategoriesTable` — Price categories
- `ServicesTable` — Service types
- `AuditLogTable` — Global audit log

### Expected User Flows

### Flow 1: Add Configuration Entry
1. User selects "Categories" tab
2. User clicks "Add" button
3. Slide-over panel opens from right
4. User fills name, description, module, status
5. User clicks "Save"
6. **Outcome:** Entry appears in table

### Flow 2: Edit and Deactivate Entry
1. User clicks a row in config table
2. Slide-over opens pre-filled with entry data
3. User toggles status to inactive
4. User clicks "Save"
5. **Outcome:** Entry marked inactive, hidden from future selections

### Flow 3: View Audit Log
1. User clicks "Audit Log" tab
2. User filters by area, user, date range
3. **Outcome:** Filtered timeline of configuration changes

## Files to Reference

- `product-plan/sections/setup/components/`
- `product-plan/sections/setup/types.ts`
- `product-plan/sections/setup/sample-data.json`
- `product-plan/sections/setup/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] All 7 config tabs render correctly
- [ ] Slide-over add/edit forms work
- [ ] Status toggle works
- [ ] Drag-to-reorder works
- [ ] Audit log with filters works
- [ ] Protected values are locked
- [ ] Empty states display properly
- [ ] Responsive on mobile
