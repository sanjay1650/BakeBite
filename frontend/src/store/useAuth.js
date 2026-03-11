import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuth = create((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },
  refreshSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      set({ user: session.user })
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      set({ profile })
    }
    set({ loading: false })
  }
}))
