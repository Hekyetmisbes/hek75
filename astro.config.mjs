import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hek75.com',
  redirects: {
    '/about': '/player',
    '/skills': '/player',
    '/games': '/projects',
    '/multiplayer': '/contact',
  },
});

