import { Injectable, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import auth from '../../config/auth';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { forwardCookies, pickAuthHeaders } from '../../common/utils/http.util';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class AuthService {
    constructor() {}

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

        const rawData = await betterRes.json();

        const outData = plainToInstance(UserResponseDto, rawData, {
            excludeExtraneousValues: true,
        });

        res.status(betterRes.status);
        return rawData;
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
}
