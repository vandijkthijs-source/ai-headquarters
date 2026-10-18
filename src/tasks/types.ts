import type { AgentId } from '../characters/characters'

export type AgentState = 'idle' | 'coding' | 'reviewing' | 'done'
export type Priority = 'high' | 'medium' | 'low'

export type Task = {
  id: string
  title: string
  owner: AgentId
  priority: Priority
  progress: number
  state: AgentState
}

export function stateLabel(state: AgentState) {
  if (state === 'coding') return 'Coding'
  if (state === 'reviewing') return 'Reviewing'
  if (state === 'done') return 'Done'
  return 'Queued'
}

