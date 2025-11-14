// shared/schema.ts
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

// --- 1. Define all your tables (schema) first ---
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  imageUrl: text('image_url'),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  total: integer('total').notNull(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
})

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .unique()
    .notNull(),
})

export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id').references(() => cart.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
})

// Put all table schemas into a single object
export const schema = {
  users,
  products,
  orders,
  orderItems,
  cart,
  cartItems,
}

// --- 2. Conditionally create the database connection ---

// Declare db with its full type, but don't assign it yet
export let db: NeonHttpDatabase<typeof schema>

if (process.env.DATABASE_URL) {
  // If the URL exists, create the connection
  const sql = neon(process.env.DATABASE_URL)
  db = drizzle(sql, { schema })
} else {
  // If URL is missing, log a warning and set db to null
  console.warn(
    'DATABASE_URL is not set. Database connection not established. API routes will fail.',
  )
  // We cast to 'any' to satisfy TypeScript, but this will be null
  db = null as any
}