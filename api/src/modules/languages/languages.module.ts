import { Module } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository';

@Module({
    controllers: [],
    providers: [LanguagesRepository],
})
export class LanguagesModule {}
