'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface HexagonWaveBackgroundProps {
  className?: string
  children?: React.ReactNode
  hexSize?: number
}

export function HexagonWaveBackground({
  className,
  children,
  hexSize = 25,
}: HexagonWaveBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Determine if dark mode based on theme
  const isDarkMode = !mounted || resolvedTheme === 'dark'

  // Colors based on theme
  const colors = useMemo(
    () => ({
      stroke: isDarkMode ? 'rgba(39, 50, 129, 0.15)' : 'rgba(39, 50, 129, 0.1)',
      active: isDarkMode
        ? 'rgba(230, 168, 23, 0.4)'
        : 'rgba(230, 168, 23, 0.3)',
      highlight: isDarkMode
        ? 'rgba(61, 70, 139, 0.3)'
        : 'rgba(61, 70, 139, 0.2)',
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

    const drawHexagon = (
      x: number,
      y: number,
      size: number,
      strokeColor: string,
      fillColor?: string,
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.strokeStyle = strokeColor
      ctx.stroke()
      if (fillColor) {
        ctx.fillStyle = fillColor
        ctx.fill()
      }
    }

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

      const a = (2 * Math.PI) / 6
      const r = hexSize
      const w = r * 2
      const h = Math.sqrt(3) * r

      const cols = Math.ceil(width / (w * 0.75)) + 1
      const rows = Math.ceil(height / h) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * w * 0.75
          const y = j * h + (i % 2 === 0 ? 0 : h / 2)

          // Calculate distance from mouse
          const dx = x - mouseRef.current.x
          const dy = y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Wave effect
          const wave = Math.sin(time + x * 0.01 + y * 0.01)

          let stroke = colors.stroke
          let fill = undefined
          let size = r * 0.9

          // Mouse interaction
          if (dist < 150) {
            const intensity = 1 - dist / 150
            size = r * (0.9 + intensity * 0.2)
            fill = colors.active
              .replace('0.4', `${intensity * 0.4}`)
              .replace('0.3', `${intensity * 0.3}`)
          } else if (wave > 0.5) {
            // Subtle wave highlight
            fill = colors.highlight
              .replace('0.3', `${(wave - 0.5) * 0.3}`)
              .replace('0.2', `${(wave - 0.5) * 0.2}`)
          }

          drawHexagon(x, y, size, stroke, fill)
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, hexSize])

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
