// A quiet, filtered cabin-like rumble generated locally with Web Audio.
export function createAmbientAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null
  const context = new AudioContext()
  const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate)
  const samples = buffer.getChannelData(0)
  let brown = 0
  for (let i = 0; i < samples.length; i++) {
    brown = (brown + (Math.random() * 2 - 1) * 0.02) / 1.02
    samples[i] = brown * 3.5
  }
  const source = context.createBufferSource()
  source.buffer = buffer
  source.loop = true
  const filter = context.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 420
  const gain = context.createGain()
  gain.gain.setValueAtTime(0, context.currentTime)
  gain.gain.linearRampToValueAtTime(0.16, context.currentTime + 2)
  source.connect(filter).connect(gain).connect(context.destination)
  source.start()
  context.resume().catch(() => {})
  let stopped = false
  return {
    stop() {
      if (stopped) return
      stopped = true
      gain.gain.cancelScheduledValues(context.currentTime)
      gain.gain.setTargetAtTime(0, context.currentTime, 0.08)
      setTimeout(() => {
        source.stop()
        context.close().catch(() => {})
      }, 350)
    }
  }
}
