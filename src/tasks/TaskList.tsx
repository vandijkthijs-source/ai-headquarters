import { labelOf } from '../characters/characters'
import type { AgentId } from '../characters/characters'
import { stateLabel } from './types'
import type { Task } from './types'

type Props = {
  tasks: Task[]
  onSelect: (owner: AgentId) => void
}

export default function TaskList({ tasks, onSelect }: Props) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}>
          <button onClick={() => onSelect(task.owner)}>
            <span>
              {task.title}
              <small>{labelOf(task.owner)} · {stateLabel(task.state)}</small>
            </span>
            <strong>{task.progress}%</strong>
          </button>
        </li>
      ))}
    </ul>
  )
}
