# Sales CRM

## Overview

The Sales CRM module is the central system for capturing, organizing, tracking, and converting all potential business opportunities. It replaces fragmented Excel-based lead tracking with a structured, real-time pipeline management system.

## User Flows

- View leads pipeline with tab-based lifecycle stages
- Add single leads via structured form
- Bulk upload leads via Excel with validation
- Search and filter leads
- Bulk update selected leads (status or owner)
- View lead details with activity timeline
- Assign/reassign leads to users
- Add follow-up activities
- Upload and manage documents

## Components Provided

| Component | Description |
|-----------|-------------|
| `LeadsDashboard` | Main dashboard with tabs and metrics |
| `LeadsTable` | Lead list table with selection |
| `LeadsListHeader` | Header with search, filters, actions |
| `AddLeadModal` | Modal for adding new leads |
| `EditLeadModal` | Modal for editing leads |
| `AssignLeadModal` | Modal for assigning leads |
| `AddFollowUpModal` | Modal for follow-up activities |
| `BulkUploadModal` | Modal for Excel upload |
| `BulkMoveLead` | Modal for bulk status/owner updates |
| `UploadDocumentModal` | Modal for document uploads |
| `LeadDetailView` | Full lead detail page |
| `MyLeads` | My assigned leads view |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewLead` | View lead details |
| `onAddLead` | Add new lead |
| `onBulkUpload` | Upload Excel file |
| `onDownloadTemplate` | Download template |
| `onBulkUpdate` | Bulk update leads |
| `onEditLead` | Edit lead info |
| `onAssignLead` | Assign lead to user |
| `onChangeStatus` | Change lead status |
| `onAddFollowUp` | Add follow-up |
| `onUploadDocument` | Upload document |
| `onViewDocument` | View document |
| `onDeleteDocument` | Delete document |

## Data Entities

- **Lead** — Main lead record
- **TimelineActivity** — Activity history entry
- **Document** — Attached file
- **User** — Assignable user
