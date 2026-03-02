# Subscribers Specification

## Overview
The Subscribers module is the system of record for all customers actively or historically subscribed to the platform's services. It manages the complete subscriber lifecycle from onboarding through service delivery, connecting sales, operations, and finance into a single traceable view. All operational activity—including challan submission—is gated by subscriber status, ensuring no service is delivered without an active subscription.

## User Flows
- **View subscriber list** - Users see a table of all subscribers with system-generated Subs-ID, showing source, company name, contact details, assigned owner, services, subscription details, and status
- **Search and filter subscribers** - Users search by name/company/ID/GST and filter by status, source, owner, location, and plan type
- **Add subscriber** - Users click "Add Subscriber" to open a form capturing Source, Type, Sub Type, LOTS For, Number of Trucks, Phone Number, Country, State, City, Company Alias, Subscriber Name, Email ID, Contact Person, GST Number, Area, Address Lane, Pin Code, assigned Owner, Partner (optional), and Driving License Number (optional)
- **Bulk upload subscribers** - Users click "Bulk Upload Subscriber" to open a popup with template download and Excel upload with validation feedback for mandatory fields, formats, and duplicates
- **View subscriber details** - Users click any table column in a row to navigate to a full-screen detail page (not a modal) with tabs for Details, Challans, Incidents, Documents, Subscription, Wallet, and Team
- **Edit subscriber** - Users update subscriber information via Actions menu or detail page
- **Manage subscription** - Users view and update subscription details including plan, dates, vehicles, pricing, and payment status
- **View challans** - Users see all traffic challans linked to the subscriber with vehicle, violation, amount, status, and date
- **View incidents** - Users see all incidents/cases linked to the subscriber with status and resolution tracking
- **Upload documents** - Users attach contracts, agreements, and supporting files
- **View wallet** - Users view financial information including payment history, credits, outstanding balance, invoices, and transaction records
- **Manage team** - Users view and assign team members to the subscriber account

## UI Requirements
- "Add Subscriber" and "Bulk Upload Subscriber" action buttons in top-right
- Bulk upload popup with Excel template download, file upload, and clear validation error display
- Add subscriber form with mandatory field validation and real-time feedback
- Data table with columns: Subs-ID, Source, Company/Subscriber Name, Contact Details, Assigned Owner, Services, Subscription Name, Plan Type, Start Date, End Date, Vehicles Count, Subscription Status
- Status indicator pills: Active (green), Inactive (gray)
- Metadata visible: created date, last updated, last login
- Actions menu per row: View Details, Edit
- Search bar and filter controls for status, source, owner, location, and plan type
- Subscriber detail page with:
  - Header showing subscriber name, ID, status badge, and Edit Details button
  - Back button to return to list
  - Tabbed navigation with 7 tabs:
    - **Details**: Company information, contact details, address, and metadata
    - **Challans**: List of traffic challans with vehicle, violation, amount, status, and date
    - **Incidents**: List of linked incidents/cases with status and resolution tracking
    - **Documents**: Upload and manage documents (contracts, agreements, etc.)
    - **Subscription**: Active subscription plan details, billing period, and status
    - **Wallet**: Financial tracking including payments, credits, invoices, and transaction history
    - **Team**: View and manage team members assigned to this subscriber account
- Permission-controlled actions with audit logging

## Configuration
- shell: true
