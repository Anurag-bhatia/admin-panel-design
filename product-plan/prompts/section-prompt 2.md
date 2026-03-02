# Section-by-Section Implementation Prompt

Use this template to implement sections incrementally. Copy and customize for each section.

---

## Template Prompt

I need you to implement the **[SECTION_NAME]** section of an admin panel application.

**Context:**
- Review `product-overview.md` for the overall product context
- This section is part of a larger application with [NUMBER] total sections

**Before we begin, please confirm:**
1. Has the foundation been set up? (project, routing, design system)
2. Has the shell been implemented? (navigation, layout)
3. Are there any dependencies on other sections?

**For this section, please:**
1. Read the section spec at `sections/[SECTION_ID]/README.md`
2. Review the components in `sections/[SECTION_ID]/components/`
3. Use the types from `sections/[SECTION_ID]/types.ts`
4. Reference sample data from `sections/[SECTION_ID]/sample-data.json`
5. Follow the milestone instructions at `instructions/incremental/[NN]-[SECTION_ID].md`

**Implementation requirements:**
- All components must accept data and callbacks via props
- Support both light and dark mode
- Ensure mobile responsiveness
- Write tests following `sections/[SECTION_ID]/tests.md`

**Key files:**
- `sections/[SECTION_ID]/README.md` — Section overview
- `sections/[SECTION_ID]/components/` — Reference implementations
- `sections/[SECTION_ID]/types.ts` — TypeScript interfaces
- `sections/[SECTION_ID]/sample-data.json` — Test data
- `sections/[SECTION_ID]/tests.md` — Test specifications
- `instructions/incremental/[NN]-[SECTION_ID].md` — Implementation guide

---

## Section List

Use this list to fill in the template:

| Section | ID | Milestone |
|---------|-----|-----------|
| Incidents | incidents | 03-incidents |
| Sales CRM | sales-crm | 04-sales-crm |
| Subscribers | subscribers | 05-subscribers |
| Customers | customers | 06-customers |
| Lawyers | lawyers | 07-lawyers |
| Partners | partners | 08-partners |
| Support | support | 09-support |
| Reports | reports | 10-reports |
| Team | team | 11-team |

---

## Example: Implementing Incidents

```
I need you to implement the **Incidents** section of an admin panel application.

**Context:**
- Review `product-overview.md` for the overall product context
- This section is part of a larger application with 9 total sections

**For this section, please:**
1. Read the section spec at `sections/incidents/README.md`
2. Review the components in `sections/incidents/components/`
3. Use the types from `sections/incidents/types.ts`
4. Reference sample data from `sections/incidents/sample-data.json`
5. Follow the milestone instructions at `instructions/incremental/03-incidents.md`

**Key files:**
- `sections/incidents/README.md` — Section overview
- `sections/incidents/components/` — Reference implementations
- `sections/incidents/types.ts` — TypeScript interfaces
- `sections/incidents/sample-data.json` — Test data
- `sections/incidents/tests.md` — Test specifications
```
