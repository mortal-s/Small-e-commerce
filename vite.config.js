import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver,ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver(),ElementPlusResolver()],
     
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', 
      import.meta.url))
    }
  }
})
