import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dtos/createMovie';
import { MovieService } from './movie.service';
import { Movie } from 'src/Entites/movie.entity';
import { get } from 'http';
import { query } from 'express';
import { PaginationDto } from './dtos/PaginationDto';

@Controller('movie')
export class MovieController {
    constructor(private movieService : MovieService){}


    @Get()
    async getAllMovies(@Query() PaginationDto:PaginationDto ){
      // this.movieService.getAllMovies(query);

       return await this.movieService.pagination(PaginationDto)
       
    }
    @Post()
   async create(@Body() createdto : CreateMovieDto):Promise<Movie>{
     return await this.movieService.createMovie(createdto)
       ;
    }

   

}
