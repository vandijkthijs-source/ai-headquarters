import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function RoomDialog({ title, onClose, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    dialog?.showModal()
    return () => {
      dialog?.close()
      if (previous instanceof Element && 'focus' in previous) (previous as HTMLElement).focus()
    }
  }, [])
  return (
    <dialog ref={ref} className="room-dialog" aria-labelledby={titleId} onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="dialog-content">
        <header><div><span className="mini-label">AI HEADQUARTERS · SIMULATION</span><h2 id={titleId}>{title}</h2></div>
          <button className="close-dialog" onClick={onClose} aria-label="Close">×</button></header>
        {children}
      </div>
    </dialog>
  )
}
