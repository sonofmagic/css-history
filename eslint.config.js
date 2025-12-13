import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    pnpm: true,
    ignores: ['**/fixtures/**'],
  },
)
