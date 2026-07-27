<script setup>
// Nuxt automatically imports refs, computed, and composables!

const metrics = ref([
  { title: 'Total SKU Stock', value: '1,248 Units', icon: 'mdi-package-variant-closed', color: 'primary', trend: '+4.2% this week' },
  { title: 'Daily Scan Activity', value: '342 Scans', icon: 'mdi-barcode-scan', color: 'success', trend: 'Sell & Return active' },
  { title: 'Low Stock Items', value: '12 SKU', icon: 'mdi-alert-outline', color: 'warning', trend: 'Requires reorder' },
  { title: 'Pending Billing', value: '$2,480.00', icon: 'mdi-cash-register', color: 'info', trend: '5 active sessions' }
])

const recentActivity = ref([
  { id: 'SCN-9021', type: 'SELL', sku: 'SKU-1001', item: 'Wireless Barcode Scanner', qty: 1, time: '2 mins ago', status: 'Completed' },
  { id: 'SCN-9020', type: 'RETURN', sku: 'SKU-1002', item: 'Thermal Label Printer', qty: 1, time: '14 mins ago', status: 'Refunded' },
  { id: 'SCN-9019', type: 'SELL', sku: 'SKU-1001', item: 'Wireless Barcode Scanner', qty: 2, time: '28 mins ago', status: 'Completed' }
])
</script>

<template>
  <div>
    <!-- Hero / Welcome Banner -->
    <v-card color="surface" elevation="1" class="pa-6 mb-6 rounded-lg border">
      <div class="d-flex flex-wrap justify-space-between align-center ga-4">
        <div>
          <h1 class="text-h4 font-weight-bold text-primary">Operations Control Center</h1>
          <p class="text-subtitle-1 text-medium-emphasis mt-1">
            Real-time tracking, barcode scanning engine, and store financials.
          </p>
        </div>
        <div class="d-flex ga-3">
          <v-btn to="/inventory" color="primary" prepend-icon="mdi-package-variant" elevation="1">
            Manage Inventory
          </v-btn>
          <v-btn to="/analytics" variant="outlined" color="primary" prepend-icon="mdi-chart-box">
            View Analytics
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- Key ERP Metrics Grid -->
    <v-row class="mb-6">
      <v-col v-for="metric in metrics" :key="metric.title" cols="12" sm="6" md="3">
        <v-card elevation="1" class="pa-4 h-100">
          <div class="d-flex justify-space-between align-start">
            <div>
              <span class="text-caption font-weight-bold text-medium-emphasis text-uppercase">{{ metric.title }}</span>
              <h2 class="text-h5 font-weight-bold mt-1">{{ metric.value }}</h2>
              <span class="text-caption text-success font-weight-medium">{{ metric.trend }}</span>
            </div>
            <v-avatar :color="metric.color" variant="tonal" size="44">
              <v-icon :icon="metric.icon" size="24" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Barcode Activity & Quick Operations -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="1" title="Recent Scan Transactions">
          <v-divider />
          <v-table density="comfortable">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Mode</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="act in recentActivity" :key="act.id">
                <td class="font-weight-medium">{{ act.id }}</td>
                <td>
                  <v-chip
                    :color="act.type === 'SELL' ? 'success' : 'warning'"
                    size="x-small"
                    variant="tonal"
                    class="font-weight-bold"
                  >
                    {{ act.type }}
                  </v-chip>
                </td>
                <td>{{ act.item }}</td>
                <td>{{ act.qty }}</td>
                <td class="text-medium-emphasis">{{ act.time }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="1" title="Quick Actions">
          <v-card-text class="d-flex flex-column ga-3">
            <v-btn to="/inventory" block variant="tonal" color="primary" prepend-icon="mdi-barcode-scan">
              Launch Barcode Scanner
            </v-btn>
            <v-btn to="/inventory" block variant="tonal" color="secondary" prepend-icon="mdi-file-document-plus">
              Generate Stock Report
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
