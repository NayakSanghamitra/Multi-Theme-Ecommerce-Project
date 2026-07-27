<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const barData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Stock Inflow',
      backgroundColor: '#6366F1',
      borderRadius: 6,
      data: [420, 310, 580, 490, 710, 630]
    },
    {
      label: 'Stock Outflow',
      backgroundColor: '#38BDF8',
      borderRadius: 6,
      data: [290, 210, 430, 390, 510, 470]
    }
  ]
})

const barOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: '#94A3B8' } } },
  scales: {
    x: { ticks: { color: '#94A3B8' }, grid: { color: '#334155' } },
    y: { ticks: { color: '#94A3B8' }, grid: { color: '#334155' } }
  }
})

const doughnutData = ref({
  labels: ['Electronics', 'Peripherals', 'Furniture', 'Accessories'],
  datasets: [
    {
      backgroundColor: ['#6366F1', '#38BDF8', '#10B981', '#F59E0B'],
      borderWidth: 0,
      data: [45, 25, 20, 10]
    }
  ]
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { color: '#94A3B8', padding: 16 } } }
})

const metrics = [
  { title: 'Total Revenue', value: '$48,250', icon: 'mdi-currency-usd', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', trend: '+12.4% vs last month' },
  { title: 'Total Active SKU', value: '1,420 Units', icon: 'mdi-package-variant', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', trend: '94% optimal levels' },
  { title: 'Low Stock Alerts', value: '8 Items', icon: 'mdi-alert-circle-outline', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', trend: 'Requires reorder' },
  { title: 'Pending Shipments', value: '24 Orders', icon: 'mdi-truck-delivery-outline', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20', trend: '5 arriving today' }
]
</script>

<template>
  <div class="space-y-8">
    <!-- Header Banner -->
    <div class="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white">Executive Control Hub</h2>
        <p class="text-slate-400 text-sm mt-1">Real-time inventory velocity, stock turnover rates, and store performance.</p>
      </div>
      <button class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center space-x-2">
        <span class="mdi mdi-download"></span>
        <span>Export Metrics</span>
      </button>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="metric in metrics" :key="metric.title" class="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/60 transition group">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ metric.title }}</p>
            <p class="text-2xl font-bold text-white mt-1">{{ metric.value }}</p>
            <span class="text-xs font-medium text-slate-400 mt-2 block">{{ metric.trend }}</span>
          </div>
          <div :class="`p-3 rounded-xl border ${metric.color}`">
            <span :class="`mdi ${metric.icon} text-xl`"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center space-x-2">
          <span class="mdi mdi-chart-bar text-indigo-400"></span>
          <span>Stock Movement & Volume</span>
        </h3>
        <div class="h-72">
          <ClientOnly>
            <Bar :data="barData" :options="barOptions" />
          </ClientOnly>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center space-x-2">
          <span class="mdi mdi-chart-pie text-indigo-400"></span>
          <span>Category Breakdown</span>
        </h3>
        <div class="h-72">
          <ClientOnly>
            <Doughnut :data="doughnutData" :options="doughnutOptions" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
