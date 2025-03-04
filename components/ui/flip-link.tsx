'use client'
import { motion } from 'motion/react'
import Link from 'next/link'

interface FlipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function FlipLink({ href, children, className = '' }: FlipLinkProps) {
  return (
    <Link href={href} className={`flip-link ${className}`}>
      <motion.div className="flip-link-content">
        <span className="flip-link-front">{children}</span>
        <span className="flip-link-back text-secondary">
          {typeof children === 'string' ? children : 'Visit →'}
        </span>
      </motion.div>
    </Link>
  )
}
