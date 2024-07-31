// pagination.dto.ts
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 8;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @IsIn(['title', 'releaseDate', 'averageRatings'])
  sortField?: 'title' | 'releaseDate' | 'averageRatings';

  @IsOptional()
  @IsString()
  @IsIn(['action', 'drama', 'comedy',''])
  Genre?: 'action' | 'drama' | 'comedy' | '';
}
