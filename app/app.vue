<template>
  <v-app class="bg-slate-100 min-h-screen">
    <!-- Vuetify 4 Navigation Drawer -->
    <v-navigation-drawer permanent class="border-r border-slate-200">
      <div class="p-6 border-b border-slate-100 flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-200">
          E
        </div>
        <div>
          <h1 class="font-extrabold text-slate-900 text-base leading-tight">ERP Nexus 4</h1>
          <p class="text-xs font-medium text-slate-400">Nuxt 4 + Vuetify 4 Hub</p>
        </div>
      </div>

      <div class="p-4 space-y-1">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" active class="rounded-lg text-indigo-600 font-semibold" />
        <v-list-item prepend-icon="mdi-package-variant-closed" title="Inventory" value="inventory" class="rounded-lg text-slate-600" />
        <v-list-item prepend-icon="mdi-chart-line" title="Analytics" value="analytics" class="rounded-lg text-slate-600" />
      </div>
    </v-navigation-drawer>

    <!-- Nuxt 4 Page View Area -->
    <v-main class="p-8">
      <NuxtPage />
    </v-main>
  </v-app>
</template>
