import { useNavigate } from 'react-router-dom'

export default function TransitionScreen() {
  const navigate = useNavigate()

  return (
    <div style={S.screen}>
      <div style={S.textBlock}>
        <p style={S.lineAccent}>Take a breath.</p>
        <p style={S.line}>This hour is yours.</p>
        <p style={S.lineSoft}>No noise. No scrolling. No distractions.</p>
      </div>
      <button className="btn-ghost" onClick={() => navigate('/timer')}>
        Begin →
      </button>
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
    padding: '3rem 2rem',
    background: '#1C1008',
  },
  textBlock: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  lineAccent: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '1.6rem',
    color: '#DFC49B',
    lineHeight: 2,
    marginBottom: '0.5rem',
  },
  line: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '1.4rem',
    color: '#FFFAF2',
    lineHeight: 2,
  },
  lineSoft: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '0.9rem',
    color: 'rgba(255,250,242,0.5)',
    letterSpacing: '0.08em',
    lineHeight: 2,
  },
}
