'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface EqualizerBackgroundProps {
  className?: string
  children?: React.ReactNode
  barCount?: number
}

export function EqualizerBackground({
  className,
  children,
  barCount = 40,
}: EqualizerBackgroundProps) {
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
      bg: isDarkMode ? 'transparent' : 'transparent',
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
    const bars: { height: number; targetHeight: number; speed: number }[] = []

    const initBars = () => {
      bars.length = 0
      for (let i = 0; i < barCount; i++) {
        bars.push({
          height: Math.random() * 100,
          targetHeight: Math.random() * 100,
          speed: 0.5 + Math.random() * 2,
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

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      const barWidth = width / barCount
      const maxBarHeight = height * 0.4 // Max height is 40% of screen

      bars.forEach((bar, i) => {
        // Update bar height
        if (Math.abs(bar.height - bar.targetHeight) < 1) {
          bar.targetHeight = Math.random() * 100
          bar.speed = 0.5 + Math.random() * 2
        } else {
          bar.height += (bar.targetHeight - bar.height) * 0.05 * bar.speed
        }

        // Draw bar
        const x = i * barWidth
        const h = (bar.height / 100) * maxBarHeight

        // Create gradient
        const gradient = ctx.createLinearGradient(x, height, x, height - h)
        gradient.addColorStop(0, colors.primary)
        gradient.addColorStop(0.5, colors.secondary)
        gradient.addColorStop(1, colors.accent)

        ctx.fillStyle = gradient

        // Draw rounded rect top
        const radius = barWidth / 2

        ctx.beginPath()
        ctx.moveTo(x, height)
        ctx.lineTo(x, height - h + radius)
        ctx.quadraticCurveTo(x, height - h, x + radius, height - h)
        ctx.quadraticCurveTo(
          x + barWidth,
          height - h,
          x + barWidth,
          height - h + radius,
        )
        ctx.lineTo(x + barWidth, height)
        ctx.closePath()

        ctx.globalAlpha = 0.15 // Subtle opacity
        ctx.fill()
        ctx.globalAlpha = 1.0
      })

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
