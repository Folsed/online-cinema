import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dtos/auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async register(dto: AuthDto) {
        const { email, password } = dto;

        const hashPassword = await bcrypt.hash(password, 10);

        return this.prismaService.user.create({
            data: {
                email: email,
                password: hashPassword,
            },
        });
    }

    async validateUser(dto: AuthDto): Promise<Omit<AuthDto, 'password'>> {
        const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Incorrect email or password');

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Incorrect email or password');

        const { password, ...result } = user;
        return result;
    }
}
