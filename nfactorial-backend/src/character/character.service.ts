import { Character } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { rickAndMortyApi } from '@/shared/api/rickAndMorty.api';
import { CharacterQuery } from './character.query';
import { RedisService } from '@/frameworks/cache/redis/redis.service';
import { LoggingService } from '@/frameworks/logging/logging.service';
import axios from 'axios';

@Injectable()
export class CharacterService {
    constructor(
        private readonly redisService: RedisService,
        private readonly logger: LoggingService
    ) {}

    async getAll(query: CharacterQuery): Promise<WithPagination<Character>> {
        const { page, name, status, species, type, gender } = query;

        const params: Record<string, any> = {};
        
        if (page) params.page = page;
        if (name) params.name = name;
        if (status) params.status = status;
        if (species) params.species = species;
        if (type) params.type = type;
        if (gender) params.gender = gender;
        
        const cacheKey = `character:${JSON.stringify(params)}`;
        this.logger.log(`Attempting to get characters with params: ${JSON.stringify(params)}`, 'CharacterService');
        
        const cachedData = await this.redisService.get<WithPagination<Character>>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached characters data for key: ${cacheKey}`, 'CharacterService');
            return cachedData;
        }
        
        try {
            this.logger.log(`Cache miss, fetching characters from API with params: ${JSON.stringify(params)}`, 'CharacterService');
            const { data } = await rickAndMortyApi.get<WithPagination<Character>>('/character', {
                params
            });
            
            this.logger.log(`Successfully fetched ${data.results.length} characters, caching data`, 'CharacterService');
            await this.redisService.set(cacheKey, data, 3600);
            
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Characters not found with filters: ${JSON.stringify(params)}`, 'CharacterService');
                throw new NotFoundException('Characters not found with the provided filters');
            }
            this.logger.error(`Error fetching characters: ${error.message}`, error.stack, 'CharacterService');
            throw error;
        }
    }

    async getCharacter(id: string): Promise<Character | Character[]> {
        const cacheKey = `character:id:${id}`;
        this.logger.log(`Attempting to get character(s) with ID: ${id}`, 'CharacterService');
        
        const cachedData = await this.redisService.get<Character | Character[]>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached character data for ID: ${id}`, 'CharacterService');
            return cachedData;
        }
        
        try {
            if (id.split(',').length > 0) {
                this.logger.log(`Cache miss, fetching multiple characters with IDs: ${id}`, 'CharacterService');
                const { data } = await rickAndMortyApi.get<Character[]>(`/character/${id}`);
                this.logger.log(`Successfully fetched ${Array.isArray(data) ? data.length : 1} characters, caching data`, 'CharacterService');
                await this.redisService.set(cacheKey, data, 3600);
                return data;
            }
            
            this.logger.log(`Cache miss, fetching single character with ID: ${id}`, 'CharacterService');
            const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
            this.logger.log(`Successfully fetched character with ID: ${id}, caching data`, 'CharacterService');
            await this.redisService.set(cacheKey, data, 3600);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Character with ID ${id} not found`, 'CharacterService');
                throw new NotFoundException(`Character with ID ${id} not found`);
            }
            this.logger.error(`Error fetching character with ID ${id}: ${error.message}`, error.stack, 'CharacterService');
            throw error;
        }
    }
}