# Lawyers

## Overview

Legal professional network management with multi-step onboarding, KYC verification, performance tracking, and commission calculation.

## User Flows

- View lawyers in active/inactive tabs with counts
- Add lawyer via 7-step onboarding wizard
- View lawyer profile with Details, Incidents, Invoicing, Transactions tabs
- Edit lawyer profiles
- Verify KYC documents (Aadhaar, PAN, Driving Licence, Cancelled Cheque, Bar ID, BALLB Certificate)
- Activate/deactivate lawyers
- Search and filter by activity state and KYC status

## Design Decisions

- 7-step onboarding wizard with progress indicator
- Only active lawyers with completed KYC eligible for assignment
- Profile page with dedicated Invoicing and Transactions tabs
- Status badges for onboarding and KYC status
- Comprehensive KYC document management with document number tracking

## Data Used

**Entities:** Lawyer (with Address, Qualification, Experience, KYCDocuments, BankDetails, Expertise, CompanyDetails, LawyerActivity)
**From global model:** Assignment, Commission, Incident

## Components Provided

| Component | Description |
|-----------|-------------|
| `Lawyers` | Main view with active/inactive tabs, search, filters, and lawyer table |
| `LawyerTable` | Table component displaying lawyer rows with sortable columns |
| `LawyerProfile` | Full profile page with Details, Incidents, Invoicing, Transactions tabs |
| `LawyerForm` | Multi-step onboarding/edit form with all lawyer fields |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAdd` | Open onboarding wizard |
| `onView` | Open profile page |
| `onEdit` | Edit profile |
| `onDeactivate` | Deactivate lawyer |
| `onReactivate` | Reactivate lawyer |
| `onViewDocument` | View or download a KYC document |
| `onSearch` | Search lawyers by name or other fields |
| `onFilterByActivity` | Filter by activity state (Active, Inactive, All) |
| `onFilterByKYC` | Filter by KYC status (Verified, Unverified, All) |
