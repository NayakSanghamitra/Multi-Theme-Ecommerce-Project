<script setup>
// Pinia store and Vue composition APIs are automatically imported by Nuxt!
const search = ref('')
const selectedCategory = ref(null)

const categories = ['Electronics', 'Apparel', 'Home Goods', 'Office Supplies']

const summaryStats = ref([
  { title: 'Total Items', count: '1,248', icon: 'mdi-package-variant', color: 'primary' },
  { title: 'Low Stock Alerts', count: '12', icon: 'mdi-alert-circle-outline', color: 'warning' },
  { title: 'Out of Stock', count: '3', icon: 'mdi-close-circle-outline', color: 'error' }
])

const headers = [
  { title: 'SKU ID', key: 'sku' },
  { title: 'Item Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Stock Level', key: 'stock' },
  { title: 'Unit Price', key: 'price' },
  { title: 'Status', key: 'status' }
]

const items = ref([
  { sku: 'SKU-1001', name: 'Wireless Barcode Scanner', category: 'Electronics', stock: 45, price: '$89.99', status: 'In Stock' },
  { sku: 'SKU-1002', name: 'Thermal Label Printer', category: 'Electronics', stock: 8, price: '$199.50', status: 'Low Stock' },
  { sku: 'SKU-1003', name: 'Heavy Duty Packaging Tape', category: 'Office Supplies', stock: 0, price: '$4.99', status: 'Out of Stock' }
])
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Inventory Management</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Real-time tracking and stock operations</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" size="large" elevation="2">
        Add Stock Item
      </v-btn>
    </div>

    <!-- Summary Metrics -->
    <v-row class="mb-6">
      <v-col v-for="stat in summaryStats" :key="stat.title" cols="12" md="4">
        <v-card elevation="1" class="pa-4">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-caption text-medium-emphasis font-weight-bold">{{ stat.title }}</div>
              <div class="text-h4 font-weight-bold mt-1">{{ stat.count }}</div>
            </div>
            <v-avatar :color="stat.color" variant="tonal" size="48">
              <v-icon :icon="stat.icon" size="28" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters & Table Container -->
    <v-card elevation="1">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              density="compact"
              variant="outlined"
              label="Search by SKU or Name..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              density="compact"
              variant="outlined"
              label="Category"
              hide-details
              clearable
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
      >
        <template #item.status="{ value }">
          <v-chip
            :color="value === 'In Stock' ? 'success' : value === 'Low Stock' ? 'warning' : 'error'"
            size="small"
            variant="tonal"
            class="font-weight-medium"
          >
            {{ value }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
