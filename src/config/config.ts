import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DATABASE_NAME = process.env.DATABASE_NAME || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.pkeicq1.mongodb.net/${MONGO_DATABASE_NAME}`;
const SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
const REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const ACCESS_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const ENVIRONMENT = process.env.NODE_ENV;
const SALT = process.env.SALT_ROUNDS;
export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    secret: {
        secret: SECRET_TOKEN,
        refresh_token: REFRESH_TOKEN,
        expires_in: ACCESS_EXPIRES_IN,
        refresh_expires_in: REFRESH_EXPIRES_IN
    },
    env: {
        node_env: ENVIRONMENT
    },
    bcrypt: {
        bycrypt_salt_rounds: SALT
    }
};
