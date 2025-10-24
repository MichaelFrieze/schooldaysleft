//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: [
      'convex/_generated/',
      'eslint.config.js',
      'routeTree.gen.ts',
      'prettier.config.js',
      'pnpm-lock.yaml',
      '.nitro/',
      '.output/',
      '.tanstack/',
      '.vinxi/',
      '.vercel/',
    ],
  },
  ...tanstackConfig,
  reactHooks.configs.flat.recommended,
]
