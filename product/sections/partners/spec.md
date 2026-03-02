# Partners Specification

## Overview
The Partner module manages external business introducers who onboard subscribers on the platform. Partners can create and view subscribers linked to them, access high-level metrics about their business, and view read-only incidents related to their subscribers. All financial tracking, payouts, and system-wide access controls are managed centrally by the system.

## User Flows
- **View Partner List** — Admin views all partners with name, Partner ID, contact, company, subscriber count, status. Search by partner name, filter by status (active/inactive), and sort by columns. Toggle partner status (active/deactivate) without losing historical data.
- **Add Partner (Onboarding)** — 4-step stepper flow: (1) Personal identity & login (first name, last name, email, mobile, password), (2) Company details (company name, official email, phone, address, country, state, city, pin code, optional website), (3) Service scope (products/services allowed to sell, subscriber types allowed to onboard), (4) Permissions & bank account (bank details for payouts, system permissions for viewing subscribers/incidents/dashboard).
- **View Partner Details** — Open partner profile with partner & company info, linked subscribers with name/mobile/company/status/date/incidents link, system-calculated earnings & payout history, document uploads (GST, PAN, etc.), and activity log.
- **Manage Partner Status** — Toggle active/inactive status from list or detail page; deactivation immediately prevents new subscriber onboarding.
- **View Incidents (Read-Only)** — Click incident link on subscriber row to view incidents related to that subscriber in read-only mode.

## UI Requirements
- Partner List: Table with name, Partner ID, contact, company, subscriber count, status, and actions menu (view/edit details, toggle status)
- Search by partner name with quick search field
- Filter by status (active/inactive)
- Sort by clickable column headers
- Add Partner button at top right, opens 4-step stepper modal
- Partner Detail Page: Header with partner name, ID, status, and action buttons (Edit, Toggle Status)
- Partner Detail tabs (Profile, Subscribers, Financial, Documents, Activity):
  - **Profile Tab**: Partner personal info, company details, contact information
  - **Subscribers Tab**: Table of linked subscribers with name, mobile, company, status, date subscribed, incidents link
  - **Financial Tab**: Summary cards (total earnings, total paid, pending, outstanding) and payout history table
  - **Documents Tab**: Cards for each document type (GST, PAN, Business License, etc.) with upload status
  - **Activity Log Tab**: Chronological list of activities with timestamp, action, user, and details
- All data displayed is system-generated or permission-controlled; no manual overrides allowed

## Configuration
- shell: true
