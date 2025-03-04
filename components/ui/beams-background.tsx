'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface AnimatedGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: 'subtle' | 'medium' | 'strong'
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  isPrimary: boolean
  isAccent: boolean
  pulse: number
  pulseSpeed: number
}

// Define color ranges to match your tailwind config
const COLORS = {
  primary: { hue: 230, sat: 55, light: 35 }, // #273281 (deep navy blue)
  secondary: { hue: 235, sat: 45, light: 40 }, // #3d468b (lighter blue)
  accent: { hue: 40, sat: 85, light: 50 }, // #E6A817 (golden amber)
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10
  const isPrimary = Math.random() > 0.3
  const isAccent = !isPrimary && Math.random() > 0.5

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: isPrimary
      ? COLORS.primary.hue
      : isAccent
        ? COLORS.accent.hue
        : COLORS.secondary.hue,
    isPrimary,
    isAccent,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export function BeamsBackground({
  className,
  children,
  intensity = 'strong',
}: AnimatedGradientBackgroundProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const MINIMUM_BEAMS = 20

  // Fix hydration mismatch by using client-side only state
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // On first mount, default to dark mode if no theme is set
    if (mounted && !localStorage.getItem('theme')) {
      setTheme('dark')
    }
  }, [mounted, setTheme])

  // Calculate isDarkMode properly from theme state
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  const opacityMap = {
    subtle: isDarkMode ? 0.7 : 0.5,
    medium: isDarkMode ? 0.85 : 0.65,
    strong: isDarkMode ? 1 : 0.8,
  }

  // Set mounted state on client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run canvas code on client and after mounting
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      const totalBeams = MINIMUM_BEAMS * 1.5
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height),
      )
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam

      const column = index % 3
      const spacing = canvas.width / 3

      beam.y = canvas.height + 100
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4

      // Determine color based on beam type
      const isPrimary = Math.random() > 0.3
      const isAccent = !isPrimary && Math.random() > 0.5
      beam.isPrimary = isPrimary
      beam.isAccent = isAccent
      beam.hue = isPrimary
        ? COLORS.primary.hue
        : isAccent
          ? COLORS.accent.hue
          : COLORS.secondary.hue

      beam.opacity = 0.2 + Math.random() * 0.1
      return beam
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      // Calculate pulsing opacity
      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity]

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      // Get saturation and lightness based on beam type and theme
      let sat, light

      if (beam.isPrimary) {
        sat = COLORS.primary.sat + (isDarkMode ? 5 : -5)
        light = COLORS.primary.light + (isDarkMode ? 10 : 0)
      } else if (beam.isAccent) {
        sat = COLORS.accent.sat + (isDarkMode ? 0 : -10)
        light = COLORS.accent.light + (isDarkMode ? 5 : -5)
      } else {
        sat = COLORS.secondary.sat + (isDarkMode ? 5 : -5)
        light = COLORS.secondary.light + (isDarkMode ? 10 : 0)
      }

      // Enhanced gradient with multiple color stops
      gradient.addColorStop(0, `hsla(${beam.hue}, ${sat}%, ${light}%, 0)`)
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, ${sat}%, ${light}%, ${pulsingOpacity * 0.5})`,
      )
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, ${sat}%, ${light}%, ${pulsingOpacity})`,
      )
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, ${sat}%, ${light}%, ${pulsingOpacity})`,
      )
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, ${sat}%, ${light}%, ${pulsingOpacity * 0.5})`,
      )
      gradient.addColorStop(1, `hsla(${beam.hue}, ${sat}%, ${light}%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = isDarkMode ? 'blur(35px)' : 'blur(45px)'

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(ctx, beam)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity, isDarkMode, mounted])

  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        isDarkMode ? 'bg-zinc-950' : 'bg-white',
        className,
      )}
    >
      {mounted && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ filter: isDarkMode ? 'blur(15px)' : 'blur(20px)' }}
          />

          <motion.div
            className={`absolute inset-0 ${isDarkMode ? 'bg-zinc-950/5' : 'bg-white/10'}`}
            animate={{
              opacity: isDarkMode ? [0.05, 0.15, 0.05] : [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              ease: 'easeInOut',
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              backdropFilter: isDarkMode ? 'blur(50px)' : 'blur(30px)',
            }}
          />
        </>
      )}

      <div className="relative z-10 h-screen w-full">{children}</div>
    </div>
  )
}
