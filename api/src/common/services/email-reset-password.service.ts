import { transporter } from './mailer.service';

interface ISendResetPasswordArgs {
    user: { email: string };
    token: string;
}

export async function sendResetPasswordEmail({ user, token }: ISendResetPasswordArgs) {
    const resetLink = `${process.env.BASE_WEB_URL}/reset-password/confirmed?token=${encodeURIComponent(token)}`;
    await transporter.sendMail({
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
        to: user.email,
        subject: 'Скидання пароля',
        html: `<p>Привіт, ${user.email}!<br/>Щоб скинути пароль, перейдіть за цим посиланням:<br/><a href="${resetLink}">Клік тут, щоб відновити пароль</a></p>`,
    });
}
