import { defineConfig } from 'drizzle-kit'

const config = defineConfig({
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  migrations: {
    prefix: 'timestamp',
    schema: 'public',
    table: '__migrations__'
  },
  schema: 'src/database/schema.ts',
  out: 'src/database/migrations'
})

export default config
