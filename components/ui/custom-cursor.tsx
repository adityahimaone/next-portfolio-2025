'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseDown = () => setCursorVariant('click')
    const mouseUp = () => setCursorVariant('default')
    const mouseEnterLink = () => setCursorVariant('hover')
    const mouseLeaveLink = () => setCursorVariant('default')

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)

    // Add hover effect to all links and buttons
    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
      link.addEventListener('mouseenter', mouseEnterLink)
      link.addEventListener('mouseleave', mouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)

      links.forEach((link) => {
        link.removeEventListener('mouseenter', mouseEnterLink)
        link.removeEventListener('mouseleave', mouseLeaveLink)
      })
    }
  }, [])

  // Update event listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const links = document.querySelectorAll('a, button')
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => setCursorVariant('hover'))
        link.addEventListener('mouseleave', () => setCursorVariant('default'))
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1.5,
      backgroundColor: 'var(--secondary)',
    },
    click: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0.8,
    },
  }

  const outlineVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      opacity: 0.5,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      opacity: 0.8,
      borderColor: 'var(--secondary)',
    },
    click: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 0.8,
      opacity: 0.8,
    },
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-outline"
        variants={outlineVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
