import { ApiProperty } from '@nestjs/swagger';

export class Episode {
    @ApiProperty({ description: 'The ID of the episode' })
    id: number;

    @ApiProperty({ description: 'The name of the episode' })
    name: string;

    @ApiProperty({ description: 'The air date of the episode' })
    air_date: string;

    @ApiProperty({ description: 'The code of the episode (e.g. S01E01)' })
    episode: string;

    @ApiProperty({ description: 'List of characters who appeared in the episode', type: [String] })
    characters: string[];

    @ApiProperty({ description: 'Link to the episode\'s own URL endpoint' })
    url: string;

    @ApiProperty({ description: 'Time at which the episode was created in the database' })
    created: Date;
}