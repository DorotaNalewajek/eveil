export function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25]
    const times = [0, 0.18, 0.36, 0.54, 0.78, 1.0]
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i])
      gain.gain.setValueAtTime(0, ctx.currentTime + times[i])
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + times[i] + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + 0.7)
      osc.start(ctx.currentTime + times[i])
      osc.stop(ctx.currentTime + times[i] + 0.8)
    })
  } catch (_) {}
}
