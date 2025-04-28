import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CharacterQuery {
    @ApiProperty({ required: false, default: 1, description: 'Page number' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({ required: false, description: 'Filter by character name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false, enum: ['alive', 'dead', 'unknown'], description: 'Filter by character status' })
    @IsOptional()
    @IsString()
    @IsEnum(['alive', 'dead', 'unknown'], { message: 'Status must be alive, dead or unknown' })
    status?: string;

    @ApiProperty({ required: false, description: 'Filter by character species' })
    @IsOptional()
    @IsString()
    species?: string;

    @ApiProperty({ required: false, description: 'Filter by character type' })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiProperty({ required: false, enum: ['female', 'male', 'genderless', 'unknown'], description: 'Filter by character gender' })
    @IsOptional()
    @IsString()
    @IsEnum(['female', 'male', 'genderless', 'unknown'], { message: 'Gender must be female, male, genderless or unknown' })
    gender?: string;
}