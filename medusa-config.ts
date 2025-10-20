import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "production", process.cwd());

// Use the Railway SSL cert environment variable
const sslCert = process.env.PG_SSL_CERT?.replace(/\\n/g, "\n");

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    databaseDriverOptions: {
      ssl: sslCert
        ? { rejectUnauthorized: true, ca: sslCert } // ✅ use SSL cert from env
        : false, // fallback if env var is missing
    },
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
});
