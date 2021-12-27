import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    resolve: {
      extensions: ['.js', 'ts', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
        },
      },
    server: {
      host: '0.0.0.0',
      port: 9000,
      cors: true,
      proxy: {
        '/xxxx': {
          target: 'xxxx',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/xxxx/, ''),
        },
      },
    },
  }
})
