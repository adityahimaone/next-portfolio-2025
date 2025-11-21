'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { LazyMotion, domMax, m } from 'motion/react'
import {
  Mail,
  Github,
  Linkedin,
  Music,
  Copy,
  Radio,
  Square,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudioEngine } from '@/hooks/useAudioEngine'

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

// --- Data (Static - outside component for performance) ---

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
] as const

const dummyColors = [
  'bg-pink-500',
  'bg-cyan-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
] as const

// Musical Presets - Complete Songs
const presets = [
  {
    id: 'preset1',
    name: 'Chill Lofi',
    description: 'Relaxing lofi hip-hop beat',
    pads: [
      // Melody (Do Re Mi pattern)
      { id: 'dummy-1-0', note: 'C4', type: 'melody', rhythm: '4n', delay: 0 },
      { id: 'dummy-3-0', note: 'E4', type: 'melody', rhythm: '4n', delay: 200 },
      { id: 'dummy-5-0', note: 'G4', type: 'melody', rhythm: '4n', delay: 400 },
      // Bass
      { id: 'dummy-1-2', note: 'C2', type: 'bass', rhythm: '2n', delay: 600 },
      { id: 'dummy-5-2', note: 'G2', type: 'bass', rhythm: '2n', delay: 800 },
      // Drums
      { id: 'dummy-0-1', note: 'C1', type: 'kick', rhythm: '4n', delay: 1000 },
      { id: 'dummy-2-1', note: 'D1', type: 'snare', rhythm: '2n', delay: 1200 },
      {
        id: 'dummy-4-1',
        note: 'F#1',
        type: 'hihat',
        rhythm: '8n',
        delay: 1400,
      },
    ],
  },
  {
    id: 'preset2',
    name: 'Energetic EDM',
    description: 'Upbeat electronic dance music',
    pads: [
      // Arpeggio (Do Mi So)
      { id: 'dummy-0-0', note: 'C5', type: 'synth', rhythm: '8n', delay: 0 },
      { id: 'dummy-2-0', note: 'E5', type: 'synth', rhythm: '8n', delay: 100 },
      { id: 'dummy-4-0', note: 'G5', type: 'synth', rhythm: '8n', delay: 200 },
      { id: 'dummy-6-0', note: 'C6', type: 'synth', rhythm: '8n', delay: 300 },
      // Heavy Bass
      { id: 'dummy-1-3', note: 'C2', type: 'bass', rhythm: '4n', delay: 400 },
      { id: 'dummy-3-3', note: 'A2', type: 'bass', rhythm: '4n', delay: 500 },
      // Full Drums
      { id: 'dummy-0-2', note: 'C1', type: 'kick', rhythm: '4n', delay: 600 },
      { id: 'dummy-2-2', note: 'D1', type: 'snare', rhythm: '4n', delay: 700 },
      { id: 'dummy-4-2', note: 'F#1', type: 'hihat', rhythm: '8n', delay: 800 },
      { id: 'dummy-6-2', note: 'A1', type: 'clap', rhythm: '2n', delay: 900 },
    ],
  },
  {
    id: 'preset3',
    name: 'Que Sera Sera',
    description: 'Classic song - 3 verses',
    isMelody: true, // Flag for single-note melody mode
    pads: [
      // VERSE 1: "When I was just a little girl" - 1 2 3 5 3 5 3 5
      { id: 'dummy-0-0', note: 'C4', type: 'melody', duration: '4n', delay: 0 },
      {
        id: 'dummy-1-0',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 400,
      },
      {
        id: 'dummy-2-0',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 800,
      },
      {
        id: 'dummy-4-0',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 1200,
      },
      {
        id: 'dummy-2-1',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 1600,
      },
      {
        id: 'dummy-4-1',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 2000,
      },
      {
        id: 'dummy-2-2',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 2400,
      },
      {
        id: 'dummy-4-2',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 2800,
      },

      // "I asked my mother, What will I be" - 3 5 3 6 5 6 5 3 4
      {
        id: 'dummy-2-3',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 3200,
      },
      {
        id: 'dummy-4-3',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 3600,
      },
      {
        id: 'dummy-2-4',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 4000,
      },
      {
        id: 'dummy-5-0',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 4400,
      },
      {
        id: 'dummy-4-4',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 4800,
      },
      {
        id: 'dummy-5-1',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 5200,
      },
      {
        id: 'dummy-4-5',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 5600,
      },
      {
        id: 'dummy-2-5',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 6000,
      },
      {
        id: 'dummy-3-0',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 6400,
      },

      // "Will I be pretty? Will I be rich?" - 6 7 1' 7 6 . 5 6 7 6
      {
        id: 'dummy-5-2',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 6800,
      },
      {
        id: 'dummy-6-0',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 7200,
      },
      {
        id: 'dummy-0-2',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 7600,
      },
      {
        id: 'dummy-6-1',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 8000,
      },
      {
        id: 'dummy-5-3',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 8400,
      },
      {
        id: 'dummy-4-6',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 8800,
      },
      {
        id: 'dummy-5-4',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 9200,
      },
      {
        id: 'dummy-6-2',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 9600,
      },
      {
        id: 'dummy-5-5',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 10000,
      },

      // "Here's what she said to me" - 2 3 4 3 7 1
      {
        id: 'dummy-1-1',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 10400,
      },
      {
        id: 'dummy-2-6',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 10800,
      },
      {
        id: 'dummy-3-1',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 11200,
      },
      {
        id: 'dummy-2-7',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 11600,
      },
      {
        id: 'dummy-6-3',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 12000,
      },
      {
        id: 'dummy-0-3',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 12400,
      },

      // CHORUS: "Que sera sera, whatever will be, will be" - 1' 7 6 4 6 . 7 2' 1' 6 5 3 5
      {
        id: 'dummy-0-4',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 12800,
      },
      {
        id: 'dummy-6-4',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 13200,
      },
      {
        id: 'dummy-5-6',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 13600,
      },
      {
        id: 'dummy-3-2',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 14000,
      },
      {
        id: 'dummy-5-7',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 14400,
      },
      {
        id: 'dummy-6-5',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 14800,
      },
      {
        id: 'dummy-1-2',
        note: 'D5',
        type: 'melody',
        duration: '4n',
        delay: 15200,
      },
      {
        id: 'dummy-0-5',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 15600,
      },
      {
        id: 'dummy-5-8',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 16000,
      },
      {
        id: 'dummy-4-7',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 16400,
      },
      {
        id: 'dummy-2-8',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 16800,
      },
      {
        id: 'dummy-4-8',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 17200,
      },

      // "The future's not ours to see" - 5 6 5 3 5 2 5
      {
        id: 'dummy-4-9',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 17600,
      },
      {
        id: 'dummy-5-9',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 18000,
      },
      {
        id: 'dummy-4-10',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 18400,
      },
      {
        id: 'dummy-2-9',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 18800,
      },
      {
        id: 'dummy-4-11',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 19200,
      },
      {
        id: 'dummy-1-3',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 19600,
      },
      {
        id: 'dummy-4-12',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 20000,
      },

      // "Que sera sera, what will be, will be" - 2 3 4 7 1 . 2 3 4 7 1'
      {
        id: 'dummy-1-4',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 20400,
      },
      {
        id: 'dummy-2-10',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 20800,
      },
      {
        id: 'dummy-3-3',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 21200,
      },
      {
        id: 'dummy-6-6',
        note: 'B3',
        type: 'melody',
        duration: '4n',
        delay: 21600,
      },
      {
        id: 'dummy-0-6',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 22000,
      },
      {
        id: 'dummy-1-5',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 22400,
      },
      {
        id: 'dummy-2-11',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 22800,
      },
      {
        id: 'dummy-3-4',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 23200,
      },
      {
        id: 'dummy-6-7',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 23600,
      },
      {
        id: 'dummy-0-7',
        note: 'C5',
        type: 'melody',
        duration: '2n',
        delay: 24000,
      },

      // VERSE 2: "When I grew up and fell in love" - 1 2 3 5 5 5 5
      {
        id: 'dummy-0-8',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 25000,
      },
      {
        id: 'dummy-1-6',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 25400,
      },
      {
        id: 'dummy-2-12',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 25800,
      },
      {
        id: 'dummy-4-13',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 26200,
      },
      {
        id: 'dummy-4-14',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 26600,
      },
      {
        id: 'dummy-4-15',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 27000,
      },
      {
        id: 'dummy-4-16',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 27400,
      },

      // "I asked my sweetheart, What lies ahead" - 3 5 3 6 5 6 5 3 4
      {
        id: 'dummy-2-13',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 27800,
      },
      {
        id: 'dummy-4-17',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 28200,
      },
      {
        id: 'dummy-2-14',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 28600,
      },
      {
        id: 'dummy-5-10',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 29000,
      },
      {
        id: 'dummy-4-18',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 29400,
      },
      {
        id: 'dummy-5-11',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 29800,
      },
      {
        id: 'dummy-4-19',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 30200,
      },
      {
        id: 'dummy-2-15',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 30600,
      },
      {
        id: 'dummy-3-5',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 31000,
      },

      // "Will we have rainbows, day after day" - 6 7 1' 7 6 . 5 6 7 6
      {
        id: 'dummy-5-12',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 31400,
      },
      {
        id: 'dummy-6-8',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 31800,
      },
      {
        id: 'dummy-0-9',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 32200,
      },
      {
        id: 'dummy-6-9',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 32600,
      },
      {
        id: 'dummy-5-13',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 33000,
      },
      {
        id: 'dummy-4-20',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 33400,
      },
      {
        id: 'dummy-5-14',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 33800,
      },
      {
        id: 'dummy-6-10',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 34200,
      },
      {
        id: 'dummy-5-15',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 34600,
      },

      // "Here's what my sweetheart said" - 2 3 4 3 7 1
      {
        id: 'dummy-1-7',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 35000,
      },
      {
        id: 'dummy-2-16',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 35400,
      },
      {
        id: 'dummy-3-6',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 35800,
      },
      {
        id: 'dummy-2-17',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 36200,
      },
      {
        id: 'dummy-6-11',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 36600,
      },
      {
        id: 'dummy-0-10',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 37000,
      },

      // CHORUS 2 (same as before)
      {
        id: 'dummy-0-11',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 37400,
      },
      {
        id: 'dummy-6-12',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 37800,
      },
      {
        id: 'dummy-5-16',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 38200,
      },
      {
        id: 'dummy-3-7',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 38600,
      },
      {
        id: 'dummy-5-17',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 39000,
      },
      {
        id: 'dummy-6-13',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 39400,
      },
      {
        id: 'dummy-1-8',
        note: 'D5',
        type: 'melody',
        duration: '4n',
        delay: 39800,
      },
      {
        id: 'dummy-0-12',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 40200,
      },
      {
        id: 'dummy-5-18',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 40600,
      },
      {
        id: 'dummy-4-21',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 41000,
      },
      {
        id: 'dummy-2-18',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 41400,
      },
      {
        id: 'dummy-4-22',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 41800,
      },
      {
        id: 'dummy-4-23',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 42200,
      },
      {
        id: 'dummy-5-19',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 42600,
      },
      {
        id: 'dummy-4-24',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 43000,
      },
      {
        id: 'dummy-2-19',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 43400,
      },
      {
        id: 'dummy-4-25',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 43800,
      },
      {
        id: 'dummy-1-9',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 44200,
      },
      {
        id: 'dummy-4-26',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 44600,
      },
      {
        id: 'dummy-1-10',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 45000,
      },
      {
        id: 'dummy-2-20',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 45400,
      },
      {
        id: 'dummy-3-8',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 45800,
      },
      {
        id: 'dummy-6-14',
        note: 'B3',
        type: 'melody',
        duration: '4n',
        delay: 46200,
      },
      {
        id: 'dummy-0-13',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 46600,
      },
      {
        id: 'dummy-1-11',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 47000,
      },
      {
        id: 'dummy-2-21',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 47400,
      },
      {
        id: 'dummy-3-9',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 47800,
      },
      {
        id: 'dummy-6-15',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 48200,
      },
      {
        id: 'dummy-0-14',
        note: 'C5',
        type: 'melody',
        duration: '2n',
        delay: 48600,
      },

      // VERSE 3: "Now I have children of my own" - 1 2 3 5 3 5 3 5
      {
        id: 'dummy-0-15',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 50000,
      },
      {
        id: 'dummy-1-12',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 50400,
      },
      {
        id: 'dummy-2-22',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 50800,
      },
      {
        id: 'dummy-4-27',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 51200,
      },
      {
        id: 'dummy-2-23',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 51600,
      },
      {
        id: 'dummy-4-28',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 52000,
      },
      {
        id: 'dummy-2-24',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 52400,
      },
      {
        id: 'dummy-4-29',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 52800,
      },

      // "They ask their mother, What will I be" - 3 5 3 6 5 6 5 3 4
      {
        id: 'dummy-2-25',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 53200,
      },
      {
        id: 'dummy-4-30',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 53600,
      },
      {
        id: 'dummy-2-26',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 54000,
      },
      {
        id: 'dummy-5-20',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 54400,
      },
      {
        id: 'dummy-4-31',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 54800,
      },
      {
        id: 'dummy-5-21',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 55200,
      },
      {
        id: 'dummy-4-32',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 55600,
      },
      {
        id: 'dummy-2-27',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 56000,
      },
      {
        id: 'dummy-3-10',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 56400,
      },

      // "Will I be handsome? Will I be rich?" - 6 7 1' 7 6 . 5 6 7 6
      {
        id: 'dummy-5-22',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 56800,
      },
      {
        id: 'dummy-6-16',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 57200,
      },
      {
        id: 'dummy-0-16',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 57600,
      },
      {
        id: 'dummy-6-17',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 58000,
      },
      {
        id: 'dummy-5-23',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 58400,
      },
      {
        id: 'dummy-4-33',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 58800,
      },
      {
        id: 'dummy-5-24',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 59200,
      },
      {
        id: 'dummy-6-18',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 59600,
      },
      {
        id: 'dummy-5-25',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 60000,
      },

      // "I tell them tenderly" - 2 3 4 3 7 1
      {
        id: 'dummy-1-13',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 60400,
      },
      {
        id: 'dummy-2-28',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 60800,
      },
      {
        id: 'dummy-3-11',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 61200,
      },
      {
        id: 'dummy-2-29',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 61600,
      },
      {
        id: 'dummy-6-19',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 62000,
      },
      {
        id: 'dummy-0-17',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 62400,
      },

      // FINAL CHORUS
      {
        id: 'dummy-0-18',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 62800,
      },
      {
        id: 'dummy-6-20',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 63200,
      },
      {
        id: 'dummy-5-26',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 63600,
      },
      {
        id: 'dummy-3-12',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 64000,
      },
      {
        id: 'dummy-5-27',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 64400,
      },
      {
        id: 'dummy-6-21',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 64800,
      },
      {
        id: 'dummy-1-14',
        note: 'D5',
        type: 'melody',
        duration: '4n',
        delay: 65200,
      },
      {
        id: 'dummy-0-19',
        note: 'C5',
        type: 'melody',
        duration: '4n',
        delay: 65600,
      },
      {
        id: 'dummy-5-28',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 66000,
      },
      {
        id: 'dummy-4-34',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 66400,
      },
      {
        id: 'dummy-2-30',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 66800,
      },
      {
        id: 'dummy-4-35',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 67200,
      },
      {
        id: 'dummy-4-36',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 67600,
      },
      {
        id: 'dummy-5-29',
        note: 'A4',
        type: 'melody',
        duration: '4n',
        delay: 68000,
      },
      {
        id: 'dummy-4-37',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 68400,
      },
      {
        id: 'dummy-2-31',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 68800,
      },
      {
        id: 'dummy-4-38',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 69200,
      },
      {
        id: 'dummy-1-15',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 69600,
      },
      {
        id: 'dummy-4-39',
        note: 'G4',
        type: 'melody',
        duration: '4n',
        delay: 70000,
      },
      {
        id: 'dummy-1-16',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 70400,
      },
      {
        id: 'dummy-2-32',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 70800,
      },
      {
        id: 'dummy-3-13',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 71200,
      },
      {
        id: 'dummy-6-22',
        note: 'B3',
        type: 'melody',
        duration: '4n',
        delay: 71600,
      },
      {
        id: 'dummy-0-20',
        note: 'C4',
        type: 'melody',
        duration: '4n',
        delay: 72000,
      },
      {
        id: 'dummy-1-17',
        note: 'D4',
        type: 'melody',
        duration: '4n',
        delay: 72400,
      },
      {
        id: 'dummy-2-33',
        note: 'E4',
        type: 'melody',
        duration: '4n',
        delay: 72800,
      },
      {
        id: 'dummy-3-14',
        note: 'F4',
        type: 'melody',
        duration: '4n',
        delay: 73200,
      },
      {
        id: 'dummy-6-23',
        note: 'B4',
        type: 'melody',
        duration: '4n',
        delay: 73600,
      },
      {
        id: 'dummy-0-21',
        note: 'C5',
        type: 'melody',
        duration: '2n',
        delay: 74000,
      },
    ],
  },
  {
    id: 'preset4',
    name: 'Jazz Fusion',
    description: 'Smooth jazz progression',
    pads: [
      // Chord progression
      { id: 'dummy-0-3', note: 'C4', type: 'chord', rhythm: '2n', delay: 0 },
      { id: 'dummy-1-3', note: 'E4', type: 'chord', rhythm: '2n', delay: 200 },
      { id: 'dummy-2-3', note: 'G4', type: 'chord', rhythm: '2n', delay: 400 },
      // Walking bass
      { id: 'dummy-6-3', note: 'C2', type: 'bass', rhythm: '4n', delay: 600 },
      { id: 'dummy-7-2', note: 'E2', type: 'bass', rhythm: '4n', delay: 700 },
      // Swing drums
      { id: 'dummy-5-3', note: 'C1', type: 'kick', rhythm: '4n', delay: 800 },
      { id: 'dummy-6-1', note: 'F#1', type: 'hihat', rhythm: '8t', delay: 900 },
    ],
  },
] as const

export function ContactLaunchpad() {
  const [activePad, setActivePad] = useState<string | null>(null)
  const [activeLoops, setActiveLoops] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [currentPreset, setCurrentPreset] = useState<string | null>(null)

  // Audio Engine (Lazy Loaded)
  const { toneRef, startAudio, isLoaded } = useAudioEngine()

  // Audio Refs - Store instances, don't trigger re-renders
  const synthsRef = useRef<Record<string, any>>({})
  const loopsRef = useRef<Map<string, any>>(new Map())
  const isInitializedRef = useRef(false)

  // Initialize Synths (Only after Tone.js is loaded)
  const initializeSynths = useCallback(async () => {
    if (isInitializedRef.current || !toneRef.current) return

    const Tone = toneRef.current

    try {
      // Synth for melodies and leads
      const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 1 },
      }).toDestination()

      // PolySynth for chords
      const polySynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 0.8 },
      }).toDestination()

      // Bass synth
      const bass = new Tone.MonoSynth({
        oscillator: { type: 'square' },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1.2 },
        filterEnvelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 1.2,
        },
      }).toDestination()

      // Pad synth for ambient sounds
      const pad = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 1, decay: 0.5, sustain: 0.7, release: 2 },
      }).toDestination()
      pad.volume.value = -10

      // Membrane for kicks
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.08,
        octaves: 4,
        envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 },
      }).toDestination()

      // Metal for snares
      const snare = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.2, release: 0.1 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      }).toDestination()
      snare.volume.value = -5

      // Noise for hi-hats
      const hihat = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.1, sustain: 0 },
      }).toDestination()
      hihat.volume.value = -10

      // Metal for claps
      const clap = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.15, release: 0.05 },
        harmonicity: 3,
        modulationIndex: 20,
        resonance: 3000,
        octaves: 1,
      }).toDestination()
      clap.volume.value = -8

      synthsRef.current = {
        melody: synth,
        synth: synth,
        chord: polySynth,
        bass: bass,
        pad: pad,
        kick: kick,
        snare: snare,
        hihat: hihat,
        clap: clap,
      }
      isInitializedRef.current = true
    } catch (error) {
      console.error('Failed to initialize synths:', error)
    }
  }, [toneRef])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      loopsRef.current.forEach((loop) => loop?.dispose?.())
      Object.values(synthsRef.current).forEach((synth) => synth?.dispose?.())
    }
  }, [])

  const toggleLoop = useCallback(
    (
      padId: string,
      x: number,
      y: number,
      note?: string,
      synthType?: string,
      rhythm?: string,
    ) => {
      if (!toneRef.current || !isInitializedRef.current) return

      const Tone = toneRef.current

      // Check current state from ref to avoid stale closure
      const isCurrentlyActive = loopsRef.current.has(padId)

      if (isCurrentlyActive) {
        // Stop Loop
        const loop = loopsRef.current.get(padId)
        if (loop) {
          loop.stop()
          loop.dispose()
          loopsRef.current.delete(padId)
        }
        setActiveLoops((prev) => {
          const newLoops = new Set(prev)
          newLoops.delete(padId)
          return newLoops
        })
      } else {
        // Start Loop - Update state immediately
        setActiveLoops((prev) => {
          const newLoops = new Set(prev)
          newLoops.add(padId)
          return newLoops
        })

        // Use provided note or fallback to coordinate-based
        const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
        const finalNote = note || notes[(x + y) % notes.length]
        const finalRhythm = rhythm || `${(x % 4) + 1}n`
        const finalType =
          synthType || (y % 3 === 0 ? 'kick' : y % 3 === 1 ? 'melody' : 'hihat')

        let loop: any
        const synth = synthsRef.current[finalType]

        if (!synth) {
          // If synth doesn't exist, remove from active loops
          setActiveLoops((prev) => {
            const newLoops = new Set(prev)
            newLoops.delete(padId)
            return newLoops
          })
          return
        }

        // Different trigger methods for different synth types
        if (['kick', 'snare', 'clap'].includes(finalType)) {
          loop = new Tone.Loop((time: number) => {
            synth.triggerAttackRelease(finalNote, '8n', time)
          }, finalRhythm).start(0)
        } else if (finalType === 'hihat') {
          loop = new Tone.Loop((time: number) => {
            synth.triggerAttackRelease('8n', time)
          }, finalRhythm).start(0)
        } else if (finalType === 'chord' || finalType === 'pad') {
          // For chords, play multiple notes
          const chordNotes = [
            finalNote,
            Tone.Frequency(finalNote).transpose(4),
            Tone.Frequency(finalNote).transpose(7),
          ]
          loop = new Tone.Loop((time: number) => {
            synth.triggerAttackRelease(chordNotes, '4n', time)
          }, finalRhythm).start(0)
        } else {
          // Melody, synth, bass
          loop = new Tone.Loop((time: number) => {
            synth.triggerAttackRelease(finalNote, '8n', time)
          }, finalRhythm).start(0)
        }

        loopsRef.current.set(padId, loop)
      }
    },
    [toneRef],
  )

  const handlePadClick = useCallback(
    async (pad: any) => {
      // OPTIMISTIC UI: Visual feedback FIRST (0ms latency)
      setActivePad(pad.id)
      setTimeout(() => setActivePad(null), 200)

      // THEN: Load audio lazily if needed
      const audioStarted = await startAudio()
      if (audioStarted && isLoaded) {
        await initializeSynths()
        toggleLoop(pad.id, pad.x, pad.y)
      }

      // Functional Actions
      if (!pad.id.startsWith('dummy')) {
        if (pad.action === 'copy' && pad.value) {
          navigator.clipboard.writeText(pad.value)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else if (pad.href) {
          window.open(pad.href, '_blank')
        }
      }
    },
    [startAudio, isLoaded, initializeSynths, toggleLoop],
  )

  // Clear all active loops
  const clearAllLoops = useCallback(() => {
    loopsRef.current.forEach((loop) => {
      loop?.stop()
      loop?.dispose()
    })
    loopsRef.current.clear()
    setActiveLoops(new Set())
    setCurrentPreset(null)
  }, [])

  // Generate Grids (Memoized for performance)
  const { desktopGrid, mobileGrid } = useMemo(() => {
    const generateGridItems = (
      rows: number,
      cols: number,
      isMobile: boolean,
    ) => {
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
            const pad = functionalPads.find((p) => {
              const config = isMobile ? p.mobile : p
              return (
                x >= config.x &&
                x < config.x + config.w &&
                y >= config.y &&
                y < config.y + config.h
              )
            })
            if (
              pad &&
              (isMobile
                ? pad.mobile.x === x && pad.mobile.y === y
                : pad.x === x && pad.y === y)
            ) {
              items.push({
                ...pad,
                type: 'functional',
                w: isMobile ? pad.mobile.w : pad.w,
                h: isMobile ? pad.mobile.h : pad.h,
              })
            }
          } else {
            items.push({
              id: `dummy-${x}-${y}`,
              x,
              y,
              w: 1,
              h: 1,
              type: 'dummy',
              color: dummyColors[(x + y) % dummyColors.length],
            })
          }
        }
      }
      return items
    }

    return {
      desktopGrid: generateGridItems(4, 8, false),
      mobileGrid: generateGridItems(6, 4, true),
    }
  }, []) // Empty deps - static data

  // Load preset pattern (defined after grids are available)
  const loadPreset = useCallback(
    async (presetId: string) => {
      // Clear existing loops first
      clearAllLoops()

      const preset = presets.find((p) => p.id === presetId)
      if (!preset) return

      // Start audio if needed
      const audioStarted = await startAudio()
      if (!audioStarted || !isLoaded) return

      await initializeSynths()

      // Check if this is a melody preset (single notes, not loops)
      const isMelodyPreset = (preset as any).isMelody === true

      if (isMelodyPreset) {
        // For melody presets: play single notes with visual feedback
        preset.pads.forEach((padConfig) => {
          setTimeout(() => {
            const allItems = [...desktopGrid, ...mobileGrid]
            const gridPad = allItems.find((item) => item.id === padConfig.id)
            if (gridPad && toneRef.current) {
              const Tone = toneRef.current
              const synth = synthsRef.current[padConfig.type]

              if (synth) {
                // Visual feedback ON
                setActivePad(padConfig.id)
                setActiveLoops((prev) => {
                  const newLoops = new Set(prev)
                  newLoops.add(padConfig.id)
                  return newLoops
                })

                // Play single note
                const duration = (padConfig as any).duration || '4n'
                synth.triggerAttackRelease(padConfig.note, duration)

                // Visual feedback OFF after note duration
                setTimeout(() => {
                  setActiveLoops((prev) => {
                    const newLoops = new Set(prev)
                    newLoops.delete(padConfig.id)
                    return newLoops
                  })
                  setActivePad(null)
                }, 350) // Note duration
              }
            }
          }, padConfig.delay)
        })
      } else {
        // For loop presets: use toggleLoop as before
        preset.pads.forEach((padConfig) => {
          setTimeout(() => {
            const allItems = [...desktopGrid, ...mobileGrid]
            const gridPad = allItems.find((item) => item.id === padConfig.id)
            if (gridPad) {
              toggleLoop(
                padConfig.id,
                gridPad.x,
                gridPad.y,
                padConfig.note,
                padConfig.type,
                (padConfig as any).rhythm,
              )
            }
          }, padConfig.delay)
        })
      }

      setCurrentPreset(presetId)
    },
    [
      clearAllLoops,
      startAudio,
      isLoaded,
      initializeSynths,
      toggleLoop,
      desktopGrid,
      mobileGrid,
      toneRef,
    ],
  )

  const LaunchpadGrid = useCallback(
    ({ items, cols, rows }: { items: any[]; cols: number; rows: number }) => (
      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          aspectRatio: `${cols}/${rows}`,
        }}
      >
        {items.map((pad) => (
          <m.button
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
                    {pad.id === 'copy' && copied
                      ? 'COPIED!'
                      : (pad as any).label}
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
          </m.button>
        ))}
      </div>
    ),
    [activePad, activeLoops, copied, handlePadClick],
  )

  return (
    <LazyMotion features={domMax}>
      <section id="contact" className="overflow-hidden py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-2 rounded-full bg-zinc-200/50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
            >
              <Radio className="h-4 w-4" />
              <span>SESSION BOOKING</span>
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black tracking-tighter text-zinc-900 sm:text-5xl dark:text-white"
            >
              Launch Collaboration
            </m.h2>
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

              {/* Control Panel: Presets & Clear */}
              <div className="mb-4 space-y-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-zinc-500">
                    SONG PRESETS:
                  </span>
                  <m.button
                    onClick={clearAllLoops}
                    disabled={activeLoops.size === 0}
                    className={cn(
                      'flex items-center gap-1.5 rounded border px-3 py-1 text-[10px] font-bold transition-all',
                      activeLoops.size > 0
                        ? 'border-red-500 bg-red-500/20 text-red-400 hover:scale-105 hover:bg-red-500/30'
                        : 'cursor-not-allowed border-zinc-700 bg-zinc-900/50 text-zinc-600',
                    )}
                    whileTap={activeLoops.size > 0 ? { scale: 0.95 } : {}}
                  >
                    <Square className="h-3 w-3" />
                    STOP ALL
                  </m.button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {presets.map((preset) => (
                    <m.button
                      key={preset.id}
                      onClick={() => loadPreset(preset.id)}
                      className={cn(
                        'group relative overflow-hidden rounded-lg border p-2 text-left transition-all hover:scale-105',
                        currentPreset === preset.id
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-zinc-600 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800',
                      )}
                      whileTap={{ scale: 0.95 }}
                      title={preset.description}
                    >
                      <div className="relative z-10">
                        <div className="mb-1 flex items-center justify-between">
                          <span
                            className={cn(
                              'text-[10px] font-bold',
                              currentPreset === preset.id
                                ? 'text-green-400'
                                : 'text-zinc-400 group-hover:text-zinc-300',
                            )}
                          >
                            {preset.name.toUpperCase()}
                          </span>
                          {currentPreset === preset.id && (
                            <m.div
                              className="h-1.5 w-1.5 rounded-full bg-green-500"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p
                          className={cn(
                            'text-[8px]',
                            currentPreset === preset.id
                              ? 'text-green-500/80'
                              : 'text-zinc-500 group-hover:text-zinc-400',
                          )}
                        >
                          {preset.description}
                        </p>
                      </div>
                      {currentPreset === preset.id && (
                        <m.div
                          className="absolute inset-0 bg-green-500/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </m.button>
                  ))}
                </div>

                {currentPreset && (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded border border-green-500/30 bg-green-500/10 px-3 py-1.5"
                  >
                    <Music className="h-3 w-3 text-green-500" />
                    <span className="text-[10px] font-medium text-green-400">
                      Now Playing:{' '}
                      {presets.find((p) => p.id === currentPreset)?.name}
                    </span>
                  </m.div>
                )}
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
    </LazyMotion>
  )
}
