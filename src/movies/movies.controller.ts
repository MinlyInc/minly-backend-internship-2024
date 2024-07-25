import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/body/create-movie.dto';
import { SortAndFilterAndPaginateMovieDto } from './dtos/query-param/sort-movie.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieDetailsResponse } from './swagger-model/movie-details.model';
import { MovieResponse } from './swagger-model/movie.model';


@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private movieService : MoviesService){}


    @Post()
    async createMovie(@Body() createMovieDto : CreateMovieDto){
        return this.movieService.createMovie(createMovieDto) ;
    }

    @ApiResponse({ status: 200, description: 'Get movies', type: MovieResponse })
    @Get()
    async getMovies(
       @Query() sortAndFilterAndPaginateMovieDto: SortAndFilterAndPaginateMovieDto,
){
        return this.movieService.getMoviesByLimitAndOffesetAndFilterBy( sortAndFilterAndPaginateMovieDto  ) ;
    }

    @ApiResponse({ status: 200, description: 'Get movie details', type: MovieDetailsResponse })
    @Get(':uuid')
    async getMovieDetails(
        @Param('uuid') movieUUID : string
    ){
        return this.movieService.getMovieDetails(movieUUID) ;
    }

}
