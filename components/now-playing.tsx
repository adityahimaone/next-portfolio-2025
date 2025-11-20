'use client'

import { useState, useEffect } from 'react'
import { AudioLines, PauseIcon, Disc3, Radio } from 'lucide-react'
import { NowPlayingResponse } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/now-playing')
        const newData: NowPlayingResponse = await res.json()
        setData(newData)
      } catch (error) {
        console.error('Error fetching now playing:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000)

    return () => clearInterval(interval)
  }, [])

  // Loading state
  if (loading || !data) {
    return (
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex animate-pulse gap-4">
          <div className="h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex-1 space-y-2 py-2">
            <div className="h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </div>
      </div>
    )
  }

  const isPlaying = data.isPlaying

  return (
    <div className="group relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      {/* Glossy Screen Effect */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5" />

      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 blur-xl" />

      <div className="relative z-20 flex items-center gap-5">
        {/* Album Art (Spinning Vinyl Style) */}
        <div className="relative h-24 w-24 shrink-0">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="relative h-full w-full overflow-hidden rounded-full border-4 border-zinc-100 bg-zinc-100 shadow-lg dark:border-zinc-900 dark:bg-zinc-900"
          >
            <Image
              src={data.albumImageUrl || '/default-album.jpg'}
              alt={data.album ?? 'Album Cover'}
              className="h-full w-full object-cover opacity-90"
              width={100}
              height={100}
            />
            {/* Center hole */}
            <div className="absolute top-1/2 left-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" />
            {/* Vinyl Grooves Texture */}
            <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-black/5 dark:border-white/5" />
            <div className="pointer-events-none absolute inset-2 rounded-full border border-black/5 dark:border-white/5" />
          </motion.div>

          {/* Tone Arm (Decorative) */}
          <div className="absolute -top-2 -right-2 z-0 h-12 w-1 origin-top rotate-12 rounded-full bg-zinc-300 shadow-lg dark:bg-zinc-700" />
        </div>

        {/* Display Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'h-1.5 w-1.5 rounded-full shadow-[0_0_5px_currentColor]',
                  isPlaying
                    ? 'animate-pulse bg-green-500 text-green-500'
                    : 'bg-red-500 text-red-500',
                )}
              />
              <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
              </span>
            </div>
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-[#1DB954] dark:text-zinc-400"
            >
              <AudioLines size={14} />
            </a>
          </div>

          <div className="space-y-0.5 overflow-hidden">
            <h3 className="truncate text-lg leading-tight font-bold text-zinc-900 dark:text-zinc-200">
              {data.title || 'Unknown Title'}
            </h3>
            <p className="truncate text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {data.artist || 'Unknown Artist'}
            </p>
            <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-600">
              {data.album || 'Unknown Album'}
            </p>
          </div>

          {/* Progress Bar (Fake) */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: isPlaying ? '100%' : '30%' }}
              transition={{
                duration: isPlaying ? data.duration || 180 : 0,
                ease: 'linear',
                repeat: isPlaying ? Infinity : 0,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
