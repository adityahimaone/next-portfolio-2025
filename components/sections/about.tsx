'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  LightbulbIcon,
  CodeIcon,
  MusicIcon,
  BookOpenIcon,
  SparklesIcon,
} from 'lucide-react'
import NowPlaying from '../now-playing'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  }

  return (
    <section id="about" className="py-20" ref={ref}>
      <motion.div
        className="mx-auto max-w-screen-xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ zIndex: 1 }}
      >
        {/* Section Header - Enhanced */}
        <motion.div
          className="mb-16 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.span
            className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Me
            </span>
          </motion.span>
          <motion.h2
            className="mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              The Symphony Behind The Code
            </span>
          </motion.h2>
          <motion.div
            className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          ></motion.div>
        </motion.div>

        {/* Bento Grid Layout - Modern 2025 Design */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:gap-6">
          {/* Large Developer Card - Spans 2 columns and 2 rows */}
          <motion.div
            variants={itemVariants}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl md:col-span-4"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-secondary/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            {/* Glass effect layer */}
            <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 dark:bg-zinc-900/80"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col p-8">
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <CodeIcon className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  The Developer
                </h3>
              </div>

              <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <p>
                  I'm a passionate frontend developer with a love for creating
                  intuitive, high-performance web applications. With expertise
                  in React, Next.js, and TypeScript, I build digital
                  experiences that are both functional and aesthetically
                  pleasing.
                </p>
                <p>
                  My approach to development combines technical precision with
                  creative problem-solving. I'm constantly exploring new
                  technologies and techniques to enhance user experiences and
                  optimize performance.
                </p>
                <p>
                  When I'm not coding, you'll find me immersed in music,
                  exploring new artists and genres that inspire creativity.
                </p>
              </div>

              {/* Animated waveform decoration */}
              <div className="mt-auto pt-6">
                <div className="flex h-16 items-end justify-between gap-1 opacity-30">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const height = Math.random() * 100
                    return (
                      <motion.div
                        key={i}
                        className="w-1 rounded-t-full bg-gradient-to-t from-primary to-secondary"
                        initial={{ height: 0 }}
                        animate={{
                          height: [`${height * 0.3}%`, `${height}%`, `${height * 0.5}%`],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: i * 0.05,
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Now Playing Card - Spans 2 columns and 2 rows */}
          <motion.div
            variants={itemVariants}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 via-blue-500/10 to-primary/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 dark:bg-zinc-900/80"></div>
            
            <div className="relative z-10 flex h-full flex-col p-8">
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  className="rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 p-3"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <MusicIcon className="h-8 w-8 text-secondary" />
                </motion.div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Now Playing
                </h3>
              </div>

              <div className="flex flex-grow flex-col items-center justify-center">
                <NowPlaying />
                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Music fuels my creativity and coding sessions. This is what's
                  playing right now on my Spotify.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Traits Cards - Modern Bento Style */}
          <motion.div
            variants={itemVariants}
            className="group relative col-span-1 overflow-hidden rounded-3xl md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80"></div>
            
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
              <motion.div
                className="mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <LightbulbIcon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Problem Solver
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Creative solutions with analytical thinking
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group relative col-span-1 overflow-hidden rounded-3xl md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 to-blue-500/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80"></div>
            
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
              <motion.div
                className="mb-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-blue-500/10 p-3"
                whileHover={{ scale: 1.2, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <BookOpenIcon className="h-8 w-8 text-secondary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Continuous Learner
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Always exploring new technologies
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group relative col-span-1 overflow-hidden rounded-3xl md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-accent/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80"></div>
            
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
              <motion.div
                className="mb-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-accent/10 p-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <SparklesIcon className="h-8 w-8 text-purple-500" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Detail Oriented
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Harmony in the smallest details
              </p>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Tags with Modern Hover Effects */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          variants={itemVariants}
        >
          {[
            { icon: LightbulbIcon, label: 'Problem Solver', gradient: 'from-primary to-secondary' },
            { icon: SparklesIcon, label: 'Creative Thinker', gradient: 'from-primary via-purple-500 to-secondary' },
            { icon: CodeIcon, label: 'Detail Oriented', gradient: 'from-secondary to-accent' },
            { icon: BookOpenIcon, label: 'Continuous Learner', gradient: 'from-blue-500 to-primary' },
            { icon: MusicIcon, label: 'Music Enthusiast', gradient: 'from-accent via-primary to-secondary' },
          ].map((tag, index) => (
            <motion.div
              key={tag.label}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${tag.gradient} opacity-0 transition-all duration-300 group-hover:opacity-100`} />
              <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
                <tag.icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="text-sm font-medium">{tag.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
