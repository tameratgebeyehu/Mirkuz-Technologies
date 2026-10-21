import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // The old offline cache made visitors see an old version after an update.
      // This service worker removes itself and its caches, so every visit gets the
      // newest site straight away (HTML is never cached by Vercel; JS/CSS files are
      // versioned by name).
      selfDestroying: true,
      includeAssets: ['favicon.ico'],
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
