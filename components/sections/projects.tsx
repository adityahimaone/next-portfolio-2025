'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { AnimatedCard } from '@/components/ui/animated-card'
import Image from 'next/image'
import { ExternalLinkIcon } from 'lucide-react'

interface IProjectData {
  id: number
  title: string
  description: string
  image: string
  url: string
}

const projectsData: IProjectData[] = [
  {
    id: 1,
    title: 'Portfolio Bento',
    description:
      'Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Explore the world of NFTs and peer-to-peer trading on the SeaPhantom platform.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1731132621/portofolio/rjwnyaeifqmneuflt3it.png',
    url: 'https://seaphantom.com',
  },
  {
    id: 2,
    title: 'SeaPhantom Landing Page',
    description:
      'Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Explore the world of NFTs and peer-to-peer trading on the SeaPhantom platform.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/y2l1g36bjudgsf6yr0eg.webp',
    url: 'https://seaphantom.com',
  },
  {
    id: 3,
    title: 'SeaPhantom P2P Rum Token Escrow Trading',
    description:
      'Engage in NFT trading with the P2P Rum Token Escrow Trading project. This platform facilitates secure and transparent NFT transactions.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/fphb7ddemp4ixeutav1b.webp',
    url: 'https://auth.seaphantom.com/',
  },
  {
    id: 4,
    title: 'Labgrownbeasts Company Profile',
    description:
      'Explore the Labgrownbeasts Company Profile, showcasing innovation and excellence in the field. Learn about our vision, mission, and the cutting-edge work we do.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1699777135/portofolio/mqprcb6todunicq4cg0a.webp',
    url: 'https://labgrownbeasts.com/',
  },
  {
    id: 5,
    title: 'Gold Apple Token',
    description:
      'Explore the Labgrownbeasts Company Profile, showcasing innovation and excellence in the field. Learn about our vision, mission, and the cutting-edge work we do.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1731218154/portofolio/btj1gqvxgej1cgbqm6zf.png',
    url: 'https://labgrownbeasts.com/',
  },
  {
    id: 6,
    title: 'Daily Calories Apps',
    description:
      'Explore the Labgrownbeasts Company Profile, showcasing innovation and excellence in the field. Learn about our vision, mission, and the cutting-edge work we do.',
    image:
      'https://res.cloudinary.com/deselamak/image/upload/v1731218151/portofolio/irby71t9knqrf3y5jogn.png',
    url: 'https://labgrownbeasts.com/',
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState<IProjectData | null>(
    null,
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const openProject = (project: IProjectData) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-16" ref={ref}>
      <motion.div
        className="mx-auto max-w-screen-xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="section-heading mb-12 text-center"
          variants={itemVariants}
        >
          Digital Compositions
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-300"
          variants={itemVariants}
        >
          Like a musician's portfolio of songs, these projects showcase my
          ability to create harmonious digital experiences that resonate with
          users.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <AnimatedCard
                className="group hover:border-primary h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900"
                glareIntensity={0.3}
              >
                <div
                  className="relative h-48 w-full cursor-pointer overflow-hidden"
                  onClick={() => openProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light dark:text-primary-light dark:hover:text-primary transition-colors"
                    >
                      <ExternalLinkIcon size={18} />
                    </a>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </p>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              onClick={closeProject}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl bg-white p-6 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 rounded-full bg-zinc-100 p-2 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  onClick={closeProject}
                >
                  ✕
                </button>

                <div className="mb-6 h-64 w-full overflow-hidden rounded-xl sm:h-80">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {selectedProject.title}
                </h3>
                <p className="mb-6 text-zinc-700 dark:text-zinc-300">
                  {selectedProject.description}
                </p>

                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-light inline-flex items-center rounded-full px-6 py-3 text-white transition-colors"
                >
                  Visit Project
                  <ExternalLinkIcon size={18} className="ml-2" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
