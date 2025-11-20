'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import { cn } from '@/lib/utils'
import { Sliders, Music, Zap, Power } from 'lucide-react'

// Data Structure
const mixerData = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    type: 'fader',
    channels: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 95 },
      { name: 'JS', level: 95 },
      { name: 'TS', level: 90 },
      { name: 'GO', level: 60 },
      { name: 'SWIFT', level: 50 },
    ],
  },
  {
    id: 'frameworks',
    label: 'FRAMEWORKS',
    type: 'knob',
    channels: [
      { name: 'REACT', level: 95 },
      { name: 'NEXT', level: 92 },
      // { name: 'TAILWIND', level: 98 },
      { name: 'REMIX', level: 70 },
      { name: 'JQUERY', level: 85 },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS & FX',
    type: 'knob',
    channels: [
      { name: 'VS CODE', level: 99 },
      { name: 'FIGMA', level: 85 },
      { name: 'GIT', level: 90 },
      { name: 'MOTION', level: 90 },
    ],
  },
]

// --- Components ---

const Screw = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex h-3 w-3 items-center justify-center rounded-full border border-zinc-500 bg-zinc-400 shadow-inner',
      className,
    )}
  >
    <div className="h-0.5 w-full rotate-45 bg-zinc-600" />
    <div className="absolute h-0.5 w-full -rotate-45 bg-zinc-600" />
  </div>
)

const Knob = ({ value, label }: { value: number; label: string }) => {
  const minDeg = -135
  const maxDeg = 135
  const startDeg = (value / 100) * 270 - 135
  const rotation = useMotionValue(minDeg)

  useEffect(() => {
    const controls = animate(rotation, startDeg, {
      duration: 1.5,
      type: 'spring',
      bounce: 0.2,
      delay: 0.5,
    })
    return () => controls.stop()
  }, [startDeg])

  const handlePan = (_: any, info: { delta: { y: number } }) => {
    const current = rotation.get()
    // Drag up (negative y) -> increase rotation (positive delta)
    const delta = -info.delta.y * 2
    const newRot = Math.min(maxDeg, Math.max(minDeg, current + delta))
    rotation.set(newRot)
  }

  return (
    <div className="flex touch-none flex-col items-center gap-3">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.1)]">
        {/* Ticks */}
        {[...Array(11)].map((_, i) => {
          const rot = (i / 10) * 270 - 135
          return (
            <div
              key={i}
              className="absolute h-full w-full"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              <div className="absolute top-1 left-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-zinc-600" />
            </div>
          )
        })}

        {/* The Knob */}
        <motion.div
          className="relative h-14 w-14 cursor-grab rounded-full border border-zinc-950 bg-linear-to-b from-zinc-700 to-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] active:cursor-grabbing"
          style={{ rotate: rotation }}
          onPan={handlePan}
        >
          {/* Indicator Line */}
          <div className="bg-primary absolute top-1.5 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full shadow-[0_0_5px_rgba(var(--primary),0.8)]" />
        </motion.div>
      </div>
      <span className="text-[10px] font-bold tracking-widest text-zinc-500 select-none">
        {label}
      </span>
    </div>
  )
}

const Fader = ({ value, label }: { value: number; label: string }) => {
  // Track height 192px (h-48) - Padding 32px (py-4) - Cap 48px (h-12) = 112px travel
  const maxTravel = 112
  const initialY = -((value / 100) * maxTravel)
  const y = useMotionValue(0)

  useEffect(() => {
    const controls = animate(y, initialY, {
      duration: 1.2,
      ease: 'easeOut',
      delay: 0.2,
    })
    return () => controls.stop()
  }, [initialY])

  return (
    <div className="flex h-full touch-none flex-col items-center gap-3">
      <div className="relative flex h-48 w-12 justify-center rounded-lg border border-zinc-800/50 bg-zinc-900/50 py-4 shadow-inner">
        {/* Track Line */}
        <div className="absolute top-4 bottom-4 w-1 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />

        {/* Ticks */}
        <div className="absolute top-4 bottom-4 left-2 flex flex-col justify-between py-1">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="h-px w-1.5 bg-zinc-700" />
          ))}
        </div>

        {/* The Fader Cap */}
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 flex h-12 w-8 -translate-x-1/2 cursor-grab items-center justify-center rounded border-t border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 shadow-[0_4px_6px_rgba(0,0,0,0.5)] active:cursor-grabbing"
          style={{ y }}
          drag="y"
          dragConstraints={{ top: -maxTravel, bottom: 0 }}
          dragElastic={0}
          dragMomentum={false}
        >
          <div className="mb-1 h-0.5 w-full bg-zinc-950/50" />
          <div className="h-0.5 w-full bg-zinc-950/50" />
          <div className="mt-1 h-0.5 w-full bg-zinc-950/50" />

          {/* LED on fader */}
          <div className="bg-primary absolute top-1/2 left-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
        </motion.div>
      </div>
      <span className="text-[10px] font-bold tracking-widest text-zinc-500 select-none">
        {label}
      </span>
    </div>
  )
}

const VUMeter = ({ isOn }: { isOn: boolean }) => {
  return (
    <div className="flex h-32 items-end gap-1 rounded border border-zinc-800 bg-zinc-900/80 p-2 shadow-inner">
      {[...Array(2)].map((_, ch) => (
        <div key={ch} className="flex w-3 flex-col gap-0.5">
          {[...Array(15)].map((_, i) => {
            const isRed = i > 12
            const isYellow = i > 9 && i <= 12
            const colorClass = isRed
              ? 'bg-red-500'
              : isYellow
                ? 'bg-yellow-500'
                : 'bg-green-500'

            return (
              <motion.div
                key={i}
                className={cn(
                  'h-1.5 w-full rounded-[1px] opacity-20',
                  colorClass,
                )}
                animate={isOn ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.1 }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: Math.random() * 0.5,
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function SkillsMixer() {
  const [isOn, setIsOn] = useState(true)

  return (
    <section id="skills" className="overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-200/50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
          >
            <Sliders className="h-4 w-4" />
            <span>AUDIO ENGINEERING</span>
          </motion.div>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 sm:text-5xl dark:text-white">
            Sonic Arsenal
          </h2>
        </div>

        {/* The Mixer Board */}
        <div className="relative mx-auto max-w-6xl rounded-3xl bg-zinc-200 p-4 shadow-2xl dark:bg-zinc-900">
          {/* Metallic Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />

          {/* Inner Casing */}
          <div className="relative rounded-2xl border border-zinc-400/50 bg-zinc-300 p-6 shadow-inner md:p-10 dark:border-zinc-800 dark:bg-zinc-950">
            {/* Screws */}
            <Screw className="absolute top-4 left-4" />
            <Screw className="absolute top-4 right-4" />
            <Screw className="absolute bottom-4 left-4" />
            <Screw className="absolute right-4 bottom-4" />

            {/* Top Panel: Branding & Power */}
            <div className="mb-12 flex items-center justify-between border-b border-zinc-400/30 pb-6 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="hidden h-12 w-12 items-center justify-center rounded border border-zinc-700 bg-zinc-900 shadow-lg sm:flex">
                  <Music className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-widest text-zinc-700 uppercase dark:text-zinc-300">
                    MIX-MASTER <span className="text-primary">2025</span>
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 uppercase">
                    Professional Audio/Code Interface
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-zinc-500 bg-zinc-400/50 p-2 px-3">
                  {/* LED */}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full transition-all duration-300',
                        isOn
                          ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
                          : 'bg-red-900/30',
                      )}
                    />
                    <span className="text-[8px] font-bold tracking-wider text-zinc-600">
                      PWR
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="h-8 w-px bg-zinc-800" />

                  {/* Switch */}
                  <button
                    onClick={() => setIsOn(!isOn)}
                    className={cn(
                      'relative flex h-12 w-8 cursor-pointer flex-col items-center justify-between overflow-hidden rounded border border-zinc-800 bg-zinc-950 py-1 shadow-[inset_0_0_5px_rgba(0,0,0,1)] transition-all',
                    )}
                  >
                    {/* ON State (Top) */}
                    <div
                      className={cn(
                        'flex h-4 w-6 items-center justify-center rounded-[1px] transition-all duration-200',
                        isOn
                          ? 'translate-y-0.5 bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                          : 'bg-zinc-900 opacity-50 shadow-inner',
                      )}
                    >
                      <span className="text-[8px] font-bold text-zinc-400">
                        |
                      </span>
                    </div>

                    {/* OFF State (Bottom) */}
                    <div
                      className={cn(
                        'flex h-4 w-6 items-center justify-center rounded-[1px] transition-all duration-200',
                        !isOn
                          ? '-translate-y-0.5 bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                          : 'bg-zinc-900 opacity-50 shadow-inner',
                      )}
                    >
                      <span className="text-[8px] font-bold text-zinc-400">
                        O
                      </span>
                    </div>
                  </button>
                </div>

                <div className="hidden md:block">
                  <VUMeter isOn={isOn} />
                </div>
              </div>
            </div>

            {/* Mixer Sections */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Section 1: Faders (Languages) */}
              <div className="rounded-xl border border-zinc-300 bg-zinc-200/50 p-6 shadow-inner lg:col-span-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-sm font-black tracking-widest text-zinc-400 uppercase">
                    Channel 1: Languages
                  </h4>
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                {/* Desktop */}
                <div className="hidden flex-wrap justify-between gap-2 sm:flex">
                  {mixerData[0].channels.map((skill) => (
                    <Fader
                      key={skill.name}
                      value={isOn ? skill.level : 0}
                      label={skill.name}
                    />
                  ))}
                </div>
                {/* Mobile */}
                <div className="flex flex-wrap justify-between gap-2 sm:hidden">
                  {mixerData[0].channels.slice(-4).map((skill) => (
                    <Fader
                      key={skill.name}
                      value={isOn ? skill.level : 0}
                      label={skill.name}
                    />
                  ))}
                </div>
              </div>

              {/* Section 2: Knobs (Frameworks & Tools) */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-7">
                {/* Frameworks */}
                <div className="rounded-xl border border-zinc-300 bg-zinc-200/50 p-6 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-sm font-black tracking-widest text-zinc-400 uppercase">
                      EQ: Frameworks
                    </h4>
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {mixerData[1].channels.map((skill) => (
                      <Knob
                        key={skill.name}
                        value={isOn ? skill.level : 0}
                        label={skill.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="rounded-xl border border-zinc-300 bg-zinc-200/50 p-6 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-sm font-black tracking-widest text-zinc-400 uppercase">
                      FX: Tools
                    </h4>
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {mixerData[2].channels.map((skill) => (
                      <Knob
                        key={skill.name}
                        value={isOn ? skill.level : 0}
                        label={skill.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="mt-12 border-t border-zinc-400/30 pt-4 text-center dark:border-zinc-800">
              <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                Designed & Engineered by Aditya Himaone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
