import type { useRoomDrag } from '../../hooks/useRoomDrag'
import ObjectButton from '../../ui/ObjectButton'

type Props = {
  name: string
  dragProps: ReturnType<typeof useRoomDrag>['dragProps']
  onReset: () => void
  expanded: boolean
  onToggleSize: () => void
}

export default function RoomNameplate({ name, dragProps, onReset, expanded, onToggleSize }: Props) {
  return (
    <>
      <g className="room-drag" role={expanded ? 'img' : 'button'} tabIndex={expanded ? undefined : 0}
        aria-label={expanded ? `${name} nameplate. Use the window-size control for a draggable mini window.` : 'Move office window. Drag or use arrow keys. Home resets position.'}
        {...dragProps}>
        <title>{expanded ? 'Full browser view · Switch to mini window to drag' : 'Drag to move · Arrow keys to move · Home to center'}</title>
        <rect className="object-outline" x="276" y="69" width="208" height="39" rx="4" fill="var(--hq-color-panel-strong)" />
        <path d="M289 82h3v3h-3zM289 89h3v3h-3zM294 82h3v3h-3zM294 89h3v3h-3z" fill="var(--hq-color-text-soft)" />
        <text x="383" y="86" textAnchor="middle" className="room-sign-title">{name}</text>
        <text x="383" y="100" textAnchor="middle" className="room-sign-small">AI HEADQUARTERS · v0.3</text>
      </g>
      <ObjectButton label="Center office window" onClick={onReset}>
        <rect className="object-outline" x="491" y="75" width="26" height="26" rx="3" fill="var(--hq-color-panel-strong)" />
        <path d="M499 83h10v10h-10zM504 80v16M496 88h16" fill="none" stroke="var(--hq-color-text-muted)" strokeWidth="1.5" />
      </ObjectButton>
      <ObjectButton label={expanded ? 'Switch to mini window' : 'Fill browser window'} onClick={onToggleSize}>
        <rect className="object-outline" x="525" y="75" width="26" height="26" rx="3" fill="var(--hq-color-panel-strong)" />
        <rect x="531" y="81" width="14" height="14" fill="none" stroke="var(--hq-color-accent)" strokeWidth="1.5" />
        {expanded && <rect x="537" y="87" width="8" height="8" fill="var(--hq-color-accent)" />}
      </ObjectButton>
    </>
  )
}
