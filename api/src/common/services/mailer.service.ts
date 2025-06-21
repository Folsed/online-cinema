import { createTransport, Transporter } from 'nodemailer';
import 'dotenv/config';

export const transporter: Transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
    },
});
