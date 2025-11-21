'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface RhythmBackgroundProps {
  className?: string
  children?: React.ReactNode
  circleCount?: number
}

export function RhythmBackground({
  className,
  children,
  circleCount = 5,
}: RhythmBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      primary: isDarkMode
        ? 'rgba(39, 50, 129, 0.15)'
        : 'rgba(39, 50, 129, 0.08)',
      secondary: isDarkMode
        ? 'rgba(61, 70, 139, 0.15)'
        : 'rgba(61, 70, 139, 0.08)',
      accent: isDarkMode
        ? 'rgba(230, 168, 23, 0.15)'
        : 'rgba(230, 168, 23, 0.08)',
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

    // Circle state
    const circles: {
      radius: number
      maxRadius: number
      speed: number
      phase: number
      color: string
    }[] = []

    const initCircles = () => {
      const maxDim = Math.max(window.innerWidth, window.innerHeight)
      circles.length = 0

      for (let i = 0; i < circleCount; i++) {
        circles.push({
          radius: (i + 1) * (maxDim / (circleCount * 2)),
          maxRadius: maxDim * 0.8,
          speed: 0.002 + i * 0.001,
          phase: i * (Math.PI / circleCount),
          color:
            i % 3 === 0
              ? colors.primary
              : i % 3 === 1
                ? colors.secondary
                : colors.accent,
        })
      }
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initCircles()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    let time = 0

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const centerX = width / 2
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)

      time += 0.01

      circles.forEach((circle, i) => {
        ctx.beginPath()

        // Pulse effect
        const pulse = Math.sin(time + circle.phase) * 20
        const currentRadius = circle.radius + pulse

        ctx.arc(centerX, centerY, Math.max(0, currentRadius), 0, Math.PI * 2)

        ctx.strokeStyle = circle.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Add some particles on the ring
        const particleCount = 3 + i
        for (let j = 0; j < particleCount; j++) {
          const angle =
            time * circle.speed * 10 + j * ((Math.PI * 2) / particleCount)
          const px = centerX + Math.cos(angle) * currentRadius
          const py = centerY + Math.sin(angle) * currentRadius

          ctx.beginPath()
          ctx.arc(px, py, 4, 0, Math.PI * 2)
          ctx.fillStyle = circle.color
            .replace('0.15', '0.5')
            .replace('0.08', '0.3')
          ctx.fill()
        }
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, circleCount])

  return (
    <div
      className={cn(
        'bg-background relative h-full w-full overflow-hidden',
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
