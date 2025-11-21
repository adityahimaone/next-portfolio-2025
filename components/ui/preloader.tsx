'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Music, Code2, Zap, Activity, Disc3, Cpu } from 'lucide-react'

const loadingSteps = [
  { text: 'WARMING TUBES...', icon: Zap },
  { text: 'CALIBRATING GAIN...', icon: Activity },
  { text: 'LOADING SAMPLES...', icon: Disc3 },
  { text: 'SYNCING RHYTHM...', icon: Music },
  { text: 'SYSTEM READY', icon: Code2 },
]

export function Preloader() {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -50,
        transition: { duration: 0.8, ease: 'easeInOut' },
      }}
      className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
    >
      {/* Background Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay dark:opacity-20" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(39,50,129,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(39,50,129,0.15)_0%,transparent_70%)]" />

      {/* Pre-Amp Unit Container - Full Screen Mode */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 h-full w-full"
      >
        {/* Case - Full Screen */}
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-zinc-200 shadow-2xl dark:bg-zinc-900">
          {/* Screw Holes - Corners */}
          <div className="absolute top-4 left-4 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-800">
            <div className="h-0.5 w-2 rotate-45 bg-zinc-500 dark:bg-zinc-600"></div>
          </div>
          <div className="absolute top-4 right-4 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-800">
            <div className="h-0.5 w-2 rotate-12 bg-zinc-500 dark:bg-zinc-600"></div>
          </div>
          <div className="absolute bottom-4 left-4 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-800">
            <div className="h-0.5 w-2 -rotate-45 bg-zinc-500 dark:bg-zinc-600"></div>
          </div>
          <div className="absolute right-4 bottom-4 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-800">
            <div className="h-0.5 w-2 rotate-90 bg-zinc-500 dark:bg-zinc-600"></div>
          </div>

          {/* Faceplate - Full Height Flex */}
          <div className="flex flex-1 flex-col justify-center gap-12 border-t border-white/20 bg-linear-to-b from-zinc-100 to-zinc-300 p-8 shadow-inner md:gap-20 md:p-16 dark:border-white/5 dark:from-zinc-800 dark:to-zinc-900">
            {/* Top Row: Branding & Power */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-black tracking-tighter text-zinc-800 italic md:text-5xl dark:text-zinc-200">
                    ADITYA <span className="text-primary">HIMAONE</span>
                  </h1>
                  <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase md:text-sm dark:text-zinc-500">
                    Pre-Amplifier
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-500">
                  POWER
                </span>
                <div className="relative h-6 w-6">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] dark:shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
                  <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-white/50" />
                </div>
              </div>
            </div>

            {/* Middle Row: Meters & Display */}
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-24">
              {/* VU Meter (LED Style) */}
              <div className="w-full flex-1">
                <div className="mb-3 flex justify-between">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500">
                    INPUT LEVEL
                  </span>
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="flex h-6 w-full gap-1 rounded-sm border border-zinc-400 bg-zinc-300 p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] md:h-8 dark:border-zinc-700 dark:bg-black dark:shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                  {[...Array(40)].map((_, i) => {
                    const isActive = (i / 40) * 100 < progress
                    let colorClass = 'bg-green-500'
                    if (i > 25) colorClass = 'bg-yellow-500'
                    if (i > 35) colorClass = 'bg-red-500'

                    return (
                      <div
                        key={i}
                        className={cn(
                          'flex-1 rounded-[1px] transition-opacity duration-75',
                          colorClass,
                          isActive
                            ? 'opacity-100 shadow-[0_0_5px_currentColor]'
                            : 'bg-zinc-400 opacity-20 dark:bg-zinc-800',
                        )}
                      />
                    )
                  })}
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-zinc-500 dark:text-zinc-600">
                  <span>-dB</span>
                  <span>-20</span>
                  <span>-10</span>
                  <span>-5</span>
                  <span>0</span>
                  <span className="text-red-700 dark:text-red-900">+3</span>
                </div>
              </div>

              {/* Digital Display */}
              <div className="w-full shrink-0 lg:w-80">
                <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded border-4 border-zinc-400 bg-zinc-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] dark:border-zinc-700 dark:bg-black dark:shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20"></div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stepIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="z-0 px-4 text-center font-mono text-lg tracking-wider text-amber-500 md:text-xl"
                      style={{ textShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }}
                    >
                      {loadingSteps[stepIndex].text}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Row: Knobs */}
            <div className="flex justify-center gap-8 border-t border-zinc-300 pt-8 md:gap-24 md:pt-12 dark:border-white/5">
              {['GAIN', 'BASS', 'TREBLE', 'OUTPUT'].map((label, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-400 bg-zinc-200 shadow-xl md:h-24 md:w-24 dark:border-zinc-600 dark:bg-zinc-800">
                    <motion.div
                      className="absolute top-2 h-6 w-1.5 origin-bottom rounded-full bg-zinc-800 md:h-10 dark:bg-white"
                      animate={{ rotate: progress * 2.7 - 135 }} // Rotate from -135 to +135 based on progress
                      style={{ transformOrigin: '50% 100%' }}
                    />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-zinc-600 dark:text-zinc-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
