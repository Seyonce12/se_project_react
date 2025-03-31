import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/se_project_react/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(new URL('.', import.meta.url).pathname, 'src'),
    },
  },
})
