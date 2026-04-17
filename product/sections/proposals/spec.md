# Proposals Specification

## Overview
Admin-side proposal management for receiving, reviewing, quoting, and converting customer service requests (challans, DL verification, RC verification) into incidents. Provides a tab-based queue view with dashboard stats, a full detail view with notes/activity/items, and modals for sending quotes, rejecting proposals, and converting to incidents.

## User Flows
- **Inbox triage** — New customer requests appear in the Inbox tab. Team members pick up or assign proposals, moving them to In Review.
- **Quote & review** — Team reviews the proposal, sets a quoted amount, and sends the quote to the customer (In Review → Quote Sent).
- **Customer response** — Customer accepts (→ Converted) or rejects (→ Rejected). Team can also withdraw or revise quotes.
- **Incident conversion** — On acceptance, team creates a linked incident and tracks service delivery (pending → in_progress → completed).
- **Rejection** — Team can reject proposals at Inbox or In Review stages with a reason. Rejected proposals can be reopened.
- **Notes/chat** — Shared comment thread between team and customer, visible on both sides.
- **Bulk operations** — Select multiple proposals to bulk assign or bulk update status.

## UI Requirements
- **Dashboard summary cards** at top: New Requests, In Review, Awaiting Response, Active Work, Completed This Month, Total Value
- **5-tab queue**: Inbox, In Review, Quote Sent, Converted, Rejected — each with count badges
- **Table columns**: Request ID (monospace), Customer (name + company), Type (color-coded badge: Challan amber, DL purple, RC sky), Qty, Amount (₹ Indian format), Created (relative dates), Assigned To, Service Status, Linked Incident, Actions
- **Context actions per tab**:
  - Inbox: Pick Up, Assign, View, Reject
  - In Review: Send Quote, Reassign, View, Reject
  - Quote Sent: View, Revise Quote, Withdraw
  - Converted: View, Update Service Status, View Incident
  - Rejected: View, Reopen
- **Filters & search**: Search by ID/customer/company/description; filter by type, assigned to, date range; sort by date/amount/qty
- **Detail view** with header (customer info card, assignment widget, amount, status/type badges) and 5 tabs: Details, Items, Notes (shared chat), Activity Timeline, Incidents
- **Right sidebar** on detail view: quick status change, assignment widget, amount/quote widget, service status widget, timeline summary
- **Send Quote modal**: amount input, optional breakdown textarea, optional note to customer
- **Reject modal**: reason dropdown (Service not available, Insufficient documentation, Out of service area, Duplicate request, Invalid/incorrect details, Customer request), optional note to customer
- **Convert to Incident modal**: incident ID (auto-generated or manual), service status dropdown, assigned agent, notes
- **Bulk actions bar**: bulk assign, bulk status update on checkbox selection
- **Priority indicators** on high-amount proposals (> ₹1,00,000)
- **Pagination**: 10 items per page
- **Currency**: Indian format (₹2,40,000)
- **Dates**: "22 Mar 2026" absolute, "2h ago" relative

## Configuration
- shell: true
