# Pomodoro Timer

A minimal Pomodoro timer built with React, Vite, TypeScript, and pnpm.

## Behavior

- Work sessions are 25 minutes.
- Break sessions are 5 minutes.
- **Start** begins or resumes the countdown.
- **Pause** freezes the countdown.
- **Reset** returns to a paused 25:00 work session and clears the counter.
- The session counter records completed work sessions.
- When a work session ends, the app switches to a paused break session.
- When a break ends, the app switches to a paused work session.

The next phase does not start automatically.

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
| `pnpm install` | Install dependencies. |

## Structure

```text
src/
├── App.tsx
├── components/Button.tsx
├── main.tsx
├── styles.css
└── vite-env.d.ts
```

## Scope

No backend, persistence, authentication, routing, sound, notifications, or custom durations. The timer state resets when the page reloads.
