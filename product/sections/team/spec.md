# Team Specification

## Overview
The Team section is the organizational backbone where administrators manage employees, teams, permissions, and access control. It provides a structured interface for defining who is part of the system, how they're organized, and what they can access, completely eliminating manual people management through Excel or external tools.

## User Flows

### View Employees
- View comprehensive employee list in tabular format with profile pictures, names, departments, designations, reporting managers, and status
- See real-time active employee count at the top
- Toggle between Employees and Teams tabs

### Add New Employee
- Click Add Employee button
- Step 1 (Profile Information): Enter profile photo, first name, last name, mobile number, email, gender, date of birth, department, designation, date of joining, primary reporting manager, secondary reporting manager
- Step 2 (Create Credentials): Set up login credentials with official email and password (enforced security rules)
- Step 3 (Permissions): Configure Module Access and Flow Access for the new employee
- Employee created with active status, credentials, and permissions; appears in employee list

### View Employee Details
- Click any employee row to navigate to a full-screen detail page (not a modal)
- Detail page header shows back button, "Employee Details" title, avatar with initials, employee name, active/inactive status badge, designation and department subtitle
- Action buttons in header: Edit Profile, Manage Permissions, Deactivate
- Tabbed navigation below header with two tabs: Details and Permissions
- **Details tab**: Three cards displaying Personal Information (email, mobile, date of birth, gender), Professional Information (department, designation, date of joining), and Reporting Structure (primary reporting manager, secondary reporting manager)
- **Permissions tab**: Single continuous list of all modules separated by dividers; each module row shows the module name with a switch toggle to enable/disable access; directly under each module, its flows are listed with individual switch toggles; when a module is switched off, its flows remain visible but greyed out and disabled; Save button applies changes instantly and logs in audit trail

### Edit Employee Profile
- Click "Edit Profile" button on employee detail page header
- Edit profile details
- Changes saved and logged in audit trail

### Deactivate Employee
- Click "Deactivate" button on employee detail page header
- Deactivate employee
- System instantly revokes access, removes from active assignments, preserves all historical data and audit logs

### Manage Teams
- Switch to Teams tab
- View list of operational teams with name, department, team lead, member count, status
- Create new team with name, department, team lead, and active members
- Edit team composition and details
- Activate/deactivate teams without impacting historical data

## UI Requirements
- Two-tab layout: Employees tab and Teams tab
- Employee table displaying profile picture, full name, department, designation, reporting manager, status (active/inactive badge)
- Real-time employee count displayed prominently at top
- Add Employee button as primary action
- Full-screen wizard for three-step employee onboarding with step indicator (1/2/3) and progress
- Clicking any employee row navigates to the employee detail page
- Employee detail page with:
  - Header showing back button, "Employee Details" title, avatar with initials, employee name, active/inactive status badge, designation and department subtitle
  - Action buttons: Edit Profile, Manage Permissions, Deactivate
  - Tabbed navigation with 2 tabs:
    - **Details**: Three cards — Personal Information (email, mobile, DOB, gender), Professional Information (department, designation, date of joining), Reporting Structure (primary and secondary reporting manager)
    - **Permissions**: Single continuous list of modules with switch toggles; each module's flows listed underneath with individual switch toggles; disabled modules show flows greyed out; Save button
- Teams table showing team name, department, team lead, member count, active/inactive status
- Team creation and editing forms
- Inactive employees remain visible but clearly distinguished from active ones
- Success confirmation after creating employee, returns to employee list
- All profile changes and permission updates logged in audit trail
- Clear visual distinction between active and inactive employees and teams

## Screen Designs
- **TeamManagement** - Main team management interface with employee list, teams, and management features

## Configuration
- shell: true
