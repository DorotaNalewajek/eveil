import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandom, carrieQuestions } from '../utils/content'

const MOODS = [
  'Focused and proud ✦',
  'Hard but worth it',
  'Distracted, but I stayed',
]

export default function ReflectionScreen() {
  const navigate                    = useNavigate()
  const [question]                  = useState(() => getRandom(carrieQuestions))
  const [selected, setSelected]     = useState(null)

  const handleFinish = () => {
    const day = parseInt(localStorage.getItem('eveil_day') || '0') + 1
    localStorage.setItem('eveil_day', day)
    navigate('/done', { state: { day } })
  }

  return (
    <div style={S.screen}>
      {/* Header */}
      <div style={S.top}>
        <div style={S.badge}>✦ You showed up today</div>
        <h2 style={S.title}>
          How did it{' '}
          <em style={{ fontStyle: 'italic', color: '#C87D87' }}>feel?</em>
        </h2>
      </div>

      {/* Carrie card */}
      <div style={S.card}>
        <div style={S.cardLabel}>Carrie moment</div>
        <p style={S.cardText}>{question}</p>
      </div>

      {/* Mood options */}
      <div style={S.options}>
        {MOODS.map(mood => (
          <button
            key={mood}
            className={`opt-btn${selected === mood ? ' selected' : ''}`}
            onClick={() => setSelected(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button style={S.btnClose} onClick={handleFinish}>
        Close your Éveil →
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
    justifyContent: 'flex-start',
    padding: '4rem 2rem 2rem',
    background: '#EFD7CF',
    overflowY: 'auto',
  },
  top: {
    textAlign: 'center',
    marginBottom: '2rem',
    width: '100%',
  },
  badge: {
    fontSize: 9,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#6B7556',
    marginBottom: '0.5rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 300,
    color: '#3A2E2A',
    lineHeight: 1.2,
  },
  card: {
    background: '#FFFAF2',
    borderRadius: 20,
    padding: '1.2rem 1.4rem',
    marginBottom: '1.2rem',
    width: '100%',
    maxWidth: 340,
  },
  cardLabel: {
    fontSize: 8,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#B5A49E',
    marginBottom: 8,
  },
  cardText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontSize: '1rem',
    color: '#3A2E2A',
    lineHeight: 1.6,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
    maxWidth: 340,
    marginBottom: '1.5rem',
  },
  btnClose: {
    width: '100%',
    maxWidth: 340,
    background: '#3A2E2A',
    color: '#FFFAF2',
    border: 'none',
    borderRadius: 50,
    padding: '1rem',
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontSize: '1.1rem',
    cursor: 'pointer',
    letterSpacing: '0.05em',
    transition: 'opacity 0.2s',
  },
}
