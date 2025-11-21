'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface GridDistortionBackgroundProps {
  className?: string
  children?: React.ReactNode
  gridSize?: number
}

export function GridDistortionBackground({
  className,
  children,
  gridSize = 40,
}: GridDistortionBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      dot: isDarkMode ? 'rgba(39, 50, 129, 0.4)' : 'rgba(39, 50, 129, 0.2)',
      line: isDarkMode ? 'rgba(61, 70, 139, 0.1)' : 'rgba(61, 70, 139, 0.05)',
      active: isDarkMode ? '#E6A817' : '#E6A817',
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

    // Grid points
    const points: {
      x: number
      y: number
      originX: number
      originY: number
      vx: number
      vy: number
      mass: number
    }[] = []

    const initGrid = () => {
      points.length = 0
      const width = canvas.width
      const height = canvas.height

      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          points.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            mass: 1 + Math.random(), // Random mass for varied movement
          })
        }
      }
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initGrid()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    let time = 0

    const render = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      time += 0.02

      // Update and draw points
      ctx.fillStyle = colors.dot

      // Draw connecting lines first (optional, can be heavy)
      ctx.beginPath()
      ctx.strokeStyle = colors.line

      points.forEach((point, i) => {
        // Wave movement
        const waveX = Math.sin(time + point.originY * 0.01) * 5
        const waveY = Math.cos(time + point.originX * 0.01) * 5

        // Mouse interaction
        const dx = mouseRef.current.x - point.x
        const dy = mouseRef.current.y - point.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 200

        let mouseForceX = 0
        let mouseForceY = 0

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          const angle = Math.atan2(dy, dx)
          mouseForceX = -Math.cos(angle) * force * 20
          mouseForceY = -Math.sin(angle) * force * 20
        }

        // Apply forces
        const targetX = point.originX + waveX + mouseForceX
        const targetY = point.originY + waveY + mouseForceY

        point.vx += (targetX - point.x) * 0.1
        point.vy += (targetY - point.y) * 0.1

        point.vx *= 0.8 // Damping
        point.vy *= 0.8

        point.x += point.vx
        point.y += point.vy

        // Draw point
        const size = 1.5 + Math.sin(time * 2 + i) * 0.5
        ctx.moveTo(point.x + size, point.y)
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
      })

      ctx.fill()

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, gridSize])

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
