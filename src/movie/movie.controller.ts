import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dtos/createMovieDto';
import { MovieService } from './movie.service';
import { MovieResponseDto } from './dtos/MovieResponseDto';
import { PaginationDto } from './dtos/PaginationDto';
import { Movie } from 'src/Entites/movie.entity';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':uuid')
  async getMovie(@Param('uuid') uuid: string): Promise<MovieResponseDto> {
    return this.movieService.getMovieByUuid(uuid);
  }

  @Get()
  async getAllMovies(@Query() paginationDto: PaginationDto) {
    return await this.movieService.pagination(paginationDto);
  }

  @Post()
  async create(@Body() createdMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createdMovieDto);
  }
}

