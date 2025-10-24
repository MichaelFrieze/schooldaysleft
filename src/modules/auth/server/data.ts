import { auth } from '@clerk/tanstack-react-start/server'

export const getClerkUserIdAndToken = async () => {
  const { isAuthenticated, userId, getToken } = await auth()
  const token = await getToken({ template: 'convex' })

  return {
    userId,
    isAuthenticated,
    token,
  }
}
