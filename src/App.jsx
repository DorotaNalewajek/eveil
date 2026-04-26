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

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded)   return null
  if (!isSignedIn) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<SplashScreen />} />
      <Route path="/register"    element={<RegisterScreen />} />
      <Route path="/login"       element={<LoginScreen />} />
      <Route path="/transition"  element={<TransitionScreen />} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
      <Route path="/timer"       element={<ProtectedRoute><TimerScreen /></ProtectedRoute>} />
      <Route path="/reflection"  element={<ProtectedRoute><ReflectionScreen /></ProtectedRoute>} />
      <Route path="/done"        element={<ProtectedRoute><DoneScreen /></ProtectedRoute>} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  )
}
