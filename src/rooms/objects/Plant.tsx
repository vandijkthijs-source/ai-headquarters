type Props = {
  x: number
  y: number
  large?: boolean
}

export default function Plant({ x, y, large = false }: Props) {
  return <g transform={`translate(${x} ${y}) scale(${large ? 1.3 : 1})`} shapeRendering="crispEdges" aria-hidden="true">
    <path d="M-11-21h22v20H-9z" fill="var(--hq-office-wood)" /><path d="M-13-24h26v5h-26z" fill="var(--hq-office-wood-light)" />
    <path d="M-2-24v-25h4v25zM-14-50h12v12h-12zM2-56h12v14H2zM-20-37h18v9h-18zM2-39h17v10H2z" fill="var(--hq-office-leaf)" />
    <path d="M-10-45h10v7h-10zM2-36h12v7H2z" fill="var(--hq-office-leaf-dark)" />
  </g>
}
