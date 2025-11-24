// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',       // 👈 This is the fix (see below for explanation, do not miss the dot + slash)
});
