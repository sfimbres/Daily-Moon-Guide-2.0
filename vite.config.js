import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/assets/styles/scss/public.scss";
          @import "src/assets/styles/scss/public/moon_viewing_guide/moon_viewing_guide.scss";
        `
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
