import { loadEnv, defineConfig } from "@medusajs/framework/utils"
import fs from "fs"
import path from "path"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

const sslCert =
  process.env.PG_SSL_CERT?.replace(/\\n/g, "\n") ||
  fs.readFileSync(path.join(__dirname, "rds-ca-bundle.pem"), "utf8")

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: {
      ssl: {
        rejectUnauthorized: true,
        ca: sslCert,
      },
    },
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  // ✅ The port goes here at the root level
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
  },
})
