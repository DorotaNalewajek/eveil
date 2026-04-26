import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ClerkProvider, useUser, AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import SplashScreen     from './screens/SplashScreen'
import RegisterScreen   from './screens/RegisterScreen'
import LoginScreen      from './screens/LoginScreen'
import TransitionScreen from './screens/TransitionScreen'
import TimerScreen      from './screens/TimerScreen'
import ReflectionScreen from './screens/ReflectionScreen'
import DoneScreen       from './screens/DoneScreen'

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY")
}

if (import.meta.env.PROD && !CLERK_KEY.startsWith("pk_live_")) {
  throw new Error("Production Clerk publishable key must start with pk_live_")
}

console.log("Clerk key mode:", CLERK_KEY?.startsWith("pk_live_") ? "LIVE" : "NOT LIVE")

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded)   return null
  if (!isSignedIn) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"             element={<SplashScreen />} />
      <Route path="/register"     element={<RegisterScreen />} />
      <Route path="/login"        element={<LoginScreen />} />
      <Route path="/transition"   element={<TransitionScreen />} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
      <Route path="/timer"        element={<ProtectedRoute><TimerScreen /></ProtectedRoute>} />
      <Route path="/reflection"   element={<ProtectedRoute><ReflectionScreen /></ProtectedRoute>} />
      <Route path="/done"         element={<ProtectedRoute><DoneScreen /></ProtectedRoute>} />
      <Route path="*"             element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const content = <BrowserRouter><AppRoutes /></BrowserRouter>
  return <ClerkProvider publishableKey={CLERK_KEY}>{content}</ClerkProvider>
}
