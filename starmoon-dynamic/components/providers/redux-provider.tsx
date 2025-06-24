"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { initializeAuth } from '@/lib/store/slices/authSlice'
import { initializeCart } from '@/lib/store/slices/cartSlice'

interface ReduxProviderProps {
  children: React.ReactNode
}

function StoreInitializer() {
  useEffect(() => {
    // Initialize auth and cart from localStorage when the app starts
    store.dispatch(initializeAuth())
    store.dispatch(initializeCart())
  }, [])

  return null
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <StoreInitializer />
      {children}
    </Provider>
  )
} 