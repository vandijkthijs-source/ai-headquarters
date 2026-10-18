# AI Headquarters roadmap

## v0.3 — approved room-only scope

The user approved building v0.3 on 2026-10-18 with a revised visual scope: only small interactive rooms, with no surrounding dashboard, sidebar, or persistent control panels. Preserve task creation, ownership, selection, progress, activity, and pause/resume through interactions with characters and room objects. Earlier references to a sidebar or external room tabs are superseded by this direction. Use verified local Git checkpoints throughout.

### Approved interaction layout

- A compact draggable room scene is the complete application surface. A room nameplate serves as the drag handle, with keyboard arrow movement and a position reset.
- Pixel-art Kairo, Nyx, and Rune are selectable; selecting a character opens task details inside the room.
- Clicking a workstation directs the selected character there through walkable floor waypoints. Idle characters periodically travel between desks; coding and walk animations reflect movement/task state.
- Physical doors move between Engineering, UI Lab, and QA mini-rooms. Room switches preserve tasks and character identities.
- An interactive wall board opens local task creation and activity. A wall control pauses/resumes the simulation. In-room overlays appear only on interaction and dismiss with Escape/close.
- Persistent small room signage identifies all activity as simulation. No AI execution or integration is implied.
- Apply the verified vanDijkFit slate/blue palette and shared local tokens to the rooms, signage, and contextual overlays while retaining crisp pixel-art characters and furnishings.

Primary design reference: [vanDijkFit](https://github.com/vandijkthijs-source/vanDijkFit), inspected read-only at `de078380400ca76c15fcdbb65777c3a4a1ea76ec` on 2026-10-18. PROJECT.md records source links, exact palettes, observed components, and the proposed token contract. No reference-repository changes are permitted.

### Prerequisites and design foundation

- Completed before v0.3: the two ESLint fixes and per-task completion reporting; lint/build pass (see DEVLOG.md).
- Git initialization was explicitly approved and completed. A baseline is staged; the initial commit awaits the user's repository-local commit identity. Finish that checkpoint before feature work. No sudo, metadata deletion/overwrite, or permission change without approval.
- The room-only v0.3 direction is approved. No further design approval is required for its local implementation.
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

Fresh local Git initialization is now approved. Complete the baseline commit once the user's name/email are supplied, then implement the approved room-only scope. Publishing and changes to vanDijkFit remain outside this authorization.

## Later ideas — outside v0.3

- Persistent settings and tasks.
- Real AI/task integrations with explicit permission, execution evidence, and distinct simulation/real modes.
- Additional rooms and character customization.
