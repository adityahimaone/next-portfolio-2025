'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Music, Code2, Zap, Activity, Disc3, Cpu } from 'lucide-react'

const loadingSteps = [
  { text: 'Initializing Core Systems...', icon: Cpu },
  { text: 'Loading Audio Engine...', icon: Music },
  { text: 'Compiling Shaders...', icon: Zap },
  { text: 'Connecting to Matrix...', icon: Activity },
  { text: 'Ready...', icon: Code2 },
]

export function Preloader() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 200) // Change step every 200ms

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Central Visual - Morphing/Pulsing */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
              rotate: 360,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700"
            animate={{ rotate: -180 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            key={stepIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 text-zinc-900 dark:text-white"
          >
            {(() => {
              const Icon = loadingSteps[stepIndex].icon
              return <Icon size={40} strokeWidth={1.5} />
            })()}
          </motion.div>

          {/* Glow effect */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 opacity-0 blur-2xl dark:opacity-20" />
        </div>

        {/* Progress Bar & Text */}
        <div className="flex w-64 flex-col gap-2">
          <div className="flex justify-between font-mono text-xs text-zinc-500">
            <span>SYSTEM_BOOT</span>
            <span>{Math.min((stepIndex + 1) * 20, 100)}%</span>
          </div>

          <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <motion.div
              className="h-full bg-zinc-900 dark:bg-white"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min((stepIndex + 1) * 20, 100)}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center font-mono text-xs text-zinc-400"
              >
                {loadingSteps[stepIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Equalizer / Waveform */}
      <div className="absolute bottom-12 flex h-12 items-end gap-1 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-zinc-400 dark:bg-zinc-600"
            animate={{
              height: [10, Math.random() * 40 + 10, 10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 h-4 w-4 border-t border-l border-zinc-300 dark:border-zinc-700" />
      <div className="absolute top-8 right-8 h-4 w-4 border-t border-r border-zinc-300 dark:border-zinc-700" />
      <div className="absolute bottom-8 left-8 h-4 w-4 border-b border-l border-zinc-300 dark:border-zinc-700" />
      <div className="absolute right-8 bottom-8 h-4 w-4 border-r border-b border-zinc-300 dark:border-zinc-700" />
    </motion.div>
  )
}
