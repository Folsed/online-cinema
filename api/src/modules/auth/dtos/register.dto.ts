import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MaxLength(20)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    acceptTerms: boolean;
}
