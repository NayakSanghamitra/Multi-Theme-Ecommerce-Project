<script setup>
const search = ref('')

const headers = [
  { title: 'SKU Code', key: 'sku' },
  { title: 'Product Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'In Stock', key: 'stock' },
  { title: 'Unit Price', key: 'price' },
  { title: 'Status', key: 'status' }
]

const items = ref([
  { sku: 'SKU-1001', name: 'Logitech MX Master 3S', category: 'Electronics', stock: 54, price: '$99.99', status: 'In Stock' },
  { sku: 'SKU-1002', name: 'Dell UltraSharp 27" Monitor', category: 'Electronics', stock: 12, price: '$349.50', status: 'In Stock' },
  { sku: 'SKU-1003', name: 'Ergonomic Desk Chair', category: 'Furniture', stock: 3, price: '$189.00', status: 'Low Stock' },
  { sku: 'SKU-1004', name: 'Mechanical Keyboard RGB', category: 'Electronics', stock: 0, price: '$79.99', status: 'Out of Stock' }
])
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold text-grey-darken-3">Inventory Catalogue</h1>
        <p class="text-body-1 text-medium-emphasis">Manage SKU lists, stock counts, and prices.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" size="large" elevation="1">
        Add Product
      </v-btn>
    </div>

    <v-card class="rounded-lg elevation-1">
      <v-card-text>
        <v-text-field
          v-model="search"
          density="comfortable"
          variant="outlined"
          label="Search by Product Name or SKU..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
        />
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
            class="font-weight-bold"
          >
            {{ value }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
