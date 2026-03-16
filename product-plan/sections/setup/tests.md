# Test Instructions: Setup (Admin Control)

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the configuration hub including 7 tabs, slide-over add/edit, status toggle, drag-to-reorder, audit history, and protected values.

---

## User Flow Tests

### Flow 1: Add Configuration Entry

**Steps:**
1. Select a tab (e.g., Categories)
2. Click "Add" button
3. Slide-over panel opens from right
4. Fill name, description, module, status
5. Save

**Expected Results:**
- [ ] Entry appears in table
- [ ] Slide-over closes
- [ ] Table behind panel visible during editing

### Flow 2: Edit Entry

**Steps:**
1. Click a row in table
2. Slide-over opens pre-filled
3. Modify fields, save

**Expected Results:**
- [ ] Entry updated in table
- [ ] Change logged in audit

### Flow 3: Reorder Entries

**Steps:**
1. Drag a row to new position

**Expected Results:**
- [ ] Display order changes
- [ ] New order persisted

### Flow 4: Protected Values

**Steps:**
1. Find a protected entry (lock icon)
2. Try to edit or deactivate

**Expected Results:**
- [ ] Edit/deactivate disabled
- [ ] Tooltip explains: "This is a core system value and cannot be modified"

---

## Empty State Tests

- [ ] No entries for tab: "No entries yet. Click Add to create one."
- [ ] No audit entries: "No changes recorded yet"
- [ ] No search results: "No entries match your search"

---

## Sample Test Data

```typescript
const mockConfigEntry = {
  id: "CAT-001",
  name: "Motor Vehicle Act",
  description: "Traffic violation cases",
  status: "active",
  module: "Incidents",
  lastModified: "2025-12-01T10:00:00Z",
  modifiedBy: "Admin",
  isProtected: false,
};
```
