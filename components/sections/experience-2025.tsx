'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Briefcase,
  Calendar,
  MapPin,
  Disc,
  Music,
  Play,
  ListMusic,
  Mic2,
  Radio,
  Headphones,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const experiences = [
  {
    id: 1,
    role: 'Frontend Developer',
    type: 'Full Time',
    company: 'Fast 8 People Hub',
    location: 'Jakarta, Indonesia',
    period: 'OCT 2022 - PRESENT',
    color: 'bg-purple-500',
    description: [
      'Led the development of "Bisadaya" job-seeking platform serving thousands of users.',
      'Architected an automated KPI tracking system with interactive dashboards.',
      'Executed critical maintenance tasks and bug fixes across legacy and modern codebases.',
    ],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    type: 'Part Time',
    company: '80&Company',
    location: 'Kyoto, Japan (Remote)',
    period: 'APR 2024 - SEP 2024',
    color: 'bg-blue-500',
    description: [
      'Spearheaded the development of a innovative Workforce Management System incorporating blockchain technology.',
      'Maintained the application, resolving critical bugs to improve system reliability.',
      'Collaborated with the design team to create a user-friendly interface.',
    ],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    type: 'Full Time',
    company: 'Unzypsoft',
    location: 'Jakarta, Indonesia',
    period: 'JUN 2022 - AUG 2024',
    color: 'bg-pink-500',
    description: [
      'Collaborated on BSN e-commerce platform frontend using ReactJS.',
      'Developed a dynamic NFT protocol interface with ReactJS and Tailwind CSS.',
      'Created reusable components that boosted development efficiency.',
    ],
  },
  {
    id: 4,
    role: 'Vocational Courses',
    type: 'Education',
    company: 'Various Academies',
    location: 'Online',
    period: '2021 - 2022',
    color: 'bg-orange-500',
    isGroup: true,
    items: [
      {
        role: 'Frontend Developer',
        period: 'FEB 2022 - JUL 2022',
        company: 'Binar Academy',
        description:
          'Developed a car booking frontend using NodeJS, EJS, ReactJS, and NextJS.',
      },
      {
        role: 'Fullstack Engineering',
        period: 'AUG 2021 - JAN 2022',
        company: 'Alterra Academy',
        description:
          'Built a Calories Tracker & Hospital Management System with Golang and ReactJS.',
      },
      {
        role: 'Cloud Computing',
        period: 'FEB 2021 - JUL 2021',
        company: 'Bangkit Academy',
        description:
          'Capstone project: Machine learning app for calorie estimation deployed on Google Cloud.',
      },
    ],
  },
]

export function ExperienceSection2025() {
  const [selectedId, setSelectedId] = useState(experiences[0].id)
  const selectedJob =
    experiences.find((e) => e.id === selectedId) || experiences[0]

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <Radio className="h-4 w-4" />
            <span>CAREER DISCOGRAPHY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            The Collection
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Tracklist / Selector */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="mb-2 px-4 py-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Select a Track
              </div>
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={cn(
                    'group relative flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all',
                    selectedId === exp.id
                      ? 'bg-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                  )}
                >
                  {/* Active Indicator */}
                  {selectedId === exp.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="bg-primary absolute top-1/2 left-0 h-12 w-1 -translate-y-1/2 rounded-r-full"
                    />
                  )}

                  {/* Icon / Number */}
                  <div
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors',
                      selectedId === exp.id
                        ? 'text-primary border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white'
                        : 'border-transparent bg-zinc-50 text-zinc-400 group-hover:border-zinc-200 group-hover:bg-white group-hover:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-500 dark:group-hover:bg-zinc-800 dark:group-hover:text-zinc-300',
                    )}
                  >
                    {selectedId === exp.id ? (
                      <Music className="h-5 w-5 animate-pulse" />
                    ) : (
                      <span className="font-mono text-sm font-bold">
                        0{exp.id}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center justify-between gap-2">
                      <h3
                        className={cn(
                          'truncate text-sm font-bold transition-colors',
                          selectedId === exp.id
                            ? 'text-zinc-900 dark:text-zinc-100'
                            : 'text-zinc-700 dark:text-zinc-300',
                        )}
                      >
                        {exp.role}
                      </h3>
                      <span
                        className={cn(
                          'hidden rounded-full border px-1.5 py-0.5 text-[10px] font-medium sm:inline-block',
                          selectedId === exp.id
                            ? 'border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
                            : 'border-transparent bg-transparent text-zinc-400',
                        )}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <p className="mb-2 truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {exp.company}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1 truncate">
                        <Calendar className="h-3 w-3 shrink-0" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: The Player / Details */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[500px] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
              {/* Background Ambience */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJob.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    'absolute inset-0 opacity-5 blur-3xl',
                    selectedJob.color,
                  )}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-2 mix-blend-overlay" />

              <div className="relative flex h-full flex-col p-5 sm:p-8 md:p-10">
                {/* Header Area */}
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <motion.div
                      key={selectedJob.company}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                        {selectedJob.role}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-zinc-700 dark:text-zinc-400">
                        <span className="text-primary flex items-center gap-1.5 font-medium">
                          <Briefcase className="h-4 w-4" />
                          {selectedJob.company}
                        </span>
                        <span className="hidden h-1 w-1 rounded-full bg-zinc-800 sm:block dark:bg-zinc-700" />
                        <span className="flex items-center gap-1.5 text-sm">
                          <MapPin className="h-3.5 w-3.5" />
                          {selectedJob.location}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spinning Vinyl Animation */}
                  <div className="hidden shrink-0 sm:block">
                    <motion.div
                      key={selectedJob.id}
                      initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                      animate={{ rotate: 360, scale: 1, opacity: 1 }}
                      transition={{
                        rotate: {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                        scale: { duration: 0.4 },
                        opacity: { duration: 0.4 },
                      }}
                      className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-zinc-900 bg-zinc-950 shadow-xl dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,rgba(255,255,255,0.1)_30deg,transparent_60deg)]" />
                      <div
                        className={cn(
                          'h-8 w-8 rounded-full',
                          selectedJob.color,
                        )}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 pr-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedJob.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <Calendar className="h-3 w-3 text-zinc-500" />
                        {selectedJob.period}
                      </div>

                      {/* Description */}
                      <div className="prose prose-zinc dark:prose-invert max-w-none">
                        {selectedJob.isGroup ? (
                          <div className="space-y-4">
                            {selectedJob.items?.map((item, i) => (
                              <div
                                key={i}
                                className="relative flex w-full items-start gap-3"
                              >
                                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex w-full flex-col">
                                  <h4 className="mt-0 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    {item.role}
                                  </h4>
                                  <div className="mb-2 flex w-full items-center justify-between text-xs text-zinc-800">
                                    <span className="font-medium">
                                      {item.company}
                                    </span>
                                    <span>{item.period}</span>
                                  </div>
                                  <p className="my-0! text-base leading-relaxed text-zinc-900 dark:text-zinc-200">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-4">
                            {selectedJob.description?.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="bg-primary/10 text-primary mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </div>
                                <span className="mt-1.5 text-base font-medium text-zinc-900 dark:text-zinc-200">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Player Controls (Decorative) */}
                <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-primary w-1 rounded-full"
                            animate={{ height: ['8px', '16px', '8px'] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium tracking-wider text-zinc-800 uppercase">
                        Now Playing
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-800">
                      <ListMusic className="h-4 w-4" />
                      <span className="text-xs">
                        {selectedId} / {experiences.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
