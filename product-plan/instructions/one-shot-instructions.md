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

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

# Admin Panel — Product Overview

## Summary

A B2B operations platform that manages the complete lifecycle of traffic challan resolution services for fleet operators and corporate clients. From lead acquisition and subscriber onboarding to challan processing, lawyer management, payments, and dispute resolution, Admin Panel replaces Excel-driven operations with an automated, auditable system that scales with volume while maintaining accuracy and accountability.

## Planned Sections

1. **Incidents** — Core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement with automated lawyer coordination
2. **Sales CRM** — Lead capture, qualification, and conversion tracking for prospective B2B clients with separate views for all leads and assigned leads
3. **Subscribers** — Active client account management and relationship tracking for B2B fleet operators and companies
4. **Customers** — Customer profile management and service delivery tracking for individual end-users and fleet operators
5. **Lawyers** — Legal professional network management with performance tracking and commission calculation
6. **Partners** — Partner relationship management for data sources, referral partners, and service delivery partners
7. **Payments** — Commission and refund payment processing with automated calculations and financial tracking
8. **Disputes** — Customer dispute resolution workflow for handling challenges regarding charges, refunds, or service outcomes
9. **Support** — Support ticket management system for handling subscriber inquiries and issues
10. **Reports** — Comprehensive reporting dashboards and analytics across all business metrics and operations
11. **Team** — User and team administration for managing internal operations staff and permissions
12. **Setup** — Centralized configuration hub for managing system-wide categories, data points, statuses, and configurable values used across all modules
13. **CMS** — Content management system for creating, editing, and publishing blogs, events, and news articles
14. **Settled Challans** — Read-only view for browsing all settled challans with search, filtering, and export
15. **Proposals** — Proposal management for receiving, reviewing, quoting, and converting customer service requests into incidents

## Data Model

**Entities:** Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

**Key Relationships:**
- Lead converts to Subscriber
- Subscriber has many Incidents, Disputes, Support Tickets, Refunds
- Incident has many Assignments (for tracking reassignments and resolution attempts)
- Incident may have one Commission (when successfully resolved)
- Incident may have one Refund (when resolution fails)
- Assignment connects Incident and Lawyer
- Lawyer has many Assignments and Commissions
- Commission belongs to Lawyer and Incident
- Refund belongs to Subscriber and Incident
- Dispute belongs to Subscriber
- Support Ticket belongs to Subscriber
- Payment can be for Commission or Refund
- Audit Log tracks changes to any entity in the system

## Design System

**Colors:**
- Primary: `cyan` — Buttons, links, active states, key accents
- Secondary: `zinc` — Tags, highlights, secondary elements
- Neutral: `slate` — Backgrounds, text, borders

**Typography:**
- Heading: Geist
- Body: Geist
- Mono: Geist Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Incidents** — Queue-driven challan workflow with screening, assignment, and SLA enforcement
3. **Sales CRM** — Lead pipeline with lifecycle stages, follow-ups, and conversions
4. **Subscribers** — Client account management with subscription tracking
5. **Customers** — D2C visitor profile management and service tracking
6. **Lawyers** — Legal network onboarding, credentialing, and performance tracking
7. **Partners** — Business introducer management with subscriber linking
8. **Payments** — Refund processing, lawyer fees, and partner payouts
9. **Disputes** — Escalation engine with SLA-driven resolution workflow
10. **Support** — Inbound message triage and routing gateway
11. **Reports** — Executive dashboards and domain-specific analytics
12. **Team** — Employee and team administration with permissions
13. **Setup** — System-wide configuration and audit logging
14. **CMS** — Blog, events, and news content management
15. **Settled Challans** — Read-only settled challan browsing and export
16. **Proposals** — Service request intake, quoting, and incident conversion

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

---

# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:** Primary: cyan, Secondary: zinc, Neutral: slate
**Typography:** Geist (headings + body), Geist Mono (code/monospace)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

Core entities: Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/incidents` | Incidents |
| `/sales-crm` | Sales CRM (All Leads) |
| `/sales-crm/my-leads` | Sales CRM (My Leads) |
| `/subscribers` | Subscribers |
| `/customers` | Customers |
| `/lawyers` | Lawyers |
| `/partners` | Partners |
| `/payments` | Payments |
| `/disputes` | Disputes |
| `/support` | Support |
| `/reports` | Reports |
| `/team` | Team |
| `/setup` | Setup |
| `/cms` | CMS |
| `/settled-challans` | Settled Challans |
| `/proposals` | Proposals |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar + content area
- `MainNav.tsx` — Navigation component with collapsible sections
- `UserMenu.tsx` — User menu with avatar and dropdown

**Wire Up Navigation:**

| Nav Item | Route | Icon |
|----------|-------|------|
| Incidents | `/incidents` | AlertTriangle |
| Sales CRM | — | TrendingUp |
| → All Leads | `/sales-crm` | — |
| → My Leads | `/sales-crm/my-leads` | — |
| Subscribers | `/subscribers` | Users |
| Customers | `/customers` | UserCheck |
| Lawyers | `/lawyers` | Scale |
| Partners | `/partners` | Handshake |
| Payments | `/payments` | CreditCard |
| Disputes | `/disputes` | Shield |
| Support | `/support` | MessageSquare |
| Reports | `/reports` | BarChart3 |
| Team | `/team` | Users2 |

**Shell Design:**
- Sidebar: #212121 background, zinc-800 borders, 240px wide (collapsible to 64px)
- Active nav items: cyan-600 background, white text
- Desktop: Hover-to-expand sidebar
- Mobile: Bottom tab navigation with top 5 sections

**User Menu:**
- User name, email, optional avatar
- Logout callback

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (cyan/zinc/slate colors, Geist fonts)
- [ ] Data model types are defined
- [ ] Routes exist for all 15 sections (can be placeholder pages)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info with logout
- [ ] Sidebar collapses/expands on hover (desktop)
- [ ] Mobile bottom tab navigation works
- [ ] Responsive on mobile

---

# Milestone 2: Incidents

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Incidents section — the core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement.

## Overview

The Incidents module is a queue-driven ticket management system for handling challan and case-related work with strict 45-day TAT enforcement. Every challan lives in exactly one execution queue at a time, with rule-based movement between stages.

**Key Functionality:**
- View challans in queue-based tabs (New Incidents, Screening, Agent Assigned, Lawyer Assigned, Settled, Not Settled, Hold, Refund)
- Add new challans with subscriber/customer linking
- Validate and screen challans against external sources
- Assign agents and lawyers with permission controls
- Move challans between queues
- Full detail view with Follow Up, Timeline, Details, Call Summary, Notes tabs
- Bulk operations (validate, screen, assign, move queue, bulk update)
- 45-day TAT enforcement with visual indicators
- Separate Cases workType with different queue tabs and actions

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incidents/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/incidents/components/`:

- `IncidentList` — Main list view with queue tabs and table
- `IncidentRow` — Individual challan row
- `IncidentsTableHeader` — Table header with search, filters, actions
- `IncidentsSidebar` — Collapsible sidebar (All/My Incidents, Cases/Challans)
- `QueueTabs` — Queue stage tabs with counts
- `BulkActionsBar` — Bulk operations bar
- `IncidentDetailHeader` — Detail page header with actions
- `AddChallanModal` — New challan form
- `AddCaseModal` — New case form
- `AddExpenseModal` — Expense recording
- `AssignAgentModal` — Agent assignment
- `AssignLawyerModal` — Lawyer assignment
- `MoveQueueModal` — Queue movement
- `BulkUpdateModal` — Bulk CSV/Excel update
- `ValidateResultsView` — Validation results
- `ScreenResultsView` — Screening results
- `ActivityTab`, `FollowUpTab`, `TimelineTab`, `DetailsTab`, `NotesTab`, `CallSummaryTab` — Detail tabs
- `Pagination` — Table pagination

### Data Layer

Key types: `Incident`, `IncidentListProps`

The Incident type includes `workType` field (`'case'` | `'challan'`) which determines different behavior for queue tabs, available actions, and expense fields.

### Callbacks

- `onAddChallan` / `onAddCase` — Create new incident
- `onValidate` / `onScreen` — External validation/screening
- `onAssignAgent` / `onAssignLawyer` — Assignment
- `onMoveQueue` — Queue movement
- `onBulkUpdate` — CSV/Excel bulk update
- `onAddExpense` — Record expense
- `onExport` — Export to CSV/Excel
- `onViewDetail` — Open detail view
- `onAddFollowUp` — Log follow-up activity
- `onNavigate` — Navigate between views

## Expected User Flows

### Flow 1: Add New Challan
1. User clicks "Add Challan" button
2. User fills in challan details, subscriber, vehicle, type
3. User clicks "Save"
4. **Outcome:** New challan appears in "New Incidents" queue

### Flow 2: Screen and Assign
1. User selects challans in "New Incidents" queue
2. User clicks "Screen" → views screening results
3. User selects challans and clicks "Assign Lawyer"
4. User picks a lawyer from modal
5. **Outcome:** Challans move to "Lawyer Assigned" queue

### Flow 3: View and Follow Up
1. User clicks a challan row to open detail view
2. User sees TAT countdown, subscriber info, assignments
3. User clicks "Add Follow-Up" in Activity tab
4. User records follow-up notes and next date
5. **Outcome:** Follow-up logged in activity timeline

## Files to Reference

- `product-plan/sections/incidents/README.md`
- `product-plan/sections/incidents/tests.md`
- `product-plan/sections/incidents/components/`
- `product-plan/sections/incidents/types.ts`
- `product-plan/sections/incidents/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Queue tabs show correct counts
- [ ] Challans display in correct queues
- [ ] Add challan/case creates new incidents
- [ ] Validate and screen work with external APIs
- [ ] Agent and lawyer assignment works
- [ ] Queue movement works
- [ ] Bulk operations work
- [ ] Detail view shows all tabs with data
- [ ] 45-day TAT indicator works
- [ ] Cases and challans behave differently per workType
- [ ] Empty states display when no records exist
- [ ] Responsive on mobile

---

# Milestone 3: Sales CRM

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 4: Subscribers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 5: Customers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Customers section — D2C visitor profile management and service delivery tracking.

## Overview

The Customers module manages all direct-to-consumer visitors who use the platform independently. It provides operations, support, and finance teams with a unified view of each visitor, their vehicles, incidents, challans, and payment history.

**Key Functionality:**
- Browse and search D2C visitors
- Add new visitors individually or via bulk upload
- Full visitor detail page with tabs: Details, Incidents, Challans, Vehicles, Financials
- Edit visitor profiles
- Create incidents from visitor detail page
- View activity log

## Recommended Approach: Test-Driven Development

See `product-plan/sections/customers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/customers/components/`:

- `CustomerList` — Main customer list
- `CustomerTable` — Customer data table
- `CustomerRow` — Individual customer row
- `CustomerListHeader` — Header with search and actions
- `CustomerDetailView` — Full detail page
- `BulkUploadCustomers` — Bulk import

### Callbacks

- `onAddCustomer` — Create visitor
- `onBulkUpload` — Excel bulk import
- `onViewDetail` — Open detail page
- `onEditCustomer` — Update visitor info
- `onCreateIncident` — Create incident from detail page

## Expected User Flows

### Flow 1: Browse Visitors
1. User navigates to Customers section
2. User sees table of all visitors
3. User searches by name, mobile, or visitor ID
4. **Outcome:** Filtered results displayed

### Flow 2: View Visitor Details
1. User clicks a visitor row
2. User sees detail page with tabs
3. User navigates between Details, Incidents, Challans, Vehicles, Financials
4. **Outcome:** Complete visitor information visible

### Flow 3: Create Incident
1. User opens visitor detail page
2. User clicks "Create Incident"
3. User fills in incident details
4. **Outcome:** Incident created and linked to visitor

## Files to Reference

- `product-plan/sections/customers/README.md`
- `product-plan/sections/customers/tests.md`
- `product-plan/sections/customers/components/`
- `product-plan/sections/customers/types.ts`
- `product-plan/sections/customers/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Customer list with search works
- [ ] Add customer (single and bulk) works
- [ ] Detail page renders all tabs
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 6: Lawyers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Lawyers section — legal professional network management with performance tracking and commission calculation.

## Overview

The Lawyers module manages the platform's external legal network, replacing manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases.

**Key Functionality:**
- View lawyers in active/inactive tabs with counts
- Multi-step onboarding wizard (7 steps: Basic Info, Address, Qualifications, KYC, Bank, Expertise, Company)
- Full lawyer profile page with tabs: Details, Incidents, Invoicing, Transactions
- Edit lawyer profiles
- KYC document verification
- Activate/deactivate lawyers

## Recommended Approach: Test-Driven Development

See `product-plan/sections/lawyers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/lawyers/components/`:

- `Lawyers` — Main lawyers view
- `LawyerList` — Lawyer table with active/inactive tabs
- `LawyerTable` — Data table
- `LawyerRow` — Individual lawyer row
- `LawyerForm` — Multi-step onboarding wizard
- `LawyerProfile` — Full profile page

### Callbacks

- `onAddLawyer` — Open onboarding wizard
- `onViewProfile` — Open profile page
- `onEditLawyer` — Edit profile
- `onDeactivate` / `onReactivate` — Toggle status
- `onVerifyKYC` — KYC verification

## Expected User Flows

### Flow 1: Onboard New Lawyer
1. User clicks "Add Lawyer"
2. User fills 7-step wizard: Basic Info → Address → Qualifications → KYC → Bank → Expertise → Company
3. User clicks "Submit"
4. **Outcome:** Lawyer appears in active list with pending KYC status

### Flow 2: View Lawyer Profile
1. User clicks a lawyer row
2. User sees full profile with all details
3. User navigates between Details, Incidents, Invoicing, Transactions tabs
4. **Outcome:** Complete lawyer information visible

### Flow 3: Deactivate Lawyer
1. User clicks "Deactivate" on lawyer profile
2. User confirms deactivation
3. **Outcome:** Lawyer moves to inactive tab, preserved in historical records

## Files to Reference

- `product-plan/sections/lawyers/README.md`
- `product-plan/sections/lawyers/tests.md`
- `product-plan/sections/lawyers/components/`
- `product-plan/sections/lawyers/types.ts`
- `product-plan/sections/lawyers/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Active/inactive tabs with counts work
- [ ] Multi-step onboarding wizard completes
- [ ] Profile page renders all tabs
- [ ] KYC verification flow works
- [ ] Activate/deactivate toggle works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 7: Partners

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Partners section — business introducer management for external organizations that onboard subscribers.

## Overview

The Partner module manages external business introducers who onboard subscribers on the platform. Partners can create and view subscribers linked to them, access metrics, and view read-only incidents.

**Key Functionality:**
- View partner list with search, filters, and status toggle
- 4-step partner onboarding (Personal → Company → Service Scope → Permissions & Bank)
- Partner detail page with tabs: Profile, Subscribers, Financial, Documents, Activity
- Manage partner status (active/inactive)
- View linked subscribers and incidents (read-only)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/partners/components/`:

- `PartnersDashboard` — Main dashboard
- `PartnerList` — Partner table
- `PartnersListHeader` — Header with search and actions
- `AddPartner` — 4-step onboarding form
- `AddPartnerChallanPay` — ChallanPay specific partner form
- `EditPartner` — Edit partner details
- `PartnerDetail` — Full detail page

### Callbacks

- `onAddPartner` — Open onboarding form
- `onViewDetail` — Open detail page
- `onEditPartner` — Update partner info
- `onToggleStatus` — Activate/deactivate

## Expected User Flows

### Flow 1: Onboard Partner
1. User clicks "Add Partner"
2. User fills 4-step form: Personal → Company → Service Scope → Permissions & Bank
3. User clicks "Submit"
4. **Outcome:** Partner appears in active list

### Flow 2: View Partner Details
1. User clicks a partner row
2. User sees detail page with Profile, Subscribers, Financial, Documents, Activity tabs
3. **Outcome:** Complete partner information visible

### Flow 3: Deactivate Partner
1. User clicks "Deactivate" on partner detail
2. User confirms
3. **Outcome:** Partner marked inactive, can no longer onboard subscribers

## Files to Reference

- `product-plan/sections/partners/README.md`
- `product-plan/sections/partners/tests.md`
- `product-plan/sections/partners/components/`
- `product-plan/sections/partners/types.ts`
- `product-plan/sections/partners/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Partner list with search and filters works
- [ ] 4-step onboarding completes
- [ ] Detail page renders all tabs
- [ ] Status toggle works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 8: Payments

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Payments section — refund processing, lawyer fee management, and partner payouts.

## Overview

The Payments module handles refund processing, lawyer fee management, and partner payouts through a unified workspace with a collapsible sidebar to switch between Refunds, Lawyer Fees, Leads, and Partners views.

**Key Functionality:**
- Refund processing with stage tabs (Refund Raised, Completed, Hold, Rejected)
- Lawyer fee tracking with stages (To Pay, Completed)
- Partner payout management with stages (To Pay, Completed)
- Bulk approve/process refunds
- Search and filter across all views
- Export capabilities
- Navigation to lawyer/partner profiles from rows

## Recommended Approach: Test-Driven Development

See `product-plan/sections/payments/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/payments/components/`:

- `PaymentsDashboard` — Main workspace
- `PaymentsSidebar` — Collapsible sidebar (Refunds, Lawyer Fees, Leads, Partners)
- `PaymentsStageTabs` — Stage tabs with counts
- `PaymentsTableHeader` — Header with search and filters
- `RefundRow` — Refund table row
- `LawyerFeeRow` — Lawyer fee table row
- `PartnerPayoutRow` — Partner payout row
- `RefundDetailView` — Refund detail page
- `RefundBulkActionsBar` — Bulk operations for refunds
- `RefundActivityTab` — Refund activity history
- `RefundNotesTab` — Refund notes
- `Pagination` — Table pagination

### Callbacks

- `onApproveRefund` / `onProcessRefund` — Refund operations
- `onBulkApprove` / `onBulkProcess` — Bulk refund operations
- `onNavigateToLawyer` — Link to lawyer profile
- `onNavigateToPartner` — Link to partner profile
- `onExport` — Export data
- `onMarkAsPaid` — Mark partner payout as paid

## Expected User Flows

### Flow 1: Process Refund
1. User selects "Refunds" in sidebar
2. User views refunds in "Refund Raised" tab
3. User selects refunds and clicks "Approve"
4. User confirms approval
5. **Outcome:** Refunds move to "Completed" tab

### Flow 2: Review Lawyer Fees
1. User selects "Lawyer Fees" in sidebar
2. User views fees in "To Pay" tab
3. User clicks a row to navigate to lawyer profile
4. **Outcome:** Lawyer profile opens in Lawyers section

### Flow 3: Mark Partner Payout
1. User selects "Partners" in sidebar
2. User views payouts in "To Pay" tab
3. User clicks "Mark as Paid" on a payout row
4. **Outcome:** Payout moves to "Completed" tab

## Files to Reference

- `product-plan/sections/payments/README.md`
- `product-plan/sections/payments/tests.md`
- `product-plan/sections/payments/components/`
- `product-plan/sections/payments/types.ts`
- `product-plan/sections/payments/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Sidebar navigation between views works
- [ ] Stage tabs show correct counts
- [ ] Refund approval and processing works
- [ ] Lawyer fee tracking displays correctly
- [ ] Partner payout management works
- [ ] Cross-section navigation works (to lawyer/partner profiles)
- [ ] Export works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 9: Disputes

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Disputes section — customer dispute resolution workflow for escalation and governance.

## Overview

The Disputes module is a governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes. Unlike incidents (operational execution), disputes are review-driven challenges handled with higher scrutiny and configurable SLA enforcement.

**Key Functionality:**
- Stage-based dispute tracking (Open, Under Review, Escalated, Resolved, Rejected)
- Collapsible sidebar: All Disputes, My Disputes
- Create disputes linked to incidents, subscribers, or payments
- Assign reviewers and escalate disputes
- Full detail view with Summary, Linked Incident, Investigation, Evidence, Activity tabs
- Bulk operations (assign reviewer, change priority)
- Configurable SLA enforcement (7-15 days)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/disputes/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/disputes/components/`:

- `DisputeList` — Main dispute list
- `DisputeRow` — Individual dispute row
- `DisputesTableHeader` — Header with search and filters
- `DisputesSidebar` — Collapsible sidebar
- `StageTabs` — Stage tabs with counts
- `DisputeBulkActionsBar` — Bulk operations
- `DisputeDetailView` — Full detail page
- `CreateDisputeModal` — Dispute creation form
- `AssignReviewerModal` — Reviewer assignment
- `BulkUpdateModal` — Bulk operations
- `ImportDisputesModal` — Import disputes
- `SummaryTab`, `LinkedIncidentTab`, `InvestigationTab`, `EvidenceTab`, `DisputeActivityTab` — Detail tabs
- `Pagination` — Table pagination

### Expected User Flows

### Flow 1: Create Dispute
1. User clicks "Create Dispute"
2. User links to incident/subscriber/payment
3. User fills in dispute type, reason, priority
4. **Outcome:** Dispute appears in "Open" tab

### Flow 2: Review and Resolve
1. User assigns reviewer to dispute
2. Reviewer investigates and adds notes
3. Reviewer approves refund or rejects dispute
4. **Outcome:** Dispute moves to "Resolved" or "Rejected"

### Flow 3: Escalate
1. User opens dispute nearing SLA deadline
2. User clicks "Escalate"
3. **Outcome:** Dispute moves to "Escalated" tab with increased priority

## Files to Reference

- `product-plan/sections/disputes/components/`
- `product-plan/sections/disputes/types.ts`
- `product-plan/sections/disputes/sample-data.json`
- `product-plan/sections/disputes/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Stage tabs show correct counts
- [ ] Dispute creation with linking works
- [ ] Reviewer assignment works
- [ ] Escalation workflow works
- [ ] Detail view shows all tabs
- [ ] SLA indicators display correctly
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 10: Support

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Support section — inbound message triage from public touchpoints.

## Overview

The Support module is a centralized intake and triage system for all inbound messages. It captures, reviews, and routes every message into the appropriate workflow (Leads, Disputes, or Partnerships). This module does not resolve issues — it acts as a gateway that converts raw communication into actionable records.

**Key Functionality:**
- View unconverted submissions in a table
- Filter by Source and Type
- View full submission details in read-only modal
- Convert submissions to Lead, Dispute, or Partnership
- Converted entries automatically hidden from main view

## Recommended Approach: Test-Driven Development

See `product-plan/sections/support/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/support/components/`:

- `SupportDashboard` — Main support table view
- `SubmissionDetailsModal` — Read-only submission detail modal

### Expected User Flows

### Flow 1: Triage Submission
1. User views table of unconverted submissions
2. User clicks a row to view full details in modal
3. User closes modal and uses Actions dropdown
4. User clicks "Convert to Lead"
5. **Outcome:** Lead created, submission hidden from view

### Flow 2: Filter Submissions
1. User applies Source filter (landing page, campaign form, etc.)
2. User applies Type filter (query, complaint, etc.)
3. **Outcome:** Table shows filtered results

## Files to Reference

- `product-plan/sections/support/components/`
- `product-plan/sections/support/types.ts`
- `product-plan/sections/support/sample-data.json`
- `product-plan/sections/support/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Submission table displays correctly
- [ ] Filters work for Source and Type
- [ ] Detail modal shows full submission
- [ ] All three conversion paths work
- [ ] Converted entries hidden automatically
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 11: Reports

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Reports section — dashboards and analytics across all business metrics.

## Overview

The Reports module provides real-time visibility into operations, sales, subscribers, partners, lawyers, payments, disputes, support, and teams. All stakeholders work from the same source of truth.

**Key Functionality:**
- Executive Dashboard with high-level summary cards
- Tab navigation: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Top filter bar with persistent filters (date range, state, service type, etc.)
- Click-to-drill-down from metric cards to data tables
- Export as PDF or CSV
- Role-based tab visibility

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/reports/components/`:

- `ReportsDashboard` — Main reports view
- `ExecutiveDashboard` — High-level summary
- `MetricCard` — Reusable metric card component
- `IncidentsTab` — Incidents analytics
- `LeadsTab` — Leads analytics
- `SubscribersTab` — Subscriber analytics
- `PartnersTab` — Partner analytics
- `ChallanPayReportsTab` — ChallanPay analytics

### Expected User Flows

### Flow 1: View Executive Dashboard
1. User navigates to Reports
2. User sees high-level summary cards
3. User clicks a metric card to drill down
4. **Outcome:** Detailed data table shown

### Flow 2: Filter Reports
1. User selects "Incidents" tab
2. User applies date range and state filters
3. **Outcome:** Metrics and charts update with filtered data

### Flow 3: Export Report
1. User applies filters
2. User clicks "Export" button
3. User selects PDF or CSV
4. **Outcome:** Report downloaded

## Files to Reference

- `product-plan/sections/reports/components/`
- `product-plan/sections/reports/types.ts`
- `product-plan/sections/reports/sample-data.json`
- `product-plan/sections/reports/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Executive Dashboard renders correctly
- [ ] All report tabs show relevant metrics
- [ ] Filters persist across tabs
- [ ] Drill-down from cards works
- [ ] Export functionality works
- [ ] Role-based tab visibility works
- [ ] Responsive on mobile

---

# Milestone 12: Team

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Team section — employee and team administration with permissions management.

## Overview

The Team section manages employees, teams, permissions, and access control. It provides a structured interface for defining who is part of the system, how they're organized, and what they can access.

**Key Functionality:**
- Employee list with active count
- 3-step employee onboarding wizard (Profile → Credentials → Permissions)
- Full employee detail page with Details and Permissions tabs
- Permissions management with module and flow toggles
- Teams management with creation, editing, and status control
- Deactivate/reactivate employees and teams

## Recommended Approach: Test-Driven Development

See `product-plan/sections/team/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/team/components/`:

- `TeamManagement` — Main team management view
- `EmployeeTable` — Employee list table
- `EmployeeOnboardingWizard` — 3-step onboarding
- `EmployeeDetailView` — Full employee detail page
- `EditEmployeeModal` — Edit employee form
- `PermissionsPage` — Permissions management
- `TeamsTable` — Teams list
- `TeamDetailView` — Team detail page
- `CreateTeamModal` — Create new team
- `EditTeamModal` — Edit team
- `DeactivateConfirmDialog` — Deactivation confirmation

### Expected User Flows

### Flow 1: Onboard Employee
1. User clicks "Add Employee"
2. User fills Profile Information (name, department, designation, etc.)
3. User creates login credentials
4. User configures module/flow permissions
5. **Outcome:** Employee appears in active list

### Flow 2: Manage Permissions
1. User opens employee detail page
2. User clicks "Permissions" tab
3. User toggles module and flow access switches
4. User clicks "Save"
5. **Outcome:** Permissions updated, logged in audit trail

### Flow 3: Create Team
1. User switches to Teams tab
2. User clicks "Create Team"
3. User fills team name, department, lead, members
4. **Outcome:** Team appears in teams list

## Files to Reference

- `product-plan/sections/team/components/`
- `product-plan/sections/team/types.ts`
- `product-plan/sections/team/sample-data.json`
- `product-plan/sections/team/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Employee list displays with active count
- [ ] 3-step onboarding wizard works
- [ ] Employee detail page renders both tabs
- [ ] Permissions management with toggles works
- [ ] Teams CRUD operations work
- [ ] Deactivate/reactivate works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 13: Setup

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 14: CMS

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the CMS section — blog and events/news content management.

## Overview

Content management system for creating, editing, and publishing blogs, events, and news articles surfaced across customer-facing channels.

**Key Functionality:**
- Blog management with table list, add/edit forms
- Events & News management with enable/disable toggle
- Rich text editor for content creation
- Image upload for blog/event icons
- Category and author assignment

## Recommended Approach: Test-Driven Development

See `product-plan/sections/cms/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/cms/components/`:

- `CMSDashboard` — Main CMS view with tabs
- `BlogList` — Blog posts table
- `AddBlogModal` / `AddBlogPage` — Blog creation form
- `EventNewsList` — Events & news table
- `AddEventNewsModal` / `AddEventNewsPage` — Event/news creation form
- `RichTextEditor` — Content editor

### Expected User Flows

### Flow 1: Add Blog Post
1. User clicks "+ Add Blog"
2. User fills in title, category, author, content
3. User uploads icon image
4. User clicks "Save"
5. **Outcome:** Blog appears in list

### Flow 2: Manage Events & News
1. User clicks "Events & News" tab
2. User sees table with enable/disable toggle
3. User toggles an entry to disabled
4. **Outcome:** Entry status changes, reflected in table

## Files to Reference

- `product-plan/sections/cms/components/`
- `product-plan/sections/cms/types.ts`
- `product-plan/sections/cms/sample-data.json`
- `product-plan/sections/cms/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Blog list renders correctly
- [ ] Blog creation with rich text works
- [ ] Events & News tab works
- [ ] Enable/disable toggle works
- [ ] Image upload works
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 15: Settled Challans

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

---

# Milestone 16: Proposals

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Proposals section — service request management from intake to incident conversion.

## Overview

Admin-side proposal management for receiving, reviewing, quoting, and converting customer service requests (challans, DL verification, RC verification) into incidents. Provides a 5-tab queue view with dashboard stats, detail view, and conversion workflows.

**Key Functionality:**
- Dashboard summary cards (New Requests, In Review, Awaiting Response, Active Work, etc.)
- 5-tab queue: Inbox, In Review, Quote Sent, Converted, Rejected
- Context-specific actions per tab
- Full detail view with Details, Items, Notes, Activity Timeline, Incidents tabs
- Send Quote, Reject, and Convert to Incident modals
- Bulk assign and bulk status update
- Priority indicators on high-amount proposals
- Indian currency formatting (₹2,40,000)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:

- `ProposalList` — Main proposal list with queue tabs
- `ProposalRow` — Individual proposal row
- `ProposalTableHeader` — Header with search and filters
- `ProposalSidebar` — Sidebar with filters
- `ProposalQueueTabs` — 5-tab queue navigation
- `ProposalDetailView` — Full detail page
- `DashboardCards` — Summary metric cards
- `SendQuoteModal` — Quote sending form
- `RejectModal` — Rejection with reason
- `ConvertToIncidentModal` — Incident conversion
- `AssignModal` — Assignment form
- `BulkActionsBar` — Bulk operations
- `Pagination` — Table pagination

### Expected User Flows

### Flow 1: Pick Up and Quote
1. User views proposals in Inbox tab
2. User clicks "Pick Up" on a proposal
3. Proposal moves to "In Review"
4. User reviews details and clicks "Send Quote"
5. User enters amount and optional breakdown
6. **Outcome:** Proposal moves to "Quote Sent"

### Flow 2: Convert to Incident
1. Customer accepts quote → proposal in "Converted" tab
2. User clicks "Convert to Incident"
3. User fills incident details
4. **Outcome:** Incident created, linked to proposal

### Flow 3: Reject Proposal
1. User views proposal in Inbox or In Review
2. User clicks "Reject"
3. User selects reason and adds optional note
4. **Outcome:** Proposal moves to "Rejected" tab

## Files to Reference

- `product-plan/sections/proposals/components/`
- `product-plan/sections/proposals/types.ts`
- `product-plan/sections/proposals/sample-data.json`
- `product-plan/sections/proposals/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard cards show correct metrics
- [ ] 5-tab queue works with correct counts
- [ ] Context-specific actions per tab work
- [ ] Detail view shows all tabs
- [ ] Quote sending workflow works
- [ ] Rejection with reasons works
- [ ] Convert to incident works
- [ ] Bulk operations work
- [ ] Priority indicators display for high-amount proposals
- [ ] Indian currency formatting correct
- [ ] Empty states display properly
- [ ] Responsive on mobile
