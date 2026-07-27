// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  app: {
    baseURL: '/Multi-Theme-Ecommerce-Project/',
    // Renames _nuxt/ to assets/ so GitHub Pages doesn't block the folder
    buildAssetsDir: 'assets', 
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

  build: {
    transpile: ['chart.js', 'vue-chartjs']
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
    ],
    optimizeDeps: {
      include: [
        'vuetify',
        'chart.js',
        'vue-chartjs'
      ]
    }
  }
})
