import { useState } from 'react'
import type { ReactNode } from 'react'
import PixelCharacter from './PixelCharacter'
import { useOfficeMotion } from '../hooks/useOfficeMotion'
import { useRoomDrag } from '../hooks/useRoomDrag'

const rooms = [
  { name: 'Engineering', label: 'BUILD SOMETHING GOOD', desks: ['SYSTEMS', 'WORKBENCH', 'REVIEW'], detail: 'Server rack', action: 'Toggle server lights', color: 'var(--hq-color-accent)' },
  { name: 'UI Lab', label: 'SMALL DETAILS. BIG DIFFERENCE.', desks: ['LAYOUT', 'INTERACTION', 'POLISH'], detail: 'Design wall', action: 'Change design preview', color: 'var(--hq-character-rune)' },
  { name: 'QA Room', label: 'MAKE IT WORK. EVERY TIME.', desks: ['TESTS', 'EDGE CASES', 'CHECKPOINT'], detail: 'Test console', action: 'Run a simulated check', color: 'var(--hq-color-success)' },
]

type RoomAgent = { id: string; name: string; role: string; color: string }
type Props = {
  agents: RoomAgent[]; selected: string; running: boolean;
  coding: string[]; onSelect: (id: string) => void; onBoard: () => void;
  onHelp: () => void; onToggle: () => void; onRoomChange: () => void; children?: ReactNode;
}

function ObjectButton({ label, onClick, children, className = '' }: { label: string; onClick: () => void; children: ReactNode; className?: string }) {
  return <g role="button" tabIndex={0} aria-label={label} className={`room-object ${className}`} onClick={onClick}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick() } }}>
    <title>{label}</title>{children}
  </g>
}

function Plant({ x, y, large = false }: { x: number; y: number; large?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${large ? 1.3 : 1})`} shapeRendering="crispEdges" aria-hidden="true">
    <path d="M-11-21h22v20H-9z" fill="var(--hq-office-wood)" /><path d="M-13-24h26v5h-26z" fill="var(--hq-office-wood-light)" />
    <path d="M-2-24v-25h4v25zM-14-50h12v12h-12zM2-56h12v14H2zM-20-37h18v9h-18zM2-39h17v10H2z" fill="var(--hq-office-leaf)" />
    <path d="M-10-45h10v7h-10zM2-36h12v7H2z" fill="var(--hq-office-leaf-dark)" />
  </g>
}

export default function RoomScene({ agents, selected, running, coding, onSelect, onBoard, onHelp, onToggle, onRoomChange, children }: Props) {
  const [roomIndex, setRoomIndex] = useState(0)
  const [roomStates, setRoomStates] = useState([false, false, false])
  const [notice, setNotice] = useState('Click a teammate, a desk, or a door to explore.')
  const room = rooms[roomIndex]
  const { walkers, moveTo } = useOfficeMotion(running)
  const { windowRef, offset, dragProps, reset } = useRoomDrag()
  const selectedIndex = agents.findIndex(agent => agent.id === selected)
  const switchRoom = (next: number) => {
    setRoomIndex((next + rooms.length) % rooms.length)
    setNotice(`Entered ${rooms[(next + rooms.length) % rooms.length].name}. Your team and tasks came with you.`)
    onRoomChange()
  }
  const roomAction = () => {
    setRoomStates(current => current.map((value, i) => i === roomIndex ? !value : value))
    setNotice(roomIndex === 2 ? 'Simulated checks complete. No real tests were run.' : `${room.detail} updated.`)
  }
  return (
    <main className="app">
      <section ref={windowRef} className={`hq-window room-${roomIndex} ${running ? '' : 'paused'}`}
        aria-label={`AI Headquarters — ${room.name}, interactive simulated office`}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
        <svg className="office-scene" viewBox="0 0 760 520" role="group" aria-label={`${room.name}. Interact with the objects to explore.`}>
          <defs>
            <pattern id="floorboards" x="0" y="0" width="94" height="40" patternUnits="userSpaceOnUse">
              <rect width="94" height="40" fill="var(--hq-office-floor)" />
              <path d="M0 0h94M0 40V0" stroke="var(--hq-office-floor-line)" strokeWidth="1" />
              <path d="M8 33h24M59 10h18" stroke="var(--hq-color-border)" opacity=".45" />
            </pattern>
            <pattern id="windowlights" width="18" height="22" patternUnits="userSpaceOnUse">
              <rect x="4" y="5" width="5" height="7" fill="var(--hq-color-warning)" opacity=".55" />
            </pattern>
          </defs>
          {/* The room itself is the window. No external dashboard or toolbar. */}
          <ellipse cx="380" cy="485" rx="330" ry="17" fill="var(--hq-color-panel-strong)" opacity=".7" />
          <path d="M32 208h696v264l-16 17H48l-16-17z" fill="var(--hq-color-panel-strong)" />
          <path d="M40 208h680v256H40z" fill="url(#floorboards)" />
          <path d="M32 208V64l16-16h664l16 16v144z" fill="var(--hq-color-panel-muted)" />
          <path d="M48 64h664v138H48z" fill="var(--hq-color-panel)" />
          <path d="M32 64l16-16v154l-16 14zM728 64l-16-16v154l16 14z" fill="var(--hq-color-border)" />
          <path d="M32 202h696v12H32z" fill="var(--hq-color-panel-strong)" />
          <path d="M40 215h680v4H40z" fill="var(--hq-color-text-soft)" opacity=".3" />
          {/* Night window */}
          <g aria-hidden="true">
            <rect x="276" y="122" width="208" height="72" fill="var(--hq-color-panel-strong)" />
            <rect x="282" y="128" width="196" height="60" fill="var(--hq-color-accent-soft)" />
            <path d="M286 188v-24h28v-14h34v38M366 188v-34h24v-20h28v54M432 188v-31h38v31" fill="var(--hq-color-panel-strong)" />
            <path d="M286 188v-24h28v-14h34v38M366 188v-34h24v-20h28v54M432 188v-31h38v31" fill="url(#windowlights)" />
            <rect x="376" y="125" width="5" height="66" fill="var(--hq-color-border)" />
            <path d="M270 190h220v7H270z" fill="var(--hq-color-text-soft)" />
            <rect x="451" y="135" width="10" height="10" fill="var(--hq-color-text)" />
          </g>
          {/* Dragging belongs to the in-room nameplate. */}
          <g className="room-drag" role="button" tabIndex={0} aria-label="Move office window. Drag or use arrow keys. Home resets position."
            {...dragProps}>
            <title>Drag to move · Arrow keys to move · Home to center</title>
            <rect className="object-outline" x="276" y="69" width="208" height="39" rx="4" fill="var(--hq-color-panel-strong)" />
            <path d="M289 82h3v3h-3zM289 89h3v3h-3zM294 82h3v3h-3zM294 89h3v3h-3z" fill="var(--hq-color-text-soft)" />
            <text x="383" y="86" textAnchor="middle" className="room-sign-title">{room.name}</text>
            <text x="383" y="100" textAnchor="middle" className="room-sign-small">AI HEADQUARTERS · v0.3</text>
          </g>
          <ObjectButton label="Center office window" onClick={reset}>
            <rect className="object-outline" x="491" y="75" width="26" height="26" rx="3" fill="var(--hq-color-panel-strong)" />
            <path d="M499 83h10v10h-10zM504 80v16M496 88h16" fill="none" stroke="var(--hq-color-text-muted)" strokeWidth="1.5" />
          </ObjectButton>
          {/* Physical doors are the room navigation. */}
          {[{ x: 51, direction: -1 }, { x: 645, direction: 1 }].map(({ x, direction }) => {
            const destination = rooms[(roomIndex + direction + rooms.length) % rooms.length]
            return <ObjectButton key={x} label={`Enter ${destination.name}`} onClick={() => switchRoom(roomIndex + direction)}>
              <rect className="object-outline" x={x} y="113" width="64" height="100" fill="var(--hq-color-panel-strong)" />
              <rect x={x + 5} y="118" width="54" height="91" fill="var(--hq-color-background-alt)" />
              <rect x={x + 12} y="130" width="40" height="25" fill="var(--hq-color-accent-soft)" />
              <text x={x + 32} y="145" textAnchor="middle" className="door-label">{destination.name}</text>
              <path d={`M${x + 27} 173h10m-5-5 5 5-5 5`} fill="none" stroke="var(--hq-color-accent)" strokeWidth="2" transform={direction < 0 ? `rotate(180 ${x + 32} 173)` : undefined} />
              <rect x={x + 48} y="174" width="4" height="7" fill="var(--hq-color-warning)" />
              <path d={`M${x - 3} 212h70v6h-70z`} fill="var(--hq-color-text-soft)" />
            </ObjectButton>
          })}
          {/* Task board */}
          <ObjectButton label="Open task board: add requests and view activity" onClick={onBoard}>
            <rect className="object-outline" x="139" y="108" width="104" height="76" fill="var(--hq-office-wood-dark)" />
            <rect x="144" y="113" width="94" height="66" fill="var(--hq-office-wood)" />
            <rect x="153" y="124" width="27" height="30" fill="var(--hq-color-warning)" />
            <rect x="188" y="121" width="37" height="18" fill="var(--hq-color-text)" />
            <rect x="189" y="146" width="29" height="23" fill="var(--hq-character-nyx)" />
            <path d="M158 134h16m-16 6h11m24-11h26m-23 24h16m-16 6h10" stroke="var(--hq-color-panel)" strokeWidth="2" />
            <text x="191" y="199" textAnchor="middle" className="object-label">TASK BOARD</text>
          </ObjectButton>
          {/* Different interactive wall equipment in each room. */}
          <ObjectButton label={room.action} onClick={roomAction}>
            <rect className="object-outline" x="522" y="116" width="65" height="72" fill="var(--hq-color-panel-strong)" />
            {roomIndex === 0 ? [0, 1, 2].map(i => <g key={i}>
              <rect x="528" y={123 + i * 20} width="53" height="15" fill="var(--hq-color-panel-muted)" />
              <path d={`M536 ${129 + i * 20}h20`} stroke="var(--hq-color-text-soft)" strokeWidth="2" />
              <rect x="568" y={128 + i * 20} width="5" height="5" fill={roomStates[0] ? 'var(--hq-color-success)' : 'var(--hq-color-accent)'} />
            </g>) : roomIndex === 1 ? <g>
              <rect x="528" y="122" width="53" height="60" fill="var(--hq-color-background-alt)" />
              <rect x="534" y="129" width="40" height="15" fill={roomStates[1] ? 'var(--hq-character-rune)' : 'var(--hq-color-accent)'} />
              <rect x="534" y="151" width="17" height="22" fill="var(--hq-color-accent-soft)" />
              <rect x="556" y="151" width="18" height="8" fill="var(--hq-color-text-soft)" />
              <rect x="556" y="165" width="13" height="8" fill="var(--hq-color-text-muted)" />
            </g> : <g>
              <text x="554" y="140" textAnchor="middle" className="console-text" fill="var(--hq-color-success)">{roomStates[2] ? 'PASS ✓' : 'QA _'}</text>
              <path d="M534 153h39m-39 8h27m-27 8h33" stroke={roomStates[2] ? 'var(--hq-color-success)' : 'var(--hq-color-text-soft)'} strokeWidth="3" />
            </g>}
            <text x="554" y="201" textAnchor="middle" className="object-label">{room.detail.toUpperCase()}</text>
          </ObjectButton>
          <ObjectButton label={running ? 'Pause simulation' : 'Resume simulation'} onClick={onToggle}>
            <rect className="object-outline" x="601" y="140" width="30" height="36" rx="3" fill="var(--hq-color-panel-strong)" />
            {running ? <path d="M611 150h3v13h-3zM618 150h3v13h-3z" fill="var(--hq-color-success)" /> : <path d="m611 149 12 8-12 8z" fill="var(--hq-color-warning)" />}
            <text x="616" y="189" textAnchor="middle" className="object-label">{running ? 'PAUSE' : 'PLAY'}</text>
          </ObjectButton>
          {/* Rug, furniture, and personal objects. */}
          <g aria-hidden="true">
            <rect x="247" y="372" width="266" height="63" fill="var(--hq-color-accent-soft)" />
            <rect x="254" y="379" width="252" height="49" fill="none" stroke="var(--hq-color-border)" strokeWidth="2" />
            <path d="M269 404h58m106 0h58" stroke="var(--hq-color-accent)" opacity=".3" />
            <text x="380" y="408" textAnchor="middle" className="rug-text">vD / {roomIndex === 0 ? 'BUILD' : roomIndex === 1 ? 'CREATE' : 'VERIFY'}</text>
            <Plant x={79} y={303} large /><Plant x={683} y={312} large />
            <Plant x={467} y={190} />
            <path d="M59 389h64v36H59zM53 386h76v14H53zM56 425h10v10H56zM115 425h10v10h-10z" fill="var(--hq-office-wood)" />
            <path d="M60 392h62v5H60z" fill="var(--hq-office-wood-light)" />
            <rect x="69" y="374" width="17" height="12" fill="var(--hq-color-text)" />
            <rect x="91" y="369" width="17" height="17" fill="var(--hq-color-accent-soft)" />
            <path d="M108 374h5v8h-5" fill="none" stroke="var(--hq-color-text-muted)" strokeWidth="2" />
            <path d="M643 391h61v35h-61zM638 391v-16h12v28h42v-28h12v28h6v24h-72z" fill="var(--hq-color-panel-muted)" />
            <path d="M652 379h18v18h-18z" fill={room.color} opacity=".65" />
          </g>
          {walkers.map((_, station) => {
            const x = [190, 380, 570][station]
            const occupant = walkers.findIndex(walker => walker.station === station && !walker.route.length)
            const isCoding = occupant >= 0 && running && coding.includes(agents[occupant].id)
            return <ObjectButton key={station} label={`Send ${agents[selectedIndex].name} to ${room.desks[station]} desk`}
              className={isCoding ? 'desk-coding' : ''}
              onClick={() => {
                if (!running) { setNotice('Resume the simulation with the wall switch to walk.'); return }
                if (walkers.some(w => w.route.length)) { setNotice('Your teammates are on their way. Try a desk when they arrive.'); return }
                moveTo(selectedIndex, station)
                setNotice(`${agents[selectedIndex].name} → ${room.desks[station]}. Click a teammate to select someone else.`)
              }}>
              <rect x={x - 70} y="294" width="146" height="34" fill="var(--hq-color-panel-strong)" opacity=".35" />
              <rect x={x - 63} y="294" width="9" height="29" fill="var(--hq-office-wood-dark)" />
              <rect x={x + 54} y="294" width="9" height="29" fill="var(--hq-office-wood-dark)" />
              <rect className="object-outline" x={x - 72} y="257" width="144" height="41" fill="var(--hq-office-wood)" />
              <rect x={x - 72} y="257" width="144" height="6" fill="var(--hq-office-wood-light)" />
              <rect x={x - 72} y="292" width="144" height="7" fill="var(--hq-office-wood-dark)" />
              <rect x={x - 31} y="222" width="62" height="42" rx="2" fill="var(--hq-color-text-soft)" />
              <rect x={x - 27} y="226" width="54" height="34" fill="var(--hq-color-panel-strong)" />
              <path className="screen-code" d={`M${x - 20} 234h25m-25 7h34m-34 7h18`} stroke={room.color} strokeWidth="2" />
              <path d={`M${x - 3} 264v7m-12 0h24`} stroke="var(--hq-color-text-soft)" strokeWidth="3" />
              <rect x={x - 26} y="281" width="52" height="8" fill="var(--hq-color-text-muted)" />
              <path d={`M${x - 20} 283h39m-39 3h39`} stroke="var(--hq-color-panel-muted)" strokeWidth="1" />
              <rect x={x + 42} y="271" width="10" height="12" fill={agents[station].color} />
              <path d={`M${x + 52} 274h4v6h-4`} fill="none" stroke={agents[station].color} strokeWidth="2" />
              <rect x={x - 59} y="270" width="18" height="13" fill="var(--hq-color-text)" />
              <text x={x} y="315" textAnchor="middle" className="desk-name">{room.desks[station]}</text>
            </ObjectButton>
          })}
          {/* Sorting by foot position gives consistent depth while crossing the aisle. */}
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
          <ObjectButton label="Office guide: how to interact" onClick={onHelp}>
            <rect className="object-outline" x="48" y="448" width="26" height="21" rx="2" fill="var(--hq-color-accent-soft)" />
            <text x="61" y="463" textAnchor="middle" className="guide-symbol">?</text>
          </ObjectButton>
          <text x="380" y="459" textAnchor="middle" className="room-motto">{room.label}</text>
          <g aria-hidden="true"><rect x="584" y="448" width="128" height="20" rx="2" fill="var(--hq-color-panel-strong)" />
            <circle cx="596" cy="458" r="2.5" fill={running ? 'var(--hq-color-success)' : 'var(--hq-color-warning)'} />
            <text x="650" y="462" textAnchor="middle" className="simulation-sign">{running ? 'SIMULATION' : 'SIM · PAUSED'}</text></g>
        </svg>
        <p className="sr-only" role="status">{notice}</p>
        {children}
      </section>
    </main>
  )
}
