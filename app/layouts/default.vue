<template>
  <v-app-bar elevation="1" color="surface">
    <v-app-bar-title class="font-weight-bold text-primary">
      <v-icon icon="mdi-cube-outline" class="mr-2" />
      Stock Operations Hub
    </v-app-bar-title>
    
    <v-spacer />

    <v-chip color="primary" variant="flat" class="mr-4">
      ERP Nexus 4
    </v-chip>
  </v-app-bar>

  <v-navigation-drawer permanent width="240">
    <v-list density="compact" nav class="mt-2">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        to="/"
        color="primary"
      />
      <v-list-item
        prepend-icon="mdi-package-variant-closed"
        title="Inventory"
        value="inventory"
        to="/inventory"
        color="primary"
      />
      <v-list-item
        prepend-icon="mdi-chart-bar"
        title="Analytics"
        value="analytics"
        to="/analytics"
        color="primary"
      />
    </v-list>
  </v-navigation-drawer>

  <v-main class="bg-grey-lighten-4">
    <v-container fluid class="pa-6">
      <slot />
    </v-container>
  </v-main>
</template>
