'use client'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  glareIntensity?: number
  rotationIntensity?: number
}

export function AnimatedCard({
  children,
  className = '',
  glareIntensity = 0.2,
  rotationIntensity = 10,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for rotation and glare effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smoother animation
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]),
    springConfig,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-rotationIntensity, rotationIntensity]),
    springConfig,
  )

  // Glare effect position
  const glareX = useSpring(mouseX, springConfig)
  const glareY = useSpring(mouseY, springConfig)

  // Move these hooks to the top level
  const glareLeftValue = useTransform(glareX, [-1, 1], ['-50%', '150%'])
  const glareTopValue = useTransform(glareY, [-1, 1], ['-50%', '150%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2)
    const normalizedY = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}

      {/* Glare effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-tr from-white to-transparent opacity-0"
          style={{
            opacity: glareIntensity,
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
            left: glareLeftValue, // Use the pre-computed value
            top: glareTopValue, // Use the pre-computed value
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </motion.div>
  )
}
