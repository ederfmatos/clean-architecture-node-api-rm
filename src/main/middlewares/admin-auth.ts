import { handleExpressMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories'

export const adminAuthMiddleware = handleExpressMiddleware(makeAuthMiddleware('ADMIN'))
