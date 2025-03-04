'use client'

import { useState, useEffect } from 'react'
import { AudioLines, PauseIcon } from 'lucide-react'
import { NowPlayingResponse } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'motion/react'

// Properly type the BorderTrail component props
interface BorderTrailProps {
  className?: string
  size?: number
}

export function BorderTrail({ className, size = 100 }: BorderTrailProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-xl"
      style={{ zIndex: 1 }}
    >
      <div
        className={`absolute inset-0 rounded-xl ${className}`}
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            rgba(0, 0, 0, 0) 0deg,
            currentColor 285deg,
            rgba(0, 0, 0, 0) 360deg
          )`,
          zIndex: -1,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />
      </div>
    </div>
  )
}

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
      <div className="flex flex-col items-center">
        <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-200/30 backdrop-blur-sm dark:bg-zinc-800/30">
            <motion.div
              className="flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <AudioLines className="text-primary h-16 w-16" />
            </motion.div>
          </div>
          <BorderTrail
            className="from-primary/40 via-primary/60 to-primary/40 bg-gradient-to-l"
            size={150}
          />
        </div>

        <div className="mt-4 flex w-full items-center gap-3">
          {/* Spotify icon */}
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-none text-[#1DB954]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
          </svg>

          <div className="flex flex-grow flex-col">
            <motion.div
              className="h-5 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-700"
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.div
              className="mt-1.5 h-4 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-700"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Not playing state
  if (!data.isPlaying) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-200/30 backdrop-blur-sm dark:bg-zinc-800/30">
            <PauseIcon className="mb-2 h-16 w-16 text-zinc-500 opacity-60 dark:text-zinc-400" />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Playback Paused
            </p>
          </div>
          <BorderTrail
            className="bg-gradient-to-l from-zinc-400/20 via-zinc-400/40 to-zinc-400/20 opacity-50"
            size={150}
          />
        </div>

        <div className="mt-4 flex w-full items-center gap-3">
          {/* Spotify icon */}
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-none text-zinc-400"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
          </svg>

          <div className="flex flex-grow flex-col">
            <p className="font-medium text-zinc-600 dark:text-zinc-300">
              Not Currently Playing
            </p>
            <p className="text-sm text-zinc-500">Spotify is idle</p>
          </div>
        </div>
      </div>
    )
  }

  // Playing state
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-[280px] overflow-hidden rounded-xl">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={data.albumImageUrl || '/default-album.jpg'}
            alt={data.album ?? 'Album Cover'}
            className="aspect-square h-full w-full object-cover"
            width={300}
            height={300}
            priority
          />

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 flex w-full max-w-[280px] items-center justify-center bg-black/40 opacity-0 transition-opacity"
            whileHover={{ opacity: 1 }}
          >
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1DB954] p-3 shadow-lg transition-transform hover:scale-110"
            >
              <AudioLines className="h-8 w-8 text-white" />
            </a>
          </motion.div>
        </motion.div>

        <BorderTrail
          className="from-primary/60 via-primary to-primary/60 bg-gradient-to-l"
          size={150}
        />

        {/* Sound wave animation at bottom */}
        <div className="absolute right-0 bottom-0 left-0 flex h-8 items-end justify-center space-x-0.5 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-t bg-white/50"
              animate={{
                height: [
                  `${5 + Math.random() * 20}%`,
                  `${5 + Math.random() * 60}%`,
                  `${5 + Math.random() * 20}%`,
                ],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.7,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex w-full max-w-[280px] items-center gap-3">
        {/* Spotify icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-none text-[#1DB954]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
        </svg>

        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="overflow-hidden whitespace-nowrap">
            {(data.title?.length || 0) > 20 ? (
              <motion.div
                className="inline-flex gap-4"
                initial={{ x: '0%' }}
                animate={{ x: '-50%' }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
              >
                <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                  {data.title || 'Unknown Title'}
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                  {data.title || 'Unknown Title'}
                </span>
              </motion.div>
            ) : (
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {data.title || 'Unknown Title'}
              </span>
            )}
          </div>
          <p className="truncate text-zinc-600 dark:text-zinc-300">
            {data.artist || 'Unknown Artist'}
          </p>
          <p className="truncate text-xs text-zinc-500">
            {data.album || 'Unknown Album'}
          </p>
        </div>
      </div>
    </div>
  )
}
