import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { getCurrentUser, signOut as supabaseSignOut } from '../services/auth'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  // Methods
  checkAuth: () => Promise<void>
  signOut: () => Promise<void>
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  checkAuth: async () => {
    try {
      set({ loading: true, error: null })
      const user = await getCurrentUser()
      set({ user })
    } catch (error) {
      set({ user: null })
      console.log('No active session')
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    try {
      set({ loading: true })
      await supabaseSignOut()
      set({ user: null })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  setError: (error) => set({ error }),
}))
