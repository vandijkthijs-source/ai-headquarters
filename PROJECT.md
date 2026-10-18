# AI Headquarters

## Vision

An interactive miniature office that makes a team of characters feel present while keeping simulated behavior clearly distinct from real AI execution. The next proposed release, v0.3, adds true pixel-art characters, movement, richer coding animations, a draggable compact window, and interactive mini-rooms. Styling should take inspiration from vanDijkFit without modifying that project.

Latest approved direction (2026-10-18): build v0.3 as rooms only, with no surrounding dashboard or persistent sidebar. Characters, desks, doors, a wall task board, and a pause control provide the interaction surface. Task details/composer/activity appear contextually within the room. This supersedes earlier proposed exterior panels and room-tab navigation. Fresh local Git initialization is approved; the baseline commit awaits the user's commit identity.

## Inspected baseline — 2026-10-18

README-INSTALL.txt describes the current application as v0.2 compact widget. package.json still declares 0.0.0; this is a metadata discrepancy, not evidence of a released v0.3. README.md remains the Vite starter documentation.

The active app is a centered office window with three desks and selectable characters:

| Character | Role | Station |
| --- | --- | --- |
| Kairo | Lead Engineer | Systems |
| Nyx | UI Hacker | UI Lab |
| Rune | Test Runner | QA Ops |

Existing controls select a character, add a local task with an owner, and pause/resume simulation. The side panel shows task status, progress, and up to five activity messages. Characters are rounded CSS shapes at fixed positions, with arm, code-line, and typing-dot animations. They are not true pixel-art sprites and do not walk. The window is responsive but not draggable; there is one room.

## Architecture

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

There is no backend, AI provider, GitHub integration, routing library, persistence, or automated test script configured. State resets on reload. Monitor text and completion messages are decorative/simulated, not execution evidence. The current "Live coding" wording overstates this and should be corrected in the approved release.

Historical source and HTML snapshots live in src.before-ai-hq, src.before-compact-v2, and matching index.before-* files. They are not the active Vite entry and must be preserved.

## Decisions and constraints

- Preserve the current React/TypeScript/Vite stack and existing interactions.
- Keep this phase documentation-only; no application, dependency, configuration, or release-version changes.
- Use incremental implementation after plan approval; no dashboard replacement.
- Keep simulation independent of presentation and any future real execution integration.
- No push, merge, deployment, or vanDijkFit modification without explicit permission.
- vanDijkFit is the primary design reference, inspected read-only on 2026-10-18 as detailed below. Keep AI Headquarters a separate project; no shared repository or dependency on its runtime.

## Proposed technical direction (not yet approved)

Use small React components and CSS for the office, with locally stored pixel sprites or code-native pixel art on an integer grid. Keep sprite animation separate from movement transforms. Use room-local waypoints and a small movement state machine rather than a game engine initially. Add pointer-driven title-bar dragging with viewport bounds and keyboard/reset controls. Retain task/selection state across room switches. See ROADMAP.md for sequence and acceptance criteria.

## Baseline limitations

Build and lint now pass following the separately authorized lint fixes. Task progress and completion messages update together in the simulation timer, reporting each newly completed task once. Character animation still follows the global running flag rather than actual task state. Input/select labels and reduced-motion behavior need review. These are inspection findings, not browser-tested defects.

The current environment has no .git directory and is not recognized as a Git repository; the earlier restricted environment showed an empty protected directory. No history or checkpoint could be verified or created. Choose recovery of existing history or approve fresh local initialization before implementation; do not delete metadata, use sudo, or change permissions without approval.

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

### Adaptation principles for AI Headquarters (proposed)

- Carry slate panels, blue selected/actions, thin borders, 18/24 radii, native-style sans typography, and clear metric hierarchy into the window chrome, request composer, activity panels, and room navigation.
- Keep Kairo, Nyx, Rune, their distinguishing character accents, walking, typing, and playful room contents. Pixel art stays on its own integer grid with crisp rendering; panel radii do not round sprite pixels.
- Use labeled compact room tabs with clear blue active states, borrowing the navigation hierarchy without importing mobile routing or workout features.
- Use brief state transitions and subtle press feedback for controls; keep sprite frame timing separate from smooth window movement. Support reduced motion and keyboard interaction as web-specific requirements.
- Design around the existing compact window; preserve all current controls and state. Distinguish simulated status from real execution throughout.
- Evaluate text/control contrast in the web context rather than assuming every source color pairing is accessible unchanged.

## Shared design-token contract — proposed, not implemented

Shared means consistent across AI Headquarters components and rooms. No shared package or edits in vanDijkFit are proposed. After Git setup and explicit redesign approval, create a single local `src/styles/tokens.css` source of truth, imported once; use CSS custom properties for component styling. React reads shared CSS motion values only when JavaScript needs them, avoiding duplicate numeric constants.

| Family | Proposed tokens/defaults | Provenance |
| --- | --- | --- |
| Colors | `--hq-color-*` with semantic names/values from the complete table above; dark defaults, light overrides under `[data-theme="light"]` | Exact reference palette; light-mode UI/toggle remains outside current v0.3 scope |
| Spacing | `--hq-space-1` through `--hq-space-8`: 4, 8, 12, 14, 16, 18, 24, 32px | Proposed shared scale derived from observed sizes; no upstream spacing-token object exists |
| Panels | `--hq-radius-sm/md/lg/pill`: 12/18/24/999px; `--hq-border-width`: 1px; semantic surface/border aliases | Radii exact from theme; panel roles adapted for office |
| Typography | System sans stack; title 28px/700/32px, card title 18px/700, metric label 17px/800, body 16px, caption 13px, micro label 11px/700; tabular numeric metrics | Observed hierarchy; web stack and role mapping are proposed |
| Control feedback | `--hq-pressed-opacity`: .96; `--hq-disabled-opacity`: .45; semantic focus-ring and press-glow tokens | Opacities observed; keyboard focus treatment is a web addition |
| Motion | `--hq-motion-fast`: 140ms; `--hq-motion-reorder`: 170ms; `--hq-motion-window`: 340ms; `--hq-ease-window`: cubic-bezier(.65,0,.35,1) | Durations observed; CSS cubic-bezier is a proposed approximation of native cubic in-out |
| Pixel office | `--hq-sprite-scale`, `--hq-sprite-frame-duration`, `--hq-room-tile-size`, `--hq-character-kairo/nyx/rune` | Office-specific proposed tokens; tune during approved sprite/movement work, not claimed as vanDijkFit values |

Introduce tokens first without restyling existing components, then apply them in reviewed slices. Centralize UI transition timings; honor reduced motion and simulation pause independently. The 2.4-second simulated task tick is application behavior, not a visual animation token. No token file or redesign code is introduced in this documentation phase.
