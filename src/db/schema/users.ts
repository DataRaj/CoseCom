import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  age: integer("age"),
  firstName: text("first_name"),
  lastName: text("last_name"),
}, (table) => ({
  emailIdx: index("user_email_idx").on(table.email),
}));

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
}, (table) => ({
  userIdIdx: index("session_user_id_idx").on(table.userId),
  tokenIdx: index("session_token_idx").on(table.token),
}));

export const accountTable = pgTable("account", {
  id: text("id").primaryKey().notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  providerIdx: index("account_provider_idx").on(table.providerId),
}));

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey().notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  identifierIdx: index("verification_identifier_idx").on(table.identifier),
}));

export const twoFactorTable = pgTable("two_factor", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
}, (table) => ({
  userIdIdx: index("two_factor_user_id_idx").on(table.userId),
}));

export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull(), // Assuming `products` table exists
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index("cart_items_user_id_idx").on(table.userId),
}));

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  status: text("status").notNull(),
  total: integer("total").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index("orders_user_id_idx").on(table.userId),
}));

export const orderItemsTable = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  orderIdIdx: index("order_items_order_id_idx").on(table.orderId),
}));

export const addressTable = pgTable("address", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  mobile: text("mobile").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
