<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Header Section -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <div class="d-flex align-center gap-2">
          <h1 class="text-h5 font-weight-black tracking-tight">Executive Operations Overview</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/50">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE TELEMETRY
          </span>
        </div>
        <p class="text-caption text-slate-500 dark:text-slate-400 ma-0">Real-time inventory velocity, stock turnover rates, and financial performance metrics.</p>
      </div>

      <div class="d-flex align-center gap-2">
        <v-btn-toggle v-model="selectedPeriod" mandatory density="compact" color="primary" class="rounded-lg border border-slate-200 dark:border-slate-800">
          <v-btn value="7d" size="small" class="text-caption font-weight-bold">7D</v-btn>
          <v-btn value="30d" size="small" class="text-caption font-weight-bold">30D</v-btn>
          <v-btn value="90d" size="small" class="text-caption font-weight-bold">Q2</v-btn>
        </v-btn-toggle>

        <v-btn color="primary" prepend-icon="mdi-package-variant-closed" to="/inventory" class="text-capitalize font-weight-bold shadow-sm rounded-lg">
          Manage Stock
        </v-btn>
      </div>
    </div>

    <!-- Metric Cards Grid -->
    <v-row class="mb-3 flex-shrink-0" dense>
      <v-col v-for="metric in metrics" :key="metric.title" cols="12" sm="6" md="3">
        <v-card elevation="0" class="pa-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:border-slate-300">
          <div class="d-flex justify-space-between align-start">
            <div>
              <span class="text-uppercase text-[11px] font-weight-bold tracking-wider text-slate-400 d-block mb-1">{{ metric.title }}</span>
              <div class="text-h5 font-weight-black tracking-tight text-slate-900 dark:text-white">{{ metric.value }}</div>
              <div class="text-caption font-weight-bold d-flex align-center mt-1" :class="metric.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
                <v-icon :icon="metric.trendUp ? 'mdi-trending-up' : 'mdi-alert-circle-outline'" size="16" class="mr-1" />
                {{ metric.subtext }}
              </div>
            </div>
            <v-avatar :color="metric.color" variant="tonal" size="44" class="rounded-xl">
              <v-icon :icon="metric.icon" size="22" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Visualization Region -->
    <v-row class="flex-grow-1 overflow-hidden" dense>
      <!-- Main Bar / Area Chart Card -->
      <v-col cols="12" md="8" class="h-100 pb-1">
        <v-card elevation="0" class="pa-4 h-100 d-flex flex-column rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div class="d-flex justify-space-between align-center mb-3">
            <div>
              <div class="text-subtitle-1 font-weight-bold">Stock Movement & Inflow Velocity</div>
              <div class="text-caption text-slate-500">Monthly added stock vs dispatched order metrics</div>
            </div>
            <v-chip size="small" color="primary" variant="tonal" class="font-weight-bold">Monthly Snapshot</v-chip>
          </div>
          <div class="flex-grow-1 position-relative w-100">
            <Bar :data="barChartData" :options="barOptions" />
          </div>
        </v-card>
      </v-col>

      <!-- Category Breakdown Donut Card -->
      <v-col cols="12" md="4" class="h-100 pb-1">
        <v-card elevation="0" class="pa-4 h-100 d-flex flex-column rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div class="text-subtitle-1 font-weight-bold">Category Distribution</div>
          <div class="text-caption text-slate-500 mb-2">Proportional asset breakdown across departments</div>
          <div class="flex-grow-1 position-relative d-flex align-center justify-center">
            <Doughnut :data="doughnutChartData" :options="doughnutOptions" />
            <div class="position-absolute text-center pointer-events-none">
              <div class="text-h5 font-weight-black text-slate-900 dark:text-white">1,420</div>
              <div class="text-caption text-slate-400 font-weight-medium">Total Units</div>
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
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const selectedPeriod = ref('30d')

const metrics = ref([
  { title: 'Total Revenue', value: '$48,250', subtext: '+12.4% vs last month', trendUp: true, icon: 'mdi-currency-usd', color: 'success' },
  { title: 'Total In Stock', value: '1,420 Items', subtext: '94% optimal capacity', trendUp: true, icon: 'mdi-package-variant', color: 'info' },
  { title: 'Low Stock Alerts', value: '8 Items', subtext: 'Requires reorder', trendUp: false, icon: 'mdi-alert-outline', color: 'warning' },
  { title: 'Pending Orders', value: '24 Shipments', subtext: '5 arriving today', trendUp: true, icon: 'mdi-truck-fast-outline', color: 'primary' }
])

const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Stock Added',
      backgroundColor: '#2563EB',
      borderRadius: 6,
      data: [400, 300, 550, 450, 700, 600]
    },
    {
      label: 'Stock Dispatched',
      backgroundColor: '#8B5CF6',
      borderRadius: 6,
      data: [280, 200, 400, 380, 520, 480]
    }
  ]
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' as const } }
}

const doughnutChartData = {
  labels: ['Electronics', 'Peripherals', 'Furniture', 'Accessories'],
  datasets: [
    {
      backgroundColor: ['#2563EB', '#8B5CF6', '#10B981', '#F59E0B'],
      borderWidth: 0,
      data: [45, 25, 20, 10]
    }
  ]
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '76%',
  plugins: { legend: { position: 'bottom' as const } }
}
</script>
