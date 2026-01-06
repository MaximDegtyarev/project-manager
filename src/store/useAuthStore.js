import { create } from 'zustand'
import { supabase } from '../services/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signUp: async (email, password, fullName) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })
      if (error) throw error
      set({ user: data.user, loading: false })
      return data
    } catch (err) {
      set({ error: err.message, loading: false })
      throw err
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      set({ user: data.user, loading: false })
      return data
    } catch (err) {
      set({ error: err.message, loading: false })
      throw err
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      await supabase.auth.signOut()
      set({ user: null, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
      throw err
    }
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ user: session?.user || null })
    } catch (err) {
      set({ user: null })
    }
  }
}))
