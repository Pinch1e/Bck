"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || "production", process.cwd());
exports.default = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
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
            jwtSecret: process.env.JWT_SECRET,
            cookieSecret: process.env.COOKIE_SECRET,
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTVELGtCQUFlLElBQUEsb0JBQVksRUFBQztJQUMxQixhQUFhLEVBQUU7UUFDYixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFhO1FBQ3RDLHFCQUFxQixFQUFFO1lBQ3JCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQzFCLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDakYsQ0FBQyxDQUFDLEtBQUs7U0FDVjtRQUNELFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7UUFDL0IsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUc7WUFDeEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUc7WUFDeEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUc7WUFDdEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFjO1NBQ3pDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQzNDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CO2dCQUNuRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksY0FBYztnQkFDL0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYzthQUNuQztTQUNGO0tBQ0Y7Q0FDRixDQUFDLENBQUEifQ==