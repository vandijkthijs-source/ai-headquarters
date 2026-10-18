import { useState } from 'react'
import type { ReactNode } from 'react'
import CharacterLayer from '../characters/CharacterLayer'
import type { Agent, AgentId } from '../characters/characters'
import { seats } from '../hooks/officeMotion'
import { useOfficeMotion } from '../hooks/useOfficeMotion'
import { useRoomDrag } from '../hooks/useRoomDrag'
import { rooms } from './rooms'
import RoomShell from './RoomShell'
import RoomDecor from './RoomDecor'
import RoomFooter from './RoomFooter'
import Desk from './objects/Desk'
import Door from './objects/Door'
import TaskBoard from './objects/TaskBoard'
import RoomEquipment from './objects/RoomEquipment'
import RoomNameplate from './objects/RoomNameplate'
import PauseSwitch from './objects/PauseSwitch'

type Props = {
  agents: Agent[]
  selected: AgentId
  running: boolean
  coding: AgentId[]
  onSelect: (id: AgentId) => void
  onBoard: () => void
  onHelp: () => void
  onToggle: () => void
  onRoomChange: () => void
  children?: ReactNode
}

export default function RoomScene({
  agents, selected, running, coding, onSelect, onBoard, onHelp, onToggle, onRoomChange, children,
}: Props) {
  const [roomIndex, setRoomIndex] = useState(0)
  const [expanded, setExpanded] = useState(true)
  const [roomStates, setRoomStates] = useState([false, false, false])
  const [notice, setNotice] = useState('Click a teammate, a desk, or a door to explore.')
  const room = rooms[roomIndex]
  const { walkers, moveTo } = useOfficeMotion(running)
  const { windowRef, offset, dragProps, reset } = useRoomDrag(!expanded)
  const selectedIndex = agents.findIndex(agent => agent.id === selected)

  function switchRoom(next: number) {
    setRoomIndex((next + rooms.length) % rooms.length)
    setNotice(`Entered ${rooms[(next + rooms.length) % rooms.length].name}. Your team and tasks came with you.`)
    onRoomChange()
  }

  function roomAction() {
    setRoomStates(current => current.map((value, i) => i === roomIndex ? !value : value))
    setNotice(roomIndex === 2 ? 'Simulated checks complete. No real tests were run.' : `${room.detail} updated.`)
  }

  function requestDesk(station: number) {
    if (!running) {
      setNotice('Resume the simulation with the wall switch to walk.')
      return
    }
    if (walkers.some(walker => walker.route.length)) {
      setNotice('Your teammates are on their way. Try a desk when they arrive.')
      return
    }
    moveTo(selectedIndex, station)
    setNotice(`${agents[selectedIndex].name} → ${room.desks[station]}. Click a teammate to select someone else.`)
  }

  return (
    <main className="app">
      <section ref={windowRef} className={`hq-window room-${roomIndex} ${expanded ? 'expanded' : ''} ${running ? '' : 'paused'}`}
        aria-label={`AI Headquarters — ${room.name}, interactive simulated office`}
        style={{ transform: expanded ? 'none' : `translate(${offset.x}px, ${offset.y}px)` }}>
        <svg className="office-scene" viewBox="0 0 760 520" role="group" aria-label={`${room.name}. Interact with the objects to explore.`}>
          <RoomShell />
          <RoomNameplate name={room.name} dragProps={dragProps} onReset={reset}
            expanded={expanded} onToggleSize={() => { reset(); setExpanded(value => !value) }} />
          {[{ x: 51, direction: -1 }, { x: 645, direction: 1 }].map(({ x, direction }) => (
            <Door key={x} x={x} direction={direction}
              destination={rooms[(roomIndex + direction + rooms.length) % rooms.length].name}
              onClick={() => switchRoom(roomIndex + direction)} />
          ))}
          <TaskBoard onClick={onBoard} />
          <RoomEquipment room={room} roomIndex={roomIndex} active={roomStates[roomIndex]} onClick={roomAction} />
          <PauseSwitch running={running} onToggle={onToggle} />
          <RoomDecor roomIndex={roomIndex} color={room.color} />
          {seats.map((seat, station) => {
            const occupant = walkers.findIndex(walker => walker.station === station && !walker.route.length)
            const isCoding = occupant >= 0 && running && coding.includes(agents[occupant].id)
            return (
              <Desk key={station} x={seat.x} label={room.desks[station]} color={room.color}
                mugColor={agents[station].color} selectedName={agents[selectedIndex].name}
                coding={isCoding} onClick={() => requestDesk(station)} />
            )
          })}
          <CharacterLayer walkers={walkers} agents={agents} selected={selected}
            running={running} coding={coding} onSelect={onSelect} />
          <RoomFooter running={running} motto={room.label} onHelp={onHelp} />
        </svg>
        <p className="sr-only" role="status">{notice}</p>
        {children}
      </section>
    </main>
  )
}
