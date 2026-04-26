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
      <Route path="/"             element={<SplashScreen />} />
      <Route path="/register"     element={<RegisterScreen />} />
      <Route path="/login"        element={<LoginScreen />} />
      <Route path="/transition"   element={<TransitionScreen />} />
      <Route path="/sso-callback" element={CLERK_KEY ? <AuthenticateWithRedirectCallback /> : <Navigate to="/" replace />} />
      <Route path="/timer"        element={CLERK_KEY ? <ProtectedRoute><TimerScreen /></ProtectedRoute> : <TimerScreen />} />
      <Route path="/reflection"   element={CLERK_KEY ? <ProtectedRoute><ReflectionScreen /></ProtectedRoute> : <ReflectionScreen />} />
      <Route path="/done"         element={CLERK_KEY ? <ProtectedRoute><DoneScreen /></ProtectedRoute> : <DoneScreen />} />
      <Route path="*"             element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const content = <BrowserRouter><AppRoutes /></BrowserRouter>
  if (!CLERK_KEY) return content
  return <ClerkProvider publishableKey={CLERK_KEY}>{content}</ClerkProvider>
}
