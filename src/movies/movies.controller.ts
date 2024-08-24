import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from 'src/entities/movie.entity';
import {pagination_page,pagination_limit} from '../const/const'


@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('search')
  async search(@Query('title') title: string): Promise<Movie[]> {
    return this.moviesService.searchMovies(title);
  }

  @Get('paginated')
  async getMovies(
    @Query('sortBy') sortBy: 'releaseDate' | 'rating',
    @Query('page') page = pagination_page,
    @Query('limit') limit = pagination_limit,
  ): Promise<{ data: Movie[]; count: number }> {
    return this.moviesService.getPaginatedMovies(
      sortBy,
      Number(page),
      Number(limit),
    );
  }

  @Get(':uuid')
  async getMovie(@Param('uuid') uuid: string): Promise<Movie> {
    return this.moviesService.getMovieByUuid(uuid);
  }

  @Get('genre/:genre')
  async getMoviesByGenre(@Param('genre') genre: string): Promise<Movie[]> {
    return this.moviesService.getMoviesByGenre(genre);
  }
}
