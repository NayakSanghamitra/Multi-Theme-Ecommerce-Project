<template>
  <v-app class="bg-grey-lighten-4 h-screen overflow-hidden">
    <!-- Header stays pinned at top -->
    <v-app-bar class="position-fixed" elevation="1" color="surface" height="64">
      <v-container fluid class="d-flex align-center py-0 px-6">
        <v-icon icon="mdi-chart-timeline-variant" color="primary" size="28" class="mr-3" />
        <v-app-bar-title class="font-weight-bold text-h6 text-primary">
          StockTrack Platform
        </v-app-bar-title>

        <v-spacer />

        <v-btn
          to="/"
          variant="text"
          class="text-capitalize font-weight-bold"
          prepend-icon="mdi-view-dashboard"
          color="primary"
        >
          Dashboard
        </v-btn>
        <v-btn
          to="/inventory"
          variant="text"
          class="text-capitalize font-weight-bold ml-2"
          prepend-icon="mdi-package-variant-closed"
          color="primary"
        >
          Inventory
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main viewport wrapper locked to remaining height -->
    <v-main class="h-screen overflow-hidden">
      <v-container fluid class="pa-6 h-100 d-flex flex-column">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
