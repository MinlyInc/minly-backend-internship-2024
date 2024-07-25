import { ApiProperty } from '@nestjs/swagger';

class Actor {
  @ApiProperty({ example: '8bba1ab5-141e-4cec-8ac8-344f0ed7a556' })
  uuid: string;

  @ApiProperty({ example: 'Sarah Jones' })
  name: string;

  @ApiProperty({ example: 'CZSOZ' })
  character: string;
}

class Director {
  @ApiProperty({ example: '1996ed0f-4cbf-487c-8c83-ff499c5faec6' })
  uuid: string;

  @ApiProperty({ example: '8a99bc77 3ba75cb1' })
  name: string;
}

class Category {
  @ApiProperty({ example: 'Fantasy' })
  name: string;
}

class Writer {
  @ApiProperty({ example: 'Hannah Taylor' })
  name: string;
}

class Language {
  @ApiProperty({ example: 'Italian' })
  name: string;
}

class MovieDetailed {
  @ApiProperty({ example: 'd4df575a-5e74-44ce-a6cb-d47c1db79894' })
  uuid: string;

  @ApiProperty({
    example: 'https://plus.unsplash.com/premium_photo-1672116453187-3aa64afe04ad?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  poster: string;

  @ApiProperty({ example: 'c4f2007cbc1eeb43a0fa' })
  title: string;

  @ApiProperty({ example: 4.589907943095959 })
  average_rating: number;

  @ApiProperty({ example: '2007-04-17T22:00:00.000Z' })
  release_date: string;

  @ApiProperty({ example: 'http://example.com/trailer49' })
  trailer: string;

  @ApiProperty({
    example: 'This is the first line of the description for movie 51. This is the second line of the description for movie 51. This is the third line of the description for movie 51.This is the fourth line of the description for movie 51.This is the fifth line of the description for movie 51.This is the sixth line of the description for movie 51.',
  })
  overview: string;
}

export class MovieDetailsResponse {
  @ApiProperty({ type: MovieDetailed })
  movie: MovieDetailed;

  @ApiProperty({ type: [Actor] })
  actors: Actor[];

  @ApiProperty({ type: Director })
  director: Director;

  @ApiProperty({ type: [Category] })
  categories: Category[];

  @ApiProperty({ type: [Writer] })
  writers: Writer[];

  @ApiProperty({ type: Language })
  language: Language;
}
