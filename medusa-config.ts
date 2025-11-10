import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: {
      ssl: process.env.PG_SSL_CERT
        ? { rejectUnauthorized: true, ca: process.env.PG_SSL_CERT.replace(/\\n/g, "\n") }
        : false,
    },
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: {
    file: {
      resolve: "@medusajs/file-s3",
      options: {
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION || "eu-central-1",
        bucket: process.env.S3_BUCKET_NAME,
      },
    },
  },
})
