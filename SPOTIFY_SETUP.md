# Spotify Integration Setup Guide

Follow these steps to set up Spotify "Now Playing" integration:

## 🎯 Quick Setup (Recommended)

**The easiest way to set up Spotify integration:**

1. Make sure your dev server is running:

   ```bash
   pnpm dev
   ```

2. Visit the setup wizard:

   ```
   http://localhost:3000/spotify-setup
   ```

3. Follow the on-screen instructions:
   - Enter your Spotify Client ID and Secret
   - Authorize with Spotify
   - Copy the generated credentials to your `.env.local` file

4. Restart your dev server and you're done!

---

## 📚 Manual Setup (Alternative)

If you prefer to set up manually, follow these detailed steps:

### Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create app"**
4. Fill in the details:
   - **App name**: Your Portfolio (or any name)
   - **App description**: Personal portfolio website
   - **Redirect URI**: `http://localhost:3000/api/spotify-setup/callback`
   - **API**: Select "Web API"
5. Check the Terms of Service box and click **"Save"**
6. Click **"Settings"** on your app dashboard
7. Copy your **Client ID** and **Client Secret**

### Step 2: Use the Setup Wizard

1. Make sure your dev server is running:

   ```bash
   pnpm dev
   ```

2. Visit the setup wizard:

   ```
   http://localhost:3000/spotify-setup
   ```

3. Enter your Client ID and Client Secret from Step 1

4. Click "Continue to Authorization" and authorize with Spotify

5. Copy the generated credentials (all three values will be displayed)

### Step 3: Create Environment File

1. In your project root, create a file named `.env.local`
2. Paste the credentials you copied from the setup wizard:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

### Step 4: Restart Your Dev Server

1. Stop your development server (Ctrl+C)
2. Start it again:

   ```bash
   pnpm dev
   ```

3. Your Spotify "Now Playing" widget should now work!

## Troubleshooting

### "INVALID_CLIENT" Error

- Make sure you've copied the correct Client ID and Client Secret
- Ensure there are no extra spaces or quotes in your `.env.local` file
- Verify the redirect URI in your Spotify app settings matches: `http://localhost:3000/api/spotify-setup/callback`
- Try using the setup wizard at `/spotify-setup` for an easier experience

### "No song is currently playing" Message

- Make sure you're actually playing a song on Spotify
- The song must be playing on an active device (phone, desktop app, web player, etc.)
- It may take a few seconds to update

### Environment Variables Not Loading

- Make sure the file is named exactly `.env.local` (not `.env.local.txt`)
- Restart your development server after adding the variables
- Check that the file is in the root directory of your project

## Production Setup

When deploying to production (e.g., Vercel):

1. Add the environment variables in your hosting platform's dashboard
2. Update the redirect URI in your Spotify app to your production URL:
   ```
   https://yourdomain.com/api/spotify-setup/callback
   ```
3. Add this production redirect URI in your Spotify app settings (keep the localhost one for development)
4. You can use the same refresh token for production (as long as it's for the same Spotify account)

## 📖 Additional Resources

- [View Setup Documentation](/spotify) - Read the setup guide in your browser
- [Setup Wizard](/spotify-setup) - Interactive setup tool

---

Need help? Check the [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
