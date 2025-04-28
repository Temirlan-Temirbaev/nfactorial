import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationQuery {
    @ApiProperty({ required: false, default: 1, description: 'Page number' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({ required: false, description: 'Filter by location name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false, description: 'Filter by location type' })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiProperty({ required: false, description: 'Filter by location dimension' })
    @IsOptional()
    @IsString()
    dimension?: string;
}