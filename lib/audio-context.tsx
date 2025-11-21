'use client'

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react'

interface AudioContextType {
  isPlaying: boolean
  togglePlay: () => void
  isMuted: boolean
  toggleMute: () => void
  volume: number
  setVolume: (volume: number) => void
  currentTrack: string
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentTrack, setCurrentTrack] = useState('The Portfolio Mix')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioSource = '/music/edge-of-desire-sunrise-mix.weba'

  useEffect(() => {
    const audio = new Audio(audioSource)
    audioRef.current = audio
    audio.preload = 'auto'
    audio.loop = true
    audio.volume = volume

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setCurrentTrack(
              'Jonas Blue & Malive - Edge Of Desire (Sunrise Mix)',
            )
          })
          .catch((error) => {
            console.error('Playback failed:', error)
            setIsPlaying(false)
          })
      }
    }
  }

  const toggleMute = () => setIsMuted((prev) => !prev)

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        isMuted,
        toggleMute,
        volume,
        setVolume,
        currentTrack,
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
