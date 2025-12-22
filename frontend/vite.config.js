// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Optional, but often solves issues:
// import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
    plugins: [
        react(), 
        // tailwindcss(), // ⬅️ Uncomment this if you installed the Vite plugin
    ],
    // ... sometimes css: { postcss: { plugins: [tailwindcss] } } is needed
})