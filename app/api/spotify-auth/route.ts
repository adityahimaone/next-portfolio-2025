import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = 'http://localhost:3000/api/callback'
const scope = 'user-read-currently-playing user-read-playback-state'

export async function GET() {
  // Validate environment variables
  if (!client_id) {
    return NextResponse.json(
      {
        error: 'Spotify Client ID is not configured',
        message: 'Please add SPOTIFY_CLIENT_ID to your .env.local file',
      },
      { status: 500 },
    )
  }

  const authUrl =
    'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }).toString()

  return NextResponse.redirect(authUrl)
}
