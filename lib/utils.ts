import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initCursorGlow() {
  // Get the existing cursor element from the DOM
  const cursorGlow = document.getElementById('cursor-glow')
  if (!cursorGlow) return

  // Notes that will be created randomly
  const musicNotes = ['♪', '♫', '♬', '♩', '♭']
  let lastPos = { x: 0, y: 0 }
  let isMoving = false
  let noteTimeout: number | null = null

  function createMusicNote(x: number, y: number) {
    const note = document.createElement('div')
    note.className = 'music-note'
    note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)]
    note.style.position = 'fixed'
    note.style.fontSize = `${16 + Math.random() * 12}px`
    note.style.fontWeight = 'bold'
    note.style.color =
      Math.random() > 0.5 ? 'var(--primary, #273281)' : 'var(--accent, #e6a817)'
    note.style.pointerEvents = 'none'
    note.style.zIndex = '9998'

    // Position near where cursor is
    const angle = Math.random() * Math.PI * 2
    const distance = 5 + Math.random() * 15
    note.style.left = `${x + Math.cos(angle) * distance}px`
    note.style.top = `${y + Math.sin(angle) * distance}px`

    // Animate the note
    note.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)' },
        {
          opacity: 0,
          transform: `translate(-50%, calc(-50% - ${30 + Math.random() * 30}px)) rotate(${Math.random() * 60 - 30}deg) scale(0.8)`,
        },
      ],
      {
        duration: 800 + Math.random() * 600,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )

    document.body.appendChild(note)

    // Remove after animation completes
    setTimeout(() => {
      if (document.body.contains(note)) document.body.removeChild(note)
    }, 1400)
  }

  function updateCursor(e: MouseEvent) {
    if (!cursorGlow) return

    // Make cursor visible on first move if it isn't already
    if (cursorGlow.style.opacity !== '1') {
      cursorGlow.style.opacity = '1'
    }

    // Position the cursor
    cursorGlow.style.left = `${e.clientX}px`
    cursorGlow.style.top = `${e.clientY}px`

    // Calculate movement to determine if we should show notes
    const distance = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y)
    if (distance > 8) {
      // Only consider significant movements
      isMoving = true
      lastPos = { x: e.clientX, y: e.clientY }

      // Create music note with some randomization
      if (Math.random() > 0.6) {
        createMusicNote(e.clientX, e.clientY)
      }

      // Reset the timeout that tracks if we're still moving
      if (noteTimeout) clearTimeout(noteTimeout)
      noteTimeout = window.setTimeout(() => {
        isMoving = false
      }, 100)
    }
  }

  // Use throttling for performance
  let isThrottled = false
  const handleMouseMove = (e: MouseEvent) => {
    if (isThrottled) return
    isThrottled = true

    requestAnimationFrame(() => {
      updateCursor(e)
      isThrottled = false
    })
  }

  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove)

  // Show cursor when entering window
  window.addEventListener('mouseenter', () => {
    if (cursorGlow) cursorGlow.style.opacity = '1'
  })

  // Hide cursor when leaving window
  window.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0'
  })

  // Clean up function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseenter', () => {})
    window.removeEventListener('mouseleave', () => {})
    if (noteTimeout) clearTimeout(noteTimeout)
  }
}
