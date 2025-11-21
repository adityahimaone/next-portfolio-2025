'use client'

import { useState, useEffect } from 'react'
import { AudioLines, Zap } from 'lucide-react'
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

  const isPlaying = data?.isPlaying ?? false

  return (
    <div className="relative w-full overflow-hidden rounded-lg border-4 border-zinc-800 bg-zinc-900 shadow-2xl">
      {/* Screw details */}
      <div className="absolute top-2 left-2 flex h-2 w-2 items-center justify-center rounded-full bg-zinc-700 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
        <div className="h-px w-1 rotate-45 bg-zinc-900" />
      </div>
      <div className="absolute top-2 right-2 flex h-2 w-2 items-center justify-center rounded-full bg-zinc-700 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
        <div className="h-px w-1 rotate-12 bg-zinc-900" />
      </div>
      <div className="absolute bottom-2 left-2 flex h-2 w-2 items-center justify-center rounded-full bg-zinc-700 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
        <div className="h-px w-1 -rotate-45 bg-zinc-900" />
      </div>
      <div className="absolute right-2 bottom-2 flex h-2 w-2 items-center justify-center rounded-full bg-zinc-700 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
        <div className="h-px w-1 rotate-90 bg-zinc-900" />
      </div>

      <div className="flex flex-col gap-4 bg-linear-to-b from-zinc-800 to-zinc-900 p-6">
        {/* Header / Status */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-500',
                isPlaying
                  ? 'animate-pulse bg-green-500 shadow-[0_0_8px_#22c55e]'
                  : 'bg-red-900',
              )}
            />
            <span className="text-[10px] font-bold tracking-widest text-zinc-400">
              STEREO RECEIVER
            </span>
          </div>
          <Zap
            size={14}
            className={cn(
              'text-zinc-600 transition-colors duration-500',
              isPlaying && 'fill-amber-500 text-amber-500',
            )}
          />
        </div>

        <div className="flex gap-4">
          {/* Album Art / Cassette Window */}
          <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded border-2 border-zinc-700 bg-black shadow-inner">
            {isPlaying && data?.albumImageUrl ? (
              <div className="h-full w-full">
                <Image
                  src={data.albumImageUrl}
                  alt="Album Art"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-800 border-t-zinc-600 opacity-20" />
              </div>
            )}
            {/* Glare */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/5 to-transparent" />
          </div>

          {/* LCD Display */}
          <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded border-2 border-zinc-700 bg-zinc-950 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,1)]">
            {/* Scanlines */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-30" />

            <div className="relative z-20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-zinc-500">
                  TRACK
                </span>
                <span className="font-mono text-[8px] text-zinc-500">
                  {isPlaying ? '01' : '--'}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="truncate font-mono text-sm text-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                  {isPlaying ? data?.title : 'NO SIGNAL'}
                </p>
              </div>
              <p className="truncate font-mono text-xs text-amber-700">
                {isPlaying ? data?.artist : 'WAITING FOR INPUT...'}
              </p>
            </div>

            {/* Visualizer Bars (Fake) */}
            <div className="relative z-20 mt-2 flex h-4 items-end gap-0.5">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-amber-500/50"
                  animate={{
                    height: isPlaying
                      ? [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
                      : '5%',
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls (Decorative) */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {['RW', 'FF', 'STOP'].map((btn) => (
              <div
                key={btn}
                className="flex h-6 cursor-pointer items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800 px-2 shadow-sm transition-transform active:translate-y-px"
              >
                <span className="text-[8px] font-bold text-zinc-500">
                  {btn}
                </span>
              </div>
            ))}
          </div>
          <a
            href={data?.songUrl || '#'}
            target="_blank"
            className={cn(
              'flex h-8 items-center justify-center rounded bg-zinc-200 px-4 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors hover:bg-white',
              !isPlaying && 'pointer-events-none opacity-50',
            )}
          >
            <span className="flex items-center gap-2 text-[10px] font-black tracking-wider text-zinc-900">
              <AudioLines size={12} /> SPOTIFY
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
