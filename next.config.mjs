import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: [
      'images.unsplash.com',
      'i.gifer.com',
      'images.ctfassets.net',
      'camo.githubusercontent.com',
      'cdn.sanity.io',
      'res.cloudinary.com',
      'i.scdn.co',
      'ucarecdn.com',
    ],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
