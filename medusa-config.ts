import { loadEnv, defineConfig } from "@medusajs/framework/utils"
import fs from "fs"

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
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      port: process.env.PORT || 9000,
    },
  },
})
