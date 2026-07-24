<template>
  <v-card elevation="1" class="rounded-2xl border border-slate-200/80 bg-white overflow-hidden">
    <!-- Header Controls -->
    <div class="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="flex items-center gap-3 w-full md:w-auto">
        <v-text-field
          v-model="store.searchFilter"
          placeholder="Search by SKU or Name..."
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="outlined"
          hide-details
          class="w-full md:w-72 bg-white rounded-lg"
        />
        <v-select
          v-model="store.categoryFilter"
          :items="['Electronics', 'Machinery', 'Hardware']"
          placeholder="Category"
          density="compact"
          variant="outlined"
          hide-details
          clearable
          class="w-full md:w-48 bg-white rounded-lg"
        />
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto justify-end">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-full">
          Total: {{ store.filteredItems.length }}
        </span>
      </div>
    </div>

    <!-- Vuetify 4 Data Table -->
    <v-data-table
      :headers="headers"
      :items="store.filteredItems"
      hover
      elevation="0"
    >
      <template #item.id="{ item }">
        <span class="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
          {{ item.id }}
        </span>
      </template>

      <template #item.name="{ item }">
        <span class="font-semibold text-slate-800 text-sm">
          {{ item.name }}
        </span>
      </template>

      <template #item.price="{ item }">
        <span class="font-medium text-slate-700">
          ${{ item.price.toFixed(2) }}
        </span>
      </template>

      <template #item.status="{ item }">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          :class="{
            'bg-emerald-100 text-emerald-800 border border-emerald-300': item.status === 'In Stock',
            'bg-amber-100 text-amber-800 border border-amber-300': item.status === 'Low Stock',
            'bg-rose-100 text-rose-800 border border-rose-300': item.status === 'Out of Stock'
          }"
        >
          <span
            class="w-1.5 h-1.5 rounded-full"
            :class="{
              'bg-emerald-500': item.status === 'In Stock',
              'bg-amber-500': item.status === 'Low Stock',
              'bg-rose-500': item.status === 'Out of Stock'
            }"
          />
          {{ item.status }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { useInventoryStore } from '~/stores/inventory'

const store = useInventoryStore()

const headers = [
  { title: 'SKU ID', key: 'id' },
  { title: 'Item Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Stock Level', key: 'stock', align: 'end' as const },
  { title: 'Unit Price', key: 'price', align: 'end' as const },
  { title: 'Status', key: 'status', align: 'center' as const }
]
</script>
