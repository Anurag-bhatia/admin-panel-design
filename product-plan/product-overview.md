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
