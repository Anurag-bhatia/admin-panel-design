# Admin Panel — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green


---

# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for typography setup

**Summary:**
- Primary: `cyan` — Actions, active states, links
- Secondary: `zinc` — Sidebar, borders, secondary elements
- Neutral: `slate` — Backgrounds, text, surfaces

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/README.md` for entity definitions and relationships
- Each section in `product-plan/sections/[section-id]/types.ts` has detailed interfaces

**Core entities:** Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

### 3. Routing Structure

Create placeholder routes for each section:

- `/login` — Authentication page
- `/incidents` — Incidents (default after login)
- `/sales-crm` — Sales CRM
- `/sales-crm/all-leads` — All Leads
- `/sales-crm/my-leads` — My Leads
- `/subscribers` — Subscribers
- `/customers` — Customers (Registered Visitors)
- `/lawyers` — Lawyers
- `/partners` — Partners
- `/payments` — Payments
- `/disputes` — Disputes
- `/support` — Support
- `/reports` — Reports
- `/team` — Team
- `/setup` — Setup (Admin Control)
- `/cms` — CMS
- `/settled-challans` — Settled Challans

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar + header + content
- `MainNav.tsx` — Sidebar navigation with collapsible sub-items
- `UserMenu.tsx` — User avatar dropdown with logout

**Wire Up Navigation:**

| Nav Item | Route | Icon |
|----------|-------|------|
| Incidents | /incidents | AlertTriangle |
| Sales CRM | /sales-crm | TrendingUp |
| → All Leads | /sales-crm/all-leads | — |
| → My Leads | /sales-crm/my-leads | — |
| Subscribers | /subscribers | Users |
| Customers | /customers | UserCheck |
| Lawyers | /lawyers | Scale |
| Partners | /partners | Handshake |
| Payments | /payments | CreditCard |
| Disputes | /disputes | ShieldAlert |
| Support | /support | HeadphonesIcon |
| Reports | /reports | BarChart3 |
| Team | /team | UsersRound |

**Sidebar Behavior:**
- Dark background (#212121)
- Collapsed by default (64px width), expands on hover (240px)
- Active items highlighted with `bg-cyan-600 text-white`
- Smooth 300ms transition animation

**User Menu:**
- Located in top-right of header
- Displays user name, email, avatar
- Dropdown with logout action

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (cyan/zinc/slate)
- [ ] Data model types are defined for core entities
- [ ] Routes exist for all 14 sections (can be placeholder pages)
- [ ] Login page renders
- [ ] Shell renders with dark sidebar navigation
- [ ] Sidebar collapses/expands on hover
- [ ] Navigation links to correct routes
- [ ] Active nav item highlighted in cyan
- [ ] Sales CRM sub-nav (All Leads / My Leads) works
- [ ] User menu shows user info and logout
- [ ] Responsive on mobile (bottom tab nav + hamburger overlay)

---

# Milestone 2: Incidents

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the Incidents feature — the core queue-driven ticket management system for handling challan and case resolution with strict 45-day TAT enforcement.

## Overview

The Incidents module replaces manual challan tracking with structured workflows featuring clear ownership, stage-based progression, and complete audit trails. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages. The module includes a collapsible sidebar for switching between All Incidents and My Incidents, with sub-sections for Cases and Challans.

**Key Functionality:**
- View challan queues with tab-based navigation (New Incidents, Screening, Lawyer Assigned, Settled, Not Settled, Refund)
- Collapsible sidebar navigation (All Incidents / My Incidents, Cases / Challans)
- Add new challans via form modal
- Validate and screen challans against external sources
- Bulk operations: assign agent/lawyer, move queue, bulk update via Excel upload
- Single-ticket operations via row action menu
- Full challan detail view with tabs: Follow Up, Timeline, Activity, Notes, Details, Call Summary
- 45-day TAT enforcement with visual countdown
- Add expense modal for financial tracking
- Export filtered/selected challans to Excel/CSV

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/incidents/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/incidents/components/`:

- `IncidentList` — Main list view with table
- `IncidentsSidebar` — Collapsible sidebar (All/My, Cases/Challans)
- `QueueTabs` — Horizontal queue stage tabs with counts
- `IncidentsTableHeader` — Search, filters, Add Challan, Export buttons
- `IncidentRow` — Table row with checkbox, data columns, action menu
- `BulkActionsBar` — Appears on selection (Validate, Screen, Assign Agent/Lawyer, Move Queue, Bulk Update)
- `Pagination` — Page navigation with items per page
- `IncidentDetailHeader` — Detail page header with back arrow, ID, action buttons
- `FollowUpTab` — Follow-up logging and history
- `TimelineTab` — Chronological action history
- `ActivityTab` — Activity sub-tabs (Follow-Up and Activity Log)
- `NotesTab` — Free-form internal notes
- `DetailsTab` — Challan information and documents
- `CallSummaryTab` — Call recordings with summaries
- `AddChallanModal` — New challan form
- `AssignAgentModal` — Agent assignment
- `AssignLawyerModal` — Lawyer assignment
- `MoveQueueModal` — Queue transfer
- `BulkUpdateModal` — Excel/CSV bulk update
- `ValidateResultsView` — Post-validation results display
- `ScreenResultsView` — Post-screening results with filters
- `AddExpenseModal` — Financial expense recording
- `AddCaseModal` — New case form

### Data Layer

The components expect data shapes defined in `product-plan/sections/incidents/types.ts`. You'll need to:
- Create database tables for incidents, follow-ups, assignments, documents
- Build API endpoints for CRUD operations, queue management, validation, screening
- Implement 45-day TAT calculation and tracking

### Empty States

- **No incidents yet:** Show helpful message when queue tabs are empty
- **No follow-ups:** Empty state in Follow Up tab
- **No documents:** Empty state in Details tab document section
- **No call recordings:** Empty state in Call Summary tab

## Files to Reference

- `product-plan/sections/incidents/README.md` — Feature overview
- `product-plan/sections/incidents/tests.md` — Test-writing instructions
- `product-plan/sections/incidents/components/` — React components
- `product-plan/sections/incidents/types.ts` — TypeScript interfaces
- `product-plan/sections/incidents/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Challan
1. User clicks "Add Challan" button in table header
2. Modal opens with form fields (subscriber, vehicle, type, source, challan details)
3. User fills in required fields and submits
4. **Outcome:** New challan appears in "New Incidents" queue tab, success confirmation shown

### Flow 2: Validate Challans
1. User selects one or more challans via checkboxes
2. Bulk actions bar appears, user clicks "Validate"
3. System checks challans against external source
4. **Outcome:** Validate Results View shows per-challan status (exists, already disposed, other)

### Flow 3: Assign Lawyer and Move Queue
1. User selects challans in "New Incidents" or "Screening" queue
2. User clicks "Assign Lawyer" from bulk actions
3. Modal shows available lawyers, user selects one and confirms
4. **Outcome:** Challans move to "Lawyer Assigned" queue, assignment logged in timeline

### Flow 4: View Challan Detail
1. User clicks a challan row in the table
2. Full detail page opens with header (back arrow, Incident ID, action buttons)
3. Left sidebar shows TAT countdown, subscriber info, vehicle info, assignments
4. Right area shows tabbed content (Activity, Notes, Details, Call Summary)
5. User adds a follow-up with notes, outcome, and next follow-up date
6. **Outcome:** Follow-up saved and visible in Activity tab, timeline updated

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Sidebar navigation works (All/My Incidents, Cases/Challans toggle)
- [ ] Queue tabs display with correct counts
- [ ] Add Challan creates and lands in New Incidents
- [ ] Validate and Screen show results
- [ ] Bulk actions work (assign, move queue, bulk update)
- [ ] Detail view renders with all tabs
- [ ] TAT countdown displays correctly (overdue in red)
- [ ] Follow-ups, notes, and documents can be added
- [ ] Export works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 3: Sales CRM

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 4: Subscribers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 5: Customers (Registered Visitors)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 6: Lawyers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the Lawyers module — the central system for managing the platform's external legal network.

## Overview

The Lawyers module replaces manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases. It provides full visibility into credentials, compliance status, expertise, and lifecycle management.

**Key Functionality:**
- Lawyer list table with Active/Inactive tabs and real-time counts
- Multi-step onboarding wizard (7 steps): Basic Info → Address → Qualifications/Experience → KYC Documents → Bank Details → Expertise/Preferences → Company Details
- Dedicated profile page with 4 tabs: Details, Incidents, Invoicing, Transactions
- Edit lawyer profile through the same multi-step wizard
- KYC document management (Aadhaar, PAN, DL, cancelled cheque, Bar ID, BALLB)
- Deactivate/reactivate lawyers
- Search by name/email/ID, filter by state/category

## Recommended Approach: Test-Driven Development

See `product-plan/sections/lawyers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `Lawyers` — Main view with table and tabs
- `LawyerTable` — Data table with Active/Inactive tabs
- `LawyerProfile` — Full profile page with 4 tabs
- `LawyerForm` — Multi-step onboarding/edit wizard

### Empty States

- **No lawyers yet:** CTA to add first lawyer
- **No incidents assigned:** Empty Incidents tab
- **No invoices:** Empty Invoicing tab
- **No transactions:** Empty Transactions tab

## Files to Reference

- `product-plan/sections/lawyers/README.md` — Feature overview
- `product-plan/sections/lawyers/tests.md` — Test-writing instructions
- `product-plan/sections/lawyers/components/` — React components
- `product-plan/sections/lawyers/types.ts` — TypeScript interfaces
- `product-plan/sections/lawyers/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Onboard New Lawyer
1. User clicks "Add Lawyer"
2. 7-step wizard opens with progress indicator
3. User completes each step: Basic Info → Address → Qualifications → KYC → Bank → Expertise → Company
4. **Outcome:** Lawyer created, appears in Active tab with onboarding/KYC status badges

### Flow 2: View Lawyer Profile
1. User clicks a lawyer row in the table
2. Profile page opens with header (photo, name, status, ID, contact)
3. User navigates 4 tabs: Details, Incidents, Invoicing, Transactions
4. **Outcome:** Complete lawyer information accessible

### Flow 3: Deactivate Lawyer
1. User clicks Actions dropdown → "Deactivate" on a lawyer row
2. Confirmation dialog appears
3. User confirms deactivation
4. **Outcome:** Lawyer moves to Inactive tab, removed from assignment pool, historical data preserved

## Done When

- [ ] Tests written and passing
- [ ] Lawyer list with Active/Inactive tabs and counts
- [ ] 7-step onboarding wizard works with validation per step
- [ ] Profile page renders with all 4 tabs
- [ ] KYC documents can be uploaded and previewed
- [ ] Status badges show (Onboarding Complete/Incomplete, KYC Verified/Pending)
- [ ] Deactivate/reactivate works
- [ ] Search and filters work
- [ ] Only active lawyers with verified KYC eligible for assignment
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 7: Partners

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the Partners module — the system for managing external business introducers who onboard subscribers on the platform.

## Overview

Partners can create and view subscribers linked to them, access high-level metrics about their business, and view read-only incidents related to their subscribers. All financial tracking, payouts, and system-wide access controls are managed centrally.

**Key Functionality:**
- Partner list table (Name, Partner ID, Contact, Company, Subscriber count, Status)
- 4-step onboarding stepper: Personal Info → Company Details → Service Scope → Permissions & Bank Account
- Partner detail page with tabs: Profile, Subscribers, Financial, Documents, Activity
- Toggle partner status (active/inactive)
- View linked subscribers and their incidents (read-only)
- System-calculated earnings and payout history
- Document management (GST, PAN, Business License)
- Search by name, filter by status

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `PartnerList` — Main list view
- `PartnerDetail` — Detail page with tabs
- `AddPartner` — 4-step onboarding stepper
- `AddPartnerChallanPay` — ChallanPay partner variant
- `EditPartner` — Partner editing form
- `PartnersDashboard` — Dashboard with metrics
- `PartnersListHeader` — Search, filters, Add Partner button

### Empty States

- **No partners yet:** CTA to add first partner
- **No subscribers:** Empty Subscribers tab
- **No payouts:** Empty Financial tab
- **No documents:** Empty Documents tab

## Files to Reference

- `product-plan/sections/partners/README.md` — Feature overview
- `product-plan/sections/partners/tests.md` — Test-writing instructions
- `product-plan/sections/partners/components/` — React components
- `product-plan/sections/partners/types.ts` — TypeScript interfaces
- `product-plan/sections/partners/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Onboard New Partner
1. User clicks "Add Partner"
2. 4-step stepper opens: Personal → Company → Service Scope → Permissions & Bank
3. User completes each step
4. **Outcome:** Partner created, appears in list as active

### Flow 2: View Partner Detail
1. User clicks a partner row
2. Detail page opens with tabs (Profile, Subscribers, Financial, Documents, Activity)
3. User views linked subscribers, earnings, documents
4. **Outcome:** Complete partner information accessible

### Flow 3: Toggle Partner Status
1. User clicks toggle/action to deactivate a partner
2. Confirmation appears
3. **Outcome:** Partner deactivated, cannot onboard new subscribers, historical data preserved

## Done When

- [ ] Tests written and passing
- [ ] Partner list with search and status filter
- [ ] 4-step onboarding works
- [ ] Detail page with all tabs
- [ ] Status toggle works (active/inactive)
- [ ] Linked subscribers display with incident links
- [ ] Financial summary and payout history display
- [ ] Document uploads work
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 8: Payments

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestones 2 (Incidents), 6 (Lawyers), 7 (Partners) recommended

---


## Goal

Implement the Payments module — the unified workspace for refund processing, lawyer fee management, and partner payouts.

## Overview

The Payments module handles refund processing, lawyer fee management, and partner payouts through a unified workspace with a collapsible sidebar to switch between four views: Refunds, Lawyer Fees, Leads, and Partners.

**Key Functionality:**
- Collapsible sidebar navigation (Refunds, Lawyer Fees, Leads, Partners)
- Refunds: Stage tabs (Refund Raised, Completed, Hold, Rejected), bulk approve/process, refund detail view
- Lawyer Fees: Stage tabs (To Pay, Completed), row click navigates to lawyer profile
- Partners: Stage tabs (To Pay, Completed), row click navigates to partner profile
- Search and filter per view
- Export to Excel/CSV
- Refund detail view with Activity and Notes tabs

## Recommended Approach: Test-Driven Development

See `product-plan/sections/payments/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `PaymentsDashboard` — Main workspace with sidebar
- `PaymentsSidebar` — Collapsible sidebar (Refunds, Lawyer Fees, Leads, Partners)
- `PaymentsStageTabs` — Horizontal stage tabs with counts
- `PaymentsTableHeader` — Search, filters, export
- `RefundRow` — Refund table row
- `LawyerFeeRow` — Lawyer fee table row
- `PartnerPayoutRow` — Partner payout table row
- `RefundBulkActionsBar` — Bulk approve/process for refunds
- `RefundDetailView` — Refund detail page
- `RefundActivityTab` — Activity log for refund
- `RefundNotesTab` — Notes for refund
- `Pagination` — Page navigation

### Empty States

- **No refunds:** Empty refund list
- **No lawyer fees:** Empty lawyer fees view
- **No partner payouts:** Empty partner payouts view

## Files to Reference

- `product-plan/sections/payments/README.md` — Feature overview
- `product-plan/sections/payments/tests.md` — Test-writing instructions
- `product-plan/sections/payments/components/` — React components
- `product-plan/sections/payments/types.ts` — TypeScript interfaces
- `product-plan/sections/payments/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Process Refund
1. User navigates to Payments → Refunds via sidebar
2. Selects refunds in "Refund Raised" stage
3. Clicks "Approve" in bulk actions bar
4. Confirms approval
5. **Outcome:** Refunds move to appropriate stage, status updates

### Flow 2: View Lawyer Fees
1. User clicks "Lawyer Fees" in sidebar
2. Views To Pay / Completed stage tabs
3. Clicks a row
4. **Outcome:** Navigates to that lawyer's profile in the Lawyers section

### Flow 3: Export Payments
1. User applies filters (status, date range)
2. Clicks Export button
3. **Outcome:** Filtered data downloads as CSV/Excel

## Done When

- [ ] Tests written and passing
- [ ] Sidebar navigation works between all 4 views
- [ ] Refund stage tabs with counts
- [ ] Bulk approve/process refunds works
- [ ] Refund detail view with Activity and Notes tabs
- [ ] Lawyer fees view with stage tabs
- [ ] Lawyer fee row click navigates to lawyer profile
- [ ] Partner payouts view with stage tabs
- [ ] Partner row click navigates to partner profile
- [ ] Search, filter, export work per view
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 9: Disputes

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 2 (Incidents) recommended

---


## Goal

Implement the Disputes module — the governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes.

## Overview

Unlike incidents (which are operational execution), disputes are review-driven challenges to outcomes or decisions, handled with higher scrutiny, documented reasoning, and configurable SLA enforcement. Every dispute must link to an entity (Incident, Subscriber, Customer, or Payment).

**Key Functionality:**
- Collapsible sidebar: All Disputes / My Disputes
- Stage tabs: Open, Under Review, Escalated, Resolved, Rejected with counts
- Create disputes (must link to entity) from Support, Incidents, Financials, or manually
- Bulk operations: Assign Reviewer, Change Priority (NO bulk resolution or refund approvals)
- Detail view: two-column with SLA sidebar + 5 tabs (Summary, Linked Incident, Investigation, Evidence, Activity)
- SLA enforcement (7-15 days configurable, escalation on breach)
- Every action logged with mandatory audit trail

## Recommended Approach: Test-Driven Development

See `product-plan/sections/disputes/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `DisputeList` — Main list view
- `DisputesSidebar` — All Disputes / My Disputes
- `StageTabs` — Stage tab navigation with counts
- `DisputesTableHeader` — Search, filters, export
- `DisputeRow` — Table row
- `DisputeBulkActionsBar` — Assign Reviewer, Change Priority
- `Pagination` — Page navigation
- `DisputeDetailView` — Full detail page
- `SummaryTab` — Dispute reason, description, evidence
- `LinkedIncidentTab` — Read-only incident snapshot
- `InvestigationTab` — Internal review notes
- `EvidenceTab` — Document uploads
- `DisputeActivityTab` — Action history
- `BulkUpdateModal` — Bulk operations
- `CreateDisputeModal` — New dispute form
- `AssignReviewerModal` — Reviewer assignment

### Empty States

- **No disputes yet:** Helpful message
- **No evidence:** Empty Evidence tab
- **No investigation notes:** Empty Investigation tab
- **No linked incident:** When dispute links to non-incident entity

## Files to Reference

- `product-plan/sections/disputes/README.md` — Feature overview
- `product-plan/sections/disputes/tests.md` — Test-writing instructions
- `product-plan/sections/disputes/components/` — React components
- `product-plan/sections/disputes/types.ts` — TypeScript interfaces
- `product-plan/sections/disputes/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Create Dispute
1. User clicks "Create Dispute" (or from linked module)
2. Form requires linking to an entity (Incident ID, Subscriber, Payment)
3. User fills dispute type, reason, description, priority
4. **Outcome:** Dispute created in "Open" stage

### Flow 2: Review and Resolve Dispute
1. Reviewer opens dispute detail from their queue
2. Reviews Summary tab, checks Linked Incident, reads Evidence
3. Adds investigation notes with reasoning
4. Clicks "Resolve" or "Reject" with mandatory notes
5. **Outcome:** Dispute moves to Resolved/Rejected, actions logged

### Flow 3: Escalate Dispute
1. Reviewer identifies dispute needs higher authority
2. Clicks "Escalate" action
3. Confirms escalation with notes
4. **Outcome:** Dispute moves to "Escalated" stage, SLA adjusts

## Done When

- [ ] Tests written and passing
- [ ] Sidebar navigation (All/My Disputes) works
- [ ] Stage tabs with correct counts
- [ ] Create dispute requires linked entity
- [ ] Bulk assign reviewer and change priority work
- [ ] Detail view with all 5 tabs
- [ ] SLA countdown displays (overdue in red)
- [ ] Investigation notes can be added
- [ ] Evidence documents can be uploaded
- [ ] Resolve/Reject/Escalate actions work
- [ ] Audit trail records all actions
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 10: Support

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the Support module — the centralized intake and triage system for all inbound messages from public touchpoints.

## Overview

The Support module captures, reviews, and routes every message into the appropriate internal workflow (Leads, Disputes, or Partnerships). It does not resolve issues — it acts as a structured gateway that converts raw customer communication into actionable system records.

**Key Functionality:**
- Table of unconverted submissions (Subject, Source, Type, Actions)
- Filter by Source and Type
- Sort by Type or Source
- Click row to view full details in read-only modal
- Convert via Actions: Convert to Lead, Convert to Dispute, Convert to Partnership
- Converted entries auto-hidden from main view
- All conversions logged in audit trail

## Recommended Approach: Test-Driven Development

See `product-plan/sections/support/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `SupportDashboard` — Main table view with filters
- `SubmissionDetailsModal` — Read-only detail popup

### Empty States

- **No submissions:** "No support submissions yet"
- **All converted:** "All submissions have been processed"
- **No results for filter:** "No submissions match your filters"

## Files to Reference

- `product-plan/sections/support/README.md` — Feature overview
- `product-plan/sections/support/tests.md` — Test-writing instructions
- `product-plan/sections/support/components/` — React components
- `product-plan/sections/support/types.ts` — TypeScript interfaces
- `product-plan/sections/support/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Review Submission
1. User sees table of unconverted submissions
2. Clicks a row (outside Actions dropdown)
3. Read-only modal shows full Subject, Message, submission time, source
4. **Outcome:** User understands the submission context

### Flow 2: Convert to Lead
1. User clicks Actions dropdown on a submission row
2. Selects "Convert to Lead"
3. System creates a lead prefilled with contact details and source
4. **Outcome:** Lead created, submission hidden from main view, conversion logged

### Flow 3: Convert to Dispute
1. User clicks Actions → "Convert to Dispute"
2. System creates dispute linked to the support message
3. **Outcome:** Dispute created, submission hidden, conversion logged

## Done When

- [ ] Tests written and passing
- [ ] Table displays unconverted submissions
- [ ] Filters work (Source, Type)
- [ ] Detail modal opens on row click (read-only, no action buttons)
- [ ] Convert to Lead creates lead with prefilled data
- [ ] Convert to Dispute creates linked dispute
- [ ] Convert to Partnership creates partner entry
- [ ] Converted entries hidden from view
- [ ] Audit trail records all conversions
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 11: Reports

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and at least some section milestones complete

---


## Goal

Implement the Reports module — the centralized intelligence and decision-making layer providing real-time analytics.

## Overview

The Reports module provides real-time, system-generated visibility into operations, sales, subscribers, partners, lawyers, payments, disputes, support, and internal teams. All stakeholders work from the same source of truth.

**Key Functionality:**
- Executive Dashboard with summary cards across all business domains
- Tab navigation: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Top filter bar (date range, state, service type, subscriber, partner, lawyer, team, status)
- Metric cards with click-to-drill-down to detailed tables
- Charts (bar, line, pie) for trends and breakdowns
- Export (PDF/CSV) per tab or per metric
- Role-based tab visibility

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `ReportsDashboard` — Main container with tab navigation
- `ExecutiveDashboard` — Landing view with summary cards
- `IncidentsTab` — Incident analytics
- `LeadsTab` — Lead analytics
- `SubscribersTab` — Subscriber analytics
- `PartnersTab` — Partner analytics
- `MetricCard` — Reusable metric card with drill-down

### Empty States

- **No data for period:** "No data available for the selected date range"
- **No data for tab:** Empty state per report category
- **No drill-down results:** "No detailed records found"

## Files to Reference

- `product-plan/sections/reports/README.md` — Feature overview
- `product-plan/sections/reports/tests.md` — Test-writing instructions
- `product-plan/sections/reports/components/` — React components
- `product-plan/sections/reports/types.ts` — TypeScript interfaces
- `product-plan/sections/reports/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Executive Dashboard
1. User navigates to Reports
2. Executive Dashboard shows summary cards for all domains
3. **Outcome:** High-level overview of all business metrics

### Flow 2: Drill Down into Metric
1. User clicks a metric card (e.g., "Total Incidents: 1,234")
2. Detailed table or expanded view appears below
3. **Outcome:** User sees the underlying records for that metric

### Flow 3: Filter and Export
1. User applies filters (date range, state, service type)
2. All metrics and charts update
3. User clicks Export → downloads CSV/PDF
4. **Outcome:** Filtered report exported

## Done When

- [ ] Tests written and passing
- [ ] Executive Dashboard renders with summary cards
- [ ] All 9 report tabs work
- [ ] Filters persist across tabs
- [ ] Metric card drill-down shows detailed data
- [ ] Charts render correctly
- [ ] Export works (CSV/PDF)
- [ ] Role-based tab visibility
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 12: Team

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the Team module — the organizational backbone for managing employees, teams, permissions, and access control.

## Overview

The Team section provides administrators with a structured interface for defining who is part of the system, how they're organized, and what they can access, eliminating manual people management.

**Key Functionality:**
- Two-tab layout: Employees and Teams
- Employee table (profile photo, name, department, designation, reporting manager, status)
- 3-step onboarding wizard: Profile Info → Create Credentials → Permissions
- Full-screen employee detail page with 2 tabs: Details, Permissions
- Permission management: module-level and flow-level switches
- Edit profile, deactivate/reactivate employees
- Teams table (name, department, lead, member count, status)
- Create/edit teams

## Recommended Approach: Test-Driven Development

See `product-plan/sections/team/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `TeamManagement` — Main view with Employees/Teams tabs
- `EmployeeTable` — Employee data table
- `TeamsTable` — Teams data table
- `EmployeeOnboardingWizard` — 3-step creation wizard
- `EditEmployeeModal` — Edit employee profile
- `PermissionsPage` — Module/flow permission toggles
- `CreateTeamModal` — New team form
- `EditTeamModal` — Edit team form
- `DeactivateConfirmDialog` — Deactivation confirmation
- `TeamDetailView` — Team detail page
- `EmployeeDetailView` — Employee detail with Details + Permissions tabs

### Empty States

- **No employees yet:** CTA to add first employee
- **No teams yet:** CTA to create first team
- **No team members:** Empty team detail

## Files to Reference

- `product-plan/sections/team/README.md` — Feature overview
- `product-plan/sections/team/tests.md` — Test-writing instructions
- `product-plan/sections/team/components/` — React components
- `product-plan/sections/team/types.ts` — TypeScript interfaces
- `product-plan/sections/team/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Employee
1. User clicks "Add Employee"
2. 3-step wizard: Step 1 (Profile Info: photo, name, email, department, designation, reporting managers) → Step 2 (Credentials: email, password) → Step 3 (Permissions: module/flow toggles)
3. **Outcome:** Employee created, appears in list, credentials ready for login

### Flow 2: Manage Permissions
1. User clicks an employee row → Detail page opens
2. User navigates to Permissions tab
3. Toggles module switches (enabling/disabling access)
4. Toggling a module off greys out its flows
5. Clicks "Save"
6. **Outcome:** Permissions updated, change logged in audit trail

### Flow 3: Create Team
1. User switches to Teams tab
2. Clicks "Create Team"
3. Fills in name, department, team lead, active members
4. **Outcome:** Team created, appears in teams list

## Done When

- [ ] Tests written and passing
- [ ] Employees tab shows employee table with status badges
- [ ] 3-step onboarding wizard works with validation
- [ ] Employee detail page with Details and Permissions tabs
- [ ] Permission toggles work (module disabling greys out flows)
- [ ] Edit profile works
- [ ] Deactivate/reactivate works
- [ ] Teams tab shows teams table
- [ ] Create/edit team works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 13: Setup (Admin Control)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 14: CMS

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---


## Goal

Implement the CMS module — content management for creating, editing, and publishing blogs, events, and news articles.

## Overview

The CMS provides a simple content management interface for maintaining customer-facing content across blogs and events/news sections.

**Key Functionality:**
- Two tabs: Blog and Events & News
- Blog list table (SR No, Name, Category, Author, Read Mins, Featured, Icon, Alt Text)
- Events & News table (SR No, Name, Category, Author, Read Mins, Icon, Status, Actions)
- Add blog with rich text editor
- Add event/news article
- Toggle enable/disable for events/news
- Edit and delete entries

## Recommended Approach: Test-Driven Development

See `product-plan/sections/cms/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `CMSDashboard` — Main tabbed view
- `BlogList` — Blog table
- `EventNewsList` — Events & News table
- `AddBlogPage` — Blog creation page with rich text editor
- `AddEventNewsPage` — Event/News creation page
- `RichTextEditor` — Content editor component

### Empty States

- **No blog posts:** "No blog posts yet. Click '+ Add Blog' to create one."
- **No events/news:** "No events or news yet. Click '+ Add Event and News' to create one."

## Files to Reference

- `product-plan/sections/cms/README.md` — Feature overview
- `product-plan/sections/cms/tests.md` — Test-writing instructions
- `product-plan/sections/cms/components/` — React components
- `product-plan/sections/cms/types.ts` — TypeScript interfaces
- `product-plan/sections/cms/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Create Blog Post
1. User clicks "+ Add Blog"
2. Form opens with fields: Title, Category, Author, Read Mins, Featured toggle, Icon upload, Alt Text, Content (rich text)
3. User fills in details and submits
4. **Outcome:** Blog post appears in Blog tab list

### Flow 2: Create Event/News
1. User switches to "Events & News" tab
2. Clicks "+ Add Event and News"
3. Fills form with title, category, author, content
4. **Outcome:** Entry appears in list as Enabled by default

### Flow 3: Toggle Event Status
1. User clicks enable/disable toggle on an event row
2. **Outcome:** Event status changes immediately

## Done When

- [ ] Tests written and passing
- [ ] Blog tab shows blog list
- [ ] Add blog works with rich text editor
- [ ] Events & News tab shows entries
- [ ] Add event/news works
- [ ] Toggle enable/disable works
- [ ] Edit and delete work
- [ ] Image upload works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 15: Settled Challans

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 2 (Incidents) recommended

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
