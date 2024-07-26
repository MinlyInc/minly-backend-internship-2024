import { ApiProperty } from '@nestjs/swagger';

class MovieActor {
  @ApiProperty({ example: '15e1ea8b-e760-4d0a-b167-d5002d521ba9' })
  uuid: string;

  @ApiProperty({ example: '9cae47ad1c171093b2ec' })
  title: string;
}

class ActingRole {
  @ApiProperty({ example: 'MKZMR' })
  character: string;

  @ApiProperty({ type: MovieActor })
  movie: MovieActor;
}

class AwardMovie {
  @ApiProperty({ example: '13a54e25-d6d4-4bd9-bb3d-3dbc3dbc28fa' })
  uuid: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1576158114254-3ba81558b87d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  poster: string;

  @ApiProperty({ example: '883129314ae2ecd460d5' })
  title: string;
}

class Award {
  @ApiProperty({ example: 'Exceptional Talent' })
  description: string;

  @ApiProperty({ example: 2021 })
  year: number;

  @ApiProperty({ example: 'Satellite' })
  name: string;

  @ApiProperty({ type: AwardMovie })
  movie: AwardMovie;
}

class ActorInformation {
  @ApiProperty({ example: 'Emily Brown' })
  name: string;

  @ApiProperty({ example: '1973-09-04' })
  birth_date: string;

  @ApiProperty({ example: 'Male' })
  gender: string;

  @ApiProperty({ example: 'Bio for Jane Smith' })
  bio: string;

  @ApiProperty({ example: 'American' })
  nationality: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1676491167770-bce474fe0024?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGFjdG9yfGVufDB8fDB8fHww',
  })
  picture: string;

  @ApiProperty({ example: 0 })
  average_rating: number;
}

export class ActorDetailsResponse {
  @ApiProperty({ type: ActorInformation })
  actor_information: ActorInformation;

  @ApiProperty({ type: [ActingRole] })
  acting_list: ActingRole[];

  @ApiProperty({ type: [Award] })
  awards: Award[];
}
