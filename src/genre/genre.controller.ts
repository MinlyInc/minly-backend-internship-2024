import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from '../entities/Genre/genre.entity';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.getAll();
  }
}
