# Tailwind Color Configuration

## Color Choices

- **Primary:** `cyan` — Used for buttons, links, key accents, active states
- **Secondary:** `zinc` — Used for tags, highlights, secondary elements, sidebar
- **Neutral:** `slate` — Used for backgrounds, text, borders, cards

## Usage Examples

### Primary Actions
```html
<!-- Primary button -->
<button class="bg-cyan-600 hover:bg-cyan-700 text-white">Save</button>

<!-- Primary link -->
<a class="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">View details</a>

<!-- Active nav item -->
<button class="bg-cyan-600 text-white">Incidents</button>
```

### Secondary Elements
```html
<!-- Tag/badge -->
<span class="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">Tag</span>

<!-- Sidebar background -->
<aside style="background-color: #212121">...</aside>
```

### Neutral Elements
```html
<!-- Card -->
<div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

<!-- Body text -->
<p class="text-slate-700 dark:text-slate-300">Content</p>

<!-- Muted text -->
<span class="text-slate-500 dark:text-slate-400">Secondary info</span>

<!-- Page background -->
<main class="bg-slate-50 dark:bg-slate-950">
```

### Status Colors

Use Tailwind's built-in colors for status indicators:

```html
<!-- Success -->
<span class="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>

<!-- Warning -->
<span class="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>

<!-- Error -->
<span class="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">Failed</span>

<!-- Info -->
<span class="bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">In Progress</span>
```

## Dark Mode

All components support dark mode via Tailwind's `dark:` variant. The design uses:

- Light mode: `slate-50` backgrounds, `slate-900` text
- Dark mode: `slate-950` backgrounds, `white`/`slate-100` text

Ensure all color classes have corresponding `dark:` variants for proper theme support.
