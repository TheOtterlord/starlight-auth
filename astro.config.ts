import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import auth from 'auth-astro';

import node from '@astrojs/node';
import netlify from "@astrojs/netlify";
import vercel from '@astrojs/vercel/serverless';


// https://astro.build/config
export default defineConfig({
  integrations: [auth({
    injectEndpoints: false
  }), starlight({
    title: 'Starlight Auth',
    components: {
      Search: './src/components/starlight/Search.astro'
    },
    social: {
      github: 'https://github.com/TheOtterlord/starlight-auth'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  })],
  output: 'server',

  // Enable the correct adapter for your deployment (note: netlify is untested at the moment)
  // adapter: node({ mode: 'middleware' })
  // adapter: netlify()
  adapter: vercel()
});
