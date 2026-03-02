# Lawyers Specification

## Overview
The Lawyers module is the central system for managing the platform's external legal network, replacing manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases. It provides full visibility into credentials, compliance status, expertise, and lifecycle management.

## User Flows
- **View lawyer list** - Browse active and inactive lawyers in a tabular view with real-time counts, search by name/email/ID/category/KYC status, and filter by activity status
- **Add new lawyer** - Complete multi-step onboarding wizard capturing basic info → address → qualifications/experience → KYC documents → bank details → company details (if applicable)
- **View lawyer profile** - Click any row in the lawyer table to open the dedicated profile page with all personal details, credentials, KYC documents, qualifications, experience, and compliance status (same as "View Profile" in the actions dropdown)
- **Edit lawyer profile** - Update any section of lawyer information through the same multi-step wizard
- **Review and verify KYC** - Preview and download uploaded compliance documents (Aadhaar, PAN, DL, cancelled cheque, Bar ID, BALLB certificates)
- **Deactivate lawyer** - Remove from active assignment pool while preserving historical data and audit trail
- **Reactivate lawyer** - Restore previously deactivated lawyer to active status

## UI Requirements
- **Lawyer list table** with columns: Photo, Lawyer ID, Name, Email, Mobile, Onboarding Status, KYC Status, Activity State, Source
- **Active/Inactive tabs** with real-time counts displayed prominently
- **Search bar and filter controls** for state and category
- **Clickable table rows** - clicking anywhere on a row (outside the actions dropdown) navigates to the lawyer profile page
- **Actions dropdown menu** (three-dot) on each row: View Profile, Edit, Deactivate/Reactivate
- **Multi-step onboarding wizard** with progress indicator:
  - Step 1: Basic Information (category, sub-category, personal details including name, email, mobile, gender, DOB)
  - Step 2: Address (current and permanent, with "same as current" checkbox option)
  - Step 3: Qualifications & Experience (repeatable sections for degrees and work history)
  - Step 4: KYC & Compliance (Aadhaar, PAN, DL, cheque, Bar ID, BALLB uploads with validation)
  - Step 5: Bank & Account Details (account holder, account number, bank name, IFSC)
  - Step 6: Expertise & Preferences (languages, locations, case types, years of experience)
  - Step 7: Company Details (conditional, shown only if lawyer operates through a company)
- **Status badges** for onboarding completion (Complete/Incomplete) and KYC status (Verified/Pending/Missing)
- **Document upload fields** with thumbnail/icon preview, filename display, and download option
- **Dedicated profile view** with header showing lawyer photo, name, status, ID, contact info, and onboarding/KYC status
- **Tabbed navigation** below header with four tabs:
  - **Details**: All profile information (Basic Info, Expertise & Preferences, Current Address, Permanent Address, Bank Details, KYC Documents, Qualifications, Experience, Company Details if applicable)
  - **Incidents**: Table of all incidents assigned to this lawyer with columns: Incident ID, Challan No, Vehicle No, Violation Type, Amount, Status, Assigned Date, Resolution Date
  - **Invoicing**: Summary of payments pending to invoice with table showing completed work not yet invoiced (Incident ID, Resolution Date, Commission Amount, Status) and total pending amount
  - **Transactions**: Past payments that have been paid with columns: Transaction ID, Invoice No, Amount, Payment Date, Payment Method, Status
- **Form validation** ensuring only lawyers with completed onboarding and verified KYC can be marked as active
- **Category dropdown** with predefined options: Criminal Law, Motor Vehicle Act, Corporate Litigation, Consumer Protection Law, Intellectual Property, Employment and Labour Laws, Startup and Corporate Compliance, Taxation, ADR, Family Law, Insolvency and Bankruptcy Law, and specialized areas
- **Sub-category field** for further specialization within chosen category
- Only active lawyers with completed KYC are eligible for challan assignment

## Configuration
- shell: true
