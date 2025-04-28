import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { RedisModule } from '@/frameworks/cache/redis/redis.module';
import { LoggingModule } from '@/frameworks/logging/logging.module';

@Module({
    imports: [RedisModule, LoggingModule],
    controllers: [EpisodeController],
    providers: [EpisodeService],
})
export class EpisodeModule {}