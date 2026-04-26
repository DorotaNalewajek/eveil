import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercelProductionBuild = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production'
const clerkPublishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY

if (isVercelProductionBuild && !clerkPublishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY for Vercel production build')
}

if (isVercelProductionBuild && !clerkPublishableKey.startsWith('pk_live_')) {
  throw new Error('Vercel production build requires VITE_CLERK_PUBLISHABLE_KEY to start with pk_live_')
}

export default defineConfig({
  plugins: [react()],
})
