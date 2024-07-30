import { IsString, IsEnum, IsOptional, IsNumber,IsNotEmpty } from 'class-validator';
import { Gender } from '../../Entites/gender.enum';


export class CreateDirectorDto{
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: string;
  
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsString()
    @IsOptional()
    picture?: string;
  
    @IsOptional()
    birthDate?: Date;
  
    @IsString()
    @IsOptional()
    nationality?: string;
  
    @IsNumber()
    @IsOptional()
    numberOfAward?: number;
  
  }
