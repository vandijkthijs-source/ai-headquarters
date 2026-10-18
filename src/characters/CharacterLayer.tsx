import type { Agent, AgentId } from './characters'
import type { Walker } from '../hooks/officeMotion'
import ObjectButton from '../ui/ObjectButton'
import PixelCharacter from './PixelCharacter'

type Props = {
  walkers: Walker[]
  agents: Agent[]
  selected: AgentId
  running: boolean
  coding: AgentId[]
  onSelect: (id: AgentId) => void
}

export default function CharacterLayer({ walkers, agents, selected, running, coding, onSelect }: Props) {
  return (
    <>
      {walkers.map((walker, i) => ({ walker, agent: agents[i], i })).sort((a, b) => a.walker.y - b.walker.y).map(({ walker, agent, i }) => {
        const walking = walker.route.length > 0
        return <ObjectButton key={agent.id} label={`${agent.name}, ${agent.role}. ${walking ? 'Walking' : coding.includes(agent.id) ? 'Simulated coding' : 'Idle'}. Open details.`}
          className={`character ${selected === agent.id ? 'selected' : ''}`} onClick={() => onSelect(agent.id)}>
          <g transform={`translate(${Math.round(walker.x) - 16} ${Math.round(walker.y) - 48})`}>
            <rect className="character-target" x="-8" y="-5" width="48" height="64" rx="4" fill="transparent" />
            {selected === agent.id && <path d="m11-9 5 5 5-5z" fill="var(--hq-color-accent)" />}
            <PixelCharacter name={agent.name} color={agent.color} variant={i} facing={walker.facing}
              walking={walking && running} typing={!walking && running && coding.includes(agent.id)} />
            <text x="16" y="61" textAnchor="middle" className="character-name">{agent.name}</text>
          </g>
        </ObjectButton>
      })}
    </>
  )
}
