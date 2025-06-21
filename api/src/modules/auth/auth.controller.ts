import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: AuthDto, @Req() req: Request) {
        const user = await this.authService.register(dto);

        return new Promise((resolve, reject) => {
            req.logIn(user, (error) => {
                if (error) return reject(error);
                const { password, ...userData } = user;
                resolve(userData);
            });
        });
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        const user = req.user as any;

        await new Promise<void>((resolve, reject) => {
            req.login(user, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        const { password, ...u } = user;
        return u;
    }

    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.logout((error) => {
            if (error) {
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ ok: false, message: 'Logout error' });
            }

            req.session.destroy((sessionError) => {
                if (sessionError) {
                    return res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ ok: false, message: 'Session destroy error' });
                }
                res.clearCookie('_sess.connected');
                return res.status(HttpStatus.OK).json({ success: true });
            });
        });
    }

    @UseGuards(AuthenticatedGuard)
    @Get('me')
    me(@Req() req: Request) {
        return req.user;
    }
}
