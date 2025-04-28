import { getSchemaPath } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function createPaginatedResponseSchema(model: any): SchemaObject {
  return {
    properties: {
      info: {
        type: 'object',
        properties: {
          count: { type: 'number', example: 51 },
          pages: { type: 'number', example: 3 },
          next: { type: 'string', example: 'https://rickandmortyapi.com/api/episode?page=2', nullable: true },
          prev: { type: 'string', example: null, nullable: true }
        }
      },
      results: {
        type: 'array',
        items: { $ref: getSchemaPath(model) }
      }
    }
  };
}