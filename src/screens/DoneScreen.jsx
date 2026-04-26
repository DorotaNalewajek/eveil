import { useNavigate, useLocation } from 'react-router-dom'

export default function DoneScreen() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const day       = location.state?.day
    ?? parseInt(localStorage.getItem('eveil_day') || '1')

  return (
    <div style={S.screen}>
      <div style={S.number}>{day}</div>
      <div style={S.label}>days consistent</div>

      <p style={S.quote}>
        "Every day you show up,<br />
        you become someone<br />
        <em style={{ color: '#DFC49B' }}>your future self</em><br />
        will thank."
      </p>

      <button
        className="btn-primary"
        style={{ maxWidth: 300 }}
        onClick={() => navigate('/')}
      >
        See you tomorrow →
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
    padding: '2rem',
    background: '#1C1008',
    textAlign: 'center',
  },
  number: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '5rem',
    color: '#DFC49B',
    lineHeight: 1,
    marginBottom: '0.4rem',
  },
  label: {
    fontSize: 9,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,250,242,0.4)',
    marginBottom: '2rem',
  },
  quote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '1.3rem',
    color: '#FFFAF2',
    lineHeight: 1.7,
    maxWidth: 280,
    marginBottom: '3rem',
  },
}
