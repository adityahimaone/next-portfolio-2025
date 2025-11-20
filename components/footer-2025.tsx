'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import {
  Github,
  Twitter,
  Linkedin,
  Music,
  Heart,
  Coffee,
  Disc,
  Rewind,
} from 'lucide-react'

export function Footer2025() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/adityahimaone', icon: Github },
    { name: 'Twitter', href: 'https://x.com/adityahimaone', icon: Twitter },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/adityahimaone',
      icon: Linkedin,
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq',
      icon: Music,
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-zinc-200 bg-zinc-50/50 pt-24 pb-12 dark:border-zinc-800 dark:bg-zinc-950/50">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand / Intro */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                <Disc className="animate-spin-slow h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter">
                adityahimaone
              </span>
            </Link>

            <p className="max-w-md text-zinc-600 dark:text-zinc-400">
              Crafting digital experiences with the precision of code and the
              soul of music.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:bg-primary dark:hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 transition-colors hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white"
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation / Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
                Setlist
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                {['Home', 'About', 'Skills', 'Experience', 'Projects'].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
                Liner Notes
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Next.js 15</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>TypeScript</li>
              </ul>
            </div>
          </div>

          {/* Back to Top / Action */}
          <div className="flex flex-col items-start justify-between gap-6 lg:col-span-3 lg:items-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group hover:border-primary hover:text-primary dark:hover:border-primary hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium shadow-sm transition-all sm:flex dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Rewind className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Rewind to Top</span>
            </motion.button>

            <div className="lg:text-right">
              <div className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
                Status
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Open for Collabs
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-xs text-zinc-500 md:flex-row dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <span>© {currentYear} adityahimaone.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Produced with</span>
            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
            <span>and</span>
            <Coffee className="h-3 w-3" />
            <span>in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
