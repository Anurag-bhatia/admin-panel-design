# Lawyers

## Overview

External legal network management system with multi-step onboarding, credentialing, and lifecycle management. Provides full visibility into credentials, compliance status, expertise, and a dedicated profile page with incident tracking, invoicing, and transaction history.

## Components Provided

- `Lawyers` — Main view with table and Active/Inactive tabs
- `LawyerTable` — Data table with status tabs
- `LawyerProfile` — Full profile page with 4 tabs (Details, Incidents, Invoicing, Transactions)
- `LawyerForm` — 7-step onboarding/edit wizard

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddLawyer` | Start onboarding wizard |
| `onViewProfile` | Open lawyer profile |
| `onEdit` | Edit lawyer via wizard |
| `onDeactivate` | Deactivate lawyer |
| `onReactivate` | Reactivate lawyer |
| `onSearch` | Search lawyers |
| `onFilter` | Apply filters |
| `onUploadDocument` | Upload KYC documents |

## Data Used

**Entities:** Lawyer, Address, Qualification, Experience, KYCDocument, BankDetails, Expertise, Company
