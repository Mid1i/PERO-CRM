import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/composables": "/src/composables",
      "@/helpers": "/src/helpers",
      "@/interfaces": "/src/interfaces",
      "@/layouts": "/src/layouts",
      "@/plugins": "/src/plugins",
      "@/router": "/src/router",
      "@/types": "/src/types",
      "@/views": "/src/views"
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
