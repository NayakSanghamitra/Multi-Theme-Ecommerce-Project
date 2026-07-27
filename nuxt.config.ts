import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  app: {
    baseURL: '/Multi-Theme-Ecommerce-Project/',
    buildAssetsDir: '/_nuxt/',
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
      failOnError: false
    }
  },

  ssr: false, // Disables server pre-rendering to prevent 404 asset drops on GitHub Pages

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
