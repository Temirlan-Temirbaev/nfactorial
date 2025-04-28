import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { LocationQuery } from './location.query';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, getSchemaPath, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { createPaginatedResponseSchema } from '@/shared/swagger/pagination.helper';

@ApiTags('locations')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    @ApiOperation({ summary: 'Get all locations', description: 'Retrieve locations with optional filtering' })
    @ApiResponse({ 
        status: 200, 
        description: 'Locations retrieved successfully',
        schema: createPaginatedResponseSchema(Location)
    })
    @ApiResponse({ status: 404, description: 'Locations not found with the provided filters' })
    async getAll(@Query() query: LocationQuery): Promise<WithPagination<Location>> {
        return this.locationService.getAll(query);
    }

    @ApiExtraModels(Location)
    @Get(':id')
    @ApiOperation({ 
        summary: 'Get location by ID', 
        description: 'Retrieve a single location by ID or multiple locations with comma-separated IDs (e.g., "1,2,3")'
    })
    @ApiParam({ 
        name: 'id', 
        description: 'Location ID or comma-separated IDs', 
        example: '1', 
        examples: {
            'single': {
                value: '1',
                description: 'Get a single location'
            },
            'multiple': {
                value: '1,2,3',
                description: 'Get multiple locations'
            }
        }
    })
    @ApiOkResponse({
        schema: {
          oneOf: [
            { $ref: getSchemaPath(Location) },
            { type: 'array', items: { $ref: getSchemaPath(Location) } },
          ],
        },
    })
    @ApiResponse({ status: 404, description: 'Location not found' })
    async getLocation(@Param('id') id: string): Promise<Location | Location[]> {
        return this.locationService.getLocation(id);
    }
}
