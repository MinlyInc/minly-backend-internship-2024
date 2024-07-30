import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieAwardDto } from './create-movie_award.dto';

export class UpdateMovieAwardDto extends PartialType(CreateMovieAwardDto) {}
