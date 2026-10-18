import ObjectButton from '../ui/ObjectButton'

type Props = {
  running: boolean
  motto: string
  onHelp: () => void
}

export default function RoomFooter({ running, motto, onHelp }: Props) {
  return (
    <>
      <ObjectButton label="Office guide: how to interact" onClick={onHelp}>
        <rect className="object-outline" x="48" y="448" width="26" height="21" rx="2" fill="var(--hq-color-accent-soft)" />
        <text x="61" y="463" textAnchor="middle" className="guide-symbol">?</text>
      </ObjectButton>
      <text x="380" y="459" textAnchor="middle" className="room-motto">{motto}</text>
      <g aria-hidden="true"><rect x="584" y="448" width="128" height="20" rx="2" fill="var(--hq-color-panel-strong)" />
        <circle cx="596" cy="458" r="2.5" fill={running ? 'var(--hq-color-success)' : 'var(--hq-color-warning)'} />
        <text x="650" y="462" textAnchor="middle" className="simulation-sign">{running ? 'SIMULATION' : 'SIM · PAUSED'}</text></g>
    </>
  )
}
