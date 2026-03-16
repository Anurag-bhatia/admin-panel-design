# Admin Panel — Product Overview

## Summary

A B2B operations platform that manages the complete lifecycle of traffic challan resolution services for fleet operators and corporate clients. From lead acquisition and subscriber onboarding to challan processing, lawyer management, payments, and dispute resolution, Admin Panel replaces Excel-driven operations with an automated, auditable system that scales with volume while maintaining accuracy and accountability.

## Planned Sections

1. **Incidents** — Queue-driven ticket management for challan and case resolution with 45-day TAT enforcement, structured workflows, and complete audit trails
2. **Sales CRM** — Lead capture, qualification, and pipeline management replacing fragmented Excel-based tracking
3. **Subscribers** — Active B2B client account management from onboarding through service delivery
4. **Customers** — Centralized D2C registered visitor management with vehicle, incident, and financial tracking
5. **Lawyers** — External legal professional network management with multi-step onboarding, credentialing, and lifecycle management
6. **Partners** — External business introducer management for subscriber onboarding with commission tracking
7. **Payments** — Unified workspace for refund processing, lawyer fee management, and partner payouts
8. **Disputes** — Governance and escalation engine for conflicts, refund disagreements, and contested outcomes
9. **Support** — Centralized intake and triage system for inbound messages, routing to Leads, Disputes, or Partnerships
10. **Reports** — Real-time analytics and reporting dashboards across all business domains
11. **Team** — Employee and team administration with permissions and access control
12. **Setup** — Centralized configuration hub for system-wide categories, statuses, and configurable values
13. **CMS** — Content management for blogs, events, and news articles
14. **Settled Challans** — Dedicated read-only archive for browsing settled challans

## Data Model

**Entities:** Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

**Key Relationships:**
- Lead converts to Subscriber
- Subscriber has many Incidents, Disputes, Support Tickets, Refunds
- Incident has many Assignments (tracking reassignments)
- Incident may have one Commission or one Refund
- Assignment connects Incident and Lawyer
- Lawyer has many Assignments and Commissions
- Payment can be for Commission or Refund
- Audit Log tracks changes to any entity

## Design System

**Colors:**
- Primary: `cyan` — Buttons, links, active states, key accents
- Secondary: `zinc` — Secondary UI elements, borders, sidebar
- Neutral: `slate` — Backgrounds, text, surfaces

**Typography:**
- Not defined — Use system defaults or your preference

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Incidents** — Queue-driven challan/case management
3. **Sales CRM** — Lead pipeline management
4. **Subscribers** — B2B client accounts
5. **Customers** — D2C visitor management
6. **Lawyers** — Legal network management
7. **Partners** — Business introducer management
8. **Payments** — Financial processing
9. **Disputes** — Conflict resolution
10. **Support** — Message intake and triage
11. **Reports** — Analytics dashboards
12. **Team** — Employee administration
13. **Setup** — System configuration
14. **CMS** — Content management
15. **Settled Challans** — Challan archive

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
