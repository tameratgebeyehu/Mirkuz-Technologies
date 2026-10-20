import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        globIgnores: ['apks/**/*']
      },
      manifest: {
        name: 'Tamerat Gebeyehu',
        short_name: 'Tamerat',
        description: 'Tamerat Gebeyehu - personal website',
        theme_color: '#0b7a53',
        background_color: '#fbfaf7',
        display: 'standalone',
        icons: [
          {
            src: 'logos/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logos/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
