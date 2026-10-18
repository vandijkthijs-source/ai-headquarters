import ObjectButton from '../../ui/ObjectButton'

type Props = {
  running: boolean
  onToggle: () => void
}

export default function PauseSwitch({ running, onToggle }: Props) {
  return (
    <>
      <ObjectButton label={running ? 'Pause simulation' : 'Resume simulation'} onClick={onToggle}>
        <rect className="object-outline" x="601" y="140" width="30" height="36" rx="3" fill="var(--hq-color-panel-strong)" />
        {running ? <path d="M611 150h3v13h-3zM618 150h3v13h-3z" fill="var(--hq-color-success)" /> : <path d="m611 149 12 8-12 8z" fill="var(--hq-color-warning)" />}
        <text x="616" y="189" textAnchor="middle" className="object-label">{running ? 'PAUSE' : 'PLAY'}</text>
      </ObjectButton>
    </>
  )
}
