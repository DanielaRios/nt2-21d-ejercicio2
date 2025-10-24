import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'full-reload',
      handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" })
        return []
      }
    }
  ],
})
