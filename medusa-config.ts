import { loadEnv, defineConfig } from "@medusajs/framework/utils"
import path from "path"

loadEnv(process.env.NODE_ENV || "production", process.cwd())

const haveS3 =
  Boolean(process.env.S3_ACCESS_KEY_ID) &&
  Boolean(process.env.S3_SECRET_ACCESS_KEY) &&
  Boolean(process.env.S3_BUCKET_NAME)

const fileProviders = haveS3
  ? [
      {
        resolve: "@medusajs/file-s3",
        id: "s3",
        options: {
          access_key_id: process.env.S3_ACCESS_KEY_ID!,
          secret_access_key: process.env.S3_SECRET_ACCESS_KEY!,
          region: process.env.S3_REGION || "eu-central-1",
          bucket: process.env.S3_BUCKET_NAME!,
          endpoint: process.env.S3_ENDPOINT || "https://s3.amazonaws.com",
        },
      },
    ]
  : [
      {
        resolve: "@medusajs/medusa/file-local",
        id: "local",
        options: {
          uploadDir: path.join(process.cwd(), "static", "uploads"),
        },
      },
    ]

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: process.env.PG_SSL_CERT
      ? {
          connection: {
            ssl: {
              rejectUnauthorized: true,
              ca: process.env.PG_SSL_CERT.replace(/\\n/g, "\n"),
            },
          },
        }
      : undefined,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: fileProviders,
      },
    },
  ],
admin: {
  path: "/admin",
  //serve: true, // optional, tells Medusa to serve the files
},
})