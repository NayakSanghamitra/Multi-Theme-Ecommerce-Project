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

    <!-- Scroll-Constrained Table Container -->
    <!-- Pinned Scrollable Table Container -->
<v-card elevation="1" class="flex-grow-1 overflow-hidden d-flex flex-column min-h-0">
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="inventoryItems"
    :search="search"
    :items-per-page-options="pageOptions"
    fixed-header
    style="height: 100%; overflow-y: auto;"
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
      <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="openEditDialog(item)" />
      <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="deleteItem(item)" />
    </template>
  </v-data-table>
</v-card>

    <!-- Interactive Add / Edit Item Dialog Modal -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card class="pa-2">
        <v-card-title class="d-flex align-center justify-space-between text-h6 font-weight-bold">
          <span>{{ isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item' }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="closeDialog" />
        </v-card-title>
        <v-divider />

        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid" @submit.prevent="saveItem">
            <v-row dense class="mt-1">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formItem.sku"
                  label="SKU Code"
                  variant="outlined"
                  density="compact"
                  required
                  :rules="[v => !!v || 'SKU is required']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formItem.category"
                  :items="['Electronics', 'Peripherals', 'Furniture', 'Accessories']"
                  label="Category"
                  variant="outlined"
                  density="compact"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formItem.name"
                  label="Item Name"
                  variant="outlined"
                  density="compact"
                  required
                  :rules="[v => !!v || 'Name is required']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="formItem.quantity"
                  label="Stock Quantity"
                  type="number"
                  variant="outlined"
                  density="compact"
                  required
                  :rules="[v => v >= 0 || 'Quantity must be 0 or higher']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formItem.price"
                  label="Unit Price ($)"
                  variant="outlined"
                  density="compact"
                  required
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-6 pb-4 pt-0 justify-end">
          <v-btn variant="text" color="grey-darken-1" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" :disabled="!isFormValid" @click="saveItem">
            {{ isEditing ? 'Update Item' : 'Save Item' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const search = ref('')
const snackbar = ref(false)
const snackbarText = ref('')

// Pagination Settings
const itemsPerPage = ref(10)
const pageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: -1, title: 'All' }
]

// Dialog Modal States
const dialog = ref(false)
const isEditing = ref(false)
const isFormValid = ref(false)
const formRef = ref()

const formItem = reactive({
  sku: '',
  name: '',
  category: 'Electronics',
  quantity: 10,
  price: '$50.00',
  status: 'In Stock'
})

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
  Array.from({ length: 50 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    name: `Enterprise Product Unit ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : i % 3 === 0 ? 'Peripherals' : 'Furniture',
    quantity: Math.floor(Math.random() * 80),
    price: `$${(Math.random() * 200 + 15).toFixed(2)}`,
    status: i % 6 === 0 ? 'Low Stock' : i % 11 === 0 ? 'Out of Stock' : 'In Stock'
  }))
)

function openAddDialog() {
  isEditing.value = false
  Object.assign(formItem, {
    sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    category: 'Electronics',
    quantity: 1,
    price: '$25.00',
    status: 'In Stock'
  })
  dialog.value = true
}

function openEditDialog(item: any) {
  isEditing.value = true
  Object.assign(formItem, item)
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

function computeStatus(qty: number) {
  if (qty <= 0) return 'Out of Stock'
  if (qty <= 10) return 'Low Stock'
  return 'In Stock'
}

function saveItem() {
  formItem.status = computeStatus(formItem.quantity)
  
  if (isEditing.value) {
    const index = inventoryItems.value.findIndex(i => i.sku === formItem.sku)
    if (index !== -1) {
      inventoryItems.value[index] = { ...formItem }
      triggerToast(`Successfully updated ${formItem.sku}`)
    }
  } else {
    inventoryItems.value.unshift({ ...formItem })
    triggerToast(`Added new item ${formItem.sku} to inventory`)
  }
  closeDialog()
}

function deleteItem(item: any) {
  inventoryItems.value = inventoryItems.value.filter(i => i.sku !== item.sku)
  triggerToast(`Deleted ${item.sku} from inventory.`)
}

function triggerToast(text: string) {
  snackbarText.value = text
  snackbar.value = true
}

let barcodeBuffer = ''
let lastKeyTime = Date.now()

function handleKeyDown(event: KeyboardEvent) {
  if (dialog.value) return

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
