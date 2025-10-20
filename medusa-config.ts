import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const sslOptions = process.env.PG_SSL_CERT
  ? {
      rejectUnauthorized: true,
      ca: process.env.PG_SSL_CERT.replace(/\\n/g, "\n"),
    }
  : false

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseExtra: {
      ssl: sslOptions,
    },
    redisUrl: process.env.REDIS_URL || undefined,
  },
  http: {
    storeCors: process.env.STORE_CORS || "*",
    adminCors: process.env.ADMIN_CORS || "*",
  },
  workerMode: false,
  admin: {
    port: process.env.PORT || 9000, // <– move port here
  },
})
