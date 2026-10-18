import type { RoomDefinition } from '../rooms'
import ObjectButton from '../../ui/ObjectButton'

type Props = {
  room: RoomDefinition
  roomIndex: number
  active: boolean
  onClick: () => void
}

export default function RoomEquipment({ room, roomIndex, active, onClick }: Props) {
  return (
    <>
      <ObjectButton label={room.action} onClick={onClick}>
        <rect className="object-outline" x="522" y="116" width="65" height="72" fill="var(--hq-color-panel-strong)" />
        {roomIndex === 0 ? [0, 1, 2].map(i => <g key={i}>
          <rect x="528" y={123 + i * 20} width="53" height="15" fill="var(--hq-color-panel-muted)" />
          <path d={`M536 ${129 + i * 20}h20`} stroke="var(--hq-color-text-soft)" strokeWidth="2" />
          <rect x="568" y={128 + i * 20} width="5" height="5" fill={active ? 'var(--hq-color-success)' : 'var(--hq-color-accent)'} />
        </g>) : roomIndex === 1 ? <g>
          <rect x="528" y="122" width="53" height="60" fill="var(--hq-color-background-alt)" />
          <rect x="534" y="129" width="40" height="15" fill={active ? 'var(--hq-character-rune)' : 'var(--hq-color-accent)'} />
          <rect x="534" y="151" width="17" height="22" fill="var(--hq-color-accent-soft)" />
          <rect x="556" y="151" width="18" height="8" fill="var(--hq-color-text-soft)" />
          <rect x="556" y="165" width="13" height="8" fill="var(--hq-color-text-muted)" />
        </g> : <g>
          <text x="554" y="140" textAnchor="middle" className="console-text" fill="var(--hq-color-success)">{active ? 'PASS ✓' : 'QA _'}</text>
          <path d="M534 153h39m-39 8h27m-27 8h33" stroke={active ? 'var(--hq-color-success)' : 'var(--hq-color-text-soft)'} strokeWidth="3" />
        </g>}
        <text x="554" y="201" textAnchor="middle" className="object-label">{room.detail.toUpperCase()}</text>
      </ObjectButton>
    </>
  )
}
