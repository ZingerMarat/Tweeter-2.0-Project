import { Navigate, useLocation } from "react-router"
import { useAuth } from "./AuthProvider"

export default function RequireAuth({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
