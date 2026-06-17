import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {port: 5174, host: true},
  // Permitir importar plugin.json (1 nível acima) + arquivos do knowledge-base
  // como recursos estáticos via fs.allow.
  resolve: {
    alias: {
      '@plugin': path.resolve(__dirname, '..'),
    },
  },
  server: {
    port: 5174,
    host: true,
    fs: {allow: ['..']},
  },
});
