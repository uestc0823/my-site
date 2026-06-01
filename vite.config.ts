import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-site/',
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: 'animal-[local]-[hash:base64:5]',
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
