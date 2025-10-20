import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

// Load SSL certificate from environment variable
const sslCert = process.env.PG_SSL_CERT?.replace(/\\n/g, "\n")

export default defineConfig({
  projectConfig: {
    // Your database connection URL from Railway or AWS RDS
    databaseUrl: process.env.DATABASE_URL!,

    // SSL configuration for PostgreSQL (required for AWS RDS)
    databaseDriverOptions: {
      ssl: sslCert
        ? {
            rejectUnauthorized: true,
            ca: sslCert,
          }
        : false,
    },

    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },
})
