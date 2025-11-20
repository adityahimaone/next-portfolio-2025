'use client'

import { motion } from 'motion/react'

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950"
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning Vinyl / CD */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="relative h-32 w-32 rounded-full border-4 border-zinc-200 bg-zinc-900 shadow-2xl dark:border-zinc-800"
        >
          {/* Grooves */}
          <div className="absolute inset-0 rounded-full border-2 border-zinc-800 opacity-50" />
          <div className="absolute inset-2 rounded-full border-2 border-zinc-800 opacity-50" />
          <div className="absolute inset-4 rounded-full border-2 border-zinc-800 opacity-50" />
          
          {/* Label */}
          <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-inner" />
          
          {/* Spindle Hole */}
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-50 dark:bg-zinc-950" />
          
          {/* Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
        </motion.div>

        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-blue-500/20"
          animate={{ scale: [1, 1.8], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/20"
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Equalizer Bars */}
      <div className="mt-12 flex items-end gap-1.5 h-12">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-full bg-zinc-900 dark:bg-white"
            animate={{
              height: ['20%', '80%', '20%'],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <motion.p
          className="font-mono text-sm font-bold tracking-widest text-zinc-900 dark:text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING STUDIO
        </motion.p>
        <p className="font-mono text-[10px] text-zinc-400">
          INITIALIZING PLUGINS...
        </p>
      </div>
    </motion.div>
  )
}
