# Incidents Module - Design Summary

## Overview

The Incidents module is the operational backbone of the Admin Panel, providing a complete workflow for managing challans, disputes, and legal requests from creation to closure. The design is **theme-consistent**, **fully responsive**, and **production-ready**.

---

## Design System Applied

### Color Palette
- **Primary (Cyan)**: `cyan-600` / `cyan-700` for main actions and interactive elements
- **Secondary (Zinc)**: `zinc-500` / `zinc-600` for secondary elements and filters
- **Neutral (Slate)**: `slate-900` to `slate-100` for text, borders, and backgrounds
- **Dark Mode**: Full `dark:` variant support across all colors

### Typography
- **Heading Font**: Geist (all heading weights)
- **Body Font**: Geist (regular and medium weights)
- **Monospace**: Geist Mono (for technical content)

### Spacing & Layout
- Consistent padding: `px-4`, `px-6`, `py-2`, `py-4`, `py-6`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Border radius: `rounded-lg` (standard), `rounded-2xl` (modals)

---

## Components Created

### 1. **IncidentList.tsx** (Main List View)
**Purpose**: Display all incidents in a table format with status presets, filtering, and bulk operations.

**Features**:
- Table with intelligent column visibility (responsive design)
- 10 status preset buttons with incident counts
- Ad-hoc filtering by priority
- Multi-select for bulk operations
- Shows/hides columns based on screen size

**Columns**:
- Incident ID & Reference Number
- Subscriber Name
- Incident Type
- Status (badge with color)
- Priority (single letter indicator)
- Assigned Team
- Assigned Lawyer
- TAT Countdown (color-coded SLA indicator)

**Responsive Behavior**:
- **Mobile**: ID, Subscriber, Priority
- **Tablet** (sm+): Adds Type, Amount info
- **Desktop** (md+): Adds Status badge
- **Large** (lg+): Adds Team, Lawyer
- **XL+** (2xl): Adds full TAT display

---

### 2. **IncidentListHeader.tsx** (Action Bar)
**Purpose**: Top-right action controls for incident management.

**Actions**:
1. **Add New Incident** - Opens form to create single incident
2. **Bulk Upload** - Opens file upload dialog for batch creation
3. **Bulk Update** - Appears when incidents are selected; allows batch updates

**Design**:
- Sticky positioning
- Shows selected count dynamically
- Primary action button (cyan)
- Secondary action button (slate)

---

### 3. **StatusPresets.tsx** (Status Filter)
**Purpose**: Quick-access buttons to filter by incident status.

**Statuses**:
- All Incidents (📋)
- New (✨)
- Assigned (👤)
- In Progress (⚙️)
- Awaiting Lawyer (⏳)
- Awaiting Receipt (📄)
- SLA Breached (🔴)
- Closed (✓)
- Failed (✗)
- Refunded (💰)

**Features**:
- Active status highlighted with cyan background
- Shows incident count per status
- Horizontal scrollable on mobile
- Emoji icons for quick visual recognition

---

### 4. **IncidentFilters.tsx** (Filter Panel)
**Purpose**: Ad-hoc filtering of incidents by multiple criteria.

**Filters**:
- **Search**: By Incident ID, Reference Number, Subscriber
- **Priority**: Low, Medium, High, Critical (multi-select)

**Design**:
- Search bar with icon
- Priority tag buttons
- "Clear Filters" option (appears when filters active)
- Informational hint text

---

### 5. **IncidentRow.tsx** (Table Row)
**Purpose**: Individual incident display with interactive state.

**Data Displayed**:
- Checkbox for selection
- Incident ID & Reference
- Subscriber Name
- Incident Type
- Status badge (color-coded)
- Priority indicator
- Assigned Team
- Assigned Lawyer
- TAT/SLA countdown (visual indicator)
- Hover chevron for interaction

**Visual Features**:
- Color-coded status badges:
  - Blue: New
  - Cyan: Assigned
  - Amber: In Progress
  - Purple: Awaiting Lawyer
  - Indigo: Awaiting Receipt
  - Red: SLA Breached
  - Green: Closed
  - Gray: Failed
  - Zinc: Refunded
- Responsive column hiding
- Hover state with background change
- Selection highlight (cyan background)

---

### 6. **SLAIndicator.tsx** (TAT Display)
**Purpose**: Visual SLA/TAT countdown with color-coded urgency.

**Status Levels**:
- **Green (✓)**: On Track (>15 days remaining)
- **Blue (🔵)**: Caution (8-15 days remaining)
- **Amber (🟡)**: Warning (4-7 days remaining)
- **Red (🔴)**: Critical (1-3 days remaining)
- **Red (⚠️)**: Breached (0 or negative days)

**Design**:
- Compact badge format
- Icon + text label
- Responsive background colors
- Clear visual hierarchy

---

### 7. **AddNewIncidentForm.tsx** (Create Incident Form)
**Purpose**: Comprehensive form for manually creating a single incident.

**Fields**:
- **Subscriber** (Dropdown, required)
- **Incident Type** (Dropdown: Challan, Court Challan, Legal Notice, Dispute)
- **Reference Number** (Text input, required)
- **Location** (Text input, required)
- **Amount** (₹) (Number input, required)
- **Vehicle Number** (Text input, required)
- **Driver Name** (Text input, required)
- **Violation Type** (Dropdown, required)
- **Priority** (Dropdown: Low, Medium, High, Critical)
- **Additional Notes** (Textarea, optional)

**Features**:
- Full form validation
- Error messages with icons
- Two-column layout on desktop
- Single column on mobile
- Real-time error clearing
- Informational box about 45-day TAT
- Submit state feedback

**Design**:
- Modal format (can also be standalone page)
- Close button (modal only)
- Cancel & Create buttons
- Clear visual feedback for required fields
- Error states with red borders

---

### 8. **BulkUploadForm.tsx** (Bulk Upload Dialog)
**Purpose**: Guided interface for uploading multiple incidents via CSV/Excel.

**Workflow**:
1. **Download Template** - CSV template generation with sample data
2. **Upload File** - Drag-and-drop or click to upload
3. **Review & Confirm** - File validation and submission

**Features**:
- Drag-and-drop file upload
- File format validation (CSV, XLSX only)
- File size validation (max 5MB)
- Real-time file validation feedback
- Sample template download
- Success state display
- Error handling with clear messages

**Design**:
- Step-based layout
- Visual progress (numbered steps)
- Color-coded feedback (green success, red errors)
- Responsive design

---

## Preview Pages

### 1. **IncidentListPreview.tsx**
- Renders the main Incident List View with sample data
- Modals for Add New Incident and Bulk Upload
- Console logging for all interactions
- Click "Add New Incident" or "Bulk Upload" to see forms

### 2. **AddNewIncidentPreview.tsx**
- Standalone preview of the Add New Incident form
- Toggle between form and closed state
- Shows form validation in action

### 3. **BulkUploadPreview.tsx**
- Standalone preview of the Bulk Upload form
- Shows all steps of the workflow
- Template download functionality
- File upload simulation

---

## Theme Consistency

✅ **Color Usage**:
- Primary actions: Cyan (consistent throughout)
- Secondary actions: Slate gray
- Success states: Green
- Error/Warning states: Red/Amber
- Neutral backgrounds: Slate

✅ **Dark Mode**:
- All components use `dark:` variants
- High contrast maintained in dark mode
- Border colors adapt
- Text colors have proper contrast

✅ **Visual Hierarchy**:
- Large headings: 1.5rem (24px)
- Section titles: 1.125rem (18px)
- Labels: 0.875rem bold (14px)
- Body text: 0.875rem (14px)
- Small text: 0.75rem (12px)

✅ **Spacing Consistency**:
- Component padding: 4px-6px vertical, 4px-6px horizontal
- Section spacing: 6px (1.5rem) gap
- Border radius: `rounded-lg` standard

---

## Features Implemented

### Incident List View
✓ Table-based display with 12 sample incidents
✓ 10 status preset filters
✓ Multi-select for bulk operations
✓ Ad-hoc filtering by priority
✓ Responsive column visibility
✓ Color-coded status badges
✓ SLA/TAT countdown display
✓ Hover interactions
✓ Empty state message

### Add New Incident
✓ Full form with 9 fields
✓ Subscriber selection
✓ Real-time validation
✓ Error messages with icons
✓ Two-column responsive layout
✓ Modal or page display option
✓ Submit state feedback

### Bulk Upload
✓ Drag-and-drop file upload
✓ CSV/XLSX file support
✓ File validation (format, size)
✓ Template download with sample data
✓ Step-based workflow
✓ Success/Error states
✓ Clear error messaging

---

## Responsive Design

### Mobile (< 640px)
- Single column layout for forms
- Simplified table (ID, Subscriber, Priority only)
- Full-width modals
- Touch-friendly button sizes

### Tablet (640px - 1024px)
- Two-column form layout
- Additional table columns (Type)
- Horizontal scrolling for table overflow

### Desktop (1024px+)
- Full layout with all columns visible
- Optimal spacing and sizing
- All features accessible

### Large Desktop (2xl+)
- Full TAT display in table
- Maximum column visibility
- Optimal reading width maintained

---

## Accessibility Features

✓ Proper form labels and placeholders
✓ Error messages with visual indicators
✓ Required field indicators (*)
✓ Tab navigation support
✓ High contrast colors
✓ Semantic HTML structure
✓ Checkbox selection for bulk operations
✓ Descriptive button text

---

## Files Created

```
src/sections/incidents/components/
├── IncidentList.tsx
├── IncidentListHeader.tsx
├── StatusPresets.tsx
├── IncidentFilters.tsx
├── IncidentRow.tsx
├── SLAIndicator.tsx
├── AddNewIncidentForm.tsx
├── BulkUploadForm.tsx
└── index.ts

src/sections/incidents/
├── IncidentListPreview.tsx
├── AddNewIncidentPreview.tsx
└── BulkUploadPreview.tsx
```

---

## Integration Notes

All components are **props-based** and **fully portable**:
- No hardcoded data (all via props)
- No routing logic (callbacks for navigation)
- No navigation chrome (renders inside app shell)
- Full TypeScript support
- Callback props for all interactions

---

## Next Steps

1. **Restart dev server** to load all changes
2. **View the preview** at `/incidents` route
3. **Create Incident Detail Page** with timeline and documents
4. **Capture screenshots** for documentation
5. **Export product** when all sections complete

---

## Design Philosophy

The Incidents module is designed following these principles:

1. **Clarity**: Clear visual hierarchy and information hierarchy
2. **Efficiency**: Quick scanning, status presets, bulk operations
3. **Consistency**: Theme-aligned colors, spacing, typography
4. **Responsiveness**: Works seamlessly across all device sizes
5. **Accessibility**: Proper contrast, labels, error messaging
6. **Feedback**: Visual indicators for state changes and operations
7. **Reliability**: Validation, error handling, success states

