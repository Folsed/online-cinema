import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { sendResetPasswordEmail } from '../common/services/email-reset-password.service';

const auth = betterAuth({
    database: new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
    trustedOrigins: [String(process.env.BASE_WEB_URL)],
    emailAndPassword: {
        enabled: true,
        sendResetPassword: sendResetPasswordEmail,
    },
    user: {
        modelName: 'users',
        fields: {
            emailVerified: 'email_verified',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        additionalFields: {
            acceptTerms: {
                fieldName: 'accept_terms',
                type: 'boolean',
                required: true,
                defaultValue: false,
            },
        },
    },
    session: {
        modelName: 'sessions',
        fields: {
            userId: 'user_id',
            expiresAt: 'expires_at',
            ipAddress: 'ip_address',
            userAgent: 'user_agent',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
    account: {
        modelName: 'accounts',
        fields: {
            userId: 'user_id',
            accountId: 'account_id',
            providerId: 'provider_id',
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            accessTokenExpiresAt: 'access_token_expires_at',
            refreshTokenExpiresAt: 'refresh_token_expires_at',
            idToken: 'id_token',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
    verification: {
        modelName: 'verifications',
        fields: {
            expiresAt: 'expires_at',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
});

export default auth;
