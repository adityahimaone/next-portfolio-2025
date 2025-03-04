'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { AnimatedCard } from '@/components/ui/animated-card'
import {
  Code,
  Layers,
  Play,
  Palette,
  ClipboardList,
  Music,
  FileCode,
  PenTool,
  GitBranch,
  Braces,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const dataSkills = [
  {
    category: 'Languages',
    skills: 'HTML • CSS • JavaScript • TypeScript • Go • Swift',
    icon: <FileCode className="h-10 w-10" />,
    color: 'from-blue-500/20 to-cyan-400/20 text-blue-500',
  },
  {
    category: 'Frameworks',
    skills: 'React • Next • jQuery • Remix • TailwindCSS',
    icon: <Layers className="h-10 w-10" />,
    color: 'from-primary/20 to-secondary/20 text-primary',
  },
  {
    category: 'Animations',
    skills: 'Framer Motion • Lottie • GSAP',
    icon: <Play className="h-10 w-10" />,
    color: 'from-purple-500/20 to-pink-500/20 text-purple-500',
  },
  {
    category: 'Design & Tools',
    skills: 'Figma • VSCode • Git',
    icon: <PenTool className="h-10 w-10" />,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
  },
  {
    category: 'Project Management',
    skills: 'Trello • Taiga',
    icon: <ClipboardList className="h-10 w-10" />,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section id="skills" className="py-16" ref={ref}>
      <motion.div
        className="mx-auto max-w-screen-xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="section-heading mb-12 text-center"
          variants={itemVariants}
        >
          Technical Symphony
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-300"
          variants={itemVariants}
        >
          Like a musician mastering different instruments, I've developed
          proficiency in various technologies to compose exceptional digital
          experiences.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {dataSkills.map((skill, index) => (
            <motion.div key={skill.category} variants={itemVariants}>
              <AnimatedCard className="h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:backdrop-blur-sm">
                <div
                  className={cn(
                    'relative flex items-center gap-4 bg-gradient-to-br p-6',
                    skill.color,
                  )}
                >
                  <div className="rounded-full bg-white/90 p-3 shadow-md dark:bg-black/30">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold">{skill.category}</h3>

                  {/* Music note decorations */}
                  <motion.div
                    className="absolute -right-1 -bottom-1 opacity-10"
                    animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Music className="h-8 w-8" />
                  </motion.div>
                </div>

                <div className="p-6">
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {skill.skills}
                  </p>

                  {/* Decorative lines like sheet music */}
                  <div className="mt-4 space-y-2 opacity-30">
                    <div className="h-[1px] w-full bg-current"></div>
                    <div className="h-[1px] w-full bg-current"></div>
                    <div className="h-[1px] w-full bg-current"></div>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-16" variants={itemVariants}>
          <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700/30 dark:bg-zinc-800/50">
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <Music className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                The Perfect Harmony
              </h3>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              My technical skills are like instruments in an orchestra - each
              with its own purpose, but working together to create something
              greater than the sum of its parts. I'm constantly learning new
              technologies and refining my expertise to ensure I can tackle any
              challenge with confidence and creativity.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
          variants={itemVariants}
        >
          <div className="marquee bg-zinc-50 py-4 dark:bg-zinc-900/50">
            <div className="marquee-content">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="inline-flex items-center gap-8">
                    <span className="text-primary flex items-center gap-2 text-xl">
                      <Braces className="h-4 w-4" /> HTML
                    </span>
                    <span className="text-secondary flex items-center gap-2 text-xl">
                      <Code className="h-4 w-4" /> CSS
                    </span>
                    <span className="text-primary-light flex items-center gap-2 text-xl">
                      <FileCode className="h-4 w-4" /> JavaScript
                    </span>
                    <span className="text-primary flex items-center gap-2 text-xl">
                      <FileCode className="h-4 w-4" /> TypeScript
                    </span>
                    <span className="text-secondary flex items-center gap-2 text-xl">
                      <Layers className="h-4 w-4" /> React
                    </span>
                    <span className="text-primary-light flex items-center gap-2 text-xl">
                      <Layers className="h-4 w-4" /> Next.js
                    </span>
                    <span className="text-primary flex items-center gap-2 text-xl">
                      <PenTool className="h-4 w-4" /> TailwindCSS
                    </span>
                    <span className="text-secondary flex items-center gap-2 text-xl">
                      <Play className="h-4 w-4" /> Framer Motion
                    </span>
                    <span className="text-primary-light flex items-center gap-2 text-xl">
                      <Play className="h-4 w-4" /> GSAP
                    </span>
                    <span className="text-primary flex items-center gap-2 text-xl">
                      <PenTool className="h-4 w-4" /> Figma
                    </span>
                    <span className="text-secondary flex items-center gap-2 text-xl">
                      <GitBranch className="h-4 w-4" /> Git
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
