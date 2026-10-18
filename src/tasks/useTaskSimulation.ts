import { useEffect, useState } from 'react'
import { labelOf } from '../characters/characters'
import type { AgentId } from '../characters/characters'
import type { AgentState } from './types'
import { starterTasks } from './starterTasks'

const clock = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

export function useTaskSimulation(running: boolean) {
  const [draft, setDraft] = useState('Improve the workout history screen')
  const [draftOwner, setDraftOwner] = useState<AgentId>('nyx')
  const [{ tasks, activity }, setSimulation] = useState(() => ({
    tasks: starterTasks,
    activity: [
      `${clock()} · Office simulation started. Click a teammate or the task board.`,
      `${clock()} · Demo only. No AI calls, repository edits, or real tests are run.`,
    ],
  }))

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
    if (!title) return null
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
    setDraft('')
    return draftOwner
  }

  return { tasks, activity, draft, setDraft, draftOwner, setDraftOwner, addTask }
}
