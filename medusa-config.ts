import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

// Make sure the cert is properly parsed
const sslCert = process.env.PG_SSL_CERT?.replace(/\\n/g, "\n").trim()

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: {
      ssl: sslCert
        ? {
            rejectUnauthorized: true, // must be true for RDS
            ca: sslCert,
          }
        : undefined, // fallback to no SSL if not provided
    },
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
})
