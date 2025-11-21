'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Sun, Moon, Menu, X } from 'lucide-react'
import useClickOutside from '@/hooks/useClickOutside'

const navItems = [
  { name: 'HOME', href: '#' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXP', href: '#experience' },
  { name: 'WORK', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
]

export function HeaderKnob() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeKnob, setActiveKnob] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useClickOutside(mobileMenuRef, (e) => {
    if (
      isOpen &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b-4 px-6 shadow-xl transition-all duration-300 md:px-10',
          isScrolled
            ? 'border-primary/50 h-16 bg-white/80 backdrop-blur-md md:h-20 dark:bg-zinc-900/80'
            : 'border-primary dark:border-primary/50 h-20 bg-linear-to-b from-zinc-100 to-zinc-200 md:h-24 dark:from-zinc-900 dark:to-zinc-950',
        )}
      >
        {/* Left: Power Switch (Theme Toggle) */}
        <div className="flex items-start gap-4 md:gap-6">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={toggleTheme}
              className="relative h-8 w-14 cursor-pointer rounded-sm bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-colors dark:bg-zinc-800"
              aria-label="Toggle Theme"
            >
              <div className="absolute inset-0 flex items-center justify-between px-1.5">
                <Sun size={12} className="text-zinc-500" />
                <Moon size={12} className="text-zinc-500" />
              </div>
              <motion.div
                className="bg-primary absolute top-1 bottom-1 z-10 w-1/2 rounded-sm shadow-md"
                animate={{
                  x: theme === 'dark' ? '90%' : '10%',
                  backgroundColor:
                    theme === 'dark' ? 'var(--primary)' : '#9ca3af',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className="text-[8px] font-bold tracking-widest text-zinc-600 md:text-[10px] dark:text-zinc-400">
              POWER
            </span>
          </div>
          <div className="relative mt-2 h-4 w-4 md:h-5 md:w-5">
            <div
              className={cn(
                'absolute inset-0 rounded-full transition-colors duration-500',
                mounted && theme === 'dark'
                  ? 'animate-pulse bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                  : 'bg-zinc-400',
              )}
            />
            <div className="absolute top-1 left-1 h-1 w-1 rounded-full bg-white/50 md:top-1.5 md:left-1.5 md:h-1.5 md:w-1.5" />
          </div>
        </div>

        {/* Center: Navigation Knobs (Desktop) */}
        <nav className="hidden items-center gap-4 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col items-center gap-1.5"
              onMouseEnter={() => setActiveKnob(item.name)}
              onMouseLeave={() => setActiveKnob(null)}
            >
              <div
                className={cn(
                  'group-hover:border-primary relative transform cursor-pointer rounded-full border-2 border-zinc-300 bg-linear-to-b from-zinc-100 to-zinc-300 shadow-lg transition-all group-hover:rotate-45 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900',
                  isScrolled ? 'h-10 w-10' : 'h-12 w-12',
                )}
              >
                <div className="absolute top-1 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-zinc-400 dark:bg-zinc-500" />
                {/* Indicator Dot */}
                <div className="bg-primary absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <span
                className={cn(
                  'text-[10px] font-bold tracking-widest transition-colors',
                  activeKnob === item.name
                    ? 'text-primary'
                    : 'text-zinc-600 dark:text-zinc-400',
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex flex-col items-center gap-1 lg:hidden">
          <button
            ref={toggleButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'relative transform cursor-pointer rounded-full border-2 border-zinc-300 bg-linear-to-b from-zinc-100 to-zinc-300 shadow-lg transition-all dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900',
              isScrolled ? 'h-10 w-10' : 'h-12 w-12',
              isOpen ? 'border-primary rotate-135' : 'rotate-0',
            )}
            aria-label="Toggle Menu"
          >
            <div className="absolute top-1 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-zinc-400 dark:bg-zinc-500" />
            <div
              className={cn(
                'bg-primary absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-opacity',
                isOpen ? 'opacity-100' : 'opacity-0',
              )}
            />
          </button>
          <span className="text-[8px] font-bold tracking-widest text-zinc-600 md:text-[10px] dark:text-zinc-400">
            MENU
          </span>
        </div>

        {/* Right: Input Jack (Logo/Brand?) */}
        <div className="hidden flex-col items-center gap-1.5 md:flex">
          <div
            className={cn(
              'flex items-center justify-center rounded-full border-4 border-zinc-300 bg-zinc-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] dark:border-zinc-700 dark:bg-zinc-800',
              isScrolled ? 'h-8 w-8 border-2' : 'h-10 w-10',
            )}
          >
            <div
              className={cn(
                'rounded-full bg-black/80',
                isScrolled ? 'h-3 w-3' : 'h-4 w-4',
              )}
            />
          </div>
          <span className="text-[8px] font-bold tracking-widest text-zinc-600 md:text-[10px] dark:text-zinc-400">
            INPUT
          </span>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 overflow-hidden rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            <nav className="grid gap-4">
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
                    className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                  >
                    <span className="text-lg font-bold tracking-wider text-zinc-700 dark:text-zinc-200">
                      {item.name}
                    </span>
                    <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
