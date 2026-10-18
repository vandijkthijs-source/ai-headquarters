import { useEffect, useState } from 'react'
import { initialMotion, sendToDesk, stepOffice } from './officeMotion'

export function useOfficeMotion(running: boolean) {
  const [motion, setMotion] = useState(initialMotion)
  useEffect(() => {
    if (!running) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const timer = window.setInterval(() => setMotion(current => stepOffice(current, preference.matches)), 50)
    return () => window.clearInterval(timer)
  }, [running])
  return {
    walkers: motion.walkers,
    moveTo: (character: number, desk: number) => setMotion(current => sendToDesk(current, character, desk)),
  }
}
