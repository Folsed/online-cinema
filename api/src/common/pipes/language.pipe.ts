import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { LanguagesRepository } from 'src/modules/languages/languages.repository';

@Injectable()
export class LanguageExistsPipe implements PipeTransform<string> {
    constructor(private readonly languagesRepository: LanguagesRepository) {}

    async transform(lang: string): Promise<string> {
        const exists = await this.languagesRepository.exists(lang);
        if (!exists) {
            throw new BadRequestException(`Language "${lang}" is not supported`);
        }
        return lang;
    }
}
