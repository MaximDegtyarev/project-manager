import { create } from 'zustand'
import { getCurrentUser, signOut as supabaseSignOut } from '../services/auth'

export const useAuthStore = create((set) => ({
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
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  setError: (error) => set({ error }),
}))
