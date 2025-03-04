'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Music, Disc, Headphones, Radio, Mic, Disc3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlipLinkProps {
  children: string
  href: string
  icon?: React.ReactNode
}

const FlipLink = ({ children, href, icon }: FlipLinkProps) => {
  const DURATION = 0.25
  const STAGGER = 0.025

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      whileTap="hovered"
      target="_blank"
      href={href}
      className="group relative block overflow-hidden text-4xl font-black whitespace-nowrap uppercase sm:text-5xl md:text-6xl lg:text-7xl"
      style={{
        lineHeight: 0.85,
      }}
    >
      <div className="flex items-center">
        {icon && (
          <motion.span
            className="mr-4 text-white opacity-70 transition-all duration-300 group-hover:opacity-100"
            variants={{
              initial: { rotate: 0 },
              hovered: { rotate: 360 },
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.span>
        )}
        <div>
          {children.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: '-100%',
                },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * i,
              }}
              className="inline-block text-white"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center">
        {icon && <div className="mr-4 w-6 opacity-0">spacer</div>}
        <div>
          {children.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: '100%',
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: 'easeInOut',
                delay: STAGGER * i,
              }}
              className="text-accent inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const mailtoUrl = `mailto:your@email.com?subject=Contact from Website&body=Name: %0D%0A%0D%0AMessage: `

  return (
    <section id="contact" className="relative overflow-hidden" ref={ref}>
      {/* Decorative vinyl records background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/20 absolute -top-28 -left-28 h-56 w-56 rounded-full opacity-50 backdrop-blur-3xl" />
        <div className="bg-secondary/20 absolute -right-28 -bottom-28 h-56 w-56 rounded-full opacity-50 backdrop-blur-3xl" />
        <motion.div
          className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full border border-white/10 opacity-10"
          style={{
            background:
              'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.05) 31%, rgba(255,255,255,0.05) 34%, transparent 35%)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full border border-white/10 opacity-10"
          style={{
            background:
              'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.05) 31%, rgba(255,255,255,0.05) 34%, transparent 35%)',
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Animated music waveform */}
      <div className="absolute right-0 bottom-20 left-0 flex h-12 justify-center overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-accent mx-[1px] w-1 opacity-30"
            animate={{
              height: [
                Math.random() * 20 + 10,
                Math.random() * 40 + 20,
                Math.random() * 20 + 10,
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          'from-primary via-primary-dark to-secondary bg-gradient-to-br px-4',
          'dark:from-zinc-950/90 dark:via-zinc-800/70 dark:to-zinc-900/80',
        )}
      >
        <motion.div
          className="container mx-auto grid place-content-center gap-8 px-8 py-32 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="mb-8 text-center text-3xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's Compose Together
          </motion.h2>

          <div className="flex flex-col gap-6 md:gap-8">
            <FlipLink
              href="https://github.com/adityahimaone"
              icon={<Disc3 className="h-6 w-6" />}
            >
              Github
            </FlipLink>
            <FlipLink
              href="https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq?si=2a79f73cbb334db6"
              icon={<Music className="h-6 w-6" />}
            >
              Spotify
            </FlipLink>
            <FlipLink
              href="https://x.com/adityahimaone"
              icon={<Mic className="h-6 w-6" />}
            >
              Twitter
            </FlipLink>
            <FlipLink
              href="https://linkedin.com/in/adityahimaone"
              icon={<Radio className="h-6 w-6" />}
            >
              Linkedin
            </FlipLink>
            <FlipLink
              href={mailtoUrl}
              icon={<Headphones className="h-6 w-6" />}
            >
              Email • Me
            </FlipLink>
          </div>

          <motion.div
            className="mt-16 text-center text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>Let's create something that resonates.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
