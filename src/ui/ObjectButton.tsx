import type { ReactNode } from 'react'

type Props = {
  label: string
  onClick: () => void
  children: ReactNode
  className?: string
}

export default function ObjectButton({ label, onClick, children, className = '' }: Props) {
  return <g role="button" tabIndex={0} aria-label={label} className={`room-object ${className}`} onClick={onClick}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick() } }}>
    <title>{label}</title>{children}
  </g>
}
