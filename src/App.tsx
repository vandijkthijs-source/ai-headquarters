import { useState } from 'react'
import './App.css'
import { agents } from './characters/characters'
import type { AgentId } from './characters/characters'
import RoomScene from './components/RoomScene'
import AgentDetailsDialog from './tasks/AgentDetailsDialog'
import TaskBoardDialog from './tasks/TaskBoardDialog'
import { useTaskSimulation } from './tasks/useTaskSimulation'
import OfficeGuide from './ui/OfficeGuide'
import RoomDialog from './ui/RoomDialog'

function App() {
  const [overlay, setOverlay] = useState<'agent' | 'board' | 'help' | null>(null)
  const [selected, setSelected] = useState<AgentId>('nyx')
  const [running, setRunning] = useState(true)
  const simulation = useTaskSimulation(running)
  const { tasks } = simulation
  const selectedAgent = agents.find(agent => agent.id === selected)!
  const selectedTask = tasks.find(task => task.owner === selected && task.state !== 'done')
    ?? tasks.find(task => task.owner === selected)
  const coding = agents.filter(agent => tasks.some(task => task.owner === agent.id && task.state === 'coding'))
    .map(agent => agent.id)

  function selectAgent(id: AgentId) {
    setSelected(id)
    setOverlay('agent')
  }

  function addTask() {
    const owner = simulation.addTask()
    if (owner) setSelected(owner)
  }

  const title = overlay === 'agent' ? selectedAgent.name
    : overlay === 'board' ? 'The task board' : 'Welcome to the little office'

  return (
    <RoomScene
      agents={agents}
      selected={selected}
      running={running}
      coding={coding}
      onSelect={id => selectAgent(id as AgentId)}
      onBoard={() => setOverlay('board')}
      onHelp={() => setOverlay('help')}
      onToggle={() => setRunning(value => !value)}
      onRoomChange={() => setOverlay(null)}
    >
      {overlay && (
        <RoomDialog title={title} onClose={() => setOverlay(null)}>
          {overlay === 'agent' && (
            <AgentDetailsDialog agent={selectedAgent} task={selectedTask} onRequest={() => {
              simulation.setDraftOwner(selected)
              setOverlay('board')
            }} />
          )}
          {overlay === 'board' && (
            <TaskBoardDialog simulation={simulation} onAddTask={addTask} onSelect={selectAgent} />
          )}
          {overlay === 'help' && <OfficeGuide />}
        </RoomDialog>
      )}
    </RoomScene>
  )
}

export default App
