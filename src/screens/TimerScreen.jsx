import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '../hooks/useTimer'
import { playChime } from '../utils/audio'

export default function TimerScreen() {
  const navigate                              = useNavigate()
  const { display, elapsed, seconds, start, stop } = useTimer(3600)
  const startedRef  = useRef(false)
  const chimedRef   = useRef(false)

  // Auto-start once on mount
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true
      start()
    }
  }, [start])

  // Chime + redirect when timer reaches zero
  useEffect(() => {
    if (seconds === 0 && !chimedRef.current) {
      chimedRef.current = true
      playChime()
      const t = setTimeout(() => navigate('/reflection'), 2000)
      return () => clearTimeout(t)
    }
  }, [seconds, navigate])

  const handleDone = () => {
    stop()
    navigate('/reflection')
  }

  return (
    <div style={S.screen}>
      <div style={S.display}>
        <span>{display.slice(0, 2)}</span>
        <span className="timer-colon">:</span>
        <span>{display.slice(3)}</span>
      </div>

      <div style={S.messages}>
        <p style={{ ...S.msg, ...(elapsed > 30  ? S.msgVisible : {}) }}>
          You're doing the work.
        </p>
        <p style={{ ...S.msg, ...(elapsed > 300 ? S.msgVisible : {}) }}>
          Stay with it.
        </p>
        <p style={{ ...S.msg, ...(elapsed > 900 ? S.msgVisible : {}) }}>
          This is your hour.
        </p>
      </div>

      <button className="btn-stop" onClick={handleDone}>
        I'm done for today
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
    background: '#1E1410',
  },
  display: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    color: '#FFFAF2',
    fontSize: 'clamp(5rem, 20vw, 7rem)',
    letterSpacing: '0.05em',
    lineHeight: 1,
    marginBottom: '1rem',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: '3rem',
  },
  msg: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontSize: '0.95rem',
    color: 'rgba(255,250,242,0.15)',
    transition: 'color 0.6s ease',
  },
  msgVisible: {
    color: 'rgba(255,250,242,0.5)',
  },
}
