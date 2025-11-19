'use client'

import { useState, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react'
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Music,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquare,
  Radio,
  Disc3,
  Mic2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    id: 'email',
    label: 'Email',
    value: 'adityahimaone@gmail.com', // Assuming email based on context, or I'll use a placeholder/mailto
    href: 'mailto:adityahimaone@gmail.com',
    icon: Mail,
    color: 'bg-red-500',
    description: 'Send a direct message',
    action: 'Copy Email',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '@adityahimaone',
    href: 'https://linkedin.com/in/adityahimaone',
    icon: Linkedin,
    color: 'bg-blue-600',
    description: 'Professional network',
    action: 'Connect',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@adityahimaone',
    href: 'https://github.com/adityahimaone',
    icon: Github,
    color: 'bg-zinc-800',
    description: 'Check my repositories',
    action: 'Follow',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    value: 'adityahimaone',
    href: 'https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq?si=2a79f73cbb334db6',
    icon: Music,
    color: 'bg-green-500',
    description: "See what I'm listening to",
    action: 'Listen',
  },
  //   {
  //     id: 'twitter',
  //     label: 'X / Twitter',
  //     value: '@adityahimaone',
  //     href: 'https://x.com/adityahimaone',
  //     icon: Twitter,
  //     color: 'bg-sky-500',
  //     description: 'Random thoughts & updates',
  //     action: 'Follow',
  //   },
]

function SocialCard({
  link,
  index,
}: {
  link: (typeof socialLinks)[0]
  index: number
}) {
  const [copied, setCopied] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleAction = (e: React.MouseEvent) => {
    if (link.id === 'email') {
      e.preventDefault()
      navigator.clipboard.writeText(link.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      window.location.href = link.href
    }
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleAction}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      {/* Hover Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md',
            link.color,
          )}
        >
          <link.icon size={24} />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {link.id === 'email' && copied ? (
            <>
              <Check size={12} className="text-green-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <span>{link.action}</span>
              <ArrowUpRight size={12} />
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {link.label}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
        <p className="mt-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {link.value}
        </p>
      </div>

      {/* Decorative Background Icon */}
      <link.icon className="absolute -right-4 -bottom-4 h-32 w-32 text-zinc-100 opacity-50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 dark:text-zinc-800/50" />
    </motion.a>
  )
}

export function ContactSection2025() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/5 absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] bg-blue-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <Radio className="h-4 w-4" />
            <span>BOOKING & INQUIRIES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            Start a Session
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Whether you have a project in mind, a bug to fix, or just want to
            jam on some ideas, I'm always open to new collaborations.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Main Contact Card (Large) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 p-8 text-white shadow-2xl sm:col-span-2 lg:col-span-1 lg:row-span-2 dark:bg-zinc-950"
          >
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                AVAILABLE FOR WORK
              </div>
              <h3 className="text-3xl leading-tight font-bold">
                Let's build something legendary together.
              </h3>
              <p className="mt-4 text-zinc-400">
                I'm currently available for freelance projects and open to
                full-time opportunities.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <a
                href="mailto:adityahimaone@gmail.com"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-zinc-900 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="h-5 w-5" />
                <span>Send a Message</span>
              </a>
            </div>

            {/* Decorative Vinyl */}
            <div className="absolute -right-24 -bottom-24 h-64 w-64 animate-[spin_10s_linear_infinite] rounded-full border-[12px] border-zinc-800 bg-zinc-950 opacity-50">
              <div className="absolute inset-0 rounded-full border-2 border-zinc-800/50" />
              <div className="absolute inset-5 rounded-full border-2 border-zinc-800/50" />
              <div className="absolute inset-10 rounded-full border-2 border-zinc-800/50" />
            </div>
          </motion.div>

          {/* Social Links Grid */}
          {socialLinks.map((link, i) => (
            <SocialCard key={link.id} link={link} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
