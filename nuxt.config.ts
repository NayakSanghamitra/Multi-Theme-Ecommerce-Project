import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  ssr: true, // Required for static HTML generation with nuxi generate

  app: {
    baseURL: '/Multi-Theme-Ecommerce-Project/',
    buildAssetsDir: '_nuxt', // Avoids leading slash issues in static routing
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/vuetify@3.7.0/dist/vuetify.min.css'
        }
      ]
    }
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true
    }
  },

  compatibilityDate: '2026-07-01',
  devtools: { enabled: true },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})
