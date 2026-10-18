# AI Headquarters v0.3

A little interactive pixel-art office inspired by vanDijkFit. All agent activity is a local simulation; the office makes no AI calls or repository changes.

```bash
npm install
npm run dev
```

Open the Local URL shown in the terminal (usually http://localhost:5173).

- Click **Kairo, Nyx, or Rune** to select a teammate and inspect their task.
- Click a **desk** to send that teammate there. Characters also visit desks on their own.
- Click a **door** to visit Engineering, UI Lab, or QA Room.
- Click the **task board** to add/assign requests and read activity.
- Click the **wall switch** to pause or resume.
- Drag the **room nameplate** to move the office; arrow keys work when focused. Home or the center icon resets it.
- Click **?** for the guide. Tab and Enter/Space operate room objects; Escape closes notes.

```bash
npm test
npm run lint
npm run build
```

Project decisions: [PROJECT.md](PROJECT.md). Planned work: [ROADMAP.md](ROADMAP.md). Changes and verification: [DEVLOG.md](DEVLOG.md). Agent rules: [AGENTS.md](AGENTS.md).

vanDijkFit is a read-only design reference. AI Headquarters stays in its own repository. Publishing requires explicit permission.
