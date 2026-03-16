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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Sales CRM — the central system for capturing, organizing, tracking, and converting all potential business opportunities through a structured pipeline.

## Overview

The Leads module replaces fragmented Excel-based lead tracking with a structured, real-time pipeline management system. Every lead is uniquely identifiable, actionable, and traceable across its entire lifecycle from initial capture through to conversion or loss.

**Key Functionality:**
- Tab-based pipeline view (All Leads, New, Assigned, Follow-up, Quotations, Projected, Ready to Invoice, Sales, Lost) with real-time counts
- Add single lead via structured form modal
- Bulk upload leads via Excel with template download and validation
- Search and filter leads by source, owner, service type, location
- Bulk update leads (change status or owner for selected leads)
- Lead detail view with activity timeline, assignments, and documents
- Assign/reassign leads to users
- Follow-up tracking with activity type, notes, next date, outcome
- My Leads personal view for assigned leads
- Document upload and management

## Recommended Approach: Test-Driven Development

See `product-plan/sections/sales-crm/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `LeadsDashboard` — Main dashboard with summary cards and pipeline
- `LeadsTable` — Data table with stage tabs
- `LeadsListHeader` — Search bar, filters, Add Lead, Bulk Upload buttons
- `AddLeadModal` — Lead creation form (Source, Type, Company, Contact, Location)
- `EditLeadModal` — Lead editing form
- `BulkUploadModal` — Excel upload with template download
- `BulkMoveLead` — Bulk status/owner change modal
- `BulkActionsBar` — Appears on selection
- `LeadDetailView` — Full detail with timeline, documents, assignments
- `AssignLeadModal` — Lead assignment to user
- `AddFollowUpModal` — Follow-up activity logging
- `UploadDocumentModal` — Document attachment
- `MyLeads` — Personal leads view

### Empty States

- **No leads yet:** Helpful CTA to create first lead
- **No leads in stage:** Empty tab with guidance
- **No follow-ups:** Empty timeline in detail view
- **No documents:** Empty documents section

## Files to Reference

- `product-plan/sections/sales-crm/README.md` — Feature overview
- `product-plan/sections/sales-crm/tests.md` — Test-writing instructions
- `product-plan/sections/sales-crm/components/` — React components
- `product-plan/sections/sales-crm/types.ts` — TypeScript interfaces
- `product-plan/sections/sales-crm/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Lead
1. User clicks "Add Lead" button
2. Modal opens with form (Source, Type, Sub Type, Company, Contact Person, Phone, Email, State, City)
3. User fills required fields and submits
4. **Outcome:** Lead appears in "New" tab, success message shown

### Flow 2: Bulk Upload Leads
1. User clicks "Bulk Upload Leads"
2. Modal opens with template download and file upload
3. User downloads template, fills it, uploads Excel file
4. **Outcome:** Leads created from file, validation errors shown if any

### Flow 3: View and Follow Up on Lead
1. User clicks a lead row to open detail view
2. User views timeline, assignments, documents
3. User clicks "Add Follow-Up" and records activity (type, notes, next date, outcome)
4. **Outcome:** Follow-up saved, visible in timeline, next follow-up date tracked

### Flow 4: Bulk Update Leads
1. User selects multiple leads via checkboxes
2. Bulk actions bar appears with "Bulk Update" button
3. User clicks Bulk Update, chooses Status or Owner change, selects new value
4. **Outcome:** All selected leads updated, confirmation shown

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Pipeline tabs display with correct counts
- [ ] Add Lead creates lead in correct stage
- [ ] Bulk upload works with validation
- [ ] Lead detail view shows full information and timeline
- [ ] Follow-ups can be added and tracked
- [ ] Bulk update works for status and owner
- [ ] My Leads shows only assigned leads
- [ ] Search and filters work
- [ ] Export works
- [ ] Empty states display properly
- [ ] Responsive on mobile
