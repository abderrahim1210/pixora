import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'www.pixora.test',
      protocol: 'wss', 
    },
  },
  plugins: [react()],
})
