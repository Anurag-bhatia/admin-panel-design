# Data Model

## Overview

The Admin Panel data model consists of 12 core entities that power the traffic challan resolution platform. These entities track the complete lifecycle from lead acquisition through incident resolution, payments, and dispute handling.

## Entities

### Lead
A prospective B2B client (fleet operator or company) that has shown interest in the challan resolution service. Tracked through the sales pipeline from initial contact to conversion.

### Subscriber
An active B2B client with an account who submits challans for resolution. The primary operational entity — all challan submissions are gated by subscriber status.

### Incident
A traffic challan submitted by a subscriber that needs to be screened, assigned, and resolved. Lives in exactly one execution queue at a time with 45-day TAT enforcement.

### Lawyer
An external legal professional who handles challan resolution and earns commissions. Managed through a multi-step onboarding process with KYC verification.

### Partner
External organization that provides data feeds, referrals, or other services. Can onboard subscribers and earns commissions.

### Assignment
The connection between an incident and a lawyer, tracking SLA timers and resolution attempts.

### Commission
Payment owed to a lawyer for successfully resolving an incident.

### Refund
Money returned to a subscriber when an incident cannot be resolved.

### Dispute
A customer challenge regarding charges, refunds, or service outcomes. Handled with higher scrutiny and configurable SLA enforcement.

### Support Ticket
A subscriber inquiry or issue that needs resolution. Acts as a gateway converting raw communication into actionable records.

### Payment
Financial transaction for commissions or refunds.

### Audit Log
Record of who did what and when across the entire system.

## Relationships

```
Lead ──converts to──▶ Subscriber
Subscriber ──has many──▶ Incidents
Subscriber ──has many──▶ Disputes
Subscriber ──has many──▶ Support Tickets
Subscriber ──has many──▶ Refunds
Incident ──has many──▶ Assignments
Incident ──may have one──▶ Commission
Incident ──may have one──▶ Refund
Assignment ──connects──▶ Incident ◀──▶ Lawyer
Lawyer ──has many──▶ Assignments
Lawyer ──has many──▶ Commissions
Commission ──belongs to──▶ Lawyer + Incident
Refund ──belongs to──▶ Subscriber + Incident
Dispute ──belongs to──▶ Subscriber
Support Ticket ──belongs to──▶ Subscriber
Payment ──can be for──▶ Commission | Refund
Audit Log ──tracks changes to──▶ any entity
```

## Components

See `types.ts` for TypeScript interface definitions and `sample-data.json` for example data.
