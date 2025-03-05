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
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
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
        <motion.div
          className="mb-16 flex flex-col items-center"
          variants={itemVariants}
        >
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            About Me
          </span>
          <h2 className="text-gradient mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The Symphony Behind The Code
          </h2>
          <div className="from-primary to-secondary mt-3 h-1 w-24 rounded-full bg-gradient-to-r"></div>
        </motion.div>

        {/* Two Column Layout */}
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-12"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Developer Column */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-8"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="group relative flex h-full min-h-[500px] overflow-hidden rounded-3xl">
              {/* Background elements */}
              <div
                className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-br via-purple-500/10 opacity-70 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-80"
                style={{ zIndex: 0 }}
              ></div>
              <div
                className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:inset-[6px] dark:bg-zinc-900/80"
                style={{ zIndex: 1 }}
              ></div>

              {/* Content container - CRITICAL CHANGE: z-index reduced from 10 to 5 */}
              <div
                className="relative flex h-full w-full flex-col p-8"
                style={{ zIndex: 5 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary rounded-xl p-2 text-white">
                    <CodeIcon size={24} />
                  </div>
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
                    exploring new artists and genres that inspire creativity. I
                    also enjoy unwinding with thought-provoking films and diving
                    into books that expand my perspective beyond the digital
                    realm.
                  </p>
                </div>

                {/* Musical pattern decoration */}
                <div className="mt-auto pt-6">
                  <div className="relative h-24 w-full overflow-hidden opacity-60">
                    {/* Musical notation pattern - random elements */}
                    <div className="absolute inset-0">
                      {/* Sheet music lines */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={`line-${i}`}
                          className="bg-primary/30 dark:bg-primary/50 absolute h-[1px] w-full"
                          style={{ top: `${20 + i * 6}%` }}
                        />
                      ))}

                      {/* Random musical symbols with varied animations */}
                      {Array.from({ length: 24 }).map((_, i) => {
                        const symbols = [
                          '♩',
                          '♪',
                          '♫',
                          '♬',
                          '𝄞',
                          '𝄢',
                          '𝅘𝅥',
                          '𝅗𝅥',
                          '♭',
                          '♯',
                        ]
                        const symbol =
                          symbols[Math.floor(Math.random() * symbols.length)]
                        const size = 14 + Math.floor(Math.random() * 12)
                        const left = `${Math.random() * 90}%`
                        const top = `${10 + Math.random() * 70}%`
                        const delay = Math.random() * 5
                        const duration = 2 + Math.random() * 3
                        const amplitude = 5 + Math.random() * 8

                        return (
                          <motion.div
                            key={`symbol-${i}`}
                            className="text-primary/40 dark:text-primary/50 absolute"
                            style={{
                              left,
                              top,
                              fontSize: `${size}px`,
                              transform: 'translateY(0px)',
                            }}
                            animate={{
                              y: [-amplitude, amplitude, -amplitude],
                              x: [
                                Math.random() > 0.5 ? amplitude : -amplitude,
                                Math.random() > 0.5 ? -amplitude : amplitude,
                                Math.random() > 0.5 ? amplitude : -amplitude,
                              ],
                              opacity: [0.3, 0.6, 0.3],
                              rotate:
                                Math.random() > 0.7
                                  ? [0, 10, -10, 0]
                                  : undefined,
                            }}
                            transition={{
                              duration: duration,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                              delay: delay,
                              times: [0, 0.5, 1],
                            }}
                          >
                            {symbol}
                          </motion.div>
                        )
                      })}

                      {/* Music staff decorative elements */}
                      <motion.div
                        className="bg-primary/20 dark:bg-primary/15 absolute top-[30%] left-[5%] h-12 w-[2px] rounded-full"
                        animate={{
                          height: ['48px', '36px', '48px'],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.div
                        className="bg-primary/20 dark:bg-primary/15 absolute top-[25%] right-[8%] h-12 w-[2px] rounded-full"
                        animate={{
                          height: ['48px', '30px', '48px'],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1,
                        }}
                      />

                      {/* Flowing curves mimic sheet music flow - ensure lower z-index */}
                      <svg
                        className="absolute h-full w-full opacity-20"
                        viewBox="0 0 400 100"
                        style={{ zIndex: 5 }}
                      >
                        <motion.path
                          d="M0,50 Q100,30 200,50 T400,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary/40 dark:text-primary/30"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <motion.path
                          d="M0,70 Q120,90 240,70 T400,70"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary/40 dark:text-primary/30"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spotify Now Playing Column */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-4"
          >
            <div className="group relative flex h-full min-h-[500px] overflow-hidden rounded-3xl">
              {/* Lower z-index on background elements */}
              <div
                className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-tl via-blue-500/10 opacity-70 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-80"
                style={{ zIndex: 0 }}
              ></div>
              <div
                className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:inset-[6px] dark:bg-zinc-900/80"
                style={{ zIndex: 1 }}
              ></div>
              <div className="relative z-10 flex h-full w-full flex-col p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-secondary rounded-xl p-2 text-white">
                    <MusicIcon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Currently Playing
                  </h3>
                </div>

                <div className="flex flex-grow flex-col items-center justify-center">
                  <NowPlaying />
                  <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Music fuels my creativity and coding sessions. This is
                    what's playing right now on my Spotify.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Three Column Traits - Modernized */}
        <motion.div
          className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
          variants={itemVariants}
          style={{ zIndex: 1 }}
        >
          {/* Problem Solver - Modern Card */}
          <div className="group relative overflow-hidden rounded-3xl">
            {/* Animated gradient background - lower z-index */}
            <div
              className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br via-purple-500/10 opacity-0 transition-all duration-700 group-hover:opacity-100"
              style={{ zIndex: 0 }}
            ></div>

            {/* Base gradient background - lower z-index */}
            <div
              className="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-500"
              style={{ zIndex: 1 }}
            ></div>

            {/* Card body - lower z-index */}
            <div
              className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:inset-[3px] dark:bg-zinc-900/90"
              style={{ zIndex: 2 }}
            ></div>

            {/* Content container - moderate z-index */}
            <div className="relative z-5 flex flex-col items-center p-8">
              {/* Icon with gradient background and hover effect */}
              <div className="from-primary/10 to-secondary/10 mb-5 transform rounded-2xl bg-gradient-to-br p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <LightbulbIcon className="text-primary group-hover:text-secondary h-8 w-8 transition-colors duration-300" />
              </div>

              <h3 className="mb-3 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Problem Solver
              </h3>

              <p className="text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Approaching challenges with creative solutions and analytical
                thinking. I enjoy breaking down complex problems into manageable
                pieces.
              </p>

              {/* Decorative element - lower z-index */}
              <div
                className="from-primary/40 to-secondary/0 absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{ zIndex: 3 }}
              ></div>
            </div>
          </div>

          {/* Continuous Learner - Modern Card */}
          <div className="group relative overflow-hidden rounded-3xl">
            {/* Lower z-indexes for all background elements */}
            <div
              className="from-secondary/5 to-primary/5 absolute inset-0 bg-gradient-to-tl via-blue-500/10 opacity-0 transition-all duration-700 group-hover:opacity-100"
              style={{ zIndex: 0 }}
            ></div>
            <div
              className="from-secondary/10 to-primary/10 absolute inset-0 bg-gradient-to-tl opacity-60 transition-all duration-500"
              style={{ zIndex: 1 }}
            ></div>
            <div
              className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:inset-[3px] dark:bg-zinc-900/90"
              style={{ zIndex: 2 }}
            ></div>
            <div className="relative z-5 flex flex-col items-center p-8">
              <div className="from-secondary/10 to-primary/10 mb-5 transform rounded-2xl bg-gradient-to-br p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <BookOpenIcon className="text-secondary group-hover:text-primary h-8 w-8 transition-colors duration-300" />
              </div>

              <h3 className="mb-3 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Continuous Learner
              </h3>

              <p className="text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Always exploring new technologies and expanding my skillset. The
                web evolves continuously, and so do I.
              </p>

              <div
                className="from-secondary/40 to-primary/0 absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{ zIndex: 3 }}
              ></div>
            </div>
          </div>

          {/* Detail Oriented - Modern Card */}
          <div className="group relative overflow-hidden rounded-3xl">
            {/* Lower z-indexes for all background elements */}
            <div
              className="via-primary/10 to-accent/5 absolute inset-0 bg-gradient-to-br from-purple-500/5 opacity-0 transition-all duration-700 group-hover:opacity-100"
              style={{ zIndex: 0 }}
            ></div>
            <div
              className="to-accent/10 absolute inset-0 bg-gradient-to-br from-purple-500/10 opacity-60 transition-all duration-500"
              style={{ zIndex: 1 }}
            ></div>
            <div
              className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:inset-[3px] dark:bg-zinc-900/90"
              style={{ zIndex: 2 }}
            ></div>
            <div className="relative z-5 flex flex-col items-center p-8">
              <div className="to-accent/10 mb-5 transform rounded-2xl bg-gradient-to-br from-purple-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <SparklesIcon className="text-accent h-8 w-8 transition-colors duration-300 group-hover:text-purple-500" />
              </div>

              <h3 className="mb-3 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Detail Oriented
              </h3>

              <p className="text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Finding harmony in the smallest details to create polished
                experiences that stand out and provide excellent user
                experiences.
              </p>

              <div
                className="from-accent/40 absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r to-purple-500/0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{ zIndex: 3 }}
              ></div>
            </div>
          </div>
        </motion.div>
        {/* My Philosophy - Modern Design */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
          style={{ zIndex: 1 }}
        >
          <div className="group relative overflow-hidden rounded-3xl">
            {/* Lower z-indexes for background elements */}
            <div
              className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br via-purple-500/10 opacity-60"
              style={{ zIndex: 0 }}
            ></div>

            {/* Animated circles with lower z-indexes */}
            <motion.div
              className="from-primary/20 to-secondary/20 absolute top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-r blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ zIndex: 1 }}
            />

            <motion.div
              className="from-secondary/20 to-primary/20 absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              style={{ zIndex: 1 }}
            />

            {/* Content container with glass effect - lower z-index */}
            <div className="relative z-5">
              {/* Music note decorative element */}
              <div className="text-primary/5 dark:text-primary/10 absolute top-10 right-10 text-8xl font-bold">
                ♫
              </div>

              {/* Horizontal divider with gradient */}
              <div className="from-primary/30 absolute top-24 right-0 h-px w-1/3 bg-gradient-to-l to-transparent"></div>

              <div className="p-12 backdrop-blur-[2px]">
                <div className="mb-6 flex items-center gap-4">
                  <div className="from-primary to-secondary h-10 w-2 rounded-full bg-gradient-to-b"></div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    My Philosophy
                  </h3>
                </div>

                <div className="relative">
                  {/* Decorative quote marks */}
                  <div className="text-primary/20 absolute -top-4 -left-2 font-serif text-4xl">
                    "
                  </div>
                  <div className="text-primary/20 absolute -right-2 -bottom-4 font-serif text-4xl">
                    "
                  </div>

                  <p className="px-3 text-lg leading-relaxed text-zinc-700 md:text-xl md:leading-relaxed dark:text-zinc-300">
                    I believe great digital experiences are like well-composed
                    music - they have{' '}
                    <span className="text-primary font-medium">rhythm</span>,{' '}
                    <span className="text-secondary font-medium">harmony</span>,
                    and{' '}
                    <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-medium text-transparent">
                      resonance
                    </span>
                    . Every project is an opportunity to create something that
                    not only functions flawlessly but also connects emotionally
                    with users. By blending technical expertise with creative
                    intuition, I craft interfaces that are both powerful and
                    intuitive - digital compositions that users want to
                    experience again and again.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive hover effect on the whole container */}
            <div
              className="group-hover:ring-primary/20 dark:group-hover:ring-primary/20 absolute inset-0 rounded-3xl ring-1 ring-zinc-200/30 transition-all duration-300 ring-inset dark:ring-zinc-700/30"
              style={{ zIndex: 2 }}
            ></div>
          </div>
        </motion.div>

        {/* Tags */}
        {/* Tags - Modern Look */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          {/* Problem Solver */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="from-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <LightbulbIcon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium">Problem Solver</span>
            </div>
            <div className="from-primary/20 to-secondary/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Creative Thinker */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="from-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-r via-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <SparklesIcon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium">Creative Thinker</span>
            </div>
            <div className="from-primary/20 to-secondary/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r via-purple-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Detail Oriented */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="from-secondary to-accent absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L8 14M14 8L12 10M8 8L10 10M14 12L12 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium">Detail Oriented</span>
            </div>
            <div className="from-secondary/20 to-accent/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Continuous Learner */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="to-primary absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <BookOpenIcon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium">Continuous Learner</span>
            </div>
            <div className="to-primary/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-blue-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Music Enthusiast */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="from-accent via-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <MusicIcon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium">Music Enthusiast</span>
            </div>
            <div className="from-accent/20 via-primary/20 to-secondary/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Film Lover */}
          <motion.div
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="to-accent absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-5 py-3 text-zinc-800 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:text-white dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200">
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium">Film Lover</span>
            </div>
            <div className="to-accent/20 absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-purple-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
