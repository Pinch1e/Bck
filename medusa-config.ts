import { loadEnv, defineConfig } from "@medusajs/framework/utils"
import fs from "fs"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

// Format SSL cert from env variable (Railway safe)
const sslCert = process.env.PG_SSL_CERT?.replace(/\\n/g, "\n")

module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || "https://yourstorefront.com",
      adminCors: process.env.ADMIN_CORS || "https://youradminpanel.com",
      authCors: process.env.AUTH_CORS || "/http:\/\/.+/",
      jwtSecret: process.env.JWT_SECRET, // ❗ Must be securely generated in Railway
      cookieSecret: process.env.COOKIE_SECRET, // ❗ Must be securely generated in Railway
    },

    // ✅ Proper database configuration (per docs)
    database: {
      clientUrl: process.env.DATABASE_URL, // example: postgres://user:pass@host:5432/dbname
      connection: {
        ssl: sslCert
          ? {
              rejectUnauthorized: true,
              ca: sslCert,
            }
          : false,
      },
    },
  },
})
