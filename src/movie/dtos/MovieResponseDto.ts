import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsUUID,
    isString,
  } from 'class-validator';
import { ActorResponseDto } from 'src/actor/dtos/ActorResponseDto';
  
  export class MovieResponseDto {
  
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsUUID()
    uuid: string;

    @IsNotEmpty()
    poster:string

    @IsNotEmpty()
    trailer:string
  
    @IsNotEmpty()
    releaseDate: Date;
  
    @IsNotEmpty()
    @IsString()
    genre: string;
  
    @IsNotEmpty()
    @IsNumber()
    averageRatings: number;
  
    @IsNotEmpty()
    @IsString()
    overview: string;

    @IsNotEmpty()
  actors: ActorResponseDto[];
  }
  