import type { AgentId } from '../characters/characters'
import { agents } from '../characters/characters'

type Props = {
  draft: string
  owner: AgentId
  onDraftChange: (draft: string) => void
  onOwnerChange: (owner: AgentId) => void
  onSubmit: () => void
}

export default function TaskComposer({ draft, owner, onDraftChange, onOwnerChange, onSubmit }: Props) {
  return (
    <form className="task-composer" onSubmit={event => {
      event.preventDefault()
      onSubmit()
    }}>
      <label htmlFor="request">A small request</label>
      <input
        id="request"
        value={draft}
        onChange={event => onDraftChange(event.target.value)}
        placeholder="What should the team explore?"
        maxLength={180}
      />
      <div className="composer-row">
        <label htmlFor="owner" className="sr-only">Assign request to</label>
        <select id="owner" value={owner} onChange={event => onOwnerChange(event.target.value as AgentId)}>
          {agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
        </select>
        <button className="primary-button" type="submit" disabled={!draft.trim()}>Add request</button>
      </div>
    </form>
  )
}
