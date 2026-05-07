# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Or install via npm:

```bash
npm install geist
```

```js
import 'geist/font/sans.css';
import 'geist/font/mono.css';
```

## Tailwind CSS v4 Configuration

```css
@theme {
  --font-sans: 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, 'SFMono-Regular', monospace;
}
```

## Font Usage

- **Headings:** Geist (font-sans) — All page titles, section headers, card titles
- **Body text:** Geist (font-sans) — Paragraphs, labels, descriptions, table cells
- **Code/technical:** Geist Mono (font-mono) — IDs, timestamps, amounts, reference numbers

## Type Scale

| Element | Tailwind Classes |
|---------|-----------------|
| Page title | `text-3xl font-bold` |
| Section heading | `text-2xl font-semibold` |
| Card title | `text-lg font-semibold` |
| Subtitle | `text-base font-medium` |
| Body text | `text-sm` |
| Small text | `text-xs` |
| Labels | `text-xs font-medium` |
| Button text | `text-sm font-medium` |
| Table header | `text-xs font-medium uppercase tracking-wider` |
| Code/IDs | `font-mono text-sm` |
