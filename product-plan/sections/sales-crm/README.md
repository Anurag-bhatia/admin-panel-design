# Sales CRM

## Overview

Lead capture, qualification, and pipeline management system replacing fragmented Excel-based tracking. Provides a tab-based pipeline view with real-time counts per lifecycle stage, structured lead creation, bulk operations, and detailed lead tracking with activity timelines.

## Components Provided

- `LeadsDashboard` — Main dashboard with summary cards
- `LeadsTable` — Pipeline table with stage tabs
- `LeadsListHeader` — Search, filters, Add Lead, Bulk Upload buttons
- `AddLeadModal` — Lead creation form
- `EditLeadModal` — Lead editing form
- `BulkUploadModal` — Excel upload with template
- `BulkMoveLead` — Bulk status/owner change
- `BulkActionsBar` — Bulk operations bar
- `LeadDetailView` — Full detail with timeline
- `AssignLeadModal` — Lead assignment
- `AddFollowUpModal` — Follow-up logging
- `UploadDocumentModal` — Document attachment
- `MyLeads` — Personal leads view

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddLead` | Create new lead |
| `onEditLead` | Edit lead details |
| `onViewDetail` | Open lead detail |
| `onAssign` | Assign lead to user |
| `onBulkUpload` | Upload leads via Excel |
| `onBulkUpdate` | Bulk status/owner change |
| `onAddFollowUp` | Log follow-up activity |
| `onUploadDocument` | Attach document |
| `onExport` | Export leads |
| `onSearch` | Search leads |
| `onFilter` | Apply filters |

## Data Used

**Entities:** Lead, User, TimelineActivity, Document, FollowUp
