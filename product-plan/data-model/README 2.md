# Data Model

## Overview

This document describes the core entities and relationships in the Challan Resolution Admin Panel.

## Entities

### Lead
A prospective B2B client (fleet operator or company) that has shown interest in the challan resolution service.

### Subscriber
An active B2B client with an account who submits challans for resolution.

### Incident
A traffic challan submitted by a subscriber that needs to be screened, assigned, and resolved.

### Lawyer
An external legal professional who handles challan resolution and earns commissions.

### Partner
External organization that provides data feeds, referrals, or other services.

### Assignment
The connection between an incident and a lawyer, tracking SLA timers and resolution attempts.

### Commission
Payment owed to a lawyer for successfully resolving an incident.

### Refund
Money returned to a subscriber when an incident cannot be resolved.

### Dispute
A customer challenge regarding charges, refunds, or service outcomes.

### Support Ticket
A subscriber inquiry or issue that needs resolution.

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

Incident ──has many──▶ Assignments (for reassignments/resolution attempts)
Incident ──may have one──▶ Commission (when resolved)
Incident ──may have one──▶ Refund (when resolution fails)

Assignment ──connects──▶ Incident ◀──▶ Lawyer

Lawyer ──has many──▶ Assignments
Lawyer ──has many──▶ Commissions

Commission ──belongs to──▶ Lawyer
Commission ──belongs to──▶ Incident

Refund ──belongs to──▶ Subscriber
Refund ──belongs to──▶ Incident

Dispute ──belongs to──▶ Subscriber
Support Ticket ──belongs to──▶ Subscriber

Payment ──can be for──▶ Commission | Refund

Audit Log ──tracks changes to──▶ Any Entity
```

## Implementation Notes

- Each entity should have a unique identifier (ID)
- Timestamps (createdAt, updatedAt) should be tracked for all entities
- Status fields should use enums for type safety
- Consider soft deletes for data that needs to be preserved for audit purposes
