# AI Headquarters roadmap

## v0.3 — implemented locally, awaiting user review

Approved 2026-10-18: the application is **only interactive rooms**. No exterior dashboard, persistent sidebar, or navigation toolbar. Characters, desks, doors, wall equipment, and contextual notes provide the controls. This supersedes the earlier plan to retain surrounding panels or room tabs.

Primary design reference: [vanDijkFit](https://github.com/vandijkthijs-source/vanDijkFit), inspected read-only at `de078380400ca76c15fcdbb65777c3a4a1ea76ec`. Exact palette and source evidence are recorded in PROJECT.md. No vanDijkFit modifications are permitted.

### Completed prerequisites

- Fixed both original ESLint errors and once-per-task completion reporting.
- Initialized a separate local Git repository with explicit user approval.
- Reused the public vanDijkFit commit identity for vandijkthijs-source in this repository's local configuration. No global settings or remote configured.
- Saved working v0.2 as baseline `5f19d70`, then tested movement/token foundations as `85f1a09`.

### Completed v0.3 scope

- True code-native pixel-art Kairo, Nyx, and Rune with distinct hair/headset/hat, directional faces, walking legs, and typing hands. The implemented source grid is 16×24 at 2×, refining the initially proposed 24×24 square frames.
- Compact room scene draggable through its wall nameplate, with pointer capture, mouse/touch input, keyboard arrows, Home/reset, viewport bounds, and resize cleanup.
- Manual desk-to-desk walking and autonomous workstation visits through aisle waypoints. Requests atomically swap destinations; typing stops during walking and pause.
- Engineering, UI Lab, and QA Room, reached through in-room doors. Shared floor plan; distinct station labels, accent cues, and interactive equipment. Server lights, design preview, and explicitly simulated QA results each retain room-local state.
- Preserved task creation/ownership, character selection, progress, activity feed, and pause/resume in object-triggered dialogs. Added labels, native dialog focus containment, Escape/close, keyboard-operated room objects, and a contextual guide.
- Persistent simulation signage; no real AI calls, repository edits, or tests are performed by the room.
- Local design-token source for vanDijkFit slate/blue palettes, spacing, panel radii, text, feedback, sprite timing, and monitor animation. Dark UI exposed; light palette declarations reserved for later use.
- Movement invariant tests, lint/build, and desktop/mobile Chrome smoke checks. See DEVLOG.md for actual evidence and limitations.

### User review / possible follow-ups

- Completed the approved small-file refactor: task state/dialogs, editable room objects/character layer, then focused readable stylesheets. Appearance and interaction behavior are preserved. PROJECT.md provides the editing map; AGENTS.md records the conventions.

- Review character proportions, room size, movement speed, and visual density in the running browser preview.
- Consider distinct floor plans per room, additional props, more character frames, and richer directional silhouettes after feedback.
- Small room signs scale down on narrow screens. Further phone-specific zoom or larger object hit areas may be useful; the scene currently fits and contextual dialogs remain readable.
- No persistence: refreshing resets tasks, room selection, equipment, and window position.

## Later work — outside this release

- Persistent settings and tasks.
- Additional room layouts and character customization.
- Real AI/task integrations with explicit authorization, truthful execution evidence, and distinct simulation/real modes.
- Light-mode UI/toggle and expanded responsive room presentation.

## Boundaries

AI Headquarters remains separate from vanDijkFit. No push, merge, deployment, remote repository creation, or vanDijkFit modification is authorized. Local v0.3 implementation is complete and reviewable; publishing still needs explicit user permission.
