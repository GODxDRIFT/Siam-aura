import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    const dynamicImport = new Function('path', 'return import(path)') as (path: string) => Promise<{ sourceTags?: () => unknown }>;
    const m = await dynamicImport('./.vite-source-tags.js');
    if (typeof m.sourceTags === 'function') {
      plugins.push(m.sourceTags() as never);
    }
  } catch {}
  return { plugins };
})
