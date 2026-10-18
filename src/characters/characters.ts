export type AgentId = 'kairo' | 'nyx' | 'rune'
export type Agent = {
  id: AgentId
  name: string
  role: string
  vibe: string
  color: string
}

export const agents: Agent[] = [
  {
    id: 'kairo',
    name: 'Kairo',
    role: 'Lead Engineer',
    vibe: 'Refactors flows and turns ideas into safe build plans.',
    color: 'var(--hq-character-kairo)',
  },
  {
    id: 'nyx',
    name: 'Nyx',
    role: 'UI Hacker',
    vibe: 'Shapes screens, interactions, and the polished feel.',
    color: 'var(--hq-character-nyx)',
  },
  {
    id: 'rune',
    name: 'Rune',
    role: 'Test Runner',
    vibe: 'Checks edge cases, flows, and catches weird regressions.',
    color: 'var(--hq-character-rune)',
  },
]


export function labelOf(id: AgentId) {
  return agents.find(agent => agent.id === id)?.name ?? id
}
