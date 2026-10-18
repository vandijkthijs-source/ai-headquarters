import { useEffect, useMemo, useState } from 'react'
import './App.css'

type AgentId = 'kairo' | 'nyx' | 'rune'
type AgentState = 'idle' | 'coding' | 'reviewing' | 'done'
type Priority = 'high' | 'medium' | 'low'

type Agent = {
  id: AgentId
  name: string
  role: string
  vibe: string
  color: string
  accent: string
  x: number
  y: number
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
    color: '#ffb275',
    accent: '#ffd7ae',
    x: 17,
    y: 33,
  },
  {
    id: 'nyx',
    name: 'Nyx',
    role: 'UI Hacker',
    vibe: 'Shapes screens, interactions, and the polished feel.',
    color: '#78d7ff',
    accent: '#bfeeff',
    x: 69,
    y: 33,
  },
  {
    id: 'rune',
    name: 'Rune',
    role: 'Test Runner',
    vibe: 'Checks edge cases, flows, and catches weird regressions.',
    color: '#b799ff',
    accent: '#e3d5ff',
    x: 43,
    y: 74,
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
  const [selected, setSelected] = useState<AgentId>('nyx')
  const [running, setRunning] = useState(true)
  const [draft, setDraft] = useState('Improve the workout history screen')
  const [draftOwner, setDraftOwner] = useState<AgentId>('nyx')
  const [{ tasks, activity }, setSimulation] = useState(() => ({
    tasks: starterTasks,
    activity: [
      `${clock()} · Sprint live. Agents are coding inside the office widget.`,
      `${clock()} · Safe demo mode. No GitHub or AI calls yet.`,
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
            messages.push(`${timestamp} · ${labelOf(task.owner)} wrapped “${task.title}”.`)
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

  const codingCount = tasks.filter((task) => task.state === 'coding').length
  const doneCount = tasks.filter((task) => task.state === 'done').length

  function addTask() {
    const title = draft.trim()
    if (!title) return
    const id = `task-${Date.now()}`
    const message = `${clock()} · New request added: “${title}”.`
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
    <div className="app">
      <section className="hq-window" aria-label="AI Headquarters compact office window">
        <div className="window-bar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="window-title">
            <strong>AI Headquarters</strong>
            <span>vanDijkFit // compact live view</span>
          </div>
          <button className={`live-switch ${running ? 'live' : ''}`} onClick={() => setRunning((value) => !value)}>
            {running ? 'Live coding' : 'Paused'}
          </button>
        </div>

        <div className="window-content">
          <div className="office-widget">
            <div className="widget-topline">
              <span>Little office window</span>
              <span>{codingCount} coding · {doneCount} done</span>
            </div>

            <div className="scene">
              <div className="scene-glow scene-glow-left" />
              <div className="scene-glow scene-glow-right" />
              <div className="window-city">
                <div className="moon" />
                <div className="tower t1" />
                <div className="tower t2" />
                <div className="tower t3" />
              </div>

              <Desk xClass="desk-left" label="SYSTEMS" tone="warm" code={['git checkout', 'task.plan()', 'review()}']} />
              <Desk xClass="desk-right" label="UI LAB" tone="cool" code={['<StatsCard />', 'const streak', 'animate()']} />
              <Desk xClass="desk-bottom" label="QA OPS" tone="violet" code={['npm test', 'expect(true)', 'ship?']} />

              {agents.map((agent) => {
                const task = tasks.find((item) => item.owner === agent.id && item.state !== 'done')
                const isSelected = selected === agent.id
                return (
                  <button
                    key={agent.id}
                    className={`coder ${agent.id} ${isSelected ? 'selected' : ''} ${running ? 'active' : ''}`}
                    style={{ left: `${agent.x}%`, top: `${agent.y}%`, ['--coder' as never]: agent.color, ['--accent' as never]: agent.accent }}
                    onClick={() => setSelected(agent.id)}
                  >
                    <span className="coder-chair" />
                    <span className="coder-laptop">
                      <span className="code-line line-1" />
                      <span className="code-line line-2" />
                      <span className="code-line line-3" />
                    </span>
                    <span className="coder-body">
                      <span className="coder-head" />
                      <span className="coder-torso" />
                      <span className="coder-arm left" />
                      <span className="coder-arm right" />
                    </span>
                    <span className="typing-pulse" />
                    <span className="coder-tag">
                      <strong>{agent.name}</strong>
                      <small>{task ? stateLabel(task.state) : 'Idle'}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="side-panel">
            <div className="agent-focus">
              <div className="focus-head">
                <div>
                  <span className="mini-label">SELECTED AGENT</span>
                  <h2>{selectedAgent.name}</h2>
                </div>
                <span className="role-pill">{selectedAgent.role}</span>
              </div>
              <p>{selectedAgent.vibe}</p>

              <div className="status-box">
                <div>
                  <span>Status</span>
                  <strong>{selectedTask ? stateLabel(selectedTask.state) : 'Idle'}</strong>
                </div>
                <div>
                  <span>Current task</span>
                  <strong>{selectedTask ? selectedTask.title : 'Waiting for a task'}</strong>
                </div>
                <div>
                  <span>Progress</span>
                  <strong>{selectedTask ? `${selectedTask.progress}%` : '0%'}</strong>
                </div>
              </div>
              <div className="progress-bar">
                <div style={{ width: `${selectedTask?.progress ?? 0}%` }} />
              </div>
            </div>

            <div className="task-composer">
              <span className="mini-label">QUICK REQUEST</span>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask the team for a small update"
              />
              <div className="composer-row">
                <select value={draftOwner} onChange={(event) => setDraftOwner(event.target.value as AgentId)}>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
                <button onClick={addTask}>Add</button>
              </div>
            </div>

            <div className="activity-feed">
              <span className="mini-label">ACTIVITY</span>
              {activity.map((item) => (
                <div className="activity-item" key={item}>
                  <span className="activity-dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

function Desk({ xClass, label, tone, code }: { xClass: string; label: string; tone: 'warm' | 'cool' | 'violet'; code: string[] }) {
  return (
    <div className={`desk ${xClass}`}>
      <div className="desk-label">{label}</div>
      <div className="desk-top">
        <div className={`desk-monitor ${tone}`}>
          {code.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div className="desk-keyboard" />
        <div className="desk-mug" />
      </div>
    </div>
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
