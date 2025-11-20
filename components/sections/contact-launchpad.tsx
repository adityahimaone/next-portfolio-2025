'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Github, Linkedin, Music, Copy, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as Tone from 'tone'

// --- Components ---

const Screw = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex h-3 w-3 items-center justify-center rounded-full border border-zinc-500 bg-zinc-400 shadow-inner',
      className,
    )}
  >
    <div className="h-0.5 w-full rotate-45 bg-zinc-600" />
    <div className="absolute h-0.5 w-full -rotate-45 bg-zinc-600" />
  </div>
)

// --- Data ---

const functionalPads = [
  {
    id: 'email',
    label: 'EMAIL',
    subLabel: 'Send',
    icon: Mail,
    color: 'bg-red-500',
    href: 'mailto:adityahimaone@gmail.com',
    x: 3,
    y: 1,
    w: 2,
    h: 2,
    mobile: { x: 1, y: 2, w: 2, h: 2 },
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    icon: Linkedin,
    color: 'bg-blue-600',
    href: 'https://linkedin.com/in/adityahimaone',
    x: 2,
    y: 1,
    w: 1,
    h: 1,
    mobile: { x: 0, y: 2, w: 1, h: 1 },
  },
  {
    id: 'github',
    label: 'GITHUB',
    icon: Github,
    color: 'bg-zinc-700',
    href: 'https://github.com/adityahimaone',
    x: 2,
    y: 2,
    w: 1,
    h: 1,
    mobile: { x: 0, y: 3, w: 1, h: 1 },
  },
  {
    id: 'spotify',
    label: 'SPOTIFY',
    icon: Music,
    color: 'bg-green-500',
    href: 'https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq',
    x: 5,
    y: 1,
    w: 1,
    h: 1,
    mobile: { x: 3, y: 2, w: 1, h: 1 },
  },
  {
    id: 'copy',
    label: 'COPY',
    icon: Copy,
    color: 'bg-amber-500',
    action: 'copy',
    value: 'adityahimaone@gmail.com',
    x: 5,
    y: 2,
    w: 1,
    h: 1,
    mobile: { x: 3, y: 3, w: 1, h: 1 },
  },
]

const dummyColors = [
  'bg-pink-500',
  'bg-cyan-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
]

export function ContactLaunchpad() {
  const [activePad, setActivePad] = useState<string | null>(null)
  const [activeLoops, setActiveLoops] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [isAudioStarted, setIsAudioStarted] = useState(false)

  // Audio Refs
  const synths = useRef<any[]>([])
  const loops = useRef<Map<string, Tone.Loop>>(new Map())

  useEffect(() => {
    // Initialize Synths
    const polySynth = new Tone.PolySynth(Tone.Synth).toDestination()
    const membrane = new Tone.MembraneSynth().toDestination()
    const metal = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination()

    synths.current = [polySynth, membrane, metal]

    return () => {
      // Cleanup
      loops.current.forEach((loop) => loop.dispose())
      synths.current.forEach((synth) => synth.dispose())
    }
  }, [])

  const startAudio = async () => {
    if (!isAudioStarted) {
      await Tone.start()
      Tone.Transport.start()
      setIsAudioStarted(true)
    }
  }

  const toggleLoop = (padId: string, x: number, y: number) => {
    if (activeLoops.has(padId)) {
      // Stop Loop
      const loop = loops.current.get(padId)
      if (loop) {
        loop.stop()
        loop.dispose()
        loops.current.delete(padId)
      }
      const newLoops = new Set(activeLoops)
      newLoops.delete(padId)
      setActiveLoops(newLoops)
    } else {
      // Start Loop
      const newLoops = new Set(activeLoops)
      newLoops.add(padId)
      setActiveLoops(newLoops)

      // Create a unique pattern based on coordinates
      const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
      const note = notes[(x + y) % notes.length]
      const rhythm = (x % 4) + 1 // 1/4, 1/8, etc.

      let loop: Tone.Loop

      if (y % 3 === 0) {
        // Drums (Membrane)
        loop = new Tone.Loop((time) => {
          synths.current[1].triggerAttackRelease(note, '8n', time)
        }, `${rhythm}n`).start(0)
      } else if (y % 3 === 1) {
        // Chords/Melody (Poly)
        loop = new Tone.Loop(
          (time) => {
            synths.current[0].triggerAttackRelease(note, '8n', time)
          },
          `${rhythm * 2}n`,
        ).start(0)
      } else {
        // Percussion (Metal)
        loop = new Tone.Loop((time) => {
          synths.current[2].triggerAttackRelease('32n', time, 0.3)
        }, `${rhythm}n`).start(0)
      }

      loops.current.set(padId, loop)
    }
  }

  const handlePadClick = async (pad: any) => {
    await startAudio()

    // Toggle Loop State
    toggleLoop(pad.id, pad.x, pad.y)

    // Visual Flash
    setActivePad(pad.id)
    setTimeout(() => setActivePad(null), 200)

    // Functional Actions
    if (!pad.id.startsWith('dummy')) {
      if (pad.action === 'copy' && pad.value) {
        navigator.clipboard.writeText(pad.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else if (pad.href) {
        // Optional: Delay opening link to let sound play
        // setTimeout(() => window.open(pad.href, '_blank'), 300)
        window.open(pad.href, '_blank')
      }
    }
  }

  // Generate Grids
  const generateGridItems = (rows: number, cols: number, isMobile: boolean) => {
    const items = []
    const occupied = new Set<string>()

    // Mark occupied cells
    functionalPads.forEach((pad) => {
      const config = isMobile ? pad.mobile : pad
      for (let i = 0; i < config.w; i++) {
        for (let j = 0; j < config.h; j++) {
          occupied.add(`${config.x + i},${config.y + j}`)
        }
      }
    })

    // Build grid items
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (occupied.has(`${x},${y}`)) {
          // Check if this is the top-left of a functional pad
          const pad = functionalPads.find((p) => {
            const config = isMobile ? p.mobile : p
            return config.x === x && config.y === y
          })
          if (pad) {
            items.push({
              ...pad,
              ...(isMobile ? pad.mobile : pad),
              type: 'functional',
            })
          }
        } else {
          // Add dummy pad
          items.push({
            id: `dummy-${isMobile ? 'm' : 'd'}-${x}-${y}`,
            type: 'dummy',
            color: dummyColors[(x + y) % dummyColors.length],
            x,
            y,
            w: 1,
            h: 1,
          })
        }
      }
    }
    return items
  }

  const desktopGrid = generateGridItems(4, 8, false)
  const mobileGrid = generateGridItems(6, 4, true)

  const LaunchpadGrid = ({
    items,
    cols,
    rows,
  }: {
    items: any[]
    cols: number
    rows: number
  }) => (
    <div
      className="grid gap-2 sm:gap-3"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${cols}/${rows}`,
      }}
    >
      {items.map((pad) => (
        <motion.button
          key={pad.id}
          onClick={() => handlePadClick(pad)}
          className={cn(
            'group relative flex flex-col items-center justify-center overflow-hidden rounded-md border-b-4 border-zinc-950 bg-zinc-800 transition-all duration-100 active:translate-y-1 active:scale-95 active:border-b-0 sm:rounded-lg',
            pad.type === 'functional' ? 'z-10' : 'z-0',
          )}
          style={{
            gridColumn: `span ${pad.w}`,
            gridRow: `span ${pad.h}`,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Active/Hover State Glow */}
          <div
            className={cn(
              'absolute inset-0 z-0 transition-opacity duration-200',
              pad.color,
              activePad === pad.id || activeLoops.has(pad.id)
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100',
            )}
          />

          {/* Content (Only for functional pads) */}
          {pad.type === 'functional' && 'icon' in pad && (
            <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
              <pad.icon
                className={cn(
                  'h-5 w-5 transition-colors duration-200 sm:h-8 sm:w-8',
                  activePad === pad.id ||
                    activeLoops.has(pad.id) ||
                    'group-hover:text-white'
                    ? 'text-white'
                    : 'text-zinc-500',
                  pad.id === 'copy' && copied ? 'text-green-500' : '',
                )}
              />
              <div className="hidden flex-col items-center sm:flex">
                <span
                  className={cn(
                    'text-[10px] font-bold tracking-wider transition-colors duration-200 sm:text-xs',
                    activePad === pad.id ||
                      activeLoops.has(pad.id) ||
                      'group-hover:text-white'
                      ? 'text-white'
                      : 'text-zinc-400',
                  )}
                >
                  {pad.id === 'copy' && copied ? 'COPIED!' : (pad as any).label}
                </span>
                {(pad as any).subLabel && (
                  <span
                    className={cn(
                      'font-mono text-[8px] transition-colors duration-200 sm:text-[10px]',
                      activePad === pad.id ||
                        activeLoops.has(pad.id) ||
                        'group-hover:text-white/80'
                        ? 'text-white/80'
                        : 'text-zinc-600',
                    )}
                  >
                    {(pad as any).subLabel}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Corner LED (All pads) */}
          <div
            className={cn(
              'absolute top-1 right-1 h-1 w-1 rounded-full transition-colors duration-200 sm:top-2 sm:right-2 sm:h-1.5 sm:w-1.5',
              activePad === pad.id ||
                activeLoops.has(pad.id) ||
                'group-hover:bg-white'
                ? 'bg-white'
                : 'bg-zinc-900',
            )}
          />
        </motion.button>
      ))}
    </div>
  )

  return (
    <section id="contact" className="overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-200/50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
          >
            <Radio className="h-4 w-4" />
            <span>SESSION BOOKING</span>
          </motion.div>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 sm:text-5xl dark:text-white">
            Launch Collaboration
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Hit a pad to start a conversation.
          </p>
        </div>

        {/* The Launchpad Board */}
        <div className="relative mx-auto max-w-6xl rounded-3xl bg-zinc-800 p-2 shadow-2xl sm:p-4 dark:bg-zinc-950">
          {/* Metallic Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />

          {/* Inner Casing */}
          <div className="relative rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-inner sm:p-6 md:p-10">
            {/* Screws */}
            <Screw className="absolute top-2 left-2 sm:top-4 sm:left-4" />
            <Screw className="absolute top-2 right-2 sm:top-4 sm:right-4" />
            <Screw className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4" />
            <Screw className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4" />

            {/* Top Panel: Branding */}
            <div className="mb-4 flex items-center justify-between px-2 sm:mb-8">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 sm:h-2 sm:w-2" />
                <span className="font-mono text-[10px] tracking-widest text-zinc-500 sm:text-xs">
                  REC
                </span>
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] text-zinc-600 sm:text-xs dark:text-zinc-400">
                LAUNCHPAD PRO
              </span>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:block">
              <LaunchpadGrid items={desktopGrid} cols={8} rows={4} />
            </div>

            {/* Mobile Grid */}
            <div className="md:hidden">
              <LaunchpadGrid items={mobileGrid} cols={4} rows={6} />
            </div>

            {/* Cable decoration */}
            <div className="-mt-0.5 flex justify-center">
              <div className="flex h-8 w-24 items-end justify-center rounded-b-xl border-x border-b border-zinc-700 bg-zinc-800 pb-1 shadow-lg sm:h-12 sm:w-32 sm:pb-2">
                <span className="font-mono text-[8px] text-zinc-500 sm:text-[10px]">
                  USB-C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
