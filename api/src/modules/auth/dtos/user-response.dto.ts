import { Expose, Transform, Type } from 'class-transformer';

export class UserShortDto {
    @Expose() id: string;
    @Expose() email: string;
    @Expose() name: string;
    @Expose() emailVerified: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
}

export class UserResponseDto {
    @Expose()
    @Transform(({ obj }) => obj.session.token)
    token: string;

    @Expose()
    @Type(() => UserShortDto)
    user: UserShortDto;
}
