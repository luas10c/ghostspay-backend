import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull().unique(),
  document: text('document').notNull().unique(),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').notNull()
})

export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  transactionId: text('transaction_id').notNull(),
  method: integer('method').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  url: text('url'),
  amount: integer('amount').notNull(),
  status: integer('status').notNull(),
  times: integer('times').notNull(),
  customerId: text('customer_id')
    .notNull()
    .references(() => customers.id),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').notNull()
})
