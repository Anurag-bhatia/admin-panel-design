# Full Preview Feature Implementation Prompt

## Overview

Create a comprehensive preview system for a Design OS admin panel that allows viewing all implemented sections in a complete application shell with navigation. The preview feature includes a section registry pattern, lazy-loaded components, placeholder states for unimplemented sections, and full app shell simulation.

---

## Architecture

### Core Concept

The preview system uses a **Registry Pattern** to:
1. Map section IDs to their preview components
2. Manage section metadata (labels, descriptions, icons)
3. Lazy-load components only when needed
4. Show placeholder UI for sections under development

### File Structure

```
src/Preview/
├── sectionRegistry.ts          # Central registry for all sections
├── FullPreviewPage.tsx         # Full app shell preview
├── PreviewPage.tsx             # Sidebar + content preview
├── PreviewContent.tsx          # Content rendering area
├── PreviewSidebar.tsx          # Navigation sidebar
├── SectionRenderer.tsx         # Dynamic section loader
├── PlaceholderSection.tsx      # Coming soon UI
└── usePreviewState.ts          # State management hook (optional)

src/shell/components/           # Existing shell components
├── AppShell.tsx                # Main layout wrapper (reuse existing)
├── MainNav.tsx                 # Navigation (reuse existing)
└── UserMenu.tsx                # User menu (reuse existing)
```

---

## Implementation Steps

### Step 1: Create Section Registry (`src/Preview/sectionRegistry.ts`)

This is the core of the preview system. Create a TypeScript file that:

**Exports:**

1. **SECTION_DATA** - Record mapping section IDs to metadata
   ```typescript
   interface SectionMetadata {
     label: string
     description: string
     icon: React.ComponentType<{ className?: string }>
   }

   export const SECTION_DATA: Record<string, SectionMetadata>
   ```

   Map at least these 10 sections (adjust as needed):
   - incidents, leads, subscribers, lawyers, partners, payments, disputes, support, reports, team
   - Include lucide-react icons for each
   - Provide meaningful descriptions for each section

2. **SECTION_COMPONENTS** - Record mapping section IDs to lazy-loaded components
   ```typescript
   export const SECTION_COMPONENTS: Record<string, React.ComponentType<any> | null>
   ```

   Use React.lazy() to import preview components:
   ```typescript
   const IncidentListPreview = React.lazy(() =>
     import('../sections/incidents/IncidentListPreview')
   )
   ```

   Set unimplemented sections to `null`

3. **SECTION_IDS** - Ordered array of all section IDs
   ```typescript
   export const SECTION_IDS = [
     'incidents',
     'leads',
     'subscribers',
     'lawyers',
     'partners',
     'payments',
     'disputes',
     'support',
     'reports',
     'team',
   ] as const

   export type SectionId = (typeof SECTION_IDS)[number]
   ```

4. **Helper Functions:**
   - `isSectionId(value: unknown): value is SectionId` - Type guard
   - `getSectionLabel(sectionId: SectionId): string` - Get display name
   - `getSectionIcon(sectionId: SectionId)` - Get lucide icon
   - `getSectionDescription(sectionId: SectionId): string` - Get description
   - `getComponentForSection(sectionId: SectionId): React.ComponentType<any> | null` - Get component
   - `isImplemented(sectionId: SectionId): boolean` - Check if implemented

---

### Step 2: Create SectionRenderer Component (`src/Preview/SectionRenderer.tsx`)

A dynamic loader that renders sections based on implementation status.

**Props:**
```typescript
interface SectionRendererProps {
  sectionId: SectionId
}
```

**Behavior:**
1. Check if section is implemented using `isImplemented()`
2. If not implemented, render `<PlaceholderSection />`
3. If implemented, lazy-load component with `<Suspense>` boundary
4. Show loading state while component loads
5. Handle errors gracefully

**Loading Fallback UI:**
```
Centered text: "Loading [Section Name]..."
Subtext: "Please wait while we prepare the section"
```

**Error Fallback UI:**
```
Centered error text: "Error loading [Section Name]"
Subtext: "The section could not be loaded. Please refresh the page or contact support."
```

---

### Step 3: Create PlaceholderSection Component (`src/Preview/PlaceholderSection.tsx`)

Show a "coming soon" UI for unimplemented sections.

**Display:**
1. Center the content vertically
2. Show the section icon (from registry) with a lock badge overlay
3. Show section label
4. Show section description
5. Optional: Add "Coming soon" or "Under development" text

**Styling:**
- Use Tailwind classes
- Support dark mode (`dark:` variants)
- Responsive padding and sizing
- Icon should be prominent (48-64px)

---

### Step 4: Create FullPreviewPage Component (`src/Preview/FullPreviewPage.tsx`)

The main preview experience - full app shell with section navigation.

**Structure:**
1. Use existing `AppShell` component (from `src/shell/components/AppShell`)
2. Build navigation items from `SECTION_DATA`
3. Use hash-based routing for section switching (e.g., `#incidents`)
4. Render `<SectionRenderer>` as children of `AppShell`

**State Management:**
```typescript
const [activeSection, setActiveSection] = useState<SectionId>('incidents')
```

**Navigation Items:**
```typescript
const navigationItems: NavigationItem[] = SECTION_IDS.map((sectionId) => ({
  label: getSectionLabel(sectionId),
  href: `#${sectionId}`,
  icon: getSectionIcon(sectionId),
  isActive: activeSection === sectionId,
}))
```

**Navigation Handler:**
```typescript
const handleNavigate = (href: string) => {
  const sectionId = href.replace(/^#/, '')
  if (isSectionId(sectionId)) {
    setActiveSection(sectionId)
  }
}
```

**Mock User:**
```typescript
const mockUser = {
  name: 'Preview User',
  email: 'preview@example.com',
}
```

**Pass to AppShell:**
```typescript
<AppShell
  navigationItems={navigationItems}
  user={mockUser}
  onNavigate={handleNavigate}
  onLogout={() => console.log('Logout clicked')}
>
  <SectionRenderer sectionId={activeSection} />
</AppShell>
```

---

### Step 5: Create PreviewPage Component (`src/Preview/PreviewPage.tsx`)

Optional: A simpler two-panel preview (sidebar + content).

**Structure:**
```
+----------+------------------+
| Sidebar  | Content Area     |
|          |                  |
| (Section | (SectionRenderer)|
|  List)   |                  |
+----------+------------------+
```

**Components:**
- `<PreviewSidebar>` - List of sections for navigation
- `<PreviewContent>` - Renders `<SectionRenderer>`

---

### Step 6: Create PreviewSidebar Component (`src/Preview/PreviewSidebar.tsx`)

Navigation list for preview sections.

**Display:**
1. List all sections from `SECTION_IDS`
2. Show icon + label for each
3. Highlight active section
4. Click to switch sections

---

### Step 7: Create PreviewContent Component (`src/Preview/PreviewContent.tsx`)

Content area wrapper that renders the selected section.

**Props:**
```typescript
interface PreviewContentProps {
  sectionId: SectionId
}
```

**Behavior:**
- Render `<SectionRenderer sectionId={sectionId} />`

---

### Step 8: Add Routes to Router

Update your router configuration to add preview routes:

```typescript
{
  path: '/preview',
  element: <PreviewPage />,
},
{
  path: '/full-preview',
  element: <FullPreviewPage />,
}
```

---

### Step 9: Update AppLayout (Optional)

Add a button in your app header to navigate to full preview:

```typescript
<button
  onClick={() => navigate('/full-preview')}
  title="Full Preview"
  className="..." // Your button styling
>
  <Eye className="w-5 h-5" /> {/* lucide-react icon */}
  Full Preview
</button>
```

---

## Key Features

✓ **Section Registry Pattern** - Single source of truth for all sections
✓ **Lazy Loading** - Components loaded only when viewed
✓ **Type Safety** - Full TypeScript with `SectionId` type
✓ **Placeholder States** - Professional "coming soon" UI
✓ **Responsive Design** - Mobile to desktop support
✓ **Dark Mode** - Full `dark:` variant support
✓ **Error Handling** - Suspense boundaries with fallbacks
✓ **Navigation** - Hash-based routing for section switching
✓ **AppShell Integration** - Reuses existing shell components
✓ **Icon Support** - lucide-react icons for each section

---

## Design Requirements

### Colors & Styling

- **Primary Colors:** Cyan (cyan-600, cyan-700) for active states
- **Neutral Colors:** Stone/slate palette for text and borders
- **Status Colors:** Use project design system (if defined)
- **Dark Mode:** All components must have `dark:` variants

### Responsive Behavior

- Mobile: 100% width, optimized layouts
- Tablet: Sidebar visible, content responsive
- Desktop: Full sidebar + content layout
- Use Tailwind prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### Typography

- Use project's typography system (font families, sizes)
- Maintain hierarchy: headings, body, labels, captions
- Monospace for code/technical content

---

## Component Props

### AppShell (Existing Component)

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: {
    name: string
    email: string
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

interface NavigationItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
}
```

---

## Implementation Checklist

- [ ] Create `sectionRegistry.ts` with all 10 sections
- [ ] Create `SectionRenderer.tsx` with Suspense and error handling
- [ ] Create `PlaceholderSection.tsx` with icon and description
- [ ] Create `FullPreviewPage.tsx` with AppShell integration
- [ ] Create `PreviewPage.tsx` (optional)
- [ ] Create `PreviewSidebar.tsx` (if using PreviewPage)
- [ ] Create `PreviewContent.tsx` (if using PreviewPage)
- [ ] Add routes to router (`/preview` and `/full-preview`)
- [ ] Add preview button to AppLayout (optional)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test dark mode support
- [ ] Test loading states
- [ ] Test error states
- [ ] Verify section switching works
- [ ] Verify section icons display correctly
- [ ] Verify lazy loading (components only load when viewed)

---

## Testing Checklist

### Functionality Tests
- [ ] Navigate between sections using sidebar
- [ ] Unimplemented sections show placeholder UI
- [ ] Implemented sections load and render
- [ ] Loading states display while component loads
- [ ] Error states display on load failure
- [ ] User menu shows in header
- [ ] Navigation maintains active state highlight

### Responsive Tests
- [ ] Mobile (320px, 375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px, 1440px)
- [ ] Sidebar visibility at different breakpoints
- [ ] Buttons and clickable areas have proper sizing

### Dark Mode Tests
- [ ] All sections readable in light mode
- [ ] All sections readable in dark mode
- [ ] Placeholder UI visible in both modes
- [ ] Text contrast meets WCAG standards

### Performance Tests
- [ ] Initial page load is fast
- [ ] Switching sections is responsive
- [ ] Lazy loading works (check DevTools Network tab)
- [ ] No console errors

---

## Tips & Best Practices

1. **Use TypeScript strictly** - Leverage `SectionId` type for type safety
2. **Keep components small** - Split large components into smaller ones
3. **Reuse existing components** - Use AppShell, icons, etc. from project
4. **Test early** - Verify each component works before moving on
5. **Mobile-first** - Design for mobile, enhance for larger screens
6. **Accessibility** - Ensure keyboard navigation works
7. **Document metadata** - Keep section descriptions clear and helpful
8. **Lazy load aggressively** - Use React.lazy() for all preview components

---

## File Templates

### sectionRegistry.ts - Minimal Template

```typescript
import React from 'react'
import { AlertCircle, Users, Scale } from 'lucide-react'

// Lazy-loaded section preview components
const SectionAPreview = React.lazy(() =>
  import('../sections/a/SectionAPreview')
)

export const SECTION_DATA = {
  'section-a': {
    label: 'Section A',
    description: 'Description of section A',
    icon: AlertCircle,
  },
  'section-b': {
    label: 'Section B',
    description: 'Description of section B',
    icon: Users,
  },
}

export const SECTION_COMPONENTS = {
  'section-a': SectionAPreview,
  'section-b': null, // Coming soon
}

export const SECTION_IDS = ['section-a', 'section-b'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function isSectionId(value: unknown): value is SectionId {
  return typeof value === 'string' && SECTION_IDS.includes(value as SectionId)
}

// Helper functions...
```

---

## Success Criteria

The preview feature is successfully implemented when:

✓ User can navigate between all 10 sections from sidebar
✓ Implemented sections render with their components
✓ Unimplemented sections show professional placeholder UI
✓ Clicking a section instantly switches content (no page reload)
✓ Responsive design works on mobile, tablet, and desktop
✓ Dark mode is fully supported
✓ Loading states display while components load
✓ No console errors or warnings
✓ Lazy loading confirmed in DevTools (components only load on demand)
✓ All section icons display correctly
✓ User menu appears in header
✓ Feature accessible from `/full-preview` route

---

## Example Section Metadata

For reference, here's what section metadata should look like:

```typescript
incidents: {
  label: 'Incidents',
  description: 'Core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement with automated coordination.',
  icon: AlertCircle,
}

leads: {
  label: 'Leads',
  description: 'Lead capture, qualification, and conversion tracking for prospective B2B clients.',
  icon: UserPlus,
}

subscribers: {
  label: 'Subscribers',
  description: 'Active client account management and relationship tracking for B2B fleet operators and companies.',
  icon: Users,
}

lawyers: {
  label: 'Lawyers',
  description: 'Legal professional network management with performance tracking and commission calculation.',
  icon: Scale,
}

partners: {
  label: 'Partners',
  description: 'Partner relationship management for data sources, referral partners, and service delivery partners.',
  icon: Handshake,
}

payments: {
  label: 'Payments',
  description: 'Commission and refund payment processing with automated calculations and financial tracking.',
  icon: CreditCard,
}

disputes: {
  label: 'Disputes',
  description: 'Customer dispute resolution workflow for handling challenges regarding charges, refunds, or service outcomes.',
  icon: MessageSquare,
}

support: {
  label: 'Support',
  description: 'Support ticket management system for handling subscriber inquiries and issues.',
  icon: HeadphonesIcon,
}

reports: {
  label: 'Reports',
  description: 'Comprehensive reporting dashboards and analytics across all business metrics and operations.',
  icon: BarChart3,
}

team: {
  label: 'Team',
  description: 'User and team administration for managing internal operations staff and permissions.',
  icon: UsersRound,
}
```

---

## Notes

- This is a **Design OS preview feature**, not a production application
- The AppShell component should already exist in your project
- Adjust section list and metadata based on your specific product
- All components should accept props (never import data directly)
- Use your project's existing design system for colors and typography
- Ensure all dependencies (lucide-react, React Router, Tailwind) are installed

---

**Happy building! 🚀**
