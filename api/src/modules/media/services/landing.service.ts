import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LandingRepository } from '../repositories/landing.repository';
import { plainToInstance } from 'class-transformer';
import { CarouselSlideDto } from '../dtos/carousel-slide.dto';

@Injectable()
export class LandingService {
    constructor(private readonly landingRepository: LandingRepository) {}

    async findHomepageCarouselSlides(langCode: string) {
        const slides = await this.landingRepository.takeAllSlides(langCode);

        return plainToInstance(CarouselSlideDto, slides, {
            excludeExtraneousValues: true,
        });
    }
}
