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

export function About2Section() {
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
      >
        <motion.div
          className="mb-16 flex flex-col items-center"
          variants={itemVariants}
        >
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            About Me
          </span>
          <h2 className="section-heading text-center">
            The Symphony Behind The Code
          </h2>
          <div className="from-primary to-secondary mt-3 h-1 w-24 rounded-full bg-gradient-to-r"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-7"
          >
            <div className="group relative overflow-hidden rounded-3xl">
              <div className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-br via-purple-500/10 opacity-70 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-80"></div>
              <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:inset-[6px] dark:bg-zinc-900/80"></div>
              <div className="relative z-10 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary rounded-xl p-2 text-white">
                    <CodeIcon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    The Developer
                  </h3>
                </div>

                <p className="mb-4 text-lg text-zinc-700 dark:text-zinc-300">
                  Frontend Developer who finds rhythm in both code and music.
                  With 2+ years of crafting user interfaces, I transform
                  creative inspiration into clean, efficient web experiences.
                </p>

                <p className="text-zinc-700 dark:text-zinc-300">
                  Driven by the perfect harmony of technical precision and
                  artistic design, I create digital experiences that resonate
                  with users like a well-composed melody.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-3xl">
              <div className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-tl via-blue-500/10 opacity-70 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-80"></div>
              <div className="absolute inset-[1px] rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:inset-[6px] dark:bg-zinc-900/80"></div>
              <div className="relative z-10 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-secondary rounded-xl p-2 text-white">
                    <MusicIcon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    The Musician
                  </h3>
                </div>

                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  My passion for music influences my approach to development.
                  Just as a musician finds the perfect notes, I seek the optimal
                  balance of functionality and aesthetics.
                </p>

                <p className="text-zinc-700 dark:text-zinc-300">
                  The discipline of practice, the joy of improvisation, and the
                  satisfaction of creating something that moves people - these
                  musical principles guide my work as a developer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="my-8 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={itemVariants}
        >
          <div className="group relative overflow-hidden rounded-3xl">
            <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-500 group-hover:opacity-70"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90"></div>
            <div className="relative z-10 p-6">
              <div className="mb-4 flex justify-center">
                <div className="from-primary/20 to-secondary/20 rounded-full bg-gradient-to-br p-3">
                  <LightbulbIcon className="from-primary to-secondary text-gradient h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Problem Solver
              </h3>
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Approaching challenges with creative solutions and analytical
                thinking
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl">
            <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-500 group-hover:opacity-70"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90"></div>
            <div className="relative z-10 p-6">
              <div className="mb-4 flex justify-center">
                <div className="from-primary/20 to-secondary/20 rounded-full bg-gradient-to-br p-3">
                  <BookOpenIcon className="from-primary to-secondary text-gradient h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Continuous Learner
              </h3>
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Always exploring new technologies and expanding my skillset
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl">
            <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-500 group-hover:opacity-70"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90"></div>
            <div className="relative z-10 p-6">
              <div className="mb-4 flex justify-center">
                <div className="from-primary/20 to-secondary/20 rounded-full bg-gradient-to-br p-3">
                  <SparklesIcon className="from-primary to-secondary text-gradient h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Detail Oriented
              </h3>
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Finding harmony in the smallest details to create polished
                experiences
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 rounded-3xl" variants={itemVariants}>
          <div className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800/50">
            <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-r opacity-80"></div>
            <div className="relative z-10 p-8">
              <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                My Philosophy
              </h3>
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                I believe great digital experiences are like well-composed music
                - they have rhythm, harmony, and resonance. Every project is an
                opportunity to create something that not only functions
                flawlessly but also connects emotionally with users. By blending
                technical expertise with creative intuition, I craft interfaces
                that are both powerful and intuitive - digital compositions that
                users want to experience again and again.
              </p>
            </div>

            <div className="from-primary/20 to-secondary/20 absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl"></div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-3"
          variants={itemVariants}
        >
          <div className="from-primary to-secondary group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-zinc-800 transition-all duration-300 hover:bg-gradient-to-r hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <span className="text-sm font-medium">Problem Solver</span>
          </div>
          <div className="from-primary to-secondary group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-zinc-800 transition-all duration-300 hover:bg-gradient-to-r hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <span className="text-sm font-medium">Creative Thinker</span>
          </div>
          <div className="from-primary to-secondary group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-zinc-800 transition-all duration-300 hover:bg-gradient-to-r hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <span className="text-sm font-medium">Detail Oriented</span>
          </div>
          <div className="from-primary to-secondary group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-zinc-800 transition-all duration-300 hover:bg-gradient-to-r hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <span className="text-sm font-medium">Continuous Learner</span>
          </div>
          <div className="from-primary to-secondary group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-zinc-800 transition-all duration-300 hover:bg-gradient-to-r hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <span className="text-sm font-medium">Music Enthusiast</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
