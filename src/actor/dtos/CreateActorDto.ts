import { IsEnum, IsString, IsOptional, IsDateString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { Gender } from '../../Entites/gender.enum';
import { Movie } from '../../Entites/movie.entity';

export class CreateActorDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  firstName: string;


  @IsOptional()
  @IsString()
  bio: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsNumber()
  numberOfAward?: number;

}

