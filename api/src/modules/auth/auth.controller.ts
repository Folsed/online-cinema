import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import auth from '../../config/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { Request, Response } from 'express';
import { forwardCookies, pickAuthHeaders } from '../../common/utils/http.util';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const r = await auth.api.signUpEmail({
            body: {
                name: dto.username,
                email: dto.email,
                password: dto.password,
                acceptTerms: dto.acceptTerms,
            },
            asResponse: true,
        });

        forwardCookies(r, res);
        res.status(r.status).json(await r.json());
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const r = await auth.api.signInEmail({
            body: { email: dto.email, password: dto.password },
            asResponse: true,
        });
        forwardCookies(r, res);
        res.status(r.status).json(await r.json());
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const r = await auth.api.signOut({
            headers: pickAuthHeaders(req),
            asResponse: true,
        });
        forwardCookies(r, res);
        res.status(200).json({ success: true });
    }

    @Get('profile')
    async session(@Req() req: Request) {
        return auth.api.getSession({ headers: pickAuthHeaders(req) });
    }
}
