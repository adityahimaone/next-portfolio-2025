'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Play, Pause, SkipForward, Disc } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import { useAudio } from '@/lib/audio-context'

export function HeroSection2025() {
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
      className="overflow-Y-hidden relative flex min-h-[90vh] w-full flex-col items-center justify-center py-10"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto flex flex-col items-center px-4 text-center md:px-6"
      >
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3 rounded-full border border-zinc-200/20 bg-zinc-900/5 px-4 py-1 text-sm font-medium text-zinc-500 backdrop-blur-sm dark:border-zinc-800/50 dark:text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          LIVE SESSION
        </motion.div>

        {/* Main Title / Username */}
        <div className="relative mb-8">
          {/* Background Echo Text */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            {/* Desktop Version */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.03, 0.08, 0.03],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="hidden text-center text-[10vw] leading-none font-black tracking-tighter whitespace-nowrap text-zinc-900 mix-blend-overlay md:block dark:text-white"
            >
              ADITYAHIMAONE
            </motion.h1>

            {/* Mobile Version */}
            <div className="flex flex-col items-center justify-center md:hidden">
              <motion.h1
                animate={{
                  x: [-10, 10, -10],
                  opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-[14vw] leading-[0.8] font-black tracking-tighter text-zinc-900 mix-blend-overlay dark:text-white"
              >
                ADITYA
              </motion.h1>
              <motion.h1
                animate={{
                  x: [10, -10, 10],
                  opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="text-[14vw] leading-[0.8] font-black tracking-tighter text-zinc-900 mix-blend-overlay dark:text-white"
              >
                HIMAONE
              </motion.h1>
            </div>
          </div>

          {/* Main Text */}
          <h1 className="relative z-10 bg-linear-to-b from-zinc-900 to-zinc-500 bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-8xl md:text-9xl dark:from-white dark:to-zinc-500">
            <TextEffect per="char" preset="fade-in-blur" delay={1.4}>
              adityahimaone
            </TextEffect>
          </h1>

          {/* Decorative "Album" details */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 2.0, type: 'spring', stiffness: 200 }}
            className="bg-primary absolute -top-8 right-8 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg md:-top-8 md:-right-8 md:px-4 md:py-2 md:text-sm"
          >
            NEW RELEASE
          </motion.div>
        </div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl text-sm font-light text-zinc-600 sm:text-xl md:text-lg dark:text-zinc-400"
        >
          Orchestrating code and rhythm into immersive digital experiences.
          <br className="hidden sm:block" /> Frontend Developer & Audio
          Enthusiast.
        </motion.p>

        {/* Player Controls / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-[90vw] items-center gap-2 rounded-2xl border border-zinc-200 bg-white/50 p-2 backdrop-blur-md sm:max-w-none sm:gap-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <Magnetic intensity={0.2}>
            <button
              onClick={togglePlay}
              className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
            >
              {isPlaying ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" className="ml-1" />
              )}
            </button>
          </Magnetic>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-1 px-2">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Now Playing
            </span>
            <div className="flex w-full items-center gap-3">
              <span className="truncate text-sm font-medium">
                {currentTrack}
              </span>
              <div className="flex h-4 shrink-0 items-end gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-zinc-900 dark:bg-white"
                    animate={{
                      height: isPlaying ? [4, 16, 8, 12, 4] : 4,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-8 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800" />

          <Magnetic intensity={0.2}>
            <a
              href="#projects"
              className="flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-zinc-100 sm:px-4 dark:hover:bg-zinc-800"
            >
              <span className="hidden sm:inline">Tracks</span>
              <SkipForward size={16} />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
