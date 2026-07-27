import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  app: {
    baseURL: '/Multi-Theme-Ecommerce-Project/',
    head: {
      // Import Material Design Icons for Vuetify icons to display properly
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css'
        }
      ]
    }
  },

  compatibilityDate: '2026-07-01',
  devtools: { enabled: true },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/tailwind.css'
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light'
      }
    }
  }
})
