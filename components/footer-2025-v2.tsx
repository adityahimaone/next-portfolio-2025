'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  Github,
  Linkedin,
  Music,
  Mail,
  ArrowUpRight,
  Disc3,
  Play,
  Volume2,
  Radio,
} from 'lucide-react'

export function Footer2025V2() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/adityahimaone',
      icon: Github,
      color: 'from-zinc-700 to-zinc-900',
      label: '@adityahimaone',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/adityahimaone',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-800',
      label: 'adityahimaone',
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq',
      icon: Music,
      color: 'from-green-500 to-emerald-600',
      label: 'My Playlists',
    },
    {
      name: 'Email',
      href: 'mailto:adityahimaone@gmail.com',
      icon: Mail,
      color: 'from-purple-600 to-pink-600',
      label: 'Get in Touch',
    },
  ]

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const techStack = [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Tone.js',
  ]

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Animated Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Vinyl Record Decoration */}
      <div className="pointer-events-none absolute -top-32 right-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <Disc3 className="h-64 w-64 text-zinc-900 dark:text-white" />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-8">
        {/* Main Content Grid */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Section - Takes up more space */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-700 shadow-lg transition-transform group-hover:scale-105 dark:from-white dark:to-zinc-300">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Radio className="h-6 w-6 text-white dark:text-zinc-900" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">
                    adityahimaone
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Frontend Developer
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              Mixing code and creativity to produce{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">
                pixel-perfect interfaces
              </span>{' '}
              with seamless user experiences. Always exploring the intersection
              of design, engineering, and innovation.
            </motion.p>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 dark:border-green-900 dark:bg-green-950"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                Available for Projects
              </span>
            </motion.div>
          </div>

          {/* Social Links - Vinyl Style */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-6 text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
                Connect
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    onMouseEnter={() => setHoveredSocial(link.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="group perspective-1000 relative"
                  >
                    <div className="relative h-14 w-14 cursor-pointer">
                      {/* Vinyl Record - appears on hover */}
                      <motion.div
                        initial={{ x: 0, rotate: 0, opacity: 0 }}
                        animate={{
                          x: hoveredSocial === link.name ? '60%' : 0,
                          rotate: hoveredSocial === link.name ? 360 : 0,
                          opacity: hoveredSocial === link.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-zinc-950 shadow-xl"
                      >
                        <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,rgba(255,255,255,0.1)_30deg,transparent_60deg)]" />
                        {/* Grooves */}
                        <div className="absolute inset-[20%] rounded-full border border-zinc-800/40" />
                        <div className="absolute inset-[30%] rounded-full border border-zinc-800/40" />
                        {/* Center */}
                        <div
                          className={`flex h-[40%] w-[40%] items-center justify-center rounded-full bg-linear-to-br text-white shadow-inner ${link.color}`}
                        >
                          <link.icon className="h-3 w-3" />
                        </div>
                      </motion.div>

                      {/* Icon Card */}
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{
                          x: hoveredSocial === link.name ? '-10%' : 0,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-lg transition-all hover:shadow-xl ${link.color}`}
                      >
                        <link.icon className="h-6 w-6" />
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-6 text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.map((item, idx) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <span className="h-px w-0 bg-zinc-900 transition-all group-hover:w-4 dark:bg-white" />
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-6 text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-xs text-zinc-500 md:flex-row dark:border-zinc-800 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="h-3 w-3" />
            <span>
              © {currentYear} adityahimaone. All rights reserved. Designed &
              Developed with passion.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              href="#"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Terms
            </Link>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              <Play className="h-3 w-3" />
              Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
