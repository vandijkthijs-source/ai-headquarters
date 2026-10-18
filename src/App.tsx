import { useEffect, useMemo, useState } from 'react'
import './App.css'
import RoomScene from './components/RoomScene'
import RoomDialog from './components/RoomDialog'

type AgentId = 'kairo' | 'nyx' | 'rune'
type AgentState = 'idle' | 'coding' | 'reviewing' | 'done'
type Priority = 'high' | 'medium' | 'low'

type Agent = {
  id: AgentId
  name: string
  role: string
  vibe: string
  color: string
}

type Task = {
  id: string
  title: string
  owner: AgentId
  priority: Priority
  progress: number
  state: AgentState
}

const agents: Agent[] = [
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

const starterTasks: Task[] = [
  { id: 't1', title: 'Polish training overview cards', owner: 'nyx', priority: 'high', progress: 24, state: 'coding' },
  { id: 't2', title: 'Plan streak widget update', owner: 'kairo', priority: 'medium', progress: 12, state: 'reviewing' },
  { id: 't3', title: 'Check onboarding flow labels', owner: 'rune', priority: 'low', progress: 61, state: 'coding' },
]

const clock = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

function App() {
  const [overlay, setOverlay] = useState<'agent' | 'board' | 'help' | null>(null)
  const [selected, setSelected] = useState<AgentId>('nyx')
  const [running, setRunning] = useState(true)
  const [draft, setDraft] = useState('Improve the workout history screen')
  const [draftOwner, setDraftOwner] = useState<AgentId>('nyx')
  const [{ tasks, activity }, setSimulation] = useState(() => ({
    tasks: starterTasks,
    activity: [
      `${clock()} · Office simulation started. Click a teammate or the task board.`,
      `${clock()} · Demo only. No AI calls, repository edits, or real tests are run.`,
    ],
  }))

  const selectedAgent = agents.find((agent) => agent.id === selected)!
  const selectedTask = useMemo(
    () => tasks.find((task) => task.owner === selected && task.state !== 'done') ?? tasks.find((task) => task.owner === selected),
    [tasks, selected],
  )

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      const timestamp = clock()
      const bumps = tasks.map((task) => ({ id: task.id, value: Math.round(6 + Math.random() * 10) }))
      setSimulation((current) => {
        const messages: string[] = []
        const nextTasks = current.tasks.map((task) => {
          if (task.state === 'done') return task

          const bump = bumps.find((item) => item.id === task.id)?.value ?? 0
          const nextProgress = Math.min(100, task.progress + bump)

          let nextState: AgentState
          if (nextProgress >= 100) nextState = 'done'
          else if (nextProgress > 68) nextState = 'reviewing'
          else nextState = 'coding'

          if (nextState === 'done') {
            messages.push(`${timestamp} · ${labelOf(task.owner)} completed simulated task “${task.title}”.`)
          }

          return { ...task, progress: nextProgress, state: nextState }
        })
        return {
          tasks: nextTasks,
          activity: messages.length ? [...messages, ...current.activity].slice(0, 5) : current.activity,
        }
      })
    }, 2400)

    return () => window.clearInterval(timer)
  }, [running, tasks])
  function addTask() {
    const title = draft.trim()
    if (!title) return
    const id = crypto.randomUUID()
    const message = `${clock()} · Simulation request added: “${title}”.`
    setSimulation((current) => ({
      tasks: [{
        id,
        title,
        owner: draftOwner,
        priority: 'medium',
        progress: 0,
        state: 'idle',
      }, ...current.tasks],
      activity: [message, ...current.activity].slice(0, 5),
    }))
    setSelected(draftOwner)
    setDraft('')
  }

  return (
    <RoomScene agents={agents} selected={selected} running={running}
      coding={agents.filter(agent => tasks.some(task => task.owner === agent.id && task.state === 'coding')).map(agent => agent.id)}
      onSelect={id => { setSelected(id as AgentId); setOverlay('agent') }}
      onBoard={() => setOverlay('board')} onHelp={() => setOverlay('help')}
      onToggle={() => setRunning(value => !value)} onRoomChange={() => setOverlay(null)}>
      {overlay && <RoomDialog title={overlay === 'agent' ? selectedAgent.name : overlay === 'board' ? 'The task board' : 'Welcome to the little office'} onClose={() => setOverlay(null)}>
        {overlay === 'agent' && <>
          <span className="role-pill">{selectedAgent.role}</span>
          <p>{selectedAgent.vibe}</p>
          <div className="status-box">
            <span>Simulated task · {selectedTask ? stateLabel(selectedTask.state) : 'Idle'}</span>
            <strong>{selectedTask?.title ?? 'Waiting for a request'}</strong>
            <div className="progress-row"><span>Progress</span><strong>{selectedTask?.progress ?? 0}%</strong></div>
            <progress max="100" value={selectedTask?.progress ?? 0} aria-label="Simulated task progress" />
          </div>
          <p className="interaction-hint">Selected. Close this note and click a desk to send {selectedAgent.name} there.</p>
          <button className="primary-button" onClick={() => { setDraftOwner(selected); setOverlay('board') }}>Give {selectedAgent.name} a request</button>
        </>}
        {overlay === 'board' && <>
          <form className="task-composer" onSubmit={event => { event.preventDefault(); addTask() }}>
            <label htmlFor="request">A small request</label>
            <input id="request" value={draft} onChange={event => setDraft(event.target.value)} placeholder="What should the team explore?" maxLength={180} />
            <div className="composer-row"><label htmlFor="owner" className="sr-only">Assign request to</label>
              <select id="owner" value={draftOwner} onChange={event => setDraftOwner(event.target.value as AgentId)}>
                {agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
              </select>
              <button className="primary-button" type="submit" disabled={!draft.trim()}>Add request</button>
            </div>
          </form>
          <h3>On the board <span>{tasks.filter(task => task.state === 'done').length}/{tasks.length} done</span></h3>
          <ul className="task-list">{tasks.map(task => <li key={task.id}>
            <button onClick={() => { setSelected(task.owner); setOverlay('agent') }}>
              <span>{task.title}<small>{labelOf(task.owner)} · {stateLabel(task.state)}</small></span><strong>{task.progress}%</strong>
            </button>
          </li>)}</ul>
          <h3>Office notes</h3>
          <div className="activity-feed">{activity.map((item, index) => <p key={`${index}-${item}`}>{item}</p>)}</div>
        </>}
        {overlay === 'help' && <>
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
        </>}
      </RoomDialog>}
    </RoomScene>
  )
}

function stateLabel(state: AgentState) {
  if (state === 'coding') return 'Coding'
  if (state === 'reviewing') return 'Reviewing'
  if (state === 'done') return 'Done'
  return 'Queued'
}

function labelOf(id: AgentId) {
  return agents.find((agent) => agent.id === id)?.name ?? id
}

export default App
