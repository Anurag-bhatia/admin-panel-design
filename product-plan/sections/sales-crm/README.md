# Sales CRM

## Overview

Lead capture, qualification, and conversion tracking system replacing Excel-based pipeline management. Every lead is uniquely identifiable and traceable across its lifecycle.

## User Flows

- View leads in tab-based pipeline (All, New, Assigned, Follow-up, Quotations, Projected, Ready to Invoice, Sales, Lost)
- Add single leads or bulk upload via Excel
- Search and filter across multiple dimensions
- View lead details with activity timeline
- Assign/reassign leads to team members
- Record follow-up activities
- Bulk update status or owner
- Dashboard summary cards with metrics

## Design Decisions

- Tab-based pipeline view with real-time counts per stage
- Summary dashboard cards above table
- Separate "My Leads" view for personal assignments
- Bulk update modal with toggle between Status and Owner updates

## Data Used

**Entities:** Lead, TimelineActivity, Document, User, LeadFormData, FollowUpFormData
**From global model:** Subscriber (conversion target)

## Components Provided

| Component | Description |
|-----------|-------------|
| `LeadsDashboard` | Main dashboard view with summary cards, pipeline tabs, and leads table |
| `LeadsTable` | Table component displaying leads with sortable columns and row selection |
| `LeadsListHeader` | Header bar with search, filters, and action buttons (Add Lead, Bulk Upload) |
| `AddLeadModal` | Modal form for creating a new lead with all required fields |
| `EditLeadModal` | Modal form for editing an existing lead's details |
| `BulkUploadModal` | Modal for uploading Excel file with template download option |
| `BulkMoveLead` | Modal for bulk moving selected leads to a different pipeline stage |
| `BulkActionsBar` | Floating action bar for bulk operations on selected leads |
| `LeadDetailView` | Full detail view with lead info, timeline, documents, and actions |
| `AssignLeadModal` | Modal for assigning or reassigning a lead to a team member |
| `AddFollowUpModal` | Modal for recording a follow-up activity with outcome and next date |
| `UploadDocumentModal` | Modal for uploading documents (Quotation, Proposal, Contract, etc.) to a lead |
| `MyLeads` | Filtered view showing only leads assigned to the current user |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddLead` | Create new lead |
| `onBulkUpload` | Excel bulk import |
| `onDownloadTemplate` | Download bulk upload Excel template |
| `onEditLead` | Update lead details |
| `onAssignLead` | Assign/reassign lead |
| `onAddFollowUp` | Record follow-up activity |
| `onChangeStatus` | Update lifecycle stage |
| `onBulkUpdate` | Bulk operations (status or owner) |
| `onViewLead` | Open detail view |
| `onUploadDocument` | Upload document to a lead |
| `onViewDocument` | View or download attached document |
| `onDeleteDocument` | Remove document from a lead |
