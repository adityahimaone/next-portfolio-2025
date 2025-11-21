'use client'

import { useState, useRef } from 'react'
import { LazyMotion, domMax, m, AnimatePresence, useInView } from 'motion/react'
import Image from 'next/image'
import {
  ExternalLink,
  Disc,
  X,
  Play,
  Music,
  Maximize2,
  ArrowUpRight,
  Mic2,
  Globe,
  Code,
  Zap,
  Cpu,
  Database,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface IProjectData {
  id: number
  title: string
  description: string
  image: string
  url: string
  genre?: string
  year?: string
  vinylColor: string
  vinylIcon: any
}

const projectsData: IProjectData[] = [
  {
    id: 1,
    title: 'Primarindo Asia',
    description:
      'Company profile for Primarindo Asia Infrastructure Tbk, a manufacturer specializing in shoe production. The website showcases their manufacturing capabilities, product lines, and corporate information.',
    image: '/assets/primarindo.png',
    url: 'https://primarindo.niqcode.com/',
    genre: 'Corporate / Manufacturing',
    year: '2024',
    vinylColor: 'from-blue-600 to-cyan-500',
    vinylIcon: Globe,
  },
  {
    id: 2,
    title: 'Frontend Resources',
    description:
      'A curated collection of the best frontend development tools, libraries, and inspiration sources to supercharge your web development workflow.',
    image: '/assets/frontend-resources.png',
    url: 'https://frontend-resources-rouge.vercel.app/',
    genre: 'Educational / Tools',
    year: '2023',
    vinylColor: 'from-yellow-500 to-orange-500',
    vinylIcon: Code,
  },
  {
    id: 3,
    title: 'Quick Chat Whatsapp',
    description:
      "A utility app that lets users send WhatsApp messages without saving the recipient's phone number. Simplifies communication by eliminating the need to create contacts for one-time conversations.",
    image: '/assets/quick-chat-wa.png',
    url: 'http://quick-chat-whatsapp.vercel.app/',
    genre: 'Utility / Productivity',
    year: '2023',
    vinylColor: 'from-green-500 to-emerald-500',
    vinylIcon: Zap,
  },
  {
    id: 4,
    title: 'SeaPhantom',
    description:
      'Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Explore the world of NFTs and peer-to-peer trading on the SeaPhantom platform.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/y2l1g36bjudgsf6yr0eg.webp',
    url: 'https://seaphantom.com',
    genre: 'Web3 / NFT',
    year: '2022',
    vinylColor: 'from-purple-600 to-pink-600',
    vinylIcon: Cpu,
  },
  {
    id: 5,
    title: 'SeaPhantom P2P',
    description:
      'Engage in NFT trading with the P2P Rum Token Escrow Trading project. This platform facilitates secure and transparent NFT transactions.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/fphb7ddemp4ixeutav1b.webp',
    url: 'https://auth.seaphantom.com/',
    genre: 'DeFi / Trading',
    year: '2022',
    vinylColor: 'from-indigo-600 to-violet-600',
    vinylIcon: Database,
  },
  {
    id: 6,
    title: 'Labgrownbeasts',
    description:
      'Explore the Labgrownbeasts Company Profile, showcasing innovation and excellence in the field. Learn about our vision, mission, and the cutting-edge work we do.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/mqprcb6todunicq4cg0a.webp',
    url: 'https://labgrownbeasts.com/',
    genre: 'Biotech / Corporate',
    year: '2022',
    vinylColor: 'from-red-500 to-rose-500',
    vinylIcon: Layers,
  },
]

export function ProjectsSection2025() {
  const [selectedProject, setSelectedProject] = useState<IProjectData | null>(
    null,
  )
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <LazyMotion features={domMax}>
      <section
        id="projects"
        className="overflow-hidden py-24 2xl:overflow-visible"
        ref={ref}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-center text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="mb-4 flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <Disc className="h-4 w-4" />
              <span>TRACKS</span>
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl"
            >
              Featured Releases
            </m.h2>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col items-center"
                onClick={() => setSelectedProject(project)}
              >
                <div className="perspective-1000 relative w-full max-w-[300px] cursor-pointer">
                  {/* Vinyl Record sliding out */}
                  <div className="absolute top-1 right-1 bottom-1 left-1 flex items-center justify-center rounded-full bg-zinc-950 shadow-xl transition-all duration-700 ease-out group-hover:translate-x-[50%] group-hover:rotate-360 group-active:translate-x-[50%] group-active:rotate-360">
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,rgba(255,255,255,0.1)_30deg,transparent_60deg)]" />
                    {/* Grooves */}
                    <div className="absolute inset-[15%] rounded-full border border-zinc-800/40" />
                    <div className="absolute inset-[25%] rounded-full border border-zinc-800/40" />
                    <div className="absolute inset-[35%] rounded-full border border-zinc-800/40" />

                    {/* Center Label */}
                    <div
                      className={cn(
                        'flex h-1/3 w-1/3 items-center justify-center rounded-full bg-linear-to-br text-white shadow-inner',
                        project.vinylColor,
                      )}
                    >
                      {/* <project.vinylIcon className="w-5 h-5" /> */}
                    </div>
                    {/* Center Hole */}
                    <div className="absolute h-1.5 w-1.5 rounded-full bg-black" />
                  </div>

                  {/* Album Cover (Card) */}
                  <div className="relative z-10 flex aspect-square flex-col overflow-hidden rounded-sm bg-zinc-100 shadow-2xl transition-transform duration-300 group-hover:-translate-x-2 group-active:-translate-x-2 dark:bg-zinc-900">
                    {/* Image Area */}
                    <div className="relative h-[75%] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                      />

                      {/* Glare effect */}
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50" />
                    </div>

                    {/* Info Area (Footer) */}
                    <div className="relative flex h-[25%] flex-col justify-center border-t border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-950">
                      <h3 className="truncate text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="truncate">{project.genre}</span>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal (Liner Notes) */}
        <AnimatePresence>
          {selectedProject && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <m.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-zinc-900 backdrop-blur-md transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid h-full grid-cols-1 md:grid-cols-2">
                  {/* Left: Image Area */}
                  <div className="relative h-64 bg-zinc-100 md:h-full dark:bg-zinc-800">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                    {/* Floating Music Note */}
                    <div className="absolute bottom-6 left-6">
                      <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg">
                        <Music className="h-6 w-6 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Content Area */}
                  <div className="flex flex-col p-8">
                    <div className="mb-6">
                      <div className="text-primary mb-2 flex items-center gap-2 text-sm font-medium">
                        <Mic2 className="h-4 w-4" />
                        <span>FEATURED TRACK</span>
                      </div>
                      <h3 className="text-3xl leading-tight font-bold text-zinc-900 dark:text-zinc-100">
                        {selectedProject.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <span>{selectedProject.genre}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span>{selectedProject.year}</span>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {selectedProject.description}
                      </p>

                      <div className="mt-8 space-y-4">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
                          Production Credits
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Next.js', 'Tailwind', 'TypeScript'].map(
                            (tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                              >
                                {tech}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-4 font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                      >
                        <Play className="h-5 w-5 fill-current" />
                        <span>Listen to Track (Visit Site)</span>
                        <ArrowUpRight className="ml-auto h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  )
}
