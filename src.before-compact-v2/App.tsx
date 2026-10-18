import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'

type AgentId = 'nova' | 'pixel' | 'echo'
type TaskStatus = 'queued' | 'working' | 'done'
type Priority = 'High' | 'Medium' | 'Low'
type WorkTask = {
  id: string
  title: string
  agent: AgentId
  priority: Priority
  status: TaskStatus
  progress: number
}

type Activity = { id: string; description: string; time: string }

const agents: { id: AgentId; name: string; job: string; initials: string; color: string; description: string }[] = [
  { id: 'nova', name: 'Nova', job: 'Project manager', initials: 'NV', color: '#ffb86b', description: 'Organizes ideas and plans the backlog.' },
  { id: 'pixel', name: 'Pixel', job: 'Developer', initials: 'PX', color: '#83deff', description: 'Will prepare code changes on safe branches.' },
  { id: 'echo', name: 'Echo', job: 'QA tester', initials: 'EC', color: '#b9a1ff', description: 'Will check tests and review results.' },
]

const seedTasks: WorkTask[] = [
  { id: 'demo-1', title: 'Review workout timer layout', agent: 'pixel', priority: 'High', status: 'queued', progress: 0 },
  { id: 'demo-2', title: 'Plan next onboarding improvement', agent: 'nova', priority: 'Medium', status: 'queued', progress: 0 },
  { id: 'demo-3', title: 'Check accessibility labels', agent: 'echo', priority: 'Low', status: 'queued', progress: 0 },
]

const storageKey = 'ai-hq-demo-tasks-v1'
const pointOf = (id: AgentId) => {
  if (id === 'nova') return { x: 19, y: 37 }
  if (id === 'pixel') return { x: 71, y: 38 }
  return { x: 48, y: 76 }
}

function initialTasks(): WorkTask[] {
  try {
    const data = localStorage.getItem(storageKey)
    if (data) {
      const parsed: unknown = JSON.parse(data)
      if (Array.isArray(parsed)) return parsed as WorkTask[]
    }
  } catch { /* demo still works if browser storage is disabled */ }
  return seedTasks
}

const clock = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function App() {
  const [tasks, setTasks] = useState<WorkTask[]>(initialTasks)
  const [running, setRunning] = useState(false)
  const [selected, setSelected] = useState<AgentId>('pixel')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskAgent, setTaskAgent] = useState<AgentId>('pixel')
  const [priority, setPriority] = useState<Priority>('Medium')
  const [activity, setActivity] = useState<Activity[]>([
    { id: 'welcome', description: 'Welcome to AI Headquarters. Demo mode is active.', time: clock() },
    { id: 'ready', description: 'Three agents are standing by for their first assignment.', time: clock() },
  ])
  const [positions, setPositions] = useState<Record<AgentId, { x: number; y: number }>>({
    nova: pointOf('nova'), pixel: pointOf('pixel'), echo: pointOf('echo'),
  })

  const addActivity = (description: string) => {
    setActivity(previous => [{ id: `${Date.now()}-${Math.random()}`, description, time: clock() }, ...previous].slice(0, 5))
  }

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(tasks)) } catch { /* optional */ }
  }, [tasks])

  useEffect(() => {
    if (!running) return
    const animation = window.setInterval(() => {
      setPositions({
        nova: { x: 19 + Math.random() * 9 - 4.5, y: 37 + Math.random() * 8 - 4 },
        pixel: { x: 71 + Math.random() * 10 - 5, y: 38 + Math.random() * 8 - 4 },
        echo: { x: 48 + Math.random() * 11 - 5.5, y: 76 + Math.random() * 8 - 4 },
      })
    }, 2700)
    return () => window.clearInterval(animation)
  }, [running])

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setTasks(current => {
        const next = [...current]
        const index = next.findIndex(t => t.status === 'working')
        const target = index !== -1 ? index : next.findIndex(t => t.status === 'queued')
        if (target === -1) return current
        const item = next[target]
        const progress = item.status === 'queued' ? 12 : Math.min(100, item.progress + 13)
        next[target] = { ...item, progress, status: progress === 100 ? 'done' : 'working' }
        return next
      })
    }, 2200)
    return () => window.clearInterval(timer)
  }, [running])

  const completed = tasks.filter(t => t.status === 'done').length
  const activeTask = tasks.find(t => t.status === 'working')
  const selectedAgent = agents.find(a => a.id === selected)!
  const agentWork = useMemo(() => tasks.find(t => t.agent === selected && t.status === 'working'), [tasks, selected])
  const hasMoreWork = tasks.some(t => t.status !== 'done')

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = taskTitle.trim()
    if (!title) return
    const task: WorkTask = { id: `task-${Date.now()}`, title, agent: taskAgent, priority, status: 'queued', progress: 0 }
    setTasks(current => [task, ...current])
    setTaskTitle('')
    addActivity(`Added to backlog: ${title}`)
  }

  function toggleSimulation() {
    if (!running && !hasMoreWork) {
      addActivity('All tasks are done. Add a new task to continue.')
      return
    }
    setRunning(previous => !previous)
    addActivity(running ? 'Visual simulation paused.' : 'Visual simulation started. No real AI is running.')
  }

  function markDone(id: string) {
    const item = tasks.find(task => task.id === id)
    if (!item) return
    setTasks(current => current.map(task => task.id === id ? { ...task, status: 'done', progress: 100 } : task))
    addActivity(`Marked as done: ${item.title}`)
  }

  function resetDemo() {
    setRunning(false)
    setTasks(seedTasks)
    setPositions({ nova: pointOf('nova'), pixel: pointOf('pixel'), echo: pointOf('echo') })
    addActivity('Demo tasks reset.')
  }

  return (
    <div className="app-shell">
      <aside className="rail" aria-label="Application navigation">
        <div className="rail-brand">A<span>✦</span></div>
        <div className="rail-nav">
          <button className="rail-icon active" aria-label="Office" title="Office">⌂</button>
          <button className="rail-icon" aria-label="Tasks" title="Tasks" onClick={() => document.getElementById('task-board')?.scrollIntoView({ behavior: 'smooth' })}>☷</button>
          <button className="rail-icon" aria-label="Agents" title="Agents" onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}>♧</button>
        </div>
        <div className="rail-bottom"><span className="rail-status" title="Local demo"/> v0.1</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="breadcrumb">WORKSPACE <span>/</span> VAN DIJK FIT</div>
            <h1>AI Headquarters <span className="sparkle">✦</span></h1>
            <p className="subtitle">A little space for big ideas.</p>
          </div>
          <div className="top-actions">
            <span className="demo-pill"><span className="demo-dot"/> SIMULATION MODE</span>
            <button className={`run-button ${running ? 'running' : ''}`} onClick={toggleSimulation}>
              <span>{running ? 'Ⅱ' : '▶'}</span> {running ? 'Pause demo' : 'Start demo'}
            </button>
          </div>
        </header>

        <div className="stats-row">
          <div className="stat"><span className="stat-icon lilac">✧</span><div><span className="stat-label">Team online</span><strong>03 <small>/ 03</small></strong></div></div>
          <div className="stat"><span className="stat-icon cyan">⌘</span><div><span className="stat-label">Tasks in backlog</span><strong>{tasks.filter(t => t.status === 'queued').length.toString().padStart(2, '0')}</strong></div></div>
          <div className="stat"><span className="stat-icon orange">◷</span><div><span className="stat-label">In progress</span><strong>{tasks.filter(t => t.status === 'working').length.toString().padStart(2, '0')}</strong></div></div>
          <div className="stat"><span className="stat-icon green">✓</span><div><span className="stat-label">Completed</span><strong>{completed.toString().padStart(2, '0')}</strong></div></div>
        </div>

        <div className="content-grid">
          <section className="office-card" aria-label="Animated AI office">
            <div className="section-heading">
              <div><span className="eyebrow">LIVE VIEW · VISUAL DEMO</span><h2>The office <span>✳</span></h2></div>
              <div className="scene-indicator"><span className={running ? 'pulse-dot on' : 'pulse-dot'}/> {running ? 'Animation running' : 'Agents idle'}</div>
            </div>

            <div className="office-scene">
              <div className="office-wall" />
              <div className="window-frame"><div className="window-moon"/><div className="window-city city-one"/><div className="window-city city-two"/><div className="window-city city-three"/></div>
              <div className="wall-poster">MAKE<br/>GOOD<br/>THINGS<span>✷</span></div>
              <div className="office-floor"/>
              <div className="rug"/>
              <div className="meeting-table"><span className="table-note">✦</span><span className="table-cup"/></div>
              <div className="workstation station-nova"><div className="desk-label">01 / PLAN</div><div className="desk-surface"><div className="screen warm"><span>▰▰</span><span>▰▰▰</span><span>▰</span></div><div className="keyboard"/><div className="desk-mug"/></div><div className="chair"/></div>
              <div className="workstation station-pixel"><div className="desk-label">02 / BUILD</div><div className="desk-surface"><div className="screen cool"><span>▰▰▰</span><span>▰</span><span>▰▰▰▰</span></div><div className="keyboard"/><div className="desk-mug"/></div><div className="chair"/></div>
              <div className="workstation station-echo"><div className="desk-label">03 / TEST</div><div className="desk-surface"><div className="screen violet"><span>✓ ▰▰</span><span>✓ ▰▰▰</span><span>✓ ▰</span></div><div className="keyboard"/><div className="desk-mug"/></div><div className="chair"/></div>
              <div className="plant plant-left"><div className="leaf l1"/><div className="leaf l2"/><div className="leaf l3"/><div className="pot"/></div>
              <div className="plant plant-right"><div className="leaf l1"/><div className="leaf l2"/><div className="leaf l3"/><div className="pot"/></div>
              <div className="floor-sign">AI HQ <span>↗</span></div>
              {agents.map(agent => (
                <button
                  key={agent.id}
                  className={`character ${agent.id} ${selected === agent.id ? 'is-selected' : ''} ${running ? 'is-moving' : ''}`}
                  style={{ left: `${positions[agent.id].x}%`, top: `${positions[agent.id].y}%` }}
                  title={`View ${agent.name}`}
                  aria-label={`View ${agent.name}, ${agent.job}`}
                  onClick={() => setSelected(agent.id)}
                >
                  <span className="character-shadow"/>
                  <span className="character-body"><span className="character-hair"/><span className="character-face"><span className="eyes">••</span></span><span className="character-shirt"/><span className="character-feet"/></span>
                  <span className="name-tag">{agent.name} {running && activeTask?.agent === agent.id ? '✦' : ''}</span>
                </button>
              ))}
              <div className="scene-corner top-left">HQ / FLOOR 01</div>
              <div className="scene-corner bottom-right">CLICK AN AGENT TO INSPECT ↗</div>
            </div>

            <div className="office-footer"><div><span className="floating-spark">✦</span> Your creative crew is {running ? 'moving around the office' : 'taking a little break'}.</div><div className="office-key"><span className="key-circle"/> 2D OFFICE VIEW</div></div>
          </section>

          <section className="agents-card" id="agents">
            <div className="section-heading"><div><span className="eyebrow">YOUR CREW</span><h2>Meet the agents</h2></div><span className="small-number">03</span></div>
            <div className="agent-list">
              {agents.map(agent => <button key={agent.id} className={`agent-card ${selected === agent.id ? 'selected' : ''}`} onClick={() => setSelected(agent.id)}>
                <span className={`agent-avatar ${agent.id}`}>{agent.initials}</span>
                <span className="agent-meta"><strong>{agent.name}</strong><small>{agent.job}</small></span>
                <span className="agent-presence">{running && tasks.some(t => t.agent === agent.id && t.status === 'working') ? 'Working' : 'Idle'}</span>
              </button>)}
            </div>
            <div className="agent-detail"><div className="detail-top"><span className="detail-star">✦</span> ABOUT {selectedAgent.name.toUpperCase()}</div><p>{selectedAgent.description}</p><div className="detail-task">{agentWork ? `Demo task: ${agentWork.title}` : 'No active task right now.'}</div></div>
          </section>

          <section className="tasks-card" id="task-board">
            <div className="section-heading"><div><span className="eyebrow">MISSION CONTROL</span><h2>Task board</h2></div><span className="small-number">{tasks.length.toString().padStart(2, '0')}</span></div>
            <form className="task-form" onSubmit={addTask}>
              <label className="sr-only" htmlFor="task-title">New task</label>
              <input id="task-title" placeholder="Add an idea for vanDijkFit…" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} maxLength={100}/>
              <div className="task-options">
                <label>Agent <select value={taskAgent} onChange={e => setTaskAgent(e.target.value as AgentId)}>{agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}</select></label>
                <label>Priority <select value={priority} onChange={e => setPriority(e.target.value as Priority)}><option>Medium</option><option>High</option><option>Low</option></select></label>
                <button className="add-button" type="submit" disabled={!taskTitle.trim()}>+ Add task</button>
              </div>
            </form>
            <div className="tasks-list">
              {tasks.length === 0 && <p className="empty-message">Your task board is empty. Add your first idea above.</p>}
              {tasks.map(task => <div className="task-item" key={task.id}>
                <div className={`task-check ${task.status}`} aria-hidden="true">{task.status === 'done' ? '✓' : task.status === 'working' ? '◌' : ''}</div>
                <div className="task-content"><strong className={task.status === 'done' ? 'is-done' : ''}>{task.title}</strong><div className="task-subline"><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><span>·</span><span>{agents.find(a => a.id === task.agent)?.name}</span><span>·</span><span>{task.status === 'done' ? 'Done' : task.status === 'working' ? 'In progress (demo)' : 'Queued'}</span></div>{task.status === 'working' && <div className="progress-track"><div style={{ width: `${task.progress}%` }}/></div>}</div>
                {task.status !== 'done' && <button className="finish-button" onClick={() => markDone(task.id)} title="Mark as complete" aria-label={`Mark ${task.title} as complete`}>✓</button>}
              </div>)}
            </div>
            <button className="reset-button" onClick={resetDemo}>↺ Reset demo tasks</button>
          </section>

          <section className="activity-card"><div className="section-heading"><div><span className="eyebrow">HAPPENING NOW</span><h2>Activity log</h2></div><span className="activity-live">● LOCAL</span></div>
            <div className="activity-list">{activity.map(item => <div className="activity-item" key={item.id}><span className="activity-bullet"/><p>{item.description}</p><time>{item.time}</time></div>)}</div>
            <div className="safety-note"><span>ⓘ</span><p><strong>Visual prototype only.</strong> No AI model is running, and no code is being changed in GitHub. We'll connect Ollama and add human approval before any real development actions.</p></div>
          </section>
        </div>
        <footer className="page-footer"><span>Made for vanDijkFit ♥</span><span>AI HEADQUARTERS 0.1 · LOCAL VISUAL DEMO</span></footer>
      </main>
    </div>
  )
}

export default App
