import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Get credentials from sessionStorage (passed via client-side)
  const clientId = searchParams.get('client_id')
  const clientSecret = searchParams.get('client_secret')

  if (error) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/spotify-setup?error=${encodeURIComponent(error)}`,
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/spotify-setup?error=no_code`,
    )
  }

  // If no credentials in query, return HTML that will pass them from sessionStorage
  if (!clientId || !clientSecret) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Completing Spotify Setup...</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(to bottom right, #f9fafb, #e5e7eb);
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 4px solid #e5e7eb;
              border-top-color: #10b981;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            h1 {
              font-size: 1.5rem;
              color: #111827;
              margin-bottom: 0.5rem;
            }
            p {
              color: #6b7280;
              font-size: 0.875rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>Completing Setup...</h1>
            <p>Please wait while we finish the authorization</p>
          </div>
          <script>
            const clientId = sessionStorage.getItem('spotify_client_id');
            const clientSecret = sessionStorage.getItem('spotify_client_secret');
            
            if (clientId && clientSecret) {
              const url = new URL(window.location.href);
              url.searchParams.set('client_id', clientId);
              url.searchParams.set('client_secret', clientSecret);
              window.location.href = url.toString();
            } else {
              window.location.href = '${request.nextUrl.origin}/spotify-setup?error=missing_credentials';
            }
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      },
    )
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: `${request.nextUrl.origin}/api/spotify-setup/callback`,
        grant_type: 'authorization_code',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.redirect(
        `${request.nextUrl.origin}/spotify-setup?error=${encodeURIComponent(errorData.error_description || 'token_error')}`,
      )
    }

    const data = await response.json()

    // Return HTML with the credentials to display
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Setup Complete!</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(to bottom right, #f9fafb, #e5e7eb);
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              max-width: 600px;
              width: 90%;
            }
            h1 {
              color: #10b981;
              margin-bottom: 0.5rem;
            }
            p {
              color: #6b7280;
              margin-bottom: 1.5rem;
            }
            .code-block {
              background: #1f2937;
              color: #f9fafb;
              padding: 1rem;
              border-radius: 0.5rem;
              font-family: 'Courier New', monospace;
              font-size: 0.875rem;
              overflow-x: auto;
              margin-bottom: 1rem;
              white-space: pre-wrap;
              word-break: break-all;
            }
            button {
              background: #10b981;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
              margin-bottom: 0.5rem;
            }
            button:hover {
              background: #059669;
            }
            .secondary {
              background: #6b7280;
            }
            .secondary:hover {
              background: #4b5563;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✓ Setup Complete!</h1>
            <p>Your Spotify integration is ready. Add these to your .env.local file:</p>
            <div class="code-block" id="credentials">SPOTIFY_CLIENT_ID=${clientId}
SPOTIFY_CLIENT_SECRET=${clientSecret}
SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</div>
            <button onclick="copyCredentials()">Copy to Clipboard</button>
            <button class="secondary" onclick="window.location.href='${request.nextUrl.origin}/spotify-setup?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${data.refresh_token}'">View in Setup Page</button>
          </div>
          <script>
            function copyCredentials() {
              const text = document.getElementById('credentials').textContent;
              navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard! Now paste this into your .env.local file and restart your dev server.');
              });
            }
            
            // Clear session storage
            sessionStorage.removeItem('spotify_client_id');
            sessionStorage.removeItem('spotify_client_secret');
          </script>
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
    return NextResponse.redirect(
      `${request.nextUrl.origin}/spotify-setup?error=token_fetch_failed`,
    )
  }
}
