import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import ts from 'typescript'

const source = await readFile(new URL('../src/hooks/officeMotion.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { initialMotion, seats, sendToDesk, stepOffice } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

test('desk requests swap destinations and travel along the aisle without crossing desk furniture', () => {
  const initial = initialMotion()
  let motion = sendToDesk(initial, 0, 2)
  assert.deepEqual(motion.walkers.map(w => w.station), [2, 1, 0])
  assert.deepEqual(initial, initialMotion(), 'previous state must be untouched')
  assert.equal(sendToDesk(motion, 1, 2), motion, 'ignore retargeting while walking')
  for (let i = 0; i < 230; i++) {
    motion = stepOffice(motion)
    for (const walker of motion.walkers) {
      assert.ok(walker.y >= 342 && walker.y <= 414)
      assert.ok(walker.x >= seats[0].x && walker.x <= seats[2].x)
      if (walker.y < 390) assert.ok(seats.some(seat => seat.x === walker.x), 'horizontal movement stays in aisle')
    }
  }
  assert.ok(motion.walkers.every(w => !w.route.length))
  assert.equal(motion.walkers[0].x, seats[2].x)
  assert.equal(motion.walkers[2].x, seats[0].x)
})

test('autonomous movement keeps unique destinations across repeated cycles', () => {
  let motion = initialMotion()
  let traveled = false
  for (let i = 0; i < 2000; i++) {
    motion = stepOffice(motion)
    traveled ||= motion.walkers.some(w => w.route.length > 0)
    assert.equal(new Set(motion.walkers.map(w => w.station)).size, 3)
  }
  assert.ok(traveled)
})

test('reduced motion disables autonomous walking and resolves explicit requests without animation', () => {
  const initial = initialMotion()
  assert.equal(stepOffice(initial, true), initial)
  const arrived = stepOffice(sendToDesk(initial, 0, 1), true)
  assert.ok(arrived.walkers.every(w => !w.route.length))
  assert.deepEqual(arrived.walkers.map(w => w.x), [380, 190, 570])
})
