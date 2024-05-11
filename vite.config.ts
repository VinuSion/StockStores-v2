import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@forms": path.resolve(__dirname, "./src/components/forms"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/hooks/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: 5000,
  },
})
