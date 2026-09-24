import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    // El hero de Home es lo único que necesita GSAP: viaja en su propio chunk
    // para que el resto de las rutas no lo descarguen.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('gsap')) return 'motion'
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('@emailjs')) return 'emailjs'
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
  base: '/',
})
