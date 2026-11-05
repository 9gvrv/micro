# Micro

Micro is a chat-driven AI prototyping workspace. A user submits an application idea in Mattermost; an existing coding agent connected through Switch turns it into a minimal, runnable web application under `generated/`.

This repository contains Micro's operating instructions and reusable frontend templates. It does not contain the agent runtime or the Switch/Mattermost integration.

## What Micro builds

- Small, functional MVPs.
- React + Vite + TypeScript by default, managed with pnpm.
- A backend only when the idea genuinely requires one.
- No authentication, database, or cloud deployment by default.

## What Micro is not

- A production application generator.
- A custom agent, MCP server, or orchestration service.
- A hosted platform or project management system.

## Structure

```text
micro/
├── README.md
├── AGENTS.md
├── PROJECTS.md
├── instructions/
│   └── MICRO_BUILDER.md
├── templates/
│   ├── README.md
│   ├── minimal-react/
│   └── dashboard/
└── generated/
```

## Workflow

1. The user sends an idea in Mattermost.
2. The agent asks only essential clarification questions.
3. The agent proposes a minimal plan and waits for approval.
4. The agent selects a template or scaffolds a minimal app.
5. The agent creates `generated/<project>/`, implements, installs, runs, and verifies it.
6. The agent reports the path, preview URL, and summary, then updates `PROJECTS.md`.

## Templates

| Template | Use for |
| --- | --- |
| `minimal-react` | Timers, calculators, converters, visualizers, simple utilities. |
| `dashboard` | Expense trackers, management tools, analytics interfaces, multi-section apps. |

If neither fits, scaffold a minimal app instead of forcing a template.

## Quick start

```bash
cp -R templates/minimal-react generated/my-app
cd generated/my-app
pnpm install
pnpm dev
```

See [`templates/README.md`](templates/README.md) for selection and copying rules.

## Status

Workspace initialized. Agent execution and Switch/Mattermost integration are out of scope for this task.
