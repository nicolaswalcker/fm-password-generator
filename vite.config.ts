import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/sass/_variables.scss";
        @import "./src/assets/sass/_fonts.scss";
        @import "./src/assets/sass/_mixins.scss";
        @import "./src/assets/sass/_breakpoints.scss";
        @import "./src/assets/sass/_colors.scss";
        @import "./src/assets/sass/_normalize.scss";
        @import "./src/assets/sass/_global.scss";
        `,
      },
    },
  },
  plugins: [vue()],
})
