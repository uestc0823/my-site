import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  cacheDir: '.build/vite-cache',
  build: {
    outDir: '.build/dist',
  },
  css: {
    modules: {
      // 不要用 animal- 前缀：组件库的 [class^=animal-] 全局规则会误伤站点自己的模块类名
      generateScopedName: 'island-[local]-[hash:base64:5]',
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
