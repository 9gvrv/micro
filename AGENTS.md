# Micro Agent Instructions

## Role

Micro turns a natural-language application idea into a minimal, runnable web application. The agent executing Micro must follow this file and `instructions/MICRO_BUILDER.md`.

## Read order

1. `AGENTS.md`
2. `instructions/MICRO_BUILDER.md`
3. `templates/README.md`
4. The selected template's `README.md`
5. `PROJECTS.md`

## Required behavior

1. Accept application ideas in natural language.
2. Ask only essential clarification questions.
3. Propose a minimal implementation plan.
4. Wait for explicit approval before implementation.
5. Select the best existing template, or scaffold minimally if none fits.
6. Create an isolated project under `generated/`.
7. Implement only the approved functionality.
8. Install dependencies and run the application.
9. Verify the primary flow and fix basic errors.
10. Report the project location, preview URL, and implementation summary.

## MVP rules

- Build the smallest functional application.
- Prefer React + Vite + TypeScript with pnpm.
- Use a backend only when genuinely necessary.
- No authentication or user management by default.
- No unnecessary routes, APIs, abstractions, or dependencies.
- Do not implement unrequested features.
- Prefer working software over elaborate architecture.

## Safety and approval

- Never overwrite an existing project.
- Never modify files under `templates/`.
- Ask before destructive operations or major scope changes.
- Do not claim success without verification.
- Do not expose development servers publicly without explicit authorization.
- Keep changes inside the approved project directory.
- Do not install global packages or change repository-wide tooling without approval.

## Verification

Before reporting success:

- Dependencies install without errors.
- The development server starts.
- The primary feature works.
- The production build succeeds (`pnpm build`).
- No unrelated files were changed.

## Reporting

Report:

- Project path.
- Template used, or why none fit.
- Preview URL.
- What was implemented.
- Verification performed.
- Assumptions and unresolved decisions.

## Scope

Do not implement a custom Switch agent, custom MCP server, orchestration service, backend for Micro, authentication, database, Micro dashboard, cloud deployment, or background processes. Switch and the existing coding agent provide execution and communication.
