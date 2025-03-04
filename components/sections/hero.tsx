'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'motion/react'
import Image from 'next/image'

export function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center py-12 sm:py-16 md:py-20"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid pattern or noise overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.015] dark:opacity-[0.03]"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 sm:gap-12 sm:px-6 md:grid-cols-2 md:items-center lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Text Content - Push to bottom on mobile, left on desktop */}
        <div className="order-2 mt-8 md:order-1 md:mt-0">
          <motion.div
            className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            variants={itemVariants}
          >
            Frontend Developer & Music Enthusiast
          </motion.div>

          <motion.h1
            className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={itemVariants}
          >
            <span className="text-gradient from-primary to-secondary">
              Code
            </span>{' '}
            <span className="relative inline-block">
              Meets
              <motion.svg
                className="absolute -bottom-0 left-0 w-full"
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                fill="none"
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
              >
                <path
                  d="M0,5 C25,0 75,10 100,5"
                  stroke="url(#paint0_linear)"
                  strokeWidth="3"
                  strokeLinecap="round"
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
            <span className="text-gradient from-secondary to-primary">
              Rhythm
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-300"
            variants={itemVariants}
          >
            Crafting visually stunning and performant web experiences with the
            precision of a musician and the creativity of an artist.
          </motion.p>

          <motion.div
            className="mb-10 flex flex-wrap gap-4"
            variants={itemVariants}
          >
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

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4">
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

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700"></div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* Image Content - Push to top on mobile, right on desktop */}
        <motion.div
          className="relative order-1 flex justify-center md:order-2"
          variants={itemVariants}
        >
          <div className="relative h-[280px] w-[280px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
            {/* Animated gradient background */}
            <motion.div
              className="bg-gradient-conic from-primary to-secondary absolute inset-0 rounded-full via-purple-500 opacity-25 blur-3xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Modern vinyl record design with 3D effect */}
            <motion.div
              className="relative h-full w-full rounded-full bg-zinc-100/80 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm dark:bg-zinc-800/80"
              whileHover={{
                scale: 1.05,
                rotate: 10,
                transition: { duration: 0.5 },
              }}
            >
              <div className="vinyl-record vinyl-modern h-full w-full rounded-full bg-zinc-900 p-[12%] dark:bg-zinc-300">
                <div className="h-full w-full rounded-full bg-zinc-100 p-4 shadow-inner dark:bg-zinc-800">
                  <div className="h-full w-full overflow-hidden rounded-full shadow-2xl">
                    {/* Profile image with modern overlay effects */}
                    <div className="relative h-full w-full">
                      <Image
                        src="/nwjns.jpeg"
                        alt="Developer with headphones"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                        priority
                      />
                      <div className="from-primary/30 absolute inset-0 bg-gradient-to-tr to-transparent opacity-60"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central vinyl hole with 3D effect */}
              <div className="absolute top-1/2 left-1/2 h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800 shadow-inner dark:bg-zinc-200"></div>
            </motion.div>

            {/* Modern floating music notes with better animations */}
            {/* Only show on larger screens to prevent clipping on mobile */}
            <motion.div
              className="text-primary absolute top-10 -right-4 hidden text-4xl drop-shadow-lg sm:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -40],
                x: [0, 20],
                scale: [0, 1, 0.5],
                rotate: [0, 20],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              ♪
            </motion.div>

            <motion.div
              className="text-secondary absolute -bottom-2 left-10 hidden text-5xl drop-shadow-lg sm:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -50],
                x: [0, -15],
                scale: [0, 1, 0.5],
                rotate: [0, -10],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1.5,
              }}
            >
              ♫
            </motion.div>

            <motion.div
              className="absolute top-1/3 -left-4 hidden text-4xl text-purple-500 drop-shadow-lg sm:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -30],
                x: [0, -10],
                scale: [0, 1, 0.5],
                rotate: [0, -5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 0.5,
              }}
            >
              ♩
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modern scroll indicator - Hide on small screens */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
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
          <div className="h-12 w-6 rounded-full border border-zinc-300 p-1 dark:border-zinc-700">
            <motion.div
              className="bg-primary h-2 w-2 rounded-full"
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
      </motion.div>
    </section>
  )
}
