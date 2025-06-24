import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authUtils, type StoredUserData } from '@/lib/utils'

export interface AuthState {
  isAuthenticated: boolean
  user: StoredUserData | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: StoredUserData; token?: string }>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token || null
      state.error = null
      
      // Persist to localStorage
      authUtils.storeUserData(action.payload.user)
      if (action.payload.token) {
        authUtils.storeToken(action.payload.token)
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.loading = false
      state.error = null
      
      // Clear localStorage
      authUtils.clearAuthData()
    },
    updateUser: (state, action: PayloadAction<Partial<StoredUserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        authUtils.storeUserData(state.user)
      }
    },
    initializeAuth: (state) => {
      // Initialize auth state from localStorage
      console.log('🔄 Initializing auth from localStorage...')
      const userData = authUtils.getUserData()
      const token = authUtils.getToken()
      
      console.log('📊 Found in localStorage:', { userData, token })
      
      if (userData) {
        console.log('✅ User data found, logging in user:', userData)
        state.isAuthenticated = true
        state.user = userData
        state.token = token
      } else {
        console.log('❌ No user data found in localStorage')
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  initializeAuth,
  clearError,
} = authSlice.actions

export default authSlice.reducer 