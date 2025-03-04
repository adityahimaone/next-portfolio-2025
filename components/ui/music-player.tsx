'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  PlayIcon,
  PauseIcon,
  VolumeIcon,
  Volume2Icon,
  Disc3,
} from 'lucide-react'

export function MusicPlayer() {
  // Start as NOT playing until user interacts
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioError, setAudioError] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioSourceRef = useRef<string>('/music/attention.mp3')

  // Initialize audio element
  useEffect(() => {
    // Create audio element
    const audio = new Audio()
    audioRef.current = audio

    // Set basic properties
    audio.preload = 'auto'
    audio.loop = true
    audio.volume = volume

    // Set the direct source instead of using blob URL for simplicity
    audio.src = audioSourceRef.current

    // Add event listeners with proper error handling
    const handleCanPlayThrough = () => {
      console.log('Audio loaded successfully')
      setAudioLoaded(true)
    }

    const handleError = (e: Event) => {
      const error = (e.target as HTMLMediaElement).error
      console.error(
        'Audio error:',
        error
          ? `code: ${error.code}, message: ${error.message}`
          : 'Unknown error',
      )
      setAudioError(true)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('error', handleError)

    // Show player after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Cleanup
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('error', handleError)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }

      clearTimeout(timer)
    }
  }, [])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !audioLoaded) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error('Playback failed:', error)
              // Try one more time with user interaction
              const retryPlay = () => {
                if (audioRef.current) {
                  audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch((e) => {
                      console.error('Retry playback failed:', e)
                      setAudioError(true)
                    })
                }
              }

              // Immediately retry since we're in a user interaction context
              retryPlay()
            })
        }
      }
    } catch (error) {
      console.error('Toggle play error:', error)
      setAudioError(true)
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Show a minimal player even if there's an error (to allow retry)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed right-6 bottom-24 z-50"
        >
          <motion.div
            className={`flex items-center space-x-2 rounded-full ${audioError ? 'bg-red-100/80 dark:bg-red-900/50' : 'bg-zinc-100/80 dark:bg-zinc-800/80'} p-2 backdrop-blur-md`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.button
              onClick={togglePlay}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${
                audioError ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'
              }`}
              whileTap={{ scale: 0.95 }}
              disabled={!audioLoaded && !audioError}
              title={
                audioError
                  ? 'Retry playing audio'
                  : isPlaying
                    ? 'Pause'
                    : 'Play'
              }
            >
              {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            </motion.button>

            {!audioError && (
              <>
                <div className="flex items-center space-x-2 px-2">
                  <motion.button
                    onClick={toggleMute}
                    whileTap={{ scale: 0.95 }}
                    className="text-zinc-700 dark:text-zinc-300"
                  >
                    {isMuted ? (
                      <VolumeIcon size={18} />
                    ) : (
                      <Volume2Icon size={18} />
                    )}
                  </motion.button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-2 w-20 cursor-pointer appearance-none rounded-full bg-zinc-300 dark:bg-zinc-600"
                    style={{
                      background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${volume * 100}%, var(--zinc-300) ${volume * 100}%, var(--zinc-300) 100%)`,
                    }}
                  />
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className={`vinyl-record vinyl-lines h-6 w-6 rounded-full bg-zinc-900 dark:bg-zinc-300 ${isPlaying ? 'animate-spin' : ''}`}
                  >
                    <Disc3 size={24} className="text-primary" />
                  </div>
                </div>
              </>
            )}

            {audioError && (
              <span className="px-2 text-xs text-red-600 dark:text-red-400">
                Audio unavailable
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
