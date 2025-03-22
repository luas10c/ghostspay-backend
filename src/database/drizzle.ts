import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema.js'

export const database = drizzle(postgres(process.env.DATABASE_URL as string), {
  schema,
  logger: true
})
