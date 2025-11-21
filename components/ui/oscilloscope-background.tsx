'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface OscilloscopeBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function OscilloscopeBackground({
  className,
  children,
  intensity = 'medium',
}: OscilloscopeBackgroundProps) {
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
      trace: isDarkMode ? 'rgba(39, 50, 129, 0.5)' : 'rgba(39, 50, 129, 0.3)',
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

    // Oscilloscope parameters
    const params = {
      freqX: 3,
      freqY: 2,
      phaseX: 0,
      phaseY: 0,
      amplitude: 0,
      targetAmplitude: 0,
      rotation: 0,
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      params.amplitude = Math.min(window.innerWidth, window.innerHeight) * 0.3
      params.targetAmplitude = params.amplitude
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

      // Fade out effect for trails
      ctx.fillStyle = isDarkMode
        ? 'rgba(10, 10, 10, 0.1)'
        : 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, width, height)

      time += 0.005

      // Modulate frequencies over time
      const currentFreqX = params.freqX + Math.sin(time * 0.5) * 0.5
      const currentFreqY = params.freqY + Math.cos(time * 0.3) * 0.5

      // Draw Lissajous curve
      ctx.beginPath()
      ctx.lineWidth = 2

      const steps = 500
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2

        // Lissajous formula
        const x = Math.sin(currentFreqX * t + time) * params.amplitude
        const y = Math.sin(currentFreqY * t) * params.amplitude

        // Rotate
        const rotatedX = x * Math.cos(time * 0.1) - y * Math.sin(time * 0.1)
        const rotatedY = x * Math.sin(time * 0.1) + y * Math.cos(time * 0.1)

        if (i === 0) {
          ctx.moveTo(centerX + rotatedX, centerY + rotatedY)
        } else {
          ctx.lineTo(centerX + rotatedX, centerY + rotatedY)
        }
      }

      // Create gradient for the line
      const gradient = ctx.createLinearGradient(
        centerX - params.amplitude,
        centerY - params.amplitude,
        centerX + params.amplitude,
        centerY + params.amplitude,
      )
      gradient.addColorStop(0, colors.primary)
      gradient.addColorStop(0.5, colors.secondary)
      gradient.addColorStop(1, colors.accent)

      ctx.strokeStyle = gradient
      ctx.stroke()

      // Add glow
      ctx.shadowBlur = 15
      ctx.shadowColor = colors.primary
      ctx.stroke()
      ctx.shadowBlur = 0

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, resolvedTheme, colors, isDarkMode])

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
