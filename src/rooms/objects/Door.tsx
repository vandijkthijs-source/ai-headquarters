import ObjectButton from '../../ui/ObjectButton'

type Props = {
  x: number
  direction: number
  destination: string
  onClick: () => void
}

export default function Door({ x, direction, destination, onClick }: Props) {
  return (
    <>
      <ObjectButton label={`Enter ${destination}`} onClick={onClick}>
        <rect className="object-outline" x={x} y="113" width="64" height="100" fill="var(--hq-color-panel-strong)" />
        <rect x={x + 5} y="118" width="54" height="91" fill="var(--hq-color-background-alt)" />
        <rect x={x + 12} y="130" width="40" height="25" fill="var(--hq-color-accent-soft)" />
        <text x={x + 32} y="145" textAnchor="middle" className="door-label">{destination}</text>
        <path d={`M${x + 27} 173h10m-5-5 5 5-5 5`} fill="none" stroke="var(--hq-color-accent)" strokeWidth="2" transform={direction < 0 ? `rotate(180 ${x + 32} 173)` : undefined} />
        <rect x={x + 48} y="174" width="4" height="7" fill="var(--hq-color-warning)" />
        <path d={`M${x - 3} 212h70v6h-70z`} fill="var(--hq-color-text-soft)" />
      </ObjectButton>
    </>
  )
}
