import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Determine base path based on deployment target
  const isGitHubPages = process.env.VITE_DEPLOY_TARGET === 'github-pages'
  const isVercel = process.env.VITE_DEPLOY_TARGET === 'vercel'
  const base = isGitHubPages ? '/portfolio/' : '/'
  
  return {
    base,
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        usePolling: true,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  }
})