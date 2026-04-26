import { useEffect, useRef } from 'react'

// 3 tilted elliptical orbits at different speeds/angles
const ORBITS = [
  { rx: 142, ry: 56, tilt: -18, speed:  0.13 },
  { rx: 108, ry: 44, tilt:  38, speed: -0.19 },
  { rx:  76, ry: 30, tilt:  72, speed:  0.28 },
]

// 10 balls distributed across the orbits
const BALLS = [
  { orbit: 0, phase:   0, r: 8, fill: '#EFD7CF', opacity: 0.90 },
  { orbit: 0, phase:  90, r: 6, fill: '#DFC49B', opacity: 0.85 },
  { orbit: 0, phase: 180, r: 5, fill: 'rgba(255,250,242,0.7)', opacity: 0.72 },
  { orbit: 0, phase: 270, r: 5, fill: '#C87D87', opacity: 0.70 },
  { orbit: 1, phase:   0, r: 7, fill: '#DFC49B', opacity: 0.88 },
  { orbit: 1, phase: 120, r: 5, fill: 'rgba(255,250,242,0.6)', opacity: 0.66 },
  { orbit: 1, phase: 240, r: 4, fill: '#EFD7CF', opacity: 0.72 },
  { orbit: 2, phase:   0, r: 5, fill: '#C87D87', opacity: 0.78 },
  { orbit: 2, phase: 120, r: 4, fill: '#DFC49B', opacity: 0.74 },
  { orbit: 2, phase: 240, r: 3, fill: 'rgba(255,250,242,0.5)', opacity: 0.56 },
]

export default function OrbitalSvg() {
  const ballRefs  = useRef([])
  const anglesRef = useRef(BALLS.map(b => b.phase))
  const rafRef    = useRef(null)

  useEffect(() => {
    function frame() {
      const CX = 160, CY = 160
      BALLS.forEach((ball, i) => {
        const orbit   = ORBITS[ball.orbit]
        anglesRef.current[i] += orbit.speed
        const a   = (anglesRef.current[i] * Math.PI) / 180
        const t   = (orbit.tilt          * Math.PI) / 180
        const lx  = orbit.rx * Math.cos(a)
        const ly  = orbit.ry * Math.sin(a)
        const x   = CX + lx * Math.cos(t) - ly * Math.sin(t)
        const y   = CY + lx * Math.sin(t) + ly * Math.cos(t)
        const el  = ballRefs.current[i]
        if (el) { el.setAttribute('cx', x); el.setAttribute('cy', y) }
      })
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg
      width="320" height="320" viewBox="0 0 320 320"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Faint center glow */}
      <circle cx="160" cy="160" r="18" fill="rgba(223,196,155,0.06)" />
      <circle cx="160" cy="160" r="6"  fill="rgba(223,196,155,0.18)" />

      {/* Orbit paths */}
      {ORBITS.map((o, i) => (
        <ellipse
          key={i}
          cx="160" cy="160"
          rx={o.rx} ry={o.ry}
          fill="none"
          stroke="rgba(255,250,242,0.055)"
          strokeWidth="0.6"
          transform={`rotate(${o.tilt} 160 160)`}
        />
      ))}

      {/* Balls — positioned via ref mutation in rAF */}
      {BALLS.map((ball, i) => (
        <circle
          key={i}
          ref={el => { ballRefs.current[i] = el }}
          cx="160" cy="160"
          r={ball.r}
          fill={ball.fill}
          opacity={ball.opacity}
        />
      ))}
    </svg>
  )
}
