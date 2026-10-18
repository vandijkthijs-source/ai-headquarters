import ObjectButton from '../../ui/ObjectButton'

type Props = {
  onClick: () => void
}

export default function TaskBoard({ onClick }: Props) {
  return (
    <>
      <ObjectButton label="Open task board: add requests and view activity" onClick={onClick}>
        <rect className="object-outline" x="139" y="108" width="104" height="76" fill="var(--hq-office-wood-dark)" />
        <rect x="144" y="113" width="94" height="66" fill="var(--hq-office-wood)" />
        <rect x="153" y="124" width="27" height="30" fill="var(--hq-color-warning)" />
        <rect x="188" y="121" width="37" height="18" fill="var(--hq-color-text)" />
        <rect x="189" y="146" width="29" height="23" fill="var(--hq-character-nyx)" />
        <path d="M158 134h16m-16 6h11m24-11h26m-23 24h16m-16 6h10" stroke="var(--hq-color-panel)" strokeWidth="2" />
        <text x="191" y="199" textAnchor="middle" className="object-label">TASK BOARD</text>
      </ObjectButton>
    </>
  )
}
