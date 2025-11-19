'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Music,
  Book,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'

export default function SpotifyDocsPage() {
  const [activeSection, setActiveSection] = useState<string>('overview')

  const sections = [
    { id: 'overview', title: 'Overview', icon: Info },
    { id: 'quick-setup', title: 'Quick Setup', icon: CheckCircle },
    { id: 'manual-setup', title: 'Manual Setup', icon: Book },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: AlertTriangle },
    { id: 'production', title: 'Production', icon: Wrench },
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg">
              <Music className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Spotify Integration Setup</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Complete guide for "Now Playing" widget configuration
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="sticky top-8 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-sm font-bold tracking-wider text-zinc-500 uppercase">
              Contents
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.title}
                    <ChevronRight
                      className={`ml-auto h-4 w-4 transition-transform ${
                        activeSection === section.id ? 'translate-x-1' : ''
                      }`}
                    />
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <Link
                href="/spotify-setup"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <Wrench className="h-4 w-4" />
                Launch Setup Wizard
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <div className="space-y-8">
            {/* Overview Section */}
            <motion.section
              id="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-3">
                <Info className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold">Overview</h2>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-400">
                  The Spotify "Now Playing" widget displays your currently
                  playing track in real-time. This guide will help you set up
                  the integration in just a few minutes.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-green-900 dark:text-green-100">
                      <CheckCircle className="h-5 w-5" />
                      What You'll Get
                    </h3>
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                      <li>• Real-time track display</li>
                      <li>• Album artwork</li>
                      <li>• Artist information</li>
                      <li>• Auto-refresh every 30s</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-blue-900 dark:text-blue-100">
                      <Book className="h-5 w-5" />
                      What You'll Need
                    </h3>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>• Spotify account</li>
                      <li>• Spotify Developer app</li>
                      <li>• 5 minutes of your time</li>
                      <li>• Running dev server</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Quick Setup Section */}
            <motion.section
              id="quick-setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold">
                  Quick Setup (Recommended)
                </h2>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-400">
                  The fastest way to get started. Our setup wizard handles
                  everything for you.
                </p>

                <div className="not-prose my-6 space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'Start your dev server',
                      description: 'Open your terminal and run:',
                      code: 'pnpm dev',
                    },
                    {
                      step: 2,
                      title: 'Open the setup wizard',
                      description: 'Navigate to:',
                      code: 'http://localhost:3000/spotify-setup',
                      link: '/spotify-setup',
                    },
                    {
                      step: 3,
                      title: 'Follow the instructions',
                      description:
                        'Enter your Spotify credentials and authorize the app',
                    },
                    {
                      step: 4,
                      title: 'Copy & restart',
                      description:
                        'Copy the generated credentials to .env.local and restart your server',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-bold text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </h3>
                        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {item.description}
                        </p>
                        {item.code && (
                          <div className="flex items-center gap-2">
                            <code className="rounded bg-zinc-100 px-3 py-1.5 text-sm dark:bg-zinc-800">
                              {item.code}
                            </code>
                            {item.link && (
                              <Link
                                href={item.link}
                                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                              >
                                Open
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Pro tip:</strong> The setup wizard validates your
                    credentials and provides helpful error messages if something
                    goes wrong.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Manual Setup Section */}
            <motion.section
              id="manual-setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-3">
                <Book className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Manual Setup</h2>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Prefer to set things up manually? Here's the detailed process.
                </p>

                <h3 className="mt-6 text-lg font-bold">
                  1. Create a Spotify App
                </h3>
                <ol className="space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Visit the{' '}
                    <a
                      href="https://developer.spotify.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:underline"
                    >
                      Spotify Developer Dashboard
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>Log in with your Spotify account</li>
                  <li>Click "Create app"</li>
                  <li>
                    Fill in the required details:
                    <ul className="mt-2 space-y-1 pl-4">
                      <li>• App name: Your Portfolio (or any name)</li>
                      <li>• App description: Personal portfolio website</li>
                      <li>
                        • Redirect URI:{' '}
                        <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                          http://localhost:3000/api/spotify-setup/callback
                        </code>
                      </li>
                      <li>• API: Web API</li>
                    </ul>
                  </li>
                  <li>Check the Terms of Service and click "Save"</li>
                  <li>
                    Go to Settings and copy your Client ID and Client Secret
                  </li>
                </ol>

                <h3 className="mt-6 text-lg font-bold">
                  2. Get Your Refresh Token
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Use the setup wizard to generate your refresh token with the
                  credentials from step 1:
                </p>
                <div className="not-prose my-4">
                  <Link
                    href="/spotify-setup"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    <Wrench className="h-4 w-4" />
                    Open Setup Wizard
                  </Link>
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  3. Configure Environment
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Create a <code>.env.local</code> file in your project root:
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
                  {`SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here`}
                </pre>

                <h3 className="mt-6 text-lg font-bold">4. Restart Server</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Stop and restart your development server for changes to take
                  effect.
                </p>
              </div>
            </motion.section>

            {/* Troubleshooting Section */}
            <motion.section
              id="troubleshooting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold">Troubleshooting</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    issue: '"INVALID_CLIENT" Error',
                    solutions: [
                      'Verify you copied the correct Client ID and Client Secret',
                      'Check for extra spaces or quotes in .env.local',
                      'Ensure redirect URI matches: http://localhost:3000/api/spotify-setup/callback',
                      'Try the setup wizard for automatic validation',
                    ],
                  },
                  {
                    issue: '"No song is currently playing"',
                    solutions: [
                      'Make sure a song is actively playing on Spotify',
                      'Check that playback is on an active device',
                      'Wait 30 seconds for the widget to refresh',
                      'Verify your refresh token is correct',
                    ],
                  },
                  {
                    issue: 'Environment variables not loading',
                    solutions: [
                      'Ensure file is named exactly .env.local (not .txt)',
                      'Restart your development server after changes',
                      'Verify file is in project root directory',
                      'Check for syntax errors in the .env.local file',
                    ],
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-900/20"
                  >
                    <h3 className="mb-3 font-bold text-orange-900 dark:text-orange-100">
                      {item.issue}
                    </h3>
                    <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                      {item.solutions.map((solution, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="shrink-0">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Production Section */}
            <motion.section
              id="production"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-3">
                <Wrench className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold">Production Deployment</h2>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-400">
                  When deploying to production (Vercel, Netlify, etc.):
                </p>

                <ol className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Add all three environment variables in your hosting
                    platform's dashboard
                  </li>
                  <li>
                    Update your Spotify app's redirect URI to include your
                    production URL:
                    <code className="ml-2 rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                      https://yourdomain.com/api/spotify-setup/callback
                    </code>
                  </li>
                  <li>
                    Keep both localhost and production redirect URIs in your
                    Spotify app settings
                  </li>
                  <li>You can use the same refresh token for production</li>
                </ol>

                <div className="mt-6 flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-900/20">
                  <Info className="h-5 w-5 shrink-0 text-purple-600" />
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    <strong>Note:</strong> The refresh token is tied to your
                    Spotify account, so it works across all environments.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Need more help? Check out these resources:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://developer.spotify.com/documentation/web-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                <ExternalLink className="h-4 w-4" />
                Spotify API Docs
              </a>
              <Link
                href="/spotify-setup"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <Wrench className="h-4 w-4" />
                Setup Wizard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
