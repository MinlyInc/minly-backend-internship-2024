import { ApiProperty } from '@nestjs/swagger';

class Movie {
  @ApiProperty({ example: '8ecebd1c-635a-4b52-8596-b463ecb7a415' })
  uuid: string;

  @ApiProperty({
    example: 'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  poster: string;

  @ApiProperty({ example: '90bf59f70ecb1556ff9c' })
  title: string;

  @ApiProperty({ example: 0.07743404085953642 })
  average_rating: number;

  @ApiProperty({ example: '2000-06-04T21:00:00.000Z' })
  release_date: string;
}

export class MovieResponse {
  @ApiProperty({ type: [Movie] })
  movies: Movie[];

  @ApiProperty({ example: 6 })
  totalNumberOfPages: number;
}
