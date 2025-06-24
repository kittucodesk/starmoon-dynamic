import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Authentication utilities
export interface StoredUserData {
  id: number;
  name: string;
  email: string;
  user_type: string;
}

export const authUtils = {
  // Store user data in localStorage
  storeUserData: (userData: StoredUserData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user_data", JSON.stringify(userData))
    }
  },

  // Get user data from localStorage
  getUserData: (): StoredUserData | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem("user_data")
      return userData ? JSON.parse(userData) : null
    }
    return null
  },

  // Store auth token
  storeToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("auth_token", token)
    }
  },

  // Get auth token
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("auth_token")
    }
    return null
  },

  // Clear all auth data
  clearAuthData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user_data")
      localStorage.removeItem("auth_token")
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authUtils.getUserData() !== null
  }
}
