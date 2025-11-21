'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface WaveformBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: 'subtle' | 'medium' | 'strong'
}

interface Wave {
  amplitude: number
  frequency: number
  phase: number
  speed: number
  color: string
  yOffset: number
  lineWidth: number
}

export function WaveformBackground({
  className,
  children,
  intensity = 'medium',
}: WaveformBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const wavesRef = useRef<Wave[]>([])
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      primary: isDarkMode ? '#273281' : '#273281',
      secondary: isDarkMode ? '#3d468b' : '#3d468b',
      accent: isDarkMode ? '#E6A817' : '#E6A817',
      grid: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
    }),
    [isDarkMode],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initWaves = () => {
      const height = window.innerHeight

      wavesRef.current = [
        {
          amplitude: height * 0.12,
          frequency: 0.003,
          phase: 0,
          speed: 0.002,
          color: colors.primary,
          yOffset: height * 0.5,
          lineWidth: 2,
        },
        {
          amplitude: height * 0.08,
          frequency: 0.005,
          phase: 1,
          speed: 0.003,
          color: colors.secondary,
          yOffset: height * 0.5,
          lineWidth: 1.5,
        },
        {
          amplitude: height * 0.05,
          frequency: 0.007,
          phase: 2,
          speed: 0.004,
          color: colors.accent,
          yOffset: height * 0.5,
          lineWidth: 1,
        },
      ]
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initWaves()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1

      // Vertical lines (beats)
      const beatSpacing = 100
      for (let x = 0; x < width; x += beatSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal lines (pitch/amplitude)
      const pitchSpacing = 50
      for (let y = 0; y < height; y += pitchSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      // Draw Grid
      drawGrid(width, height)

      // Draw waves
      wavesRef.current.forEach((wave) => {
        ctx.beginPath()

        for (let x = 0; x < width; x++) {
          const y =
            wave.yOffset +
            Math.sin(x * wave.frequency + wave.phase) *
              wave.amplitude *
              Math.sin(x * 0.001 + wave.phase * 0.5)

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = wave.color
        ctx.lineWidth = wave.lineWidth
        ctx.stroke()

        // Add a glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = wave.color
        ctx.stroke()
        ctx.shadowBlur = 0

        // Update phase
        wave.phase += wave.speed
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors])

  return (
    <div
      className={cn(
        'bg-background relative h-full w-full overflow-hidden',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          opacity:
            intensity === 'subtle' ? 0.5 : intensity === 'medium' ? 0.8 : 1,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
