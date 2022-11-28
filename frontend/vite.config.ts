import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 5051,
  },
})
