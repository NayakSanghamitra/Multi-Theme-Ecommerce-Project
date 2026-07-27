<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Header Section -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <h1 class="text-h5 font-weight-bold text-grey-darken-3">Executive Operations Overview</h1>
        <p class="text-caption text-grey-darken-1">Real-time inventory velocity, stock turnover rates, and financial reports.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-package-variant" to="/inventory">
        Open Inventory
      </v-btn>
    </div>

    <!-- Summary Metrics Grid -->
    <v-row class="mb-2 flex-shrink-0" dense>
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey-darken-1">Total Revenue</div>
              <div class="text-h6 font-weight-bold">$48,250</div>
              <div class="text-caption text-success font-weight-medium">+12% vs last month</div>
            </div>
            <v-avatar color="green-lighten-5" rounded size="42">
              <v-icon icon="mdi-currency-usd" color="green-darken-2" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey-darken-1">Total In Stock</div>
              <div class="text-h6 font-weight-bold">1,420 Items</div>
              <div class="text-caption text-info font-weight-medium">94% optimal</div>
            </div>
            <v-avatar color="blue-lighten-5" rounded size="42">
              <v-icon icon="mdi-package-variant-closed" color="blue-darken-2" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey-darken-1">Low Stock Alerts</div>
              <div class="text-h6 font-weight-bold">8 Items</div>
              <div class="text-caption text-warning font-weight-medium">Requires reorder</div>
            </div>
            <v-avatar color="orange-lighten-5" rounded size="42">
              <v-icon icon="mdi-alert-circle-outline" color="orange-darken-2" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey-darken-1">Pending Orders</div>
              <div class="text-h6 font-weight-bold">24 Deliveries</div>
              <div class="text-caption text-primary font-weight-medium">5 arriving today</div>
            </div>
            <v-avatar color="light-blue-lighten-5" rounded size="42">
              <v-icon icon="mdi-truck-delivery-outline" color="light-blue-darken-2" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section (Fills remaining height without triggering window scroll) -->
    <v-row class="flex-grow-1 overflow-hidden" dense>
      <v-col cols="12" md="8" class="h-100">
        <v-card elevation="1" class="pa-4 h-100 d-flex flex-column">
          <div class="text-subtitle-1 font-weight-bold mb-2">Stock Movement & Inflow Velocity</div>
          <div class="flex-grow-1 position-relative">
            <Bar :data="barChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="h-100">
        <v-card elevation="1" class="pa-4 h-100 d-flex flex-column">
          <div class="text-subtitle-1 font-weight-bold mb-2">Inventory Distribution</div>
          <div class="flex-grow-1 position-relative">
            <Doughnut :data="doughnutChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { Bar, Doughnut } from 'vue-chartjs'

const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'Stock Added', backgroundColor: '#1976D2', data: [400, 300, 550, 450, 700, 600] },
    { label: 'Stock Dispatched', backgroundColor: '#5C6BC0', data: [280, 200, 400, 380, 520, 480] }
  ]
}

const doughnutChartData = {
  labels: ['Electronics', 'Peripherals', 'Furniture', 'Accessories'],
  datasets: [
    { backgroundColor: ['#1976D2', '#5C6BC0', '#4CAF50', '#FF9800'], data: [45, 25, 20, 10] }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
