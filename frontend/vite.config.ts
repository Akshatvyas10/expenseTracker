import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/expenseTracker/', // 👈 This line is KEY for GitHub Pages
  build: {
    outDir: 'build' // 👈 Match this with your deploy script or change it to 'dist'
  }
})
