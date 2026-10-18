# AI Headquarters — agent instructions

## Scope and approval

- Work in this project only. Preserve working interactions and make changes in focused checkpoints.
- The user approved v0.3 as a room-only interface: pixel characters, walking, draggable scene, and multiple small rooms. Do not restore the surrounding v0.2 dashboard/sidebar. All controls live in room objects or contextual dialogs.
- Never push, merge, deploy, or modify vanDijkFit without explicit user permission. Its name in demo tasks is not authorization.
- Make small, focused changes to existing files. Avoid full rewrites, unnecessary dependencies, and unrelated cleanup.
- Preserve the `src.before-*` and `index.before-*` snapshots; do not restore them over the active application.

## Session workflow

1. Read PROJECT.md, ROADMAP.md, and the latest DEVLOG.md entries. Inspect relevant source and Git status before editing.
2. Use Git checkpoints before implementation and after each verified, focused change. Inspect staged changes and commit only intended files; never include credentials, generated output, or dependencies.
3. If Git is unavailable or its metadata is protected, report the blocker. Do not overwrite `.git`, invent a commit, or treat snapshots as Git checkpoints.
4. Run `npm run build` and `npm run lint` after changes. Record actual outcomes, including pre-existing failures. Do not disable lint rules to conceal errors.
5. For interactive changes, verify affected behavior in a browser when available. Distinguish code inspection from runtime testing.
6. Update DEVLOG.md with changes, checks, limitations, and next steps. Keep architecture and roadmap documents aligned with approved decisions.

## Technical conventions

- React + TypeScript + Vite; npm and package-lock.json are the existing toolchain.
- Task state: src/App.tsx; room visuals/dialogs/sprites: src/components; movement and drag: src/hooks; tokens: src/styles/tokens.css; bootstrap: src/main.tsx.
- Keep TypeScript strict and retain effect cleanup for timers and future event listeners.
- Extract small components or hooks only as needed for an approved feature.
- Keep controls accessible by keyboard, provide meaningful labels, support narrow screens and reduced motion in new interactions.
- Treat movement/animation state separately from task state; animation must not claim real work occurred.

## Simulation versus real activity

- Current task progress, coding, reviews, completion, and activity messages are local simulation. No AI execution, repository edits, tests, or GitHub work happen through the dashboard.
- Clearly label simulated activity in future UI changes. A "Live coding" label or animated character is not evidence of real AI work.
- Any future real integration needs explicit scope and truthful status based on actual results; never expose credentials in client code.

## Current status (2026-10-18)

- Build and lint pass; both original ESLint errors were fixed before v0.3.
- Fresh local Git initialization was approved. Checkpoints use the same observed public commit identity as vandijkthijs-source, configured repository-locally. No remote is configured. Never push, merge, deploy, or modify vanDijkFit without explicit permission.
- `npm test` checks movement invariants. Browser verification should cover dialogs, task flow, doors, pause, drag bounds, keyboard interaction, mobile layout, and reduced motion.
