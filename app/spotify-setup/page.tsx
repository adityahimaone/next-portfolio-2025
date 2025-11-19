'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'motion/react'
import { Music, CheckCircle, AlertCircle, Copy, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

function SpotifySetupContent() {
  const searchParams = useSearchParams()
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [step, setStep] = useState<'credentials' | 'authorize' | 'complete'>(
    'credentials',
  )
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string>('')

  // Check for credentials in URL params (after successful auth)
  useEffect(() => {
    const urlClientId = searchParams.get('client_id')
    const urlClientSecret = searchParams.get('client_secret')
    const urlRefreshToken = searchParams.get('refresh_token')
    const urlError = searchParams.get('error')

    if (urlError) {
      setError(`Authorization failed: ${urlError}`)
      setStep('credentials')
    } else if (urlClientId && urlClientSecret && urlRefreshToken) {
      setClientId(urlClientId)
      setClientSecret(urlClientSecret)
      setRefreshToken(urlRefreshToken)
      setStep('complete')
    }
  }, [searchParams])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleAuthorize = () => {
    if (!clientId || !clientSecret) {
      setError('Please enter both Client ID and Client Secret')
      return
    }

    // Store temporarily in sessionStorage
    sessionStorage.setItem('spotify_client_id', clientId)
    sessionStorage.setItem('spotify_client_secret', clientSecret)

    // Redirect to Spotify auth
    const scope = 'user-read-currently-playing user-read-playback-state'
    const redirect_uri = `${window.location.origin}/api/spotify-setup/callback`
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
      {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirect_uri,
      },
    )}`

    window.location.href = authUrl
  }

  const generateEnvContent = () => {
    return `# Spotify API Credentials
SPOTIFY_CLIENT_ID=${clientId}
SPOTIFY_CLIENT_SECRET=${clientSecret}
SPOTIFY_REFRESH_TOKEN=${refreshToken}`
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 p-4 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto max-w-3xl py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg">
              <Music className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold">Spotify Integration Setup</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Configure your Spotify "Now Playing" widget in 3 easy steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              step === 'credentials'
                ? 'bg-green-500 text-white'
                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              1
            </div>
            <span className="text-sm font-medium">Credentials</span>
          </div>
          <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              step === 'authorize'
                ? 'bg-green-500 text-white'
                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              2
            </div>
            <span className="text-sm font-medium">Authorize</span>
          </div>
          <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              step === 'complete'
                ? 'bg-green-500 text-white'
                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              3
            </div>
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        >
          {step === 'credentials' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-xl font-bold">
                  Step 1: Enter Your Spotify App Credentials
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Don't have these yet?{' '}
                  <a
                    href="https://developer.spotify.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Create a Spotify App
                  </a>{' '}
                  and set the redirect URI to:{' '}
                  <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                    {typeof window !== 'undefined' &&
                      `${window.location.origin}/api/spotify-setup/callback`}
                  </code>
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Spotify Client ID
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Spotify Client ID"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Spotify Client Secret
                </label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Enter your Spotify Client Secret"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>

              <button
                onClick={handleAuthorize}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                Continue to Authorization
              </button>
            </div>
          )}

          {step === 'complete' && refreshToken && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <div className="font-bold">Success!</div>
                  <div className="text-sm">
                    Your Spotify integration is configured
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold">
                  Step 3: Add to Your Environment File
                </h2>
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  Copy these credentials to your{' '}
                  <code className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                    .env.local
                  </code>{' '}
                  file:
                </p>

                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
                    {generateEnvContent()}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(generateEnvContent(), 'env')}
                    className="absolute top-2 right-2 flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-white transition-colors hover:bg-zinc-700"
                  >
                    {copied === 'env' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied === 'env' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h3 className="mb-2 font-bold">Next Steps:</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>
                    Create or update the{' '}
                    <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
                      .env.local
                    </code>{' '}
                    file in your project root
                  </li>
                  <li>Paste the credentials above</li>
                  <li>Restart your development server</li>
                  <li>Your "Now Playing" widget will start working!</li>
                </ol>
              </div>

              <button
                onClick={() => {
                  setStep('credentials')
                  setClientId('')
                  setClientSecret('')
                  setRefreshToken('')
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                <RefreshCw className="h-4 w-4" />
                Start Over
              </button>
            </div>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-lg border border-zinc-200 bg-white/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <h3 className="mb-3 font-bold">Need Help?</h3>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              • <strong>Where do I get Client ID/Secret?</strong> Create an app
              at{' '}
              <a
                href="https://developer.spotify.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline hover:text-green-700"
              >
                Spotify Dashboard
              </a>
            </li>
            <li>
              • <strong>What redirect URI should I use?</strong> Use:{' '}
              <code className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                {typeof window !== 'undefined' &&
                  `${window.location.origin}/api/spotify-setup/callback`}
              </code>
            </li>
            <li>
              • <strong>Is this secure?</strong> Your credentials are only
              stored in your local environment file, never sent to any server
              except Spotify's API.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default function SpotifySetupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 p-4 dark:from-zinc-950 dark:to-zinc-900">
          <div className="container mx-auto flex max-w-3xl items-center justify-center py-12">
            <div className="text-center">
              <Music className="text-primary mx-auto h-12 w-12 animate-pulse" />
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Loading...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <SpotifySetupContent />
    </Suspense>
  )
}
