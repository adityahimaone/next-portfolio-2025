'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const Screw = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex h-2 w-2 items-center justify-center rounded-full border border-zinc-500 bg-zinc-400 shadow-inner',
      className,
    )}
  >
    <div className="h-0.5 w-full rotate-45 bg-zinc-600" />
    <div className="absolute h-0.5 w-full -rotate-45 bg-zinc-600" />
  </div>
)

export const LaunchpadIllustration = () => {
  const [activePad, setActivePad] = useState(0)

  // Colorful palette for pads
  const padColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-fuchsia-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-sky-500',
    'bg-amber-500',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePad((prev) => (prev + 1) % 16)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="perspective-1000 relative h-64 w-64">
      <motion.div
        className="absolute right-0 bottom-0 -rotate-12 rotate-x-12 -rotate-y-12 transform cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, x: 50, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -12 }}
        transition={{ duration: 1, delay: 0.8 }}
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        whileHover={{ scale: 1.05, rotate: -10 }}
      >
        {/* --- LAUNCHPAD GRID --- */}
        <div className="relative flex h-64 w-64 flex-col rounded-xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-3xl">
          {/* Screws */}
          <Screw className="absolute top-1 left-1 z-20" />
          <Screw className="absolute top-1 right-1 z-20" />
          <Screw className="absolute bottom-1 left-1 z-20" />
          <Screw className="absolute right-1 bottom-1 z-20" />

          {/* Inner Casing */}
          <div className="flex h-full w-full flex-col gap-2 rounded-lg border border-white/5 bg-black/80 p-2 shadow-inner">
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
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* The Grid */}
            <div className="grid flex-1 grid-cols-4 grid-rows-4 gap-2">
              {[...Array(16)].map((_, i) => {
                const isActive = i === activePad
                const color = padColors[i]

                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: isActive ? 0.95 : 1,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.15 }}
                    className={`rounded-md shadow-lg transition-all duration-150 ${
                      color
                    } ${
                      isActive
                        ? 'shadow-[0_0_15px_rgba(255,255,255,0.6)] brightness-125'
                        : 'brightness-90'
                    }`}
                  ></motion.div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="bg-secondary/40 absolute -right-6 -bottom-6 -z-10 h-40 w-40 animate-pulse rounded-full blur-3xl"></div>
        <div
          className="bg-accent/40 absolute -top-6 -left-6 -z-10 h-36 w-36 animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </motion.div>
    </div>
  )
}
