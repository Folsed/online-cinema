import { IsEmail, IsString, MinLength } from 'class-validator';

export class RequestResetDto {
    @IsEmail()
    email: string;
}

export class ConfirmResetDto {
    @IsString()
    token: string;

    @MinLength(6)
    newPassword: string;
}
