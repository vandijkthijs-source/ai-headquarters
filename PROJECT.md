# AI Headquarters

## Vision and current release

AI Headquarters v0.3 is a playful, interactive miniature office using vanDijkFit's verified slate/blue design language. The room itself is the complete surface: no exterior dashboard, sidebar, or persistent task panels. Pixel-art Kairo, Nyx, and Rune walk between desks, and object interactions reveal contextual controls. All activity is explicitly local simulation.

The user approved the room-only scope and a fresh, separate local Git repository on 2026-10-18. The repository uses the same observed commit identity as vandijkthijs-source, configured locally. No remote, push, merge, deployment, or vanDijkFit modification is authorized.

## Current architecture — v0.3

| Area | Implementation |
| --- | --- |
| App wiring | src/App.tsx connects features and owns selection, pause, and active overlay; it is 67 lines after the small-file refactor |
| Task state | tasks/useTaskSimulation.ts owns task progress/completions, request drafts, assignment, and activity; requests have UUIDs; types/fixtures have their own modules |
| Room UI | rooms/RoomScene.tsx owns room state and assembles RoomShell, RoomDecor, RoomFooter, individual objects, and the character layer in the existing SVG drawing order |
| Characters | characters/characters.ts defines names/roles/colors; PixelCharacter.tsx draws a 16×24 pixel grid in 2× SVG rectangles; CharacterLayer.tsx handles depth, placement, and selection |
| Movement | hooks/officeMotion.ts contains pure waypoint steps, station swaps, and autonomous rotation; useOfficeMotion.ts provides a cleaned-up 50ms timer and reads reduced-motion preference |
| Room navigation | In-scene doors switch Engineering, UI Lab, and QA Room; task and movement state survives room switches; all rooms share a floor plan with different names, equipment, and station labels |
| Window movement | useRoomDrag.ts handles captured mouse/touch pointers, keyboard arrows, Home/reset, viewport clamping, and resize cleanup |
| Contextual controls | ui/RoomDialog.tsx retains the shared native modal shell and focus lifecycle; tasks/AgentDetailsDialog.tsx and TaskBoardDialog.tsx supply view contents; ui/OfficeGuide.tsx provides instructions |
| Design | styles/tokens.css owns shared values. App.css/index.css import the focused base/room/sign/character/dialog/task stylesheets |
| Checks | npm test: movement invariants; npm run lint; npm run build; browser checks recorded in DEVLOG.md |

Object map: teammates open details/select; desks request movement; doors change rooms; task board opens request/assignment/activity; wall switch pauses/resumes; wall equipment toggles servers/design preview/simulated QA results; nameplate drags; center icon resets; floor '?' opens the guide. Simulation signage remains visible.

Progress continues as local simulation independent of movement. Characters only type when stationary, running, and assigned a coding task. Animation never represents actual AI execution. State is in memory and resets on reload; there is no backend or real AI/GitHub integration.

## Editing map — small files

Use one main responsibility per file, usually 40–120 readable lines. Small fixtures/helpers can be shorter. The range is a guide, not a reason to split cohesive code or compress JSX/CSS. Import files directly; no extra state library or dependency is needed.

| To change… | Edit… |
| --- | --- |
| Application wiring or which note opens | src/App.tsx |
| Character names, roles, colors | src/characters/characters.ts |
| Pixel artwork | src/characters/PixelCharacter.tsx |
| Character placement, selection marker, depth sorting | src/characters/CharacterLayer.tsx |
| Room names, station labels, accent and equipment metadata | src/rooms/rooms.ts |
| Room composition and interaction coordination | src/rooms/RoomScene.tsx |
| Walls, floor, night window | src/rooms/RoomShell.tsx |
| Plants, rug, furniture | src/rooms/RoomDecor.tsx and objects/Plant.tsx |
| Desk/door/board/equipment/nameplate/pause artwork | Corresponding named component in src/rooms/objects |
| Guide button and simulation signage | src/rooms/RoomFooter.tsx |
| Progress, completion, request draft, activity behavior | src/tasks/useTaskSimulation.ts |
| Task types, state labels, initial demo tasks | src/tasks/types.ts and starterTasks.ts |
| Request form, task list, office notes | src/tasks/TaskComposer.tsx, TaskList.tsx, ActivityFeed.tsx |
| Agent/task-board view composition | src/tasks/AgentDetailsDialog.tsx and TaskBoardDialog.tsx |
| Modal behavior, accessible SVG clicks, guide text | src/ui/RoomDialog.tsx, ObjectButton.tsx, OfficeGuide.tsx |
| Walking rules or window dragging | src/hooks/officeMotion.ts, useOfficeMotion.ts, useRoomDrag.ts |
| Shared palette, spacing, radii, timing | src/styles/tokens.css |
| Page/reset/accessibility styles | src/styles/base.css |
| Room layout and object focus/hover | src/styles/room.css |
| Room labels and signs | src/styles/room-signs.css |
| Character names and pixel/monitor animations | src/styles/characters.css |
| Contextual panel layout and guide styles | src/styles/dialogs.css |
| Task status/progress, composer, list/activity styles | src/styles/tasks.css, task-composer.css, task-list.css |

Keep task state in its hook, movement in its hook, and shared native modal state in the existing shell. Extract visual objects without changing SVG order. Keep the narrow-screen and reduced-motion rules with their relevant styles. App.css and index.css are style import manifests, not places to accumulate new rules.

## Historical v0.2 baseline — inspected 2026-10-18

At initial inspection README-INSTALL.txt described v0.2, package.json declared 0.0.0, and README.md was the Vite starter text. These files now describe v0.3. The following paragraphs record the pre-v0.3 baseline, not current behavior.

The active app is a centered office window with three desks and selectable characters:

| Character | Role | Station |
| --- | --- | --- |
| Kairo | Lead Engineer | Systems |
| Nyx | UI Hacker | UI Lab |
| Rune | Test Runner | QA Ops |

Existing controls select a character, add a local task with an owner, and pause/resume simulation. The side panel shows task status, progress, and up to five activity messages. Characters are rounded CSS shapes at fixed positions, with arm, code-line, and typing-dot animations. They are not true pixel-art sprites and do not walk. The window is responsive but not draggable; there is one room.

## Historical v0.2 architecture

| Area | Current implementation |
| --- | --- |
| Runtime | React 19, React DOM, TypeScript 6, Vite 8; npm lockfile |
| Entry | index.html → src/main.tsx → src/App.tsx; React StrictMode |
| UI and data | App.tsx owns agent/task types, fixture data, state, effects, Desk, and label helpers |
| State | React useState/useMemo/useEffect; selected agent, running flag, tasks, draft owner/title, activity |
| Simulation | 2.4-second interval randomly advances unfinished tasks; progress determines coding/reviewing/done |
| Styling | App.css contains scene, controls, character shapes, keyframes, and 1020px/720px breakpoints; index.css contains base styles |
| Assets | src/assets and public; current character visuals are CSS, not imported sprites |
| Validation | npm run build: tsc -b and vite build; npm run lint: eslint . |

The baseline had no backend, AI provider, GitHub integration, routing library, persistence, or automated test script. Its "Live coding" wording was identified as overstating local simulation and has been replaced in v0.3. Backend/integration/persistence remain outside the current release; a movement test script is now available.

Historical source and HTML snapshots live in src.before-ai-hq, src.before-compact-v2, and matching index.before-* files. They are not the active Vite entry and must be preserved.

## Decisions and constraints

- Preserve the current React/TypeScript/Vite stack and existing interactions.
- v0.3 implementation is now approved; preserve task interactions through the room-only object interface.
- Use focused local Git checkpoints; preserve historical snapshots and working task behavior. The approved room-only UI supersedes the old surrounding dashboard.
- Keep simulation independent of presentation and any future real execution integration.
- No push, merge, deployment, or vanDijkFit modification without explicit permission.
- vanDijkFit is the primary design reference, inspected read-only on 2026-10-18 as detailed below. Keep AI Headquarters a separate project; no shared repository or dependency on its runtime.

## Implemented technical direction

Small React components, SVG pixel art, and CSS implement the office without a game engine or new runtime dependencies. Room-local aisle waypoints separate movement from task progress. Pointer/keyboard dragging stays bounded; tasks, selection, and room equipment state survive room switches. Historical references below remain design provenance; actual current behavior is described above.

## Baseline limitations

Build and lint pass; original lint errors and completion deduplication were fixed before v0.3. Fresh local Git checkpoints are available; the baseline is 5f19d70. See DEVLOG.md for later checkpoints and validation.

Room layouts intentionally share a floor plan; three different pieces of interactive equipment and station themes distinguish them. Narrow layouts scale the scene to fit; character labels and small signs are correspondingly small. Core interactions have keyboard access and a contextual guide. There is no persistence or real AI execution.

## Primary design reference — inspected 2026-10-18

Repository: [vandijkthijs-source/vanDijkFit](https://github.com/vandijkthijs-source/vanDijkFit).
Inspected main at commit `de078380400ca76c15fcdbb65777c3a4a1ea76ec`. GitHub connector metadata and public GitHub HTTP GETs were used read-only. Selected source/assets were downloaded under /tmp for inspection; no vanDijkFit checkout was created, modified, committed, pushed, or deployed. No vanDijkFit code or asset was added to AI Headquarters.

The source is React Native 0.81 / Expo 54 with Expo Router, React 19, and Zustand. app.json uses the display name **vDstrong** and slug **vanDijkFit**. The observations below describe source and inspected assets, not a running mobile app or device screenshot.

### Verified design language

| Area | Actual evidence | Source at inspected commit |
| --- | --- | --- |
| Themes | Named dark/light semantic palettes; useThemeColors selects from store.darkMode; store initializes darkMode=true | [theme.ts](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/constants/theme.ts), [store](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/store/useAppStore.ts) |
| Surfaces | Solid slate layers, 1-unit borders, rounded cards; overview surfaces radius 24; exercise cards radius 18 with 14 padding | [OverviewCardWrapper](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/overview/OverviewCardWrapper.tsx), [ExerciseCard](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/workout/ExerciseCard.tsx) |
| Type | Native Text with no custom font family in inspected screens; Fonts.rounded/mono are undefined. Overview title 28/700, line height 32; card labels 17/800; exercise headings 18/700; supporting text often 13; tab labels 11/700; numeric metrics use tabular-nums | [Overview](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/app/%28tabs%29/today.tsx), [Creatine card](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/overview/cards/CreatineOverviewCard.tsx) |
| Controls | Blue primary buttons, white 16/700 labels, 14 vertical/16 horizontal padding, radius 18; inputs have 1-unit borders, radius 18, 14 horizontal/12 vertical padding and 16-unit text | [AppButton](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/ui/AppButton.tsx), [AppInput](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/ui/AppInput.tsx) |
| Layout | Overview padding/gap 18, top padding 24; nested gaps 4/8/12/14. Spacing is component-local, not a centralized spacing scale | Overview and ExerciseCard above |
| Navigation | Overview, Workout, History, Body Map; persistent bottom tabs with Ionicons outline glyphs, blue active and subdued inactive states, dark panelStrong bar and top border; minimized-workout resume strip | [Tabs layout](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/app/%28tabs%29/_layout.tsx) |
| Feedback/motion | Press opacity .96, disabled opacity .45, Android ripple and restrained white press glow; iOS light tab haptics; card reorder 170ms, swipe removal 140ms, spring snap-back; workout minimize 340ms with cubic in-out easing | AppButton, OverviewCardWrapper; [root layout](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/app/_layout.tsx), [HapticTab](https://github.com/vandijkthijs-source/vanDijkFit/blob/de078380400ca76c15fcdbb65777c3a4a1ea76ec/components/haptic-tab.tsx) |
| Metrics | Strong numeric hierarchy, muted explanatory labels, blue fill on dark progress tracks, accentSoft selected chips with accent borders | Creatine card above |

### Verified color values

Values below come from constants/theme.ts. Native numeric sizes elsewhere are layout units; mapping them to CSS px is an adaptation, not guaranteed device equivalence.

| Semantic name | Dark | Light |
| --- | --- | --- |
| background | #20262e | #F7F8FA |
| backgroundAlt | #262e37 | #EEF3F7 |
| panel | #2c3540 | #FFFFFF |
| panelMuted | #364150 | #E8EEF5 |
| panelStrong | #1b222a | #FFFFFF |
| border | #3b4654 | #E1E6EE |
| text | #f5f7fb | #1D2433 |
| textMuted | #aeb9c8 | #687386 |
| textSoft | #7f8c9c | #9AA3AF |
| accent | #4da4ff | #1F8FFF |
| accentSoft | #243d56 | #E5F1FF |
| success | #77d19b | #20A86B |
| danger | #ff6f7d | #E8314A |
| warning | #ffc76c | #F59E0B |
| input | #404b58 | #F1F5F9 |
| white | #ffffff | #ffffff |
| ripple | rgba(255,255,255,0.18) | rgba(31,143,255,0.14) |

### Visual assets and caveats

- Visually inspected assets/images/icon.png: blue VD monogram with purple barbell forms on a near-black rounded square, white outer area, and thin red outlines in the file. This is branding evidence; the red outlines are not a theme danger/brand token.
- Visually inspected assets/body-map/front-man.png: outlined anatomical figure. The tree also includes back-man.png, adaptive Android icons, splash/icon variants, and starter React logo assets. Presence does not establish all are used.
- app.json points to icon.png, Android foreground art, and splash-icon.png. Body Map source references the anatomical imagery and overlays. No office sprites were found in the listed asset tree.
- Logo purple is a secondary asset color; the inspected interface palette uses blue for primary actions. Do not infer a purple gradient interface from the logo.
- Theme usage is not perfectly uniform: AppText has a hard-coded default color, HapticTab imports the static dark colors alias, and compatibility Colors.light.tint uses that alias. Follow the dynamic semantic palette used by core screens rather than copying these inconsistencies.

### Adaptation principles for AI Headquarters

- Carry slate panels, blue selected/actions, thin borders, 18/24 radii, native-style sans typography, and clear metric hierarchy into the window chrome, request composer, activity panels, and room navigation.
- Keep Kairo, Nyx, Rune, their distinguishing character accents, walking, typing, and playful room contents. Pixel art stays on its own integer grid with crisp rendering; panel radii do not round sprite pixels.
- Use physical labeled doors for room navigation, per the superseding room-only scope. Blue action cues carry the reference hierarchy without importing mobile routing or workout features.
- Use brief state transitions and subtle press feedback for controls; keep sprite frame timing separate from smooth window movement. Support reduced motion and keyboard interaction as web-specific requirements.
- Design around the existing compact window; preserve all current controls and state. Distinguish simulated status from real execution throughout.
- Evaluate text/control contrast in the web context rather than assuming every source color pairing is accessible unchanged.

## Shared design tokens — implemented foundation

Shared means consistent across AI Headquarters components and rooms. No shared package or edits in vanDijkFit are proposed. `src/styles/tokens.css` is the single local source of truth, imported once by App.css. CSS custom properties style the rooms and dialogs. Movement speed and simulation ticks remain behavior constants in their respective modules; sprite/monitor animation timing uses tokens.

| Family | Proposed tokens/defaults | Provenance |
| --- | --- | --- |
| Colors | `--hq-color-*` with semantic names/values from the complete table above; dark defaults, light overrides under `[data-theme="light"]` | Exact reference palette; light-mode UI/toggle remains outside current v0.3 scope |
| Spacing | `--hq-space-1` through `--hq-space-8`: 4, 8, 12, 14, 16, 18, 24, 32px | Proposed shared scale derived from observed sizes; no upstream spacing-token object exists |
| Panels | `--hq-radius-sm/md/lg/pill`: 12/18/24/999px; `--hq-border-width`: 1px; semantic surface/border aliases | Radii exact from theme; panel roles adapted for office |
| Typography | System sans stack; title 28px/700/32px, card title 18px/700, metric label 17px/800, body 16px, caption 13px, micro label 11px/700; tabular numeric metrics | Observed hierarchy; web stack and role mapping are proposed |
| Control feedback | `--hq-pressed-opacity`: .96; `--hq-disabled-opacity`: .45; semantic focus-ring and press-glow tokens | Opacities observed; keyboard focus treatment is a web addition |
| Motion | `--hq-motion-fast`: 140ms; `--hq-motion-reorder`: 170ms; `--hq-motion-window`: 340ms; `--hq-ease-window`: cubic-bezier(.65,0,.35,1) | Durations observed; CSS cubic-bezier is a proposed approximation of native cubic in-out |
| Pixel office | `--hq-sprite-scale`, `--hq-sprite-frame-duration`, `--hq-room-tile-size`, `--hq-character-kairo/nyx/rune` | Office-specific proposed tokens; tune during approved sprite/movement work, not claimed as vanDijkFit values |

Tokens were introduced in a foundation checkpoint, then consumed by the room UI. Reduced motion and simulation pause are independent. The 2.4-second task tick is application behavior, not a visual animation token. Token names in the contract are design roles; exact implemented declarations are in src/styles/tokens.css. Sprite geometry uses a fixed 2× internal grid rather than a CSS scale token. A theme toggle is not included; only dark mode is exposed.
