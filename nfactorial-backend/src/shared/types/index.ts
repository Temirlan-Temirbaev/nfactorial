import { ApiProperty } from '@nestjs/swagger';


class Info {
    @ApiProperty({ description: 'The length of the response' })
    count: number;
    
    @ApiProperty({ description: 'The amount of pages' })
    pages: number;
    
    @ApiProperty({ description: 'Link to the next page (if it exists)' })
    next: string | null;
    
    @ApiProperty({ description: 'Link to the previous page (if it exists)' })
    prev: string | null;
}

export class WithPagination<T> {
    @ApiProperty({ description: 'Information about the API response' })
    info: Info;

    @ApiProperty({
        description: 'The list of results',
        isArray: true,
        type: Object
    })
    results: T[];
}