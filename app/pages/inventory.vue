<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <!-- Action Toolbar -->
    <div class="d-flex align-center justify-space-between mb-4 flex-shrink-0">
      <div>
        <div class="d-flex align-center gap-2">
          <h1 class="text-h5 font-weight-black tracking-tight">Stock Inventory Directory</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300/50">
            <v-icon icon="mdi-barcode-scan" size="14" />
            SCANNER LISTENER ACTIVE
          </span>
        </div>
        <p class="text-caption text-slate-500 dark:text-slate-400 ma-0">Manage SKU entries, auto-compute threshold status, and export reports.</p>
      </div>

      <div class="d-flex align-center gap-2">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search SKU, item, or category..."
          variant="outlined"
          density="compact"
          hide-details
          class="rounded-lg bg-white dark:bg-slate-900"
          style="width: 280px;"
          clearable
        />

        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-file-export-outline"
          @click="exportCSV"
          class="text-capitalize font-weight-bold rounded-lg"
        >
          Export CSV
        </v-btn>

        <v-btn color="primary" prepend-icon="mdi-plus" @click="openAddDialog" class="text-capitalize font-weight-bold rounded-lg shadow-sm">
          Add Item
        </v-btn>
      </div>
    </div>

    <!-- Data Table Container -->
    <v-card elevation="0" class="flex-grow-1 overflow-hidden d-flex flex-column rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="inventoryItems"
        :search="search"
        :items-per-page-options="pageOptions"
        fixed-header
        density="comfortable"
        class="flex-grow-1 overflow-auto border-0"
      >
        <template #item.sku="{ item }">
          <span class="font-mono font-weight-bold text-primary text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950/50 rounded-md border border-blue-200/50">
            {{ item.sku }}
          </span>
        </template>

        <template #item.price="{ item }">
          <span class="font-mono text-slate-700 dark:text-slate-300 font-weight-medium">
            ${{ Number(item.price).toFixed(2) }}
          </span>
        </template>

        <template #item.status="{ item }">
          <span :class="getStatusBadgeClass(item.quantity)" class="px-2.5 py-1 rounded-full text-xs font-semibold inline-block">
            {{ computeStatus(item.quantity) }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex align-center justify-center gap-1">
            <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="openEditDialog(item)" />
            <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="deleteItem(item)" />
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog Modal -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card class="pa-2 rounded-xl border border-slate-200 dark:border-slate-800">
        <v-card-title class="d-flex align-center justify-space-between text-h6 font-weight-bold">
          <span>{{ isEditing ? 'Edit Inventory Item' : 'Add New Inventory SKU' }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="closeDialog" />
        </v-card-title>
        <v-divider class="mb-2" />

        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid" @submit.prevent="saveItem">
            <v-row dense>
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
                  label="Item Description"
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
                  v-model.number="formItem.price"
                  label="Unit Price ($)"
                  type="number"
                  prefix="$"
                  variant="outlined"
                  density="compact"
                  required
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-6 pb-4 pt-0 justify-end">
          <v-btn variant="text" class="text-capitalize" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" variant="flat" class="text-capitalize font-weight-bold rounded-lg" :disabled="!isFormValid" @click="saveItem">
            {{ isEditing ? 'Update SKU' : 'Save SKU' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Scanner Notification Toast -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="slate-900" location="bottom right" class="rounded-xl">
      <div class="d-flex align-center gap-2">
        <v-icon icon="mdi-barcode-scan" color="emerald-400" />
        <span>{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const search = ref('')
const snackbar = ref(false)
const snackbarText = ref('')

const page = ref(1)
const itemsPerPage = ref(10)
const pageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' }
]

const dialog = ref(false)
const isEditing = ref(false)
const isFormValid = ref(false)
const formRef = ref()

const formItem = reactive({
  sku: '',
  name: '',
  category: 'Electronics',
  quantity: 10,
  price: 49.99
})

const headers = [
  { title: 'SKU Code', key: 'sku' },
  { title: 'Item Description', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Stock Qty', key: 'quantity', align: 'end' as const },
  { title: 'Unit Price', key: 'price', align: 'end' as const },
  { title: 'Status', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' as const }
]

const inventoryItems = ref(
  Array.from({ length: 40 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    name: `Enterprise Product Unit ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : i % 3 === 0 ? 'Peripherals' : 'Furniture',
    quantity: i === 3 ? 4 : i === 7 ? 0 : Math.floor(Math.random() * 80) + 12,
    price: Number((Math.random() * 150 + 20).toFixed(2))
  }))
)

function computeStatus(qty: number) {
  if (qty <= 0) return 'Out of Stock'
  if (qty <= 10) return 'Low Stock'
  return 'In Stock'
}

function getStatusBadgeClass(qty: number) {
  if (qty > 10) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
  if (qty > 0) return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
  return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
}

function openAddDialog() {
  isEditing.value = false
  Object.assign(formItem, {
    sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    category: 'Electronics',
    quantity: 1,
    price: 25.00
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

function saveItem() {
  if (isEditing.value) {
    const index = inventoryItems.value.findIndex(i => i.sku === formItem.sku)
    if (index !== -1) {
      inventoryItems.value[index] = { ...formItem }
      triggerToast(`Updated inventory item ${formItem.sku}`)
    }
  } else {
    inventoryItems.value.unshift({ ...formItem })
    triggerToast(`Added new item ${formItem.sku}`)
  }
  closeDialog()
}

function deleteItem(item: any) {
  inventoryItems.value = inventoryItems.value.filter(i => i.sku !== item.sku)
  triggerToast(`Removed ${item.sku} from directory.`)
}

function triggerToast(text: string) {
  snackbarText.value = text
  snackbar.value = true
}

// Hardware Barcode Buffer Input Detection Logic
let barcodeBuffer = ''
let lastKeyTime = Date.now()

function handleKeyDown(event: KeyboardEvent) {
  // Prevent capturing keydowns inside text input elements or dialog modals
  const activeEl = document.activeElement
  if (dialog.value || (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName))) {
    return
  }

  const currentTime = Date.now()
  if (currentTime - lastKeyTime > 100) {
    barcodeBuffer = ''
  }
  lastKeyTime = currentTime

  if (event.key === 'Enter') {
    if (barcodeBuffer.length > 3) {
      search.value = barcodeBuffer
      triggerToast(`Hardware Barcode Detected: ${barcodeBuffer}`)
      barcodeBuffer = ''
    }
  } else if (event.key.length === 1) {
    barcodeBuffer += event.key
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

function exportCSV() {
  const headers = 'SKU,Name,Category,Quantity,Price,Status\n'
  const rows = inventoryItems.value.map(i => 
    `"${i.sku}","${i.name.replace(/"/g, '""')}","${i.category}",${i.quantity},${i.price},"${computeStatus(i.quantity)}"`
  ).join('\n')

  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `StockTrack_Inventory_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  triggerToast('CSV inventory report generated.')
}
</script>
