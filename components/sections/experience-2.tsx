'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'

const timelineData = [
  {
    title: 'APR 2024 - SEP 2024',
    content: (
      <div>
        <h3 className="mb-1 flex flex-col text-2xl font-medium text-zinc-800 md:flex-row md:items-baseline md:gap-2 dark:text-zinc-200">
          Frontend Developer
          <span className="text-base font-light text-zinc-400 md:text-lg">
            Part Time
          </span>
        </h3>
        <p className="text-secondary mb-3 text-lg">80&Company - Kyoto, Japan</p>
        <ul className="space-y-3">
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Spearheaded the development of a next-generation Human Resources
            Management System incorporating blockchain technology to ensure
            enhanced data security and decentralization.
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Also responsible for maintaining the application, resolving critical
            bugs to improve system reliability and user experience
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Collaborated with the design team to create a user-friendly
            interface and ensure a seamless user experience.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'OCT 2022 - PRESENT',
    content: (
      <div>
        <h3 className="mb-1 text-2xl font-medium text-zinc-800 dark:text-zinc-200">
          Frontend Developer
        </h3>
        <p className="text-secondary mb-3 text-lg">
          Fast 8 People Hub - Jakarta, Indonesia
        </p>
        <ul className="mb-3 space-y-3">
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Led the development of &ldquo;Bisadaya&rdquo; job-seeking platform
            serving thousands of users, leveraging Next.js 14 for optimal
            performance and SEO
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Architected and implemented an automated KPI tracking system
            featuring customizable forms and interactive dashboards using jQuery
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Executed critical maintenance tasks and bug fixes across legacy and
            modern codebases
          </li>
        </ul>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-40 w-full rounded-lg bg-zinc-200 object-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 dark:bg-zinc-800"></div>
          <div className="h-40 w-full rounded-lg bg-zinc-200 object-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 dark:bg-zinc-800"></div>
        </div>
      </div>
    ),
  },
  {
    title: 'JUN 2022 - AUG 2024',
    content: (
      <div>
        <h3 className="mb-1 text-2xl font-medium text-zinc-800 dark:text-zinc-200">
          Frontend Developer
        </h3>
        <p className="text-secondary mb-3 text-lg">
          Unzypsoft - Jakarta, Indonesia
        </p>
        <ul className="space-y-3">
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Collaborated on BSN e-commerce platform frontend using ReactJS,
            working across teams to deliver enhanced shopping experiences and
            drive customer engagement
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Developed a dynamic NFT protocol interface with ReactJS and Tailwind
            CSS, creating reusable components that boosted development
            efficiency
          </li>
          <li className="inline-flex items-start gap-2">
            <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
            Executed critical maintenance tasks and bug fixes across legacy and
            modern codebases
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: (
      <span>
        <span className="text-secondary">V</span>ocational{' '}
        <span className="text-secondary">O</span>nline{' '}
        <span className="text-secondary">C</span>ourses
      </span>
    ),
    content: (
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="mb-1 flex flex-col text-2xl font-medium text-zinc-800 md:flex-row md:items-baseline md:gap-2 dark:text-zinc-200">
            Frontend Developer
            <span className="text-base font-light text-zinc-400 md:text-lg">
              FEB 2022 - JUL 2022
            </span>
          </h3>
          <p className="text-secondary mb-3 text-lg">
            Bootcamp Frontend Developer By Binar Academy
          </p>
          <ul className="space-y-3">
            <li className="inline-flex items-start gap-2">
              <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
              Focused on developing a frontend application for car booking using
              a modern stack including NodeJS, EJS, ReactJS, and NextJS. The
              project aimed at providing a user-friendly interface for booking
              vehicles, improving the service accessibility for users.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-1 flex flex-col text-2xl font-medium text-zinc-800 md:flex-row md:items-baseline md:gap-2 dark:text-zinc-200">
            Fullstack Engineering
            <span className="text-base font-light text-zinc-400 md:text-lg">
              AUG 2021 - JAN 2022
            </span>
          </h3>
          <p className="text-secondary mb-3 text-lg">
            Bootcamp Fullstack Developer By Alterra Academy
          </p>
          <ul className="space-y-3">
            <li className="inline-flex items-start gap-2">
              <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
              Developed a comprehensive Calories Tracker & Hospital Management
              System, using a Golang backend for efficient data handling and a
              ReactJS frontend for a smooth user experience. The project
              supported hospital management and health tracking functionalities.
            </li>
          </ul>
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-40 w-full rounded-lg bg-zinc-200 object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 dark:bg-zinc-800"></div>
            <div className="h-40 w-full rounded-lg bg-zinc-200 object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 dark:bg-zinc-800"></div>
          </div>
        </div>
        <div>
          <h3 className="mb-1 flex flex-col text-2xl font-medium text-zinc-800 md:flex-row md:items-baseline md:gap-2 dark:text-zinc-200">
            Cloud Computing
            <span className="text-base font-light text-zinc-400 md:text-lg">
              FEB 2021 - JUL 2021
            </span>
          </h3>
          <p className="text-secondary mb-3 text-lg">
            Bangkit Academy By Google, Tokopedia, Gojek, & Traveloka
          </p>
          <ul className="space-y-3">
            <li className="inline-flex items-start gap-2">
              <div className="bg-secondary mt-2 h-2 w-2 flex-none" />
              Collaborated on a capstone project to develop a machine learning
              application that estimates calories from food images. Integrated
              with Firebase and deployed on Google Cloud, this project utilized
              cloud balancing to optimize resource use and enhance application
              performance.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function Experience2Section() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

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

  return (
    <section id="experience" className="py-16" ref={ref}>
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
          Professional Compositions
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-300"
          variants={itemVariants}
        >
          My career journey is like a musical progression - each role building
          on the last, creating a rich tapestry of experiences and skills.
        </motion.p>

        <motion.div
          className="before:from-primary before:via-secondary before:to-primary-light relative space-y-12 pl-8 before:absolute before:top-0 before:left-0 before:h-full before:w-0.5 before:bg-gradient-to-b"
          variants={containerVariants}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <div className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md dark:bg-zinc-900">
                <div className="from-primary to-secondary h-4 w-4 rounded-full bg-gradient-to-r"></div>
              </div>

              <div className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
                {item.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
