// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.guneymagazadekorasyon.com', // TODO: gerçek domain (src/config/site.ts ile aynı olmalı)
  trailingSlash: 'always',

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: ['400 800'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Arama sonuçları ve 404 dizine eklenmez
      filter: (page) => !/\/(arama|404)\/?$/.test(new URL(page).pathname),
    }),
  ],
});
