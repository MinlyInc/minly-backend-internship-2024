import { IsString, IsEnum, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Gender } from '../../Entites/gender.enum';

export class CreateWriterDto {
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  nationality?: string;
}
