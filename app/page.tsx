'use client'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from 'motion/react'
import { Preloader } from '@/components/ui/preloader'
import { Header2025 } from '@/components/header-2025'
import { Footer2025 } from '@/components/footer-2025'
import { HeroSection2025 } from '@/components/sections/hero-2025'
import { AboutSection2025v2 } from '@/components/sections/about-2025-v2'
import { SkillsSection } from '@/components/sections/skills'
import { ExperienceSection2025 } from '@/components/sections/experience-2025'
import { ProjectsSection2025 } from '@/components/sections/projects-2025'
import { ContactLaunchpad } from '@/components/sections/contact-launchpad'
import { SectionDivider } from '@/components/ui/section-divider'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ChevronUp } from 'lucide-react'
import { initCursorGlow } from '@/lib/utils'
import { BeamsBackground } from '@/components/ui/beams-background'
import { MusicPlayer } from '@/components/ui/music-player'
import { MusicBackground } from '@/components/ui/music-background'
import { MusicMarquee } from '@/components/ui/music-marquee'
import { About2Section } from '@/components/sections/about-2'
import { SkillsMixer } from '@/components/sections/skills-mixer'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })
  const mainRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(mainRef, { once: false })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Opacity for floating elements based on scroll
  const floatingOpacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 0])

  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // useEffect(() => {
  //   // Initialize the music-themed cursor
  //   const cleanupCursor = initCursorGlow()

  //   // Return cleanup function
  //   return () => {
  //     if (cleanupCursor) cleanupCursor()
  //   }
  // }, [])

  useEffect(() => {
    // Preload any assets or initialize animations
    const body = document.querySelector('body')
    if (body) {
      body.classList.add('cursor-glow')
    }

    // Show scroll-to-top button after scrolling down
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="from-primary via-secondary to-accent fixed top-0 right-0 left-0 z-100 h-1 bg-linear-to-r"
        style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
      />

      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Background elements with parallax effect */}
        <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
          <div className="bg-gradient-radial to-background/50 dark:to-background/80 absolute inset-0 from-transparent" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03]" />
        </motion.div>

        {/* Music notes scattered in background with better positioning */}
        <motion.div
          className="pointer-events-none fixed top-1/4 left-[10%] text-4xl"
          style={{ opacity: floatingOpacity }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <span className="text-primary opacity-20 drop-shadow-md">♪</span>
        </motion.div>

        <motion.div
          className="pointer-events-none fixed top-1/3 right-[15%] text-5xl"
          style={{ opacity: floatingOpacity }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          }}
        >
          <span className="text-secondary opacity-20 drop-shadow-md">♫</span>
        </motion.div>

        <motion.div
          className="pointer-events-none fixed bottom-1/4 left-1/4 text-6xl"
          style={{ opacity: floatingOpacity }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2,
          }}
        >
          <span className="text-primary-light opacity-20 drop-shadow-md">
            ♩
          </span>
        </motion.div>

        <motion.div
          className="pointer-events-none fixed right-1/4 bottom-1/3 text-5xl"
          style={{ opacity: floatingOpacity }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 3,
          }}
        >
          <span className="text-accent opacity-20 drop-shadow-md">♬</span>
        </motion.div>

        {/* Main content */}
        <main className="relative">
          <div className="snap-y snap-mandatory">
            {/* Hero Section with Beams Background */}
            <section className="relative h-screen snap-start overflow-hidden">
              <BeamsBackground
                intensity="medium"
                className="absolute inset-0 z-0"
              />
              <div className="relative">
                <Header2025 />
                <div className="mx-auto w-full max-w-7xl px-4 pt-20">
                  <HeroSection2025 />
                </div>
              </div>
            </section>
            {/* Music-themed marquee divider */}
            <MusicMarquee speed="normal" direction="left" />
            {/* Main Content Sections */}
            <div className="mx-auto w-full max-w-7xl space-y-2 py-20">
              <SectionDivider />
              <section id="about" className="snap-start scroll-mt-0">
                <AboutSection2025v2 />
              </section>

              <SectionDivider />
              <section id="skills" className="snap-start scroll-mt-0">
                <SkillsMixer />
              </section>

              <SectionDivider />
              <section id="experience" className="snap-start scroll-mt-0">
                <ExperienceSection2025 />
              </section>

              <SectionDivider />
            </div>
            <section
              id="projects"
              className="dark:bg-accent snap-start scroll-mt-0"
            >
              <ProjectsSection2025 />
            </section>
            <div className="mb-5">
              <SectionDivider />
            </div>
            <section id="contact" className="snap-start">
              <ContactLaunchpad />
            </section>
          </div>
        </main>
      </motion.div>

      {/* Footer */}
      <Footer2025 />

      {/* Scroll to top button */}
      <motion.button
        onClick={handleScrollToTop}
        className="from-primary to-secondary fixed right-7 bottom-24 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-white shadow-lg transition-transform"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronUp size={24} />
      </motion.button>

      {/* Cursor follower effect for musical theme */}
      {/* <div
        id="cursor-glow"
        className="fixed top-0 left-0 z-50 w-16 h-16 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 pointer-events-none bg-gradient-radial from-primary/30 to-transparent blur-md"
        style={{
          willChange: 'transform',
          boxShadow: '0 0 15px 3px rgba(39, 50, 129, 0.15)',
        }}
      /> */}

      {/* Music */}
      <MusicPlayer />
    </>
  )
}
