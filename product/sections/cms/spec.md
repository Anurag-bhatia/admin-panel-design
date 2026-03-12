# CMS

Content management system for creating, editing, and publishing blogs, events, and news articles surfaced across customer-facing channels.

## Tabs

### 1. Blog
- Table list of all blog posts
- Columns: SR No., Name, Category, Author, Read Mins, Featured on Challan Pay (Yes/No), Icon (thumbnail), Alt Text
- "+ Add Blog" button opens a modal form
- Breadcrumb: CMS / Blog List

### 2. Events & News
- Table list of all event and news articles
- Columns: SR No., Name, Category, Author, Read Mins, Icon (thumbnail), Status (Enabled/Disabled), Actions (Toggle, Edit, Delete)
- "+ Add Event and News" button opens a modal form
- Breadcrumb: CMS / Event and News List

## User Flows

### View Blogs
1. User navigates to CMS section
2. Blog tab is active by default
3. Table shows all blog posts with serial numbers
4. User can search/filter blogs

### Add Blog
1. User clicks "+ Add Blog"
2. Modal opens with form fields: Title, Category, Author, Read Mins, Featured toggle, Icon upload, Alt Text, Content
3. User fills in details and submits
4. Blog appears in the list

### View Events & News
1. User clicks "Events & News" tab
2. Table shows all event/news articles with status and action controls
3. User can toggle enable/disable, edit, or delete entries

### Add Event & News
1. User clicks "+ Add Event and News"
2. Modal opens with form fields: Title, Category, Author, Read Mins, Icon upload, Content
3. User fills in details and submits
4. Entry appears in the list as Enabled by default

## Configuration
```
shell: true
```
