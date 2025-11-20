'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  Play,
  Pause,
  Square,
  Mic2,
  Cpu,
  BarChart3,
  Music,
  Settings,
  MoreVertical,
  X,
  Maximize2,
  Code2,
  Globe,
  Zap,
  Layers,
  User,
  Terminal,
  Activity,
} from 'lucide-react'
import NowPlaying from '@/components/now-playing'

// --- Types ---

interface Clip {
  id: string
  name: string
  subtitle?: string
  description: string
  start: number // Grid column start
  duration: number // Grid column span
  type: 'bio' | 'stack' | 'stats' | 'spotify'
  content: React.ReactNode
}

interface Track {
  id: string
  name: string
  icon: any
  color: string
  clips: Clip[]
}

// --- Components ---

const TimeRuler = () => (
  <div className="flex h-8 min-w-[800px] border-b border-zinc-200 bg-zinc-50/50 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
    {/* Track Header Spacer Removed */}
    <div className="flex flex-1">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="flex flex-1 items-end justify-start border-r border-zinc-200/50 px-1 pb-1 dark:border-zinc-800/50"
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
)

const TrackHeader = ({
  track,
  muted,
  soloed,
  onMute,
  onSolo,
}: {
  track: Track
  muted: boolean
  soloed: boolean
  onMute: () => void
  onSolo: () => void
}) => (
  <div className="flex h-24 w-14 shrink-0 flex-col justify-between border-r border-b border-zinc-200 bg-zinc-50 p-2 md:w-32 dark:border-zinc-800 dark:bg-zinc-900">
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded',
          track.color,
          'bg-opacity-20 text-current',
        )}
      >
        <track.icon size={14} />
      </div>
      <span className="hidden truncate text-xs font-bold text-zinc-600 md:block dark:text-zinc-400">
        {track.name}
      </span>
    </div>

    <div className="flex flex-col gap-1 md:flex-row">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMute()
        }}
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold transition-colors',
          muted
            ? 'bg-blue-500 text-white'
            : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700',
        )}
      >
        M
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSolo()
        }}
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold transition-colors',
          soloed
            ? 'bg-yellow-500 text-black'
            : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700',
        )}
      >
        S
      </button>
    </div>
  </div>
)

const ClipBlock = ({
  clip,
  color,
  isActive,
  onClick,
  onHover,
}: {
  clip: Clip
  color: string
  isActive: boolean
  onClick: () => void
  onHover: (isHovered: boolean) => void
}) => {
  return (
    <motion.button
      layoutId={`clip-${clip.id}`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'group relative flex h-20 items-center overflow-hidden rounded-md border border-l-4 transition-all hover:brightness-110',
        color.replace('text-', 'border-l-').replace('bg-', 'bg-opacity-20'),
        'border-zinc-200 bg-white dark:border-zinc-700/50 dark:bg-zinc-800',
        isActive ? 'ring-2 ring-blue-500/20 dark:ring-white/20' : '',
      )}
      style={{
        gridColumn: `${clip.start} / span ${clip.duration}`,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Waveform / Pattern Background */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 50%, currentColor 50%)',
          backgroundSize: '4px 100%',
          color: 'inherit',
        }}
      />

      <div className="relative z-10 flex w-full items-center justify-between px-3">
        <div className="flex flex-col items-start gap-1 overflow-hidden">
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:bg-black/30 dark:text-zinc-300">
            {clip.name}
          </span>
          {clip.subtitle && (
            <span className="truncate text-xs font-bold text-zinc-700 dark:text-zinc-200">
              {clip.subtitle}
            </span>
          )}
        </div>
        <Maximize2
          size={12}
          className="text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </motion.button>
  )
}

const DetailWindow = ({
  clip,
  onClose,
}: {
  clip: Clip
  onClose: () => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="relative flex h-full max-h-[500px] w-full max-w-5xl flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* VST Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-4">
          {/* Screws */}
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full border border-zinc-300 bg-zinc-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="h-2 w-2 rounded-full border border-zinc-300 bg-zinc-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
          </div>
          {/* LCD Title */}
          <div className="rounded border border-blue-200 bg-blue-50 px-3 py-1 shadow-sm dark:border-blue-900/30 dark:bg-blue-950/30 dark:shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
            <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 dark:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
              {clip.name.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Fake Knobs */}
          <div className="hidden gap-3 md:flex">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-lg"
              >
                <div
                  className="absolute top-1 h-2 w-0.5 rounded-full bg-zinc-400 dark:bg-zinc-400"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                />
              </div>
            ))}
          </div>
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            onClick={onClose}
            className="rounded-full p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-900 dark:scrollbar-thumb-zinc-700 flex-1 overflow-y-auto bg-zinc-50 p-6 text-zinc-900 dark:bg-zinc-900/50 dark:text-zinc-300">
        {clip.content}
      </div>
    </motion.div>
  </motion.div>
)

export function AboutSection2025v2() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeClip, setActiveClip] = useState<Clip | null>(null)
  const [hoveredClip, setHoveredClip] = useState<Clip | null>(null)
  const [mutedTracks, setMutedTracks] = useState<Set<string>>(new Set())
  const [soloedTrack, setSoloedTrack] = useState<string | null>(null)

  // Playhead animation
  const playheadRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const lastTimestampRef = useRef<number>(0)

  useEffect(() => {
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp

      const deltaTime = timestamp - lastTimestampRef.current
      lastTimestampRef.current = timestamp

      // Add progress based on time elapsed (10s duration = 10000ms)
      progressRef.current = (progressRef.current + deltaTime / 10000) % 1

      if (playheadRef.current) {
        playheadRef.current.style.left = `${progressRef.current * 100}%`
      }

      if (isPlaying) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      lastTimestampRef.current = performance.now()
      animationFrame = requestAnimationFrame(animate)
    } else {
      lastTimestampRef.current = 0
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [isPlaying])

  const handleStop = () => {
    setIsPlaying(false)
    progressRef.current = 0
    if (playheadRef.current) {
      playheadRef.current.style.left = '0%'
    }
  }

  const toggleMute = (id: string) => {
    const newMuted = new Set(mutedTracks)
    if (newMuted.has(id)) newMuted.delete(id)
    else newMuted.add(id)
    setMutedTracks(newMuted)
  }

  const toggleSolo = (id: string) => {
    setSoloedTrack(soloedTrack === id ? null : id)
  }

  // --- Data ---
  const tracks: Track[] = [
    {
      id: 'bio',
      name: 'IDENTITY',
      icon: User,
      color: 'text-blue-500',
      clips: [
        {
          id: 'bio-main',
          name: 'profile.tsx',
          subtitle: 'About Me',
          description: 'Frontend Engineer based in Jakarta. 3+ Years Exp.',
          start: 1,
          duration: 4,
          type: 'bio',
          content: (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="mb-8 flex items-center gap-4">
                {/* <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  AH
                </div> */}
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Aditya Himawan
                  </h3>
                  <p className="font-mono text-blue-500 dark:text-blue-400">
                    Frontend Engineer
                  </p>
                </div>
              </div>

              <div className="prose prose-zinc dark:prose-invert">
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                  I'm a passionate developer who bridges the gap between{' '}
                  <span className="text-blue-500 dark:text-blue-400">
                    engineering logic
                  </span>{' '}
                  and{' '}
                  <span className="text-purple-500 dark:text-purple-400">
                    creative design
                  </span>
                  . Just as a producer layers sounds to create a song, I layer
                  code to build immersive digital experiences.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                      <Code2 size={16} /> CORE STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind'].map(
                        (t) => (
                          <span
                            key={t}
                            className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-600 dark:text-blue-400"
                          >
                            {t}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                      <Globe size={16} /> LOCATION
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      Jakarta, Indonesia (GMT+7)
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Available for remote work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'stats',
      name: 'ANALYTICS',
      icon: Activity,
      color: 'text-green-500',
      clips: [
        {
          id: 'stats-main',
          name: 'metrics.json',
          subtitle: 'Key Stats',
          description: '3+ Years Exp, 20+ Projects, 100% Commitment.',
          start: 3,
          duration: 3,
          type: 'stats',
          content: (
            <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-zinc-800/30">
                <span className="mb-2 text-4xl font-black text-zinc-900 dark:text-white">
                  3+
                </span>
                <span className="font-mono text-sm tracking-widest text-zinc-500 uppercase">
                  Years Exp
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-zinc-800/30">
                <span className="mb-2 text-4xl font-black text-zinc-900 dark:text-white">
                  20+
                </span>
                <span className="font-mono text-sm tracking-widest text-zinc-500 uppercase">
                  Projects
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-zinc-800/30">
                <span className="mb-2 text-4xl font-black text-zinc-900 dark:text-white">
                  100%
                </span>
                <span className="font-mono text-sm tracking-widest text-zinc-500 uppercase">
                  Commitment
                </span>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'audio',
      name: 'AUDIO',
      icon: Music,
      color: 'text-purple-500',
      clips: [
        {
          id: 'audio-main',
          name: 'now_playing.mp3',
          subtitle: 'Spotify',
          description: 'Now Playing: Spotify Integration.',
          start: 5,
          duration: 5,
          type: 'spotify',
          content: (
            <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center">
              <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
                <div className="mb-6 flex items-center gap-3 text-green-500">
                  <Zap className="animate-pulse" size={20} />
                  <span className="font-mono font-bold">LIVE SIGNAL</span>
                </div>
                <NowPlaying />
                <div className="mt-6 border-t border-zinc-200 pt-6 text-center dark:border-zinc-700">
                  <p className="text-sm text-zinc-500 italic dark:text-zinc-400">
                    "Music is the hidden arithmetic of the soul, which does not
                    know that it is counting."
                  </p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <section id="about" className="bg-white py-24 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <Layers className="h-4 w-4" />
            <span>ARRANGEMENT VIEW</span>
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 sm:text-5xl dark:text-white">
            The Workflow
          </h2>
        </div>

        {/* DAW Interface */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded transition-colors',
                    isPlaying
                      ? 'bg-green-500 text-black'
                      : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
                  )}
                >
                  {isPlaying ? (
                    <Pause size={16} fill="currentColor" />
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                </button>
                <button
                  onClick={handleStop}
                  className="flex h-8 w-8 items-center justify-center rounded bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  <Square size={16} fill="currentColor" />
                </button>
              </div>

              <div className="hidden items-center gap-4 rounded bg-white px-3 py-1 font-mono text-xs text-green-600 md:flex dark:bg-zinc-950 dark:text-green-500">
                <span>
                  00:0{isPlaying ? Math.floor(Date.now() / 1000) % 10 : '0'}:00
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">|</span>
                <span>120 BPM</span>
                <span className="text-zinc-400 dark:text-zinc-600">|</span>
                <span>4/4</span>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="text-xs font-bold text-zinc-500">REC</span>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="relative flex h-[400px]">
            {/* Track Headers (Left) */}
            <div className="relative z-20 flex flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="h-8 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />{' '}
              {/* Ruler Spacer */}
              {tracks.map((track) => (
                <TrackHeader
                  key={track.id}
                  track={track}
                  muted={mutedTracks.has(track.id)}
                  soloed={soloedTrack === track.id}
                  onMute={() => toggleMute(track.id)}
                  onSolo={() => toggleSolo(track.id)}
                />
              ))}
            </div>

            {/* Timeline (Right) */}
            <div className="relative flex-1 overflow-x-auto overflow-y-hidden bg-zinc-50 dark:bg-zinc-950">
              <div className="relative h-full min-w-[800px]">
                <TimeRuler />

                {/* Grid Background */}
                <div
                  className="pointer-events-none absolute inset-0 top-8"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '8.33% 100%',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 top-8 hidden dark:block"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '8.33% 100%',
                  }}
                />

                {/* Playhead */}
                <div
                  ref={playheadRef}
                  className="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-red-500 transition-all duration-75 ease-linear"
                  style={{ left: '0%' }}
                >
                  <div className="absolute -top-1 -left-1.5 h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-red-500" />
                </div>

                {/* Tracks & Clips */}
                <div className="relative grid grid-rows-[repeat(3,6rem)]">
                  {tracks.map((track) => {
                    const isVisible =
                      !mutedTracks.has(track.id) &&
                      (!soloedTrack || soloedTrack === track.id)

                    return (
                      <div
                        key={track.id}
                        className={cn(
                          'relative grid grid-cols-12 gap-1 border-b border-zinc-200/50 p-1 transition-opacity dark:border-zinc-800/50',
                          isVisible ? 'opacity-100' : 'opacity-20 grayscale',
                        )}
                      >
                        {track.clips.map((clip) => (
                          <ClipBlock
                            key={clip.id}
                            clip={clip}
                            color={track.color}
                            isActive={activeClip?.id === clip.id}
                            onClick={() => setActiveClip(clip)}
                            onHover={(isHovered) =>
                              setHoveredClip(isHovered ? clip : null)
                            }
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Detail Overlay (Modal) */}
          </div>

          {/* Info Bar */}
          <div className="flex h-8 items-center border-t border-zinc-200 bg-zinc-100 px-4 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <span className="mr-2 font-bold text-blue-500">INFO</span>
            {hoveredClip
              ? hoveredClip.description
              : 'Hover over a clip to view details. Click to expand.'}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeClip && (
          <DetailWindow clip={activeClip} onClose={() => setActiveClip(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
