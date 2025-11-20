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
import { Slider } from './slider'
import { useAudio } from '@/lib/audio-context'
import useClickOutside from '@/hooks/useClickOutside'

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
          className="fixed right-5 bottom-5 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex items-center space-x-2 rounded-full bg-zinc-100/80 p-2 backdrop-blur-md dark:bg-zinc-800/80"
            whileHover={{ scale: 1.05 }}
            layout
          >
            <div className="relative">
              {isPlaying && (
                <>
                  {/* Rotating Dashed Ring */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="border-primary/40 dark:border-primary-light/40 absolute -inset-2 -z-10 rounded-full border border-dashed"
                  />

                  {/* Ripple 1 */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="bg-primary/20 dark:bg-primary-light/20 absolute inset-0 -z-20 rounded-full"
                  />

                  {/* Ripple 2 (Delayed) */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: 1,
                    }}
                    className="bg-primary/20 dark:bg-primary-light/20 absolute inset-0 -z-20 rounded-full"
                  />
                </>
              )}
              <motion.button
                onClick={togglePlay}
                className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white"
                whileTap={{ scale: 0.95 }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
              </motion.button>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="flex items-center space-x-2 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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

                    <Slider
                      defaultValue={[0.5]}
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={1}
                      step={0.01}
                      className="w-24"
                    />
                  </motion.div>

                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <div
                      className={`vinyl-record flex h-6 w-6 items-center justify-center overflow-hidden rounded-full ${isPlaying ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '4s' }}
                    >
                      <Disc3 size={24} className="text-primary" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
