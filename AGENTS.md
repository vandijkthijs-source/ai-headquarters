# AI Headquarters — agent instructions

## Scope and approval

- Work in this project only. Preserve the existing working dashboard and its interactions.
- v0.3 is a proposal in ROADMAP.md. Do not implement it until the user explicitly approves the plan.
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
- Current application: src/App.tsx, src/App.css, src/index.css; bootstrap: src/main.tsx.
- Keep TypeScript strict and retain effect cleanup for timers and future event listeners.
- Extract small components or hooks only as needed for an approved feature.
- Keep controls accessible by keyboard, provide meaningful labels, support narrow screens and reduced motion in new interactions.
- Treat movement/animation state separately from task state; animation must not claim real work occurred.

## Simulation versus real activity

- Current task progress, coding, reviews, completion, and activity messages are local simulation. No AI execution, repository edits, tests, or GitHub work happen through the dashboard.
- Clearly label simulated activity in future UI changes. A "Live coding" label or animated character is not evidence of real AI work.
- Any future real integration needs explicit scope and truthful status based on actual results; never expose credentials in client code.

## Known baseline (2026-10-18)

- Build passes. Lint fails in src/App.tsx: no-useless-assignment and react-hooks/set-state-in-effect. Details are in DEVLOG.md.
- `.git` is empty and read-only in the current workspace; `git status` fails. Checkpoint creation remains blocked until a writable, valid repository is available.
