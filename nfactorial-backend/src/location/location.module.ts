import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { RedisModule } from '@/frameworks/cache/redis/redis.module';
import { LoggingModule } from '@/frameworks/logging/logging.module';

@Module({
    imports: [RedisModule, LoggingModule],
    controllers: [LocationController],
    providers: [LocationService],
})
export class LocationModule {}
