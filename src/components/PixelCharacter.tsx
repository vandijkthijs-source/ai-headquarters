import type { Facing } from '../hooks/officeMotion'

type Props = { name: string; color: string; variant: number; facing: Facing; walking: boolean; typing: boolean }

// Each glyph is a real pixel on a 16 × 24 grid, rendered at 2×.
const silhouette = [
  '................', '.....hhhhhh.....', '....hhhhhhhh....',
  '...hhhhhhhhhh...', '...hhsssssshh...', '...hssessessh...',
  '....ssssssss....', '.....ssssss.....', '......ssss......',
  '....cccccccc....', '...cccccccccc...', '...cccccccccc...',
  '...sccccccccs...', '...sccccccccs...', '...sccccccccs...',
  '....cccccccc....', '....dddddddd....', '....dddddddd....',
  '....dddddddd....', '.....ddd.ddd....', '.....ddd.ddd....',
  '.....bbb.bbb....', '....bbbb.bbbb...', '................',
]

export default function PixelCharacter({ name, color, variant, facing, walking, typing }: Props) {
  const palette: Record<string, string> = {
    h: variant === 0 ? 'var(--hq-office-hair)' : variant === 1 ? 'var(--hq-color-panel-strong)' : 'var(--hq-color-text-muted)',
    s: 'var(--hq-office-skin)', c: color, d: 'var(--hq-color-panel-strong)',
    b: 'var(--hq-color-text-soft)', e: 'var(--hq-color-panel-strong)',
  }
  return (
    <g className={`pixel-person ${walking ? 'walking' : ''} ${typing ? 'typing' : ''}`} aria-hidden="true" shapeRendering="crispEdges">
      <title>{name}</title>
      <ellipse cx="16" cy="47" rx="19" ry="5" fill="var(--hq-color-panel-strong)" opacity=".45" />
      <g transform={facing === 'left' ? 'translate(32 0) scale(-1 1)' : undefined}>
        {silhouette.flatMap((row, y) => [...row].flatMap((pixel, x) => {
          if (pixel === '.') return []
          // From behind, the hair covers the face. Side profiles retain one eye.
          const back = facing === 'up' && y >= 4 && y <= 6
          const fill = back ? palette.h : pixel === 'e' && facing === 'right' && x < 8 ? palette.s : palette[pixel]
          return <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="2" height="2" fill={fill}
            className={y >= 19 ? x < 8 ? 'pixel-leg-left' : 'pixel-leg-right' : undefined} />
        }))}
        {variant === 0 && <path d="M10 8h12v2H10zM10 12h4v2h-4z" fill="var(--hq-character-kairo)" />}
        {variant === 1 && <path d="M6 6h4v12H6zM22 6h4v14h-4zM6 8h20v2H6z" fill="var(--hq-character-nyx)" />}
        {variant === 2 && <path d="M10 2h12v2h4v4H8V4h2zM6 8h22v2H6z" fill="var(--hq-character-rune)" />}
        <g className="pixel-hands">
          <rect x="4" y="25" width="6" height="5" fill="var(--hq-office-skin)" />
          <rect x="23" y="25" width="6" height="5" fill="var(--hq-office-skin)" />
        </g>
      </g>
    </g>
  )
}
