import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  type: 'product' | 'service'
  planId?: string
  planName?: string
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
}

// Helper functions
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return { totalItems, totalAmount }
}

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart_items')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { id, quantity = 1, ...itemData } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, quantity, ...itemData })
      }
      
      const totals = calculateTotals(state.items)
      state.totalItems = totals.totalItems
      state.totalAmount = totals.totalAmount
      
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      
      const totals = calculateTotals(state.items)
      state.totalItems = totals.totalItems
      state.totalAmount = totals.totalAmount
      
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
        
        const totals = calculateTotals(state.items)
        state.totalItems = totals.totalItems
        state.totalAmount = totals.totalAmount
        
        saveCartToStorage(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalAmount = 0
      
      saveCartToStorage([])
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    initializeCart: (state) => {
      const storedItems = loadCartFromStorage()
      state.items = storedItems
      
      const totals = calculateTotals(storedItems)
      state.totalItems = totals.totalItems
      state.totalAmount = totals.totalAmount
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  initializeCart,
} = cartSlice.actions

export default cartSlice.reducer 