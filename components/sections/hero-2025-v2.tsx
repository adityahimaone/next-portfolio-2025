'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Play, Pause, SkipForward, Disc } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import { useAudio } from '@/lib/audio-context'
import { Monoton, Syne } from 'next/font/google'

const monoton = Monoton({ weight: '400', subsets: ['latin'] })
const syne = Syne({ weight: ['700', '800'], subsets: ['latin'] })

export function HeroSection2025v2() {
  const { isPlaying, togglePlay, currentTrack } = useAudio()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 transition-colors dark:bg-zinc-950"
    >
      {/* Amp Cabinet Background (Grille) */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] opacity-10 dark:bg-[radial-gradient(#333_1.5px,transparent_1.5px)] dark:opacity-50"
          style={{ backgroundSize: '4px 4px' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay dark:opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-20 container mx-auto mt-24 flex flex-col items-center px-4 text-center md:px-6"
      >
        {/* Content Wrapper */}
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-8 flex items-center gap-3 rounded-full border border-zinc-200 bg-white/40 px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/40 dark:text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            LIVE SESSION
          </motion.div>

          {/* Brand Logo (The Name) */}
          <div className={`mb-10 flex flex-col items-center ${syne.className}`}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-center text-[13vw] leading-[0.85] font-extrabold tracking-tighter text-zinc-900 italic drop-shadow-sm md:text-[10vw] lg:text-[8vw] dark:text-white dark:drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]"
            >
              <span className="block bg-linear-to-b from-zinc-700 via-zinc-900 to-black bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-400">
                ADITYA
              </span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-primary/80 text-[5vw] font-bold tracking-[0.5em] md:text-[3vw] lg:text-[2.5vw]"
            >
              HIMAONE
            </motion.h1>
          </div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mb-10 max-w-2xl text-center text-base font-light text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400"
          >
            Orchestrating code and rhythm into immersive digital experiences.
            <br className="hidden sm:block" /> Frontend Developer & Audio
            Enthusiast.
          </motion.p>

          {/* Player Controls / CTA */}
          {/* Player Controls / CTA - Hardware Style */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full max-w-[90vw] items-center gap-4 rounded-lg border-t border-white/20 bg-zinc-200 p-2 shadow-2xl sm:max-w-lg sm:gap-6 sm:p-3 dark:border-white/5 dark:bg-zinc-900"
          >
            {/* Inset Shadow for depth */}
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_4px_10px_rgba(0,0,0,0.5)]" />

            <Magnetic intensity={0.2}>
              <button
                onClick={togglePlay}
                className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-zinc-100 to-zinc-300 shadow-[0_2px_5px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] transition-all active:scale-95 active:shadow-inner sm:h-14 sm:w-14 dark:from-zinc-700 dark:to-zinc-800 dark:shadow-[0_2px_5px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.5)]"
              >
                <div className="bg-primary/5 absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                {isPlaying ? (
                  <Pause
                    fill="currentColor"
                    className="text-zinc-700 dark:text-zinc-200"
                  />
                ) : (
                  <Play
                    fill="currentColor"
                    className="ml-1 text-zinc-700 dark:text-zinc-200"
                  />
                )}
                {/* LED Indicator on button */}
                <div
                  className={`absolute top-2 right-2 h-1.5 w-1.5 rounded-full transition-colors ${isPlaying ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-zinc-400 dark:bg-zinc-600'}`}
                />
              </button>
            </Magnetic>

            {/* LCD Display */}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1 rounded border-b border-white/10 bg-zinc-800 p-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] dark:bg-black">
              <div className="flex w-full items-center justify-between px-1">
                <span className="text-[7px] font-bold tracking-widest text-zinc-500 uppercase">
                  STATUS: {isPlaying ? 'PLAYING' : 'STANDBY'}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-1 rounded-full ${isPlaying ? 'animate-pulse bg-red-500' : 'bg-zinc-700'}`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center gap-3 overflow-hidden px-1">
                <div className="flex h-3 shrink-0 items-end gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-[1px] bg-amber-500/80"
                      animate={{
                        height: isPlaying ? [2, 10, 5, 8, 2] : 2,
                        opacity: isPlaying ? 1 : 0.5,
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <motion.div
                    className="flex w-fit font-mono text-xs whitespace-nowrap text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] sm:text-sm"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: Math.max(8, currentTrack.length * 0.2),
                    }}
                  >
                    <span className="mr-8">{currentTrack}</span>
                    <span className="mr-8">{currentTrack}</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="h-8 w-px shrink-0 bg-zinc-300 dark:bg-zinc-800" />

            <Magnetic intensity={0.2}>
              <a
                href="#projects"
                className="flex h-10 shrink-0 items-center gap-2 rounded bg-zinc-300 px-3 text-xs font-bold text-zinc-700 shadow-[0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner sm:px-4 dark:bg-zinc-800 dark:text-zinc-300 dark:shadow-[0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)]"
              >
                <span className="hidden sm:inline">TRACKS</span>
                <SkipForward size={14} />
              </a>
            </Magnetic>
          </motion.div>

          {/* Decorative "New Release" Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="absolute -top-4 -right-4 rotate-12 transform border-2 border-white/20 bg-red-600 px-4 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-lg md:top-10 md:-right-10"
          >
            New Release
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
