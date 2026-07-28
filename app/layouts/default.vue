<template>
  <v-app class="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <!-- Header Navigation Bar -->
    <v-app-bar 
      elevation="0" 
      color="surface" 
      height="64" 
      class="border-b border-slate-200/80 dark:border-slate-800/80 px-2 backdrop-blur-md"
    >
      <v-container fluid class="d-flex align-center py-0 px-4 max-w-7xl">
        <!-- Brand Identity -->
        <div class="d-flex align-center gap-3">
          <v-avatar color="primary" size="40" class="rounded-xl shadow-md shadow-blue-500/20">
            <v-icon icon="mdi-chart-timeline-variant" color="white" size="22" />
          </v-avatar>
          <div>
            <div class="d-flex align-center gap-2">
              <span class="text-h6 font-weight-black tracking-tight text-slate-900 dark:text-white line-height-1">
                StockTrack <span class="text-primary font-weight-medium">ERP</span>
              </span>
              <v-chip color="primary" size="x-small" variant="flat" class="font-weight-bold text-uppercase">v2.4 Pro</v-chip>
            </div>
            <p class="text-caption text-slate-500 dark:text-slate-400 ma-0 font-weight-medium">Enterprise Inventory & Telemetry Engine</p>
          </div>
        </div>

        <v-spacer />

        <!-- Navigation Actions -->
        <div class="d-flex align-center gap-1">
          <v-btn
            to="/"
            variant="text"
            active-class="bg-blue-50 text-primary dark:bg-slate-800"
            class="text-capitalize font-weight-bold rounded-lg"
            prepend-icon="mdi-view-dashboard-outline"
          >
            Dashboard
          </v-btn>
          <v-btn
            to="/inventory"
            variant="text"
            active-class="bg-blue-50 text-primary dark:bg-slate-800"
            class="text-capitalize font-weight-bold rounded-lg"
            prepend-icon="mdi-package-variant-closed"
          >
            Inventory
          </v-btn>

          <v-divider vertical inset class="mx-3 border-slate-200 dark:border-slate-800" />

          <!-- Theme Switcher -->
          <v-btn
            icon
            variant="tonal"
            size="small"
            color="primary"
            class="rounded-lg"
            @click="toggleTheme"
            :title="theme.global.current.value.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" size="18" />
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content Container Locked to Screen Height -->
    <v-main class="h-screen overflow-hidden pt-16">
      <v-container fluid class="pa-6 h-100 d-flex flex-column max-w-7xl">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
