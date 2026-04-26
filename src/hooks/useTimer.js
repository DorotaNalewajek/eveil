import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds = 3600) {
  const [seconds, setSeconds]   = useState(initialSeconds)
  const [running, setRunning]   = useState(false)
  const intervalRef             = useRef(null)

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start = useCallback(() => {
    setSeconds(initialSeconds)
    setRunning(true)
  }, [initialSeconds])

  const stop = useCallback(() => setRunning(false), [])

  const elapsed  = initialSeconds - seconds
  const minutes  = Math.floor(seconds / 60)
  const secs     = seconds % 60
  const display  = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return { seconds, display, elapsed, running, start, stop }
}
