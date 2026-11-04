import react from '@vitejs/plugin-react'


import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // <-- Import Tailwind plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ,
    tailwindcss(), // <-- Add it here
  ],
})
