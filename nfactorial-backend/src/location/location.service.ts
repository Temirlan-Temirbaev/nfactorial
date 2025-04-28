import { Location } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { rickAndMortyApi } from '@/shared/api/rickAndMorty.api';
import { LocationQuery } from './location.query';
import { RedisService } from '@/frameworks/cache/redis/redis.service';
import { LoggingService } from '@/frameworks/logging/logging.service';
import axios from 'axios';

@Injectable()
export class LocationService {
    constructor(
        private readonly redisService: RedisService,
        private readonly logger: LoggingService
    ) {}

    async getAll(query: LocationQuery): Promise<WithPagination<Location>> {
        const { page, name, type, dimension } = query;

        const params: Record<string, any> = {};
        
        if (page) params.page = page;
        if (name) params.name = name;
        if (type) params.type = type;
        if (dimension) params.dimension = dimension;
        
        const cacheKey = `location:${JSON.stringify(params)}`;
        this.logger.log(`Attempting to get locations with params: ${JSON.stringify(params)}`, 'LocationService');
        
        const cachedData = await this.redisService.get<WithPagination<Location>>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached locations data for key: ${cacheKey}`, 'LocationService');
            return cachedData;
        }
        
        try {
            this.logger.log(`Cache miss, fetching locations from API with params: ${JSON.stringify(params)}`, 'LocationService');
            const { data } = await rickAndMortyApi.get<WithPagination<Location>>('/location', {
                params
            });
            
            this.logger.log(`Successfully fetched ${data.results.length} locations, caching data`, 'LocationService');
            await this.redisService.set(cacheKey, data, 3600);
            
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Locations not found with filters: ${JSON.stringify(params)}`, 'LocationService');
                throw new NotFoundException('Locations not found with the provided filters');
            }
            this.logger.error(`Error fetching locations: ${error.message}`, error.stack, 'LocationService');
            throw error;
        }
    }

    async getLocation(id: string): Promise<Location | Location[]> {
        const cacheKey = `location:id:${id}`;
        this.logger.log(`Attempting to get location(s) with ID: ${id}`, 'LocationService');
        
        const cachedData = await this.redisService.get<Location | Location[]>(cacheKey);
        if (cachedData) {
            this.logger.log(`Returning cached location data for ID: ${id}`, 'LocationService');
            return cachedData;
        }
        
        try {
            if (id.split(',').length > 0) {
                this.logger.log(`Cache miss, fetching multiple locations with IDs: ${id}`, 'LocationService');
                const { data } = await rickAndMortyApi.get<Location[]>(`/location/${id}`);
                this.logger.log(`Successfully fetched ${Array.isArray(data) ? data.length : 1} locations, caching data`, 'LocationService');
                await this.redisService.set(cacheKey, data, 3600);
                return data;
            }
            
            this.logger.log(`Cache miss, fetching single location with ID: ${id}`, 'LocationService');
            const { data } = await rickAndMortyApi.get<Location>(`/location/${id}`);
            this.logger.log(`Successfully fetched location with ID: ${id}, caching data`, 'LocationService');
            await this.redisService.set(cacheKey, data, 3600);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                this.logger.warn(`Location with ID ${id} not found`, 'LocationService');
                throw new NotFoundException(`Location with ID ${id} not found`);
            }
            this.logger.error(`Error fetching location with ID ${id}: ${error.message}`, error.stack, 'LocationService');
            throw error;
        }
    }
}
