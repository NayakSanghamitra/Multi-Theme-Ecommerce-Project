<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Action Controls Toolbar -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <div class="d-flex align-center gap-2">
          <h1 class="text-h5 font-weight-bold">Stock Inventory Directory</h1>
          <v-chip color="info" size="x-small" label class="font-weight-bold">
            <v-icon icon="mdi-barcode-scan" class="mr-1" /> BARCODE LISTENER ACTIVE
          </v-chip>
        </div>
        <p class="text-caption text-grey">Manage SKU entries, threshold alerts, and inventory exports.</p>
      </div>

      <div class="d-flex align-center gap-2">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search SKU, item, or category..."
          variant="outlined"
          density="compact"
          hide-details
          class="mr-2"
          style="width: 280px;"
          clearable
        />

        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-file-export-outline"
          @click="exportCSV"
          class="mr-2"
        >
          Export CSV
        </v-btn>

        <v-btn color="primary" prepend-icon="mdi-plus" @click="openAddDialog">
          Add Item
        </v-btn>
      </div>
    </div>

    <!-- Pinned Scrollable Table Container -->
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
        <template #item.sku="{ item }">
          <span class="font-weight-mono font-weight-bold text-primary">{{ item.sku }}</span>
        </template>

        <template #item.status="{ item }">
          <v-chip
            :color="item.status === 'In Stock' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'error'"
            size="x-small"
            variant="tonal"
            class="font-weight-bold"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="editItem(item)" />
          <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="deleteItem(item)" />
        </template>
      </v-data-table>
    </v-card>

    <!-- Notification Toast Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="primary" location="bottom right">
      {{ snackbarText }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const search = ref('')
const snackbar = ref(false)
const snackbarText = ref('')

const headers = [
  { title: 'SKU Code', key: 'sku' },
  { title: 'Item Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Stock Qty', key: 'quantity' },
  { title: 'Unit Price', key: 'price' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const inventoryItems = ref(
  Array.from({ length: 45 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    name: `Enterprise Product Unit ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : i % 3 === 0 ? 'Peripherals' : 'Furniture',
    quantity: Math.floor(Math.random() * 80),
    price: `$${(Math.random() * 200 + 15).toFixed(2)}`,
    status: i % 6 === 0 ? 'Low Stock' : i % 11 === 0 ? 'Out of Stock' : 'In Stock'
  }))
)

// Barcode Scanning Hardware Listener Simulation
let barcodeBuffer = ''
let lastKeyTime = Date.now()

function handleKeyDown(event: KeyboardEvent) {
  const currentTime = Date.now()
  if (currentTime - lastKeyTime > 100) {
    barcodeBuffer = ''
  }
  lastKeyTime = currentTime

  if (event.key === 'Enter') {
    if (barcodeBuffer.length > 3) {
      search.value = barcodeBuffer
      triggerToast(`Barcode Scanned: ${barcodeBuffer}`)
      barcodeBuffer = ''
    }
  } else if (event.key.length === 1) {
    barcodeBuffer += event.key
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function triggerToast(text: string) {
  snackbarText.value = text
  snackbar.value = true
}

function openAddDialog() {
  triggerToast('Item creation modal opened.')
}

function editItem(item: any) {
  triggerToast(`Editing SKU: ${item.sku}`)
}

function deleteItem(item: any) {
  inventoryItems.value = inventoryItems.value.filter(i => i.sku !== item.sku)
  triggerToast(`Deleted ${item.sku} from inventory.`)
}

// Client-Side CSV Export Engine
function exportCSV() {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    ['SKU,Name,Category,Quantity,Price,Status']
      .concat(inventoryItems.value.map(e => `${e.sku},${e.name},${e.category},${e.quantity},${e.price},${e.status}`))
      .join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'StockTrack_Inventory_Report.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  triggerToast('Inventory CSV report generated and downloaded.')
}
</script>
