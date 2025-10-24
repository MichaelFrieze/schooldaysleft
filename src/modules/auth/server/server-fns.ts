import { createServerFn } from '@tanstack/react-start'
import { getClerkUserIdAndToken } from './data'
import { tryCatch } from '@/lib/try-catch'

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { data, error } = await tryCatch(getClerkUserIdAndToken())

    if (error) {
      console.error(error)
      throw error
    }

    const { userId, token } = data

    return {
      userId,
      token,
    }
  },
)
