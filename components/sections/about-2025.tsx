'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Code2,
  Globe,
  Play,
  Disc,
  Headphones,
  MapPin,
  Cpu,
  AudioLines,
  Activity,
  User,
} from 'lucide-react'
import NowPlaying from '@/components/now-playing'
import { cn } from '@/lib/utils'

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  icon: React.ReactNode
  color: string
  content: React.ReactNode
}

export function AboutSection2025() {
  const [activeTrack, setActiveTrack] = useState<number>(1)

  const tracks: Track[] = [
    {
      id: 1,
      title: 'The Developer',
      artist: 'Engineering & Design',
      duration: '3 Yrs',
      icon: <Code2 size={20} />,
      color: 'bg-blue-500',
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600 dark:text-zinc-300">
            I'm a passionate frontend developer with a love for creating
            intuitive, high-performance web applications. With expertise in
            React, Next.js, and TypeScript, I build digital experiences that are
            both functional and aesthetically pleasing.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion'].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'The Musician',
      artist: 'Creative Flow',
      duration: '⨝',
      icon: <Headphones size={20} />,
      color: 'bg-purple-500',
      content: (
        <p className="text-zinc-600 dark:text-zinc-300">
          When I'm not coding, you'll find me immersed in music, exploring new
          artists and genres that inspire creativity. I find patterns in
          melodies and logic in harmonies, which often influences my coding
          rhythm.
        </p>
      ),
    },
    {
      id: 3,
      title: 'Global Stats',
      artist: 'Worldwide',
      duration: '20+',
      icon: <Globe size={20} />,
      color: 'bg-orange-500',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
            <div className="mb-1 text-2xl font-bold">3+</div>
            <div className="text-xs text-zinc-500">Years Experience</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
            <div className="mb-1 text-2xl font-bold">20+</div>
            <div className="text-xs text-zinc-500">Projects Completed</div>
          </div>
          <div className="col-span-2 flex items-center gap-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
            <MapPin className="text-orange-500" size={20} />
            <span className="text-sm">
              Based in Indonesia, available globally.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'On Rotation',
      artist: 'Spotify',
      duration: 'Live',
      icon: <Disc size={20} />,
      color: 'bg-green-500',
      content: (
        <div className="pt-2">
          <NowPlaying />
        </div>
      ),
    },
  ]

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <User className="h-4 w-4" />
            <span>SIDE A: THE PROFILE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            About Me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Side: Dynamic Album Art */}
          <div className="sticky top-24 hidden lg:col-span-5 lg:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              <AnimatePresence mode="wait">
                {tracks.map((track) =>
                  track.id === activeTrack ? (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Background Gradient */}
                      <div
                        className={cn(
                          'absolute inset-0 opacity-20 blur-3xl',
                          track.color,
                        )}
                      />

                      {/* Visual Elements based on track */}
                      {track.id === 1 && (
                        <div className="relative grid grid-cols-2 gap-4 p-8 opacity-80">
                          <Cpu size={120} className="text-blue-500" />
                        </div>
                      )}
                      {track.id === 2 && (
                        <div className="relative flex items-center justify-center">
                          <AudioLines size={150} className="text-purple-500" />
                        </div>
                      )}
                      {track.id === 3 && (
                        <div className="relative flex items-center justify-center">
                          <Globe
                            size={150}
                            className="animate-pulse text-orange-500"
                          />
                        </div>
                      )}
                      {track.id === 4 && (
                        <div className="relative flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <Disc size={150} className="text-green-500" />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>

              {/* Overlay Texture */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            </div>
          </div>

          {/* Right Side: Playlist */}
          <div className="lg:col-span-7">
            <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
              {tracks.map((track) => (
                <motion.div
                  key={track.id}
                  initial={false}
                  animate={{
                    backgroundColor:
                      activeTrack === track.id
                        ? 'rgba(var(--primary-rgb), 0.03)'
                        : 'transparent',
                  }}
                  className={cn(
                    'group cursor-pointer overflow-hidden transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50',
                    activeTrack === track.id &&
                      'bg-zinc-50 dark:bg-zinc-900/50',
                  )}
                  onClick={() => setActiveTrack(track.id)}
                >
                  <div className="flex items-center gap-4 p-4 sm:p-6">
                    {/* Play Button / Number */}
                    <div className="group-hover:bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors group-hover:text-white dark:bg-zinc-800">
                      {activeTrack === track.id ? (
                        <Activity size={18} className="animate-pulse" />
                      ) : (
                        <Play size={18} className="ml-1" />
                      )}
                    </div>

                    {/* Track Info */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          'truncate text-lg font-bold transition-colors',
                          activeTrack === track.id
                            ? 'text-primary'
                            : 'text-zinc-900 dark:text-zinc-100',
                        )}
                      >
                        {track.title}
                      </h3>
                      <p className="truncate text-sm text-zinc-500">
                        {track.artist}
                      </p>
                    </div>

                    {/* Duration / Icon */}
                    <div className="hidden items-center gap-4 sm:flex">
                      <span className="font-mono text-sm text-zinc-400">
                        {track.duration}
                      </span>
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100',
                          track.color,
                          'bg-opacity-10 text-current',
                        )}
                      >
                        {track.icon}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {activeTrack === track.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-4 pb-6 pl-18 sm:px-6 sm:pl-22">
                          {track.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
