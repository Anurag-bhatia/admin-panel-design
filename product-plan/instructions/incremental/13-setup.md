# Milestone 13: Setup (Admin Control)

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

Implement the Setup module — the centralized configuration hub for managing system-wide categories, data points, statuses, and configurable values.

## Overview

All selectable values and operational metadata used across Incidents, Leads, Subscribers, Lawyers, Payments, Disputes, and Reports are managed here instead of being hardcoded, ensuring the platform remains flexible and adaptable.

**Key Functionality:**
- Tabbed dashboard: Categories, Data Points, Statuses, Sources, Service Types, Geographic Values, Audit Log
- Add entries via slide-over panel from the right
- Edit entries (pre-filled slide-over)
- Activate/deactivate entries
- Drag-to-reorder rows for display priority
- Per-section audit history
- Global audit log with filters (user, area, date range)
- Protected core values (can't edit/deactivate)
- Hierarchical category support
- Admin-only access

## Recommended Approach: Test-Driven Development

See `product-plan/sections/setup/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `SetupDashboard` — Main tabbed view
- `SetupSidebar` — Navigation sidebar
- `SlideOverPanel` — Right-side panel for add/edit forms
- `ServicesTable` — Services configuration table
- `PriceCategoriesTable` — Price categories table
- `DepartmentsTable` — Departments table
- `DesignationsTable` — Designations table
- `MastersTable` — Master values table
- `GeographicTable` — Geographic values table
- `AuditLogTable` — Global audit log

### Empty States

- **No entries for tab:** "No entries yet. Click Add to create one."
- **No audit log entries:** "No changes recorded yet"
- **No search results:** "No entries match your search"

## Files to Reference

- `product-plan/sections/setup/README.md` — Feature overview
- `product-plan/sections/setup/tests.md` — Test-writing instructions
- `product-plan/sections/setup/components/` — React components
- `product-plan/sections/setup/types.ts` — TypeScript interfaces
- `product-plan/sections/setup/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add Configuration Entry
1. User selects a tab (e.g., Categories)
2. Clicks "Add" button
3. Slide-over panel opens from right with form
4. User fills name, description, module, status
5. **Outcome:** Entry appears in table

### Flow 2: Edit Entry
1. User clicks a row in the table
2. Slide-over opens pre-filled with existing data
3. User modifies fields and saves
4. **Outcome:** Entry updated, change logged in audit

### Flow 3: Reorder Entries
1. User drags a row to a new position
2. **Outcome:** Display order changes, reflected in dropdowns across platform

## Done When

- [ ] Tests written and passing
- [ ] All 7 tabs render with correct data
- [ ] Add entry via slide-over works
- [ ] Edit entry with pre-filled data works
- [ ] Activate/deactivate toggle works
- [ ] Drag-to-reorder works
- [ ] Per-section audit history visible
- [ ] Global audit log with filters
- [ ] Protected values can't be edited/deactivated (locked with tooltip)
- [ ] Admin-only access enforced
- [ ] Empty states display properly
- [ ] Responsive on mobile
