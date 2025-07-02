import { Global, Module } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository';

@Global()
@Module({
    controllers: [],
    providers: [LanguagesRepository],
})
export class LanguagesModule {}
