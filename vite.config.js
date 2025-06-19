import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240, // compress assets > 10kb
    algorithm: 'gzip', // you can also try 'brotliCompress'
    ext: '.gz'
  })],
})
