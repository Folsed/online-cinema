import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import auth from '../../config/auth';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
import { forwardCookies, pickAuthHeaders } from '../../common/utils/http.util';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';
import { ConfirmResetDto, RequestResetDto } from './dtos/password-reset.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async register(dto: RegisterDto, @Res() res: Response) {
        const betterRes = await auth.api.signUpEmail({
            body: {
                name: dto.username,
                email: dto.email,
                password: dto.password,
                acceptTerms: dto.acceptTerms,
            },
            asResponse: true,
        });

        forwardCookies(betterRes, res);

        const payload = await betterRes.json();
        if (betterRes.ok && payload.user?.id) {
            try {
                await this.prismaService.userSettings.create({
                    data: { userId: payload.user.id },
                });
            } catch (error) {
                console.error('Cannot create user settings', error);
            }
        }

        res.status(betterRes.status).json(payload);
    }

    async login(dto: LoginDto, res: Response) {
        const betterRes = await auth.api.signInEmail({
            body: { email: dto.email, password: dto.password },
            asResponse: true,
        });
        forwardCookies(betterRes, res);
        res.status(betterRes.status).json(await betterRes.json());
    }

    async logout(req: Request, @Res() res: Response) {
        const betterRes = await auth.api.signOut({
            headers: pickAuthHeaders(req),
            asResponse: true,
        });
        forwardCookies(betterRes, res);
        res.status(200).json({ success: true });
    }

    async profile(req: Request) {
        const data = auth.api.getSession({ headers: pickAuthHeaders(req) });

        return plainToInstance(UserResponseDto, data, {
            excludeExtraneousValues: true,
        });
    }

    async passwordResetRequest(dto: RequestResetDto, res: Response) {
        try {
            await auth.api.requestPasswordReset({
                body: {
                    email: dto.email,
                    redirectTo: process.env.FRONTEND_URL + '/reset-password',
                },
            });
            res.status(200).json({ message: 'If the email exists, a reset link was sent.' });
        } catch (error) {
            res.status(400).json({ error: 'Something went wrong.' });
        }
    }

    async passwordResetConfirm(dto: ConfirmResetDto, res: Response, req: Request) {
        const betterReset = await auth.api.resetPassword({
            body: {
                token: dto.token,
                newPassword: dto.newPassword,
            },
            asResponse: true,
            returnHeaders: true,
        });

        forwardCookies(betterReset, res);

        if (!betterReset.ok) {
            throw new BadRequestException((await betterReset.json()).error?.message);
        }
        res.status(betterReset.status).json(await betterReset.json());
    }
}
