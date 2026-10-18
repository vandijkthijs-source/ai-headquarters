import ObjectButton from '../../ui/ObjectButton'

type Props = {
  x: number
  label: string
  color: string
  mugColor: string
  selectedName: string
  coding: boolean
  onClick: () => void
}

export default function Desk({ x, label, color, mugColor, selectedName, coding, onClick }: Props) {
  return (
    <>
      <ObjectButton label={`Send ${selectedName} to ${label} desk`}
        className={coding ? 'desk-coding' : ''} onClick={onClick}>
        <rect x={x - 70} y="294" width="146" height="34" fill="var(--hq-color-panel-strong)" opacity=".35" />
        <rect x={x - 63} y="294" width="9" height="29" fill="var(--hq-office-wood-dark)" />
        <rect x={x + 54} y="294" width="9" height="29" fill="var(--hq-office-wood-dark)" />
        <rect className="object-outline" x={x - 72} y="257" width="144" height="41" fill="var(--hq-office-wood)" />
        <rect x={x - 72} y="257" width="144" height="6" fill="var(--hq-office-wood-light)" />
        <rect x={x - 72} y="292" width="144" height="7" fill="var(--hq-office-wood-dark)" />
        <rect x={x - 31} y="222" width="62" height="42" rx="2" fill="var(--hq-color-text-soft)" />
        <rect x={x - 27} y="226" width="54" height="34" fill="var(--hq-color-panel-strong)" />
        <path className="screen-code" d={`M${x - 20} 234h25m-25 7h34m-34 7h18`} stroke={color} strokeWidth="2" />
        <path d={`M${x - 3} 264v7m-12 0h24`} stroke="var(--hq-color-text-soft)" strokeWidth="3" />
        <rect x={x - 26} y="281" width="52" height="8" fill="var(--hq-color-text-muted)" />
        <path d={`M${x - 20} 283h39m-39 3h39`} stroke="var(--hq-color-panel-muted)" strokeWidth="1" />
        <rect x={x + 42} y="271" width="10" height="12" fill={mugColor} />
        <path d={`M${x + 52} 274h4v6h-4`} fill="none" stroke={mugColor} strokeWidth="2" />
        <rect x={x - 59} y="270" width="18" height="13" fill="var(--hq-color-text)" />
        <text x={x} y="315" textAnchor="middle" className="desk-name">{label}</text>
      </ObjectButton>
    </>
  )
}
