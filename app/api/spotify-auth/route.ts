import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = 'http://localhost:3000/api/callback'
const scope = 'user-read-currently-playing user-read-playback-state'

export async function GET() {
  const authUrl =
    'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id!,
      scope: scope,
      redirect_uri: redirect_uri,
    }).toString()

  return NextResponse.redirect(authUrl)
}
