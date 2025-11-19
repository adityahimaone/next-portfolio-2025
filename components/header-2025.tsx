'use client'

import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Moon,
  Sun,
  Menu,
  X,
  Music2,
  Laptop,
  Disc3,
  Code2,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '#', icon: Disc3 },
  { name: 'About', href: '#about', icon: Music2 },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Experience', href: '#experience', icon: Laptop },
  { name: 'Projects', href: '#projects', icon: Sparkles },
  { name: 'Contact', href: '#contact', icon: Music2 },
]

export function Header2025() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setLastScrollY(latest)
  })

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="pointer-events-none fixed top-0 right-0 left-0 z-9999 flex justify-center px-4 pt-6"
      >
        <div className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 p-2 shadow-lg backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
          {/* Logo Area */}
          <Link
            href="#"
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <div className="flex h-4 items-end gap-0.5">
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="bg-primary w-1 rounded-full"
              />
              <motion.div
                animate={{ height: [12, 6, 12] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="bg-primary w-1 rounded-full"
              />
              <motion.div
                animate={{ height: [6, 14, 6] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="bg-primary w-1 rounded-full"
              />
            </div>
            <span className="text-primary hidden text-sm font-medium sm:block">
              adityahimaone
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  hoveredPath === item.href
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-600 dark:text-zinc-400',
                )}
                onMouseEnter={() => setHoveredPath(item.href)}
              >
                <span className="relative z-10">{item.name}</span>
                {hoveredPath === item.href && (
                  <motion.div
                    className="absolute right-0 bottom-1.5 left-0 flex justify-center gap-0.5"
                    layoutId="nav-visualizer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-primary w-0.5 rounded-full"
                        initial={{ height: 0 }}
                        animate={{
                          height: [2, 8, 4, 6, 2],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: i * 0.1,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.div>
                )}
                {hoveredPath === item.href && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-zinc-100 dark:bg-zinc-800"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="mx-2 hidden h-6 w-px bg-zinc-200 md:block dark:bg-zinc-800" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 p-4 shadow-2xl backdrop-blur-xl md:hidden dark:border-zinc-800 dark:bg-zinc-900/90"
          >
            <nav className="grid gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Decorative Music Player Element */}
            <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800">
                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
                  <Music2 className="h-5 w-5 animate-pulse" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="truncate text-sm font-medium">
                    Navigation Mix
                  </div>
                  <div className="truncate text-xs text-zinc-500">
                    Select a track to continue
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      className="bg-primary w-1 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
