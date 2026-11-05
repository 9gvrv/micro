# Micro Landing Page

Standalone single-page site for Micro, the AI prototyping agent. It presents the idea-to-app workflow and links to the repository.

## Run

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

## Deploy on Cloudflare Pages

Connect this repository to Cloudflare Pages and use these settings:

| Setting | Value |
| --- | --- |
| Root directory | `landing` |
| Build command | `pnpm build` |
| Build output directory | `dist` |

Cloudflare resolves the output directory relative to the root directory, so the
site is served from `landing/dist` in the repository.

Node.js 22 is pinned in `.nvmrc`. If the build image ignores it, set
`NODE_VERSION=22` in the Pages project environment variables. The lockfile is
`lockfileVersion: '9.0'`, which is readable by pnpm 9 and newer.

`public/_headers` adds security headers and long-lived caching for hashed
assets. `public/favicon.svg` is copied into the build automatically.

## Scope

One page, no routing, backend, authentication, or interactive demo. The only
external link is the Micro GitHub repository.
