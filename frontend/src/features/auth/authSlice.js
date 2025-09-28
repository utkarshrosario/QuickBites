import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user ? user : null,
  isAuthenticated: !!user,
  isLoading: false,
  error: null,
}
// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password, })
      if (response.data.token) localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Register user
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, })
      if (response.data.token) localStorage.setItem('user', JSON.stringify(response.data))
      
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user')
})
// Check auth status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        return { ...user, ...response.data }
      } catch (error) {
        localStorage.removeItem('user')
        return thunkAPI.rejectWithValue('Token expired or invalid')
      }
    }
    return thunkAPI.rejectWithValue('No user found')
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.isLoading = false
        state.error = null
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})
export const { reset, clearError } = authSlice.actions
export default authSlice.reducer