import { ConfigService } from '@nestjs/config';

export enum Env {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export const isProd = (configService: ConfigService): boolean =>
    configService.getOrThrow('NODE_ENV') === 'production';

export const isDev = (configService: ConfigService): boolean =>
    configService.getOrThrow('NODE_ENV') === 'development';

export const isTest = (configService: ConfigService): boolean =>
    configService.getOrThrow('NODE_ENV') === 'test';
