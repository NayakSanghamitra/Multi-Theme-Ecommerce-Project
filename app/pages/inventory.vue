<script setup>
// Search filter
const search = ref('')

// Modal state for adding a new product SKU
const showAddModal = ref(false)
const newProduct = ref({
  sku: '',
  name: '',
  category: 'Electronics',
  stock: 10,
  maxStock: 50,
  price: ''
})

const categories = ['Electronics', 'Peripherals', 'Furniture', 'Accessories']

// Vuetify Data Table Headers
const headers = [
  { title: 'SKU ID', key: 'sku', align: 'start', sortable: true },
  { title: 'Product Name', key: 'name', align: 'start', sortable: true },
  { title: 'Category', key: 'category', align: 'start', sortable: true },
  { title: 'Stock Capacity', key: 'stock', align: 'start', sortable: true },
  { title: 'Price', key: 'price', align: 'end', sortable: true },
  { title: 'Status', key: 'status', align: 'center', sortable: true },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false }
]

// Table Data Items
const items = ref([
  { sku: 'SKU-1001', name: 'Logitech MX Master 3S', category: 'Peripherals', stock: 54, maxStock: 100, price: 99.99, status: 'In Stock' },
  { sku: 'SKU-1002', name: 'Dell UltraSharp 27" 4K Monitor', category: 'Electronics', stock: 12, maxStock: 50, price: 349.50, status: 'In Stock' },
  { sku: 'SKU-1003', name: 'Ergonomic Mesh Office Chair', category: 'Furniture', stock: 3, maxStock: 25, price: 189.00, status: 'Low Stock' },
  { sku: 'SKU-1004', name: 'Mechanical Keychron K2 RGB', category: 'Peripherals', stock: 0, maxStock: 40, price: 79.99, status: 'Out of Stock' },
  { sku: 'SKU-1005', name: 'USB-C Docking Station 11-in-1', category: 'Accessories', stock: 28, maxStock: 60, price: 129.00, status: 'In Stock' },
  { sku: 'SKU-1006', name: 'Anker PowerBank 24000mAh', category: 'Accessories', stock: 4, maxStock: 30, price: 149.99, status: 'Low Stock' }
])

// Add item handler
function handleAddProduct() {
  if (!newProduct.value.name || !newProduct.value.sku) return

  const status = newProduct.value.stock === 0 ? 'Out of Stock' : newProduct.value.stock < 10 ? 'Low Stock' : 'In Stock'

  items.value.unshift({
    sku: newProduct.value.sku,
    name: newProduct.value.name,
    category: newProduct.value.category,
    stock: Number(newProduct.value.stock),
    maxStock: Number(newProduct.value.maxStock),
    price: Number(newProduct.value.price),
    status: status
  })

  // Reset form
  newProduct.value = { sku: '', name: '', category: 'Electronics', stock: 10, maxStock: 50, price: '' }
  showAddModal.value = false
}

// Delete item handler
function deleteItem(sku) {
  items.value = items.value.filter(item => item.sku !== sku)
}
</script>

<template>
  <v-container fluid class="pa-0">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Inventory Management</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Track SKU stock capacity, pricing tiers, and reorder metrics.</p>
      </div>
      <v-btn color="primary" size="large" prepend-icon="mdi-plus" @click="showAddModal = true">
        Add Product SKU
      </v-btn>
    </div>

    <!-- Data Table Card -->
    <v-card elevation="1" class="rounded-lg">
      <v-card-title class="pa-4">
        <v-text-field
          v-model="search"
          density="compact"
          variant="outlined"
          label="Search SKU or Product Name..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
        />
      </v-card-title>

      <!-- Vuetify Data Table -->
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        hover
        class="elevation-0"
      >
        <!-- Custom Slot: SKU Code -->
        <template #item.sku="{ value }">
          <span class="font-weight-bold text-primary">{{ value }}</span>
        </template>

        <!-- Custom Slot: Category Badge -->
        <template #item.category="{ value }">
          <v-chip size="small" variant="outlined" color="primary">
            {{ value }}
          </v-chip>
        </template>

        <!-- Custom Slot: Stock Capacity Progress Bar -->
        <template #item.stock="{ item }">
          <div style="width: 140px;">
            <div class="d-flex justify-space-between text-caption mb-1">
              <span class="font-weight-bold">{{ item.stock }}</span>
              <span class="text-medium-emphasis">/ {{ item.maxStock }}</span>
            </div>
            <v-progress-linear
              :model-value="(item.stock / item.maxStock) * 100"
              :color="item.stock === 0 ? 'error' : item.stock < 10 ? 'warning' : 'success'"
              height="6"
              rounded
            />
          </div>
        </template>

        <!-- Custom Slot: Formatted Price -->
        <template #item.price="{ value }">
          <span class="font-weight-medium">${{ Number(value).toFixed(2) }}</span>
        </template>

        <!-- Custom Slot: Status Chip -->
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

        <!-- Custom Slot: Actions -->
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-delete-outline"
            size="small"
            variant="text"
            color="error"
            @click="deleteItem(item.sku)"
          />
        </template>
      </v-data-table>
    </v-card>

    <!-- Vuetify Add SKU Dialog Modal -->
    <v-dialog v-model="showAddModal" max-width="500">
      <v-card title="Add New Product SKU">
        <v-card-text>
          <v-row density="compact">
            <v-col cols="12">
              <v-text-field v-model="newProduct.sku" label="SKU Code (e.g. SKU-1007)" variant="outlined" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newProduct.name" label="Product Name" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-select v-model="newProduct.category" :items="categories" label="Category" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="newProduct.price" label="Price ($)" type="number" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="newProduct.stock" label="Initial Stock" type="number" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="newProduct.maxStock" label="Max Capacity" type="number" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showAddModal = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="handleAddProduct">Save Product</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
