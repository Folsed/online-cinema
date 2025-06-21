import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cookieParser());

    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 4000);
}

bootstrap().then(() => {});
