'use client'
import { motion } from 'motion/react'

export function SectionDivider() {
  return (
    <motion.div
      className="my-24 h-16 w-1 rounded-full bg-zinc-200 dark:bg-zinc-800"
      initial={{ opacity: 0, height: 0 }}
      whileInView={{ opacity: 1, height: 64 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      style={{ margin: '0 auto' }}
    />
  )
}
