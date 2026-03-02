# Leads Specification

## Overview
The Leads module is the central system for capturing, organizing, tracking, and converting all potential business opportunities. It replaces fragmented Excel-based lead tracking with a structured, real-time pipeline management system that ensures every lead is uniquely identifiable, actionable, and traceable across its entire lifecycle from initial capture through to conversion or loss.

## User Flows
- **View leads pipeline** - Users see a tab-based table view with lifecycle stages (All Leads, New, Assigned, Follow-up, Quotations, Projected, Ready to Invoice, Sales, Lost), each showing real-time counts
- **Add single lead** - Users click "Add Lead" to open a structured form capturing source, type, company details, contact information, service requirements, and location data with field validation
- **Bulk upload leads** - Users click "Bulk Upload Leads" to upload multiple leads via Excel, with options to download a template and receive validation error feedback
- **Search and filter leads** - Users search by name/company/ID and filter by source, owner, service type, location, etc. beyond the lifecycle tabs
- **Select multiple leads** - Users check boxes to select one or more leads from the table, with a "select all" option in the table header
- **Bulk update leads** - Users click "Bulk Update" button to change status or owner for all selected leads at once, with a modal dialog for choosing the update type and value
- **View lead details** - Users click a lead row to open the full detail view showing complete lead information, activity timeline, assigned teams, and related documents
- **Assign lead to user** - Users click "Assign" in Actions menu or detail view to assign/reassign the lead to another user, with assignment logged to timeline
- **Edit lead information** - Users click "Edit" in Actions menu to switch the detail view to edit mode with editable fields
- **Add follow-up activity** - Users record follow-up interactions with activity type, notes, next follow-up date, and outcome
- **Change lead status** - Users change lifecycle stage via Actions menu in table or detail view, with all changes logged to timeline
- **View activity timeline** - Users see chronological history of all actions, notes, status changes, assignments, and follow-ups for a lead
- **Upload/view documents** - Users attach and view files related to a lead

## UI Requirements
- Tab navigation for lifecycle stages with real-time lead counts per tab
- Summary dashboard cards above table showing key metrics (total leads, conversion rate, etc.)
- Data table with columns: Lead ID (system-generated), source, company/individual name, contact details, assigned owner, service type, status
- Checkboxes on each lead row for selection with "select all" checkbox in table header
- Selection badge showing count of selected leads with "Bulk Update" button when leads are selected
- Bulk update modal with toggle between Status and Owner update types, with dropdown to select new value
- Actions menu per row: Edit, Assign, View Details
- Search bar and filter controls for source, owner, service type, location
- "Add Lead" and "Bulk Upload Leads" action buttons in top-right
- Add Lead form with mandatory fields: Source, Type, Sub Type, LOTS For, Number of Trucks, Phone Number, Country, State, City, Company Alias, Name, Email ID, Contact Person, GST Number, Area, Address Lane, Pin Code
- Bulk Upload popup with Excel upload and template download, showing validation errors clearly
- Lead detail view displaying: complete lead profile, activity timeline, assigned team members, related documents section
- Assign lead interface showing list of available users to assign to, accessible from Actions menu and detail view
- Follow-up form capturing: activity type, notes, next follow-up date, outcome
- Status change control accessible from both table Actions menu and detail view
- Edit mode within detail view for updating lead information
- Permission-controlled actions with audit logging
- All actions, status changes, and assignments recorded to lead timeline

## Configuration
- shell: true
