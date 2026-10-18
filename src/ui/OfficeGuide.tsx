export default function OfficeGuide() {
  return (
    <>
      <p>A tiny office for big ideas. Everything here is a local simulation.</p>
      <ul className="office-guide">
        <li><strong>Teammates</strong> — click Kairo, Nyx, or Rune to select them and see their task.</li>
        <li><strong>Desks</strong> — send your selected teammate to another workstation.</li>
        <li><strong>Doors</strong> — visit Engineering, UI Lab, and QA Room.</li>
        <li><strong>Task board</strong> — add requests, assign owners, and read office notes.</li>
        <li><strong>Wall switch</strong> — pause or resume tasks, walking, and typing.</li>
        <li><strong>Room nameplate</strong> — drag the office; use arrow keys when focused. Home or the center icon resets it.</li>
      </ul>
      <p className="interaction-hint">You can also Tab between objects and use Enter or Space. Escape closes these notes. Nothing here makes real AI calls or changes your repositories.</p>
    </>
  )
}
