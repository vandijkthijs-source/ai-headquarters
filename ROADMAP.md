# AI Headquarters roadmap

## v0.3 — proposed, awaiting user approval

No v0.3 implementation is authorized yet. Deliver each phase as a focused, verified Git checkpoint once Git is available. Preserve selection, task creation, progress display, activity, and pause controls throughout.

Primary design reference: [vanDijkFit](https://github.com/vandijkthijs-source/vanDijkFit), inspected read-only at `de078380400ca76c15fcdbb65777c3a4a1ea76ec` on 2026-10-18. PROJECT.md records source links, exact palettes, observed components, and the proposed token contract. No reference-repository changes are permitted.

### Prerequisites and design foundation

- Completed before v0.3: the two ESLint fixes and per-task completion reporting; lint/build pass (see DEVLOG.md).
- Blocked: AI Headquarters Git checkpoints. `.git` is absent in the current environment. Resolve existing-history recovery versus fresh local initialization with the user, then create a reviewed checkpoint before feature work. No sudo, metadata deletion/overwrite, or permission change without approval.
- Await approval of this revised redesign plan. Documentation is authorized; token code, visual changes, and v0.3 features remain pending.
- First approved design slice: create the local token source described in PROJECT.md, preserving the current appearance until component migration. Adopt source semantic colors, radii, and typography; label derived spacing and office motion values as adaptations.
- Next slice: apply slate surfaces, blue actions/selections, thin borders, 18/24 radii, and system sans hierarchy to the existing chrome/controls. Keep the scene and interactions intact. This establishes the visual foundation before sprites and room work.
- Acceptance: changing a token affects all migrated consumers; no repeated palette literals or duplicated UI duration constants; lint/build and affected browser interactions pass. No new UI framework or dependency on vanDijkFit.

### 1. Stabilize the existing demo

- Restore a valid writable Git repository and capture the current dashboard baseline.
- Already completed in the authorized prerequisite fix: both baseline lint errors resolved, each newly completed task reported once. Recheck during subsequent changes.
- Add a persistent simulation indicator and use truthful simulated-status wording, including after the initial activity message scrolls away.
- Acceptance: build/lint pass; adding tasks, selecting owners, completion reporting, and pause/resume work; no real AI work is implied.

### 2. Pixel-art characters and coding animation

- Keep Kairo, Nyx, and Rune and their existing roles/colors. Create distinct silhouettes, outfits, and palettes on a shared pixel grid.
- Proposed baseline: 24×24 source frames at integer display scales, crisp nearest-neighbor rendering; idle, directional walking, and typing frames.
- Replace character visuals incrementally while retaining buttons and selection. Tie typing and monitor animation to simulated task/movement states.
- Acceptance: all three are recognizable true pixel-art characters; typing is visible only while seated and coding; pause and reduced-motion preferences are respected.

### 3. Walking between workstations

- Introduce room-local station coordinates and explicit idle/walking/typing states, separate from task progress.
- Use walkable waypoints around desks, directional walk frames, consistent speed, and a visible destination. A selected station can request a character move.
- Acceptance: characters reach multiple workstations without crossing furniture, teleporting, or losing selection; movement pauses/resumes cleanly and cleans up on unmount.

### 4. Compact draggable office window

- Evolve the existing window in place; preserve access to the detail panel and request composer at compact sizes.
- Drag via the title bar using pointer events and pointer capture; ignore interactive controls. Clamp to viewport, reclamp after resize, and offer reset plus keyboard movement controls.
- Acceptance: mouse/touch dragging works, controls remain clickable, the window cannot become unreachable, and narrow screens remain usable without horizontal overflow.

### 5. Multiple interactive mini-rooms

- Proposed rooms: Engineering Office, UI Lab, and QA Room. Reuse the existing three workstation themes; final names can be adjusted during review.
- Add a compact room switcher and at least one meaningful interaction per room (station selection, UI preview toggle, simulated QA checklist).
- Keep global tasks and character identity stable across room switches; contain movement within the active room and avoid duplicate timers.
- Acceptance: all rooms can be entered and interacted with; returning preserves task/selection state and characters remain in valid positions.

### 6. vanDijkFit design consistency and release review

- Use the inspected repository as the primary reference. Source-supported design: slate solid surfaces, blue primary actions, muted supporting text, thin bordered rounded cards, bold metric hierarchy, labeled outline-icon navigation, and short interaction feedback. Screenshots/device review may refine visual matching; no runtime fidelity has been claimed.
- Audit the shared token migration across window chrome, request composer, activity, progress, and all rooms. Use the exact semantic palettes and documented adapted spacing/type/motion roles from PROJECT.md. Keep office sprites crisp and character accents distinct.
- Adapt the reference's active-tab hierarchy to room navigation. Do not import workout flows, native navigation dependencies, logo artifacts, or starter assets into the office.
- Review desktop/narrow layouts, keyboard access, focus, text contrast, pause, reduced motion, dragging bounds, and room transitions.
- Run build/lint, targeted movement/completion tests where useful, and browser smoke checks; record evidence and limitations in DEVLOG.md.
- Update version metadata only when preparing the approved release. Commit locally; publishing/deploying still requires explicit permission.

## Approval scope

Approval of this plan would authorize local incremental v0.3 work. It would not authorize pushing, merging, deploying, modifying vanDijkFit, or connecting real AI services. Proposed sprite dimensions, room names, and movement mechanics are defaults for review, not existing capabilities.

The local Git setup decision remains a separate prerequisite. This read-only design-reference request does not select new history over recovery. Token creation and component migration will begin only after that decision is resolved and the redesign plan is approved.

## Later ideas — outside v0.3

- Persistent settings and tasks.
- Real AI/task integrations with explicit permission, execution evidence, and distinct simulation/real modes.
- Additional rooms and character customization.
