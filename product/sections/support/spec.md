# Support Specification

## Overview
The Support module is a centralized intake and triage system for all inbound messages from public touchpoints (landing pages, contact forms, campaigns). It captures, reviews, and routes every message into the appropriate internal workflow (Leads, Disputes, or Partnerships). This module does not resolve issues—it acts as a structured gateway that converts raw customer communication into actionable system records, ensuring nothing is lost or tracked manually.

## User Flows
- View all unconverted support submissions in a table showing Subject, Source, Type, and Actions
- Filter submissions by Source (landing page, campaign form, referral page, etc.) or Type (query, complaint, support request, business inquiry)
- Sort submissions by Type or Source
- Click on a row to view full submission details in a read-only modal (shows complete Subject, Message, submission time, and source)
- Use the Actions dropdown on a row to convert the submission:
  - Convert to Lead: Creates a lead record prefilled with subject, message, contact details, and source
  - Convert to Dispute: Creates a dispute/incident record linking the support message as originating context
  - Convert to Partnership: Creates a partner onboarding entry
- After conversion, the original support record is updated to show converted state, linked to the new entity, and automatically hidden from the main view
- All conversion actions are logged in the audit trail with timestamp and user details

## UI Requirements
- Table-based list view optimized for quick scanning with minimal columns
- Columns: Subject, Source, Type, Actions (dropdown)
- Filter controls for Source and Type
- Sort controls for Type and Source
- Actions dropdown on each row with three conversion options (Convert to Lead, Convert to Dispute, Convert to Partnership)
- Click anywhere on row (outside dropdown) opens read-only modal popup
- Modal displays full Subject, complete Message, submission time, and source metadata with no action buttons
- Only unconverted entries shown by default (converted entries automatically hidden)
- Permission-controlled access limited to ops leads, support staff, and admins
- Every submission must be converted to one of the three options (no archive or delete actions)

## Configuration
- shell: true
