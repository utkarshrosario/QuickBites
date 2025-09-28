import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const initialState = {
  restaurants: [],
  currentRestaurant: null,
  isLoading: false,
  error: null,
  filters: {
    cuisine: '',
    rating: 0,
    deliveryTime: 0,
    priceRange: '',
  },
  searchQuery: '',
}
// Get all restaurants
export const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
  async (filters = {}, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`, {
        params: filters,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch restaurants'
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get restaurant by ID
export const getRestaurantById = createAsyncThunk(
  'restaurant/getRestaurantById',
  async (restaurantId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${restaurantId}`)
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch restaurant'
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Search restaurants
export const searchRestaurants = createAsyncThunk(
  'restaurant/searchRestaurants',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/restaurants/search`, {
        params: { q: query },
      })
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Search failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)
const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        cuisine: '',
        rating: 0,
        deliveryTime: 0,
        priceRange: '',
      }
      state.searchQuery = ''
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get restaurants
      .addCase(getRestaurants.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false
        state.restaurants = action.payload.data || action.payload || []
        state.error = null
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.restaurants = []
      })
      // Get restaurant by ID
      .addCase(getRestaurantById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentRestaurant = action.payload
        state.error = null
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.currentRestaurant = null
      })
      // Search restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false
        state.restaurants = action.payload.data || action.payload || []
        state.error = null
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.restaurants = []
      })
  },
})
export const { setFilters, setSearchQuery, clearFilters, clearError } = restaurantSlice.actions
export default restaurantSlice.reducer