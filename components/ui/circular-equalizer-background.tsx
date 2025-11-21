'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface CircularEqualizerBackgroundProps {
  className?: string
  children?: React.ReactNode
  barCount?: number
}

export function CircularEqualizerBackground({
  className,
  children,
  barCount = 120,
}: CircularEqualizerBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      primary: isDarkMode ? '#273281' : '#273281',
      secondary: isDarkMode ? '#3d468b' : '#3d468b',
      accent: isDarkMode ? '#E6A817' : '#E6A817',
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

    // Bar state
    const bars: {
      height: number
      targetHeight: number
      speed: number
      hue: number
    }[] = []

    const initBars = () => {
      bars.length = 0
      for (let i = 0; i < barCount; i++) {
        bars.push({
          height: 10 + Math.random() * 50,
          targetHeight: 10 + Math.random() * 50,
          speed: 0.05 + Math.random() * 0.1,
          hue: i % 3 === 0 ? 230 : i % 3 === 1 ? 235 : 40, // Approximate hues for primary, secondary, accent
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
      initBars()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    let rotation = 0

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.25

      ctx.clearRect(0, 0, width, height)

      rotation += 0.002

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      const angleStep = (Math.PI * 2) / barCount

      bars.forEach((bar, i) => {
        // Update bar height
        if (Math.abs(bar.height - bar.targetHeight) < 1) {
          bar.targetHeight =
            10 + Math.random() * (Math.min(width, height) * 0.15)
          bar.speed = 0.05 + Math.random() * 0.1
        } else {
          bar.height += (bar.targetHeight - bar.height) * bar.speed
        }

        const angle = i * angleStep

        ctx.save()
        ctx.rotate(angle)

        // Draw bar
        // We draw it at radius distance from center

        // Create gradient for the bar
        const gradient = ctx.createLinearGradient(
          0,
          radius,
          0,
          radius + bar.height,
        )

        if (i % 3 === 0) {
          gradient.addColorStop(0, colors.primary)
          gradient.addColorStop(1, 'transparent')
        } else if (i % 3 === 1) {
          gradient.addColorStop(0, colors.secondary)
          gradient.addColorStop(1, 'transparent')
        } else {
          gradient.addColorStop(0, colors.accent)
          gradient.addColorStop(1, 'transparent')
        }

        ctx.fillStyle = gradient

        // Draw rounded rect
        const barWidth = ((Math.PI * 2 * radius) / barCount) * 0.6

        ctx.beginPath()
        ctx.roundRect(-barWidth / 2, radius, barWidth, bar.height, barWidth / 2)
        ctx.fill()

        // Reflection (inner bars)
        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.roundRect(
          -barWidth / 2,
          radius - bar.height * 0.3,
          barWidth,
          bar.height * 0.3,
          barWidth / 2,
        )
        ctx.fill()
        ctx.globalAlpha = 1.0

        ctx.restore()
      })

      ctx.restore()

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, barCount])

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
