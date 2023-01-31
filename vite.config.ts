import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'

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
        @import "/src/assets/sass/variables";
        @import "/src/assets/sass/fonts";
        @import "/src/assets/sass/mixins";
        @import "/src/assets/sass/breakpoints";
        @import "/src/assets/sass/transitions";
        @import "/src/assets/sass/colors";
        @import "/src/assets/sass/normalize";
        @import "/src/assets/sass/global";
        `,
      },
    },
  },
  plugins: [vue(), svgLoader()],
})
