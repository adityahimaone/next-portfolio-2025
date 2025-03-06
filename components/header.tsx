'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Add scroll event listener
    const handleScroll = () => {
      // Change state based on scroll position (50px threshold)
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    // Initial check in case page loads scrolled down
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? 'bg-white/80 shadow-sm backdrop-blur-md dark:bg-zinc-900/80' : 'bg-transparent'} `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span
              className={`text-gradient text-xl font-bold ${!scrolled && 'drop-shadow-md'}`}
            >
              adit
            </span>
            <div className="ml-2 flex h-4 items-end">
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <motion.li key={item.name} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className={`hover:text-primary dark:hover:text-primary-light transition-colors ${scrolled ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-800 dark:text-zinc-100'} ${!scrolled && 'drop-shadow-sm'}`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className={`relative z-50 rounded-full p-2 transition-colors ${
                scrolled
                  ? 'text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  : 'text-zinc-800 hover:bg-white/10 dark:text-zinc-100 dark:hover:bg-zinc-800/30'
              }`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <SunIcon size={20} />
              ) : (
                <MoonIcon size={20} />
              )}
            </motion.button>
          )}

          {/* Mobile menu button */}
          <motion.button
            className={`block md:hidden ${!scrolled && 'drop-shadow-sm'}`}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <nav className="border-t border-zinc-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      href={item.href}
                      className="hover:text-primary dark:hover:text-primary-light block text-zinc-700 transition-colors dark:text-zinc-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
