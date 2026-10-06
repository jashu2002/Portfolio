import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        projects: resolve(__dirname, 'projects.html'),
        workflow: resolve(__dirname, 'workflow.html'),
        skills: resolve(__dirname, 'skills.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
