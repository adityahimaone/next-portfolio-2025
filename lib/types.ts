export interface SpotifyArtist {
  name: string
}

export interface SpotifyImage {
  url: string
}

export interface SpotifyAlbum {
  name: string
  images: SpotifyImage[]
}

export interface SpotifyItem {
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  external_urls: {
    spotify: string
  }
}

// Add these types for the Spotify API

export interface NowPlayingResponse {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export interface SpotifyNowPlayingData {
  is_playing: boolean
  item: {
    name: string
    artists: Array<{ name: string }>
    album: {
      name: string
      images: Array<{ url: string }>
    }
    external_urls: {
      spotify: string
    }
  }
}
