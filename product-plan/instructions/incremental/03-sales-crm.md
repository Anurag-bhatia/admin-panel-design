# Milestone 3: Sales CRM

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

Implement the Sales CRM section — lead capture, qualification, and conversion tracking for prospective B2B clients.

## Overview

The Leads module replaces fragmented Excel-based lead tracking with a structured pipeline management system. Every lead is uniquely identifiable, actionable, and traceable across its lifecycle.

**Key Functionality:**
- Tab-based pipeline view (All Leads, New, Assigned, Follow-up, Quotations, Projected, Ready to Invoice, Sales, Lost)
- Add single leads and bulk upload via Excel
- Search and filter across multiple dimensions
- Lead detail view with activity timeline and documents
- Assign/reassign leads to team members
- Add follow-up activities with scheduling
- Bulk update status or owner
- Dashboard summary cards with key metrics

## Recommended Approach: Test-Driven Development

See `product-plan/sections/sales-crm/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/sales-crm/components/`:

- `LeadsDashboard` — Main dashboard with summary cards and table
- `LeadsTable` — Lead list table
- `LeadsListHeader` — Header with search, filters, actions
- `AddLeadModal` — Single lead creation form
- `BulkUploadModal` — Excel upload for bulk leads
- `EditLeadModal` — Edit lead form
- `AssignLeadModal` — Lead assignment
- `LeadDetailView` — Full lead detail page
- `AddFollowUpModal` — Follow-up activity recording
- `BulkActionsBar` — Bulk operations bar
- `BulkMoveLead` — Bulk status change
- `MyLeads` — Personal assigned leads view
- `UploadDocumentModal` — Document attachment

### Callbacks

- `onAddLead` — Create new lead
- `onBulkUpload` — Excel bulk import
- `onEditLead` — Update lead details
- `onAssignLead` — Assign/reassign
- `onAddFollowUp` — Record follow-up
- `onChangeStatus` — Update lifecycle stage
- `onBulkUpdate` — Bulk operations
- `onViewDetail` — Open detail view
- `onExport` — Export data

## Expected User Flows

### Flow 1: Add New Lead
1. User clicks "Add Lead"
2. User fills in source, company, contact details, service requirements
3. User clicks "Save"
4. **Outcome:** Lead appears in "New" tab

### Flow 2: Qualify and Assign
1. User views lead in pipeline
2. User clicks "Assign" from actions menu
3. User selects team member
4. **Outcome:** Lead moves to "Assigned" tab, assignment logged

### Flow 3: Follow Up
1. User opens lead detail view
2. User clicks "Add Follow Up"
3. User records activity type, notes, next follow-up date
4. **Outcome:** Follow-up logged in activity timeline

## Files to Reference

- `product-plan/sections/sales-crm/README.md`
- `product-plan/sections/sales-crm/tests.md`
- `product-plan/sections/sales-crm/components/`
- `product-plan/sections/sales-crm/types.ts`
- `product-plan/sections/sales-crm/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Pipeline tabs show correct counts
- [ ] Single and bulk lead creation works
- [ ] Lead assignment and reassignment works
- [ ] Follow-up activities can be recorded
- [ ] Lead detail view shows all information
- [ ] Bulk update operations work
- [ ] Empty states display properly
- [ ] Responsive on mobile
