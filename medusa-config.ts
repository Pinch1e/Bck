import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

// Load SSL certificate from environment variable (for RDS)
const sslCert = process.env.PG_SSL_CERT?.replace(/\\n/g, "\n")

export default defineConfig({
  projectConfig: {
    // PostgreSQL (RDS) connection
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: {
      ssl: sslCert
        ? { rejectUnauthorized: true, ca: sslCert }
        : false,
    },

    // ✅ Add Redis connection
    redisUrl: process.env.REDIS_URL,

    // HTTP configuration
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },
})
