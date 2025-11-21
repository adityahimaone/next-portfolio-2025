'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Slider } from './slider'
import { useAudio } from '@/lib/audio-context'
import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const { isPlaying, togglePlay, isMuted, toggleMute, volume, setVolume } =
    useAudio()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, () => {
    setIsHovered(false)
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0])
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed right-8 bottom-8 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-200 p-1 shadow-[0_4px_0_rgb(161,161,170),0_5px_10px_rgba(0,0,0,0.2)] transition-all dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-[0_4px_0_rgb(39,39,42),0_5px_10px_rgba(0,0,0,0.5)]"
            layout
          >
            {/* Play/Pause Button */}
            <div className="relative">
              <button
                onClick={togglePlay}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-md border-2 transition-all active:scale-95',
                  isPlaying
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'border-zinc-400/50 bg-zinc-300/50 text-zinc-600 dark:border-zinc-600/50 dark:bg-zinc-800/50 dark:text-zinc-400',
                )}
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                )}
              </button>
              {/* Status LED */}
              <div
                className={cn(
                  'absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-zinc-200 transition-colors dark:border-zinc-900',
                  isPlaying
                    ? 'bg-green-500 shadow-[0_0_5px_#22c55e]'
                    : 'bg-red-900',
                )}
              />
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="flex items-center gap-3 overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Divider */}
                  <div className="h-8 w-px bg-zinc-400 dark:bg-zinc-700" />

                  {/* Volume Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <Slider
                      defaultValue={[0.5]}
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={1}
                      step={0.01}
                      className="w-20"
                    />
                  </div>

                  {/* Signal Indicator */}
                  <div className="flex h-4 items-end gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-sm bg-amber-500/50"
                        animate={{
                          height: isPlaying ? [4, 12, 6, 10, 4] : 4,
                          opacity: isPlaying ? 1 : 0.3,
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.1,
                          repeatType: 'reverse',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
