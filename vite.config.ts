import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// VITE_BASE is "/<repo-name>/" on GitHub Pages (set by the workflow).
export default defineConfig({ base: process.env.VITE_BASE || '/', plugins: [react()] });
