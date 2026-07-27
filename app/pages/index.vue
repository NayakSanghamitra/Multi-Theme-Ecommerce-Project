<script setup>
import { ref, onMounted } from 'vue'

const isChartReady = ref(false)
let BarComponent = null
let DoughnutComponent = null

const barData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Stock Added',
      backgroundColor: '#1867C0',
      data: [400, 300, 550, 450, 700, 600]
    },
    {
      label: 'Stock Dispatched',
      backgroundColor: '#5C6BC0',
      data: [280, 200, 400, 380, 520, 480]
    }
  ]
})

const barOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const doughnutData = ref({
  labels: ['Electronics', 'Peripherals', 'Furniture', 'Accessories'],
  datasets: [
    {
      backgroundColor: ['#1867C0', '#5C6BC0', '#4CAF50', '#FB8C00'],
      data: [45, 25, 20, 10]
    }
  ]
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const metrics = [
  { title: 'Total Revenue', value: '$48,250', icon: 'mdi-currency-usd', color: 'success', change: '+12% vs last month' },
  { title: 'Total In Stock', value: '1,420 Items', icon: 'mdi-package-variant', color: 'primary', change: '94% optimal' },
  { title: 'Low Stock Alerts', value: '8 Items', icon: 'mdi-alert-circle', color: 'warning', change: 'Requires reorder' },
  { title: 'Pending Orders', value: '24 Deliveries', icon: 'mdi-truck-delivery', color: 'info', change: '5 arriving today' }
]

// Safely register and mount Chart.js only when running in browser
onMounted(async () => {
  const chartJs = await import('chart.js')
  const vueChartJs = await import('vue-chartjs')

  chartJs.Chart.register(
    chartJs.Title,
    chartJs.Tooltip,
    chartJs.Legend,
    chartJs.BarElement,
    chartJs.CategoryScale,
    chartJs.LinearScale,
    chartJs.ArcElement
  )

  BarComponent = vueChartJs.Bar
  DoughnutComponent = vueChartJs.Doughnut
  isChartReady.value = true
})
</script>

<template>
  <div>
    <!-- Banner Header -->
    <v-card class="pa-6 mb-6 rounded-lg elevation-1" color="surface">
      <div class="d-flex justify-space-between align-center">
        <div>
          <h1 class="text-h4 font-weight-bold text-grey-darken-3">Executive Operations Overview</h1>
          <p class="text-body-1 text-medium-emphasis mt-1">Real-time inventory velocity, stock turnover rates, and financial reports.</p>
        </div>
        <v-btn to="/inventory" color="primary" size="large" prepend-icon="mdi-package-variant" elevation="1">
          Open Inventory
        </v-btn>
      </div>
    </v-card>

    <!-- Metrics Cards Grid -->
    <v-row class="mb-6">
      <v-col v-for="metric in metrics" :key="metric.title" cols="12" sm="6" md="3">
        <v-card class="pa-4 rounded-lg elevation-1 h-100">
          <div class="d-flex justify-space-between align-start">
            <div>
              <p class="text-caption font-weight-bold text-medium-emphasis text-uppercase">{{ metric.title }}</p>
              <h2 class="text-h4 font-weight-bold mt-1 text-grey-darken-3">{{ metric.value }}</h2>
              <span class="text-caption font-weight-medium text-primary mt-2 d-inline-block">{{ metric.change }}</span>
            </div>
            <v-avatar :color="metric.color" variant="tonal" size="48" class="rounded-lg">
              <v-icon :icon="metric.icon" size="26" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart Visualizations -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-6 rounded-lg elevation-1 h-100">
          <h3 class="text-h6 font-weight-bold mb-4 text-grey-darken-3">Stock Movement & Inflow Velocity</h3>
          <div style="height: 320px;">
            <component :is="BarComponent" v-if="isChartReady" :data="barData" :options="barOptions" />
            <div v-else class="d-flex align-center justify-center h-100 text-medium-emphasis">
              <v-progress-circular indeterminate color="primary" class="mr-2" /> Loading Chart Data...
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-6 rounded-lg elevation-1 h-100">
          <h3 class="text-h6 font-weight-bold mb-4 text-grey-darken-3">Inventory Distribution</h3>
          <div style="height: 320px;">
            <component :is="DoughnutComponent" v-if="isChartReady" :data="doughnutData" :options="doughnutOptions" />
            <div v-else class="d-flex align-center justify-center h-100 text-medium-emphasis">
              <v-progress-circular indeterminate color="primary" class="mr-2" /> Loading Distribution...
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
