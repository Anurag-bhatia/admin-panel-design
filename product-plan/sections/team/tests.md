# Team Section -- Test Instructions

## Overview

The Team section manages employees, teams, permissions, and access control. It features a two-tab layout (Employees / Teams), a 3-step onboarding wizard, full-screen employee detail pages with Details and Permissions tabs, and team CRUD with activate/deactivate functionality.

---

## 1. User Flow Tests

### 1.1 View Employees (Default View)

**Success path:**
- Landing on the Team section displays the "Employees" tab as active by default.
- The employee table renders columns: profile picture (avatar), full name, department, designation, reporting manager, and status badge.
- A real-time employee count is displayed prominently at the top (e.g., "12 Employees").
- Active employees show a green "Active" badge; inactive employees show a grey "Inactive" badge.
- Inactive employees appear in the same table but are visually distinguished from active ones (muted styling or separate grouping).
- An "Add Employee" button is visible as the primary action.

**Failure path:**
- If the employee list API fails, an error message is shown in place of the table.

### 1.2 Add New Employee (3-Step Wizard)

**Step 1 -- Profile Information:**
- Clicking "Add Employee" opens a full-screen wizard with a step indicator showing "1 / 3" or equivalent progress.
- The form displays fields: Profile Photo (upload), First Name, Last Name, Mobile Number, Email, Gender (Male / Female / Other), Date of Birth, Department (dropdown), Designation (dropdown), Date of Joining, Primary Reporting Manager (dropdown, nullable), Secondary Reporting Manager (dropdown, nullable).
- All required fields must be filled before proceeding. Attempting to advance with missing required fields shows inline validation errors.
- A "Next" button advances to Step 2.

**Step 2 -- Create Credentials:**
- Step indicator updates to "2 / 3".
- The form shows Official Email and Password fields.
- Password must enforce security rules (minimum length, special characters, etc.). Entering a weak password shows a validation error.
- A "Back" button returns to Step 1 with data preserved. A "Next" button advances to Step 3.

**Step 3 -- Permissions:**
- Step indicator updates to "3 / 3".
- The form displays Module Access toggles (list of all available modules with switch toggles).
- Under each module, Flow Access toggles appear for each flow within that module.
- Toggling a module off greys out and disables its flow toggles.
- Toggling a module on enables its flow toggles.
- A "Back" button returns to Step 2 with data preserved.
- A "Submit" / "Create Employee" button creates the employee.

**Success path (complete):**
- After submission, a success confirmation is displayed.
- The wizard closes and the user is returned to the employee list.
- The newly created employee appears in the table with "Active" status.

**Failure path:**
- If submission fails (e.g., duplicate email), an error message is shown without losing form data.
- If the user cancels mid-wizard, no employee is created.

### 1.3 View Employee Details

**Success path:**
- Clicking any employee row navigates to a full-screen detail page (not a modal).
- The detail page header shows:
  - A back button (arrow or "Back" link) to return to the employee list.
  - "Employee Details" title text.
  - Avatar with initials (from first and last name).
  - Employee full name.
  - Active/Inactive status badge.
  - Designation and department subtitle (e.g., "Senior Developer, Engineering").
- Three action buttons in the header: "Edit Profile", "Manage Permissions", "Deactivate".
- Below the header, two tabs: "Details" and "Permissions".

**Details tab (default):**
- Three cards are displayed:
  - **Personal Information**: Email, Mobile, Date of Birth, Gender.
  - **Professional Information**: Department, Designation, Date of Joining.
  - **Reporting Structure**: Primary Reporting Manager, Secondary Reporting Manager.
- All fields show the current values. Null/empty values for reporting managers show a placeholder like "Not Assigned" or "--".

**Permissions tab:**
- A single continuous list of all modules, separated by dividers.
- Each module row shows the module name with a switch toggle to enable/disable access.
- Directly under each module, its flows are listed with individual switch toggles.
- When a module switch is turned off, its flow toggles remain visible but are greyed out and disabled.
- A "Save" button applies permission changes instantly and logs the change in the audit trail.

### 1.4 Edit Employee Profile

**Success path:**
- Clicking "Edit Profile" on the employee detail page opens an edit form (modal or inline).
- The form is pre-filled with all current employee data.
- User modifies fields and clicks "Save" or "Update".
- Changes are saved, the detail page reflects the updates, and the change is logged in the audit trail.

**Failure path:**
- Submitting invalid data (e.g., empty required field) shows validation errors.

### 1.5 Deactivate Employee

**Success path:**
- Clicking "Deactivate" on the employee detail page header triggers a confirmation dialog.
- The dialog warns the user about the consequences (e.g., "This will revoke access and remove from active assignments").
- Confirming deactivation:
  - Employee status changes to "Inactive".
  - Access is instantly revoked.
  - Employee is removed from active assignments.
  - All historical data and audit logs are preserved.
  - The status badge on the detail page updates to "Inactive".
  - The "Deactivate" button changes to "Reactivate" (or is replaced).

**Failure path:**
- Cancelling the confirmation dialog leaves the employee unchanged.

### 1.6 Manage Teams

**Success path (view teams):**
- Clicking the "Teams" tab switches the view from Employees to Teams.
- The teams table displays columns: Team Name, Department, Team Lead, Member Count, Status (Active/Inactive).

**Success path (create team):**
- Clicking "Create Team" or equivalent button opens a form.
- Form fields: Name, Department (dropdown), Team Lead (dropdown from employees), Members (multi-select from employees).
- Submitting creates the team with "Active" status.
- The new team appears in the teams table.

**Success path (edit team):**
- Clicking a team row or edit action opens the team form pre-filled with current data.
- User modifies fields and saves. Changes are reflected in the table.

**Success path (activate/deactivate team):**
- Toggling team status between Active and Inactive updates the status badge.
- Deactivating a team preserves historical data.
- Inactive teams remain visible but are visually distinguished.

---

## 2. Empty State Tests

- **No employees**: When the employee list is empty, display an empty state with a message like "No employees found" and a prominent "Add Employee" call-to-action button.
- **No teams**: When the teams list is empty, display an empty state with "No teams created yet" and a "Create Team" button.
- **No permissions configured**: If an employee has no module access enabled, the Permissions tab should show all modules with toggles in the off position.
- **No reporting manager**: Employee detail should gracefully show "Not Assigned" or equivalent for null primary/secondary reporting managers.

---

## 3. Component Interaction Tests

- **Tab switching**: Clicking "Employees" and "Teams" tabs toggles between the two views. Only one tab is active at a time. The active tab has distinct visual styling.
- **Step indicator navigation**: During the 3-step wizard, the step indicator correctly shows the current step (1, 2, or 3). Completed steps are visually marked. Users can navigate back but not skip forward.
- **Module-flow permission coupling**: Toggling a module off disables all its flow toggles (greyed out, non-interactive). Toggling the module back on re-enables the flow toggles with their previous states preserved.
- **Permission save**: Clicking "Save" on the Permissions tab calls `onSavePermissions` with the employee ID and the full permissions object.
- **Avatar initials**: The employee detail header avatar displays the correct initials (first letter of first name + first letter of last name).
- **Row click navigation**: Clicking an employee row calls `onViewEmployee` with the correct employee ID. Clicking a team row calls `onViewTeam` with the correct team ID.
- **Back button**: The back button on the employee detail page returns to the employee list without data loss.
- **Active count**: The employee count at the top reflects the actual number of employees (filtered or total, depending on implementation).

---

## 4. Edge Cases

- **Long employee names**: Names exceeding typical length (e.g., 60+ characters) should truncate with ellipsis or wrap gracefully in the table and detail page.
- **Large team member count**: A team with 50+ members should display the count correctly and handle the member list without layout breakage.
- **Duplicate email on onboarding**: If the official email already exists, the wizard should show a clear error at Step 2 and not advance.
- **Rapid tab switching**: Switching between Employees and Teams tabs quickly should not cause rendering glitches or stale data.
- **Permission save with no changes**: Clicking "Save" on Permissions without modifying anything should either no-op gracefully or show "No changes to save".
- **Deactivating an employee who is a team lead**: The system should handle this scenario -- either warn the user, block deactivation until a new lead is assigned, or automatically remove the team lead assignment.
- **Profile picture upload**: Uploading an image for the profile picture should show a preview. Uploading an invalid file type should show an error.
- **Date of birth in the future**: Entering a future date for Date of Birth should show a validation error.
- **Date of joining before date of birth**: The system should validate that Date of Joining is after Date of Birth.

---

## 5. Accessibility Checks

- All form fields have associated labels (visible or via `aria-label`).
- Tab navigation (keyboard) works for switching between Employees and Teams tabs.
- Switch toggles on the Permissions tab are keyboard-accessible (Space or Enter to toggle).
- The step indicator on the wizard conveys progress to screen readers (e.g., "Step 1 of 3: Profile Information").
- Status badges ("Active" / "Inactive") are conveyed to screen readers, not just by color.
- The deactivation confirmation dialog traps focus and can be dismissed with Escape.
- Table rows are keyboard-navigable (Enter or Space to select/navigate).
- Color contrast meets WCAG AA for all text, badges, and toggles in both light and dark modes.

---

## 6. Sample Test Data

### Employees

| id | firstName | lastName | department | designation | status | primaryReportingManager |
|----|-----------|----------|------------|-------------|--------|------------------------|
| EMP-001 | Rahul | Sharma | Engineering | Senior Developer | active | Priya Patel |
| EMP-002 | Priya | Patel | Engineering | Engineering Manager | active | null |
| EMP-003 | Amit | Verma | Operations | Operations Executive | active | Neha Singh |
| EMP-004 | Neha | Singh | Operations | Operations Manager | inactive | null |
| EMP-005 | Deepak | Kumar | Sales | Sales Executive | active | Rahul Sharma |

### Teams

| id | name | department | teamLead | memberCount | status |
|----|------|------------|----------|-------------|--------|
| TM-001 | Backend Core | Engineering | Priya Patel | 5 | active |
| TM-002 | Field Operations | Operations | Neha Singh | 8 | active |
| TM-003 | Growth Team | Sales | Amit Verma | 3 | inactive |

### Modules and Flows (for Permissions)

| Module | Flows |
|--------|-------|
| Incidents | Create Incident, Assign Agent, Assign Lawyer, Move Queue, Add Expense |
| Leads | Create Lead, Assign Lead, Edit Lead, Bulk Upload |
| Subscribers | View Subscribers, Add Subscriber, Edit Subscriber |
| Partners | View Partners, Add Partner, Edit Partner |
| Payments | View Payments, Process Refund |
| Reports | View Reports, Export Reports |

### Onboarding Form Data

```
firstName: "Kavita"
lastName: "Reddy"
mobile: "+91 98765 43210"
email: "kavita.reddy@example.com"
gender: "Female"
dateOfBirth: "1995-03-15"
department: "Engineering"
designation: "Junior Developer"
dateOfJoining: "2026-05-01"
primaryReportingManager: "EMP-001"
secondaryReportingManager: null
officialEmail: "kavita.reddy@company.com"
password: "Str0ng!Pass#2026"
```
