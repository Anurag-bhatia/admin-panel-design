# Data Model

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

- Lead converts to Subscriber
- Subscriber has many Incidents
- Subscriber has many Disputes
- Subscriber has many Support Tickets
- Subscriber has many Refunds
- Incident has many Assignments (for tracking reassignments and resolution attempts)
- Incident may have one Commission (when successfully resolved)
- Incident may have one Refund (when resolution fails)
- Assignment connects Incident and Lawyer
- Lawyer has many Assignments
- Lawyer has many Commissions
- Commission belongs to Lawyer and Incident
- Refund belongs to Subscriber and Incident
- Dispute belongs to Subscriber
- Support Ticket belongs to Subscriber
- Payment can be for Commission or Refund
- Audit Log tracks changes to any entity in the system
