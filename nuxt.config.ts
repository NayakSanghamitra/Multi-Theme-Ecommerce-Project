import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // Nuxt 4 compatibility mode
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2026-07-01',
  devtools: { enabled: true },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  // In Nuxt 4, assets are inside the app/ directory
  css: ['~/assets/css/tailwind.css'],

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
