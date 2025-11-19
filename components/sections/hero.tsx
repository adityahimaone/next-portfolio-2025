'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'motion/react'
import Image from 'next/image'

export function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
      },
    },
  }

  // Floating particles positions - code and music symbols
  const particles = [
    { symbol: '</>', x: 15, y: 20, delay: 0 },
    { symbol: '♪', x: 85, y: 30, delay: 1 },
    { symbol: '{}', x: 10, y: 70, delay: 2 },
    { symbol: '♫', x: 90, y: 60, delay: 1.5 },
    { symbol: '<>', x: 25, y: 85, delay: 0.5 },
    { symbol: '♬', x: 75, y: 15, delay: 2.5 },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] items-center overflow-hidden py-4 pb-4 sm:min-h-[90vh] sm:py-20 sm:pb-20 md:py-24"
      ref={ref}
    >
      {/* Gradient Mesh Background - Modern 2025 aesthetic */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-secondary/30 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.3, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Floating Particles - Code & Music Symbols */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="pointer-events-none absolute text-2xl font-bold opacity-20 dark:opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            {particle.symbol}
          </span>
        </motion.div>
      ))}

      {/* Main Content - improved spacing */}
      <motion.div
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 sm:gap-12 sm:px-6 md:grid-cols-2 md:items-center lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Text Content - Push to bottom on mobile, left on desktop */}
        <div className="order-2 mt-3 sm:mt-8 md:order-1 md:mt-0">
          {/* Badge with glassmorphism effect */}
          <motion.div
            className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-xl"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Frontend Developer & Music Enthusiast
            </span>
          </motion.div>

          <motion.h1
            className="mb-5 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={itemVariants}
          >
            {/* Enhanced heading with split text animation */}
            <motion.span
              className="inline-block bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Code
            </motion.span>{' '}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Meets
              </motion.span>
              <motion.svg
                className="absolute -bottom-0 left-0 w-full"
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                fill="none"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
              >
                <motion.path
                  d="M0,5 C25,0 75,10 100,5"
                  stroke="url(#paint0_linear)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="5"
                    x2="100"
                    y2="5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>{' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Rhythm
            </motion.span>
          </motion.h1>

          {/* Description - adjusted for mobile */}
          <motion.p
            className="mb-6 text-base leading-relaxed text-zinc-700 sm:mb-8 sm:text-lg dark:text-zinc-300"
            variants={itemVariants}
          >
            Crafting visually stunning and performant web experiences with the
            precision of a musician and the creativity of an artist.
          </motion.p>

          {/* Buttons - remain the same */}
          <motion.div
            className="mb-8 flex flex-wrap gap-4 sm:mb-10"
            variants={itemVariants}
          >
            {/* Buttons content remains the same */}
            <motion.a
              href="#projects"
              className="from-primary to-secondary focus:ring-primary/50 relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:outline-none sm:px-8 sm:py-3.5 sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l4 5-4 5M7 7l4 5-4 5"
                  ></path>
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-transparent px-6 py-3 text-sm font-medium text-zinc-800 transition-all duration-300 hover:scale-105 sm:px-8 sm:py-3.5 sm:text-base dark:border-zinc-700 dark:text-zinc-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="from-primary to-secondary absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links - fixed spacing for mobile */}
          <motion.div
            className="hidden flex-col gap-5 sm:flex sm:flex-row sm:items-center sm:gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4">
              {/* Social icons remain unchanged */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary dark:hover:text-primary-light text-zinc-600 transition-colors dark:text-zinc-400"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary dark:hover:text-primary-light text-zinc-600 transition-colors dark:text-zinc-400"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary dark:hover:text-primary-light text-zinc-600 transition-colors dark:text-zinc-400"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>

            {/* Scroll indicator - fixed spacing for mobile */}
            <div className="mt-1 mb-2 flex items-center gap-2 sm:mt-0 sm:mb-0">
              <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700"></div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* Image Content - Enhanced 3D Vinyl with better depth */}
        <motion.div
          className="relative order-1 flex justify-center pb-0 sm:pb-3 md:order-2 md:pb-8"
          variants={itemVariants}
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            className="xs:h-[250px] xs:w-[250px] relative h-[270px] w-[270px] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px]"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Enhanced glow effect with multiple layers */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Rotating gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--primary))',
                opacity: 0.15,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Main vinyl container with enhanced shadows */}
            <motion.div
              className="relative h-full w-full rounded-full p-3 backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                boxShadow:
                  '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
                transformStyle: 'preserve-3d',
              }}
              className="dark:bg-zinc-800/80"
              initial={{ rotate: 0 }}
              whileHover="spinning"
              whileTap="spinning"
              variants={{
                spinning: {
                  scale: 1.08,
                  rotate: 360,
                  transition: {
                    scale: { duration: 0.4, ease: 'easeOut' },
                    rotate: {
                      duration: 2.5,
                      ease: 'linear',
                      repeat: Infinity,
                      repeatType: 'loop',
                    },
                  },
                },
              }}
            >
              {/* Vinyl grooves effect */}
              <div className="vinyl-record vinyl-modern absolute inset-3 rounded-full bg-zinc-900 p-[12%] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] dark:bg-zinc-300">
                <motion.div
                  className="relative h-full w-full rounded-full bg-zinc-100 p-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] dark:bg-zinc-800"
                  variants={{
                    spinning: {
                      rotate: 0,
                    },
                  }}
                >
                  <div className="h-full w-full overflow-hidden rounded-full shadow-2xl">
                    <div className="relative h-full w-full">
                      <Image
                        src="/nwjns.jpeg"
                        alt="Developer with headphones"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                        priority
                      />
                      {/* Gradient overlay with better blending */}
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center spindle with metallic effect */}
              <div
                className="absolute top-1/2 left-1/2 h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)]"
                style={{
                  background:
                    'radial-gradient(circle, #1f2937 0%, #111827 100%)',
                }}
              ></div>
            </motion.div>

            {/* Enhanced floating music notes with trail effects */}
            <motion.div
              className="absolute top-10 -right-4 block text-4xl drop-shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                y: [0, -20, -50],
                x: [0, 10, 25],
                scale: [0, 1.2, 1, 0.5],
                rotate: [0, 15, 30],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeOut',
              }}
            >
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                ♪
              </span>
            </motion.div>

            <motion.div
              className="absolute top-16 -left-8 block text-5xl drop-shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                y: [0, -30, -80],
                x: [0, -15, -40],
                scale: [0, 1.3, 1.1, 0.6],
                rotate: [0, -10, -25],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeOut',
              }}
            >
              <span className="bg-gradient-to-br from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
                ♫
              </span>
            </motion.div>

            <motion.div
              className="absolute -right-6 bottom-8 block text-6xl font-bold drop-shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                y: [0, -25, -60, -40],
                x: [0, 15, 35, 50],
                scale: [0, 1.4, 1.2, 0.7],
                rotate: [0, 10, 20, 15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 0.8,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeInOut',
              }}
            >
              <span className="bg-gradient-to-br from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                ♬
              </span>
            </motion.div>

            <motion.div
              className="absolute -top-4 left-1/4 block text-3xl font-bold drop-shadow-md"
              initial={{ opacity: 0, y: 50, scale: 0.2 }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                y: [50, 10, -70, -130],
                scale: [0.2, 1.1, 0.9, 0.4],
                x: [0, 15, 40, 60],
                rotate: [0, 60, 120, 200],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeOut',
              }}
            >
              <span className="bg-gradient-to-br from-accent to-purple-500 bg-clip-text text-transparent">
                ♭
              </span>
            </motion.div>

            {/* Code symbols mixed with music */}
            <motion.div
              className="absolute bottom-20 -left-10 hidden text-4xl font-bold drop-shadow-lg md:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.9, 0.7, 0],
                scale: [0.5, 1.5, 1.2, 0.8],
                y: [0, -35, -70],
                rotate: [0, -15, -30],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            >
              <span className="bg-gradient-to-br from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
                &lt;/&gt;
              </span>
            </motion.div>

            <motion.div
              className="absolute top-1/3 -right-12 hidden text-4xl font-bold drop-shadow-lg md:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                x: [-20, 30, 70],
                y: [0, -35, -15],
                rotate: [0, 25, 15, -25, 0],
                scale: [0.8, 1.4, 1.1, 0.9],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: 'backOut',
              }}
            >
              <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                {'{'}'}
              </span>
            </motion.div>

            {/* Additional particle effects */}
            <motion.div
              className="absolute top-1/2 left-0 hidden text-2xl font-bold drop-shadow-md md:block"
              animate={{
                opacity: [0, 0.6, 0],
                x: [-30, 0, 30],
                y: [0, -40, -80],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <span className="bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">
                ♩
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator remains hidden on mobile */}
      {/* <motion.div
        className="absolute hidden -translate-x-1/2 bottom-6 left-1/2 sm:block"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Scroll
          </span>
          <div className="w-6 h-12 p-1 border rounded-full border-zinc-300 dark:border-zinc-700">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, 6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>
        </div>
      </motion.div> */}
    </section>
  )
}
