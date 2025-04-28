import { ApiProperty } from '@nestjs/swagger';

export class Character {
    @ApiProperty({ description: 'The ID of the character' })
    id: number;

    @ApiProperty({ description: 'The name of the character' })
    name: string;

    @ApiProperty({ description: 'The status of the character (alive, dead or unknown)' })
    status: string;

    @ApiProperty({ description: 'The species of the character' })
    species: string;

    @ApiProperty({ description: 'The type or subspecies of the character' })
    type: string;

    @ApiProperty({ description: 'The gender of the character (female, male, genderless or unknown)' })
    gender: string;

    @ApiProperty({ description: 'The character\'s origin location' })
    origin: {
        name: string;
        url: string;
    };

    @ApiProperty({ description: 'The character\'s last known location' })
    location: {
        name: string;
        url: string;
    };

    @ApiProperty({ description: 'Link to the character\'s image' })
    image: string;

    @ApiProperty({ description: 'List of episodes in which this character appeared', type: [String] })
    episode: string[];

    @ApiProperty({ description: 'Link to the character\'s own URL endpoint' })
    url: string;

    @ApiProperty({ description: 'Time at which the character was created in the database' })
    created: Date;
}