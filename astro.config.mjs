import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hek75.com',
  build: {
    inlineStylesheets: 'always',
  },
  redirects: {
    '/about': '/player',
    '/skills': '/player',
    '/games': '/projects',
    '/multiplayer': '/contact',
  },
});

