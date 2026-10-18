export type Point = { x: number; y: number }
export type Facing = 'left' | 'right' | 'up' | 'down'
export type Walker = Point & { station: number; route: Point[]; facing: Facing }
export type OfficeMotion = { walkers: Walker[]; rest: number }

export const seats: Point[] = [{ x: 190, y: 342 }, { x: 380, y: 342 }, { x: 570, y: 342 }]
export const initialMotion = (): OfficeMotion => ({
  walkers: seats.map((seat, station) => ({ ...seat, station, route: [], facing: 'up' })),
  rest: 0,
})

function routeTo(walker: Walker, station: number, lane: number): Walker {
  const destination = seats[station]
  return {
    ...walker, station,
    route: [{ x: walker.x, y: lane }, { x: destination.x, y: lane }, destination],
  }
}

// Swap seats atomically, preserving one destination per character.
export function sendToDesk(motion: OfficeMotion, character: number, station: number): OfficeMotion {
  if (motion.walkers.some(walker => walker.route.length)) return motion
  const previous = motion.walkers[character].station
  if (previous === station) return motion
  return {
    rest: 0,
    walkers: motion.walkers.map((walker, index) => {
      if (index === character) return routeTo(walker, station, 390)
      if (walker.station === station) return routeTo(walker, previous, 414)
      return walker
    }),
  }
}

// Fixed 50ms steps; routes stay in the aisle below the furniture.
export function stepOffice(motion: OfficeMotion, reducedMotion = false): OfficeMotion {
  if (!motion.walkers.some(walker => walker.route.length)) {
    if (reducedMotion) return motion
    if (motion.rest < 180) return { ...motion, rest: motion.rest + 1 }
    return {
      rest: 0,
      walkers: motion.walkers.map((walker, i) => routeTo(walker, (walker.station + 1) % seats.length, 390 + i * 12)),
    }
  }
  return {
    rest: 0,
    walkers: motion.walkers.map(walker => {
      if (!walker.route.length) return walker
      if (reducedMotion) return { ...walker, ...seats[walker.station], route: [], facing: 'up' }
      const [target, ...remaining] = walker.route
      const dx = target.x - walker.x
      const dy = target.y - walker.y
      const distance = Math.hypot(dx, dy)
      if (distance <= 3) return { ...walker, ...target, route: remaining, facing: remaining.length ? walker.facing : 'up' }
      return {
        ...walker, x: walker.x + dx / distance * 3, y: walker.y + dy / distance * 3,
        facing: Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up',
      }
    }),
  }
}
