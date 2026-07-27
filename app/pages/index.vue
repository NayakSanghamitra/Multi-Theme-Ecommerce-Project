<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Header Section with Date Range Filter Controls -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <div class="d-flex align-center gap-2">
          <h1 class="text-h5 font-weight-bold">Executive Operations Overview</h1>
          <v-chip color="success" size="x-small" label class="font-weight-bold">LIVE METRICS</v-chip>
        </div>
        <p class="text-caption text-grey">Real-time inventory velocity, stock turnover rates, and financial telemetry.</p>
      </div>

      <div class="d-flex align-center gap-2">
        <v-btn-toggle v-model="selectedPeriod" mandatory density="compact" color="primary" class="mr-2">
          <v-btn value="7d" size="small">7D</v-btn>
          <v-btn value="30d" size="small">30D</v-btn>
          <v-btn value="90d" size="small">Q2</v-btn>
        </v-btn-toggle>

        <v-btn color="primary" prepend-icon="mdi-package-variant-closed" to="/inventory">
          Manage Inventory
        </v-btn>
      </div>
    </div>

    <!-- Metric Cards Grid -->
    <v-row class="mb-2 flex-shrink-0" dense>
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey">Total Revenue</div>
              <div class="text-h6 font-weight-bold">$48,250</div>
              <div class="text-caption text-success font-weight-bold d-flex align-center">
                <v-icon icon="mdi-arrow-up" size="14" class="mr-1" /> +12.4% vs last month
              </div>
            </div>
            <v-avatar color="green-lighten-5" rounded size="44">
              <v-icon icon="mdi-currency-usd" color="green-darken-2" size="24" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey">Total In Stock</div>
              <div class="text-h6 font-weight-bold">1,420 Items</div>
              <div class="text-caption text-info font-weight-bold d-flex align-center">
                <v-icon icon="mdi-check-circle-outline" size="14" class="mr-1" /> 94% optimal capacity
              </div>
            </div>
            <v-avatar color="blue-lighten-5" rounded size="44">
              <v-icon icon="mdi-archive-outline" color="blue-darken-2" size="24" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey">Low Stock Alerts</div>
              <div class="text-h6 font-weight-bold">8 Items</div>
              <div class="text-caption text-warning font-weight-bold d-flex align-center">
                <v-icon icon="mdi-alert-outline" size="14" class="mr-1" /> Requires immediate reorder
              </div>
            </div>
            <v-avatar color="amber-lighten-5" rounded size="44">
              <v-icon icon="mdi-alert-circle-outline" color="amber-darken-3" size="24" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-grey">Pending Orders</div>
              <div class="text-h6 font-weight-bold">24 Deliveries</div>
              <div class="text-caption text-primary font-weight-bold d-flex align-center">
                <v-icon icon="mdi-truck-fast-outline" size="14" class="mr-1" /> 5 arriving today
              </div>
            </div>
            <v-avatar color="light-blue-lighten-5" rounded size="44">
              <v-icon icon="mdi-truck-delivery-outline" color="light-blue-darken-2" size="24" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Visualization Dashboard Region -->
    <v-row class="flex-grow-1 overflow-hidden" dense>
      <v-col cols="12" md="8" class="h-100">
        <v-card elevation="1" class="pa-4 h-100 d-flex flex-column">
          <div class="d-flex justify-space-between align-center mb-2">
            <div>
              <div class="text-subtitle-1 font-weight-bold">Stock Movement & Inflow Velocity</div>
              <div class="text-caption text-grey">Monthly added stock vs dispatched order metrics</div>
            </div>
            <v-chip size="small" variant="outlined" color="primary">Monthly View</v-chip>
          </div>
          <div class="flex-grow-1 position-relative">
            <Bar :data="barChartData" :options="barOptions" />
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="h-100">
        <v-card elevation="1" class="pa-4 h-100 d-flex flex-column">
          <div class="text-subtitle-1 font-weight-bold mb-1">Inventory Category Distribution</div>
          <div class="text-caption text-grey mb-2">Proportional asset breakdown across departments</div>
          <div class="flex-grow-1 position-relative d-flex align-center justify-center">
            <Doughnut :data="doughnutChartData" :options="doughnutOptions" />
            <!-- Centered Statistic Inside Donut -->
            <div class="position-absolute text-center pointer-events-none">
              <div class="text-h5 font-weight-bold">1,420</div>
              <div class="text-caption text-grey">Total Units</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'

const selectedPeriod = ref('30d')

const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Stock Added',
      backgroundColor: '#1976D2',
      borderRadius: 6,
      borderSkipped: false,
      data: [400, 300, 550, 450, 700, 600]
    },
    {
      label: 'Stock Dispatched',
      backgroundColor: '#7E57C2',
      borderRadius: 6,
      borderSkipped: false,
      data: [280, 200, 400, 380, 520, 480]
    }
  ]
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const }
  }
}

const doughnutChartData = {
  labels: ['Electronics', 'Peripherals', 'Furniture', 'Accessories'],
  datasets: [
    {
      backgroundColor: ['#1976D2', '#7E57C2', '#26A69A', '#FFA726'],
      borderWidth: 2,
      data: [45, 25, 20, 10]
    }
  ]
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: { position: 'bottom' as const }
  }
}
</script>
