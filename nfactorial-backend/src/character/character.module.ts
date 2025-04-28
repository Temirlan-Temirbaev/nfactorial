import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { RedisModule } from '@/frameworks/cache/redis/redis.module';
import { LoggingModule } from '@/frameworks/logging/logging.module';

@Module({
    imports: [RedisModule, LoggingModule],
    controllers: [CharacterController],
    providers: [CharacterService],
})
export class CharacterModule {}