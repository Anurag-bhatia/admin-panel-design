# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or import in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
```

## Font Usage

| Purpose | Font | Weight | Class |
|---------|------|--------|-------|
| Headings | Geist | 600-700 | `font-semibold` or `font-bold` |
| Body text | Geist | 400-500 | `font-normal` or `font-medium` |
| Code/IDs | Geist Mono | 400 | `font-mono` |

## CSS Configuration

```css
:root {
  --font-heading: 'Geist', system-ui, sans-serif;
  --font-body: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

code, pre, .mono {
  font-family: var(--font-mono);
}
```

## Tailwind Configuration

If using Tailwind CSS, extend the font family in your config:

```js
// tailwind.config.js (for Tailwind v3)
// Note: Tailwind v4 does not use config files

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
}
```

## Type Scale

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| Page title | `text-2xl` (1.5rem) | 1.2 | 600 |
| Section heading | `text-lg` (1.125rem) | 1.4 | 600 |
| Card title | `text-base` (1rem) | 1.5 | 500 |
| Body text | `text-sm` (0.875rem) | 1.5 | 400 |
| Small text | `text-xs` (0.75rem) | 1.5 | 400 |
| Labels | `text-xs` (0.75rem) | 1.5 | 500 |

## Usage Examples

```html
<!-- Page title -->
<h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Incidents</h1>

<!-- Section heading -->
<h2 class="text-lg font-semibold text-slate-900 dark:text-white">Assigned Incidents</h2>

<!-- Body text -->
<p class="text-sm text-slate-600 dark:text-slate-400">No incidents assigned yet.</p>

<!-- ID/Code -->
<span class="font-mono text-sm text-slate-500">IRN-12345</span>

<!-- Label -->
<label class="text-xs font-medium text-slate-500 uppercase">Status</label>
```
