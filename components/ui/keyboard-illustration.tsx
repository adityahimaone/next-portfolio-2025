'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export const KeyboardIllustration = () => {
  const [activeKey, setActiveKey] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly press a key every so often
      const key = Math.floor(Math.random() * 10)
      setActiveKey(key)
      setTimeout(() => setActiveKey(null), 200)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="perspective-1000 relative h-40 w-80">
      <motion.div
        className="absolute top-0 left-0 rotate-12 rotate-x-12 rotate-y-12 transform cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, x: -50, rotate: 12 }}
        animate={{ opacity: 1, x: 0, rotate: 12 }}
        transition={{ duration: 1, delay: 0.5 }}
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        whileHover={{ scale: 1.05, rotate: 10 }}
      >
        {/* --- MIDI KEYBOARD --- */}
        <div className="relative z-10 flex h-24 w-72 flex-col overflow-hidden rounded-xl border-b-4 border-zinc-700 bg-zinc-800 shadow-2xl dark:border-zinc-600 dark:bg-zinc-800">
          {/* Top Control Bar */}
          <div className="flex h-6 w-full items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="ml-auto flex gap-1">
              <div className="h-1 w-8 overflow-hidden rounded-full bg-zinc-700">
                <motion.div
                  className="h-full bg-green-500"
                  animate={{ width: ['0%', '100%', '50%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
          {/* Keys Container */}
          <div className="flex w-full flex-1">
            {/* White Keys */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`relative flex-1 border-r border-zinc-300 bg-zinc-100 last:border-r-0 dark:border-zinc-400 dark:bg-zinc-200 ${activeKey === i ? 'bg-zinc-200 dark:bg-zinc-300' : ''}`}
              >
                <motion.div
                  className="absolute inset-0 origin-top bg-black/5"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: activeKey === i ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                />

                {/* Black Keys */}
                {[0, 1, 3, 4, 6, 7, 8].includes(i) && (
                  <div className="pointer-events-none absolute top-0 -right-1.5 z-20 h-10 w-3 rounded-b-sm bg-zinc-900 shadow-md dark:bg-black"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 -z-10 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
      </motion.div>
    </div>
  )
}
