import { supabase } from './supabase'

export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw new Error(error.message)
  return data
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data.user
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw new Error(error.message)
  return data.session
}
