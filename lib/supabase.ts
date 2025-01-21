import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Platform, AppState } from 'react-native'

const supabaseUrl = "https://wupahhhetxyijbknikff.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGFoaGhldHh5aWpia25pa2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODYzNDIsImV4cCI6MjA1MzA2MjM0Mn0.8eJrYbiZIuXZ4R1uydkZKlol6tRu5hV0Cg13vnruDaM"

const supabaseConfig = {
  auth: {
    storage: Platform.OS === 'web' 
      ? {
          getItem: (key: string) => {
            try {
              return Promise.resolve(localStorage.getItem(key))
            } catch {
              return Promise.resolve(null)
            }
          },
          setItem: (key: string, value: string) => {
            try {
              localStorage.setItem(key, value)
              return Promise.resolve()
            } catch {
              return Promise.resolve()
            }
          },
          removeItem: (key: string) => {
            try {
              localStorage.removeItem(key)
              return Promise.resolve()
            } catch {
              return Promise.resolve()
            }
          },
        }
      : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseConfig)

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})