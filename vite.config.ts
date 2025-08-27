import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use '@/assets/main' as *;
        @use '@/assets/colors' as *;
        @use '@/assets/transitions' as *;
        @use '@/assets/variables' as *;
        @use '@/assets/breakpoints' as *;
        `,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.mercadoe.space',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
