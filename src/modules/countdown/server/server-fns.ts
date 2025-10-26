import { createServerFn } from '@tanstack/react-start'
import { api } from 'convex/_generated/api'
import { getAuthConvexClient } from '@/lib/get-auth-convex-client'
import { tryCatch } from '@/lib/try-catch'

export const getAllCountdowns = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { data: convex, error: convexClientError } = await tryCatch(
      getAuthConvexClient(),
    )

    if (convexClientError) {
      console.error({ convexClientError })
      throw new Error('Failed to get authenticated convex client')
    }

    const { data: countdowns, error: countdownsError } = await tryCatch(
      convex.query(api.countdowns.getAll),
    )

    if (countdownsError) {
      console.error({ countdownsError })
      throw new Error('Failed to get all countdowns')
    }

    if (!countdowns) {
      throw new Error('No countdowns found, likely not authenticated')
    }

    const serializedCountdowns = countdowns.map((c) => ({
      ...c,
      _id: String(c._id),
    }))

    return serializedCountdowns
  },
)
