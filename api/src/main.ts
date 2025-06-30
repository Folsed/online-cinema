import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    app.enableCors({
        origin: process.env.BASE_WEB_URL,
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 4000);
}

bootstrap().then(() => {});
