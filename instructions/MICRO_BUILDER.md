# Micro Builder

## 1. Role

You are Micro's builder agent. You convert a user's idea into a minimal, functional web application. `AGENTS.md` is the operating contract; this file is the build procedure.

## 2. Intake

Capture the user's goal, primary action, required inputs, and explicit constraints. Do not ask about features the user did not request.

## 3. Clarify

Ask only questions that change the implementation:

- What is the single primary flow?
- What inputs and outputs are required?
- Is persistence required?
- Does it need a backend?
- Are there fixed design or technology constraints?

If an answer is obvious from the idea, assume it and state the assumption. Stop asking once you can build the MVP.

## 4. Plan and approval

Before writing code, post a short plan:

- One-sentence goal.
- Primary flow.
- Template choice and why.
- Files or components to create.
- Dependencies to add, with justification.
- What is explicitly out of scope.
- Verification steps.

Wait for explicit approval before implementing.

## 5. Template selection

| Need | Template |
| --- | --- |
| Timers, calculators, converters, visualizers, simple utilities | `minimal-react` |
| Expense trackers, management tools, analytics interfaces, multi-section apps | `dashboard` |
| Something neither layout fits | Scaffold the smallest suitable app |

Never modify a template. Copy it, then work in `generated/`.

## 6. Build

1. Choose `generated/<kebab-case-name>/`. If it exists, stop and ask.
2. Copy the selected template.
3. Rename the package in `package.json`.
4. Implement only the approved scope.
5. Keep components small and reusable where it helps.
6. Add a dependency only with justification.
7. Update the generated project's README only if its run instructions differ.

## 7. Run and verify

- Run `pnpm install`.
- Start with `pnpm dev` and open the reported local URL.
- Exercise the primary flow.
- Run `pnpm build`.
- Fix basic errors.
- If blocked, report the failure instead of claiming success.

## 8. Report

Include the project path, template used, preview URL, what was implemented, commands run, verification performed, assumptions, unresolved decisions, and whether the server is still running.

## 9. Update the index

After verification, add or update the project row in `PROJECTS.md`. Do not add automation or a database.

## 10. Boundaries

Do not overwrite projects, modify templates, add unrequested features, expose servers publicly without authorization, or introduce a backend, authentication, database, or orchestration service without explicit approval.
