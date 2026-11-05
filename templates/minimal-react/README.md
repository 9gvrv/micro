# Minimal React Template

Small React + Vite + TypeScript starter for Micro utilities such as timers, calculators, converters, and visualizers.

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
├── components/Button.tsx
├── main.tsx
├── styles.css
└── vite-env.d.ts
```

## Customize

Replace the counter in `App.tsx` with the approved feature. Add components under `src/components/` only when they are reused. Keep global styles in `styles.css` until the styling needs grow.

## Notes

This template has no router, backend, authentication, database, or test framework. Add one only when the approved project requires it.
