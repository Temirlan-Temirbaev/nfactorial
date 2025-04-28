import { Controller, Get, Param, Query } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { EpisodeQuery } from './episode.query';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, getSchemaPath, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { createPaginatedResponseSchema } from '@/shared/swagger/pagination.helper';

@ApiTags('episodes')
@Controller('episode')
export class EpisodeController {
    constructor(private readonly episodeService: EpisodeService) {}

    @Get()
    @ApiOperation({ summary: 'Get all episodes', description: 'Retrieve episodes with optional filtering' })
    @ApiResponse({ 
        status: 200, 
        description: 'Episodes retrieved successfully',
        schema: createPaginatedResponseSchema(Episode)
    })
    @ApiResponse({ status: 404, description: 'Episodes not found with the provided filters' })
    async getAll(@Query() query: EpisodeQuery): Promise<WithPagination<Episode>> {
        return this.episodeService.getAll(query);
    }

    @ApiExtraModels(Episode)
    @Get(':id')
    @ApiOperation({ 
        summary: 'Get episode by ID', 
        description: 'Retrieve a single episode by ID or multiple episodes with comma-separated IDs (e.g., "1,2,3")'
    })
    @ApiParam({ 
        name: 'id', 
        description: 'Episode ID or comma-separated IDs', 
        example: '1', 
        examples: {
            'single': {
                value: '1',
                description: 'Get a single episode'
            },
            'multiple': {
                value: '1,2,3',
                description: 'Get multiple episodes'
            }
        }
    })
    @ApiOkResponse({
        schema: {
          oneOf: [
            { $ref: getSchemaPath(Episode) },
            { type: 'array', items: { $ref: getSchemaPath(Episode) } },
          ],
        },
      })
    @ApiResponse({ status: 404, description: 'Episode not found' })
    async getEpisode(@Param('id') id: string): Promise<Episode | Episode[]> {
        return this.episodeService.getEpisode(id);
    }
}