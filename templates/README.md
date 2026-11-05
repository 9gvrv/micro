# Templates

Reusable starting points for Micro projects. Templates are read-only inputs; never modify them in place.

## Selection

| Template | Use when |
| --- | --- |
| `minimal-react` | The app is a timer, calculator, converter, visualizer, or simple utility. |
| `dashboard` | The app needs a sidebar, header, multiple content sections, or overview cards. |
| Neither fits | Scaffold the smallest suitable app instead of forcing a template. |

## Copying

```bash
cp -R templates/minimal-react generated/<project-name>
```

Then:

```bash
cd generated/<project-name>
pnpm install
pnpm dev
```

Use a new kebab-case directory. If the target already exists, stop and ask.

## Common stack

React, Vite, TypeScript, and pnpm. The dashboard template also uses Tailwind CSS.

## Independent use

Each template contains its own `package.json`, configuration, source, and README. It can be copied outside this repository and run on its own.

Node.js 20.19+ or 22.12+ is required by Vite 7. pnpm 12.16.1 was used for validation.

## Custom scaffolds

If neither template fits, create only the files the MVP needs. Do not add a template unless it is reused by future projects.
