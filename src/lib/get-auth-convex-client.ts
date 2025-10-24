import { ConvexHttpClient } from 'convex/browser'
import { auth } from '@clerk/tanstack-react-start/server'
import { tryCatch } from './try-catch'
import { env } from '@/env'

export const getAuthConvexClient = async (): Promise<ConvexHttpClient> => {
  const convex = new ConvexHttpClient(env.VITE_CONVEX_URL)
  const { isAuthenticated, getToken } = await auth()

  if (!isAuthenticated) {
    console.error('User not authenticated')
    throw new Error('User not authenticated')
  }

  const { data: token, error } = await tryCatch(
    getToken({ template: 'convex' }),
  )

  if (error) {
    console.error(error)
    throw new Error('Failed to get Clerk token')
  }

  if (token) {
    convex.setAuth(token)
  } else {
    console.error('Convex token not found')
    throw new Error('Convex token not found')
  }

  return convex
}
