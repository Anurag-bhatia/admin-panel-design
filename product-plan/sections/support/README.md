# Support

## Overview

Centralized intake and triage system for all inbound messages from public touchpoints (landing pages, contact forms, campaigns). Acts as a structured gateway converting raw customer communication into actionable system records — does not resolve issues directly.

## Components Provided

- `SupportDashboard` — Main table view with filters and conversion actions
- `SubmissionDetailsModal` — Read-only detail popup

## Callback Props

| Callback | Description |
|----------|-------------|
| `onConvertToLead` | Convert submission to Lead |
| `onConvertToDispute` | Convert submission to Dispute |
| `onConvertToPartnership` | Convert submission to Partnership |
| `onViewDetails` | Open read-only detail modal |
| `onFilter` | Filter by Source/Type |

## Data Used

**Entities:** SupportSubmission
