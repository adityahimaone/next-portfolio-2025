'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface FlowingLinesBackgroundProps {
  className?: string
  children?: React.ReactNode
  lineCount?: number
}

export function FlowingLinesBackground({
  className,
  children,
  lineCount = 15,
}: FlowingLinesBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      primary: isDarkMode ? 'rgba(39, 50, 129, 0.5)' : 'rgba(39, 50, 129, 0.3)',
      secondary: isDarkMode
        ? 'rgba(61, 70, 139, 0.5)'
        : 'rgba(61, 70, 139, 0.3)',
      accent: isDarkMode
        ? 'rgba(230, 168, 23, 0.5)'
        : 'rgba(230, 168, 23, 0.3)',
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

    // Line state
    const lines: {
      phase: number
      speed: number
      amplitude: number
      frequency: number
      color: string
      yOffset: number
    }[] = []

    const initLines = () => {
      lines.length = 0
      const height = canvas.height

      for (let i = 0; i < lineCount; i++) {
        lines.push({
          phase: Math.random() * Math.PI * 2,
          speed: 0.0005 + Math.random() * 0.001,
          amplitude: 20 + Math.random() * 100,
          frequency: 0.001 + Math.random() * 0.002,
          color:
            i % 3 === 0
              ? colors.primary
              : i % 3 === 1
                ? colors.secondary
                : colors.accent,
          yOffset: (height / lineCount) * i + (Math.random() * 50 - 25),
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
      initLines()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    let time = 0

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      time += 1

      lines.forEach((line, i) => {
        ctx.beginPath()

        // Draw smooth curve
        for (let x = 0; x <= width; x += 10) {
          const y =
            line.yOffset +
            Math.sin(x * line.frequency + time * line.speed + line.phase) *
              line.amplitude +
            Math.sin(x * line.frequency * 2 + time * line.speed * 1.5) *
              (line.amplitude * 0.5)

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.strokeStyle = line.color
        ctx.lineWidth = 2

        // Add glow
        ctx.shadowBlur = 10
        ctx.shadowColor = line.color

        ctx.stroke()
        ctx.shadowBlur = 0
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, lineCount])

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
