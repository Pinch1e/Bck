"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const path_1 = __importDefault(require("path"));
(0, utils_1.loadEnv)(process.env.NODE_ENV || "production", process.cwd());
const haveS3 = Boolean(process.env.S3_ACCESS_KEY_ID) &&
    Boolean(process.env.S3_SECRET_ACCESS_KEY) &&
    Boolean(process.env.S3_BUCKET_NAME);
const fileProviders = haveS3
    ? [
        {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
                access_key_id: process.env.S3_ACCESS_KEY_ID,
                secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
                region: process.env.S3_REGION || "eu-central-1",
                bucket: process.env.S3_BUCKET_NAME,
                endpoint: process.env.S3_ENDPOINT || "https://s3.amazonaws.com",
            },
        },
    ]
    : [
        {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
                uploadDir: path_1.default.join(process.cwd(), "static", "uploads"),
            },
        },
    ];
exports.default = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
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
            jwtSecret: process.env.JWT_SECRET,
            cookieSecret: process.env.COOKIE_SECRET,
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBaUU7QUFDakUsZ0RBQXVCO0FBRXZCLElBQUEsZUFBTyxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUU1RCxNQUFNLE1BQU0sR0FDVixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztJQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUVyQyxNQUFNLGFBQWEsR0FBRyxNQUFNO0lBQzFCLENBQUMsQ0FBQztRQUNFO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixFQUFFLEVBQUUsSUFBSTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBaUI7Z0JBQzVDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQXFCO2dCQUNwRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksY0FBYztnQkFDL0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBZTtnQkFDbkMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLDBCQUEwQjthQUNoRTtTQUNGO0tBQ0Y7SUFDSCxDQUFDLENBQUM7UUFDRTtZQUNFLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsRUFBRSxFQUFFLE9BQU87WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDekQ7U0FDRjtLQUNGLENBQUE7QUFFTCxrQkFBZSxJQUFBLG9CQUFZLEVBQUM7SUFDMUIsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBYTtRQUN0QyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7WUFDNUMsQ0FBQyxDQUFDO2dCQUNFLFVBQVUsRUFBRTtvQkFDVixHQUFHLEVBQUU7d0JBQ0gsa0JBQWtCLEVBQUUsSUFBSTt3QkFDeEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO3FCQUNsRDtpQkFDRjthQUNGO1lBQ0gsQ0FBQyxDQUFDLFNBQVM7UUFDYixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO1FBQy9CLElBQUksRUFBRTtZQUNKLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHO1lBQ3hDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHO1lBQ3hDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHO1lBQ3RDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVc7WUFDbEMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYztTQUN6QztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1A7WUFDRSxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsYUFBYTthQUN6QjtTQUNGO0tBQ0Y7SUFDSCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLDJEQUEyRDtLQUM1RDtDQUNBLENBQUMsQ0FBQSJ9