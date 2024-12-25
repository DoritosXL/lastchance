import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Emoji Grid Creator',
    short_name: 'CLB COver',
    description: 'Create and share custom emoji grids effortlessly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}