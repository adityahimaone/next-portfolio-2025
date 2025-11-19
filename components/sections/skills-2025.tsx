'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Code2,
  Cpu,
  Globe,
  Layout,
  Palette,
  Terminal,
  Zap,
  Database,
  GitBranch,
  Settings,
  Music,
  Sliders,
  Layers,
  FileCode,
  PenTool,
  ClipboardList,
  AudioLines,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    icon: FileCode,
    description: 'The syntax of my sonic compositions.',
    skills: [
      // { name: 'HTML', level: 98 },
      { name: 'CSS', level: 95 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Go', level: 60 },
      { name: 'Swift', level: 50 },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    icon: Layers,
    description: 'The instruments I play most frequently.',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'TailwindCSS', level: 98 },
      { name: 'Remix', level: 70 },
      { name: 'jQuery', level: 85 },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    icon: Music,
    description: 'Adding rhythm and motion to the interface.',
    skills: [
      { name: 'Framer Motion', level: 90 },
      { name: 'GSAP', level: 75 },
      { name: 'Lottie', level: 80 },
      { name: 'CSS Keyframes', level: 95 },
    ],
  },
  {
    id: 'tools',
    label: 'Studio Gear',
    icon: Settings,
    description: 'The hardware and software behind the production.',
    skills: [
      { name: 'VS Code', level: 99 },
      { name: 'Figma', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 75 },
      { name: 'OpenAI', level: 80 },
    ],
  },
]

export function SkillsSection2025() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id)

  const activeCategory = skillCategories.find((c) => c.id === activeTab)

  return (
    <section id="skills" className="overflow-hidden py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <Sliders className="h-4 w-4" />
            <span>TECHNICAL SPECS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            Sonic Arsenal
          </motion.h2>
        </div>

        {/* Synth Control Panel */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white p-2 shadow-2xl md:p-4 dark:border-zinc-800 dark:bg-zinc-900/50 dark:backdrop-blur-xl">
          {/* Tab Navigation */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-4">
            {skillCategories.map((category) => {
              const Icon = category.icon
              const isActive = activeTab === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={cn(
                    'group relative flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all md:px-6 md:text-base',
                    isActive
                      ? 'text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-zinc-900 dark:bg-zinc-100"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        isActive
                          ? 'text-zinc-400 dark:text-zinc-600'
                          : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300',
                      )}
                    />
                    <span
                      className={cn(
                        isActive
                          ? 'text-white dark:text-zinc-900'
                          : 'text-zinc-600 dark:text-zinc-400',
                      )}
                    >
                      {category.label}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-zinc-50 px-4 py-12 md:px-12 dark:bg-zinc-950/50">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="mb-8 text-center">
                  <p className="text-lg text-zinc-500 dark:text-zinc-400">
                    {activeCategory?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {activeCategory?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group hover:border-primary/50 relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {/* Audio Visualizer Bar (Decorative) */}
                      <div className="absolute right-0 bottom-0 left-0 flex h-1 justify-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-primary w-1/6 rounded-t-sm"
                            animate={{
                              height: ['0%', '100%', '50%', '75%', '25%'],
                            }}
                            transition={{
                              duration: 0.5 + Math.random() * 0.5,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>

                      <div className="group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors dark:bg-zinc-800">
                        {/* Dynamic Icon based on name would go here, using generic for now */}
                        <Zap className="h-6 w-6" />
                      </div>

                      <span className="text-center font-medium text-zinc-700 dark:text-zinc-300">
                        {skill.name}
                      </span>

                      {/* Level Indicator */}
                      <div className="absolute top-3 right-3 flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              i < Math.floor(skill.level / 33)
                                ? 'bg-primary'
                                : 'bg-zinc-200 dark:bg-zinc-800',
                            )}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
