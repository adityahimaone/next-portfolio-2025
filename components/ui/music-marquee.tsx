'use client'

import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MusicMarqueeProps {
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
}

export function MusicMarquee({
  className,
  speed = 'normal',
  direction = 'left',
}: MusicMarqueeProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Music-related phrases for the marquee
  const musicPhrases = [
    'WHERE CODE MEETS RHYTHM',
    'DEVELOPING WITH MUSICAL PRECISION',
    'HARMONIZING TECHNOLOGY & CREATIVITY',
    'CODING TO THE BEAT',
    'FRONTEND SYMPHONIES',
    'DIGITAL COMPOSITIONS',
    'ORCHESTRATING WEB EXPERIENCES',
    'PROGRAMMING IN HARMONY',
    'FULL STACK MELODIES',
    'THE ART OF TECHNICAL COMPOSITION',
  ]

  // Different speeds for the animation
  const speedMap = {
    slow: '60s',
    normal: '40s',
    fast: '25s',
  }

  // Music symbols to display
  const symbols = ['♩', '♪', '♫', '♬', '♭', '♯', '𝄞']

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border-y py-4',
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900/50'
          : 'border-zinc-200 bg-zinc-50/50',
        className,
      )}
    >
      {/* Blurred background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 opacity-20 blur-xl',
            isDarkMode ? 'bg-primary/10' : 'bg-primary/5',
          )}
        />
        {/* Music symbols floating in background */}
        {symbols.map((symbol, index) => (
          <motion.div
            key={index}
            className={cn(
              'absolute text-2xl md:text-3xl lg:text-4xl',
              isDarkMode ? 'text-primary/30' : 'text-primary/20',
            )}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 60 + 10,
            }}
            animate={{
              y: [
                Math.random() * 60 + 10,
                Math.random() * 60 + 10,
                Math.random() * 60 + 10,
              ],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 7,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              left: `${index * (100 / symbols.length)}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Double marquee for infinite scroll effect */}
      <div className="relative z-10 flex w-full">
        <div
          className={cn(
            'animate-marquee flex whitespace-nowrap',
            direction === 'left'
              ? 'animate-marquee'
              : 'animate-marquee-reverse',
          )}
          style={{
            animationDuration: speedMap[speed],
          }}
        >
          {musicPhrases.map((phrase, index) => (
            <div key={index} className="mx-4 flex items-center">
              <span
                className={cn(
                  'text-xl font-bold tracking-wider',
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-800',
                )}
              >
                {phrase}
              </span>
              <span className="text-primary mx-6 text-xl">•</span>
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className={cn(
            'animate-marquee flex whitespace-nowrap',
            direction === 'left'
              ? 'animate-marquee'
              : 'animate-marquee-reverse',
          )}
          style={{
            animationDuration: speedMap[speed],
          }}
        >
          {musicPhrases.map((phrase, index) => (
            <div key={index} className="mx-4 flex items-center">
              <span
                className={cn(
                  'text-xl font-bold tracking-wider',
                  isDarkMode ? 'text-zinc-100' : 'text-zinc-800',
                )}
              >
                {phrase}
              </span>
              <span className="text-primary mx-6 text-xl">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
