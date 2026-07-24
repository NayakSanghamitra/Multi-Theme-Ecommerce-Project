<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">Stock Operations Hub</h1>
        <p class="text-sm font-medium text-slate-500 mt-1">Nuxt 4 & Vuetify 4 Inventory Management Engine</p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        elevation="2"
        class="text-none font-bold rounded-xl px-6 py-2 bg-indigo-600 hover:bg-indigo-700"
        @click="dialog = true"
      >
        Add Stock Item
      </v-btn>
    </div>

    <!-- Summary Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Items</p>
          <p class="text-3xl font-black text-slate-900 mt-1">{{ store.items.length }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          <v-icon icon="mdi-cube-outline" size="large" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Low Stock Alerts</p>
          <p class="text-3xl font-black text-amber-600 mt-1">
            {{ store.items.filter(i => i.status === 'Low Stock').length }}
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
          <v-icon icon="mdi-alert-circle-outline" size="large" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Out of Stock</p>
          <p class="text-3xl font-black text-rose-600 mt-1">
            {{ store.items.filter(i => i.status === 'Out of Stock').length }}
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
          <v-icon icon="mdi-close-circle-outline" size="large" />
        </div>
      </div>
    </div>

    <!-- Main Table -->
    <InventoryTable />

    <!-- Item Dialog Modal -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="rounded-2xl p-4">
        <v-card-title class="text-xl font-bold text-slate-900">Create Inventory Record</v-card-title>
        <v-card-text class="space-y-4 pt-4">
          <v-text-field v-model="form.id" label="SKU Identifier" placeholder="e.g. SKU-9090" variant="outlined" density="compact" />
          <v-text-field v-model="form.name" label="Item Name" variant="outlined" density="compact" />
          <v-select v-model="form.category" :items="['Electronics', 'Machinery', 'Hardware']" label="Category" variant="outlined" density="compact" />
          <div class="grid grid-cols-2 gap-4">
            <v-text-field v-model.number="form.stock" type="number" label="Stock Quantity" variant="outlined" density="compact" />
            <v-text-field v-model.number="form.price" type="number" label="Unit Price ($)" variant="outlined" density="compact" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end gap-2 pt-2">
          <v-btn variant="text" class="text-none font-semibold text-slate-500" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" class="text-none font-bold px-5 rounded-lg bg-indigo-600" @click="handleSave">Save Record</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from '~/stores/inventory'

const store = useInventoryStore()
const dialog = ref(false)

const form = reactive({
  id: '',
  name: '',
  category: 'Electronics',
  stock: 0,
  price: 0
})

function handleSave() {
  if (!form.id || !form.name) return
  store.addItem({ ...form })
  dialog.value = false
  
  // Reset form
  form.id = ''
  form.name = ''
  form.stock = 0
  form.price = 0
}
</script>
