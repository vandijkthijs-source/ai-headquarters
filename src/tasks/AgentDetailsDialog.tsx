import type { Agent } from '../characters/characters'
import { stateLabel } from './types'
import type { Task } from './types'

type Props = {
  agent: Agent
  task?: Task
  onRequest: () => void
}

export default function AgentDetailsDialog({ agent, task, onRequest }: Props) {
  return (
    <>
      <span className="role-pill">{agent.role}</span>
      <p>{agent.vibe}</p>
      <div className="status-box">
        <span>Simulated task · {task ? stateLabel(task.state) : 'Idle'}</span>
        <strong>{task?.title ?? 'Waiting for a request'}</strong>
        <div className="progress-row">
          <span>Progress</span><strong>{task?.progress ?? 0}%</strong>
        </div>
        <progress max="100" value={task?.progress ?? 0} aria-label="Simulated task progress" />
      </div>
      <p className="interaction-hint">Selected. Close this note and click a desk to send {agent.name} there.</p>
      <button className="primary-button" onClick={onRequest}>Give {agent.name} a request</button>
    </>
  )
}
