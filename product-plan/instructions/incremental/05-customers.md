# Milestone 5: Customers (Registered Visitors)

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

Implement the Customers module — the centralized system for managing all D2C registered visitors who use the platform independently.

## Overview

The Registered Visitors module provides operations, support, and finance teams with a unified view of each visitor, their vehicles, incidents, challans, and payment history. It acts as the single source of truth for all retail visitor interactions.

**Key Functionality:**
- Visitor list table (Name, ID, Mobile, Vehicle Details)
- Add new visitor via form modal
- Bulk upload visitors via CSV/Excel
- Full detail page with 5 tabs: Details, Incidents, Challans, Vehicles, Financials
- Edit visitor profile
- Track visitor incidents with quick status updates
- Review challan history across vehicles
- View read-only consolidated financials
- Activity log of all changes
- Bulk operations (export, status updates)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/customers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `CustomerList` — Main list view
- `CustomerListHeader` — Search, filters, Add/Bulk Upload buttons
- `CustomerTable` — Data table
- `CustomerRow` — Table row with visitor data
- `BulkUploadCustomers` — CSV/Excel upload modal
- `CustomerDetailView` — Full detail page with 5 tabs

### Empty States

- **No visitors yet:** CTA to add first visitor
- **No incidents:** Empty Incidents tab
- **No challans:** Empty Challans tab
- **No vehicles:** Empty Vehicles tab
- **No financials:** Empty Financials tab

## Files to Reference

- `product-plan/sections/customers/README.md` — Feature overview
- `product-plan/sections/customers/tests.md` — Test-writing instructions
- `product-plan/sections/customers/components/` — React components
- `product-plan/sections/customers/types.ts` — TypeScript interfaces
- `product-plan/sections/customers/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Visitor
1. User clicks "Add New Visitor"
2. Modal opens with form fields (name, mobile, email, etc.)
3. User fills in details and submits
4. **Outcome:** Visitor appears in list

### Flow 2: View Visitor Detail
1. User clicks a visitor row
2. Detail page opens with 5 tabs
3. User navigates tabs to view incidents, challans, vehicles, financials
4. **Outcome:** Complete visitor information accessible

### Flow 3: Bulk Upload
1. User clicks "Bulk Upload Visitors"
2. Uploads CSV/Excel file
3. System validates and creates records
4. **Outcome:** Multiple visitors created with validation feedback

## Done When

- [ ] Tests written and passing
- [ ] Visitor list displays with search
- [ ] Add visitor works
- [ ] Bulk upload works with validation
- [ ] Detail page renders with all 5 tabs
- [ ] Incidents tab shows visitor's incidents
- [ ] Financials tab shows read-only financial data
- [ ] Empty states display properly
- [ ] Responsive on mobile
