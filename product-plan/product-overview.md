# Admin Panel — Product Overview

## Summary

A B2B operations platform that manages the complete lifecycle of traffic challan resolution services for fleet operators and corporate clients. From lead acquisition and subscriber onboarding to challan processing, lawyer management, payments, and dispute resolution, Admin Panel replaces Excel-driven operations with an automated, auditable system that scales with volume while maintaining accuracy and accountability.

## Planned Sections

1. **Incidents** — Core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement with automated lawyer coordination.

2. **Sales CRM** — Lead capture, qualification, and conversion tracking for prospective B2B clients with separate views for all leads and assigned leads.

3. **Subscribers** — Active client account management and relationship tracking for B2B fleet operators and companies.

4. **Customers** — Customer profile management and service delivery tracking for individual end-users and fleet operators.

5. **Lawyers** — Legal professional network management with performance tracking and commission calculation.

6. **Partners** — Partner relationship management for data sources, referral partners, and service delivery partners.

7. **Support** — Support intake and triage system for routing inbound messages to appropriate workflows.

8. **Reports** — Comprehensive reporting dashboards and analytics across all business metrics and operations.

9. **Team** — User and team administration for managing internal operations staff and permissions.

## Data Model

**Entities:**
- Lead — Prospective B2B client
- Subscriber — Active B2B client with account
- Incident — Traffic challan submitted for resolution
- Lawyer — External legal professional
- Partner — External business introducer
- Assignment — Connection between incident and lawyer
- Commission — Payment owed to lawyer
- Refund — Money returned to subscriber
- Dispute — Customer challenge regarding charges/service
- Support Ticket — Subscriber inquiry or issue
- Payment — Financial transaction
- Audit Log — System-wide change tracking

**Relationships:**
- Lead converts to Subscriber
- Subscriber has many Incidents, Disputes, Support Tickets, Refunds
- Incident has many Assignments (for reassignments)
- Incident may have Commission (when resolved) or Refund (when failed)
- Assignment connects Incident and Lawyer
- Lawyer has many Assignments and Commissions

## Design System

**Colors:**
- Primary: `cyan` — Used for buttons, links, key accents
- Secondary: `zinc` — Used for tags, highlights, secondary elements
- Neutral: `slate` — Used for backgrounds, text, borders

**Typography:**
- Heading: Geist
- Body: Geist
- Mono: Geist Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Incidents** — Queue-driven ticket management for challan processing with 45-day TAT enforcement
3. **Sales CRM** — Lead pipeline management with lifecycle stages and conversion tracking
4. **Subscribers** — Active client account management with subscription and service tracking
5. **Customers** — D2C customer profile management with vehicle and incident tracking
6. **Lawyers** — Legal network management with onboarding, credentials, and compliance
7. **Partners** — Partner onboarding and subscriber relationship management
8. **Support** — Intake triage for routing messages to Leads, Disputes, or Partnerships
9. **Reports** — Analytics dashboards across all business domains
10. **Team** — Employee and team administration with permissions management

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
