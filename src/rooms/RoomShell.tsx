
export default function RoomShell() {
  return (
    <>
      <defs>
        <pattern id="floorboards" x="0" y="0" width="94" height="40" patternUnits="userSpaceOnUse">
          <rect width="94" height="40" fill="var(--hq-office-floor)" />
          <path d="M0 0h94M0 40V0" stroke="var(--hq-office-floor-line)" strokeWidth="1" />
          <path d="M8 33h24M59 10h18" stroke="var(--hq-color-border)" opacity=".45" />
        </pattern>
        <pattern id="windowlights" width="18" height="22" patternUnits="userSpaceOnUse">
          <rect x="4" y="5" width="5" height="7" fill="var(--hq-color-warning)" opacity=".55" />
        </pattern>
      </defs>
      {/* The room itself is the window. No external dashboard or toolbar. */}
      <ellipse cx="380" cy="485" rx="330" ry="17" fill="var(--hq-color-panel-strong)" opacity=".7" />
      <path d="M32 208h696v264l-16 17H48l-16-17z" fill="var(--hq-color-panel-strong)" />
      <path d="M40 208h680v256H40z" fill="url(#floorboards)" />
      <path d="M32 208V64l16-16h664l16 16v144z" fill="var(--hq-color-panel-muted)" />
      <path d="M48 64h664v138H48z" fill="var(--hq-color-panel)" />
      <path d="M32 64l16-16v154l-16 14zM728 64l-16-16v154l16 14z" fill="var(--hq-color-border)" />
      <path d="M32 202h696v12H32z" fill="var(--hq-color-panel-strong)" />
      <path d="M40 215h680v4H40z" fill="var(--hq-color-text-soft)" opacity=".3" />
      {/* Night window */}
      <g aria-hidden="true">
        <rect x="276" y="122" width="208" height="72" fill="var(--hq-color-panel-strong)" />
        <rect x="282" y="128" width="196" height="60" fill="var(--hq-color-accent-soft)" />
        <path d="M286 188v-24h28v-14h34v38M366 188v-34h24v-20h28v54M432 188v-31h38v31" fill="var(--hq-color-panel-strong)" />
        <path d="M286 188v-24h28v-14h34v38M366 188v-34h24v-20h28v54M432 188v-31h38v31" fill="url(#windowlights)" />
        <rect x="376" y="125" width="5" height="66" fill="var(--hq-color-border)" />
        <path d="M270 190h220v7H270z" fill="var(--hq-color-text-soft)" />
        <rect x="451" y="135" width="10" height="10" fill="var(--hq-color-text)" />
      </g>
    </>
  )
}
