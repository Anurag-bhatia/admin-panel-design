# Test Instructions: CMS

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test content management including blog creation with rich text editor, events/news management, status toggle, and CRUD operations.

---

## User Flow Tests

### Flow 1: Add Blog Post

**Steps:**
1. Blog tab active (default)
2. Click "+ Add Blog"
3. Fill Title, Category, Author, Read Mins, Featured toggle, upload Icon, Alt Text, Content (rich text)
4. Submit

**Expected Results:**
- [ ] Blog appears in Blog list
- [ ] SR No auto-assigned
- [ ] Featured status shown correctly

### Flow 2: Add Event/News

**Steps:**
1. Switch to "Events & News" tab
2. Click "+ Add Event and News"
3. Fill form fields
4. Submit

**Expected Results:**
- [ ] Entry appears in list as Enabled by default
- [ ] Status shows "Enabled"

### Flow 3: Toggle Event Status

**Steps:**
1. Click enable/disable toggle on an event row

**Expected Results:**
- [ ] Status switches immediately (Enabled ↔ Disabled)

### Flow 4: Delete Event

**Steps:**
1. Click delete button on event row
2. Confirm deletion

**Expected Results:**
- [ ] Entry removed from list
- [ ] Empty state shown if last entry deleted

---

## Empty State Tests

- [ ] No blogs: "No blog posts yet. Click '+ Add Blog' to create one."
- [ ] No events/news: "No events or news yet."

---

## Sample Test Data

```typescript
const mockBlog = {
  id: "BLOG-001",
  title: "Understanding Traffic Challans",
  category: "Legal",
  author: "Priya Sharma",
  readMins: 5,
  featured: true,
  icon: "/images/blog-1.jpg",
  altText: "Traffic challan illustration",
  content: "<p>Blog content here...</p>",
};

const mockEventNews = {
  id: "EVT-001",
  title: "Annual Legal Conference 2025",
  category: "Events",
  author: "Admin",
  readMins: 3,
  icon: "/images/event-1.jpg",
  status: "enabled",
  content: "<p>Event details...</p>",
};
```
