<template>
  <v-app class="h-screen overflow-hidden">
    <!-- Fixed Header Navigation Bar -->
    <v-app-bar class="position-fixed" elevation="1" color="surface" height="64">
      <v-container fluid class="d-flex align-center py-0 px-6">
        <v-avatar color="primary" size="36" class="mr-3">
          <v-icon icon="mdi-chart-timeline-variant" color="white" size="20" />
        </v-avatar>
        
        <div>
          <v-app-bar-title class="font-weight-bold text-h6 text-primary ma-0 line-height-1">
            StockTrack ERP
          </v-app-bar-title>
          <span class="text-caption text-grey">Enterprise Inventory Engine</span>
        </div>

        <v-spacer />

        <!-- Navigation Actions -->
        <v-btn
          to="/"
          variant="text"
          class="text-capitalize font-weight-bold mr-1"
          prepend-icon="mdi-view-dashboard-outline"
          color="primary"
        >
          Dashboard
        </v-btn>
        <v-btn
          to="/inventory"
          variant="text"
          class="text-capitalize font-weight-bold mr-3"
          prepend-icon="mdi-package-variant-closed"
          color="primary"
        >
          Inventory
        </v-btn>

        <v-divider vertical inset class="mx-2" />

        <!-- Theme Toggle Switcher -->
        <v-btn
          icon
          variant="text"
          color="primary"
          @click="toggleTheme"
          :title="theme.global.current.value.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main Content Container Locked to 100vh -->
    <v-main class="h-screen overflow-hidden">
      <v-container fluid class="pa-6 h-100 d-flex flex-column">
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
