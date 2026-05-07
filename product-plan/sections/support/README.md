# Support

## Overview

Centralized intake and triage system for all inbound messages from public touchpoints. Captures, reviews, and routes messages into Leads, Disputes, or Partnerships workflows. Does not resolve issues — acts as a structured gateway.

## User Flows

- View unconverted submissions in table (Subject, Source, Type, Actions)
- Filter by Source and Type
- Sort by Type and Source
- Click row to view full submission details in read-only modal
- Convert submissions via Actions dropdown: Convert to Lead, Convert to Dispute, Convert to Partnership
- Converted entries automatically hidden from main view

## Design Decisions

- Table optimized for quick scanning with minimal columns
- Read-only modal (no action buttons in modal)
- Only unconverted entries shown by default
- Every submission must be converted (no archive or delete)
- All conversions logged in audit trail

## Data Used

**Entities:** Support Ticket
**From global model:** Lead (conversion target), Dispute (conversion target), Partner (conversion target)

## Components Provided

- **SupportDashboard** — Main dashboard view with submission table, filters, sorting, and conversion actions
- **SubmissionDetailsModal** — Read-only modal displaying full submission details when a row is clicked

## Callback Props

| Callback | Description |
|----------|-------------|
| `onConvertToLead` | Convert submission to lead |
| `onConvertToDispute` | Convert to dispute |
| `onConvertToPartnership` | Convert to partnership |
| `onViewDetails` | Open read-only modal |
