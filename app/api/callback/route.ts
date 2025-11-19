import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Check if user denied authorization
  if (error) {
    return NextResponse.json(
      {
        error: 'Authorization denied',
        message: 'You need to authorize the app to use Spotify integration',
      },
      { status: 400 },
    )
  }

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 })
  }

  // Validate environment variables
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return NextResponse.json(
      {
        error: 'Spotify credentials not configured',
        message:
          'Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env.local file',
      },
      { status: 500 },
    )
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/api/callback',
        grant_type: 'authorization_code',
      }),
    })

    const data = await response.json()

    // Return HTML response
    return new NextResponse(
      `
      <html>
        <body>
          <h1>Your Refresh Token:</h1>
          <p style="word-break: break-all;">${data.refresh_token}</p>
          <p>Copy this token and add it to your .env.local file as SPOTIFY_REFRESH_TOKEN</p>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      },
    )
  } catch (error) {
    console.error('Error getting refresh token:', error)
    return NextResponse.json(
      { error: 'Failed to get refresh token' },
      { status: 500 },
    )
  }
}
