import { ApiProperty } from '@nestjs/swagger';

export class Location {
    @ApiProperty({ description: 'The ID of the location' })
    id: number;

    @ApiProperty({ description: 'The name of the location' })
    name: string;

    @ApiProperty({ description: 'The type of the location' })
    type: string;

    @ApiProperty({ description: 'The dimension in which the location is located' })
    dimension: string;

    @ApiProperty({ description: 'List of characters who have been last seen in the location', type: [String] })
    residents: string[];

    @ApiProperty({ description: 'Link to the location\'s own URL endpoint' })
    url: string;

    @ApiProperty({ description: 'Time at which the location was created in the database' })
    created: Date;
}