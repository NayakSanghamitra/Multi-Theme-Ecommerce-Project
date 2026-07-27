<template>
  <v-app class="bg-grey-lighten-4">
    <!-- Navigation Header -->
    <v-app-bar elevation="1" color="surface" fixed>
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

    <!-- Margin top ensures header never covers title or content -->
    <v-main style="margin-top: 64px;">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
