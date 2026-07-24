import { defineStore } from 'pinia'

export interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  price: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([
    { id: 'SKU-1001', name: 'Industrial Sensor X1', category: 'Electronics', stock: 145, price: 299.99, status: 'In Stock' },
    { id: 'SKU-1002', name: 'Hydraulic Valve B2', category: 'Machinery', stock: 8, price: 1250.00, status: 'Low Stock' },
    { id: 'SKU-1003', name: 'Control Board V4', category: 'Electronics', stock: 0, price: 450.50, status: 'Out of Stock' },
    { id: 'SKU-1004', name: 'Heavy Duty Bearing', category: 'Hardware', stock: 320, price: 45.00, status: 'In Stock' },
    { id: 'SKU-1005', name: 'Pneumatic Cylinder', category: 'Machinery', stock: 4, price: 890.00, status: 'Low Stock' }
  ])

  const searchFilter = ref('')
  const categoryFilter = ref<string | null>(null)

  const filteredItems = computed(() => {
    return items.value.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
                            item.id.toLowerCase().includes(searchFilter.value.toLowerCase())
      const matchesCategory = categoryFilter.value ? item.category === categoryFilter.value : true
      return matchesSearch && matchesCategory
    })
  })

  function addItem(newItem: Omit<InventoryItem, 'status'>) {
    const status = newItem.stock === 0 ? 'Out of Stock' : newItem.stock < 10 ? 'Low Stock' : 'In Stock'
    items.value.unshift({ ...newItem, status })
  }

  return {
    items,
    searchFilter,
    categoryFilter,
    filteredItems,
    addItem
  }
})
