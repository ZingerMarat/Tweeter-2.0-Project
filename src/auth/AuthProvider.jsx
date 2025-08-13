import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient.js"

const AuthContext = createContext({ session: null, loading: true })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    //login listener
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  return <AuthContext value={{ session, loading }}>{children}</AuthContext>
}

export const useAuth = () => useContext(AuthContext)
