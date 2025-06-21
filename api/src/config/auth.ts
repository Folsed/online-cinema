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
        additionalFields: {
            acceptTerms: {
                fieldName: 'accept_terms',
                type: 'boolean',
                required: true,
                defaultValue: false,
            },
        },
    },
});

export default auth;
