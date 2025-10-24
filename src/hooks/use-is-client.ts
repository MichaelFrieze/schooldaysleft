import { useSyncExternalStore } from 'react'

export function useIsClient() {
  return useSyncExternalStore(
    // No-op subscription
    () => () => {},
    // Client snapshot (after hydration)
    () => true,
    // Server snapshot (during SSR)
    () => false,
  )
}
