import { IsNotEmpty, IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class ActorResponseDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  character?: string;
}
