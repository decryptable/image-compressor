import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default (({ mode }: { mode: string }) => {
  const base = mode === 'production' ? `/${process.env.VITE_PUBLIC_URL || 'image-compressor'}` : '/'
  return defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base
  })
})
