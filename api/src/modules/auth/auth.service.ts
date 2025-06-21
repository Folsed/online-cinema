import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import auth from '../../config/auth';
import { LoginDto } from './dtos/login.dto';
import { Request } from 'express';
import { fromNodeHeaders } from 'better-auth/node';

@Injectable()
export class AuthService {
    constructor() {}

    async register(dto: RegisterDto) {
        return await auth.api.signUpEmail({
            body: {
                name: dto.username,
                email: dto.email,
                password: dto.password,
                acceptTerms: dto.acceptTerms,
            },
        });
    }

    async login(dto: LoginDto, req: Request) {
        return await auth.api.signInEmail({
            body: {
                email: dto.email,
                password: dto.password,
            },
            headers: fromNodeHeaders(req.headers),
        });
    }

    // async logout() {
    //     return await auth.api.signOut();
    // }
}
