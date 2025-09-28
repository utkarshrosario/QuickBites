import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], total: 0, itemCount: 0 }
const calculateTotals = (items) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, restaurantId } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ id, name, price, image, restaurantId, quantity: 1 })
      }
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.items = state.items.filter(item => item.id !== itemId)
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        const item = state.items.find(item => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      }
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    loadCart: (state, action) => {
      const cartData = action.payload
      state.items = cartData.items || []
      state.total = cartData.total || 0
      state.itemCount = cartData.itemCount || 0
    },
  },
})
export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions
export default cartSlice.reducer