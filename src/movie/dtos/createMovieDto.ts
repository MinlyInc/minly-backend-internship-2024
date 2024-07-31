import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Director } from '../../Entites/director.entity'; 
import { Actor } from '../../Entites/actor.entity'; 
import { Festival } from '../../Entites/festival.entity'; 

export class CreateMovieDto {

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
  directorID: number;

  @IsOptional()
  @IsString()
  trailer?: string;

  director: Director;

  @IsOptional()
  festival: Festival[];

  @IsOptional()
  actor: Actor[];
}
