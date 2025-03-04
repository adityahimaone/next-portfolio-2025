import { NextResponse } from 'next/server'
import { NowPlayingResponse, SpotifyNowPlayingData } from '@/lib/types'
import { getNowPlaying } from '@/lib/spotify'

export const revalidate = 0 // disable cache

export async function GET() {
  try {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false })
    }

    const song: SpotifyNowPlayingData = await response.json()
    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify

    const nowPlayingResponse: NowPlayingResponse = {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    }

    return NextResponse.json(nowPlayingResponse)
  } catch (error) {
    console.error('Error fetching now playing:', error)
    return NextResponse.json({ isPlaying: false }, { status: 500 })
  }
}
