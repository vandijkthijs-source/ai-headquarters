import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import type { Point } from './officeMotion'

export function useRoomDrag() {
  const windowRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const drag = useRef<{ id: number; pointer: Point; origin: Point } | null>(null)

  function clamp(point: Point, current: Point): Point {
    const bounds = windowRef.current?.getBoundingClientRect()
    if (!bounds) return point
    const baseX = bounds.left - current.x
    const baseY = bounds.top - current.y
    const margin = 8
    return {
      x: Math.max(margin - baseX, Math.min(window.innerWidth - margin - bounds.width - baseX, point.x)),
      y: Math.max(margin - baseY, Math.min(window.innerHeight - margin - bounds.height - baseY, point.y)),
    }
  }
  useEffect(() => {
    const resize = () => setOffset(current => clamp(current, current))
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  function onPointerDown(event: PointerEvent<SVGGElement>) {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.focus()
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { id: event.pointerId, pointer: { x: event.clientX, y: event.clientY }, origin: offset }
  }
  function onPointerMove(event: PointerEvent<SVGGElement>) {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    setOffset(clamp({
      x: current.origin.x + event.clientX - current.pointer.x,
      y: current.origin.y + event.clientY - current.pointer.y,
    }, offset))
  }
  function onPointerUp(event: PointerEvent<SVGGElement>) {
    if (drag.current?.id !== event.pointerId) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  function onKeyDown(event: KeyboardEvent<SVGGElement>) {
    const directions: Record<string, Point> = {
      ArrowLeft: { x: -16, y: 0 }, ArrowRight: { x: 16, y: 0 },
      ArrowUp: { x: 0, y: -16 }, ArrowDown: { x: 0, y: 16 },
    }
    const direction = directions[event.key]
    if (event.key === 'Home') { event.preventDefault(); setOffset({ x: 0, y: 0 }) }
    if (!direction) return
    event.preventDefault()
    setOffset(current => clamp({ x: current.x + direction.x, y: current.y + direction.y }, current))
  }
  return {
    windowRef, offset,
    dragProps: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onKeyDown },
    reset: () => setOffset({ x: 0, y: 0 }),
  }
}
