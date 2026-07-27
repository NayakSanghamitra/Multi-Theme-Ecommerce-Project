<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Top Action Bar -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <h1 class="text-h5 font-weight-bold text-grey-darken-3">Stock Inventory Directory</h1>
        <p class="text-caption text-grey-darken-1">Manage catalog entries, reorder thresholds, and active SKU statuses.</p>
      </div>
      <div class="d-flex gap-2">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search SKU or item..."
          variant="outlined"
          density="compact"
          hide-details
          class="mr-2"
          style="width: 260px;"
        />
        <v-btn color="primary" prepend-icon="mdi-plus">Add Item</v-btn>
      </div>
    </div>

    <!-- Scrollable Table Container -->
    <v-card elevation="1" class="flex-grow-1 overflow-hidden d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="inventoryItems"
        :search="search"
        fixed-header
        height="100%"
        class="flex-grow-1"
        density="comfortable"
      >
        <template #item.status="{ item }">
          <v-chip
            :color="item.status === 'In Stock' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'error'"
            size="small"
            variant="tonal"
            class="font-weight-bold"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" />
          <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'SKU Code', key: 'sku' },
  { title: 'Item Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Stock Qty', key: 'quantity' },
  { title: 'Unit Price', key: 'price' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

// Sample large dataset to demonstrate internal scrolling
const inventoryItems = ref(
  Array.from({ length: 40 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    name: `Enterprise Product Unit ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : 'Peripherals',
    quantity: Math.floor(Math.random() * 100),
    price: `$${(Math.random() * 200 + 10).toFixed(2)}`,
    status: i % 5 === 0 ? 'Low Stock' : i % 8 === 0 ? 'Out of Stock' : 'In Stock'
  }))
)
</script>
