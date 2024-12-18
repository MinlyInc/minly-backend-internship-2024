import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ActorDto } from './actor.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  directorId?: string;
  actorIds?: string[];
  writerId?: string;
  actors?: ActorDto[];
  genreIds?: number[];
}
