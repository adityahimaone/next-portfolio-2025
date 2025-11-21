'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface RetroGridBackgroundProps {
  className?: string
  children?: React.ReactNode
  angle?: number
}

export function RetroGridBackground({
  className,
  children,
  angle = 60,
}: RetroGridBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      grid: isDarkMode ? 'rgba(39, 50, 129, 0.3)' : 'rgba(39, 50, 129, 0.2)',
      glow: isDarkMode ? 'rgba(230, 168, 23, 0.15)' : 'rgba(230, 168, 23, 0.1)',
      bg: isDarkMode ? '#0a0a0a' : '#ffffff',
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

    let time = 0

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      time += 2

      // Horizon height (slightly above center)
      const horizon = height * 0.4

      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1

      // Add glow
      ctx.shadowBlur = 5
      ctx.shadowColor = colors.grid

      // Draw Vertical Lines (Perspective)
      const centerX = width / 2
      const fov = 300
      const numLines = 40
      const spacing = width / 10

      for (let i = -numLines; i <= numLines; i++) {
        const x = i * spacing

        // Simple perspective: lines converge to center at horizon
        ctx.beginPath()
        ctx.moveTo(centerX + x * 0.1, horizon) // Vanishing point area
        ctx.lineTo(centerX + x * 3, height) // Spread out
        ctx.stroke()
      }

      // Draw Horizontal Lines (Moving)
      // We simulate movement by changing the Z offset
      const speed = 0.002
      const gridHeight = height - horizon

      // Draw lines based on perspective formula: y = horizon + h / z
      // We iterate z from far to near

      for (let z = 0; z < 100; z++) {
        // Non-linear distribution for perspective
        // z goes 0..100. We want lines to be dense at 0 (horizon) and sparse at 100 (bottom)
        // Actually, let's use a modulo on time to create scrolling

        const perspectiveZ = z + (time % 20) / 20
        const y = horizon + gridHeight * (perspectiveZ / 20)

        // Only draw if within bounds
        if (y > height) continue
        if (y < horizon) continue

        // Calculate opacity based on distance from horizon
        const alpha = Math.min(1, (y - horizon) / (gridHeight * 0.3))
        ctx.globalAlpha = alpha

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Better Horizontal Lines approach
      // y = horizon + (constant / z)
      // z moves with time

      const movement = (time * 0.5) % 50

      for (let z = 10; z < 1000; z += 50) {
        const currentZ = z - movement
        if (currentZ <= 10) continue // Too close/behind

        const scale = 200 / currentZ
        const y = horizon + scale * 200

        if (y > height) continue

        const alpha = Math.min(1, (y - horizon) / 100)
        ctx.globalAlpha = alpha

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Top gradient (sky)
      const gradient = ctx.createLinearGradient(0, 0, 0, horizon)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(1, colors.glow)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, horizon)

      ctx.shadowBlur = 0

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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
