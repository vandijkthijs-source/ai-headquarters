import Plant from './objects/Plant'

type Props = {
  roomIndex: number
  color: string
}

export default function RoomDecor({ roomIndex, color }: Props) {
  return (
    <>
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
        <path d="M652 379h18v18h-18z" fill={color} opacity=".65" />
      </g>
    </>
  )
}
