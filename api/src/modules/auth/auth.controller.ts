import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import auth from '../../config/auth';
import { Request, Response } from 'express';
import { pickAuthHeaders } from '../../common/utils/http.util';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { ConfirmResetDto, RequestResetDto } from './dtos/password-reset.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(dto, res);
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(dto, res);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.logout(req, res);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('me')
    async me(@Req() req: Request) {
        return this.authService.profile(req);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('session')
    async session(@Req() req: Request) {
        return auth.api.getSession({ headers: pickAuthHeaders(req) });
    }

    @Post('password-reset/request')
    @HttpCode(200) //200 is always returned → we don't reveal whether the email exists
    async resetRequest(@Body() dto: RequestResetDto, @Res() res: Response) {
        return this.authService.passwordResetRequest(dto, res);
    }

    @Post('password-reset/confirm')
    async resetConfirm(
        @Body() dto: ConfirmResetDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.passwordResetConfirm(dto, res, req);
    }
}
