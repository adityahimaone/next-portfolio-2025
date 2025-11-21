'use client'

import { useState, useEffect, useRef } from 'react'
import { LazyMotion, domMax, m, AnimatePresence } from 'motion/react'
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
    <m.button
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
    </m.button>
  )
}

const DetailWindow = ({
  clip,
  onClose,
}: {
  clip: Clip
  onClose: () => void
}) => (
  <m.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
    onClick={onClose}
  >
    <m.div
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
    </m.div>
  </m.div>
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
            <div className="mx-auto max-w-3xl font-mono text-sm">
              {/* Header Plate */}
              <div className="mb-8 border-b-2 border-zinc-200 pb-4 dark:border-zinc-800">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">
                      ADITYA HIMAONE
                    </h1>
                    <p className="text-xs tracking-widest text-zinc-500 uppercase">
                      Frontend Engineer / Audio Enthusiast
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-zinc-400">
                      MODEL NO.
                    </div>
                    <div className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                      AH-2025-MKII
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Left Column: Specs */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 border-b border-zinc-200 pb-1 text-xs font-bold text-zinc-400 uppercase dark:border-zinc-800">
                      Technical Specifications
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Role</dt>
                        <dd className="font-bold text-zinc-900 dark:text-zinc-200">
                          Frontend Developer
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Location</dt>
                        <dd className="font-bold text-zinc-900 dark:text-zinc-200">
                          Jakarta, ID (GMT+7)
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Experience</dt>
                        <dd className="font-bold text-zinc-900 dark:text-zinc-200">
                          3+ Years
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Architecture</dt>
                        <dd className="font-bold text-zinc-900 dark:text-zinc-200">
                          React / Next.js
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="mb-2 border-b border-zinc-200 pb-1 text-xs font-bold text-zinc-400 uppercase dark:border-zinc-800">
                      Core Modules
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'React',
                        'TypeScript',
                        'Next.js',
                        'Tailwind',
                        'Framer Motion',
                        'Node.js',
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Description */}
                <div>
                  <h3 className="mb-2 border-b border-zinc-200 pb-1 text-xs font-bold text-zinc-400 uppercase dark:border-zinc-800">
                    Description
                  </h3>
                  <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Passionate developer bridging the gap between engineering
                    logic and creative design. Just as a producer layers sounds
                    to create a song, I layer code to build immersive digital
                    experiences.
                    <br />
                    <br />
                    Specialized in building high-performance web applications
                    with a focus on interaction design and accessibility.
                  </p>

                  <div className="mt-8 rounded border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      SYSTEM OPERATIONAL
                    </div>
                    <p className="text-xs text-zinc-500">
                      Currently available for new projects and collaborations.
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
            <div className="flex h-full flex-col items-center justify-center gap-12 py-8">
              <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
                {/* Gauge 1 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-zinc-300 bg-zinc-100 shadow-inner dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="absolute bottom-4 text-xs font-bold text-zinc-400">
                      YEARS
                    </div>
                    <div className="text-4xl font-black text-zinc-800 dark:text-zinc-100">
                      3+
                    </div>
                    {/* Decorative Needle */}
                    <div className="absolute bottom-1/2 left-1/2 h-16 w-1 origin-bottom -translate-x-1/2 rotate-45 rounded-full bg-red-500 shadow-md" />
                    <div className="absolute bottom-1/2 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-400 shadow-md" />
                  </div>
                  <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
                    Experience
                  </span>
                </div>

                {/* Gauge 2 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-zinc-300 bg-zinc-100 shadow-inner dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="absolute bottom-4 text-xs font-bold text-zinc-400">
                      COUNT
                    </div>
                    <div className="text-4xl font-black text-zinc-800 dark:text-zinc-100">
                      20+
                    </div>
                    {/* Decorative Needle */}
                    <div className="absolute bottom-1/2 left-1/2 h-16 w-1 origin-bottom -translate-x-1/2 rotate-[60deg] rounded-full bg-red-500 shadow-md" />
                    <div className="absolute bottom-1/2 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-400 shadow-md" />
                  </div>
                  <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
                    Projects
                  </span>
                </div>

                {/* Gauge 3 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-zinc-300 bg-zinc-100 shadow-inner dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="absolute bottom-4 text-xs font-bold text-zinc-400">
                      EFFORT
                    </div>
                    <div className="text-4xl font-black text-zinc-800 dark:text-zinc-100">
                      100%
                    </div>
                    {/* Decorative Needle */}
                    <div className="absolute bottom-1/2 left-1/2 h-16 w-1 origin-bottom -translate-x-1/2 rotate-[120deg] rounded-full bg-red-500 shadow-md" />
                    <div className="absolute bottom-1/2 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-400 shadow-md" />
                  </div>
                  <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
                    Commitment
                  </span>
                </div>
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
            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative w-full rounded-lg bg-zinc-900 p-8 shadow-2xl">
                {/* Rack Ears */}
                <div className="absolute top-0 bottom-0 -left-4 flex w-4 flex-col items-center justify-between rounded-l border-r border-black/50 bg-zinc-800 py-4">
                  <div className="h-3 w-2 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  <div className="h-3 w-2 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                </div>
                <div className="absolute top-0 -right-4 bottom-0 flex w-4 flex-col items-center justify-between rounded-r border-l border-black/50 bg-zinc-800 py-4">
                  <div className="h-3 w-2 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  <div className="h-3 w-2 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                </div>

                <div className="mb-6 flex items-center justify-center gap-3 text-amber-500">
                  <Zap className="animate-pulse" size={20} />
                  <span className="font-mono font-bold tracking-widest">
                    SIGNAL PROCESSING
                  </span>
                </div>

                <NowPlaying />

                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                  <p className="font-mono text-xs text-zinc-500">
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
    <LazyMotion features={domMax}>
      <section id="about" className="bg-white py-24 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              <Layers className="h-4 w-4" />
              <span>ARRANGEMENT VIEW</span>
            </m.div>
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
                    00:0{isPlaying ? Math.floor(Date.now() / 1000) % 10 : '0'}
                    :00
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
            <DetailWindow
              clip={activeClip}
              onClose={() => setActiveClip(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  )
}
