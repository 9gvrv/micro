# Dashboard Template

React + Vite + TypeScript + Tailwind CSS starter for Micro applications with several content sections.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm (validated with 12.16.1)

## Setup

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Type-check and build for production. |
| `pnpm preview` | Preview the production build locally. |

## Structure

```text
src/
├── App.tsx
├── components/
│   ├── Card.tsx
│   ├── Header.tsx
│   ├── Section.tsx
│   └── Sidebar.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Layout

The layout is a single page with a sidebar, header, and two anchor-linked sections. The sidebar becomes a horizontal bar on small screens and a left column at the `md` breakpoint.

## Customize

Replace the placeholder metrics and detail cards in `App.tsx`. Reuse `Card` and `Section` before adding new layout components. Keep Tailwind configuration unchanged unless the approved design requires it.

## Notes

This template has no router, backend, authentication, database, charts, or sample business logic. Add one only when the approved project requires it.
