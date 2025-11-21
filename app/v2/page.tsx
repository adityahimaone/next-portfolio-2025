'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'motion/react'
import {
  Sprout,
  Leaf,
  Cloud,
  Sun,
  Wind,
  Flower,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Calendar,
  MapPin,
  Code2,
  Cpu,
  Database,
  Globe,
  Zap,
  Layers,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// --- Data ---

const PROJECTS = [
  {
    id: 1,
    title: 'Primarindo Asia',
    description:
      'Company profile for Primarindo Asia Infrastructure Tbk, a manufacturer specializing in shoe production.',
    image: '/assets/primarindo.png',
    url: 'https://primarindo.niqcode.com/',
    tags: ['Corporate', 'Manufacturing'],
    icon: Globe,
  },
  {
    id: 2,
    title: 'Frontend Resources',
    description:
      'A curated collection of the best frontend development tools, libraries, and inspiration sources.',
    image: '/assets/frontend-resources.png',
    url: 'https://frontend-resources-rouge.vercel.app/',
    tags: ['Educational', 'Tools'],
    icon: Code2,
  },
  {
    id: 3,
    title: 'Quick Chat Whatsapp',
    description:
      "A utility app that lets users send WhatsApp messages without saving the recipient's phone number.",
    image: '/assets/quick-chat-wa.png',
    url: 'http://quick-chat-whatsapp.vercel.app/',
    tags: ['Utility', 'Productivity'],
    icon: Zap,
  },
  {
    id: 4,
    title: 'SeaPhantom',
    description:
      'Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/y2l1g36bjudgsf6yr0eg.webp',
    url: 'https://seaphantom.com',
    tags: ['Web3', 'NFT'],
    icon: Cpu,
  },
]

const EXPERIENCE = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Fast 8 People Hub',
    period: 'OCT 2022 - PRESENT',
    description:
      'Led the development of "Bisadaya" job-seeking platform serving thousands of users. Architected an automated KPI tracking system.',
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: '80&Company',
    period: 'APR 2024 - SEP 2024',
    description:
      'Spearheaded the development of a innovative Workforce Management System incorporating blockchain technology.',
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Unzypsoft',
    period: 'JUN 2022 - AUG 2024',
    description:
      'Collaborated on BSN e-commerce platform frontend using ReactJS. Developed a dynamic NFT protocol interface.',
  },
]

const SKILLS = [
  {
    category: 'Languages',
    items: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 95 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Go', level: 60 },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'Remix', level: 70 },
      { name: 'Tailwind', level: 98 },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'VS Code', level: 99 },
      { name: 'Figma', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Motion', level: 90 },
    ],
  },
]

// --- Components ---

const FloatingParticle = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    className="absolute h-2 w-2 rounded-full bg-emerald-400/30 blur-sm"
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0, 0.8, 0],
      y: [y, y - 100],
      x: [x, x + (Math.random() * 40 - 20)],
    }}
    transition={{
      duration: 5 + Math.random() * 5,
      repeat: Infinity,
      delay: delay,
      ease: 'easeInOut',
    }}
  />
)

const Pipe = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full border border-zinc-600/30 bg-zinc-700/50 backdrop-blur-sm ${className}`}
  >
    <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/5 to-transparent" />
    {/* Joint */}
    <div className="absolute top-1/2 -right-1 -left-1 h-4 -translate-y-1/2 rounded-sm bg-zinc-600 shadow-lg" />
  </div>
)

const Vent = ({ className }: { className?: string }) => (
  <div className={`absolute flex gap-2 ${className}`}>
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-12 w-2 rounded-full border border-zinc-700/30 bg-zinc-800/50"
      />
    ))}
    <motion.div
      animate={{ y: [-5, -15, -5], opacity: [0, 0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
      className="absolute -top-8 right-0 left-0 h-8 rounded-full bg-white/10 blur-xl"
    />
  </div>
)

const ConnectingPipe = ({
  height = 100,
  className,
}: {
  height?: number
  className?: string
}) => (
  <div
    className={`absolute left-4 z-0 w-4 -translate-x-1/2 border-x border-zinc-600/30 bg-zinc-700/50 backdrop-blur-sm md:left-1/2 ${className}`}
    style={{ height }}
  >
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent" />
    {/* Joints */}
    <div className="absolute top-0 left-1/2 h-2 w-6 -translate-x-1/2 rounded-sm bg-zinc-600 shadow-lg" />
    <div className="absolute bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 rounded-sm bg-zinc-600 shadow-lg" />

    {/* Vines */}
    <svg
      className="pointer-events-none absolute top-0 left-1/2 h-full w-12 -translate-x-1/2 overflow-visible"
      preserveAspectRatio="none"
    >
      <path
        d={`M6,0 Q-10,${height / 4} 6,${height / 2} T6,${height}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      <path
        d={`M6,0 Q20,${height / 4} 6,${height / 2} T6,${height}`}
        fill="none"
        stroke="#059669"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
    </svg>
  </div>
)

const PottedPlant = ({
  className,
  delay = 0,
}: {
  className?: string
  delay?: number
}) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 15 }}
    className={`absolute z-10 ${className}`}
  >
    <div className="relative">
      {/* Pot */}
      <div className="relative h-8 w-10 overflow-hidden rounded-b-lg bg-orange-700 shadow-lg">
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
      </div>
      <div className="absolute -top-1 -left-1 h-2 w-12 rounded-sm bg-orange-800" />

      {/* Plant */}
      <div className="absolute bottom-full left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="h-8 w-1 bg-emerald-700" />
        <Leaf className="absolute bottom-4 -left-4 h-6 w-6 -rotate-45 text-emerald-500" />
        <Leaf className="absolute -right-4 bottom-6 h-5 w-5 rotate-45 text-emerald-400" />
        <Leaf className="absolute bottom-10 left-0 h-4 w-4 -rotate-12 text-emerald-300" />
      </div>
    </div>
  </motion.div>
)

const Nav = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 right-0 left-0 z-50 flex justify-center p-6"
  >
    <div className="flex items-center gap-8 rounded-full border border-emerald-500/20 bg-emerald-950/80 px-8 py-3 shadow-lg shadow-emerald-900/20 backdrop-blur-xl">
      <Link
        href="#home"
        className="text-sm font-medium text-emerald-100 transition-colors hover:text-emerald-400"
      >
        Home
      </Link>
      <Link
        href="#about"
        className="text-sm font-medium text-emerald-100 transition-colors hover:text-emerald-400"
      >
        About
      </Link>
      <Link
        href="#skills"
        className="text-sm font-medium text-emerald-100 transition-colors hover:text-emerald-400"
      >
        Skills
      </Link>
      <Link
        href="#work"
        className="text-sm font-medium text-emerald-100 transition-colors hover:text-emerald-400"
      >
        Work
      </Link>
      <Link
        href="#projects"
        className="text-sm font-medium text-emerald-100 transition-colors hover:text-emerald-400"
      >
        Projects
      </Link>
    </div>
  </motion.nav>
)

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Industrial Garden Background */}
      <div className="absolute inset-0 bg-emerald-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Decorative Industrial Elements */}
      <Pipe className="top-1/4 left-10 h-64 w-4" />
      <Pipe className="right-20 bottom-1/3 h-48 w-6 rotate-12" />
      <Vent className="bottom-20 left-20" />

      {/* Floating Leaves/Particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          x={Math.random() * 1000 - 500}
          y={Math.random() * 500}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm text-emerald-300 backdrop-blur-md"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <span>LIVE SESSION</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 text-6xl font-black tracking-tighter text-emerald-50 md:text-8xl lg:text-9xl"
        >
          ADITYA
          <br />
          <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            HIMAONE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto max-w-2xl text-lg text-emerald-200/80 md:text-xl"
        >
          Frontend Developer & Design Engineer.
          <br />
          Cultivating digital experiences on the web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex justify-center gap-4"
        >
          <button className="group flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-medium text-emerald-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            Explore Garden{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Foreground Elements */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-emerald-950 to-transparent" />

      {/* Connection to next section */}
      <ConnectingPipe height={150} className="-bottom-24" />
      <PottedPlant className="bottom-0 left-4 translate-y-1/2 md:left-1/2 md:-translate-x-1/2" />
    </section>
  )
}

const About = () => {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-900/20 p-8 backdrop-blur-sm">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-500/10" />
              {/* Abstract Garden Representation */}
              <div className="grid h-full w-full grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-emerald-500/20">
                  <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-emerald-500/20 blur-xl" />
                  <Leaf className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-emerald-500/40" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-teal-500/10 bg-teal-500/20">
                  <Code2 className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-teal-500/40" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-lime-500/10 bg-lime-500/20">
                  <Cpu className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-lime-500/40" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-green-500/10 bg-green-500/20">
                  <Zap className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-green-500/40" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <Leaf className="h-5 w-5" />
              <span className="font-mono text-sm tracking-wider uppercase">
                The Gardener
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-emerald-50 md:text-5xl">
              Nurturing Ideas into <br />
              <span className="text-emerald-400">Reality</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-emerald-200/80">
              Just as a garden requires patience, care, and the right
              environment to thrive, great software needs thoughtful
              architecture and attention to detail.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-emerald-200/80">
              I am a Design Engineer passionate about creating digital
              ecosystems that feel alive. With a background in both design and
              development, I bridge the gap between visual aesthetics and
              functional code.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/20 p-4">
                <h3 className="mb-1 text-2xl font-bold text-emerald-300">5+</h3>
                <p className="text-sm text-emerald-200/60">Years of Growth</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/20 p-4">
                <h3 className="mb-1 text-2xl font-bold text-emerald-300">
                  50+
                </h3>
                <p className="text-sm text-emerald-200/60">
                  Projects Harvested
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connection to next section */}
      <ConnectingPipe height={150} className="-bottom-24" />
      <PottedPlant
        className="bottom-0 left-4 translate-y-1/2 md:left-1/2 md:-translate-x-1/2"
        delay={0.2}
      />
    </section>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden py-32">
      {/* Background Vines */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 opacity-5">
        <svg
          viewBox="0 0 100 400"
          className="h-full w-full fill-none stroke-emerald-500 stroke-2"
        >
          <path d="M50,0 Q100,100 50,200 T50,400" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 text-emerald-400"
          >
            <Sun className="h-5 w-5" />
            <span className="font-mono text-sm tracking-wider uppercase">
              The Toolkit
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-emerald-50 md:text-5xl">
            Growing Stack
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {SKILLS.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="rounded-3xl border border-emerald-500/20 bg-emerald-900/20 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-emerald-300">
                <Flower className="h-5 w-5" />
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-emerald-100">{skill.name}</span>
                      <span className="text-emerald-500/60">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-950/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection to next section */}
      <ConnectingPipe height={150} className="-bottom-24" />
      <PottedPlant
        className="bottom-0 left-4 translate-y-1/2 md:left-1/2 md:-translate-x-1/2"
        delay={0.3}
      />
    </section>
  )
}

const Experience = () => {
  return (
    <section id="work" className="py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <Wind className="h-5 w-5" />
              <span className="font-mono text-sm tracking-wider uppercase">
                Seasons
              </span>
            </div>
            <h2 className="text-4xl font-bold text-emerald-50 md:text-5xl">
              Experience
            </h2>
          </div>
        </div>

        <div className="relative space-y-8 before:absolute before:top-0 before:left-4 before:h-full before:w-px before:bg-emerald-800 md:before:left-1/2">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative flex flex-col gap-8 md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-0 left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-emerald-950 bg-emerald-500 md:left-1/2">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div className="ml-12 flex-1 md:ml-0 md:w-1/2 md:px-12">
                <div className="group rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-900/40">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      {job.period}
                    </span>
                    <ExternalLink className="h-4 w-4 text-emerald-500/50 transition-colors group-hover:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-50">
                    {job.role}
                  </h3>
                  <p className="mb-4 text-emerald-400">{job.company}</p>
                  <p className="text-emerald-200/70">{job.description}</p>
                </div>
              </div>
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection to next section */}
      <ConnectingPipe height={150} className="-bottom-24" />
      <PottedPlant
        className="bottom-0 left-4 translate-y-1/2 md:left-1/2 md:-translate-x-1/2"
        delay={0.4}
      />
    </section>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-emerald-400">
            <Cloud className="h-5 w-5" />
            <span className="font-mono text-sm tracking-wider uppercase">
              The Harvest
            </span>
          </div>
          <h2 className="text-4xl font-bold text-emerald-50 md:text-5xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-900/20"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-emerald-950/50 transition-colors group-hover:bg-emerald-900/50">
                {/* Project Image Placeholder or Real Image */}
                <div className="absolute inset-0 flex items-center justify-center text-emerald-800">
                  <project.icon className="h-16 w-16 opacity-20" />
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950 to-transparent opacity-60" />
              </div>
              <div className="relative z-10 p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 text-2xl font-bold text-emerald-50">
                  {project.title}
                </h3>
                <p className="mb-6 line-clamp-2 text-emerald-200/70">
                  {project.description}
                </p>
                <Link
                  href={project.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  View Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection to next section */}
      <ConnectingPipe height={150} className="-bottom-24" />
      <PottedPlant
        className="bottom-0 left-4 translate-y-1/2 md:left-1/2 md:-translate-x-1/2"
        delay={0.5}
      />
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-900/40 to-teal-900/40 p-12 text-center backdrop-blur-md md:p-24">
          {/* Decorative Background */}
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-bold text-emerald-50 md:text-6xl">
              Let's Grow Together
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-emerald-200/80">
              Have a project in mind? I'm always open to discussing new
              opportunities and ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:adityahimaone@gmail.com"
                className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-lg font-bold text-emerald-950 transition-all hover:scale-105 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
              >
                <Mail className="h-5 w-5" />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/adityahimaone"
                target="_blank"
                className="inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-8 py-4 text-lg font-bold text-emerald-300 backdrop-blur-sm transition-all hover:bg-emerald-900/50"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-900/50 bg-emerald-950 py-12 text-center">
      {/* Footer Garden Elements */}
      <div className="absolute right-0 bottom-0 left-0 h-2 bg-emerald-500/20" />
      <div className="absolute bottom-0 left-10 h-8 w-1 rounded-t-full bg-emerald-500/20" />
      <div className="absolute right-20 bottom-0 h-12 w-1 rounded-t-full bg-emerald-500/20" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-8 flex justify-center gap-6">
          <a
            href="https://github.com/adityahimaone"
            target="_blank"
            className="rounded-full bg-emerald-900/50 p-3 text-emerald-400 transition-colors hover:bg-emerald-800 hover:text-emerald-200"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/adityahimaone"
            target="_blank"
            className="rounded-full bg-emerald-900/50 p-3 text-emerald-400 transition-colors hover:bg-emerald-800 hover:text-emerald-200"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/adityahimaone"
            target="_blank"
            className="rounded-full bg-emerald-900/50 p-3 text-emerald-400 transition-colors hover:bg-emerald-800 hover:text-emerald-200"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
        <p className="text-emerald-200/40">
          © 2025 Aditya. Cultivated with{' '}
          <span className="text-emerald-500">♥</span> and Next.js.
        </p>
      </div>
    </footer>
  )
}

export default function GardenPage() {
  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
