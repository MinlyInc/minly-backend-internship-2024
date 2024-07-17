import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Director } from '../../Entites/director.entity'; // Adjust path as necessary
import { Actor } from '../../Entites/actor.entity'; // Adjust path as necessary
import { Festival } from '../../Entites/festival.entity'; // Adjust path as necessary

export class CreateMovieDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  releaseDate: Date;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsNumber()
  averageRatings?: number;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  directorID: number;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  director: Director;

  @IsOptional()
  festival: Festival[];

  @IsOptional()
  actor: Actor[];
}
