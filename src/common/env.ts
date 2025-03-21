import { z } from 'zod'

const schema = z.object({
  DATABASE_URL: z.string(),

  PORT: z.coerce.number().default(7000),

  PRONTTUS_CLIENT_ID: z.string(),
  PRONTTUS_CLIENT_SECRET: z.string()
})

export const env = schema.parse(process.env)
