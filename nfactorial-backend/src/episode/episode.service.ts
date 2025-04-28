import { Episode } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { rickAndMortyApi } from '@/shared/api/rickAndMorty.api';
import { EpisodeQuery } from './episode.query';
import { RedisService } from '@/frameworks/cache/redis/redis.service';
import { LoggingService } from '@/frameworks/logging/logging.service';
import axios from 'axios';

@Injectable()
export class EpisodeService {
    constructor(
        private readonly redisService: RedisService,
        private readonly logger: LoggingService
    ) {}

    async getAll(query: EpisodeQuery): Promise<WithPagination<Episode>> {
        const { page, name, episode } = query;

        const params: Record<string, any> = {};
        
        if (page) params.page = page;
        if (name) params.name = name;
        if (episode) params.episode = episode;
        
        const cacheKey = `episode:${JSON.stringify(params)}`;
        this.logger.log(`Attempting to get episodes with params: ${JSON.stringify(params)}`, 'EpisodeService');
        
        const cachedData = await this.redisService.get<WithPagination<Episode>>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached episodes data for key: ${cacheKey}`, 'EpisodeService');
            return cachedData;
        }
        
        try {
            this.logger.log(`Cache miss, fetching episodes from API with params: ${JSON.stringify(params)}`, 'EpisodeService');
            const { data } = await rickAndMortyApi.get<WithPagination<Episode>>('/episode', {
                params
            });
            
            this.logger.log(`Successfully fetched ${data.results.length} episodes, caching data`, 'EpisodeService');
            await this.redisService.set(cacheKey, data, 3600);
            
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Episodes not found with filters: ${JSON.stringify(params)}`, 'EpisodeService');
                throw new NotFoundException('Episodes not found with the provided filters');
            }
            this.logger.error(`Error fetching episodes: ${error.message}`, error.stack, 'EpisodeService');
            throw error;
        }
    }

    async getEpisode(id: string): Promise<Episode | Episode[]> {
        const cacheKey = `episode:id:${id}`;
        this.logger.log(`Attempting to get episode(s) with ID: ${id}`, 'EpisodeService');
        
        const cachedData = await this.redisService.get<Episode | Episode[]>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached episode data for ID: ${id}`, 'EpisodeService');
            return cachedData;
        }
        
        try {
            if (id.split(',').length > 0) {
                this.logger.log(`Cache miss, fetching multiple episodes with IDs: ${id}`, 'EpisodeService');
                const { data } = await rickAndMortyApi.get<Episode[]>(`/episode/${id}`);
                this.logger.log(`Successfully fetched ${Array.isArray(data) ? data.length : 1} episodes, caching data`, 'EpisodeService');
                await this.redisService.set(cacheKey, data, 3600);
                return data;
            }
            
            this.logger.log(`Cache miss, fetching single episode with ID: ${id}`, 'EpisodeService');
            const { data } = await rickAndMortyApi.get<Episode>(`/episode/${id}`);
            this.logger.log(`Successfully fetched episode with ID: ${id}, caching data`, 'EpisodeService');
            await this.redisService.set(cacheKey, data, 3600);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Episode with ID ${id} not found`, 'EpisodeService');
                throw new NotFoundException(`Episode with ID ${id} not found`);
            }
            this.logger.error(`Error fetching episode with ID ${id}: ${error.message}`, error.stack, 'EpisodeService');
            throw error;
        }
    }
}