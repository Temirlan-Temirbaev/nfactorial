import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from '@/core/entities';
import { WithPagination } from '@/shared/types';
import { CharacterQuery } from './character.query';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, getSchemaPath, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { createPaginatedResponseSchema } from '@/shared/swagger/pagination.helper';

@ApiTags('characters')
@Controller('character')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Get()
    @ApiOperation({ summary: 'Get all characters', description: 'Retrieve characters with optional filtering' })
    @ApiResponse({ 
        status: 200, 
        description: 'Characters retrieved successfully',
        schema: createPaginatedResponseSchema(Character)
    })
    @ApiResponse({ status: 404, description: 'Characters not found with the provided filters' })
    async getAll(@Query() query: CharacterQuery): Promise<WithPagination<Character>> {
        return this.characterService.getAll(query);
    }

    @Get(':id')
    @ApiExtraModels(Character)
    @ApiOperation({
        summary: 'Get character by ID', 
        description: 'Retrieve a single character by ID or multiple characters with comma-separated IDs (e.g., "1,2,3")'
    })
    @ApiParam({ 
        name: 'id', 
        description: 'Episode ID or comma-separated IDs', 
        example: '1', 
        examples: {
            'single': {
                value: '1',
                description: 'Get a single character'
            },
            'multiple': {
                value: '1,2,3',
                description: 'Get multiple characters'
            }
        }
    })
    @ApiOkResponse({
        schema: {
          oneOf: [
            { $ref: getSchemaPath(Character) },
            { type: 'array', items: { $ref: getSchemaPath(Character) } },
          ],
        },
      })
    @ApiResponse({ 
        status: 404, 
        description: 'Character not found',
        type: Error
    })
    async getCharacter(@Param('id') id: string): Promise<Character | Character[]> {
        return this.characterService.getCharacter(id);
    }
}