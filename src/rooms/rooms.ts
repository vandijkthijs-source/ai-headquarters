export const rooms = [
  { name: 'Engineering', label: 'BUILD SOMETHING GOOD', desks: ['SYSTEMS', 'WORKBENCH', 'REVIEW'], detail: 'Server rack', action: 'Toggle server lights', color: 'var(--hq-color-accent)' },
  { name: 'UI Lab', label: 'SMALL DETAILS. BIG DIFFERENCE.', desks: ['LAYOUT', 'INTERACTION', 'POLISH'], detail: 'Design wall', action: 'Change design preview', color: 'var(--hq-character-rune)' },
  { name: 'QA Room', label: 'MAKE IT WORK. EVERY TIME.', desks: ['TESTS', 'EDGE CASES', 'CHECKPOINT'], detail: 'Test console', action: 'Run a simulated check', color: 'var(--hq-color-success)' },
]

export type RoomDefinition = (typeof rooms)[number]
