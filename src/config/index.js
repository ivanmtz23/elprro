import dotenv from 'dotenv';

dotenv.config();

export const _config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080,
    mongoDbUser: process.env.MONGO_DB_USER,
    MongoDbPass: process.env.MONGO_DB_PASS,
    mongoDbName: process.env.MONGO_DB_NAME,
    MongoDbCluster: process.env.MONGO_DB_CLUSTER,
    jwtAuthSecret: process.env.JWT_AUTH_SECRET,
}