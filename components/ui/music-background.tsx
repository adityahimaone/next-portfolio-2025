'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame } from 'motion/react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface MusicBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: 'subtle' | 'medium' | 'strong'
}

// Music notes to render in background
const musicNotes = [
  '♩',
  '♪',
  '♫',
  '♬',
  '♭',
  '♮',
  '♯',
  '𝄞',
  '𝄢',
  '𝅘𝅥𝅮',
  '𝅘𝅥𝅯',
  '𝅘𝅥𝅰',
]

export function MusicBackground({
  className,
  children,
  intensity = 'medium',
}: MusicBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const notesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      opacity: number
      character: string
      velocity: number
      rotation: number
      rotationSpeed: number
    }>
  >([])
  const wavePointsRef = useRef<
    Array<{
      x: number
      y: number
      originalY: number
      amplitude: number
      frequency: number
      phase: number
    }>
  >([])

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Opacity map based on intensity
  const opacityMap = {
    subtle: isDarkMode ? 0.4 : 0.25,
    medium: isDarkMode ? 0.6 : 0.4,
    strong: isDarkMode ? 0.8 : 0.6,
  }

  // Set mounted state on client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize animation
  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas to match window
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Initialize music notes
      notesRef.current = Array.from({ length: 20 }, () => {
        const size = 12 + Math.random() * 24
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity: 0.1 + Math.random() * 0.3,
          character: musicNotes[Math.floor(Math.random() * musicNotes.length)],
          velocity: 0.2 + Math.random() * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        }
      })

      // Initialize wave points
      const points = 20
      const spacing = canvas.width / points
      wavePointsRef.current = Array.from({ length: points + 1 }, (_, i) => {
        return {
          x: i * spacing,
          y: canvas.height * 0.5,
          originalY: canvas.height * 0.5,
          amplitude: 10 + Math.random() * 40,
          frequency: 0.01 + Math.random() * 0.01,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [mounted])

  // Animation frame update
  useAnimationFrame((time) => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw sound waves at bottom
    ctx.beginPath()

    // Update wave points
    wavePointsRef.current.forEach((point, i) => {
      point.phase += 0.01
      point.y =
        point.originalY + Math.sin(time * 0.001 + point.phase) * point.amplitude

      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        const prevPoint = wavePointsRef.current[i - 1]
        const midX = (prevPoint.x + point.x) / 2
        const midY = (prevPoint.y + point.y) / 2
        ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY)
      }
    })

    // Complete wave path
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()

    // Wave gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    if (isDarkMode) {
      gradient.addColorStop(0, 'rgba(39, 50, 129, 0)')
      gradient.addColorStop(0.7, 'rgba(39, 50, 129, 0.1)')
      gradient.addColorStop(1, 'rgba(39, 50, 129, 0.2)')
    } else {
      gradient.addColorStop(0, 'rgba(39, 50, 129, 0)')
      gradient.addColorStop(0.7, 'rgba(39, 50, 129, 0.05)')
      gradient.addColorStop(1, 'rgba(39, 50, 129, 0.1)')
    }

    ctx.fillStyle = gradient
    ctx.fill()

    // Draw stroke on top of wave
    ctx.beginPath()
    wavePointsRef.current.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        const prevPoint = wavePointsRef.current[i - 1]
        const midX = (prevPoint.x + point.x) / 2
        const midY = (prevPoint.y + point.y) / 2
        ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY)
      }
    })

    ctx.strokeStyle = isDarkMode
      ? `rgba(230, 168, 23, ${opacityMap[intensity] * 0.3})`
      : `rgba(61, 70, 139, ${opacityMap[intensity] * 0.3})`
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw and update music notes
    notesRef.current.forEach((note) => {
      // Move notes upward
      note.y -= note.velocity
      note.rotation += note.rotationSpeed

      // Reset notes that move off-screen
      if (note.y < -50) {
        note.y = canvas.height + 50
        note.x = Math.random() * canvas.width
      }

      // Draw the note
      ctx.save()
      ctx.translate(note.x, note.y)
      ctx.rotate(note.rotation)
      ctx.font = `${note.size}px serif`
      ctx.fillStyle = isDarkMode
        ? `rgba(230, 168, 23, ${note.opacity * opacityMap[intensity]})`
        : `rgba(39, 50, 129, ${note.opacity * opacityMap[intensity]})`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(note.character, 0, 0)
      ctx.restore()
    })

    // Draw pulsing circles for bass visualization
    const numCircles = 3
    for (let i = 0; i < numCircles; i++) {
      const pulseSize = Math.sin(time * 0.002 + i) * 0.5 + 0.5
      const size = 50 + pulseSize * 100
      const x = (canvas.width * (i + 1)) / (numCircles + 1)
      const y = canvas.height * 0.7

      const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, size)

      if (isDarkMode) {
        circleGradient.addColorStop(
          0,
          `rgba(230, 168, 23, ${0.1 * opacityMap[intensity]})`,
        )
        circleGradient.addColorStop(
          0.6,
          `rgba(230, 168, 23, ${0.05 * opacityMap[intensity]})`,
        )
        circleGradient.addColorStop(1, 'rgba(230, 168, 23, 0)')
      } else {
        circleGradient.addColorStop(
          0,
          `rgba(39, 50, 129, ${0.1 * opacityMap[intensity]})`,
        )
        circleGradient.addColorStop(
          0.6,
          `rgba(39, 50, 129, ${0.05 * opacityMap[intensity]})`,
        )
        circleGradient.addColorStop(1, 'rgba(39, 50, 129, 0)')
      }

      ctx.fillStyle = circleGradient
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        isDarkMode ? 'bg-zinc-950' : 'bg-white',
        className,
      )}
    >
      {/* Background canvas for animations */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          filter: isDarkMode ? 'blur(12px)' : 'blur(15px)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Overlay with subtle noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.01] dark:opacity-[0.02]" />

      {/* Gradient overlay */}
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

      {/* Equalizer bars at bottom */}
      <div className="absolute right-0 bottom-0 left-0 hidden h-16 items-end justify-center space-x-1 overflow-hidden opacity-20 sm:flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-t-sm ${isDarkMode ? 'bg-accent' : 'bg-primary'}`}
            animate={{
              height: [
                `${10 + Math.random() * 40}%`,
                `${10 + Math.random() * 90}%`,
                `${10 + Math.random() * 40}%`,
              ],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.7,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 h-screen w-full">
        {/* Background Elements remain unchanged */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] dark:opacity-[1]"></div>
        </div>
        {children}
      </div>
    </div>
  )
}
