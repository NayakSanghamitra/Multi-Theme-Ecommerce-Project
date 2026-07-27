<template>
  <v-app class="bg-grey-lighten-4">
    <!-- Top Header -->
    <v-app-bar color="primary" elevation="2">
      <v-container class="d-flex align-center py-0">
        <v-icon icon="mdi-chart-timeline-variant" size="28" class="mr-3" />
        <v-app-bar-title class="font-weight-bold text-h6">
          StockTrack Platform
        </v-app-bar-title>

        <v-spacer />

        <!-- Tab Navigation -->
        <v-btn to="/" variant="text" class="text-capitalize" prepend-icon="mdi-view-dashboard">
          Dashboard
        </v-btn>
        <v-btn to="/inventory" variant="text" class="text-capitalize ml-2" prepend-icon="mdi-package-variant font-weight-bold">
          Inventory
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main Page Content -->
    <v-main>
      <v-container class="py-8">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
