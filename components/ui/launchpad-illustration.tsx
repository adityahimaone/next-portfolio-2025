'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export const LaunchpadIllustration = () => {
  const [activePad, setActivePad] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePad((prev) => (prev + 1) % 16)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="perspective-1000 relative h-64 w-64">
      <motion.div
        className="absolute right-0 bottom-0 -rotate-12 rotate-x-12 rotate-y-[-12deg] transform cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, x: 50, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -12 }}
        transition={{ duration: 1, delay: 0.8 }}
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        whileHover={{ scale: 1.05, rotate: -10 }}
      >
        {/* --- LAUNCHPAD GRID --- */}
        <div className="flex h-64 w-64 flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
          {/* Top Controls */}
          <div className="mb-1 flex items-center justify-between px-1">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full border border-zinc-700 bg-zinc-800"
                ></div>
              ))}
            </div>
            <div className="h-1.5 w-10 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full bg-cyan-500"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* The Grid */}
          <div className="grid flex-1 grid-cols-4 grid-rows-4 gap-2">
            {[...Array(16)].map((_, i) => {
              const isActive = i === activePad
              const isColored = [0, 5, 10, 15].includes(i)

              return (
                <div
                  key={i}
                  className={`rounded-sm shadow-sm transition-all duration-150 ${
                    isActive
                      ? 'scale-95 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                      : isColored
                        ? 'border border-zinc-600 bg-zinc-700 dark:bg-zinc-700'
                        : 'border border-zinc-700 bg-zinc-800 dark:bg-zinc-800'
                  } `}
                ></div>
              )
            })}
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 -z-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>
      </motion.div>
    </div>
  )
}
