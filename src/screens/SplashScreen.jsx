import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrbitalSvg from '../components/OrbitalSvg'

export default function SplashScreen() {
  const navigate  = useNavigate()
  const [date, setDate] = useState('')

  useEffect(() => {
    const now    = new Date()
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    setDate(`${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}`)
  }, [])

  return (
    <div style={S.screen}>
      {/* Top copy */}
      <div style={S.topText}>
        <p style={S.belief}>
          We believe every woman carries an Éveil inside her.
        </p>
        <p style={S.sub}>
          A version of herself she hasn't met yet.{' '}
          One hour a day is how you find her.
        </p>
      </div>

      {/* Animated galaxy */}
      <div style={S.galaxyWrap}>
        <OrbitalSvg />
        <div style={S.logoWrap}>
          <div style={S.logo}>Éveil</div>
          <div style={S.tagline}>one hour · real change</div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={S.bottom}>
        <div style={S.date}>{date}</div>
        <button className="btn-primary" onClick={() => navigate('/register')}>
          Enter your Éveil →
        </button>
      </div>
    </div>
  )
}

const S = {
  screen: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.2rem',
    padding: '2rem',
    background: '#1C1008',
    overflow: 'hidden',
  },
  topText: {
    textAlign: 'center',
    maxWidth: 300,
  },
  belief: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '1.05rem',
    color: 'rgba(255,250,242,0.68)',
    lineHeight: 1.55,
    marginBottom: '0.45rem',
  },
  sub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '0.82rem',
    color: 'rgba(255,250,242,0.36)',
    lineHeight: 1.65,
  },
  galaxyWrap: {
    position: 'relative',
    width: 320,
    height: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoWrap: {
    position: 'absolute',
    zIndex: 2,
    textAlign: 'center',
    pointerEvents: 'none',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '3rem',
    color: '#FFFAF2',
    letterSpacing: '0.03em',
    lineHeight: 1,
  },
  tagline: {
    fontSize: 9,
    letterSpacing: '0.26em',
    textTransform: 'uppercase',
    color: 'rgba(255,250,242,0.35)',
    marginTop: 8,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    maxWidth: 320,
  },
  date: {
    fontSize: 9,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(255,250,242,0.28)',
  },
}
