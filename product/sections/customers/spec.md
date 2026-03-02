# Registered Visitors Specification

## Overview
The Registered Visitors module is the centralized system for managing all direct-to-consumer (D2C) visitors who use the platform independently. It provides operations, support, and finance teams with a unified view of each visitor, their vehicles, incidents, challans, and payment history. The module acts as the single source of truth for all retail visitor interactions.

## User Flows
- **Browse and search visitors** - View a table of all D2C visitors with search by name, mobile number, or visitor ID
- **Add new visitor** - Create a new visitor record via a form modal with required visitor details
- **Bulk upload visitors** - Upload multiple visitors via CSV/Excel file import
- **View visitor details** - Click any visitor row to open the Visitor Detail Page with tabbed navigation
- **Edit visitor profile** - Update visitor name, contact details, and other profile information
- **Track visitor incidents** - View all incidents associated with the visitor, with quick status updates and drill-down to full incident details
- **Review challan history** - View all challans across visitor vehicles with payment and resolution status
- **Manage vehicles** - View all vehicles linked to the visitor
- **Review financial history** - View read-only consolidated financials including payments, pending amounts, refunds, and total spend
- **Create new incident** - Manually create an incident for a visitor from their detail page
- **View activity log** - See timeline of all changes and interactions with the visitor
- **Bulk operations** - Export visitor data, apply bulk status updates, or bulk tagging from the visitor list

## UI Requirements
- **Visitor List Table** with columns: Visitor Name, Visitor ID, Mobile Number, Vehicle Details (number or count)
- **Top right action buttons:** "Add New Visitor" and "Bulk Upload Visitors"
- **Add New Visitor modal** with form fields for visitor details (name, mobile, email, etc.)
- **Bulk Upload modal** supporting CSV/Excel file upload with template download and validation feedback
- **Search bar** supporting free text search across name, mobile number, and visitor ID
- **Bulk action controls** for export, status updates, and tagging selected visitors
- **Visitor Detail Page** with consistent layout pattern (matching Subscriber Detail Page structure)
- **Tabs on detail page:** Details, Incidents, Challans, Vehicles, Financials
- **Details tab** displays: name, contact details, visitor ID, account creation date, last activity, total vehicles, total incidents, overall payment status
- **Incidents tab** shows incident list with: incident ID, related vehicle, incident type, status, TAT progress, outcome. Supports quick status updates and click-through to full Incident Detail Page
- **Challans tab** shows challan records with: challan ID, vehicle number, challan type, amount, payment status, resolution state
- **Vehicles tab** lists all associated vehicles with identifiers and metadata
- **Financials tab** displays read-only view: payments made, pending payments, refunds issued, total spend (system-generated, aligned with Finance module)
- **Edit visitor action** available from detail page header
- **Create incident action** available from detail page
- **Activity log viewer** showing all visitor interactions and changes
- **Empty states** on all tabs with helpful messages (e.g., "No incidents yet") and relevant action prompts
- **Permission-controlled access** with audit logging for all actions
- **Mobile responsive** table and detail views

## Configuration
- shell: true
