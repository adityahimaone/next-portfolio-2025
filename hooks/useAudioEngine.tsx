'use client'

import { useRef, useCallback, useState } from 'react'

type ToneModule = typeof import('tone')

interface AudioEngineState {
  isLoaded: boolean
  isStarted: boolean
}

export function useAudioEngine() {
  const toneRef = useRef<ToneModule | null>(null)
  const [state, setState] = useState<AudioEngineState>({
    isLoaded: false,
    isStarted: false,
  })

  const loadAudioEngine = useCallback(async () => {
    if (toneRef.current) return toneRef.current

    try {
      const Tone = await import('tone')
      toneRef.current = Tone
      setState((prev) => ({ ...prev, isLoaded: true }))
      return Tone
    } catch (error) {
      console.error('Failed to load Tone.js:', error)
      return null
    }
  }, [])

  const startAudio = useCallback(async () => {
    if (state.isStarted) return true

    const Tone = toneRef.current || (await loadAudioEngine())
    if (!Tone) return false

    try {
      await Tone.start()
      Tone.Transport.start()
      setState((prev) => ({ ...prev, isStarted: true }))
      return true
    } catch (error) {
      console.error('Failed to start audio context:', error)
      return false
    }
  }, [state.isStarted, loadAudioEngine])

  return {
    toneRef,
    isLoaded: state.isLoaded,
    isStarted: state.isStarted,
    loadAudioEngine,
    startAudio,
  }
}
