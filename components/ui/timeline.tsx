'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Disc3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEntry {
  title: string | React.ReactNode
  content: React.ReactNode
  tags?: string[]
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-2 py-16 md:px-8 lg:px-10">
        <h2 className="section-heading mb-6 text-center">
          Professional Compositions
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-300">
          My career journey is like a musical progression - each role building
          on the last, creating a rich tapestry of experiences and skills.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg md:left-3 dark:bg-zinc-900/80">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                >
                  <Disc3 className="text-primary h-6 w-6" />
                </motion.div>
              </div>
              <h3 className="hidden text-xl font-bold text-zinc-800 md:block md:pl-20 md:text-3xl dark:text-zinc-200">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-2 pl-14 md:pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-zinc-800 md:hidden dark:text-zinc-200">
                {item.title}
              </h3>

              {/* Enhanced Card Design */}
              <motion.div
                className={cn(
                  'group relative overflow-hidden rounded-xl bg-white p-3 shadow-md transition-all duration-300 md:p-6',
                  'hover:shadow-xl dark:bg-zinc-800/90 dark:backdrop-blur-sm',
                  'border border-zinc-100 dark:border-zinc-700/50',
                )}
                whileHover={{ y: -5 }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 h-16 w-16 rotate-12 opacity-10">
                  <div className="bg-gradient-radial from-primary/30 h-full w-full rounded-full to-transparent"></div>
                </div>
                <div className="absolute -bottom-2 -left-2 h-10 w-10 opacity-10">
                  <div className="bg-gradient-radial from-accent/30 h-full w-full rounded-full to-transparent"></div>
                </div>

                {/* Card content */}
                <div className="relative z-10">{item.content}</div>

                {/* Optional tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Music-themed decorative line */}
                <div className="via-primary/30 absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute top-0 left-6 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-zinc-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="from-primary via-secondary absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[0%] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
