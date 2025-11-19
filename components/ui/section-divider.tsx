'use client'
import { motion } from 'motion/react'

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div
        className="relative h-20 w-1 overflow-hidden rounded-full bg-zinc-200/50 dark:bg-zinc-800/50"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 80, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full bg-linear-to-b from-transparent via-zinc-500 to-transparent dark:via-zinc-400"
          animate={{ top: ['-100%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 0.5,
          }}
          style={{ height: '50%' }}
        />
      </motion.div>
    </div>
  )
}
