import type { AgentId } from '../characters/characters'
import type { useTaskSimulation } from './useTaskSimulation'
import ActivityFeed from './ActivityFeed'
import TaskComposer from './TaskComposer'
import TaskList from './TaskList'

type Props = {
  simulation: ReturnType<typeof useTaskSimulation>
  onAddTask: () => void
  onSelect: (owner: AgentId) => void
}

// Dialog contents share App's RoomDialog shell so switching views keeps focus behavior.
export default function TaskBoardDialog({ simulation, onAddTask, onSelect }: Props) {
  const { tasks, activity, draft, setDraft, draftOwner, setDraftOwner } = simulation
  return (
    <>
      <TaskComposer
        draft={draft}
        owner={draftOwner}
        onDraftChange={setDraft}
        onOwnerChange={setDraftOwner}
        onSubmit={onAddTask}
      />
      <h3>On the board <span>{tasks.filter(task => task.state === 'done').length}/{tasks.length} done</span></h3>
      <TaskList tasks={tasks} onSelect={onSelect} />
      <h3>Office notes</h3>
      <ActivityFeed activity={activity} />
    </>
  )
}
