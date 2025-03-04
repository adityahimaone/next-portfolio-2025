'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { FlipLink } from '@/components/ui/flip-link'
import { SendIcon, CheckIcon } from 'lucide-react'

export function Contact2Section() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: '',
        email: '',
        message: '',
      })

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const mailtoUrl = `mailto:your@email.com?subject=Contact from Website&body=Name: %0D%0A%0D%0AMessage: `

  return (
    <section id="contact" className="py-16" ref={ref}>
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
          Let's Collaborate
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-300"
          variants={itemVariants}
        >
          Ready to create something amazing together? Reach out and let's start
          a conversation about your next project.
        </motion.p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-zinc-700 dark:text-zinc-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-zinc-700 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-zinc-700 dark:text-zinc-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="bg-primary hover:bg-primary-light flex w-full items-center justify-center rounded-full px-6 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <CheckIcon className="mr-2 h-5 w-5" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Connect With Me
              </h3>

              <p className="mb-6 text-zinc-700 dark:text-zinc-300">
                Feel free to reach out through any of these platforms. I'm
                always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light flex h-10 w-10 items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Email
                    </p>
                    <a
                      href={mailtoUrl}
                      className="text-primary dark:text-primary-light hover:underline"
                    >
                      your@email.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light flex h-10 w-10 items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Location
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Social Links
              </h4>

              <div className="flex flex-wrap gap-4">
                <FlipLink href="https://github.com/adityahimaone">
                  Github
                </FlipLink>
                <FlipLink href="https://open.spotify.com/user/212nmrqpklzmvpntgorzpavgq?si=2a79f73cbb334db6">
                  Spotify
                </FlipLink>
                <FlipLink href="https://x.com/adityahimaone">X</FlipLink>
                <FlipLink href="https://linkedin.com/in/adityahimaone">
                  Linkedin
                </FlipLink>
                <FlipLink href={mailtoUrl}>Email • Me</FlipLink>
              </div>
            </div>

            <motion.div
              className="from-primary to-secondary mt-6 rounded-xl bg-gradient-to-r p-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <h4 className="mb-2 text-xl font-bold">
                Let's Create Something Amazing
              </h4>
              <p>
                Whether you need a website, web application, or digital
                experience, I'm ready to bring your vision to life with code and
                creativity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
